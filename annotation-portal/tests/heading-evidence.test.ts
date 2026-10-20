import {expect,it} from 'vitest';
import {headingRanges,tutorHeadingInventory} from '../server/heading-evidence';
import {modelSourcePassages} from '../server/source-passages';

it('recognizes Markdown and standalone bold headings without accepting code or body emphasis',()=>{
 const text='# Main\nBody **emphasis** here.\n\nUnit\n----\n\n**Subunit:**\n\n```md\n# Fake heading\n```\n\n**Bold\nbody paragraph**\n';
 expect(headingRanges(text).map(range=>text.slice(range.start,range.end))).toEqual(['# Main','Unit\n----','**Subunit:**']);
});

it('detects bold titles without a blank line, inside lists, and with punctuation outside the bold text',()=>{
 const text='**How it works:**\nBody text.\n\n**Example**:\nAn example.\n\n1. **Measurement**\n   Explanation.\n\n__தலைப்பு__\nவிளக்கம்.\n\nBody **emphasis** here.\n\n**Bold\nbody paragraph**';
 expect(headingRanges(text).map(range=>text.slice(range.start,range.end))).toEqual(['**How it works:**','**Example**:','**Measurement**','__தலைப்பு__']);
});

it('inventories tutor headings with exact occurrence numbers and excludes student and code headings',()=>{
 const conversation={messages:[{speaker:'tutor',turn_id:'t1',text:'Mention **Example:** here.\n\n**Example:**\nBody.\n\n**Example:**\nMore body.\n\n```md\n**Fake:**\n```'},{speaker:'student',turn_id:'s1',text:'**Student title**'}]};
 expect(tutorHeadingInventory(conversation)).toEqual([{turn_id:'t1',quote:'**Example:**',occurrence:2},{turn_id:'t1',quote:'**Example:**',occurrence:3}]);
});

it('maps sanitized HTML headings, bold-only titles, and table headers to canonical text',()=>{
 const html='<h2>Main</h2><p><strong>Bold title</strong></p><table><thead><tr><th>A</th><th>B</th></tr></thead><tbody><tr><td>row</td></tr></tbody></table>';
 const text='Main\nBold title\nAB\nrow\n';
 expect(headingRanges(text,html).map(range=>text.slice(range.start,range.end))).toEqual(['Main','Bold title']);
 expect(tutorHeadingInventory({messages:[{speaker:'tutor',turn_id:'t1',text}]},{t1:html})).toEqual([{turn_id:'t1',quote:'Main',occurrence:1},{turn_id:'t1',quote:'Bold title',occurrence:1}]);
});

it('recognizes a table first row as the header when captured HTML omits th tags',()=>{
 const html='<table><tr><td>Chamber</td><td>Function</td></tr><tr><td>Atrium</td><td>Receives</td></tr></table>';
 const conversation={messages:[{speaker:'tutor',turn_id:'t1',text:'Chamber\nFunction\nAtrium\nReceives\n'}]};
 expect(modelSourcePassages(conversation,{'t1':html}).filter(source=>source.kind==='table_header').map(source=>source.quote)).toEqual(['Chamber\nFunction']);
});
