for (const root of document.querySelectorAll('[data-capture-agent-static]')) {
  const template = [...document.querySelectorAll('template[data-capture-agent-message]')]
    .find(item => item.dataset.captureAgentMessage === root.dataset.captureAgentMessage
      && item.dataset.captureAgentState === root.dataset.captureAgentState);
  if (template) root.replaceWith(template.content.firstElementChild.cloneNode(true));
}
const conversation = document.querySelector('.capture-conversation');
const agentGraph = document.querySelector('#capture-agent-graph')
  ? JSON.parse(document.querySelector('#capture-agent-graph').textContent)
  : null;

function replayAgentControl(event) {
  const root = event.target.closest('[data-capture-agent-message]');
  if (!root || !agentGraph) return false;
  const control = event.target.closest('[data-capture-agent-control]');
  if (!control || !root.contains(control)) return false;
  const message = Number(root.dataset.captureAgentMessage);
  const edge = agentGraph[message]?.transitions.find(item => item.from === root.dataset.captureAgentState
    && item.control === Number(control.dataset.captureAgentControl));
  if (!edge) return false;
  event.preventDefault();
  const template = [...document.querySelectorAll('template[data-capture-agent-message]')]
    .find(item => item.dataset.captureAgentMessage === String(message) && item.dataset.captureAgentState === edge.to);
  if (template) root.replaceWith(template.content.firstElementChild.cloneNode(true));
  return true;
}

function widgetTemplates(id) {
  return [...document.querySelectorAll('template[data-capture-widget]')]
    .filter((template) => template.dataset.captureWidget === id);
}

function showWidgetState(widget, index) {
  const template = widgetTemplates(widget.dataset.captureWidget)[index];
  if (!template) return;
  const next = template.content.firstElementChild.cloneNode(true);
  widget.replaceWith(next);
  if (next.dataset.captureKind === 'question') updateQuestionNavigation(next);
}

function updateQuestionNavigation(widget) {
  const index = Number(widget.dataset.captureState);
  const last = widgetTemplates(widget.dataset.captureWidget).length - 1;
  for (const button of widget.querySelectorAll('button')) {
    const label = button.innerText.trim();
    if (label !== 'Previous' && label !== 'Next question') continue;
    const disabled = label === 'Previous' ? index === 0 : index === last;
    button.disabled = disabled;
    button.setAttribute('aria-disabled', String(disabled));
    if (disabled) button.tabIndex = -1;
    else button.removeAttribute('tabindex');
  }
}

function quizGroups(quiz) {
  return [...quiz.querySelectorAll('[data-d-component="radio-group"]')];
}

function quizButton(quiz) {
  return [...quiz.querySelectorAll('button')]
    .find((button) => /^(Check answers|Check my answers|Try again)/.test(button.innerText.trim()));
}

function updateQuizProgress(quiz) {
  if (quiz.dataset.captureGraded === 'true') return;
  const groups = quizGroups(quiz);
  const answered = groups.filter((group) => group.querySelector('input[type="radio"]:checked')).length;
  const button = quizButton(quiz);
  if (button) button.textContent = answered === groups.length
    ? 'Check my answers'
    : `Check answers (${answered}/${groups.length} answered)`;
}

function resetQuiz(quiz) {
  quiz.querySelectorAll('input[type="radio"]').forEach((input) => { input.checked = false; });
  quiz.querySelectorAll('.capture-quiz-feedback,.capture-quiz-score').forEach((element) => element.remove());
  quiz.querySelectorAll('.capture-correct,.capture-incorrect').forEach((element) => {
    element.classList.remove('capture-correct', 'capture-incorrect');
  });
  quiz.dataset.captureGraded = 'false';
  updateQuizProgress(quiz);
}

function checkQuiz(quiz) {
  const groups = quizGroups(quiz);
  const answers = JSON.parse(quiz.dataset.captureQuiz);
  if (groups.some((group) => !group.querySelector('input[type="radio"]:checked'))) {
    updateQuizProgress(quiz);
    return;
  }
  let score = 0;
  groups.forEach((group, index) => {
    const selected = group.querySelector('input[type="radio"]:checked');
    const answer = answers[index];
    if (selected.value === answer.correctValue) score++;
    group.querySelectorAll('[data-d-component="radio"]').forEach((option) => {
      const input = option.querySelector('input[type="radio"]');
      option.classList.toggle('capture-correct', input?.value === answer.correctValue);
      option.classList.toggle('capture-incorrect', input === selected && selected.value !== answer.correctValue);
    });
    const feedback = document.createElement('div');
    feedback.className = 'capture-quiz-feedback';
    const correct = document.createElement('strong');
    correct.textContent = `Correct answer: ${answer.correctText}`;
    const explanation = document.createElement('p');
    explanation.textContent = answer.explanation;
    feedback.append(correct, explanation);
    group.closest('[data-d-component="box"]').append(feedback);
  });
  const button = quizButton(quiz);
  button.textContent = 'Try again';
  const result = document.createElement('p');
  result.className = 'capture-quiz-score';
  result.setAttribute('role', 'status');
  result.textContent = `Your score: ${score} / ${groups.length}`;
  button.after(result);
  quiz.dataset.captureGraded = 'true';
}

function openImage(button) {
  const source = button.querySelector('img');
  if (!source) return;
  let dialog = document.querySelector('#capture-image-dialog');
  if (!dialog) {
    dialog = document.createElement('dialog');
    dialog.id = 'capture-image-dialog';
    dialog.innerHTML = '<button type="button" aria-label="Close image" data-capture-close>×</button><img alt=""><p></p>';
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog || event.target.closest('[data-capture-close]')) dialog.close();
    });
    document.body.append(dialog);
  }
  dialog.querySelector('img').src = source.src;
  dialog.querySelector('img').alt = source.alt || button.getAttribute('aria-label') || '';
  dialog.querySelector('p').textContent = (button.getAttribute('aria-label') || '').replace(/^Open /, '');
  dialog.showModal();
}

for (const [quizIndex, quiz] of [...conversation.querySelectorAll('[data-capture-quiz]')].entries()) {
  quizGroups(quiz).forEach((group, groupIndex) => {
    group.querySelectorAll('input[type="radio"]').forEach((input) => {
      input.name = `capture-quiz-${quizIndex}-${groupIndex}`;
      input.tabIndex = 0;
    });
  });
  quizButton(quiz)?.removeAttribute('aria-disabled');
  updateQuizProgress(quiz);
}

conversation.querySelectorAll('[data-capture-kind="question"]').forEach(updateQuestionNavigation);

conversation.addEventListener('change', (event) => {
  const quiz = event.target.closest('[data-capture-quiz]');
  if (quiz && event.target.matches('input[type="radio"]')) updateQuizProgress(quiz);
});

conversation.addEventListener('click', (event) => {
  if (replayAgentControl(event)) return;
  const option = event.target.closest('[data-d-component="radio"]');
  if (option && !event.target.matches('input[type="radio"]')) {
    const input = option.querySelector('input[type="radio"]');
    if (input) {
      input.checked = true;
      input.dispatchEvent(new Event('change', { bubbles: true }));
    }
    return;
  }
  const button = event.target.closest('button');
  if (!button) return;
  const widget = button.closest('[data-capture-widget]');
  if (widget) {
    const index = Number(widget.dataset.captureState);
    const text = button.innerText.trim();
    if (widget.dataset.captureKind === 'stepper' && text === 'Next step') return showWidgetState(widget, index + 1);
    if (widget.dataset.captureKind === 'stepper' && text === 'Previous') return showWidgetState(widget, index - 1);
    if (widget.dataset.captureKind === 'tabs') {
      const stateIndex = widgetTemplates(widget.dataset.captureWidget)
        .findIndex((template) => template.dataset.captureLabel === text);
      if (stateIndex >= 0) return showWidgetState(widget, stateIndex);
    }
    if (widget.dataset.captureKind === 'question' && text === 'Previous') return showWidgetState(widget, index - 1);
    if (widget.dataset.captureKind === 'question' && text === 'Next question') return showWidgetState(widget, index + 1);
  }
  const quiz = button.closest('[data-capture-quiz]');
  if (quiz) {
    if (button.innerText.trim() === 'Try again') return resetQuiz(quiz);
    if (button.innerText.trim().startsWith('Check')) return checkQuiz(quiz);
  }
  if (button.getAttribute('aria-label')?.startsWith('Open ')) openImage(button);
});
