import fs from 'node:fs';
import path from 'node:path';
const json=(file)=>JSON.parse(fs.readFileSync(file,'utf8'));
const catalogue=json('data/novels.json');
if(!Array.isArray(catalogue.novels))throw new Error('novels.json must contain a novels array');
const chapterIndex=json('data/chapters.json');
if(!Array.isArray(chapterIndex.chapters))throw new Error('chapters.json must contain a chapters array');
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
}
const characters=json('data/characters.json');
const worlds=json('data/worlds.json');
if(!Array.isArray(characters.characters))throw new Error('characters.json must contain a characters array');
if(!Array.isArray(worlds.worlds))throw new Error('worlds.json must contain a worlds array');
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
const seriesPage=fs.readFileSync('series.html','utf8');
const seriesScript=fs.readFileSync('js/pages/series.js','utf8');
for(const control of ['series-title','series-synopsis','series-save','volume-list','character-list','world-content'])if(!seriesPage.includes('id="'+control+'"'))throw new Error('Missing series detail section: '+control);
for(const feature of ['flatten(novel)','renderChapters','renderCharacters','renderWorld','NovelVerseShelf.add'])if(!seriesScript.includes(feature))throw new Error('Missing series detail feature: '+feature);
if(!fs.readFileSync('sw.js','utf8').includes('./series.html'))throw new Error('Series page missing from offline app shell');
for(const file of ['characters.html','character.html','worlds.html','world.html'])if(!fs.readFileSync(file,'utf8').includes('./css/encyclopedia.css'))throw new Error('Encyclopedia stylesheet missing from '+file);
for(const file of ['characters.html','character.html','worlds.html','world.html'])if(!fs.existsSync('js/pages/'+file.replace('.html','.js')))throw new Error('Encyclopedia script missing for '+file);
for(const file of ['index.html','novels.html','my-library.html','calendar.html','about.html']){const html=fs.readFileSync(file,'utf8');if(!html.includes('./characters.html')||!html.includes('./worlds.html'))throw new Error('Encyclopedia navigation missing from '+file)}
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
if(!fs.readFileSync('sw.js','utf8').includes('novelverse-shell-v8'))throw new Error('Offline shell cache must include the latest reader and publishing studio assets');

const publishingPage=fs.readFileSync('publish.html','utf8');
const publishingScript=fs.readFileSync('js/pages/publish.js','utf8');
for(const control of ['novel-id','novel-title','publish-volumes','publish-characters','publish-worlds','validate-package','export-package','draft-import'])if(!publishingPage.includes('id="'+control+'"'))throw new Error('Missing publishing studio control: '+control);
for(const feature of ['novelverse-publishing-package','chapterFiles','localStorage.setItem(draftKey','safeId','createObjectURL','importState'])if(!publishingScript.includes(feature))throw new Error('Missing publishing studio feature: '+feature);
if(!publishingScript.includes('Nothing is uploaded automatically')&&!publishingPage.includes('Nothing is uploaded automatically'))throw new Error('Publishing Studio must disclose local-only publishing');
if(!fs.readFileSync('sw.js','utf8').includes('./publish.html'))throw new Error('Publishing Studio missing from offline app shell');
