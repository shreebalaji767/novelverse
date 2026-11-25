(async()=>{'use strict';
const grid=document.getElementById('novels-grid');
const search=document.getElementById('novel-search');
const filter=document.getElementById('status-filter');
const count=document.getElementById('catalogue-count');
if(!grid||!search||!filter)return;
let novels=[];
const el=(tag,className,text)=>{const node=document.createElement(tag);if(className)node.className=className;if(text!==undefined)node.textContent=text;return node};
function render(){
 const q=(search.value||'').trim().toLowerCase(),status=filter.value;
 const found=novels.filter(n=>(status==='all'||n.status===status)&&[n.title,n.subtitle,n.author,n.synopsis,...(n.genres||[]),...(n.tags||[])].join(' ').toLowerCase().includes(q));
 grid.replaceChildren();
 if(count)count.textContent=found.length===1?'1 published novel':found.length+' published novels';
 if(!found.length){
  const empty=el('div','novels-empty');
  empty.append(el('strong','',novels.length?'No matching novels':'No novels published yet'),el('p','',novels.length?'Try a different search or status filter.':'Published series will appear here.'));
  grid.append(empty);return;
 }
 found.forEach(novel=>{
  const card=el('article','novel-card');
  if(novel.profileOnly){
   const heading=el('h3','');
   const titleLink=el('a','',novel.title||'Untitled');
   titleLink.href='./series.html?id='+encodeURIComponent(novel.id);
   heading.append(titleLink);
   const synopsis=el('p','novel-synopsis',novel.synopsis||'');
   const more=el('button','read-more-toggle','Read more');
   more.type='button';more.hidden=(novel.synopsis||'').length<=190;more.setAttribute('aria-expanded','false');
   more.addEventListener('click',()=>{const expanded=synopsis.classList.toggle('is-expanded');more.textContent=expanded?'Read less':'Read more';more.setAttribute('aria-expanded',String(expanded))});
   const genres=el('div','novel-genres');
   (novel.genres||[]).forEach(genre=>genres.append(el('span','novel-genre',genre)));
   card.append(heading,synopsis,more,genres);
   grid.append(card);
   return;
  }
  const href='./series.html?id='+encodeURIComponent(novel.id);
  const meta=el('div','novel-card-meta');
  const status=el('span','novel-status novel-status-'+(novel.status||'published'),(novel.status||'published').replace(/-/g,' ').toUpperCase());
  meta.append(status);
  if(novel.author)meta.append(el('span','novel-author','BY '+novel.author.toUpperCase()));
  const heading=el('h3','');
  const titleLink=el('a','',novel.title||'Untitled');
  titleLink.href=href;
  heading.append(titleLink);
  const synopsis=el('p','novel-synopsis',novel.synopsis||'');
  const synopsisMore=el('button','read-more-toggle','Read more');
  synopsisMore.type='button';synopsisMore.hidden=(novel.synopsis||'').length<=190;
  synopsisMore.setAttribute('aria-expanded','false');
  synopsisMore.addEventListener('click',()=>{const expanded=synopsis.classList.toggle('is-expanded');synopsisMore.textContent=expanded?'Read less':'Read more';synopsisMore.setAttribute('aria-expanded',String(expanded))});
  const genres=el('div','novel-genres');
  (novel.genres||[]).slice(0,4).forEach(genre=>genres.append(el('span','novel-genre',genre)));
  if((novel.genres||[]).length>4)genres.append(el('span','novel-genre novel-genre-more','+'+((novel.genres||[]).length-4)));
  const actions=el('div','novel-card-actions');
  const view=el('a','novel-view-link','View novel');
  view.href=href;
  view.setAttribute('aria-label','View '+(novel.title||'novel'));
  const save=el('button','novel-save-button','');
  save.type='button';
  function updateSaveLabel(){
   const saved=NovelVerseShelf.has(novel.id);
   save.textContent=saved?'✓ Saved to My Library':'＋ Save to My Library';
   save.classList.toggle('is-saved',saved);
   save.setAttribute('aria-pressed',String(saved));
  }
  updateSaveLabel();
  save.addEventListener('click',()=>{
   if(NovelVerseShelf.has(novel.id)){NovelVerseShelf.remove(novel.id)}
   else{const result=NovelVerseShelf.add(novel);if(!result.ok){save.textContent='Storage unavailable';return}}
   updateSaveLabel();
  });
  actions.append(view,save);
  card.append(meta,heading,synopsis,synopsisMore,genres,actions);
  grid.append(card);
 });
}
try{
 const data=await NovelVerseData.getJSON('novels.json');
 novels=(data.novels||[]).filter(n=>n.status!=='draft');
 render();
}catch(error){
 console.warn('Novel catalogue error:',error);
 grid.replaceChildren();
 const message=el('div','novels-empty');
 message.append(el('strong','','Unable to load novels'),el('p','','Please refresh the page and try again.'));
 grid.append(message);
}
search.addEventListener('input',render);
filter.addEventListener('change',render);
})();