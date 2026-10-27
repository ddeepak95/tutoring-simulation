export function RichText({ text }: { text: string }) {
  return <>{text.split(/(<br><br>|<br>|\*\*[^*]+\*\*|`[^`]+`)/g).map((part, i) => part === '<br><br>' ? <span key={i}><br /><br /></span> : part === '<br>' ? <br key={i} /> : part.startsWith('**') ? <strong key={i}>{part.slice(2, -2)}</strong> : part.startsWith('`') ? <code key={i}>{part.slice(1, -1)}</code> : part)}</>;
}
