"""Build a standalone, offline viewer for nested content-unit annotations."""
import argparse
import json
import html
import re
from collections import Counter
from markdown_it import MarkdownIt
from markdown_it.token import Token
from latex2mathml.converter import convert
from pathlib import Path


def render_document(data, source):
    md=MarkdownIt('commonmark',{'html':False}).enable('table')
    rows=sorted(((p,u) for u in data['evaluation']['content_units'] for p in u['passages']),key=lambda row:row[0]['start'])
    runs=[]
    for p,u in rows:
        if not runs or runs[-1][0]['id']!=u['id']: runs.append((u,[]))
        runs[-1][1].append(p)
    counts=Counter(u['id'] for u,ps in runs); seen=Counter(); result=[]
    for u,ps in runs:
        seen[u['id']]+=1
        start,end=ps[0]['start'],ps[-1]['end']
        text=source[start:end]
        line_ids={}
        for p in ps:
            first=source[start:p['start']].count('\n')
            for n in range(first,first+p['text'].count('\n')+1): line_ids[n]=p
        maths={}
        def math_replace(match):
            key='ANNOTATIONMATHPLACEHOLDER'+str(len(maths))+'END'
            raw=match.group(1) if match.group(1) is not None else match.group(2)
            try: maths[key]=convert(raw,display='inline')
            except Exception: maths[key]=html.escape(match.group(0))
            return key
        text=re.sub(r'\$\$(.+?)\$\$|\$([^$\n]+)\$',math_replace,text)
        tokens=md.parse(text); current=None
        for token in tokens:
            if token.map:
                current=line_ids.get(token.map[0],current)
            if token.type=='inline' and current:
                wrapped=[]; chunk=[]; line=token.map[0] if token.map else None
                def wrap(items, passage):
                    if not items: return []
                    opening=Token('html_inline','',0)
                    opening.content='<mark data-id="'+html.escape(passage['id'],quote=True)+'" data-category="'+passage['category']+'" tabindex="0" role="button" title="'+html.escape(passage['category']+': '+u['label'],quote=True)+'">'
                    closing=Token('html_inline','',0); closing.content='</mark>'
                    return [opening]+items+[closing]
                for child in token.children or []:
                    if child.type in ('softbreak','hardbreak'):
                        wrapped+=wrap(chunk,line_ids.get(line,current)); wrapped.append(child);chunk=[]
                        if line is not None:line+=1
                    else:chunk.append(child)
                wrapped+=wrap(chunk,line_ids.get(line,current));token.children=wrapped
        rendered=md.renderer.render(tokens,md.options,{})
        for key,value in maths.items(): rendered=rendered.replace(key,value)
        label=u['id']+': '+u['kind'].lower().replace('_',' ')
        if counts[u['id']]>1: label+=': part '+str(seen[u['id']])+'/'+str(counts[u['id']])
        result.append('<section class="unit-box" tabindex="0" role="group" data-unit="'+u['id']+'" data-label="'+html.escape(label,quote=True)+'" aria-label="'+html.escape('Content unit '+label+': '+u['label'],quote=True)+'">'+rendered+'</section>')
    return ''.join(result)


def build(source, output):
    data=json.loads(source.read_text(encoding="utf-8"))
    units=data["evaluation"]["content_units"]
    assert all("text" in p for u in units for p in u["passages"]), "Enriched passages required"
    source_text=source.with_name("source.md").read_text(encoding="utf-8")
    spans=sorted((p for u in units for p in u["passages"]),key=lambda p:p["start"])
    last=0
    for p in spans:
        assert p["start"]>=last and source_text[p["start"]:p["end"]]==p["text"], "Invalid source span"
        last=p["end"]
    data["viewer_source_text"]=source_text
    data["viewer_rendered_html"]=render_document(data,source_text)
    template=Path(__file__).with_name("annotation_viewer.html").read_text(encoding="utf-8")
    payload=json.dumps(data,ensure_ascii=False).replace("<", "\\u003c").replace(">", "\\u003e").replace("&", "\\u0026")
    output.write_text(template.replace("__ANNOTATION_DATA__",payload),encoding="utf-8")
    print(output.resolve())


if __name__=="__main__":
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument("source",type=Path)
    parser.add_argument("--output",type=Path)
    args=parser.parse_args()
    build(args.source,args.output or args.source.with_name("annotation.html"))
