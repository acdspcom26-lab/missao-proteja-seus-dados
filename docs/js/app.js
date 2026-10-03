import { missions } from './content/missions.js';
import { validateCatalog } from './catalog-validation.js';
import { initialState, transition, token } from './state.js';
import { render, showRestart } from './view.js';
import { createAudio } from './audio.js';
import { xpSummary } from './gamification.js';
import { feedback } from './evaluation.js';
const root=document.getElementById('main');
const audio=createAudio();
const audioButton=document.getElementById('audio-toggle');
function updateAudioButton(){audioButton.textContent=audio.enabled?'Som: ligado':'Som: desligado';audioButton.setAttribute('aria-pressed',String(audio.enabled));}
audioButton.addEventListener('click',async()=>{const wasEnabled=audio.enabled;stopCues();audioButton.disabled=true;await audio.toggle();updateAudioButton();audioButton.disabled=false;if(audio.enabled){audio.play('select');document.getElementById('audio-status').textContent='Som ativado.';}else if(!wasEnabled){document.getElementById('audio-status').textContent='Som indisponível neste navegador. Você pode continuar sem áudio.';audioButton.textContent='Som: indisponível';}else document.getElementById('audio-status').textContent='Som desativado.';});
let state=initialState();
let soundTimers=[];
function stopCues(){soundTimers.forEach(clearTimeout);soundTimers=[];audio.stop();}
function scheduleCue(name,delay){soundTimers.push(setTimeout(()=>audio.play(name),delay));}
function paint(focus=true,notice='') {
  const origin=token(state);
  render(root,state,missions,(type,extra={})=>act(type,extra,origin),{focus,notice});
}
function act(type,extra,origin) {
  const before=state;
  state=transition(state,{type,token:origin,...extra},missions);
  if(state===before)return;
  if(type==='select'){stopCues();audio.play('select');const alert=root.querySelector('.validation');if(alert)alert.textContent='';return;}
  if(type==='confirm'&&state.validationMessage)return;
  if(type==='restart') {
    stopCues();
    const opener=document.activeElement;
    const dialogOrigin=token(state);
    showRestart(root,(dialogType)=>act(dialogType,{},dialogOrigin),()=>opener?.focus());
    return;
  }
  stopCues();
  let notice='';
  if(type==='confirm'&&state.stage==='understand'){
    const responses=feedback(missions[state.missionIndex],state.answers);
    const gain=xpSummary(missions,state).total-xpSummary(missions,before).total;
    audio.play(responses.every(f=>f.adequate)?'correct':'alert');
    if(gain){notice=`+${gain} XP — PROTEÇÃO REFORÇADA`;scheduleCue('xp',300);}
  }
  if(type==='continue'){notice='+25 XP — MISSÃO CONCLUÍDA';audio.play(state.screen==='result'?'finish':'mission');}
  if(type==='reset')document.getElementById('game-status').textContent='Novo percurso. XP e respostas reiniciados.';
  paint(true,notice);
  if(notice)document.getElementById('game-status').textContent=notice;
  if(type==='cancel')root.querySelector('button[aria-label="Reiniciar"],button[aria-label="Jogar novamente"]')?.focus();
}
async function initialize() {
  state=initialState(state.generation+1);
  const generation=state.generation;
  try {
    validateCatalog(missions);
    await Promise.all(missions.flatMap(m=>m.context.elements.filter(e=>e.assetPath).map(e=>new Promise((resolve,reject)=>{const image=new Image();image.onload=resolve;image.onerror=reject;image.src=e.assetPath;}))));
    if(state.generation===generation)paint(false);
  }catch{if(state.generation===generation){state={...initialState(state.generation+1),screen:'error'};paint(false);}}
}
window.addEventListener('pagehide',()=>{stopCues();audio.dispose();updateAudioButton();state=initialState(state.generation+1);root.replaceChildren();document.getElementById('game-status').textContent='';});
window.addEventListener('pageshow',event=>{if(event.persisted)initialize();});
initialize();
