/** Materialize captured quiz pages as links for viewers that disable scripts. */
export function addStaticQuizFallback(doc, messages, navigation = []) {
  if (!messages && doc?.messages) {
    navigation = doc.navigation || [];
    messages = doc.messages;
    doc = document;
  }
  const elementDocument = doc.ownerDocument || doc;
  const counter = /^(?:Question|கேள்வி)\s*(\d+)\s*(?:of|\/)\s*(\d+)$/i;
  const findPanel = root => {
    for (const node of root.querySelectorAll('p,span,h2,h3,h4')) {
      const text = node.textContent.replace(/\s+/g, ' ').trim();
      const match = text.match(counter);
      if (!match || [...node.children].some(child => counter.test(child.textContent.replace(/\s+/g, ' ').trim()))) continue;
      const panel = node.closest('[data-d-component="box"]');
      if (panel) return { panel, number: Number(match[1]), total: Number(match[2]) };
    }
    return null;
  };
  let added = 0;
  messages.forEach((message, messageIndex) => {
    const liveRoot = doc.querySelector(`[data-capture-agent-message="${messageIndex}"]`);
    if (!liveRoot || liveRoot.hasAttribute('data-capture-agent-static')) return;
    const pages = message.states.map(state => {
      const template = elementDocument.createElement('template');
      template.innerHTML = state.html;
      const root = template.content.firstElementChild;
      const found = root && findPanel(root);
      return found ? { ...found, id: state.id } : null;
    }).filter(Boolean);
    const initial = pages.find(page => page.id === message.initial);
    if (!initial) return;
    const related = pages.filter(page => page.total === initial.total)
      .filter((page, index, all) => all.findIndex(other => other.number === page.number) === index)
      .sort((a, b) => a.number - b.number);
    if (related.length < 2) return;
    const livePanel = findPanel(liveRoot)?.panel;
    if (!livePanel) return;
    const byState = new Map(related.map(page => [page.id, page]));
    const byNumber = new Map(related.map(page => [page.number, page]));
    const wrapper = elementDocument.createElement('div');
    wrapper.className = 'capture-static-quiz';
    const styleRules = [];
    for (const page of related) {
      const input = elementDocument.createElement('input');
      input.type = 'radio';
      input.name = `capture-question-${messageIndex}`;
      input.id = `capture-question-${messageIndex}-select-${page.number}`;
      input.value = String(page.number);
      input.dataset.captureQuizState = 'true';
      input.setAttribute('aria-label', `Question ${page.number} of ${page.total}`);
      if (page.id === message.initial) input.setAttribute('checked', '');
      wrapper.append(input);
      styleRules.push(`.capture-static-quiz:has(>#${input.id}:checked)>[data-capture-quiz-page="${page.number}"]{display:block!important}`);
    }
    for (const page of related) {
      const panel = page.panel.cloneNode(true);
      panel.id = `capture-question-${messageIndex}-${page.number}`;
      panel.dataset.captureQuizPage = String(page.number);
      if (page.id === message.initial) panel.dataset.captureQuizInitial = 'true';
      const edges = [...message.transitions, ...(navigation[messageIndex] || [])].filter(edge => edge.from === page.id);
      for (const button of panel.querySelectorAll('button')) {
        const label = button.textContent.replace(/\s+/g, ' ').trim();
        const control = Number(button.dataset.captureAgentControl);
        const edge = edges.find(item => item.control === control && byState.has(item.to));
        let target = edge && byState.get(edge.to);
        if (/^(?:Previous|Prev|முந்தையது)/i.test(label)) target ||= byNumber.get(page.number - 1);
        else if (/^(?:Next|அடுத்த கேள்வி)/i.test(label)) target ||= byNumber.get(page.number + 1);
        else if (/^(?:Restart|Start again|மீண்டும் தொடங்கு)/i.test(label)) target ||= initial;
        else continue;
        if (!target) continue;
        const link = elementDocument.createElement('label');
        link.htmlFor = `capture-question-${messageIndex}-select-${target.number}`;
        link.className = button.className;
        link.innerHTML = button.innerHTML;
        link.dataset.captureQuizLink = 'true';
        link.dataset.captureQuizDirection = target.number < page.number ? 'previous' : 'next';
        if (button.getAttribute('style')) link.setAttribute('style', button.getAttribute('style'));
        link.removeAttribute('aria-disabled');
        button.replaceWith(link);
      }
      wrapper.append(panel);
    }
    livePanel.replaceWith(wrapper);
    liveRoot.setAttribute('data-capture-agent-static', 'true');
    liveRoot.dataset.captureQuizStyleRules = styleRules.join('');
    added++;
  });
  if (added) {
    const style = elementDocument.createElement('style');
    style.dataset.captureStaticQuizStyle = 'true';
    style.textContent = '.capture-static-quiz>[data-capture-quiz-page]{display:none!important}.capture-static-quiz>input[data-capture-quiz-state]{position:absolute;width:1px;height:1px;opacity:0}.capture-static-quiz label[data-capture-quiz-link]{display:inline-flex;align-items:center;justify-content:center;text-decoration:none;cursor:pointer;min-height:36px;padding:7px 16px;border:1px solid #d9d9d9;border-radius:24px;color:inherit}.capture-static-quiz label[data-capture-quiz-direction="next"]{background:#111;color:#fff;border-color:#111}' + [...doc.querySelectorAll('[data-capture-quiz-style-rules]')].map(root => root.dataset.captureQuizStyleRules).join('');
    (doc.querySelector('head') || elementDocument.head).append(style);
  }
  return added;
}
