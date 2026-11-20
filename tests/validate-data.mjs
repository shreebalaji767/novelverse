import fs from 'node:fs';
import path from 'node:path';
const json=(file)=>JSON.parse(fs.readFileSync(file,'utf8'));
const catalogue=json('data/novels.json');
if(!Array.isArray(catalogue.novels))throw new Error('novels.json must contain a novels array');
const chapterIndex=json('data/chapters.json');
if(!Array.isArray(chapterIndex.chapters))throw new Error('chapters.json must contain a chapters array');
const ids=new Set();
for(const novel of catalogue.novels){
  if(!novel.id||!novel.title)throw new Error('Every novel requires id and title');
  if(ids.has(novel.id))throw new Error('Duplicate novel ID: '+novel.id);
  ids.add(novel.id);
  if(novel.contentPath?.includes('..'))throw new Error('Unsafe content path: '+novel.id);
  const chapterIds=new Set();
  for(const chapter of novel.chapters||[]){
    if(!chapter.id||!chapter.path)throw new Error('Every chapter requires id and path: '+novel.id);
    if(chapterIds.has(chapter.id))throw new Error('Duplicate chapter ID in '+novel.id+': '+chapter.id);
    chapterIds.add(chapter.id);
    if(path.isAbsolute(chapter.path)||chapter.path.split('/').includes('..'))throw new Error('Unsafe chapter path: '+chapter.path);
    if(!fs.existsSync(chapter.path))throw new Error('Missing chapter file: '+chapter.path);
  }
}
for(const file of ['data/site.json','data/releases.json','data/announcements.json','manifest.json'])json(file);
for(const file of ['index.html','novels.html','my-library.html','reader.html','calendar.html','about.html','sw.js'])if(!fs.existsSync(file))throw new Error('Missing required page: '+file);
for(const file of ['index.html','novels.html','my-library.html','calendar.html','about.html'])if(!fs.readFileSync(file,'utf8').includes('./reader.html'))throw new Error('Reader navigation missing from '+file);
const shelfPage=fs.readFileSync('my-library.html','utf8');
const shelfScript=fs.readFileSync('js/pages/my-library.js','utf8');
for(const control of ['export-backup','import-backup','clear-shelf','shelf-search','shelf-stats'])if(!shelfPage.includes('id="'+control+'"'))throw new Error('Missing My Library control: '+control);
for(const feature of ['novelverse-local-backup','Import merges','MAX_BACKUP','validBackup','mergeReader'])if(!shelfScript.includes(feature))throw new Error('Missing local backup safeguard: '+feature);
if(!shelfScript.includes('novelverse.reader.v1'))throw new Error('Local backup must preserve reader data');
console.log('NovelVerse validation passed; registered novels:',ids.size,'; chapter index entries:',chapterIndex.chapters.length,'; local backup controls: verified');
