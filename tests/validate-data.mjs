import fs from 'node:fs';
const json=(file)=>JSON.parse(fs.readFileSync(file,'utf8'));
const catalogue=json('data/novels.json');
if(!Array.isArray(catalogue.novels))throw new Error('novels.json must contain a novels array');
const ids=new Set();
for(const novel of catalogue.novels){if(!novel.id||!novel.title)throw new Error('Every novel requires id and title');if(ids.has(novel.id))throw new Error('Duplicate novel ID: '+novel.id);ids.add(novel.id);if(novel.contentPath?.includes('..'))throw new Error('Unsafe content path: '+novel.id);}
for(const file of ['data/site.json','data/releases.json','data/announcements.json','manifest.json'])json(file);
console.log('NovelVerse catalogue validation passed; registered novels:',ids.size);
