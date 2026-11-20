import fs from 'node:fs';
import path from 'node:path';
const json=(file)=>JSON.parse(fs.readFileSync(file,'utf8'));
const catalogue=json('data/novels.json');
if(!Array.isArray(catalogue.novels))throw new Error('novels.json must contain a novels array');
const wrongHeiress=catalogue.novels.find(n=>n.id==='the-wrong-heiress');
if(!wrongHeiress||!wrongHeiress.title||!wrongHeiress.synopsis||!Array.isArray(wrongHeiress.genres)||!wrongHeiress.genres.length)throw new Error('The Wrong Heiress title, synopsis and genres must be published');
const chapterIndex=json('data/chapters.json');
if(!Array.isArray(chapterIndex.chapters))throw new Error('chapters.json must contain a chapters array');
if(!chapterIndex.chapters.some(chapter=>chapter.id==='chapter-1'&&chapter.novelId==='the-wrong-heiress'))throw new Error('The Wrong Heiress Chapter 1 must appear in the chapter index');
if(!chapterIndex.chapters.some(chapter=>chapter.id==='chapter-2'&&chapter.novelId==='the-wrong-heiress'&&chapter.title==='The Man Who Ordered the Entire Restaurant'))throw new Error('The Wrong Heiress Chapter 2 must appear in the chapter index');
if(!chapterIndex.chapters.some(chapter=>chapter.id==='chapter-3'&&chapter.novelId==='the-wrong-heiress'&&chapter.title==='Four Brothers and One Very Bad Plan'))throw new Error('The Wrong Heiress Chapter 3 must appear in the chapter index');
if(!chapterIndex.chapters.some(chapter=>chapter.id==='chapter-4'&&chapter.novelId==='the-wrong-heiress'&&chapter.title==='The Welcome Dinner Disaster'))throw new Error('The Wrong Heiress Chapter 4 must appear in the chapter index');

const ids=new Set();
const chapterIdsByNovel=new Map();
for(const novel of catalogue.novels){
  if(!novel.id||!novel.title)throw new Error('Every novel requires id and title');
  if(ids.has(novel.id))throw new Error('Duplicate novel ID: '+novel.id);
  ids.add(novel.id);
  if(novel.contentPath?.includes('..'))throw new Error('Unsafe content path: '+novel.id);
  const chapterIds=new Set();
  const allChapters=Array.isArray(novel.chapters)&&novel.chapters.length?novel.chapters:(novel.volumes||[]).flatMap(volume=>volume.chapters||[]);
  for(const chapter of allChapters){
    if(!chapter.id||!chapter.path)throw new Error('Every chapter requires id and path: '+novel.id);
    if(chapterIds.has(chapter.id))throw new Error('Duplicate chapter ID in '+novel.id+': '+chapter.id);
    chapterIds.add(chapter.id);
    if(path.isAbsolute(chapter.path)||chapter.path.split('/').includes('..'))throw new Error('Unsafe chapter path: '+chapter.path);
    if(!fs.existsSync(chapter.path))throw new Error('Missing chapter file: '+chapter.path);
  }
  chapterIdsByNovel.set(novel.id,chapterIds);
  if(novel.id==='the-wrong-heiress'){
    const chapter=allChapters.find(item=>item.id==='chapter-1');
    if(!chapter||chapter.title!=="Congratulations, You're Not Our Daughter"||chapter.path!=='novels/the-wrong-heiress/chapters/chapter-1.md')throw new Error('The Wrong Heiress Chapter 1 must be registered with its published title and path');
    if(!fs.readFileSync(chapter.path,'utf8').includes('**End of Chapter 1**'))throw new Error('The Wrong Heiress Chapter 1 content file is incomplete');
    const chapter2=allChapters.find(item=>item.id==='chapter-2');
    if(!chapter2||chapter2.title!=='The Man Who Ordered the Entire Restaurant'||chapter2.path!=='novels/the-wrong-heiress/chapters/chapter-2.md')throw new Error('The Wrong Heiress Chapter 2 must be registered with its published title and path');
    if(!fs.readFileSync(chapter2.path,'utf8').includes('**End of Chapter 2**'))throw new Error('The Wrong Heiress Chapter 2 content file is incomplete');
    const chapter3=allChapters.find(item=>item.id==='chapter-3');
    if(!chapter3||chapter3.title!=='Four Brothers and One Very Bad Plan'||chapter3.path!=='novels/the-wrong-heiress/chapters/chapter-3.md')throw new Error('The Wrong Heiress Chapter 3 must be registered with its published title and path');
    if(!fs.readFileSync(chapter3.path,'utf8').includes('**End of Chapter 3**'))throw new Error('The Wrong Heiress Chapter 3 content file is incomplete');
    const chapter4=allChapters.find(item=>item.id==='chapter-4');
    if(!chapter4||chapter4.title!=='The Welcome Dinner Disaster'||chapter4.path!=='novels/the-wrong-heiress/chapters/chapter-4.md')throw new Error('The Wrong Heiress Chapter 4 must be registered with its published title and path');
    if(!fs.readFileSync(chapter4.path,'utf8').includes('**End of Chapter 4**'))throw new Error('The Wrong Heiress Chapter 4 content file is incomplete');
  }

}
const characters=json('data/characters.json');
const worlds=json('data/worlds.json');
if(!Array.isArray(characters.characters))throw new Error('characters.json must contain a characters array');
if(!Array.isArray(worlds.worlds))throw new Error('worlds.json must contain a worlds array');
const wrongHeiressCharacters=characters.characters.filter(c=>c.novelId==='the-wrong-heiress');
if(wrongHeiressCharacters.length!==20)throw new Error('The Wrong Heiress character records are incomplete');
const characterKeys=new Set();
for(const character of characters.characters){
  if(!character.id||!character.novelId||!character.name)throw new Error('Every character requires id, novelId and name');
  if(!ids.has(character.novelId))throw new Error('Character references unknown novel: '+character.novelId);
  const key=character.novelId+':'+character.id;
  if(characterKeys.has(key))throw new Error('Duplicate character ID: '+key);
  characterKeys.add(key);
  if(character.spoiler!==undefined&&typeof character.spoiler!=='boolean')throw new Error('Character spoiler flag must be boolean: '+key);
  for(const appearance of character.appearances||[])if(appearance.chapterId&&!chapterIdsByNovel.get(character.novelId)?.has(appearance.chapterId))throw new Error('Unknown chapter appearance: '+key+' -> '+appearance.chapterId);
}
for(const character of characters.characters){
  for(const relation of character.relationships||[])if(relation.characterId&&!characterKeys.has(character.novelId+':'+relation.characterId))throw new Error('Unknown character relationship: '+character.novelId+':'+relation.characterId);
}
const wrongHeiressWorlds=worlds.worlds.filter(w=>w.novelId==='the-wrong-heiress');
if(wrongHeiressWorlds.length!==1||wrongHeiressWorlds[0].name!=='The Modern Sovereign World'||wrongHeiressWorlds[0].powerHierarchy?.length!==6)throw new Error('The Wrong Heiress world record is missing');
const worldKeys=new Set();
for(const world of worlds.worlds){
  if(!world.id||!world.novelId||!world.name)throw new Error('Every world requires id, novelId and name');
  if(!ids.has(world.novelId))throw new Error('World references unknown novel: '+world.novelId);
  const key=world.novelId+':'+world.id;
  if(worldKeys.has(key))throw new Error('Duplicate world ID: '+key);
  worldKeys.add(key);
  if(world.spoiler!==undefined&&typeof world.spoiler!=='boolean')throw new Error('World spoiler flag must be boolean: '+key);
  for(const group of ['locations','organizations','timeline']){
    const entryIds=new Set();
    for(const entry of world[group]||[]){
      if(!entry.id||!(entry.name||entry.title))throw new Error('Every '+group+' entry needs an id and name/title: '+key);
      if(entryIds.has(entry.id))throw new Error('Duplicate '+group+' ID in '+key+': '+entry.id);
      entryIds.add(entry.id);
      if(entry.spoiler!==undefined&&typeof entry.spoiler!=='boolean')throw new Error('Spoiler flag must be boolean: '+key+'/'+entry.id);
      if(entry.chapterId&&!chapterIdsByNovel.get(world.novelId)?.has(entry.chapterId))throw new Error('Unknown timeline chapter: '+key+'/'+entry.id);
    }
  }
}
for(const file of ['data/site.json','data/releases.json','data/announcements.json','manifest.json'])json(file);
for(const file of ['index.html','novels.html','series.html','characters.html','character.html','worlds.html','world.html','my-library.html','reader.html','calendar.html','about.html','publish.html','sw.js'])if(!fs.existsSync(file))throw new Error('Missing required page: '+file);
for(const file of ['index.html','novels.html','my-library.html','calendar.html','about.html'])if(!fs.readFileSync(file,'utf8').includes('./reader.html'))throw new Error('Reader navigation missing from '+file);
const sharedSiteScript=fs.readFileSync('js/core/site.js','utf8');
for(const link of ['Home','Novels','Reader','Characters','Worlds','My Library','Release calendar','Publishing Studio','About'])if(!sharedSiteScript.includes("'"+link+"'"))throw new Error('Shared navigation link missing: '+link);
for(const file of ['index.html','novels.html','series.html','characters.html','character.html','worlds.html','world.html','my-library.html','reader.html','calendar.html','about.html','publish.html']){const html=fs.readFileSync(file,'utf8');if(!html.includes('./js/core/site.js'))throw new Error('Shared navigation controller missing from '+file)}
const seriesPage=fs.readFileSync('series.html','utf8');
const seriesScript=fs.readFileSync('js/pages/series.js','utf8');
if(!seriesScript.includes("getJSON('characters.json')")||!seriesScript.includes("getJSON('worlds.json')"))throw new Error('Series page must load published character and world records');
for(const control of ['series-title','series-synopsis','series-save','volume-list','character-list','world-content'])if(!seriesPage.includes('id="'+control+'"'))throw new Error('Missing series detail section: '+control);
for(const feature of ['flatten(novel)','renderChapters','renderCharacters','renderWorld','NovelVerseShelf.add'])if(!seriesScript.includes(feature))throw new Error('Missing series detail feature: '+feature);
if(!fs.readFileSync('sw.js','utf8').includes('./series.html'))throw new Error('Series page missing from offline app shell');
if(!fs.readFileSync('series.html','utf8').includes('series-synopsis-panel'))throw new Error('Series synopsis should use the clean expandable presentation');
if(fs.readFileSync('css/series.css','utf8').includes('.series-cover{'))throw new Error('Series page should not display a decorative placeholder cover');
for(const file of ['characters.html','character.html','worlds.html','world.html'])if(!fs.readFileSync(file,'utf8').includes('./css/encyclopedia.css'))throw new Error('Encyclopedia stylesheet missing from '+file);
for(const file of ['characters.html','character.html','worlds.html','world.html'])if(!fs.existsSync('js/pages/'+file.replace('.html','.js')))throw new Error('Encyclopedia script missing for '+file);
for(const file of ['index.html','novels.html','my-library.html','calendar.html']){const html=fs.readFileSync(file,'utf8');if(!html.includes('./characters.html')||!html.includes('./worlds.html'))throw new Error('Encyclopedia navigation missing from '+file)}
const worldPage=fs.readFileSync('world.html','utf8');if(!worldPage.includes('world-reveal'))throw new Error('World spoiler control missing');
const characterPage=fs.readFileSync('character.html','utf8');if(!characterPage.includes('character-reveal'))throw new Error('Character spoiler control missing');
const shelfPage=fs.readFileSync('my-library.html','utf8');
const shelfScript=fs.readFileSync('js/pages/my-library.js','utf8');
for(const control of ['export-backup','import-backup','clear-shelf','shelf-search','shelf-stats'])if(!shelfPage.includes('id="'+control+'"'))throw new Error('Missing My Library control: '+control);
if(!shelfPage.includes('Import merges with existing data'))throw new Error('Missing merge behavior explanation');
for(const feature of ['novelverse-local-backup','MAX_BACKUP','validBackup','mergeReader'])if(!shelfScript.includes(feature))throw new Error('Missing local backup safeguard: '+feature);
if(!shelfScript.includes('novelverse.reader.v1'))throw new Error('Local backup must preserve reader data');
console.log('NovelVerse validation passed; novels:',ids.size,'; chapters:',chapterIndex.chapters.length,'; characters:',characters.characters.length,'; worlds:',worlds.worlds.length,'; encyclopedia and backup controls: verified');

const readerPage=fs.readFileSync('reader.html','utf8');
const readerScript=fs.readFileSync('js/core/reader.js','utf8');
for(const control of ['chapter-meta','reader-width','reader-theme','bookmark-button','progress-fill','chapter-progress-label'])if(!readerPage.includes('id="'+control+'"'))throw new Error('Missing reader control: '+control);
for(const feature of ['renderMarkdown','reading-status','noopener noreferrer','toLocaleString','aria-valuenow'])if(!readerScript.includes(feature))throw new Error('Missing reader enhancement: '+feature);
if(!readerScript.includes('Math.max(280'))throw new Error('Reader width must support narrow mobile screens');
if(!fs.readFileSync('css/reader.css','utf8').includes('max-width:min(var(--reader-width),100%)'))throw new Error('Reader chapter column must respect its adjustable width');
if(readerScript.includes('NovelVerseShelf.add')||readerScript.includes('novelverse.myLibrary.v1'))throw new Error('Reading chapters must never automatically add novels to My Library');
if(!readerPage.includes('Reading never adds a series to My Library automatically'))throw new Error('Reader must explain that saving to My Library is always manual');
if(!fs.readFileSync('sw.js','utf8').includes('novelverse-shell-v23'))throw new Error('Offline shell cache must include the latest branded logo and site assets');

const publishingPage=fs.readFileSync('publish.html','utf8');
const publishingScript=fs.readFileSync('js/pages/publish.js','utf8');
for(const control of ['novel-id','novel-title','publish-volumes','publish-characters','publish-worlds','validate-package','export-package','draft-import'])if(!publishingPage.includes('id="'+control+'"'))throw new Error('Missing publishing studio control: '+control);
for(const feature of ['novelverse-publishing-package','chapterFiles','localStorage.setItem(draftKey','safeId','createObjectURL','importState'])if(!publishingScript.includes(feature))throw new Error('Missing publishing studio feature: '+feature);
if(!publishingScript.includes('Nothing is uploaded automatically')&&!publishingPage.includes('Nothing is uploaded automatically'))throw new Error('Publishing Studio must disclose local-only publishing');
if(!fs.readFileSync('sw.js','utf8').includes('./publish.html'))throw new Error('Publishing Studio missing from offline app shell');

for(const file of ['assets/logo/favicon.svg','assets/logo/novelverse-mark.svg'])if(!fs.existsSync(file))throw new Error('Missing transparent NovelVerse logo asset: '+file);
for(const file of ['index.html','novels.html','reader.html','series.html','characters.html','character.html','worlds.html','world.html','my-library.html','calendar.html','about.html','publish.html']){const html=fs.readFileSync(file,'utf8');if(!html.includes('./assets/logo/favicon.svg'))throw new Error('Favicon missing from '+file);if(!html.includes('class="brand-logo"'))throw new Error('Brand logo missing from '+file)}
const siteScript=fs.readFileSync('js/core/site.js','utf8');if(!siteScript.includes('beforeinstallprompt')||!siteScript.includes('Install app'))throw new Error('PWA install action missing');

const novelsPage=fs.readFileSync('novels.html','utf8');
const novelsScript=fs.readFileSync('js/pages/novels.js','utf8');
const novelsStyles=fs.readFileSync('css/novels.css','utf8');
if(!novelsPage.includes('./css/novels.css'))throw new Error('Novels page stylesheet missing');
for(const selector of ['novels-intro','novels-catalogue','novels-toolbar','catalogue-count'])if(!novelsPage.includes(selector))throw new Error('Missing Novels section: '+selector);
for(const feature of ['novel-card-meta','novel-genres','novel-save-button','catalogue-count','View novel'])if(!novelsScript.includes(feature))throw new Error('Missing clean novel card feature: '+feature);
if(novelsScript.includes('novel-cover')||novelsStyles.includes('novel-cover'))throw new Error('Novels catalogue should not render decorative placeholder book covers');
if(!novelsStyles.includes('@media(max-width:640px)')||!fs.readFileSync('sw.js','utf8').includes('./css/novels.css'))throw new Error('Novels page responsive/offline styling missing');

const aboutPage=fs.readFileSync('about.html','utf8');
for(const section of ['about-hero','about-principles','about-reading','about-how','about-privacy','about-publishing','about-final-cta'])if(!aboutPage.includes('class="'+section+'"'))throw new Error('Missing About page section: '+section);
if(!aboutPage.includes('./css/about.css'))throw new Error('About page stylesheet missing');
if(!fs.readFileSync('sw.js','utf8').includes('./css/about.css'))throw new Error('About stylesheet missing from offline app shell');
if(!aboutPage.includes('Skip to content'))throw new Error('About page skip link missing');
