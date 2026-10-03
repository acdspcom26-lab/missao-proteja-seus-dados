import { renderScenario } from './scenarios.js';
import { stages } from './state.js';
import { feedback, results } from './evaluation.js';
import { xpSummary, rewards } from './gamification.js';
export const labels={identify:'Identificar',assess:'Avaliar',decide:'Decidir',understand:'Aprender'};
export const dimensions={identify:'Identificação de dados pessoais',assess:'Avaliação de riscos',decide:'Decisões de proteção'};
const focusNames={identify:'IDENTIFICAR',assess:'AVALIAR',decide:'DECIDIR',integrate:'DESAFIO FINAL'};
const iconPaths={shield:'M12 3 3 7v6c0 5 9 9 9 9s9-4 9-9V7L12 3Zm-4 9 3 3 5-6',lock:'M6 11h12v10H6V11Zm3 0V7a3 3 0 0 1 6 0v4M12 15v3',target:'M21 12a9 9 0 1 1-9-9M12 7a5 5 0 1 0 5 5M12 12l9-9M16 3h5v5',alert:'m12 3 10 18H2L12 3Zm0 6v5m0 3v1',bolt:'m13 2-9 12h7l-1 8 10-13h-8l1-7'};
function el(tag,cls,text){const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n;}
function icon(kind,cls='icon'){const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('viewBox','0 0 24 24');svg.setAttribute('class',cls);svg.setAttribute('aria-hidden','true');const path=document.createElementNS(svg.namespaceURI,'path');path.setAttribute('d',iconPaths[kind]||iconPaths.shield);svg.append(path);return svg;}
function button(text,cls,action){const b=el('button',cls,text);b.type='button';b.setAttribute('aria-label',text);b.addEventListener('click',action,{once:true});return b;}
function heading(text){const h=el('h1','screen-title',text);h.tabIndex=-1;return h;}
function pill(text){return el('span','pill',text);}
function missionHud(state,catalog){
 const hud=el('section','hud');hud.setAttribute('aria-label','Painel do percurso');
 const xp=xpSummary(catalog,state);const progress=state.answers.length;
 const mission=el('div','hud-mission');mission.append(icon('shield'),el('span','eyebrow',state.screen==='result'?'MISSÕES CONCLUÍDAS':`MISSÃO ${state.missionIndex+1} DE ${catalog.length}`));
 const meter=el('div','hud-progress');meter.append(el('span','',`${progress} de 12 desafios respondidos`));const bar=el('progress','');bar.max=12;bar.value=progress;bar.setAttribute('aria-label','Desafios respondidos');meter.append(bar);
 const points=el('div','xp-total');points.append(icon('bolt'),el('strong','',`${xp.total} XP`));const xpBar=el('progress','xp-meter');xpBar.max=900;xpBar.value=xp.total;xpBar.setAttribute('aria-label','XP obtido, máximo 900');const xpPanel=el('div','xp-panel');xpPanel.append(points,xpBar);hud.append(mission,meter,xpPanel,el('span','rank-label','EXPLORADOR DIGITAL'));return hud;
}
function compactFeedback(m,answer,dimension){
 const q=m.questions.find(q=>q.dimension===dimension);const f=feedback(m,answer).find(f=>f.dimension===dimension);
 const names=ids=>ids.map(id=>q.options.find(o=>o.id===id).feedbackLabel).join(', ');
 const guidance=m.shortFeedback[dimension];
 if(f.adequate)return {adequate:true,text:guidance};
 if(dimension==='decide')return {adequate:false,text:guidance};
 const details=[];if(f.missingOptionIds.length)details.push(`Faltou: ${names(f.missingOptionIds)}`);if(f.extraOptionIds.length)details.push(`revise: ${names(f.extraOptionIds)}`);
 return {adequate:false,text:`${details.join('; ')}. ${guidance.split(/(?<=\.)\s/)[0]}`};
}
export function render(root,state,catalog,dispatch,{focus=true,notice=''}={}){
 const fragment=document.createDocumentFragment();
 if(state.screen==='welcome'){
  const hero=el('section','hero');const copy=el('div','hero-copy');copy.append(pill('SISTEMA ONLINE • 8º ANO'),heading('Sua próxima missão:\nproteger seus dados.'),el('p','lead','Um perfil aberto. Um prêmio suspeito. Uma escolha sua. Entre no jogo e descubra o que suas informações podem revelar.'));
  const actions=el('div','hero-actions');actions.append(button('Começar missão','primary',()=>dispatch('start')),el('span','small','4 MISSÕES · SEM CADASTRO'));copy.append(actions,el('p','session-note','Dados fictícios. Seu progresso e XP não são salvos: sair ou recarregar começa outro percurso. Trocar de aba mantém a tentativa.'));
  const art=el('div','hero-art');art.setAttribute('aria-hidden','true');const radar=el('div','radar');radar.append(icon('shield','hero-shield'));art.append(el('div','terminal-label','CENTRAL DE PROTEÇÃO // 04 MISSÕES'),radar,el('span','signal signal-one','◎ DADOS DETECTADOS'),el('span','signal signal-two','⌁ ANALISANDO RISCOS'),el('span','signal signal-three','✓ VOCÊ NO CONTROLE'));hero.append(copy,art);fragment.append(hero);
  const how=el('section','how');how.setAttribute('aria-label','Como funciona');['Encontre os dados','Reconheça os riscos','Escolha uma ação','Receba orientação'].forEach((text,i)=>{const step=el('div','how-step');step.append(el('span','step-number',`0${i+1}`),el('strong','',labels[stages[i]]),el('p','',text));how.append(step);});fragment.append(how);
  const path=el('section','path');path.append(el('p','eyebrow','MAPA DE MISSÕES'),el('h2','','Quatro missões. Mais proteção.'),el('p','muted','Ganhe XP e aprenda com cada escolha. Errar faz parte do percurso.'));
  const cards=el('ol','mission-grid');catalog.forEach((m,i)=>{const card=el('li',`mission-card card-${i}`);card.append(el('span','card-number',`MISSÃO 0${i+1}`),icon(['target','alert','lock','shield'][i],'card-icon'),el('h3','',focusNames[m.focus]),el('p','',m.title.split(': ').slice(1).join(': ')),el('span','card-reward','ATÉ 225 XP'));cards.append(card);});path.append(cards);fragment.append(path);
  const note=el('section','learning-note');note.append(icon('shield'),el('div','', 'Seu objetivo: reconhecer dados pessoais, avaliar riscos e escolher como se proteger. XP motiva; as três dimensões mostram sua aprendizagem.'));
  const privacy=el('details','privacy');privacy.append(el('summary','','Privacidade e como funciona'),el('p','','Não pedimos dados reais, não salvamos respostas e não há ranking. Sons são opcionais e gerados no dispositivo. O GitHub Pages mantém seus próprios registros de acesso; a atividade não usa esses registros.'));fragment.append(note,privacy);
 }else if(state.screen==='mission'){
  const m=catalog[state.missionIndex];fragment.append(missionHud(state,catalog));
  const toolbar=el('div','mission-toolbar');toolbar.append(el('span','eyebrow',`FOCO: ${focusNames[m.focus]}`),button('Reiniciar','text-button',()=>dispatch('restart')));fragment.append(toolbar,heading(m.title));
  const stepper=el('ol','stepper');stepper.setAttribute('aria-label',`Etapa ${stages.indexOf(state.stage)+1} de 4`);stages.forEach((s,i)=>{const li=el('li',s===state.stage?'active':stages.indexOf(state.stage)>i?'done':'');if(s===state.stage)li.setAttribute('aria-current','step');li.append(el('span','step-dot',stages.indexOf(state.stage)>i?'✓':String(i+1)),el('span','',labels[s]));stepper.append(li);});fragment.append(stepper);
  const layout=el('div','mission-layout');layout.append(renderScenario(m,{el,icon}));const activity=el('section','activity');const challengeHead=el('div','challenge-heading');challengeHead.append(icon('shield'),el('div','',`MISSÃO ${m.order} DE 4 — ${focusNames[m.focus]}`));activity.append(challengeHead);
  if(state.stage!=='understand'){
   const q=m.questions.find(q=>q.dimension===state.stage);activity.append(el('p','eyebrow',`DESAFIO ${stages.indexOf(state.stage)+1} DE 3 • ${labels[state.stage].toUpperCase()}`));const title=el('h2','stage-title',q.prompt);title.tabIndex=-1;activity.append(title);
   const form=el('form','');const group=el('fieldset','options');group.append(el('legend','selection-hint',q.selectionMode==='single'?'Escolha uma alternativa.':'Selecione todas as opções que considerar adequadas.'));group.setAttribute('aria-describedby','selection-error');
   q.options.forEach((o,i)=>{const label=el('label','option');const input=el('input','');input.type=q.selectionMode==='single'?'radio':'checkbox';input.name=q.id;input.value=o.id;input.checked=state.draftOptionIds.includes(o.id);const text=el('span','option-text',o.label);text.id=`${q.id}-${o.id}`;input.setAttribute('aria-labelledby',text.id);const letter=el('span','option-letter',String.fromCharCode(65+i));letter.setAttribute('aria-hidden','true');label.append(input,letter,text);input.addEventListener('change',()=>dispatch('select',{ids:[...group.querySelectorAll('input:checked')].map(n=>n.value)}));group.append(label);});
   const error=el('p','validation');error.id='selection-error';error.setAttribute('role','alert');const confirm=el('button','primary wide',`Confirmar ${state.stage==='identify'?'identificação':state.stage==='assess'?'avaliação':'decisão'}`);confirm.type='submit';
   form.addEventListener('submit',event=>{event.preventDefault();if(confirm.disabled)return;if(!group.querySelector('input:checked')){dispatch('confirm');error.textContent='Escolha pelo menos uma opção antes de confirmar.';group.querySelector('input').focus();return;}confirm.disabled=true;dispatch('confirm');});form.append(group,error,confirm);activity.append(form,el('p','small reassuring','Pode mudar a seleção antes de confirmar. Feedback e XP aparecem em Aprender.'));
  }else{
   activity.classList.add('feedback');activity.append(pill('ETAPA 4 DE 4 • APRENDER'));const h=el('h2','stage-title','Proteção reforçada!');h.tabIndex=-1;activity.append(h,el('p','muted','Confira suas escolhas e leve uma dica para a próxima missão.'));
   for(const dimension of ['identify','assess','decide']){const f=compactFeedback(m,state.answers,dimension);const card=el('article',`feedback-card ${f.adequate?'correct':'review'}`);const top=el('div','feedback-top');top.append(icon(f.adequate?'shield':'alert'),el('h3','',`${labels[dimension]} · ${f.adequate?'Boa escolha!':'Atenção ao risco'}`));card.append(top,el('p','',f.text));if(f.adequate)card.append(el('span','xp-gain',`+${rewards[dimension]} XP — ${dimension==='identify'?'DADO IDENTIFICADO':dimension==='assess'?'RISCO DETECTADO':'DECISÃO SEGURA'}`));activity.append(card);}
   activity.append(button(m.order===catalog.length?'Ver meu resultado':'Próxima missão','primary wide',()=>dispatch('continue')),el('p','completion-note','+25 XP ao concluir esta missão, mesmo com erros.'));
  }
  layout.append(activity);const shell=el('div','mission-shell');const rail=el('ol','mission-rail');rail.setAttribute('aria-label','Percurso das quatro missões');catalog.forEach((item,i)=>{const li=el('li',i===state.missionIndex?'current':i<state.missionIndex?'finished':'');if(i===state.missionIndex)li.setAttribute('aria-current','location');li.append(el('span','rail-number',i<state.missionIndex?'✓':String(i+1)),el('span','',`Missão ${i+1}`),el('strong','',focusNames[item.focus]));rail.append(li);});shell.append(rail,layout);fragment.append(shell);const bot=el('aside','security-assistant');const botImage=el('img','');botImage.src='assets/illustrations/security-bot.svg';botImage.alt='Robô de segurança fictício';botImage.width=80;botImage.height=80;bot.append(botImage,el('p','',state.stage==='understand'?'Orientação recebida. Você pode continuar, mesmo após errar.':'Observe a conversa e as pistas da situação. Depois, faça sua escolha no desafio.'));fragment.append(bot);
 }else if(state.screen==='result'){
  fragment.append(missionHud(state,catalog));const intro=el('section','result-intro');intro.append(icon('shield','finish-shield'),pill('4 DE 4 MISSÕES CONCLUÍDAS'),heading('Missão concluída!'),el('p','lead','Você chegou ao fim. Veja seus aprendizados e o que pode revisar.'));fragment.append(intro);
  const grid=el('div','result-grid');for(const r of results(catalog,state.answers,state.completedMissionIds)){const card=el('section','result-card');card.append(icon(r.dimension==='identify'?'target':r.dimension==='assess'?'alert':'lock','card-icon'),el('h2','',dimensions[r.dimension]));const count=el('p','result-count');count.append(el('strong','',`${r.adequateCount} de ${r.total}`),document.createTextNode(' respostas adequadas'));card.append(count,el('p','result-guidance',r.guidance));if(r.reviewMissionIds.length){const details=el('details','review-list');details.append(el('summary','','Missões para revisar'));for(const id of r.reviewMissionIds){const m=catalog.find(m=>m.id===id);details.append(el('h3','',`Missão ${m.order} · ${focusNames[m.focus]}`),el('p','',m.shortFeedback[r.dimension]));}card.append(details);}grid.append(card);}fragment.append(grid);
  const closing=el('section','result-closing');closing.append(el('p','result-xp',`${xpSummary(catalog,state).total} XP OBTIDOS`),el('p','muted','XP celebra suas escolhas. Não é nota, ranking ou reprovação.'),button('Jogar novamente','primary',()=>dispatch('restart')),el('p','small','As orientações descrevem esta tentativa, não uma classificação de você.'));fragment.append(closing);
 }else fragment.append(heading('Não foi possível carregar as missões'),el('p','','Recarregue para tentar novamente. Nenhuma resposta foi registrada.'),button('Recarregar','primary',()=>location.reload()));
 if(notice)fragment.append(el('div','xp-toast',notice));
 root.replaceChildren(fragment);if(focus){
  const firstLook=state.screen==='mission'&&state.stage==='identify';
  (root.querySelector('.stage-title')||root.querySelector('h1'))?.focus({preventScroll:firstLook});
  if(firstLook)root.querySelector('.mission-toolbar')?.scrollIntoView({block:'start'});
 }
}
export function showRestart(root,dispatch,onClose){
 const dialog=el('dialog','restart-dialog');dialog.setAttribute('aria-labelledby','restart-title');const h=el('h2','','Jogar de novo?');h.id='restart-title';dialog.append(h,el('p','','Suas respostas e XP serão descartados. Você voltará à Missão 1.'));
 const actions=el('div','dialog-actions');const cancel=button('Cancelar','secondary',()=>{dialog.close();dispatch('cancel');});actions.append(cancel,button('Reiniciar percurso','primary',()=>{dialog.close();dispatch('reset');}));dialog.append(actions);dialog.addEventListener('cancel',event=>{event.preventDefault();dialog.close();dispatch('cancel');});dialog.addEventListener('close',()=>{dialog.remove();onClose?.();},{once:true});root.append(dialog);dialog.showModal();cancel.focus();
}
