(()=>{'use strict';
const header=document.querySelector('.site-header');
const navigation=[
 ['Home','./','home'],
 ['Novels','./novels.html','novels'],
 ['Reader','./reader.html','reader'],
 ['Characters','./characters.html','characters'],
 ['Worlds','./worlds.html','worlds'],
 ['My Library','./my-library.html','my-library'],
 ['Journal','./journal.html','journal'],
 ['Release calendar','./calendar.html','calendar'],
 ['Publishing Studio','./publish.html','publish'],
 ['About','./about.html','about']
];
if(header){
 let nav=header.querySelector('.primary-nav');
 if(!nav){nav=document.createElement('nav');header.append(nav);}
 nav.id='primary-nav';
 nav.className='primary-nav';
 nav.removeAttribute('data-page-nav');
 nav.setAttribute('aria-label','Main navigation');
 const file=(location.pathname.split('/').pop()||'index.html').toLowerCase();
 const activeKey=file==='index.html'?'home':
  file==='series.html'?'novels':
  file==='character.html'?'characters':
  file==='world.html'?'worlds':
  file.replace('.html','');
 nav.replaceChildren(...navigation.map(([label,href,key])=>{
  const link=document.createElement('a');
  link.href=href;
  link.textContent=label;
  if(key===activeKey){link.classList.add('active');link.setAttribute('aria-current','page');}
  return link;
 }));
 let toggle=header.querySelector('.menu-toggle');
 if(!toggle){toggle=document.createElement('button');toggle.className='menu-toggle';toggle.type='button';toggle.textContent='☰  Menu';header.insertBefore(toggle,nav);}
 toggle.setAttribute('aria-expanded','false');
 toggle.setAttribute('aria-controls',nav.id);
 toggle.setAttribute('aria-label','Open navigation menu');
 toggle.textContent='☰  Menu';
 const closeMenu=()=>{
  nav.classList.remove('is-open');
  toggle.setAttribute('aria-expanded','false');
  toggle.setAttribute('aria-label','Open navigation menu');
  toggle.textContent='Menu';
 };
 toggle.addEventListener('click',()=>{
  const open=nav.classList.toggle('is-open');
  toggle.setAttribute('aria-expanded',String(open));
  toggle.setAttribute('aria-label',open?'Close navigation menu':'Open navigation menu');
  toggle.textContent=open?'✕  Close':'☰  Menu';
 });
 nav.addEventListener('click',event=>{
  if(event.target.closest('a'))closeMenu();
 });
 document.addEventListener('keydown',event=>{
  if(event.key==='Escape'&&nav.classList.contains('is-open')){
   closeMenu();
   toggle.focus();
  }
 });
 document.addEventListener('click',event=>{
  if(nav.classList.contains('is-open')&&!header.contains(event.target))closeMenu();
 });
 window.addEventListener('resize',()=>{
  if(window.matchMedia('(min-width: 1281px)').matches)closeMenu();
 });
 let cta=header.querySelector('.header-cta');
 if(!cta){cta=document.createElement('a');cta.className='header-cta';header.append(cta);}
 cta.href='./novels.html';
 cta.innerHTML='Start reading <span aria-hidden="true">↗</span>';
 if(!header.querySelector('.install-button')){
  const install=document.createElement('button');install.className='install-button';install.type='button';install.textContent='Install app';install.setAttribute('aria-label','Install NovelVerse app');header.append(install);
  let promptEvent=null;
  const standalone=()=>window.matchMedia('(display-mode: standalone)').matches||window.navigator.standalone===true;
  install.hidden=standalone();
  window.addEventListener('appinstalled',()=>{promptEvent=null;install.hidden=true;});
  window.addEventListener('beforeinstallprompt',event=>{event.preventDefault();promptEvent=event;install.dataset.ready='true';install.hidden=standalone();});
  install.addEventListener('click',async()=>{
   if(standalone()){install.hidden=true;return;}
   if(promptEvent){promptEvent.prompt();try{await promptEvent.userChoice;}catch(_){}promptEvent=null;return;}
   const ios=/iphone|ipad|ipod/i.test(navigator.userAgent);
   let help=header.querySelector('.install-help');
   if(!help){help=document.createElement('p');help.className='install-help';help.setAttribute('role','status');header.append(help);}
   help.textContent=ios?'To install on iPhone or iPad: tap Share, then choose “Add to Home Screen”.':'To install NovelVerse, open your browser menu and choose “Install app” or “Add to Home screen”.';
  });
 }
}
const y=document.getElementById('year');if(y)y.textContent=String(new Date().getFullYear());
})();