/** Keep actual image/control HTML; discard full-screen application chrome. */
export function galleryReplayHtml(view){
 const doc=new DOMParser().parseFromString(view.html,'text/html'),root=doc.createElement('div');
 root.dataset.capturedGallery='true';root.style.cssText='width:100%;max-width:100%;padding:12px;border:1px solid currentColor;border-radius:8px;box-sizing:border-box';
 for(const image of view.images.filter(i=>i.visible)){
  const original=[...doc.querySelectorAll('img')].find(img=>(img.getAttribute('src')||'')===image.url);if(!original)throw Error('Viewer image HTML is missing.');
  const copy=original.cloneNode(true);copy.removeAttribute('class');copy.removeAttribute('srcset');copy.removeAttribute('loading');copy.style.cssText='display:block;width:auto;height:auto;max-width:100%;max-height:600px;object-fit:contain;margin:0 auto';root.append(copy);
 }
 const nav=doc.createElement('div');nav.style.cssText='display:flex;justify-content:center;gap:12px;margin-top:8px';
 for(const control of view.controls.filter(c=>c.action)){
  const original=doc.querySelector(`[data-image-capture-control="${control.id}"]`);if(!original)throw Error('Viewer control HTML is missing.');
  const button=original.cloneNode(true);button.removeAttribute('class');button.style.cssText='position:relative;inset:auto;display:inline-flex;align-items:center;justify-content:center;min-width:36px;min-height:36px';button.querySelectorAll('[class]').forEach(n=>n.removeAttribute('class'));nav.append(button);
 }
 root.append(nav);return root.outerHTML;
}
