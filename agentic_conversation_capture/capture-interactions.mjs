export async function auditInteractions(page) {
  return page.evaluate(`(() => {
    const messages = [...document.querySelectorAll('[data-message-role="assistant"], [data-content-search-unit-key$=":assistant"]')];
    const questionCounter = /^Question\\s+(\\d+)\\s+(?:of|\\/)\\s*(\\d+)$/i;
    const questionText = node => (node?.textContent || '').replace(/\\s+/g, ' ').trim();
    const hasQuestionCounter = element => [...element.querySelectorAll('*')].some(node => questionCounter.test(questionText(node)) && ![...node.children].some(child => questionCounter.test(questionText(child))));
    const controls = messages.flatMap((message, messageIndex) => {
      const root = message.querySelector('[data-assistant-markdown-root], [data-markdown-text-style="assistant-message"]');
      if (!root) return [];
      return [...root.querySelectorAll('button,input,select,textarea,a[href],summary,[role="button"],[role="tab"],[role="switch"],[contenteditable="true"]')]
        .filter(element => !element.closest('template'))
        .map((element, controlIndex) => {
          const boxes = [...root.querySelectorAll('[data-d-component="box"]')].filter(box => box.contains(element));
          const hasQuiz = boxes.some(box => [...box.querySelectorAll('button')].some(button => /^(Check answers|Check my answers|Try again)/.test(button.innerText.trim())));
          const hasStepper = boxes.some(box => {
            const labels = [...box.querySelectorAll('button')].map(button => button.innerText.trim());
            return labels.includes('Next step') && labels.includes('Previous');
          });
          const label = element.getAttribute('aria-label') || element.innerText?.trim() || element.getAttribute('value') || '';
          const questionNavigation = element.matches('button') && /^(?:Previous|Next question)$/i.test(label) && boxes.some(box => hasQuestionCounter(box));
          let kind = 'unsupported';
          if (element.matches('a[href]')) kind = 'link';
          else if (element.matches('button') && label.startsWith('Open ')) kind = 'image';
          else if (element.matches('button') && element.closest('[data-d-component="segmented-control"]')) kind = 'tabs';
          else if (element.matches('input[type="radio"]') && hasQuiz) kind = 'quiz';
          else if (element.matches('button') && /^(Check answers|Check my answers|Try again)/.test(label) && hasQuiz) kind = 'quiz';
          else if (element.matches('button') && ['Next step', 'Previous'].includes(label) && hasStepper) kind = 'stepper';
          else if (questionNavigation) kind = 'question';
          return { message: messageIndex + 1, control: controlIndex + 1, tag: element.tagName.toLowerCase(), label: label.slice(0, 160), kind, html: element.outerHTML.slice(0, 500) };
        });
    });
    return { url: location.href, controls, unsupported: controls.filter(control => control.kind === 'unsupported') };
  })()`);
}

export async function captureInteractions(page, { allowQuizAnswers = false } = {}) {
  return page.evaluate(`(async () => {
    const sleep = () => new Promise(resolve => setTimeout(resolve, 180));
    const roots = [...document.querySelectorAll('[data-message-role="assistant"] [data-assistant-markdown-root], [data-content-search-unit-key$=":assistant"] [data-markdown-text-style="assistant-message"]')];
    const questionPattern = /^Question\\s+(\\d+)\\s+(?:of|\\/)\\s*(\\d+)$/i;
    const normalized = node => (node?.textContent || '').replace(/\\s+/g, ' ').trim();
    const counter = panel => panel && [...panel.querySelectorAll('*')].map(node => ({ node, match: normalized(node).match(questionPattern) }))
      .find(({ node, match }) => match && ![...node.children].some(child => questionPattern.test(normalized(child))))?.match;
    const questionPanels = root => {
      const panels = new Set();
      for (const previous of root.querySelectorAll('button')) {
        if (normalized(previous) !== 'Previous') continue;
        for (let panel = previous.closest('[data-d-component="box"]'); panel && root.contains(panel); panel = panel.parentElement?.closest('[data-d-component="box"]')) {
          if (counter(panel)) { panels.add(panel); break; }
        }
      }
      return [...panels];
    };
    const imageUrls = new Set();
    const collectImages = element => element.querySelectorAll('img').forEach(image => imageUrls.add(image.src));
    const button = (element, label) => [...element.querySelectorAll('button')].find(item => item.innerText.trim() === label);
    const click = async (element, label) => {
      const control = button(element, label);
      if (!control) return false;
      const before = element.innerText;
      control.click();
      await sleep();
      return element.innerText !== before;
    };
    const boxesWithButton = label => [...new Set(roots.flatMap(root => [...root.querySelectorAll('button')]
      .filter(item => item.innerText.trim() === label)
      .map(item => item.closest('[data-d-component="box"]'))))].filter(Boolean);
    const questions = [];
    const allowQuizAnswers = ${JSON.stringify(allowQuizAnswers)};
    for (const [messageIndex, root] of roots.entries()) {
      for (let panelIndex = 0; panelIndex < questionPanels(root).length; panelIndex++) {
        const locate = () => {
          const currentRoots = [...document.querySelectorAll('[data-message-role="assistant"] [data-assistant-markdown-root], [data-content-search-unit-key$=":assistant"] [data-markdown-text-style="assistant-message"]')];
          return questionPanels(currentRoots[messageIndex] || root)[panelIndex];
        };
        const initial = counter(locate());
        const initialNumber = Number(initial?.[1]);
        const total = Number(initial?.[2]);
        if (!initialNumber || !total || total > 100 || initialNumber > total) continue;
        const states = new Map();
        const autoAnswered = new Set();
        const remember = () => {
          const panel = locate();
          const match = panel && counter(panel);
          const number = Number(match?.[1]);
          if (!number || Number(match[2]) !== total) return false;
          if (!states.has(number)) {
            states.set(number, { number, html: panel.outerHTML, text: panel.innerText });
            collectImages(panel);
          }
          return true;
        };
        const move = async (label, expected) => {
          const panel = locate();
          let control = panel && [...panel.querySelectorAll('button')].find(item => normalized(item) === label);
          if (label === 'Next question' && allowQuizAnswers && (control?.disabled || control?.getAttribute('aria-disabled') === 'true')) {
            const selected = panel.querySelector('input[type="radio"]:checked,[role="radio"][aria-checked="true"],[aria-pressed="true"],[aria-selected="true"]');
            const option = !selected && [...panel.querySelectorAll('button[data-d-component="pressable"]')]
              .find(item => !item.disabled && item.getAttribute('aria-disabled') !== 'true' && !/^(?:Previous|Next question)$/i.test(normalized(item)));
            if (option) {
              autoAnswered.add(Number(counter(panel)?.[1]));
              option.click();
              for (let attempt = 0; attempt < 20; attempt++) {
                await new Promise(resolve => setTimeout(resolve, 100));
                const current = Number(counter(locate())?.[1]);
                if (current === expected) return true;
                control = [...(locate()?.querySelectorAll('button') || [])].find(item => normalized(item) === label);
                if (control && !control.disabled && control.getAttribute('aria-disabled') !== 'true') break;
              }
            }
          }
          if (!control || control.disabled || control.getAttribute('aria-disabled') === 'true') return false;
          control.click();
          for (let attempt = 0; attempt < 20; attempt++) {
            await new Promise(resolve => setTimeout(resolve, 100));
            if (Number(counter(locate())?.[1]) === expected) return true;
          }
          return false;
        };
        remember();
        let current = Number(counter(locate())?.[1]);
        for (let attempt = 0; attempt < total && current > 1; attempt++) {
          if (!await move('Previous', current - 1)) break;
          remember(); current--;
        }
        for (let attempt = 0; attempt < total && current < total; attempt++) {
          if (!await move('Next question', current + 1)) break;
          remember(); current++;
        }
        current = Number(counter(locate())?.[1]);
        for (let attempt = 0; attempt < total && current !== initialNumber; attempt++) {
          const next = current < initialNumber ? current + 1 : current - 1;
          if (!await move(current < initialNumber ? 'Next question' : 'Previous', next)) break;
          current = Number(counter(locate())?.[1]);
        }
        const restored = current === initialNumber;
        const ordered = [...states.values()].sort((a, b) => a.number - b.number);
        questions.push({ messageIndex, panelIndex, initial: initialNumber, total, states: ordered, autoAnswered: [...autoAnswered].sort((a, b) => a - b),
          complete: ordered.length === total, restored,
          limitation: ordered.length === total ? '' : 'Some questions could not be reached without changing an answer or the quiz layout.' });
      }
    }
    const steppers = [];
    for (const box of boxesWithButton('Next step')) {
      if (!button(box, 'Previous')) continue;
      const initialText = box.innerText;
      for (let attempt = 0; attempt < 30 && await click(box, 'Previous'); attempt++) { }
      const states = [];
      for (let attempt = 0; attempt < 30; attempt++) {
        states.push({ text: box.innerText, html: box.outerHTML });
        collectImages(box);
        if (!await click(box, 'Next step')) break;
      }
      const initial = states.findIndex(state => state.text === initialText);
      if (initial < 0) throw Error('Could not restore stepper state');
      for (let index = states.length - 1; index > initial; index--) await click(box, 'Previous');
      steppers.push({ initial, states: states.map(state => state.html) });
    }
    const tabs = [];
    for (const control of roots.flatMap(root => [...root.querySelectorAll('[data-d-component="segmented-control"]')])) {
      const box = control.closest('[data-d-component="box"]');
      const labels = [...control.querySelectorAll('button')].map(item => item.innerText.trim()).filter(Boolean);
      const initialText = box.innerText;
      const states = [];
      for (const label of labels) {
        button(box, label)?.click();
        await sleep();
        states.push({ label, text: box.innerText, html: box.outerHTML });
        collectImages(box);
      }
      const initial = states.findIndex(state => state.text === initialText);
      if (initial < 0) throw Error('Could not restore tab state');
      button(box, states[initial].label)?.click();
      await sleep();
      tabs.push({ initial, states: states.map(({ label, html }) => ({ label, html })) });
    }
    const quizBoxes = [...new Set(roots.flatMap(root => [...root.querySelectorAll('button')]
      .filter(item => /^(Check answers|Check my answers|Try again)/.test(item.innerText.trim()))
      .map(item => item.closest('[data-d-component="box"]'))))].filter(Boolean);
    const quizzes = [];
    for (const box of quizBoxes) {
      const groups = [...box.querySelectorAll('[data-d-component="radio-group"]')];
      if (!groups.length) continue;
      const selectedBefore = groups.map(group => group.querySelector('input[type="radio"]:checked')?.value ?? null);
      const initiallyGraded = !!button(box, 'Try again');
      if (initiallyGraded) { button(box, 'Try again').click(); await sleep(); }
      for (const group of groups) group.querySelector('input[type="radio"]')?.click();
      await sleep();
      const checkButton = [...box.querySelectorAll('button')].find(item => item.innerText.trim().startsWith('Check'));
      if (!checkButton) throw Error('Quiz check button is missing');
      checkButton.click();
      await sleep();
      const feedback = [...box.querySelectorAll('*')]
        .filter(element => element.children.length === 0 && element.textContent.trim().startsWith('Correct answer:'))
        .map(element => element.parentElement.innerText.trim());
      if (feedback.length !== groups.length) throw Error('Could not capture quiz answers');
      const answers = feedback.map((text, index) => {
        const [firstLine, ...explanationLines] = text.split(/\\r?\\n/);
        const correctText = firstLine.replace(/^Correct answer:\\s*/, '').trim();
        const option = [...groups[index].querySelectorAll('[data-d-component="radio"]')]
          .find(item => item.innerText.trim() === correctText);
        const correctValue = option?.querySelector('input[type="radio"]')?.value;
        if (correctValue === undefined) throw Error('Could not match quiz answer: ' + correctText);
        return { correctValue, correctText, explanation: explanationLines.join('\\n').trim() };
      });
      button(box, 'Try again')?.click();
      await sleep();
      groups.forEach((group, index) => {
        const value = selectedBefore[index];
        if (value !== null) [...group.querySelectorAll('input[type="radio"]')].find(input => input.value === value)?.click();
      });
      if (initiallyGraded) {
        [...box.querySelectorAll('button')].find(item => item.innerText.trim().startsWith('Check'))?.click();
        await sleep();
      }
      quizzes.push({ answers });
    }
    return { steppers, tabs, quizzes, questions, imageUrls: [...imageUrls] };
  })()`);
}
