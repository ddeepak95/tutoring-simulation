const decimalZeros=[0x0030,0x0660,0x06f0,0x0966,0x09e6,0x0be6,0x0ce6,0x0e50,0xff10];

export function numberSequences(text){
 return (text.match(/[\p{Nd}]+(?:[.,][\p{Nd}]+)*/gu)||[]).map(number=>[...number].map(char=>{
  if(char==='.'||char===',')return char;
  const code=char.codePointAt(0),zero=decimalZeros.find(start=>code>=start&&code<start+10);
  return zero===undefined?char:String(code-zero);
 }).join(''));
}

const numberWords=['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen','twenty'];
const ordinalWords=['zeroth','first','second','third','fourth','fifth','sixth','seventh','eighth','ninth','tenth','eleventh','twelfth','thirteenth','fourteenth','fifteenth','sixteenth','seventeenth','eighteenth','nineteenth','twentieth'];
const equivalentWords={0:['scratch'],1:['single','once'],2:['twice','double','doubles','doubled','half','halved'],3:['thrice','triple','triples','tripled']};

const scaledUnits=[
 [/^(?:billion\b|பில்லியன்|बिलियन|বিলিয়ন|ಬಿಲಿಯನ್|พันล้าน)/iu,1e9],
 [/^(?:crore\b|கோடி|करोड़|কোটি|ಕೋಟಿ)/iu,1e7],
 [/^(?:million\b|மில்லியன்|मिलियन|মিলিয়ন|ಮಿಲಿಯನ್|ล้าน)/iu,1e6],
 [/^(?:lakh\b|லட்சம்|லட்ச|लाख|লাখ|ಲಕ್ಷ)/iu,1e5],
 [/^(?:亿|億)/u,1e8],
];

function comparableNumbers(text){
 const numbers=[...text.matchAll(/[\p{Nd}]+(?:[.,][\p{Nd}]+)*/gu)].map(match=>{
  const plain=numberSequences(match[0])[0];
  const following=text.slice(match.index+match[0].length).replace(/^[\s*_]+/u,'');
  const unit=scaledUnits.find(([pattern])=>pattern.test(following));
  if(!unit)return plain;
  const number=Number(plain.replace(/,/g,''));
  return Number.isFinite(number)?String(number*unit[1]):plain;
 }).filter(number=>number!==null);
 const chineseDigits={一:'1',二:'2',三:'3',四:'4',五:'5',六:'6',七:'7',八:'8',九:'9',十:'10'};
 for(const match of text.matchAll(/(?:情形|情况|案例|步骤|方案|陷阱|要点|坑|第)([一二三四五六七八九十])(?=[:：、\s]|$)/gu))numbers.push(chineseDigits[match[1]]);
 for(const match of text.matchAll(/第([一二三四五六七八九十])(?=部分|节|章|个)/gu))numbers.push(chineseDigits[match[1]]);
 for(const match of text.matchAll(/^\s*#{1,6}\s*([一二三四五六七八九十])(?=[.、:：\s])/gmu))numbers.push(chineseDigits[match[1]]);
 const romanDigits={I:'1',II:'2',III:'3',IV:'4',V:'5',VI:'6',VII:'7',VIII:'8',IX:'9',X:'10'};
 for(const match of text.matchAll(/^\s*#{1,6}\s*(I|II|III|IV|V|VI|VII|VIII|IX|X)(?=[.、:：\s])/gmu))numbers.push(romanDigits[match[1]]);
 return numbers;
}

export function numbersEquivalent(source,target){
 const remaining=comparableNumbers(source),actual=comparableNumbers(target);
 for(const number of actual){const index=remaining.indexOf(number);if(index<0)return false;remaining.splice(index,1);}
 if(!remaining.length)return true;
 const words=(target.toLowerCase().match(/\b[a-z]+\b/g)||[]);
 for(const number of remaining){
  const value=Number(number);
  if(!Number.isInteger(value)||value<0||value>20)return false;
  if(value===1&&/1\s*ข้อ/u.test(source)&&/\b(?:a|an|one)(?:\s+\w+){0,2}\s+question\b/i.test(target))continue;
  const index=words.findIndex(word=>word===numberWords[value]||word===ordinalWords[value]||equivalentWords[value]?.includes(word));
  if(index<0)return false;
  words.splice(index,1);
 }
 return true;
}
