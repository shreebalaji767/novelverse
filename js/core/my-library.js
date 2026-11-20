(()=>{'use strict';
const KEY='novelverse.myLibrary.v1';
function get(){try{const value=JSON.parse(localStorage.getItem(KEY)||'[]');return Array.isArray(value)?value.filter(item=>item&&typeof item==='object'&&typeof item.id==='string'&&item.id.trim()):[]}catch{return[]}}
function has(id){return get().some(item=>item.id===id)}
function add(novel){if(!novel||typeof novel.id!=='string'||!novel.id.trim())return{ok:false,items:get()};const items=get().filter(item=>item.id!==novel.id);items.unshift({id:novel.id,title:String(novel.title||'Untitled').slice(0,240),synopsis:String(novel.synopsis||'').slice(0,3000),status:String(novel.status||'ongoing'),genres:Array.isArray(novel.genres)?novel.genres.filter(x=>typeof x==='string').slice(0,30):[],cover:typeof novel.cover==='string'?novel.cover:'',savedAt:new Date().toISOString()});try{localStorage.setItem(KEY,JSON.stringify(items));return{ok:true,items}}catch(error){return{ok:false,error,items:get()}}}
function remove(id){const items=get().filter(item=>item.id!==id);try{localStorage.setItem(KEY,JSON.stringify(items));return true}catch{return false}}
function replace(items){try{localStorage.setItem(KEY,JSON.stringify(items));return true}catch{return false}}
function key(){return KEY}
window.NovelVerseShelf={get,has,add,remove,replace,key};
})();