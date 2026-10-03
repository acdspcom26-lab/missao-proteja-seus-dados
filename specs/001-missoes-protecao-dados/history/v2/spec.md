# Feature Specification: Missão: Proteja seus Dados

**Feature Branch**: `main` (branch existente; nenhuma branch criada)

**Feature Directory**: `specs/001-missoes-protecao-dados`

**Created**: 2026-10-02

**Status**: Revisão 2 aprovada para implementação

**Input**: Requisitos fornecidos na conversa para uma aplicação web educacional destinada
ao 8º ano do Ensino Fundamental, alinhada à EF08CO08, com 4 missões contextualizadas,
feedback explicativo e a sequência IDENTIFICAR → AVALIAR → DECIDIR → APRENDER.
Referência normativa: [Constituição v2.0.0](../../.specify/memory/constitution.md).

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Aprender com uma situação simulada (Priority: P1)

Como estudante do 8º ano, quero observar uma situação de rede social ou jogo online,
identificar dados pessoais, avaliar riscos e decidir como agir, para entender como
proteger esses dados sem precisar informar nada sobre mim.

**Why this priority**: Este é o núcleo da habilidade EF08CO08 e entrega valor pedagógico
mesmo quando demonstrado com uma única missão. A entrega completa exige as quatro missões.

**Independent Test**: Apresentar a Missão 1 isoladamente e percorrer as quatro etapas,
uma vez com respostas adequadas e outra com respostas inadequadas.

**Acceptance Scenarios**:

1. **Given** que o estudante acessou a aplicação, **When** inicia a atividade,
   **Then** encontra o objetivo, a informação de que os exemplos são fictícios e a
   primeira missão, sem cadastro nem solicitação de dados pessoais.
2. **Given** uma situação apresentada, **When** percorre a missão,
   **Then** identifica os dados, avalia os riscos, decide como agir e recebe explicação,
   nessa ordem, mantendo acesso ao contexto durante as escolhas.
3. **Given** respostas adequadas, **When** chega a APRENDER,
   **Then** recebe uma explicação do dado, do risco e da adequação da decisão.
4. **Given** uma identificação, avaliação ou decisão inadequada, **When** chega a APRENDER,
   **Then** recebe explicação específica do erro e da alternativa adequada, com acesso
   à próxima missão sem precisar acertar novamente.
5. **Given** uma etapa sem resposta, **When** tenta confirmá-la,
   **Then** recebe orientação textual para escolher uma resposta; isso não é registrado
   como erro pedagógico nem impede corrigir a omissão.

---

### User Story 2 - Percorrer quatro missões de dificuldade crescente (Priority: P1)

Como estudante, quero acompanhar meu avanço por situações cada vez mais complexas
para aplicar o que aprendi em um desafio final que reúne diferentes dados e riscos.

**Why this priority**: A progressão e o desafio integrador são requisitos obrigatórios,
e não podem ser substituídos por perguntas isoladas sem contexto.

**Independent Test**: Percorrer o conjunto de missões com respostas previamente definidas,
incluindo um percurso com todas as respostas inadequadas, e verificar avanço e conclusão.

**Acceptance Scenarios**:

1. **Given** o início do percurso, **When** consulta o progresso,
   **Then** vê a missão atual e o total de 4 missões, em ordem de 1 a 4.
2. **Given** APRENDER em qualquer missão de 1 a 3, **When** escolhe continuar,
   **Then** inicia a missão seguinte, independentemente da correção das respostas.
3. **Given** a Missão 3 concluída, **When** inicia a Missão 4,
   **Then** analisa um contexto que combina dados e riscos trabalhados anteriormente,
   seguindo as mesmas quatro etapas.
4. **Given** APRENDER na Missão 4, **When** conclui o percurso,
   **Then** acessa o resultado final, sem uma quinta missão ou exigência de pontuação mínima.
5. **Given** uma resposta já confirmada, **When** aciona a confirmação repetidamente,
   **Then** não pula etapas ou missões nem duplica a contabilização da resposta.

---

### User Story 3 - Compreender o resultado da aprendizagem (Priority: P2)

Como estudante, quero uma devolutiva separada sobre identificação, avaliação e decisão,
para reconhecer o que compreendi e o que preciso revisar.

**Why this priority**: A devolutiva torna o resultado útil para aprender, em vez de
reduzir a experiência a um total de pontos.

**Independent Test**: Usar três conjuntos de respostas fictícias — adequadas,
inadequadas e mistas — e conferir a devolutiva de cada dimensão separadamente.

**Acceptance Scenarios**:

1. **Given** as quatro missões concluídas, **When** abre o resultado,
   **Then** vê identificação de dados pessoais, avaliação de riscos e decisões de
   proteção, cada uma com quantidade de respostas adequadas e explicação pedagógica.
2. **Given** um percurso com todas as respostas inadequadas, **When** vê o resultado,
   **Then** encontra orientações de revisão nas três dimensões, sem rótulo de reprovação
   nem bloqueio para realizar uma nova tentativa.
3. **Given** um resultado com acertos diferentes entre dimensões, **When** o consulta,
   **Then** as contagens e orientações refletem cada dimensão, sem que uma compense outra.
4. **Given** um percurso em andamento ou concluído, **When** confirma que deseja reiniciar,
   **Then** retorna à Missão 1 com respostas e resultado anteriores descartados.
   Cancelar o reinício preserva o percurso atual.

---

### User Story 4 - Participar com acesso e leitura adequados (Priority: P1)

Como estudante usando computador, tablet ou celular, quero entender os textos e
acionar os controles de maneira acessível para realizar a mesma atividade em cada dispositivo.

**Why this priority**: Acesso ao conteúdo e às ações é condição para participar de
qualquer missão, e não um recurso opcional posterior.

**Independent Test**: Executar uma missão com teclado e com toque, nos tamanhos de
tela previstos, e ler seu feedback com som desligado e sem depender de cores ou animação.

**Acceptance Scenarios**:

1. **Given** uma tela de computador, tablet ou celular, **When** realiza uma missão,
   **Then** consegue ler contexto, opções e feedback e acessar todos os controles,
   sem corte de conteúdo ou rolagem horizontal da página.
2. **Given** navegação somente por teclado, **When** percorre os controles,
   **Then** identifica o foco, seleciona respostas, confirma ações e avança sem ficar preso.
3. **Given** feedback ou progresso apresentado, **When** não percebe cor, som ou animação,
   **Then** obtém o mesmo significado por texto e rótulos acessíveis.
4. **Given** texto ampliado a 200%, **When** lê e utiliza a atividade,
   **Then** o conteúdo e as ações continuam disponíveis sem sobreposição que impeça o uso.

### Edge Cases

- **Todas as respostas inadequadas**: as quatro missões continuam disponíveis em sequência,
  e o resultado fornece orientações nas três dimensões.
- **Seleção parcial ou com itens extras**: a seleção é aceita como resposta e recebe
  explicação dos itens ausentes e indevidos; não exige acerto para avançar.
- **Ausência de seleção**: orientar a escolha sem registrar uma tentativa; cenários com
  resposta “nenhum destes” devem oferecer essa opção explicitamente.
- **Revisão antes de confirmar**: permitir alterar a seleção; depois da confirmação,
  preservar a resposta usada na devolutiva daquela tentativa.
- **Acionamento repetido**: uma confirmação não pode gerar respostas duplicadas nem saltos.
- **Fechamento ou recarga da página**: iniciar novo percurso; informar previamente que
  o progresso vale apenas enquanto a página permanece aberta.
- **Reinício acidental**: pedir confirmação e permitir cancelar antes de apagar a tentativa.
- **Interrupção no carregamento**: não apresentar conclusão ou respostas inventadas;
  permitir nova tentativa de acesso quando a conexão estiver disponível.
- **Tela pequena, texto ampliado ou som indisponível**: preservar conteúdo e ações,
  inclusive o significado pedagógico do feedback.
- **Dados combinados**: o feedback deve explicar o risco da combinação de pistas,
  e não apenas classificar cada item isoladamente.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-025**: HUD com XP, progresso acessível e Missão X de 4; tema escuro, contraste e simulações fictícias de rede social/jogo.
- **FR-026**: Som opcional, inicialmente desligado, botão visível ativar/desativar, Web Audio local e sem persistência. Indisponibilidade não bloqueia a atividade.
- **FR-027**: Feedback por dimensão com preferencialmente uma ou duas frases curtas, incluindo orientação específica para omissões/seleções indevidas. Microinterações leves respeitam prefers-reduced-motion.


- **FR-001**: A aplicação DEVE apresentar seu propósito, público do 8º ano e orientação
  inicial, permitindo começar sem cadastro, login ou identificação do estudante.
- **FR-002**: A aplicação DEVE oferecer exatamente 4 missões em ordem crescente de
  complexidade, com a Missão 4 como desafio final integrador.
- **FR-003**: Cada missão DEVE contribuir para a EF08CO08 — “Distinguir os tipos de dados
  pessoais que são solicitados em espaços digitais e os riscos associados” — por meio
  de objetivo, dados, riscos e decisões explicitados no conteúdo.
- **FR-004**: Cada missão DEVE apresentar uma situação fictícia de rede social ou jogo
  online, conforme a progressão abaixo, com elementos que o estudante possa analisar.
  Perguntas descontextualizadas não substituem a simulação.
- **FR-005**: Cada missão DEVE seguir IDENTIFICAR → AVALIAR → DECIDIR → APRENDER, mantendo
  a situação consultável até a apresentação do feedback.
- **FR-006**: IDENTIFICAR DEVE permitir selecionar dados pessoais presentes ou solicitados
  entre elementos predefinidos, incluindo elementos que não sejam dados pessoais.
- **FR-007**: AVALIAR DEVE permitir selecionar os riscos pertinentes entre alternativas
  predefinidas, distinguindo riscos relacionados à situação de interpretações inadequadas.
- **FR-008**: DECIDIR DEVE permitir escolher uma ação de proteção entre decisões
  contextualizadas. Nenhuma escolha deve publicar dados, enviar mensagens ou executar
  a ação simulada em serviços reais.
- **FR-009**: APRENDER DEVE explicar os dados envolvidos, os possíveis riscos, a decisão
  adequada e sua justificativa, relacionando a explicação às respostas das três etapas.
- **FR-010**: Para cada resposta inadequada ou incompleta, o feedback DEVE apontar o que
  faltou ou foi interpretado incorretamente e explicar a alternativa adequada. Uma
  resposta adequada também DEVE receber explicação, não apenas indicação de acerto.
- **FR-011**: Respostas incorretas NÃO DEVEM impedir o avanço, exigir repetição até acertar
  ou bloquear o desafio final. Avançar após APRENDER DEVE depender apenas da ação de continuar.
- **FR-012**: A aplicação DEVE indicar missão atual, total de missões e etapa atual
  por texto, mantendo a ordem do percurso sem saltos por acionamento repetido.
- **FR-013**: A aplicação DEVE aceitar apenas respostas predefinidas, permitir revisão
  antes da confirmação e orientar omissões sem contabilizá-las como erros.
- **FR-014**: A aplicação NÃO DEVE solicitar, coletar ou armazenar dados pessoais reais.
  Nomes, perfis, mensagens e situações DEVEM ser fictícios e identificados como simulação.
  Não deve haver campos livres, envio de arquivos ou conexão a contas reais.
- **FR-015**: Respostas e progresso DEVEM servir apenas à tentativa atual, sem associação
  a identidade ou compartilhamento. Fechar, recarregar ou reiniciar DEVE descartar
  a tentativa; a limitação deve ser informada na abertura.
- **FR-016**: O resultado final DEVE apresentar separadamente identificação de dados
  pessoais, avaliação de riscos e decisões de proteção, com evidências e orientações
  para cada dimensão, conforme os critérios de avaliação abaixo.
- **FR-017**: Exibir XP motivacional secundário: +50 por identificação adequada, +50 por avaliação adequada, +100 por decisão adequada e +25 por missão concluída, mesmo com erros. Revelar acertos/XP somente em APRENDER. Derivar o total de registros únicos; não usar ranking nem desbloqueio por pontos. O resultado mantém as três dimensões X de 4 em destaque.
- **FR-018**: A aplicação DEVE permitir reiniciar o percurso, pedindo confirmação antes
  de descartar respostas e preservando-as quando o estudante cancelar.
- **FR-019**: Textos DEVEM usar português brasileiro e linguagem apropriada ao 8º ano,
  explicar termos necessários e nomear claramente a tarefa e a próxima ação.
- **FR-020**: Contextos, opções, feedback e controles DEVEM permanecer legíveis e
  utilizáveis em computador, tablet e celular, incluindo texto ampliado a 200%.
- **FR-021**: Todas as ações essenciais DEVEM funcionar por teclado e por toque,
  com foco visível e nomes acessíveis; informações importantes NÃO DEVEM depender
  exclusivamente de cores, sons ou animações.
- **FR-022**: O conteúdo DEVE ser revisável antes da publicação: cada alternativa
  precisa ter interpretação pedagógica definida e feedback coerente com seus dados,
  riscos e decisão, sem afirmar que uma opção garante ausência absoluta de risco.
- **FR-023**: A experiência DEVE estar disponível por endereço público sem instalação.
  A restrição constitucional de entrega é site estático no GitHub Pages, sem servidor
  próprio, banco de dados ou credenciais expostas; escolhas de implementação cabem ao plano.
- **FR-024**: O resultado DEVE ser liberado somente após as quatro missões concluídas,
  e cada resposta confirmada DEVE ser contabilizada uma única vez na sua dimensão.

### Progressão e conteúdo das missões

**Revisão baseada no teste da V1**: antes, sete missões e 21 desafios; agora, quatro e 12. A redução foi autorizada em 2026-10-03 para diminuir duração/cansaço e melhorar dinamismo. Histórico em history/v1/spec.md; mapeamento completo em revision-v2.md. Missões 1, 2 e 3 têm foco predominante em identificar, avaliar e decidir; a 4 integra. Todas mantêm as quatro etapas. A missão final também relaciona apelido reutilizado entre perfil, postagem e convite, escola, localização e rotina; o contato desconhecido não se torna confiável por conhecer dados públicos.


Os temas abaixo são premissas de conteúdo para esta primeira especificação. Todas as
missões têm uma situação principal e as quatro etapas obrigatórias. Ajustes de redação
podem ocorrer na revisão pedagógica, preservando objetivos, progressão e critérios.

#### Missão 1 — Identificar: o perfil que conta demais

- **Contexto e objetivo**: perfil fictício de rede social; distinguir dados explícitos
  de identificação e contato de um interesse genérico, iniciando a EF08CO08.
- **IDENTIFICAR**: selecionar nome completo e telefone fictícios entre itens do perfil.
- **AVALIAR**: reconhecer que expor esses dados pode facilitar identificação e contatos
  indesejados; não tratar uma preferência genérica como equivalente ao telefone.
- **DECIDIR**: escolher uma versão do perfil que retire os dados desnecessários.
- **APRENDER**: explicar por que retirar os dados reduz exposição; se a resposta mantiver
  telefone ou nome completo, apontar os dados ainda expostos e a alternativa adequada.
- **Complexidade e aceite**: dados visíveis e risco direto; a seleção esperada inclui
  ambos os dados e exclui o interesse genérico.


#### Missão 2 — Avaliar: o prêmio pede informação demais

- **Contexto e objetivo**: oferta fictícia de recompensa em jogo que pede endereço,
  telefone e senha; avaliar a pertinência de solicitações de dados.
- **IDENTIFICAR**: distinguir os dados e a credencial solicitados de informações do jogo
  que não identificam o personagem.
- **AVALIAR**: associar senha à possibilidade de acesso indevido à conta e endereço e
  telefone à exposição pessoal; reconhecer o uso da recompensa para incentivar envio.
- **DECIDIR**: recusar o envio e escolher a ação simulada de verificar a oferta por
  um canal confiável, sem abrir serviços externos.
- **APRENDER**: explicar cada dado, risco e motivo da recusa; diante de envio parcial,
  apontar por que os dados restantes também não devem ser entregues nesse contexto.
- **Complexidade e aceite**: múltiplos tipos de informação, riscos e incentivo persuasivo;
  a resposta adequada recusa o envio solicitado pela oferta.


#### Missão 3 — Decidir: quem vai ver essa postagem?

- **Contexto e objetivo**: personagem pretende publicar sua rotina e marcar uma amizade;
  considerar audiência, dados de terceiros e alcance do compartilhamento.
- **IDENTIFICAR**: reconhecer os dados de rotina e a identificação da outra pessoa.
- **AVALIAR**: avaliar exposição a desconhecidos, repasse da publicação e exposição de
  terceiros; distinguir limitar audiência de eliminar todos os riscos.
- **DECIDIR**: escolher uma versão sem a rotina detalhada nem identificação de terceiros
  sem autorização, com audiência limitada.
- **APRENDER**: explicar minimização e respeito aos dados alheios; se a escolha só limitar
  audiência, explicar por que isso não resolve os dados desnecessários mantidos.
- **Complexidade e aceite**: combinar titularidade dos dados e alcance; a decisão deve
  tratar o conteúdo e a audiência, sem prometer proteção absoluta.


#### Missão 4 — Desafio final: proteja a personagem

- **Contexto e objetivo**: convite para evento de jogo divulgado em rede social,
  com perfil, postagem e conversa fictícios; integrar os aprendizados da EF08CO08.
- **IDENTIFICAR**: reconhecer dados explícitos de contato, pistas visuais de localização,
  rotina e solicitação de credencial nos diferentes elementos.
- **AVALIAR**: relacionar cada grupo de dados aos riscos pertinentes e reconhecer a
  combinação de pistas e o incentivo da recompensa.
- **DECIDIR**: escolher um conjunto de ações que recuse o envio, revise a exposição e
  use uma forma simulada de verificar ou denunciar o contato.
- **APRENDER**: explicar dados, riscos e decisões de forma integrada; diante de solução
  parcial, indicar quais exposições permanecem e como a alternativa adequada as trata.
- **Complexidade e aceite**: transferir o aprendizado para uma situação combinada,
  cobrindo as três dimensões; a missão deve poder ser concluída mesmo com erros.

### Critérios de avaliação e devolutiva

Cada missão produz uma resposta confirmada por dimensão, totalizando 4 observações
por dimensão e 12 no percurso. Em IDENTIFICAR e AVALIAR, uma resposta é adequada quando
seleciona todos os itens esperados e nenhum item indevido. Respostas parciais recebem
feedback sobre os itens corretos, ausentes e indevidos, mas não contam como totalmente
adequadas. Em DECIDIR, a escolha deve corresponder à alternativa de proteção definida
para aquele contexto; toda alternativa deve possuir justificativa pedagógica.

O resultado apresenta, em cada dimensão, a contagem “X de 4 respostas adequadas” e
uma orientação descritiva. Com 4 respostas adequadas, retoma um aprendizado demonstrado;
com 1 a 3, apresenta um exemplo adequado e indica as missões a revisar; com 0, orienta
a revisão usando um exemplo concreto. A devolutiva não classifica a pessoa como incapaz,
não implica reprovação e não afirma domínio permanente da habilidade.

### Key Entities *(include if feature involves data)*

- **Missão**: unidade de aprendizagem com número de 1 a 4, título, objetivo EF08CO08,
  complexidade, contexto fictício e quatro etapas ordenadas.
- **Situação simulada**: conjunto de perfil, mensagem, publicação ou oferta fictícia,
  com elementos pessoais e não pessoais, pistas e alternativas de ação.
- **Dado e risco contextual**: informação presente ou solicitada, seu tipo e os riscos
  associados, inclusive riscos resultantes da combinação de informações.
- **Alternativa e feedback**: escolha predefinida, sua adequação pedagógica e explicação
  de dados, riscos e proteção, vinculada à etapa e à missão.
- **Tentativa**: percurso sem identificação pessoal, contendo etapa atual, respostas
  confirmadas e missões concluídas, válido apenas enquanto a página permanece aberta.
- **Resultado por dimensão**: conjunto das quatro observações de uma dimensão,
  contagem de respostas adequadas e orientação derivada das respostas da tentativa.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: O estudante consegue concluir exatamente 4 missões, cada uma com as quatro
  etapas na ordem definida; a quarta combina dados explícitos, pistas indiretas e
  riscos trabalhados nas missões anteriores.
- **SC-002**: Em 100% das alternativas previstas, o feedback identifica os dados,
  relaciona os riscos e justifica a decisão adequada; revisão pedagógica confirma
  coerência com a EF08CO08 e com o contexto.
- **SC-003**: Um percurso com todas as respostas inadequadas alcança o resultado final
  sem repetir respostas para obter acerto e sem bloqueio por pontuação.
- **SC-004**: Nos percursos de respostas adequadas, inadequadas e mistas, as três
  dimensões apresentam contagens exatas de 0 a 4 e orientações coerentes com as
  respostas; nenhuma resposta é contada duas vezes.
- **SC-005**: O percurso completo pode ser realizado sem fornecer qualquer dado pessoal,
  criar conta ou enviar conteúdo; 100% dos nomes, perfis e mensagens são fictícios.
- **SC-006**: Todas as ações essenciais são concluídas por teclado e por toque.
  Em larguras de referência de 360, 768 e 1280 pixels e com texto ampliado a 200%,
  não há perda de conteúdo, controles inacessíveis ou rolagem horizontal da página.
- **SC-007**: 100% dos avisos, feedbacks e indicadores de progresso mantêm seu significado
  com som desligado, animações desativadas e sem distinção de cores.
- **SC-008**: Uma revisão pedagógica de todas as quatro missões confirma que cada instrução
  explicita a ação esperada, explica termos necessários e é compreensível para o 8º ano,
  sem pendências de linguagem que impeçam realizar a tarefa.
- **SC-009**: Em qualquer missão ou resultado, cancelar o reinício mantém o percurso;
  confirmar o reinício retorna à Missão 1 com zero respostas anteriores contabilizadas.

## Assumptions

- **Escopo adotado**: a invocação de especificação dá continuidade à descrição completa
  fornecida na conversa e à constituição v2.0.0; trata-se de uma única funcionalidade
  abrangente, a experiência educacional inicial.
- **Premissas de conteúdo**: títulos e situações das missões foram propostos nesta
  especificação, pois ainda não havia roteiro detalhado. Há uma situação principal
  por missão, com análise nas três dimensões; a Missão 4 integra múltiplos elementos.
- **Idioma e uso**: português brasileiro; uso individual, com possibilidade de mediação
  de docente, sem área docente ou gestão de turmas nesta versão.
- **Progresso**: percurso sequencial durante uma única sessão de página. Retomada após
  fechar ou recarregar, sincronização entre dispositivos e histórico ficam fora do escopo.
- **Avaliação**: contagens e devolutivas por dimensão são prioritárias; XP é secundário. Não há ranking, certificação, aprovação ou reprovação.
- **Privacidade**: não há cadastro, campos livres, uploads, publicidade, rastreamento
  de estudantes ou integração com redes sociais e jogos reais.
- **Dependências**: revisão pedagógica do conteúdo e disponibilidade do endereço público
  para acesso inicial. A publicação deve respeitar o princípio VIII da constituição.
- **Conectividade**: o acesso inicial requer conexão; funcionamento offline não é
  garantido nesta versão.
- **Fora do escopo**: criação de contas, mensagens reais, publicação real de conteúdo,
  painel administrativo, relatórios individuais para docentes e conteúdo gerado pelo usuário.
