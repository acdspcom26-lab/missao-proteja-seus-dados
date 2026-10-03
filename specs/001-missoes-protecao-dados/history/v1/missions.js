// Catálogo local: todas as pessoas, mensagens e informações são fictícias.
// As funções abaixo apenas normalizam a redação em objetos; não avaliam respostas.
const datum = (id,label,category,elementIds) => ({id,label,category,elementIds});
const risk = (id,explanation,datumIds) => ({id,explanation,datumIds});
const element = (id,kind,text) => ({id,kind,text});
const option = (id,label,selected,omitted,datumIds=[],riskIds=[],elementIds=[]) => ({id,label,datumIds,riskIds,elementIds,explanation:{whenSelected:selected,whenOmitted:omitted}});
const question = (n,dimension,prompt,expectedOptionIds,options) => ({id:`m${n}-${dimension}`,dimension,prompt,selectionMode:dimension==='decide'?'single':'multiple',expectedOptionIds,options});
const mission = (order,title,complexity,context,personalData,risks,questions,synthesis) => ({id:`mission-${order}`,order,title,skill:'EF08CO08',objective:`Distinguir dados pessoais e avaliar riscos: ${complexity}`,complexity,context,personalData,risks,questions,synthesis,integratedMissionIds:order===7?Array.from({length:6},(_,i)=>`mission-${i+1}`):[]});
export const missions = [
  mission(1,'O perfil que conta demais','Reconhecer dados explícitos de identificação e contato.',{
    kind:'social-profile',introduction:'Lia está montando seu perfil na rede fictícia Conecta. Antes de deixar tudo público, ela pediu sua ajuda.',elements:[
      element('profile','profile','Lia Estrela Inventada\n@lia.pixel • Perfil público\nNome completo: Lia Estrela Inventada\nTelefone: (XX) XXXXX-XXXX\nSobre mim: gosto de jogos de aventura.')]
  },[datum('name','Nome completo','identification',['profile']),datum('phone','Telefone','contact',['profile'])],[risk('identify','O nome completo pode facilitar a identificação da personagem.',['name']),risk('contact','O telefone exposto pode permitir contatos indesejados.',['phone'])],[
    question(1,'identify','Quais informações do perfil identificam Lia ou permitem entrar em contato com ela?',['name','phone'],[
      option('name','Nome completo','O nome completo ajuda a identificar uma pessoa.','Faltou o nome completo: ele pode identificar Lia.',['name']),
      option('phone','Telefone','O telefone permite contato direto e merece proteção.','Faltou o telefone: ele abre um caminho de contato direto.',['phone']),
      option('interest','Gostar de jogos de aventura','Neste contexto, esse interesse genérico não identifica Lia nem permite contato como um telefone.','Um interesse genérico não equivale ao nome completo ou telefone.')]),
    question(1,'assess','O que pode acontecer quando esses dados ficam públicos?',['identify','contact'],[
      option('identify','Outras pessoas podem identificar Lia pelo nome','O nome completo facilita ligar o perfil à pessoa.','Considere que o nome completo facilita identificar Lia.',['name'],['identify']),
      option('contact','Lia pode receber contatos indesejados','O telefone público pode chegar a pessoas com quem Lia não quer conversar.','O telefone exposto pode ser usado para contatos indesejados.',['phone'],['contact']),
      option('game','Gostar de aventura revela a senha do jogo','Uma preferência genérica não revela a senha. O risco aqui está nos dados de identificação e contato.','A preferência por aventura não revela uma senha.')]),
    question(1,'decide','Qual versão do perfil reduz a exposição desnecessária?',['protect'],[
      option('protect','Usar um apelido e retirar nome completo e telefone','Retirar os dados desnecessários reduz a exposição, mantendo o interesse em jogos.','A versão mais cuidadosa usa apelido e retira nome completo e telefone.',['name','phone']),
      option('phone','Retirar só o nome e manter o telefone','O telefone ainda permite contato direto. Retire também esse dado.','Manter o telefone mantém a possibilidade de contato indesejado.',['phone']),
      option('keep','Manter tudo para encontrar mais amizades','Buscar amizades não exige publicar nome completo e telefone. Use a versão com menos dados.','A vontade de conhecer pessoas não elimina os riscos de exposição.',['name','phone'])])
  ],{dataExplanation:'Nome completo e telefone são dados pessoais. O interesse genérico em jogos não equivale a esses identificadores neste perfil.',riskExplanation:'A exposição facilita identificação e contatos indesejados.',protectionExplanation:'Use apelido e retire nome completo e telefone desnecessários. Isso reduz a exposição, sem garantir risco zero.'}),
  mission(2,'O convite no chat do jogo','Reconhecer uma solicitação de escola e horário que revela rotina.',{
    kind:'game-chat',introduction:'Durante uma partida no jogo fictício Ilha Pixel, alguém que Nino não conhece faz um convite.',elements:[
      element('message1','message','Nino: Boa partida! Você também gosta deste mapa?'),
      element('message2','message','Jogador Neblina: Sim! Qual é sua escola? Que horas você sai de lá? Posso te encontrar na saída.'),
      element('message3','message','Nino: A gente só se conhece pelo jogo…')]
  },[datum('school','Escola','location',['message2']),datum('time','Horário de saída','routine',['message2'])],[risk('locate','Escola e horário juntos podem permitir localizar a personagem.',['school','time'])],[
    question(2,'identify','Quais informações da vida fora do jogo estão sendo pedidas?',['school','time'],[
      option('school','A escola onde Nino estuda','A escola indica um local da vida de Nino.','Faltou perceber que o pedido da escola revela um local frequentado.',['school']),
      option('time','O horário em que Nino sai da escola','O horário de saída revela parte da rotina.','Faltou o horário: combinado com a escola, ele revela quando Nino está lá.',['time']),
      option('map','Gostar do mapa da partida','Conversar sobre o mapa não responde onde Nino estuda nem quando sai.','O gosto pelo mapa é assunto do jogo neste contexto.')]),
    question(2,'assess','Qual risco está relacionado ao pedido?',['locate'],[
      option('locate','Alguém pode saber onde e quando encontrar Nino','Escola e horário se combinam para revelar uma rotina.','Pense na combinação: escola informa onde; horário informa quando.',['school','time'],['locate']),
      option('trust','Nenhum risco, pois jogar juntos garante confiança','Ter um jogo em comum não confirma a identidade nem as intenções da outra pessoa.','Jogar juntos não torna seguro compartilhar a rotina.'),
      option('level','Nino vai perder seus pontos automaticamente','O pedido não causa perda automática de pontos. O risco é revelar a rotina.','Pontos do jogo não são o risco apresentado.')]),
    question(2,'decide','Como Nino pode se proteger nessa conversa?',['protect'],[
      option('protect','Não informar a rotina; encerrar ou denunciar o contato e buscar ajuda de uma pessoa adulta de confiança','Recusar o pedido protege a rotina. Encerrar ou denunciar e buscar ajuda são alternativas de cuidado.','A alternativa adequada recusa o envio e permite encerrar ou denunciar e buscar apoio.',['school','time']),
      option('school','Contar só a escola, sem o horário','Mesmo sem o horário, a escola revela um local frequentado. Não envie esses dados nesse contato.','A escola também merece proteção.',['school']),
      option('share','Informar escola e horário porque o jogador foi simpático','Simpatia não comprova confiança. Esses dados juntos podem permitir localizar Nino.','Uma conversa agradável não justifica revelar a rotina.',['school','time'])])
  ],{dataExplanation:'Escola e horário de saída são informações pessoais sobre local e rotina.',riskExplanation:'Juntas, essas informações podem permitir que alguém descubra onde e quando encontrar a personagem.',protectionExplanation:'Recuse compartilhar a rotina, encerre ou denuncie o contato e procure uma pessoa adulta de confiança quando necessário. Aqui, todas as ações são simuladas.'}),
  mission(3,'A foto entrega o lugar','Relacionar pistas visuais e legenda que revelam escola e localização.',{
    kind:'social-post',introduction:'Bia quer publicar uma foto depois da aula na rede fictícia Conecta. Observe a imagem e a legenda.',elements:[
      {...element('photo','illustration','Foto ilustrativa de uma mochila ao lado de uma placa escolar.'),assetPath:'assets/illustrations/mission-3.svg',description:'Na imagem, o crachá da mochila e a placa mostram Escola Horizonte Inventado. Ao fundo há uma placa: Praça das Nuvens (local fictício).'},
      element('caption','post','@bia.cria: Acabei de sair da Escola Horizonte Inventado. Estou na Praça das Nuvens agora!')]
  },[datum('school','Escola na imagem','location',['photo']),datum('place','Localização na imagem e legenda','location',['photo','caption'])],[risk('where','As pistas visuais e a legenda podem revelar onde Bia está.',['school','place'])],[
    question(3,'identify','Quais pistas revelam locais ligados a Bia?',['school','place'],[
      option('school','O nome da escola no crachá e na placa','Mesmo dentro de uma imagem, o nome da escola é uma pista pessoal de localização.','Observe também a imagem: crachá e placa mostram a escola.',['school']),
      option('place','A praça na imagem e na legenda dizendo “agora”','A praça e a indicação de agora revelam uma localização atual.','A praça aparece tanto na imagem quanto na legenda e pode indicar onde Bia está.',['place']),
      option('color','A cor verde da mochila, sozinha','A cor da mochila sozinha não informa escola ou localização neste cenário.','A cor, por si só, não é a pista de localização trabalhada aqui.')]),
    question(3,'assess','O que a combinação da imagem com a legenda pode revelar?',['where'],[
      option('where','Onde Bia estuda e onde está naquele momento','Placas, crachá e legenda podem indicar locais mesmo sem um endereço escrito.','A ausência de endereço não elimina o risco: as pistas revelam escola e praça.',['school','place'],['where']),
      option('safe','Nada, porque não há endereço completo','Dados pessoais também aparecem indiretamente. Nome da escola e praça já são pistas.','Não é preciso um endereço completo para revelar um lugar.'),
      option('password','A senha da conta de Bia','Nenhuma senha aparece nessa foto. O risco apresentado é de localização.','A imagem não apresenta senha.')]),
    question(3,'decide','Qual revisão cuida de todas as pistas antes da publicação simulada?',['protect'],[
      option('protect','Ocultar escola e placas na imagem e retirar a localização da legenda','Revisar imagem e legenda remove as pistas previstas de escola e localização atual.','Cuide dos dois formatos: o que aparece na foto e o que está escrito.',['school','place']),
      option('caption','Apagar só a legenda e manter a foto','Crachá e placas continuam revelando escola e praça. Também é preciso ocultar essas pistas na imagem.','Apagar só a legenda deixa as pistas visuais expostas.',['school','place']),
      option('photo','Ocultar as placas, mas manter “estou na praça agora”','A legenda ainda revela onde Bia está. Revise também o texto.','A legenda pode continuar expondo a localização.',['place'])])
  ],{dataExplanation:'A escola no crachá e nas placas, a praça e a legenda são pistas pessoais de localização.',riskExplanation:'Uma imagem pode revelar onde alguém estuda ou está, mesmo sem endereço escrito. Texto e imagem se complementam.',protectionExplanation:'Antes de publicar, revise imagem e legenda: oculte as pistas visuais e retire a localização atual do texto.'}),
  mission(4,'O prêmio pede informação demais','Avaliar múltiplos dados e uma credencial solicitados em troca de recompensa.',{
    kind:'game-offer',introduction:'No jogo fictício Ilha Pixel, Téo recebeu esta oferta. Nenhum dado deve ser digitado: analise apenas a simulação.',elements:[
      element('offer','offer','BAÚ LENDÁRIO GRÁTIS!\nOferta recebida por mensagem de um perfil desconhecido.\n“Para receber, envie seu endereço de casa, telefone e senha da conta.”\nRecompensa anunciada: 500 cristais virtuais.')]
  },[datum('address','Endereço','location',['offer']),datum('phone','Telefone','contact',['offer']),datum('password','Senha','credential',['offer'])],[risk('exposure','Endereço e telefone podem expor a pessoa a localização e contatos indesejados.',['address','phone']),risk('account','A senha pode permitir acesso indevido à conta.',['password'])],[
    question(4,'identify','Quais informações pessoais ou de acesso a oferta está pedindo?',['address','phone','password'],[
      option('address','Endereço de casa','O endereço indica onde a pessoa mora.','Faltou o endereço de casa, que revela um local pessoal.',['address']),
      option('phone','Telefone','O telefone permite contato direto.','Faltou o telefone, que é um dado de contato.',['phone']),
      option('password','Senha da conta','A senha é uma credencial: uma informação usada para acessar a conta.','Faltou a senha, que protege o acesso à conta.',['password']),
      option('crystals','Quantidade de cristais anunciada','O número de cristais descreve a recompensa; não identifica a personagem.','A quantidade de cristais não é um dado pessoal neste contexto.')]),
    question(4,'assess','Quais riscos e sinais de alerta aparecem nessa oferta?',['exposure','account','reward'],[
      option('exposure','Endereço e telefone podem expor Téo fora do jogo','Esses dados podem permitir localização e contato indesejado.','Não olhe só para a senha: endereço e telefone também expõem Téo.',['address','phone'],['exposure']),
      option('account','A senha pode permitir que outra pessoa acesse a conta','Quem recebe a senha pode tentar entrar na conta.','A senha solicitada coloca o acesso à conta em risco.',['password'],['account']),
      option('reward','A recompensa está sendo usada para incentivar o envio de dados','Um prêmio atraente pode pressionar a compartilhar dados desnecessários.','Observe a troca proposta: uma recompensa está incentivando o envio.',['address','phone','password'],['exposure','account']),
      option('guarantee','Ser um prêmio gratuito garante que a oferta é segura','Gratuidade não comprova segurança nem justifica pedir senha e dados pessoais.','Um prêmio gratuito não é garantia de confiança.')]),
    question(4,'decide','Como agir diante dessa oferta?',['protect'],[
      option('protect','Recusar o envio e verificar a oferta por um canal confiável do jogo','Recusar protege os dados; verificar em um canal confiável ajuda a avaliar a oferta sem entregar informações.','A decisão adequada recusa os dados e verifica a oferta por um canal confiável.',['address','phone','password']),
      option('partial','Enviar endereço e telefone, mas guardar a senha','Guardar a senha é importante, mas endereço e telefone também não devem ser enviados nesse contexto.','Não basta guardar a senha se outros dados continuam expostos.',['address','phone']),
      option('send','Enviar tudo para garantir os cristais','Uma recompensa não justifica entregar dados pessoais ou senha a um perfil desconhecido.','Não envie os dados para garantir a recompensa.',['address','phone','password'])])
  ],{dataExplanation:'Endereço revela moradia; telefone permite contato; senha é uma credencial de acesso.',riskExplanation:'A oferta combina exposição pessoal e acesso indevido à conta. O prêmio incentiva uma entrega desnecessária de informações.',protectionExplanation:'Recuse o envio de todos os dados pedidos e escolha verificar a oferta em um canal confiável. A atividade apenas simula essa decisão, sem abrir serviços externos.'}),
  mission(5,'Quem vai ver essa postagem?','Combinar cuidado com rotina, dados de terceiros e alcance da publicação.',{
    kind:'social-post',introduction:'Luna preparou uma postagem pública e marcou uma amizade. A outra pessoa ainda não autorizou aparecer.',elements:[
      element('post','post','@luna.desenha • Audiência: qualquer pessoa\n“Eu e @caio.inventado treinamos na Praça das Nuvens toda terça às 17h. Encontre a gente lá!”\nCaio não autorizou a marcação.')]
  },[datum('routine','Local e horário habitual','routine',['post']),datum('friend','Identificação da amizade','identification',['post'])],[risk('audience','Desconhecidos podem ver a rotina publicada.',['routine']),risk('forward','A postagem pode ser repassada além da audiência escolhida.',['routine','friend']),risk('other','A marcação expõe outra pessoa sem autorização.',['friend'])],[
    question(5,'identify','Quais dados pessoais aparecem na postagem?',['routine','friend'],[
      option('routine','Local, dia e horário do treino','Local, dia e horário descrevem uma rotina.','Faltou a rotina: praça, terça e 17h indicam onde e quando.',['routine']),
      option('friend','A marcação que identifica Caio','Marcar alguém liga essa pessoa à postagem e à rotina.','Faltou a identificação de Caio, que também merece cuidado.',['friend']),
      option('public','O rótulo “Audiência: qualquer pessoa”, por si só','O rótulo informa o alcance da postagem; não é, por si só, um dado pessoal da personagem.','O rótulo da audiência é uma configuração, relevante para avaliar o risco.')]),
    question(5,'assess','Quais riscos precisam ser considerados?',['audience','forward','other'],[
      option('audience','Desconhecidos podem descobrir a rotina','Uma publicação pública permite que desconhecidos vejam local e horário.','Considere que o público inclui desconhecidos.',['routine'],['audience']),
      option('forward','A postagem pode ser repassada, mesmo com audiência limitada','Limitar quem vê ajuda, mas alguém ainda pode repassar o conteúdo.','Audiência limitada não impede todo repasse.',['routine','friend'],['forward']),
      option('other','Caio pode ter seus dados expostos sem autorização','A postagem também revela dados de outra pessoa.','A proteção inclui os dados da amizade marcada.',['friend'],['other']),
      option('zero','Restringir a audiência elimina todos os riscos','Ainda pode haver repasse e exposição desnecessária. Revise também o conteúdo.','Limitar audiência reduz o alcance, mas não garante risco zero.')]),
    question(5,'decide','Qual versão cuida do conteúdo e de quem pode vê-lo?',['protect'],[
      option('protect','Retirar a rotina detalhada e a marcação sem autorização, e limitar a audiência','Essa revisão reduz dados desnecessários, respeita a outra pessoa e limita o alcance.','Combine menos dados, respeito à autorização e audiência limitada.',['routine','friend']),
      option('audience','Limitar a audiência, mantendo a rotina e a marcação','A rotina e os dados de Caio continuam expostos e podem ser repassados. Revise também o conteúdo.','Só limitar a audiência não resolve os dados mantidos.',['routine','friend']),
      option('tag','Retirar a marcação, mas deixar o local e horário públicos','Retirar a marcação ajuda Caio, mas a rotina de Luna permanece pública.','O cuidado com terceiros não substitui a revisão da própria rotina.',['routine'])])
  ],{dataExplanation:'A rotina de Luna e a identificação de Caio são dados pessoais. Os dados de outras pessoas também exigem cuidado.',riskExplanation:'Uma postagem pública alcança desconhecidos; mesmo uma postagem restrita pode ser repassada.',protectionExplanation:'Retire a rotina detalhada e a identificação de terceiros sem autorização, e limite a audiência. Essas medidas reduzem riscos, sem eliminá-los por completo.'}),
  mission(6,'As pistas se juntam','Relacionar pistas distribuídas entre perfis e publicações.',{
    kind:'combined',introduction:'Observe dois espaços fictícios usados por uma mesma personagem. Separadas, as pistas parecem pequenas. O que revelam juntas?',elements:[
      element('game','profile','Ilha Pixel • @cometa.azul\n“Depois da aula eu entro. Terças, só depois das 18h!”'),
      element('social','post','Conecta • @cometa.azul\n“Mais um dia na Escola Horizonte Inventado. Nosso treino de terça termina às 17h30!”')]
  },[datum('nickname','Apelido reutilizado','linking-clue',['game','social']),datum('school','Escola','location',['social']),datum('times','Pistas de horários','routine',['game','social'])],[risk('link','O mesmo apelido conecta os perfis; escola e horários juntos permitem inferir parte da rotina.',['nickname','school','times'])],[
    question(6,'identify','Quais pistas ajudam a relacionar os espaços e a rotina?',['nickname','school','times'],[
      option('nickname','O mesmo apelido nos dois espaços','Um apelido reutilizado pode servir de ligação entre perfis.','Faltou o apelido repetido: ele ajuda a conectar as informações.',['nickname']),
      option('school','O nome da escola na publicação','A escola acrescenta um local à combinação.','Faltou a escola, que informa um local frequentado.',['school']),
      option('times','Os horários mencionados no perfil e na postagem','Os horários ajudam a inferir quando a personagem está disponível ou em atividade.','Observe os horários nos dois espaços: são pistas da rotina.',['times']),
      option('platform','O nome do jogo Ilha Pixel, sozinho','O nome do jogo é comum a vários jogadores; sozinho não liga esses perfis à rotina.','O nome do jogo, sozinho, não é a ligação pessoal deste cenário.')]),
    question(6,'assess','Qual risco surge ao juntar essas informações?',['link'],[
      option('link','Relacionar o perfil do jogo à escola e à rotina da personagem','O apelido conecta os espaços; escola e horários completam as pistas.','Considere o conjunto: apelido, escola e horários podem revelar mais juntos.',['nickname','school','times'],['link']),
      option('separate','Nenhum risco, pois os dados estão em lugares diferentes','Informações públicas de lugares diferentes podem ser combinadas.','Estar em espaços diferentes não impede a associação.'),
      option('name','Só existe risco quando aparece o nome completo','Apelidos e outras pistas também podem vincular perfis e rotina sem nome completo.','A identificação não depende apenas do nome completo.')]),
    question(6,'decide','Qual revisão reduz as pistas que se conectam?',['protect'],[
      option('protect','Revisar os dois espaços: reduzir a ligação por apelido e retirar escola e horários desnecessários','A revisão conjunta reduz tanto a ligação entre perfis quanto as pistas de local e rotina.','Revise o conjunto de perfis e publicações, não apenas um trecho.',['nickname','school','times']),
      option('school','Apagar só a escola, mantendo o apelido e todos os horários','A escola sai, mas o apelido ainda liga os espaços e os horários continuam revelando rotina.','Uma correção isolada deixa outras pistas combináveis.',['nickname','times']),
      option('game','Apagar só o horário do jogo e manter a postagem','A postagem ainda revela escola e horário do treino, ligados ao apelido.','Revise também a postagem e as ligações entre os perfis.',['nickname','school','times'])])
  ],{dataExplanation:'Apelido reutilizado, escola e horários são pistas distribuídas entre os dois espaços.',riskExplanation:'A combinação permite ligar um perfil de jogo a locais e à rotina, mesmo sem nome completo.',protectionExplanation:'Revise perfis e publicações em conjunto: reduza as ligações desnecessárias e retire pistas de escola e horários. Um único trecho corrigido pode deixar outras associações possíveis.'}),
  mission(7,'Desafio final: proteja a personagem','Integrar contato, pistas visuais, rotina, credenciais e incentivo de recompensa.',{
    kind:'combined',introduction:'Maya recebeu um convite para um evento de Ilha Pixel divulgado na Conecta. Analise perfil, postagem e conversa antes de decidir.',elements:[
      element('profile','profile','@maya.pixel • Perfil público\nTelefone de contato: (XX) XXXXX-XXXX'),
      {...element('photo','illustration','Imagem que Maya publicou depois da aula.'),assetPath:'assets/illustrations/mission-7.svg',description:'A mochila exibe um crachá da Escola Horizonte Inventado. Uma placa indica Praça das Nuvens, local fictício.'},
      element('post','post','@maya.pixel: Toda terça às 17h estou na Praça das Nuvens depois da aula!'),
      element('chat','message','Organizador desconhecido: Vi seu perfil! Você ganhou entrada e itens raros. Envie a senha da conta para confirmar sua vaga no evento.')]
  },[datum('phone','Telefone público','contact',['profile']),datum('location','Escola e praça na imagem','location',['photo']),datum('routine','Rotina na postagem','routine',['post']),datum('password','Senha solicitada','credential',['chat'])],[risk('contact','O telefone público permite contatos indesejados.',['phone']),risk('locate','Imagem e rotina juntas podem revelar onde e quando encontrar Maya.',['location','routine']),risk('account','A senha solicitada pode permitir acesso indevido à conta.',['password'])],[
    question(7,'identify','Quais dados ou pistas pessoais aparecem nesses espaços?',['phone','location','routine','password'],[
      option('phone','O telefone no perfil','O telefone é um dado de contato direto.','Revise o perfil: há um telefone público.',['phone']),
      option('location','A escola e a praça mostradas na imagem','As pistas visuais revelam locais relacionados à personagem.','Observe a imagem: crachá e placa revelam escola e praça.',['location']),
      option('routine','O dia, horário e local habitual na postagem','Essas informações descrevem uma rotina.','A postagem revela onde e quando Maya costuma estar.',['routine']),
      option('password','A senha pedida na conversa','A senha protege o acesso à conta e não deve ser entregue para garantir prêmio.','A conversa solicita uma credencial de acesso: a senha.',['password']),
      option('items','A expressão “itens raros”, sozinha','Essa expressão descreve o incentivo, não um dado pessoal. Ela é relevante para avaliar a oferta.','O prêmio é um incentivo; não é, por si só, um dado pessoal.')]),
    question(7,'assess','Quais riscos ou sinais de alerta você reconhece no conjunto?',['contact','locate','account','reward'],[
      option('contact','O telefone pode ser usado para contatos indesejados','Um perfil público pode expor o contato a desconhecidos.','O risco do telefone também precisa ser considerado.',['phone'],['contact']),
      option('locate','A imagem e a rotina podem revelar onde e quando encontrar Maya','Placas e postagem se completam: local, dia e horário podem ser associados.','Combine as pistas da imagem e da postagem para avaliar a localização.',['location','routine'],['locate']),
      option('account','A senha pode permitir acesso indevido à conta','Entregar uma senha coloca o acesso à conta em risco.','Não esqueça o risco de acesso à conta causado pela senha solicitada.',['password'],['account']),
      option('reward','Itens raros estão sendo usados para incentivar o envio da senha','O incentivo do prêmio não justifica entregar credenciais.','A recompensa é parte da pressão para enviar a senha.',['password'],['account']),
      option('known','Conhecer o perfil de Maya prova que o organizador é confiável','Qualquer pessoa pode ter visto o perfil público. Isso não comprova confiança.','Conhecer dados públicos não confirma a identidade do contato.')]),
    question(7,'decide','Qual conjunto de ações protege melhor a personagem neste contexto?',['protect'],[
      option('protect','Recusar o envio; retirar telefone, pistas visuais e rotina; verificar ou denunciar o contato por um canal confiável','Esse conjunto trata conta, contato, localização e rotina, além de permitir verificar ou denunciar a oferta.','Combine recusa do envio, revisão de toda a exposição e verificação ou denúncia simulada.',['phone','location','routine','password']),
      option('password','Recusar a senha, mas manter perfil e postagem como estão','A conta recebe cuidado, mas telefone, pistas da imagem e rotina continuam expostos. Revise também esses espaços.','Só recusar a senha não resolve a exposição dos outros dados.',['phone','location','routine']),
      option('hide','Apagar a postagem e enviar a senha para garantir a vaga','Apagar a postagem não torna seguro entregar a senha; o perfil e a imagem também precisam de revisão.','Não troque a credencial por uma recompensa.',['phone','location','password'])])
  ],{dataExplanation:'Telefone, escola e praça na imagem, rotina escrita e senha solicitada exigem cuidados diferentes.',riskExplanation:'Contato indesejado, localização por combinação de pistas e acesso à conta aparecem juntos. A recompensa incentiva o envio da credencial.',protectionExplanation:'Recuse o envio, revise perfil, imagem e postagem e escolha verificar ou denunciar por um canal confiável. Uma solução parcial deixa exposições sem cuidado. Você integrou os aprendizados das seis missões anteriores.'})
];
