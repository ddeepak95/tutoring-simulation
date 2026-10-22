import type { Conversation } from './types';

const turns = 'article.capture-message,article[data-turn-id]';
const bubbleStyle = `
[data-portal-user-bubble]{display:block!important;box-sizing:border-box!important;width:fit-content!important;max-width:min(82%,720px)!important;margin-left:auto!important;margin-right:0!important;padding:13px 18px!important;border:0!important;border-radius:18px 18px 5px 18px!important;background:#2459b8!important;color:#fff!important;overflow-wrap:anywhere!important;text-align:left!important;box-shadow:none!important}
[data-portal-user-bubble] :is(p,span,strong,em,a,li,div,blockquote,code,pre,th,td){color:inherit!important}
[data-portal-user-bubble] a{color:#fff!important;text-decoration:underline!important}
[data-portal-user-bubble] :is(code,pre){background:#ffffff24!important;border-color:#ffffff40!important}
[data-portal-user-bubble] :is(blockquote,th,td){border-color:#ffffff80!important}
@media(max-width:700px){[data-portal-user-bubble]{max-width:92%!important}}
`;

function markBubble(bubble: HTMLElement) {
  bubble.dataset.portalUserBubble = 'true';
  // Captured pages can contain inline !important rules from ChatGPT's own markup.
  for (const [property, value] of Object.entries({
    display: 'block', 'box-sizing': 'border-box', width: 'fit-content',
    'max-width': 'min(82%, 720px)', 'margin-left': 'auto', 'margin-right': '0',
    padding: '13px 18px', border: '0', 'border-radius': '18px 18px 5px 18px',
    background: '#2459b8', color: '#fff', 'overflow-wrap': 'anywhere',
    'text-align': 'left', 'box-shadow': 'none',
  })) bubble.style.setProperty(property, value, 'important');
}

/** Style the learner's content without changing transcript text or the speaker label. */
export function styleCapturedUserBubbles(document: Document, conversation: Conversation) {
  if (!document.head.querySelector('style[data-portal-user-bubbles]')) {
    const style = document.createElement('style');
    style.dataset.portalUserBubbles = 'true';
    style.textContent = bubbleStyle;
    document.head.append(style);
  }
  const articles = [...document.querySelectorAll<HTMLElement>(turns)]
    .filter(article => !article.parentElement?.closest(turns));
  articles.forEach((article, index) => {
    const turn = conversation.messages.find(message => message.turn_id === article.dataset.turnId) || conversation.messages[index];
    if (turn?.speaker !== 'student') return;
    const existing = article.querySelector<HTMLElement>('[data-portal-user-bubble],[data-user-message-bubble],:scope > .content,:scope > [data-testid="user-message"]');
    if (existing) { markBubble(existing); return; }
    const children = [...article.childNodes];
    const speaker = [...article.children].find(child => child.matches('.capture-speaker,.speaker,h1,h2,h3,h4,h5,h6,strong') && /^(?:you|student|user)\s*:?$/i.test(child.textContent?.trim() || ''));
    const content = children.slice(speaker ? children.indexOf(speaker) + 1 : 0).filter(node => node.nodeType !== Node.TEXT_NODE || Boolean(node.textContent?.trim()));
    if (!content.length) return;
    const bubble = document.createElement('div');
    markBubble(bubble);
    article.insertBefore(bubble, content[0]);
    content.forEach(node => bubble.append(node));
  });
}
