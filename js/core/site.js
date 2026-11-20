(()=>{'use strict';
const header=document.querySelector('.site-header');
if(header){
 const nav=header.querySelector('.primary-nav');
 if(nav){
  if(!nav.id)nav.id='primary-nav';
  let toggle=header.querySelector('.menu-toggle');
  if(!toggle){toggle=document.createElement('button');toggle.className='menu-toggle';toggle.type='button';toggle.textContent='Menu';toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-controls',nav.id);header.insertBefore(toggle,nav);}
  toggle.addEventListener('click',()=>{const open=nav.classList.toggle('is-open');toggle.setAttribute('aria-expanded',String(open));});
 }
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