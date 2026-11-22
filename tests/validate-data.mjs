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
if(!chapterIndex.chapters.some(chapter=>chapter.id==='chapter-5'&&chapter.novelId==='the-wrong-heiress'&&chapter.title==='The Heiress Who Wanted Her Old Life Back'))throw new Error('The Wrong Heiress Chapter 5 must appear in the chapter index');
if(!chapterIndex.chapters.some(chapter=>chapter.id==='chapter-6'&&chapter.novelId==='the-wrong-heiress'&&chapter.title==='The Price of an Ordinary Life'))throw new Error('The Wrong Heiress Chapter 6 must appear in the chapter index');
if(!chapterIndex.chapters.some(chapter=>chapter.id==='chapter-7'&&chapter.novelId==='the-wrong-heiress'&&chapter.title==='An Invitation Nobody Asked For'))throw new Error('The Wrong Heiress Chapter 7 must appear in the chapter index');
if(!chapterIndex.chapters.some(chapter=>chapter.id==='chapter-8'&&chapter.novelId==='the-wrong-heiress'&&chapter.title==='The Woman Who Had Never Existed'))throw new Error('The Wrong Heiress Chapter 8 must appear in the chapter index');
if(!chapterIndex.chapters.some(chapter=>chapter.id==='chapter-9'&&chapter.novelId==='the-wrong-heiress'&&chapter.title==='The Woman at the Door'))throw new Error('The Wrong Heiress Chapter 9 must appear in the chapter index');
if(!chapterIndex.chapters.some(chapter=>chapter.id==='chapter-10'&&chapter.novelId==='the-wrong-heiress'&&chapter.title==='Two Families, One Missing File'))throw new Error('The Wrong Heiress Chapter 10 must appear in the chapter index');
if(!chapterIndex.chapters.some(chapter=>chapter.id==='chapter-11'&&chapter.novelId==='the-wrong-heiress'&&chapter.title==='A Very Ordinary Lunch'))throw new Error('The Wrong Heiress Chapter 11 must appear in the chapter index');
if(!chapterIndex.chapters.some(chapter=>chapter.id==='chapter-12'&&chapter.novelId==='the-wrong-heiress'&&chapter.title==='Three Brothers, One Lunch, and a Very Suspicious Address'))throw new Error('The Wrong Heiress Chapter 12 must appear in the chapter index');
if(!chapterIndex.chapters.some(chapter=>chapter.id==='chapter-13'&&chapter.novelId==='the-wrong-heiress'&&chapter.title==='The Man Who Remembered the Wrong Thing'))throw new Error('The Wrong Heiress Chapter 13 must appear in the chapter index');

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
    const chapter5=allChapters.find(item=>item.id==='chapter-5');
    if(!chapter5||chapter5.title!=='The Heiress Who Wanted Her Old Life Back'||chapter5.path!=='novels/the-wrong-heiress/chapters/chapter-5.md')throw new Error('The Wrong Heiress Chapter 5 must be registered with its published title and path');
    if(!fs.readFileSync(chapter5.path,'utf8').includes('**End of Chapter 5**'))throw new Error('The Wrong Heiress Chapter 5 content file is incomplete');
    const chapter6=allChapters.find(item=>item.id==='chapter-6');
    if(!chapter6||chapter6.title!=='The Price of an Ordinary Life'||chapter6.path!=='novels/the-wrong-heiress/chapters/chapter-6.md')throw new Error('The Wrong Heiress Chapter 6 must be registered with its published title and path');
    if(!fs.readFileSync(chapter6.path,'utf8').includes('**End of Chapter 6**'))throw new Error('The Wrong Heiress Chapter 6 content file is incomplete');
    const chapter7=allChapters.find(item=>item.id==='chapter-7');
    if(!chapter7||chapter7.title!=='An Invitation Nobody Asked For'||chapter7.path!=='novels/the-wrong-heiress/chapters/chapter-7.md')throw new Error('The Wrong Heiress Chapter 7 must be registered with its published title and path');
    const chapter7Content=fs.readFileSync(chapter7.path,'utf8');
    if(!chapter7Content.includes('## **Chapter 7 — An Invitation Nobody Asked For**')||!chapter7Content.trimEnd().endsWith('And she had no idea what was waiting on the other side.'))throw new Error('The Wrong Heiress Chapter 7 content file is incomplete');
    const chapter8=allChapters.find(item=>item.id==='chapter-8');
    if(!chapter8||chapter8.title!=='The Woman Who Had Never Existed'||chapter8.path!=='novels/the-wrong-heiress/chapters/chapter-8.md')throw new Error('The Wrong Heiress Chapter 8 must be registered with its published title and path');
    const chapter8Content=fs.readFileSync(chapter8.path,'utf8');
    if(!chapter8Content.includes('## **Chapter 8 — The Woman Who Had Never Existed**')||!chapter8Content.trimEnd().endsWith('began preparing to meet Aria.'))throw new Error('The Wrong Heiress Chapter 8 content file is incomplete');
    const chapter9=allChapters.find(item=>item.id==='chapter-9');
    if(!chapter9||chapter9.title!=='The Woman at the Door'||chapter9.path!=='novels/the-wrong-heiress/chapters/chapter-9.md')throw new Error('The Wrong Heiress Chapter 9 must be registered with its published title and path');
    const chapter9Content=fs.readFileSync(chapter9.path,'utf8');
    if(!chapter9Content.includes('## **Chapter 9 — The Woman at the Door**')||!chapter9Content.trimEnd().endsWith('The other towards the person who had been trying to keep it buried.'))throw new Error('The Wrong Heiress Chapter 9 content file is incomplete');
    const chapter10=allChapters.find(item=>item.id==='chapter-10');
    if(!chapter10||chapter10.title!=='Two Families, One Missing File'||chapter10.path!=='novels/the-wrong-heiress/chapters/chapter-10.md')throw new Error('The Wrong Heiress Chapter 10 must be registered with its published title and path');
    const chapter10Content=fs.readFileSync(chapter10.path,'utf8');
    if(!chapter10Content.includes('## **Chapter 10 — Two Families, One Missing File**')||!chapter10Content.trimEnd().endsWith('And locked it.'))throw new Error('The Wrong Heiress Chapter 10 content file is incomplete');
    const chapter11=allChapters.find(item=>item.id==='chapter-11');
    if(!chapter11||chapter11.title!=='A Very Ordinary Lunch'||chapter11.path!=='novels/the-wrong-heiress/chapters/chapter-11.md')throw new Error('The Wrong Heiress Chapter 11 must be registered with its published title and path');
    const chapter11Content=fs.readFileSync(chapter11.path,'utf8');
    if(!chapter11Content.includes('## **Chapter 11 — A Very Ordinary Lunch**')||!chapter11Content.trimEnd().endsWith('For the first time, the Vespers had an address.**'))throw new Error('The Wrong Heiress Chapter 11 content file is incomplete');

    const chapter12=allChapters.find(item=>item.id==='chapter-12');
    if(!chapter12||chapter12.title!=='Three Brothers, One Lunch, and a Very Suspicious Address'||chapter12.path!=='novels/the-wrong-heiress/chapters/chapter-12.md')throw new Error('The Wrong Heiress Chapter 12 must be registered with its published title and path');
    const chapter12Content=fs.readFileSync(chapter12.path,'utf8');
    if(!chapter12Content.includes('## **Chapter 12 — Three Brothers, One Lunch, and a Very Suspicious Address**')||!chapter12Content.trimEnd().endsWith('And on Tuesday, they would finally ask him what he remembered.'))throw new Error('The Wrong Heiress Chapter 12 content file is incomplete');
    const chapter13=allChapters.find(item=>item.id==='chapter-13');
    if(!chapter13||chapter13.title!=='The Man Who Remembered the Wrong Thing'||chapter13.path!=='novels/the-wrong-heiress/chapters/chapter-13.md')throw new Error('The Wrong Heiress Chapter 13 must be registered with its published title and path');
    const chapter13Content=fs.readFileSync(chapter13.path,'utf8');
    if(!chapter13Content.includes('## **Chapter 13 — The Man Who Remembered the Wrong Thing**')||!chapter13Content.trimEnd().endsWith('**Second transfer.**'))throw new Error('The Wrong Heiress Chapter 13 content file is incomplete');
    const chapter14=allChapters.find(item=>item.id==='chapter-14');
    if(!chapter14||chapter14.title!=="The Name That Wasn't on the List"||chapter14.path!=='novels/the-wrong-heiress/chapters/chapter-14.md')throw new Error('The Wrong Heiress Chapter 14 must be registered with its published title and path');
    const chapter14Content=fs.readFileSync(chapter14.path,'utf8');
    if(!chapter14Content.includes("## **Chapter 14 — The Name That Wasn't on the List**")||!chapter14Content.trimEnd().endsWith('Jonathan Vale had died eleven years ago.'))throw new Error('The Wrong Heiress Chapter 14 content file is incomplete');
    const chapter15=allChapters.find(item=>item.id==='chapter-15');
    if(!chapter15||chapter15.title!=='The Courier Who Left Two Receipts'||chapter15.path!=='novels/the-wrong-heiress/chapters/chapter-15.md')throw new Error('The Wrong Heiress Chapter 15 must be registered with its published title and path');
    const chapter15Content=fs.readFileSync(chapter15.path,'utf8');
    if(!chapter15Content.includes('## **Chapter 15 — The Courier Who Left Two Receipts**')||!chapter15Content.trimEnd().endsWith('And the next document might finally explain why two deliveries had been necessary.'))throw new Error('The Wrong Heiress Chapter 15 content file is incomplete');
    const chapter16=allChapters.find(item=>item.id==='chapter-16');
    if(!chapter16||chapter16.title!=='The Receipt Nobody Was Supposed to Keep'||chapter16.path!=='novels/the-wrong-heiress/chapters/chapter-16.md')throw new Error('The Wrong Heiress Chapter 16 must be registered with its published title and path');
    const chapter16Content=fs.readFileSync(chapter16.path,'utf8');
    if(!chapter16Content.includes('## **Chapter 16 — The Receipt Nobody Was Supposed to Keep**')||!chapter16Content.trimEnd().endsWith('And whoever had arranged the transfers had just learned that the Vespers were getting closer.'))throw new Error('The Wrong Heiress Chapter 16 content file is incomplete');
    const chapter17=allChapters.find(item=>item.id==='chapter-17');
    if(!chapter17||chapter17.title!=='The Instruction Nobody Was Allowed to Read'||chapter17.path!=='novels/the-wrong-heiress/chapters/chapter-17.md')throw new Error('The Wrong Heiress Chapter 17 must be registered with its published title and path');
    const chapter17Content=fs.readFileSync(chapter17.path,'utf8');
    if(!chapter17Content.includes('## **Chapter 17 — The Instruction Nobody Was Allowed to Read**')||!chapter17Content.trimEnd().endsWith('And why had she needed two children kept separate?'))throw new Error('The Wrong Heiress Chapter 17 content file is incomplete');
    const chapter21=allChapters.find(item=>item.id==='chapter-21');
    if(!chapter21||chapter21.title!=='The File With Her Name on It'||chapter21.path!=='novels/the-wrong-heiress/chapters/chapter-21.md')throw new Error('The Wrong Heiress Chapter 21 must be registered with its published title and path');
    const chapter21Content=fs.readFileSync(chapter21.path,'utf8');
    if(!chapter21Content.includes('## **Chapter 21 — The File With Her Name on It**')||!chapter21Content.trimEnd().endsWith('**The second child had never been assigned to a family at all.**'))throw new Error('The Wrong Heiress Chapter 21 content file is incomplete');

    const chapter22=allChapters.find(item=>item.id==='chapter-22');
    if(!chapter22||chapter22.title!=='The Child Without a Family'||chapter22.path!=='novels/the-wrong-heiress/chapters/chapter-22.md')throw new Error('The Wrong Heiress Chapter 22 must be registered with its published title and path');
    const chapter22Content=fs.readFileSync(chapter22.path,'utf8');
    if(!chapter22Content.includes('## **Chapter 22 — The Child Without a Family**')||!chapter22Content.trimEnd().endsWith('For the first time in the investigation, the missing infant\'s destination pointed directly to the Vesper organisation itself.'))throw new Error('The Wrong Heiress Chapter 22 content file is incomplete');

    const chapter23=allChapters.find(item=>item.id==='chapter-23');
    if(!chapter23||chapter23.title!=='The Child Sent to the Wrong Address'||chapter23.path!=='novels/the-wrong-heiress/chapters/chapter-23.md')throw new Error('The Wrong Heiress Chapter 23 must be registered with its published title and path');
    const chapter23Content=fs.readFileSync(chapter23.path,'utf8');
    if(!chapter23Content.includes('## **Chapter 23 — The Child Sent to the Wrong Address**')||!chapter23Content.trimEnd().endsWith('And they might finally hold the missing piece.'))throw new Error('The Wrong Heiress Chapter 23 content file is incomplete');

    const chapter24=allChapters.find(item=>item.id==='chapter-24');
    if(!chapter24||chapter24.title!=='The Woman Who Asked About the Missing Child'||chapter24.path!=='novels/the-wrong-heiress/chapters/chapter-24.md')throw new Error('The Wrong Heiress Chapter 24 must be registered with its published title and path');
    const chapter24Content=fs.readFileSync(chapter24.path,'utf8');
    if(!chapter24Content.includes('## **Chapter 24 — The Woman Who Asked About the Missing Child**')||!chapter24Content.trimEnd().endsWith('**M. VOSS.**'))throw new Error('The Wrong Heiress Chapter 24 content file is incomplete');

    const chapter25=allChapters.find(item=>item.id==='chapter-25');
    if(!chapter25||chapter25.title!=='The Nurse Who Took the Child'||chapter25.path!=='novels/the-wrong-heiress/chapters/chapter-25.md')throw new Error('The Wrong Heiress Chapter 25 must be registered with its published title and path');
    const chapter25Content=fs.readFileSync(chapter25.path,'utf8');
    if(!chapter25Content.includes('## **Chapter 25 — The Nurse Who Took the Child**')||!chapter25Content.trimEnd().endsWith('“Daniel Mercer.”'))throw new Error('The Wrong Heiress Chapter 25 content file is incomplete');

    const chapter26=allChapters.find(item=>item.id==='chapter-26');
    if(!chapter26||chapter26.title!=='The Handover That Never Reached Its Destination'||chapter26.path!=='novels/the-wrong-heiress/chapters/chapter-26.md')throw new Error('The Wrong Heiress Chapter 26 must be registered with its published title and path');
    const chapter26Content=fs.readFileSync(chapter26.path,'utf8');
    if(!chapter26Content.includes('## **Chapter 26 — The Handover That Never Reached Its Destination**')||!chapter26Content.trimEnd().endsWith('**This time, the Vespers had a name.**'))throw new Error('The Wrong Heiress Chapter 26 content file is incomplete');

    const chapter27=allChapters.find(item=>item.id==='chapter-27');
    if(!chapter27||chapter27.title!=='The Man Who Had Been Paid to Disappear'||chapter27.path!=='novels/the-wrong-heiress/chapters/chapter-27.md')throw new Error('The Wrong Heiress Chapter 27 must be registered with its published title and path');
    const chapter27Content=fs.readFileSync(chapter27.path,'utf8');
    if(!chapter27Content.includes('## **Chapter 27 — The Man Who Had Been Paid to Disappear**')||!chapter27Content.trimEnd().endsWith('**The child had been taken to the Sterlings.**'))throw new Error('The Wrong Heiress Chapter 27 content file is incomplete');

    const chapter28=allChapters.find(item=>item.id==='chapter-28');
    if(!chapter28||chapter28.title!=='The Child Who Was Supposed to Become a Sterling'||chapter28.path!=='novels/the-wrong-heiress/chapters/chapter-28.md')throw new Error('The Wrong Heiress Chapter 28 must be registered with its published title and path');
    const chapter28Content=fs.readFileSync(chapter28.path,'utf8');
    if(!chapter28Content.includes('## **Chapter 28 — The Child Who Was Supposed to Become a Sterling**')||!chapter28Content.trimEnd().endsWith('**He had taken the child.**'))throw new Error('The Wrong Heiress Chapter 28 content file is incomplete');

    const chapter29=allChapters.find(item=>item.id==='chapter-29');
    if(!chapter29||chapter29.title!=='The Courier Who Took the Wrong Child'||chapter29.path!=='novels/the-wrong-heiress/chapters/chapter-29.md')throw new Error('The Wrong Heiress Chapter 29 must be registered with its published title and path');
    const chapter29Content=fs.readFileSync(chapter29.path,'utf8');
    if(!chapter29Content.includes('## **Chapter 29 — The Courier Who Took the Wrong Child**')||!chapter29Content.trimEnd().endsWith('And whether someone had deliberately made sure they never learned which child was which.'))throw new Error('The Wrong Heiress Chapter 29 content file is incomplete');

    const chapter30=allChapters.find(item=>item.id==='chapter-30');
    if(!chapter30||chapter30.title!=='The Child in the Photograph'||chapter30.path!=='novels/the-wrong-heiress/chapters/chapter-30.md')throw new Error('The Wrong Heiress Chapter 30 must be registered with its published title and path');
    const chapter30Content=fs.readFileSync(chapter30.path,'utf8');
    if(!chapter30Content.includes('## **Chapter 30 — The Child in the Photograph**')||!chapter30Content.trimEnd().endsWith('And he knew who had taken it.'))throw new Error('The Wrong Heiress Chapter 30 content file is incomplete');

    const chapter31=allChapters.find(item=>item.id==='chapter-31');
    if(!chapter31||chapter31.title!=='The Name Before Victoria'||chapter31.path!=='novels/the-wrong-heiress/chapters/chapter-31.md')throw new Error('The Wrong Heiress Chapter 31 must be registered with its published title and path');
    const chapter31Content=fs.readFileSync(chapter31.path,'utf8');
    if(!chapter31Content.includes('## **Chapter 31 — The Name Before Victoria**')||!chapter31Content.trimEnd().endsWith('And the name on it was the one thing she could not afford to let them read.'))throw new Error('The Wrong Heiress Chapter 31 content file is incomplete');
    const chapter32=allChapters.find(item=>item.id==='chapter-32');
    if(!chapter32||chapter32.title!=='The Girl Who Had Two Names'||chapter32.path!=='novels/the-wrong-heiress/chapters/chapter-32.md')throw new Error('The Wrong Heiress Chapter 32 must be registered with its published title and path');
    const chapter32Content=fs.readFileSync(chapter32.path,'utf8');
    if(!chapter32Content.includes('## **Chapter 32 — The Girl Who Had Two Names**')||!chapter32Content.trimEnd().endsWith('“To Victoria.”'))throw new Error('The Wrong Heiress Chapter 32 content file is incomplete');
    const chapter33=allChapters.find(item=>item.id==='chapter-33');
    if(!chapter33||chapter33.title!=='The Registration Nobody Wanted Found'||chapter33.path!=='novels/the-wrong-heiress/chapters/chapter-33.md')throw new Error('The Wrong Heiress Chapter 33 must be registered with its published title and path');
    const chapter33Content=fs.readFileSync(chapter33.path,'utf8');
    if(!chapter33Content.includes('## **Chapter 33 — The Registration Nobody Wanted Found**')||!chapter33Content.trimEnd().endsWith('It had been waiting for her.'))throw new Error('The Wrong Heiress Chapter 33 content file is incomplete');

    const chapter34=allChapters.find(item=>item.id==='chapter-34');
    if(!chapter34||chapter34.title!=='The Girl Who Was Called Lily'||chapter34.path!=='novels/the-wrong-heiress/chapters/chapter-34.md')throw new Error('The Wrong Heiress Chapter 34 must be registered with its published title and path');
    const chapter34Content=fs.readFileSync(chapter34.path,'utf8');
    if(!chapter34Content.includes('## **Chapter 34 — The Girl Who Was Called Lily**')||!chapter34Content.trimEnd().endsWith("“They still don't know who ordered it.”"))throw new Error('The Wrong Heiress Chapter 34 content file is incomplete');

    const chapter35=allChapters.find(item=>item.id==='chapter-35');
    if(!chapter35||chapter35.title!=='The Person Who Ordered the Switch'||chapter35.path!=='novels/the-wrong-heiress/chapters/chapter-35.md')throw new Error('The Wrong Heiress Chapter 35 must be registered with its published title and path');
    const chapter35Content=fs.readFileSync(chapter35.path,'utf8');
    if(!chapter35Content.includes('## **Chapter 35 — The Person Who Ordered the Switch**')||!chapter35Content.trimEnd().endsWith('“And Eleanor Shaw was never supposed to sign that instruction.”'))throw new Error('The Wrong Heiress Chapter 35 content file is incomplete');

    const chapter36=allChapters.find(item=>item.id==='chapter-36');
    if(!chapter36||chapter36.title!=='The Signature That Should Never Have Existed'||chapter36.path!=='novels/the-wrong-heiress/chapters/chapter-36.md')throw new Error('The Wrong Heiress Chapter 36 must be registered with its published title and path');
    const chapter36Content=fs.readFileSync(chapter36.path,'utf8');
    if(!chapter36Content.includes('## **Chapter 36 — The Signature That Should Never Have Existed**')||!chapter36Content.trimEnd().endsWith('The Vespers were no longer investigating a family dispute.\n\nThey were approaching the organisation that had paid for the arrangement in the first place.'))throw new Error('The Wrong Heiress Chapter 36 content file is incomplete');

    const chapter37=allChapters.find(item=>item.id==='chapter-37');
    if(!chapter37||chapter37.title!=='The Name Behind the Money'||chapter37.path!=='novels/the-wrong-heiress/chapters/chapter-37.md')throw new Error('The Wrong Heiress Chapter 37 must be registered with its published title and path');
    const chapter37Content=fs.readFileSync(chapter37.path,'utf8');
    if(!chapter37Content.includes('## **Chapter 37 — The Name Behind the Money**')||!chapter37Content.trimEnd().endsWith('“We have had a problem for twenty years.”'))throw new Error('The Wrong Heiress Chapter 37 content file is incomplete');

    const chapter38=allChapters.find(item=>item.id==='chapter-38');
    if(!chapter38||chapter38.title!=='The Photograph of Two Babies'||chapter38.path!=='novels/the-wrong-heiress/chapters/chapter-38.md')throw new Error('The Wrong Heiress Chapter 38 must be registered with its published title and path');
    const chapter38Content=fs.readFileSync(chapter38.path,'utf8');
    if(!chapter38Content.includes('## **Chapter 38 — The Photograph of Two Babies**')||!chapter38Content.trimEnd().endsWith('It was about what someone had been trying to protect them from.'))throw new Error('The Wrong Heiress Chapter 38 content file is incomplete');

    const chapter39=allChapters.find(item=>item.id==='chapter-39');
    if(!chapter39||chapter39.title!=="The Dead Man's Authority"||chapter39.path!=='novels/the-wrong-heiress/chapters/chapter-39.md')throw new Error('The Wrong Heiress Chapter 39 must be registered with its published title and path');
    const chapter39Content=fs.readFileSync(chapter39.path,'utf8');
    if(!chapter39Content.includes("## **Chapter 39 — The Dead Man's Authority**")||!chapter39Content.trimEnd().endsWith('And somewhere inside the Vesper family, the person who had authorised the reversal was still alive.'))throw new Error('The Wrong Heiress Chapter 39 content file is incomplete');

    const chapter41=allChapters.find(item=>item.id==='chapter-41');
    if(!chapter41||chapter41.title!=="The Father Who Signed the First Document"||chapter41.path!=='novels/the-wrong-heiress/chapters/chapter-41.md')throw new Error('The Wrong Heiress Chapter 41 must be registered with its published title and path');
    const chapter41Content=fs.readFileSync(chapter41.path,'utf8');
    if(!chapter41Content.includes("## **Chapter 41 — The Father Who Signed the First Document**")||!chapter41Content.trimEnd().endsWith('Neither girl had agreed to play.'))throw new Error('The Wrong Heiress Chapter 41 content file is incomplete');

    const chapter43=allChapters.find(item=>item.id==='chapter-43');
    if(!chapter43||chapter43.title!=="The Man Who Was Supposed to Protect Them"||chapter43.path!=='novels/the-wrong-heiress/chapters/chapter-43.md')throw new Error('The Wrong Heiress Chapter 43 must be registered with its published title and path');
    const chapter43Content=fs.readFileSync(chapter43.path,'utf8');
    if(!chapter43Content.includes("## **Chapter 43 — The Man Who Was Supposed to Protect Them**")||!chapter43Content.trimEnd().endsWith('“And this time, nobody leaves the room without telling us the truth.”'))throw new Error('The Wrong Heiress Chapter 43 content file is incomplete');

    const chapter44=allChapters.find(item=>item.id==='chapter-44');
    if(!chapter44||chapter44.title!=="The Man Who Never Died"||chapter44.path!=='novels/the-wrong-heiress/chapters/chapter-44.md')throw new Error('The Wrong Heiress Chapter 44 must be registered with its published title and path');
    const chapter44Content=fs.readFileSync(chapter44.path,'utf8');
    if(!chapter44Content.includes("## **Chapter 44 — The Man Who Never Died**")||!chapter44Content.trimEnd().endsWith('“Bring me the girls.”'))throw new Error('The Wrong Heiress Chapter 44 content file is incomplete');

    



const chapter59=allChapters.find(item=>item.id==='chapter-59');
if(!chapter59||chapter59.title!=="The Authority of a Dead Man"||chapter59.path!=='novels/the-wrong-heiress/chapters/chapter-59.md')throw new Error('The Wrong Heiress Chapter 59 must be registered with its published title and path');
const chapter59Content=fs.readFileSync(chapter59.path,'utf8');
if(!chapter59Content.includes("## **Chapter 59 — The Authority of a Dead Man**")||!chapter59Content.trimEnd().endsWith('“That is my father.”'))throw new Error('The Wrong Heiress Chapter 59 content file is incomplete');
const chapter62=allChapters.find(item=>item.id==='chapter-62');
if(!chapter62||chapter62.title!=="The Name That Was Never There"||chapter62.path!=='novels/the-wrong-heiress/chapters/chapter-62.md')throw new Error('The Wrong Heiress Chapter 62 must be registered with its published title and path');
const chapter62Content=fs.readFileSync(chapter62.path,'utf8');
if(!chapter62Content.includes("## **Chapter 62 — The Name That Was Never There**")||!chapter62Content.trimEnd().endsWith('**The envelope had been released under an authority that officially belonged to a dead man.**'))throw new Error('The Wrong Heiress Chapter 62 content file is incomplete');
const chapter61=allChapters.find(item=>item.id==='chapter-61');
if(!chapter61||chapter61.title!=="The Man Who Borrowed a Name"||chapter61.path!=='novels/the-wrong-heiress/chapters/chapter-61.md')throw new Error('The Wrong Heiress Chapter 61 must be registered with its published title and path');
const chapter61Content=fs.readFileSync(chapter61.path,'utf8');
if(!chapter61Content.includes("## **Chapter 61 — The Man Who Borrowed a Name**")||!chapter61Content.trimEnd().endsWith('**Eleanor Vesper.**'))throw new Error('The Wrong Heiress Chapter 61 content file is incomplete');
const chapter60=allChapters.find(item=>item.id==='chapter-60');
if(!chapter60||chapter60.title!=="The Auditor Who Refused to Sign"||chapter60.path!=='novels/the-wrong-heiress/chapters/chapter-60.md')throw new Error('The Wrong Heiress Chapter 60 must be registered with its published title and path');
const chapter60Content=fs.readFileSync(chapter60.path,'utf8');
if(!chapter60Content.includes("## **Chapter 60 — The Auditor Who Refused to Sign**")||!chapter60Content.trimEnd().endsWith('**They had wanted Elias Vesper declared dead.**'))throw new Error('The Wrong Heiress Chapter 60 content file is incomplete');
const chapter58=allChapters.find(item=>item.id==='chapter-58');
if(!chapter58||chapter58.title!=="The Signature That Wasn't There"||chapter58.path!=='novels/the-wrong-heiress/chapters/chapter-58.md')throw new Error('The Wrong Heiress Chapter 58 must be registered with its published title and path');
const chapter58Content=fs.readFileSync(chapter58.path,'utf8');
if(!chapter58Content.includes("## **Chapter 58 — The Signature That Wasn't There**")||!chapter58Content.trimEnd().endsWith('**Temporary authority holder: Elias Vesper.**'))throw new Error('The Wrong Heiress Chapter 58 content file is incomplete');
const chapter57=allChapters.find(item=>item.id==='chapter-57');
if(!chapter57||chapter57.title!=="The Man Who Was Somewhere Else"||chapter57.path!=='novels/the-wrong-heiress/chapters/chapter-57.md')throw new Error('The Wrong Heiress Chapter 57 must be registered with its published title and path');
const chapter57Content=fs.readFileSync(chapter57.path,'utf8');
if(!chapter57Content.includes("## **Chapter 57 — The Man Who Was Somewhere Else**")||!chapter57Content.trimEnd().endsWith('There was no signature beside it.'))throw new Error('The Wrong Heiress Chapter 57 content file is incomplete');
const chapter56=allChapters.find(item=>item.id==='chapter-56');
if(!chapter56||chapter56.title!=="The Woman Who Appeared Twice"||chapter56.path!=='novels/the-wrong-heiress/chapters/chapter-56.md')throw new Error('The Wrong Heiress Chapter 56 must be registered with its published title and path');
const chapter56Content=fs.readFileSync(chapter56.path,'utf8');
if(!chapter56Content.includes("## **Chapter 56 — The Woman Who Appeared Twice**")||!chapter56Content.trimEnd().endsWith(`**The hospital had preserved the wrong person's identity.**`))throw new Error('The Wrong Heiress Chapter 56 content file is incomplete');
const chapter55=allChapters.find(item=>item.id==='chapter-55');
if(!chapter55||chapter55.title!=="The Archive That Was Never Empty"||chapter55.path!=='novels/the-wrong-heiress/chapters/chapter-55.md')throw new Error('The Wrong Heiress Chapter 55 must be registered with its published title and path');
const chapter55Content=fs.readFileSync(chapter55.path,'utf8');
if(!chapter55Content.includes("## **Chapter 55 — The Archive That Was Never Empty**")||!chapter55Content.trimEnd().endsWith('**The woman in the photograph was Catherine Vesper.**'))throw new Error('The Wrong Heiress Chapter 55 content file is incomplete');
const chapter54=allChapters.find(item=>item.id==='chapter-54');
if(!chapter54||chapter54.title!=="The Man Who Was Declared Dead"||chapter54.path!=='novels/the-wrong-heiress/chapters/chapter-54.md')throw new Error('The Wrong Heiress Chapter 54 must be registered with its published title and path');
const chapter54Content=fs.readFileSync(chapter54.path,'utf8');
if(!chapter54Content.includes("## **Chapter 54 — The Man Who Was Declared Dead**")||!chapter54Content.trimEnd().endsWith('**And somewhere in the sealed archive, a second key turned.**'))throw new Error('The Wrong Heiress Chapter 54 content file is incomplete');
const chapter53=allChapters.find(item=>item.id==='chapter-53');
if(!chapter53||chapter53.title!=="The Receipt in the Locked Drawer"||chapter53.path!=='novels/the-wrong-heiress/chapters/chapter-53.md')throw new Error('The Wrong Heiress Chapter 53 must be registered with its published title and path');
const chapter53Content=fs.readFileSync(chapter53.path,'utf8');
if(!chapter53Content.includes("## **Chapter 53 — The Receipt in the Locked Drawer**")||!chapter53Content.trimEnd().endsWith('**The photograph was dated six months after the official death of its third subject.**'))throw new Error('The Wrong Heiress Chapter 53 content file is incomplete');
const chapter52=allChapters.find(item=>item.id==='chapter-52');
if(!chapter52||chapter52.title!=="The Man Who Approved It Without Reading"||chapter52.path!=='novels/the-wrong-heiress/chapters/chapter-52.md')throw new Error('The Wrong Heiress Chapter 52 must be registered with its published title and path');
const chapter52Content=fs.readFileSync(chapter52.path,'utf8');
if(!chapter52Content.includes("## **Chapter 52 — The Man Who Approved It Without Reading**")||!chapter52Content.trimEnd().endsWith('**The door handle began to turn.**'))throw new Error('The Wrong Heiress Chapter 52 content file is incomplete');
const chapter51=allChapters.find(item=>item.id==='chapter-51');
if(!chapter51||chapter51.title!=="The Signature That Divided Two Lives"||chapter51.path!=='novels/the-wrong-heiress/chapters/chapter-51.md')throw new Error('The Wrong Heiress Chapter 51 must be registered with its published title and path');
const chapter51Content=fs.readFileSync(chapter51.path,'utf8');
if(!chapter51Content.includes("## **Chapter 51 — The Signature That Divided Two Lives**")||!chapter51Content.trimEnd().endsWith('Or so Elias had believed.'))throw new Error('The Wrong Heiress Chapter 51 content file is incomplete');

const chapter50=allChapters.find(item=>item.id==='chapter-50');
if(!chapter50||chapter50.title!=="The Woman Before the Dynasty"||chapter50.path!=='novels/the-wrong-heiress/chapters/chapter-50.md')throw new Error('The Wrong Heiress Chapter 50 must be registered with its published title and path');
const chapter50Content=fs.readFileSync(chapter50.path,'utf8');
if(!chapter50Content.includes("## **Chapter 50 — The Woman Before the Dynasty**")||!chapter50Content.trimEnd().endsWith('**End of Chapter 50**'))throw new Error('The Wrong Heiress Chapter 50 content file is incomplete');

const chapter49=allChapters.find(item=>item.id==='chapter-49');
if(!chapter49||chapter49.title!=="The Signature of a Dead Woman"||chapter49.path!=='novels/the-wrong-heiress/chapters/chapter-49.md')throw new Error('The Wrong Heiress Chapter 49 must be registered with its published title and path');
const chapter49Content=fs.readFileSync(chapter49.path,'utf8');
if(!chapter49Content.includes("## **Chapter 49 — The Signature of a Dead Woman**")||!chapter49Content.trimEnd().endsWith('**End of Chapter 49**'))throw new Error('The Wrong Heiress Chapter 49 content file is incomplete');
const chapter48=allChapters.find(item=>item.id==='chapter-48');
if(!chapter48||chapter48.title!=="The Authority Nobody Was Allowed to Inherit"||chapter48.path!=='novels/the-wrong-heiress/chapters/chapter-48.md')throw new Error('The Wrong Heiress Chapter 48 must be registered with its published title and path');
const chapter48Content=fs.readFileSync(chapter48.path,'utf8');
if(!chapter48Content.includes("## **Chapter 48 — The Authority Nobody Was Allowed to Inherit**")||!chapter48Content.trimEnd().endsWith('**End of Chapter 48**'))throw new Error('The Wrong Heiress Chapter 48 content file is incomplete');
const chapter47=allChapters.find(item=>item.id==='chapter-47');
if(!chapter47||chapter47.title!=="The Trustee Who Died Twice"||chapter47.path!=='novels/the-wrong-heiress/chapters/chapter-47.md')throw new Error('The Wrong Heiress Chapter 47 must be registered with its published title and path');
const chapter47Content=fs.readFileSync(chapter47.path,'utf8');
if(!chapter47Content.includes("## **Chapter 47 — The Trustee Who Died Twice**")||!chapter47Content.trimEnd().endsWith('**End of Chapter 47**'))throw new Error('The Wrong Heiress Chapter 47 content file is incomplete');
const chapter46=allChapters.find(item=>item.id==='chapter-46');
if(!chapter46||chapter46.title!=="The Document Catherine Never Wanted Found"||chapter46.path!=='novels/the-wrong-heiress/chapters/chapter-46.md')throw new Error('The Wrong Heiress Chapter 46 must be registered with its published title and path');
const chapter46Content=fs.readFileSync(chapter46.path,'utf8');
if(!chapter46Content.includes("## **Chapter 46 — The Document Catherine Never Wanted Found**")||!chapter46Content.trimEnd().endsWith('**End of Chapter 46**'))throw new Error('The Wrong Heiress Chapter 46 content file is incomplete');
const chapter45=allChapters.find(item=>item.id==='chapter-45');
    if(!chapter45||chapter45.title!=="The Woman Who Was Supposed to Be Dead"||chapter45.path!=='novels/the-wrong-heiress/chapters/chapter-45.md')throw new Error('The Wrong Heiress Chapter 45 must be registered with its published title and path');
    const chapter45Content=fs.readFileSync(chapter45.path,'utf8');
    if(!chapter45Content.includes("## **Chapter 45 — The Woman Who Was Supposed to Be Dead**")||!chapter45Content.trimEnd().endsWith('**End of Chapter 45**'))throw new Error('The Wrong Heiress Chapter 45 content file is incomplete');

    const chapter42=allChapters.find(item=>item.id==='chapter-42');
    if(!chapter42||chapter42.title!=="The Inheritance Nobody Wanted"||chapter42.path!=='novels/the-wrong-heiress/chapters/chapter-42.md')throw new Error('The Wrong Heiress Chapter 42 must be registered with its published title and path');
    const chapter42Content=fs.readFileSync(chapter42.path,'utf8');
    if(!chapter42Content.includes("## **Chapter 42 — The Inheritance Nobody Wanted**")||!chapter42Content.trimEnd().endsWith('And why Elias had considered that person dangerous.'))throw new Error('The Wrong Heiress Chapter 42 content file is incomplete');

    const chapter40=allChapters.find(item=>item.id==='chapter-40');
    if(!chapter40||chapter40.title!=="The Initials on the Document"||chapter40.path!=='novels/the-wrong-heiress/chapters/chapter-40.md')throw new Error('The Wrong Heiress Chapter 40 must be registered with its published title and path');
    const chapter40Content=fs.readFileSync(chapter40.path,'utf8');
    if(!chapter40Content.includes("## **Chapter 40 — The Initials on the Document**")||!chapter40Content.trimEnd().endsWith('And he had never mentioned it.'))throw new Error('The Wrong Heiress Chapter 40 content file is incomplete');

    const chapter20=allChapters.find(item=>item.id==='chapter-20');
    if(!chapter20||chapter20.title!=='The Employee Who Was Never Dismissed'||chapter20.path!=='novels/the-wrong-heiress/chapters/chapter-20.md')throw new Error('The Wrong Heiress Chapter 20 must be registered with its published title and path');
    const chapter20Content=fs.readFileSync(chapter20.path,'utf8');
    if(!chapter20Content.includes('## **Chapter 20 — The Employee Who Was Never Dismissed**')||!chapter20Content.trimEnd().endsWith('**ARIA STERLING.**'))throw new Error('The Wrong Heiress Chapter 20 content file is incomplete');

    const chapter19=allChapters.find(item=>item.id==='chapter-19');
    if(!chapter19||chapter19.title!=='The Document Richard Sterling Hid'||chapter19.path!=='novels/the-wrong-heiress/chapters/chapter-19.md')throw new Error('The Wrong Heiress Chapter 19 must be registered with its published title and path');
    const chapter19Content=fs.readFileSync(chapter19.path,'utf8');
    if(!chapter19Content.includes('## **Chapter 19 — The Document Richard Sterling Hid**')||!chapter19Content.trimEnd().endsWith('And whoever had done it might still know where he was.'))throw new Error('The Wrong Heiress Chapter 19 content file is incomplete');

    const chapter18=allChapters.find(item=>item.id==='chapter-18');
    if(!chapter18||chapter18.title!=='The Second Transfer Was Never Finished'||chapter18.path!=='novels/the-wrong-heiress/chapters/chapter-18.md')throw new Error('The Wrong Heiress Chapter 18 must be registered with its published title and path');
    const chapter18Content=fs.readFileSync(chapter18.path,'utf8');
    if(!chapter18Content.includes('## **Chapter 18 — The Second Transfer Was Never Finished**')||!chapter18Content.trimEnd().endsWith('And he had known that all along.'))throw new Error('The Wrong Heiress Chapter 18 content file is incomplete');

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
if(!fs.readFileSync('sw.js','utf8').includes('novelverse-shell-v81'))throw new Error('Offline shell cache must include the latest branded logo and site assets');

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
