import type { Conversation } from './types';

const turns = 'article.capture-message,article[data-turn-id]';
const label = /^(?:ChatGPT(?:\s+said)?|assistant|tutor)\s*:?$/i;
const labelText = (element: Element) => (element.textContent || '').replace(/[\u200B-\u200F\u202A-\u202E\u2060-\u206F\uFEFF]/g, '').replace(/^\s*#{1,6}\s*/, '').trim();

/** Change only the assistant's visible speaker label, leaving quoted message text intact. */
export function normalizeCapturedSpeakerLabels(document: Document, conversation: Conversation) {
  const articles = [...document.querySelectorAll<HTMLElement>(turns)]
    .filter(article => !article.parentElement?.closest(turns));
  articles.forEach((article, index) => {
    const turn = conversation.messages.find(message => message.turn_id === article.dataset.turnId) || conversation.messages[index];
    if (turn?.speaker !== 'tutor') return;
    const explicit = [...article.querySelectorAll<HTMLElement>('.capture-speaker,[data-message-attribution],.speaker')]
      .find(element => element.closest(turns) === article && !element.closest('blockquote,pre,code,.content,.markdown,[data-assistant-markdown-root],[data-markdown-text-style]') && (element.matches('.capture-speaker') || label.test(labelText(element))));
    if (explicit) { explicit.textContent = 'Bot'; return; }
    const first = [...article.children].find(child => !child.matches('script,style,[hidden]'));
    if (first?.matches('h1,h2,h3,h4,h5,h6') && label.test(labelText(first))) first.textContent = 'Bot';
  });
}
