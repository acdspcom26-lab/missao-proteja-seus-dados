// Apresentação das simulações. Interações locais não alteram respostas, XP ou progresso.
export function renderScenario(m,{el,icon}) {
  const asset=name=>`assets/illustrations/${name}.svg`;
  const glyph=text=>{const span=el('span','scene-glyph',text);span.setAttribute('aria-hidden','true');return span;};
  const avatar=(name,label)=>{const img=el('img','scene-avatar');img.src=asset(name);img.alt=label;img.width=64;img.height=64;return img;};
  const action=(name,text,fn)=>{const b=el('button','scene-action',text);b.type='button';b.setAttribute('aria-label',name);b.addEventListener('click',fn);return b;};
  const section=el('section',`scenario immersive-scene scene-${m.context.kind}`);section.setAttribute('aria-label','Situação simulada');
  const isSocial=m.order===2;
  const bar=el('div','app-bar');bar.append(glyph(isSocial?'◉':'✥'),el('strong','',isSocial?'CONECTA+':'ILHA PIXEL'),el('span','app-meta',isSocial?'seu mundo, conectado':'MUNDO ONLINE'));
  const barSymbols=el('span','app-symbols','♙  ◌  ⚙');barSymbols.setAttribute('aria-hidden','true');bar.append(barSymbols);section.append(bar);
  if(!isSocial){
    const world=el('div',`game-world ${m.order===4?'event-world':''}`);const panorama=el('img','island-panorama');panorama.src=asset('island-lobby');panorama.alt='';panorama.width=1000;panorama.height=320;world.append(panorama);
    const overlay=el('div','world-caption');overlay.append(el('span','world-badge',m.order===4?'EVENTO ESPECIAL':'ILHA DAS NUVENS'),el('strong','',m.order===4?'EXPEDIÇÃO: ITEM RARO':'Sua próxima aventura começa aqui'));world.append(overlay);section.append(world);
    const menu=el('div','scene-nav');menu.setAttribute('role','group');menu.setAttribute('aria-label','Explorar o jogo fictício');const info=el('p','scene-nav-info','Lobby • conversa recebida durante uma partida.');info.setAttribute('role','status');
    const menuItems=[['⌂','Lobby','Lobby • conversa recebida durante uma partida.'],['♙','Amizades','Amizades • o remetente desta conversa não está na lista.'],['◇','Loja','Loja • itens do mundo fictício. Nenhuma compra pode ser realizada.'],['✧','Eventos','Evento • oferta recebida de um jogador. A conversa permanece abaixo.']];
    for(const [symbol,label,message] of menuItems){const b=action(label,'',()=>{for(const sibling of menu.children)sibling.setAttribute('aria-pressed','false');b.setAttribute('aria-pressed','true');info.textContent=message;});b.append(glyph(symbol),document.createTextNode(label));b.setAttribute('aria-pressed',String(label==='Lobby'));menu.append(b);}section.append(menu,info);
  }
  const intro=el('div','scene-brief');intro.append(el('span','simulation-badge','SIMULAÇÃO • PERSONAGENS FICTÍCIOS'),el('p','',m.context.introduction));section.append(intro);

  function sender(name,own=false){
    const header=el('div','chat-sender');header.append(avatar(own?'avatar-player':'avatar-stranger',`Avatar fictício de ${name}`));const who=el('div','sender-name');who.append(el('strong','',name),el('span',own?'small':'online-indicator',own?'Você na simulação':'● Online agora'));header.append(who,el('span','chat-time','Agora • fictício'));return header;
  }
  function requestList(rows){const list=el('ul','requested-data');for(const [symbol,text] of rows){const li=el('li','');li.append(glyph(symbol),el('span','',text));list.append(li);}return list;}
  function reply(text){const outgoing=el('div','outgoing-message');outgoing.append(el('div','reply-bubble',text),avatar('avatar-player','Avatar da personagem na simulação'));return outgoing;}
  function composer(){const fake=el('div','simulated-composer');fake.append(glyph('◉'),el('span','','Conversa simulada — responda no desafio ao lado.'),glyph('➤'));return fake;}
  function profileDisclosure(){
    const box=el('div','sender-details');box.hidden=true;box.append(el('strong','','Perfil de Neblina_07'),el('p','','Identidade não confirmada. Vocês participaram de uma partida; Nino não conhece essa pessoa fora do jogo.'));
    const b=action('Ver perfil do remetente','♙ Ver perfil do remetente',()=>{box.hidden=!box.hidden;b.setAttribute('aria-expanded',String(!box.hidden));});b.setAttribute('aria-expanded','false');return [b,box];
  }
  function rewardChat(final=false){
    const chat=el('div',final?'chat-stream final-chat':'chat-stream');chat.append(sender(final?'Organizador_Épico':'Neblina_07'));
    const message=el('div','chat-message');message.append(el('span','unknown-badge','REMETENTE DESCONHECIDO'),el('h2','',final?'Você ganhou um ITEM RARO!':'Você foi selecionado para um BAÚ LENDÁRIO!'));
    if(!final){message.append(el('p','','Vou te enviar 500 cristais virtuais para usar no jogo. Para receber, preciso que envie:'),requestList([['⌂','Endereço de casa'],['▯','Número de telefone'],['▣','Senha da conta']]));}
    else {message.append(el('p','','Vi seu perfil @maya.pixel e sua rotina! Confirme sua vaga no evento enviando:'),requestList([['▣','Senha da conta']]));}
    const urgency=el('p','urgency');urgency.append(glyph('◷'),document.createTextNode(final?'A oferta termina em poucos minutos. Envie agora!':'Manda rápido para não perder o prêmio!'));message.append(urgency);chat.append(message,reply('Recebi o convite. Vou pensar antes de responder.'));return chat;
  }
  function socialPost(final=false){
    const post=el('article','social-feed');const author=el('div','social-author');author.append(avatar('avatar-luna',final?'Avatar fictício de Maya':'Avatar fictício de Luna'));const identity=el('div','');identity.append(el('strong','',final?'Maya Pixel':'Luna Desenha'),el('span','small',final?'@maya.pixel · Hoje':'@luna.desenha · Hoje'));author.append(identity,el('span','audience-badge','◉ Público'));post.append(author);
    const body=el('div','social-post-body');body.append(el('span','location-chip','⌖ Praça das Nuvens · local fictício'));
    const quote=el('p','social-quote');quote.append(document.createTextNode(final?'Toda terça às 17h estou na Praça das Nuvens depois da aula!':'Eu e @caio.inventado treinamos na Praça das Nuvens toda terça às 17h. Encontre a gente lá!'));body.append(quote);
    if(final){const e=m.context.elements.find(e=>e.kind==='illustration');const figure=el('figure','post-photo');const img=el('img','');img.src=e.assetPath;img.alt=e.description;img.width=600;img.height=340;const detail=el('details','image-description');detail.append(el('summary','','Ler as pistas da imagem'),el('p','',e.description));figure.append(img,detail);body.append(figure);}
    else {const visual=el('div','routine-visual');visual.append(el('div','routine-map', '⌖'),el('div','routine-labels'));const labels=visual.lastElementChild;labels.append(el('span','','LOCAL MARCADO'),el('strong','','Praça das Nuvens'),el('p','','Toda terça • 17h'),el('span','tag-person','COM @caio.inventado'));body.append(visual);}
    post.append(body,el('p','social-count','24 curtidas · 2 comentários • números fictícios'));
    const comments=el('div','social-comments');comments.hidden=true;comments.append(el('strong','',final?'@amizade.pixel':'@caio.inventado'),el('p','',final?'Essa foto mostra a escola também.':'Ainda não autorizei essa marcação.'),el('strong','','@nuvem.ficticia'),el('p','','Vi sua publicação no feed.'));
    const tools=el('div','social-actions');let liked=false;const like=action('Simular curtida','♡ Curtir',()=>{liked=!liked;like.setAttribute('aria-pressed',String(liked));like.textContent=liked?'♥ Curtida simulada':'♡ Curtir';});like.setAttribute('aria-pressed','false');
    const comment=action('Ver comentários','◌ Comentários',()=>{comments.hidden=!comments.hidden;comment.setAttribute('aria-expanded',String(!comments.hidden));});comment.setAttribute('aria-expanded','false');
    const shareNote=el('p','share-note');shareNote.hidden=true;shareNote.textContent='Simulação: a publicação está visível para qualquer pessoa. Nada foi compartilhado de verdade.';const share=action('Ver alcance do compartilhamento','↗ Compartilhar',()=>{shareNote.hidden=!shareNote.hidden;share.setAttribute('aria-expanded',String(!shareNote.hidden));});share.setAttribute('aria-expanded','false');tools.append(like,comment,share);post.append(tools,comments,shareNote);return post;
  }
  if(m.order===1){section.append(rewardChat(),composer());}
  else if(m.order===2){const socialMenu=el('div','social-menu');socialMenu.append(el('span','active','◉ Feed'),el('span','','♙ Perfil'),el('span','','◌ Mensagens · 1'));socialMenu.setAttribute('aria-label','Seções da rede fictícia');section.append(socialMenu,socialPost());const request=el('div','friend-request');request.append(avatar('avatar-stranger','Avatar de perfil desconhecido'),el('div','','@perfil.neblina quer acompanhar suas publicações.'),el('span','unknown-badge','SOLICITAÇÃO RECEBIDA'));section.append(request);}
  else if(m.order===3){const chat=el('div','private-conversation chat-stream');chat.append(el('div','conversation-label','MENSAGEM PRIVADA • Não está nas suas amizades'),sender('Neblina_07'),...profileDisclosure());const first=el('div','chat-message');first.append(el('p','','Boa partida, Nino! Quero te encontrar depois da aula. Me conta:'),requestList([['⌂','Qual é a sua escola?'],['◷','Que horas você sai de lá?']]),el('p','','Posso te encontrar na saída. A gente gosta do mesmo jogo!'));chat.append(first,reply('A gente só se conhece pelo jogo…'));section.append(chat,composer());}
  else {const banner=el('div','event-banner');banner.append(glyph('✧'),el('div','', 'EVENTO ESPECIAL • ITEM RARO'),el('span','event-limit','CONVITE RECEBIDO'));section.append(banner);const combined=el('div','cross-platform');const profile=el('div','linked-profile');profile.append(el('span','platform-label','CONECTA+ / PERFIL PÚBLICO'),avatar('avatar-luna','Avatar fictício de Maya'),el('strong','','@maya.pixel'),el('p','','Telefone de contato: (XX) XXXXX-XXXX'));combined.append(profile,socialPost(true),el('div','platform-transition','↳ ILHA PIXEL / CONVITE PARA @maya.pixel'),rewardChat(true));section.append(combined,composer());}
  section.append(el('p','scene-note','Todos os perfis e dados são fictícios. Não há envio de mensagens, compras ou publicação real.'));
  return section;
}
