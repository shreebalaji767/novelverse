(async()=>{'use strict';
const grid=document.getElementById('novels-grid');
const search=document.getElementById('novel-search');
const filter=document.getElementById('status-filter');
const count=document.getElementById('catalogue-count');
if(!grid)return;
let novels=[];
const el=(tag,className,text)=>{const node=document.createElement(tag);if(className)node.className=className;if(text!==undefined)node.textContent=text;return node};
function render(){
 const q=(search.value||'').trim().toLowerCase(),status=filter.value;
 const found=novels.filter(n=>(status==='all'||n.status===status)&&[n.title,n.subtitle,n.author,n.synopsis,...(n.genres||[]),...(n.tags||[])].join(' ').toLowerCase().includes(q));
 grid.replaceChildren();
 if(count)count.textContent=found.length===1?'01 published series':String(found.length).padStart(2,'0')+' published series';
 if(!found.length){
  const empty=el('div','novels-empty');
  empty.append(el('span','empty-ornament','✦'),el('strong','',novels.length?'No stories found.':'The first chapter of this collection is yet to be written.'),el('p','',novels.length?'Try another title, genre or status.':'New series will appear here when they are published.'));
  grid.append(empty);return;
 }
 found.forEach((novel,index)=>{
  const card=el('article','novel-card');
  const href='./series.html?id='+encodeURIComponent(novel.id);
  const cover=el('div','novel-cover');
  const coverTop=el('div','novel-cover-top');
  coverTop.append(el('span','novel-cover-edition','NOVELVERSE ORIGINAL'),el('span','novel-cover-number',String(index+1).padStart(2,'0')));
  const monogram=el('span','novel-cover-monogram',novel.coverMark||((novel.title||'NV').trim().split(/\\s+/).slice(0,2).map(word=>word[0]).join('').toUpperCase()));
  const coverRule=el('span','novel-cover-rule');
  const coverTitle=el('span','novel-cover-title',novel.subtitle||novel.title||'Untitled');
  const coverBottom=el('span','novel-cover-bottom','A STORY TO DISCOVER');
  cover.append(coverTop,monogram,coverRule,coverTitle,coverBottom);
  const body=el('div','novel-card-body');
  const meta=el('div','novel-card-meta');
  const status=el('span','novel-status novel-status-'+(novel.status||'series'),(novel.status||'series').replace(/-/g,' ').toUpperCase());
  meta.append(status);
  if(novel.author)meta.append(el('span','novel-author','BY '+novel.author.toUpperCase()));
  const heading=el('h3','');
  const titleLink=el('a','',novel.title||'Untitled');titleLink.href=href;heading.append(titleLink);
  const synopsis=el('p','novel-synopsis',novel.synopsis||'Discover this series and explore its world.');
  const genres=el('div','novel-genres');
  (novel.genres||[]).slice(0,4).forEach(genre=>genres.append(el('span','novel-genre',genre)));
  if((novel.genres||[]).length>4)genres.append(el('span','novel-genre novel-genre-more','+'+((novel.genres||[]).length-4)));
  const actions=el('div','novel-card-actions');
  const view=el('a','novel-view-link','Explore series');view.href=href;view.setAttribute('aria-label','Explore '+(novel.title||'series'));
  const save=el('button','novel-save-button','');
  save.type='button';
  function label(){const saved=NovelVerseShelf.has(novel.id);save.textContent=saved?'✓ Saved to My Library':'＋ Save';save.classList.toggle('is-saved',saved);save.setAttribute('aria-pressed',String(saved));}
  label();
  save.addEventListener('click',()=>{if(NovelVerseShelf.has(novel.id)){NovelVerseShelf.remove(novel.id)}else{const result=NovelVerseShelf.add(novel);if(!result.ok){save.textContent='Storage unavailable';return}}label()});
  actions.append(view,save);
  body.append(meta,heading,synopsis,genres,actions);
  card.append(cover,body);grid.append(card);
 });
}
try{const data=await NovelVerseData.getJSON('novels.json');novels=(data.novels||[]).filter(n=>n.status!=='draft');render()}
catch(error){console.warn('Novel catalogue error:',error);grid.textContent='The novel catalogue could not be loaded. Please try again.'}
search.addEventListener('input',render);filter.addEventListener('change',render);
})();