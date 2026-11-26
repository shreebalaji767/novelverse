(()=>{'use strict';
const entries=[
 {id:'entry-1',day:13,month:'May',title:'A little nostalgia',content:['Revisited old memories through photos 📷. Felt warm and nostalgic 💭.','Sent a few to friends and it sparked smiles 😊.']},
 {id:'entry-2',day:14,month:'May',title:'A refreshed morning',content:['Went to bed early last night 💤 and woke up refreshed.','Energy levels stayed high all day ⚡.']},
 {id:'entry-3',day:15,month:'May',title:'Wednesday reflections',content:['Organized my thoughts in my journal 🖊️.','The clarity it brought made me feel peaceful 🕊️.']},
 {id:'entry-4',day:16,month:'May',title:'A new story begins',content:['Started a new book today 📖. The opening chapter is incredibly immersive.',"I can already tell I'll be hooked on this story 🕸️."]},
 {id:'entry-5',day:17,month:'May',title:'An afternoon outside',content:['Went for a long walk in the park 🌳. The weather was perfect for reflection.','Met a friendly golden retriever 🐕 that made my day.']}
];
const timeline=document.getElementById('journal-timeline'),article=document.getElementById('journal-entry');
const previous=document.getElementById('journal-prev'),next=document.getElementById('journal-next');
const count=document.getElementById('journal-count'),progress=document.getElementById('journal-progress-bar'),status=document.getElementById('journal-status');
if(!timeline||!article)return;
let activeIndex=Math.min(2,entries.length-1);
const make=(tag,className,text)=>{const el=document.createElement(tag);if(className)el.className=className;if(text!==undefined)el.textContent=text;return el;};
function render(){
 const entry=entries[activeIndex];
 timeline.querySelectorAll('button').forEach((button,index)=>{if(index===activeIndex)button.setAttribute('aria-current','date');else button.removeAttribute('aria-current');});
 const date=make('p','journal-entry-date');date.append(document.createTextNode(String(entry.day)+' '));date.append(make('span','',entry.month.toUpperCase()));
 const body=make('div','journal-entry-content');entry.content.forEach(line=>body.append(make('p','',line)));
 article.replaceChildren(date,make('h3','',entry.title),body);
 count.textContent='Entry '+(activeIndex+1)+' of '+entries.length;
 progress.style.width=((activeIndex+1)/entries.length*100)+'%';
 previous.disabled=activeIndex===0;next.disabled=activeIndex===entries.length-1;
 status.textContent='Viewing '+entry.day+' '+entry.month;
}
entries.forEach((entry,index)=>{
 const li=document.createElement('li'),button=make('button','journal-day');
 button.type='button';button.setAttribute('aria-label','View '+entry.day+' '+entry.month);
 const number=make('span','journal-day-number',String(entry.day)),copy=make('span','journal-day-copy');
 copy.append(make('strong','',entry.month),make('small','','Entry '+String(index+1).padStart(2,'0')));
 button.append(number,copy);button.addEventListener('click',()=>{activeIndex=index;render();});
 li.append(button);timeline.append(li);
});
previous.addEventListener('click',()=>{if(activeIndex>0){activeIndex--;render();}});
next.addEventListener('click',()=>{if(activeIndex<entries.length-1){activeIndex++;render();}});
document.addEventListener('keydown',event=>{
 if(event.altKey||event.ctrlKey||event.metaKey||/INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName||''))return;
 if(event.key==='ArrowLeft'&&activeIndex>0){activeIndex--;render();}
 if(event.key==='ArrowRight'&&activeIndex<entries.length-1){activeIndex++;render();}
});
render();
})();