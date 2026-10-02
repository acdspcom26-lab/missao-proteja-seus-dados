---
description: "Tarefas de implementação de Missão: Proteja seus Dados"
---

# Tasks: Missão: Proteja seus Dados

**Input**: Documentos de `specs/001-missoes-protecao-dados/`.
**Prerequisites**: [plan.md](plan.md), [spec.md](spec.md), [research.md](research.md),
[data-model.md](data-model.md), [contrato de interface](contracts/ui-contract.md),
[quickstart.md](quickstart.md) e [constituição](../../.specify/memory/constitution.md).

**Tests**: Incluídos porque a especificação define testes independentes/cenários de aceite,
a constituição exige verificabilidade e o plano detalha testes automatizados e manuais.
Escrever os testes indicados antes da implementação correspondente e verificar que
detectam a ausência do comportamento. Falha de ambiente não vale como falha funcional.
Não declarar execução ou aprovação sem evidência.

**Organization**: Histórias em ordem de prioridade: US1 (P1), US2 (P1), US4 (P1), US3 (P2).
Os rótulos mantêm a numeração original de spec.md. Nenhuma tarefa está concluída nesta geração.

## Format: `[ID] [P?] [Story] Description`

- Cada tarefa tem checkbox, ID sequencial, descrição e caminho de arquivo.
- `[P]` identifica trabalho em arquivos distintos que pode ser simultâneo quando
  as dependências e o gate da fase já estiverem concluídos. Não ignora dependências.
- `[US1]` a `[US4]` vinculam tarefas à história; setup, fundação e acabamento não têm rótulo.
- As referências `depende de` são pré-condições; intervalos incluem todos os IDs.
  A sequência numérica é um caminho seguro; ondas paralelas estão descritas ao final.

## Path Conventions

- Código publicável em `docs/`; módulos em `docs/js/`; conteúdo em
  `docs/js/content/missions.js`; recursos locais em `docs/assets/`.
- Testes em `tests/unit/`, `tests/content/`, `tests/e2e/` e fixtures em `tests/fixtures/`.
- Ferramentas na raiz; evidências em `specs/001-missoes-protecao-dados/validation.md`
  e `validation-performance.md`, fora da pasta pública.
- Todos os caminhos de tarefas são relativos à raiz. Nenhum arquivo de aplicação,
  fixture ou relatório foi criado por este comando; os caminhos são destinos futuros.
- As restrições entre aspas nas tarefas reproduzem o modelo de dados. Regras de conteúdo
  exigem revisão semântica além de validação estrutural.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Preparar o projeto estático e as ferramentas locais, sem dependências de execução.

- [ ] T001 Criar `package.json` com type=module e Node.js 24.x; definir dev, preview:prefix, test, test:e2e, test:a11y e test:budget conforme `specs/001-missoes-protecao-dados/quickstart.md`, limitando node --test aos arquivos unitários/de conteúdo e Playwright a tests/e2e.
- [ ] T002 Instalar versões exatas compatíveis de @playwright/test, @axe-core/playwright e http-server somente como devDependencies em `package.json`, gerar `package-lock.json` e instalar os navegadores Chromium, Firefox e WebKit; não adicionar dependência ao site (depende de T001).
- [ ] T003 [P] Configurar `playwright.config.js` com servidores loopback nas portas 4173 e 4174, raiz docs e prefixo /docs/, projetos Chromium/Firefox/WebKit e contextos de toque e larguras 360/768/1280; não compartilhar estado entre testes (depende de T002).
- [ ] T004 [P] Criar `docs/index.html` com lang=pt-BR, título, viewport, main, noscript e aviso inicial de carregamento/recarga; criar `docs/.nojekyll` e referências relativas a assets/styles.css e js/app.js, sem recursos externos (depende de T002).
- [ ] T005 [P] Criar `.gitignore` para node_modules, playwright-report e test-results, preservando lockfile e documentos; iniciar `README.md` com objetivo EF08CO08, público e comandos planejados, distinguindo validações ainda não executadas (depende de T002).

**Checkpoint**: Ferramentas e estrutura preparadas; nenhum backend ou armazenamento adicionado.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Definir catálogo, avaliação e estado compartilhados. Esta fase bloqueia todas as histórias.

**Gate**: concluir T001–T005 antes de iniciar; concluir T006–T015 antes de qualquer história.

- [ ] T006 Criar `tests/fixtures/catalog.js` e `tests/fixtures/answers.js` com catálogo fictício válido de sete missões e respostas adequadas, inadequadas e mistas (3/7, 4/7, 5/7); revisar resultados esperados independentemente do avaliador, sem dados pessoais ou geração de gabarito pelo código testado.
- [ ] T007 [P] Escrever testes de Evaluation em `tests/unit/evaluation.test.js`: adequate boolean, matchedOptionIds, missingOptionIds e extraOptionIds; exigir “adequate requer igualdade de conjuntos, independentemente da ordem.” e “Resposta vazia não produz Evaluation nem AnswerRecord.”, cobrindo conjuntos parciais, extras e IDs inválidos (depende de T006).
- [ ] T008 [P] Escrever testes de contrato do catálogo em `tests/content/missions.test.js` usando fixtures e mutações inválidas para cada regra de T010–T012; verificar referências quebradas, catálogo incompleto, alternativa sem explicação e recurso externo; registrar falhas antes de implementar (depende de T006).
- [ ] T009 [P] Escrever testes de estado em `tests/unit/state.test.js` para valores iniciais, respostas imutáveis, tokens antigos, confirmação repetida, seleção vazia e reset; token contém generation, revision, missionId e stage, com validação síncrona e sem efeitos externos (depende de T006).
- [ ] T010 Implementar validação de Mission em `docs/js/catalog-validation.js`: id string “Estável e único: mission-1 até mission-7.”; order inteiro “1 a 7, sem lacunas ou duplicações.”; title string “Título do roteiro em português.”; objective string “Objetivo verificável ligado à EF08CO08.”; skill string “Exatamente EF08CO08.”; complexity string “Explica o acréscimo de complexidade em relação à missão anterior.”; context Scenario “Contexto fictício consultável em todas as etapas.”; personalData PersonalDatum[] “Dados e pistas pessoais analisados no contexto.”; risks Risk[] “Riscos relacionados aos dados ou às combinações.”; questions Question[3] “Ordem identify, assess, decide.”; synthesis objeto “dataExplanation, riskExplanation, protectionExplanation, todos não vazios.”; integratedMissionIds string[] “Missão 7 referencia missões 1 a 6; nas demais, vazio.” (depende de T008).
- [ ] T011 Estender `docs/js/catalog-validation.js` para Scenario: kind enum “social-profile, game-chat, social-post, game-offer ou combined.”; introduction string “Contextualização curta e indicação de simulação.”; elements ScenarioElement[] “Elementos ordenados; IDs únicos no contexto.”; ScenarioElement com id, kind (profile, message, post, offer ou illustration), text e opcionais assetPath/description, exigindo “Ilustrações informativas exigem descrição das mesmas pistas visuais.” e “assetPath é relativo e local; nenhuma URL de terceiro, HTML arbitrário, link discável ou controle com efeito fora da aplicação.”; PersonalDatum com id, label, category (identification, contact, location, routine, credential ou linking-clue) e “elementIds não vazios, todos existentes no contexto.”; Risk com id, explanation e “datumIds não vazios que referenciam PersonalDatum.”, exigindo “Um risco combinado referencia dois ou mais dados e explica a associação.” (depende de T010).
- [ ] T012 Completar `docs/js/catalog-validation.js` para Question: id string “Único no catálogo.”; dimension enum “identify, assess ou decide.”; prompt string “Instrução específica da etapa.”; selectionMode enum “multiple para identify/assess; single para decide.”; options Option[] “Pelo menos duas; IDs únicos na pergunta.”; expectedOptionIds string[] “Não vazio; IDs existentes; exatamente um em decide.”; Option com id, label, elementIds, datumIds, riskIds e explanation, aplicando “Referências podem ser vazias para distratores, mas, quando presentes, devem existir.”; explanation.whenSelected/whenOmitted explica seleção e omissão; exigir “No mínimo uma alternativa não esperada por pergunta”, exclusividade de eventual opção “nenhum destes” e síntese que sempre explica a decisão adequada (depende de T011).
- [ ] T013 [P] Implementar comparação pura e Evaluation em `docs/js/evaluation.js`, satisfazendo T007; rejeitar IDs inválidos, não confundir omissão com erro pedagógico, preservar conjuntos confirmados e não gerar nota agregada; executar `tests/unit/evaluation.test.js` (depende de T007).
- [ ] T014 [P] Implementar AttemptState e núcleo puro em `docs/js/state.js`: screen enum “welcome, mission, result ou error.”; missionIndex inteiro ou null “0 a 6 em mission; null na abertura.”; stage enum ou null “identify, assess, decide ou understand.”; draftOptionIds string[] “Seleção editável somente da pergunta atual; inicia vazia.”; answers AnswerRecord[] “No máximo 21; chave única missionId + dimension.”; completedMissionIds string[] “Prefixo ordenado de mission-1 a mission-7.”; generation inteiro “Incrementado em todo reset para invalidar eventos antigos.”; revision inteiro “Incrementado em transição aceita e na abertura/saída de confirmação de reinício.”; restartPromptOpen boolean “Suspende ações do percurso enquanto a confirmação está aberta.”; validationMessage string ou null “Orientação de omissão; não é resposta nem erro pedagógico.”; AnswerRecord contém missionId, questionId, dimension, selectedOptionIds, “sem mutação após aceite e sem timestamp. Chave única por missão/dimensão.”; implementar a tabela de transições de data-model.md, inclusive resultado apenas com 21 respostas e sete conclusões, sem consultar acertos nem serializar estado (depende de T009).
- [ ] T015 Executar testes de fundação e registrar resultados em `specs/001-missoes-protecao-dados/validation.md`; conferir `docs/js/catalog-validation.js`, `docs/js/state.js` e `docs/js/evaluation.js` sem DOM, rede, logs de resposta, window global ou armazenamento; corrigir falhas antes de liberar histórias (depende de T010–T014).

**Checkpoint**: Domínio compartilhado validado com fixtures; sem flexibilizar o catálogo de sete missões para produção.

---

## Phase 3: User Story 1 - Aprender com uma situação simulada (Priority: P1) — MVP

**Goal**: Disponibilizar situação contextualizada, quatro etapas e explicação após acertos/erros, com catálogo completo para não contornar o gate de sete missões.

**Independent Test**: Executar a Missão 1 com respostas adequadas, parciais, indevidas e vazias: o contexto permanece acessível, as quatro etapas mantêm ordem, não há cadastro, ENTENDA explica dados/riscos/proteção e continuar abre a próxima missão sem exigir acerto.

### Tests for User Story 1

- [ ] T016 [P] [US1] Escrever testes do contrato da Missão 1 em `tests/e2e/journey.spec.js` para abertura sem identificação, contexto persistente, seleção/revisão, omissão sem contagem, quatro etapas e feedback de acerto/erro; verificar falha antes da integração.
- [ ] T017 [P] [US1] Estender `tests/content/missions.test.js` para validar o catálogo real e os aceites pedagógicos dos sete roteiros em spec.md, inclusive distratores, cada opção explicada, riscos combinados e missão final integradora; não limitar testes à existência de campos.

### Implementation for User Story 1

- [ ] T018 [US1] Redigir Missões 1 e 2 em `docs/js/content/missions.js`: perfil com nome/telefone fictícios versus interesse genérico; chat pedindo escola e horário; incluir dados, riscos, três perguntas, gabaritos e síntese com feedback selecionado/omitido, seguindo T010–T012.
- [ ] T019 [US1] Adicionar Missões 3 e 4 em `docs/js/content/missions.js`: pistas de escola/localização na imagem e legenda; oferta pedindo endereço, telefone e senha; explicar pistas remanescentes e riscos do envio parcial, sem dados de contato operacionais (depende de T018).
- [ ] T020 [US1] Adicionar Missões 5 e 6 em `docs/js/content/missions.js`: rotina, identificação de terceiros e audiência; associação de apelido reutilizado, escola e horários entre contextos; justificar minimização e combinação sem prometer risco zero (depende de T019).
- [ ] T021 [US1] Adicionar Missão 7 em `docs/js/content/missions.js`: convite de jogo em rede social com perfil, postagem e conversa, combinando contato, localização, rotina e credencial; referenciar missões 1–6, explicar solução parcial e validar todas as 21 perguntas (depende de T020).
- [ ] T022 [P] [US1] Criar ilustrações leves e fictícias em `docs/assets/illustrations/mission-3.svg` e `docs/assets/illustrations/mission-7.svg`, com as pistas e descrições equivalentes já definidas em `docs/js/content/missions.js`; sem mídia externa ou textos contendo dados reais (depende de T021).
- [ ] T023 [P] [US1] Adicionar composição de feedback a `docs/js/evaluation.js` e casos correspondentes em `tests/unit/evaluation.test.js`: synthesis mais whenSelected e whenOmitted pertinentes, explicando cada dimensão inclusive em acerto; não exibir gabarito antes de ENTENDA (depende de T021).
- [ ] T024 [P] [US1] Implementar renderização de perfil/chat/postagem/oferta e das quatro etapas em `docs/js/view.js`, usando texto seguro, fieldset/legend, checkboxes/radios rotulados, botões e região de orientação; mostrar contexto até ENTENDA e ação de continuar sem filtro por acerto (depende de T022–T023).
- [ ] T025 [P] [US1] Criar base visual em `docs/assets/styles.css` para situações simuladas legíveis, hierarquia e foco visível, sem aparência de lista descontextualizada; fontes do sistema e layout fluido, deixando ajustes completos à US4 (depende de T022–T023).
- [ ] T026 [US1] Implementar `docs/js/app.js`: carregar catálogo e recursos locais antes de habilitar início, validar integridade, conectar view/state/evaluation, apresentar propósito, ficção e aviso de progresso; erro de carregamento oferece recarga e não libera catálogo parcial; inicializar apenas estado em memória (depende de T024–T025).
- [ ] T027 [US1] Integrar tokens de origem em `docs/js/app.js` e `docs/js/view.js`: desativar/aposentar botão confirmado, consumir token antes de espera, manter um único caminho de ativação, começar próxima pergunta sem seleção e focar título; cliques/Enter repetidos não podem registrar duas respostas (depende de T026).
- [ ] T028 [US1] Revisar os sete roteiros em `docs/js/content/missions.js` contra a EF08CO08, o público, todos os gabaritos e distratores, descrições visuais e riscos residuais; corrigir incoerências e registrar achados reais em `specs/001-missoes-protecao-dados/validation.md` (depende de T021–T023).
- [ ] T029 [US1] Executar testes de conteúdo, avaliação e jornada da Missão 1; corrigir falhas e registrar evidências do MVP em `specs/001-missoes-protecao-dados/validation.md`, sem declarar o produto completo antes das demais histórias (depende de T016–T028).

**Checkpoint**: Missão 1 demonstrável e testada isoladamente; catálogo completo disponível. A demonstração incremental não é aprovação da entrega final.

---

## Phase 4: User Story 2 - Percorrer sete missões de dificuldade crescente (Priority: P1)

**Goal**: Integrar e verificar o percurso 1–7, seu progresso e o desafio final.

**Independent Test**: Percorrer todas as missões com acertos e novamente com todos os erros; observar 21 confirmações, sete conclusões, integração na Missão 7, acesso ao estado de resultado sem oitava missão e nenhuma duplicação.

### Tests for User Story 2

- [ ] T030 [P] [US2] Ampliar `tests/e2e/journey.spec.js` com percursos completos adequados/inadequados, progresso textual, Missão 7 integradora, ausência de oitava missão e repetição de cliques/toques/Enter; testar entrada no estado de resultado sem depender ainda da devolutiva detalhada da US3.
- [ ] T031 [P] [US2] Ampliar `tests/unit/state.test.js` com 21 confirmações, sete conclusões em prefixo, tentativa de acesso antecipado ao resultado, tokens obsoletos de missões anteriores e passagem com todos os erros; verificar que resultado não depende de adequação.

### Implementation for User Story 2

- [ ] T032 [US2] Integrar navegação sequencial e término em `docs/js/app.js` com a máquina de `docs/js/state.js`, tratando continuar nas missões 1–6 e ver resultado na 7; invalidar ações de origem antiga e não alterar URL/histórico (depende de T030–T031).
- [ ] T033 [US2] Completar progresso textual e entrada de conclusão em `docs/js/view.js`: missão X de 7, etapa X de 4, nova situação ao avançar e título de resultado ao terminar; preparar área sem pontuação provisória para a devolutiva da US3 (depende de T032).
- [ ] T034 [US2] Conferir progressão e integração no catálogo `docs/js/content/missions.js` e estender `tests/content/missions.test.js` para verificar que Missão 7 trabalha pistas explícitas, indiretas e combinação de informações, sem perder a ordem das quatro etapas (depende de T033).
- [ ] T035 [US2] Executar testes unitários, catálogo e jornadas das sete missões nos três motores e registrar resultados em `specs/001-missoes-protecao-dados/validation.md`; acesso ao estado final não substitui validação da devolutiva detalhada na US3 (depende de T030–T034).

**Checkpoint**: Sete missões navegáveis e estado final alcançável mesmo com todos os erros; apresentação detalhada do resultado pertence à US3.

---

## Phase 5: User Story 4 - Participar com acesso e leitura adequados (Priority: P1)

**Goal**: Concluir a acessibilidade e a apresentação responsiva das telas existentes, mantendo critérios reutilizáveis para resultado e reinício.

**Independent Test**: Realizar uma missão por teclado e por toque em 360/768/1280 px, com texto a 200%, som desligado e movimento reduzido; verificar foco, leitura e significado independente de cores.

### Tests for User Story 4

- [ ] T036 [P] [US4] Criar `tests/e2e/accessibility.spec.js` com axe, teclado/toque, foco e nomes acessíveis na abertura e quatro etapas; conferir contexto e avisos sem depender de cor/som/animação e verificar falha antes dos ajustes de interface.

### Implementation for User Story 4

- [ ] T037 [P] [US4] Criar `tests/e2e/responsive.spec.js` para legibilidade e controles em 360/768/1280 px, retrato/paisagem, toque, movimento reduzido e texto ampliado a 200%, sem usar apenas deviceScaleFactor como prova; verificar ausência de sobreposição e rolagem horizontal e falha antes dos ajustes.
- [ ] T038 [US4] Ajustar `docs/js/view.js` e `docs/index.html` para títulos/landmarks, textos alternativos equivalentes, mensagens associadas/anunciadas e foco útil, evitando anúncios duplicados; aplicar em `docs/assets/styles.css` fonte ≥16 px, contraste ≥4,5:1, alvos ≥44×44 px, reflow, texto 200% e movimento reduzido conforme T036–T037 (depende de T036–T037).
- [ ] T039 [US4] Revisar linguagem de instruções, botões e feedback em `docs/js/content/missions.js` e `docs/js/view.js` para o 8º ano, explicando termos e próxima ação; registrar exemplos corrigidos em `specs/001-missoes-protecao-dados/validation.md` (depende de T038).
- [ ] T040 [US4] Executar verificações manuais com teclado, leitor de tela disponível, ampliação real de texto e celular/tablet disponíveis; registrar dispositivo, cenário e resultado em `specs/001-missoes-protecao-dados/validation.md`; indisponibilidade de dispositivo é pendência, não aprovação (depende de T039).
- [ ] T041 [US4] Executar `tests/e2e/accessibility.spec.js` e conferir regressões da jornada, registrando resultados em `specs/001-missoes-protecao-dados/validation.md`; reaplicar a mesma matriz ao resultado e reinício quando entregues na US3 (depende de T040).

**Checkpoint**: Telas existentes acessíveis na matriz definida; critérios serão reaplicados ao resultado e ao dialog em T047–T048.

---

## Phase 6: User Story 3 - Compreender o resultado da aprendizagem (Priority: P2)

**Goal**: Apresentar devolutiva nas três dimensões e reinício confirmado sem perder dados ao cancelar.

**Independent Test**: Fixtures adequadas, inadequadas e mistas devem produzir 7/7, 0/7 e 3/7–4/7–5/7 nas dimensões corretas; orientações refletem respostas; cancelar reinício preserva etapa/rascunho e confirmar volta à Missão 1.

### Tests for User Story 3

- [ ] T042 [P] [US3] Escrever casos de DimensionResult em `tests/unit/evaluation.test.js`: dimension, “adequateCount (0–7), total (7), adequateMissionIds, reviewMissionIds e guidance.”; exigir “Só existe quando as sete missões estão concluídas.”, orientações para 0/1–6/7, ausência de total agregado e contagens independentes.
- [ ] T043 [P] [US3] Ampliar `tests/e2e/journey.spec.js` para devolutivas 7/7, 0/7 e mistas 3/7–4/7–5/7 usando fixtures independentes, ausência de reprovação/ranking e reinício durante missão ou resultado, cobrindo confirmação e cancelamento.

### Implementation for User Story 3

- [ ] T044 [US3] Implementar DimensionResult e orientações em `docs/js/evaluation.js` derivadas de respostas confirmadas: exemplo de aprendizado em 7, exemplo adequado e missões a revisar em 1–6, exemplo concreto para revisão em 0; nenhuma dimensão compensa outra (depende de T042).
- [ ] T045 [US3] Implementar resultado em `docs/js/view.js` com três seções, “X de 7 respostas adequadas”, exemplos e orientações, sem pontuação agregada nem rótulo de capacidade/reprovação; conectar resultado derivado em `docs/js/app.js` (depende de T043–T044).
- [ ] T046 [US3] Implementar dialog nativo de reinício em `docs/js/view.js` e handlers em `docs/js/app.js`: Cancelar recebe foco inicial; Escape cancela e restaura foco; confirmação descarta respostas/rascunho, invalida tokens e inicia Missão 1; suspensão durante dialog respeita `docs/js/state.js` (depende de T045).
- [ ] T047 [US3] Completar cenários de reinício em `tests/unit/state.test.js` e de acessibilidade do resultado/dialog em `tests/e2e/accessibility.spec.js`, verificando preservação ao cancelar, foco, ausência de armadilhas, callbacks antigos e casos 0/intermediário/7 (depende de T046).
- [ ] T048 [US3] Ajustar apresentação das três dimensões e dialog em `docs/assets/styles.css`; repetir teclado, leitor de tela, toque, texto 200% e viewports para as novas telas, registrando evidências em `specs/001-missoes-protecao-dados/validation.md` (depende de T047).
- [ ] T049 [US3] Executar testes de resultado, reinício e regressão das quatro histórias; conferir SC-004 e SC-009 e registrar resultados em `specs/001-missoes-protecao-dados/validation.md` (depende de T042–T048).

**Checkpoint**: Resultado e reinício verificados; quatro histórias integradas, prontas para validação transversal.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Consolidar privacidade, ciclo de vida, desempenho, revisão final e preparação/publicação condicionada à aprovação.

- [ ] T050 [P] Criar `tests/e2e/privacy.spec.js` com perfil limpo e monitoramento do percurso completo: nenhuma entrada livre/upload, requisição com resposta, POST, destino externo, cookie da aplicação, local/sessionStorage, IndexedDB, service worker, resposta na URL ou console; distinguir recursos estáticos dos logs do provedor.
- [ ] T051 [P] Criar `tests/e2e/lifecycle.spec.js` para recarga na Missão 4, saída/retorno, troca de abas, novo documento e reset durante eventos pendentes; testar handler BFCache sem tratar evento sintético como prova de restauração real.
- [ ] T052 Implementar ciclo de vida em `docs/js/app.js` e limpeza visual em `docs/js/view.js`: pagehide apaga tentativa/DOM, pageshow.persisted volta à abertura, troca de aba preserva; reset invalida callbacks; não depender de unload nem prometer apagamento físico imediato; corrigir violações apontadas por `tests/e2e/privacy.spec.js` (depende de T050–T051).
- [ ] T053 [P] Criar `tests/e2e/deployment.spec.js` para raiz e /docs/, imports/mídia sem 404, recarga, falha de módulo/recurso, catálogo inválido, noscript e nenhuma conclusão inventada; publicação deve depender apenas de arquivos de `docs/`.
- [ ] T054 [P] Criar `tests/content/budget.test.js` medindo todos os arquivos de `docs/` e exigindo até 1 MiB sem compressão, sem excluir ilustrações; conferir que só recursos publicáveis locais compõem a pasta.
- [ ] T055 [P] Criar `tests/e2e/performance.spec.js` medindo 30 transições aceitas após carregamento no Chromium local sem throttling, do acionamento à atualização/pintura, p95 ≤100 ms; registrar ambiente, valores e método em `specs/001-missoes-protecao-dados/validation-performance.md` sem medir apenas tempo da função.
- [ ] T056 Executar npm ci, npm test, npm run test:e2e, npm run test:a11y e npm run test:budget conforme `specs/001-missoes-protecao-dados/quickstart.md`; corrigir falhas relacionadas, registrar resultados reais e cobertura de FR-001–FR-024/SC-001–SC-009 em `specs/001-missoes-protecao-dados/validation.md` (depende de T050–T055).
- [ ] T057 Concluir revisão manual das sete missões e feedbacks, dispositivos/teclado/leitor de tela, BFCache real e separação entre privacidade da aplicação/hospedagem; registrar evidências e pendências em `specs/001-missoes-protecao-dados/validation.md`, sem marcar revisão externa/dispositivo não disponível como realizada (depende de T056).
- [ ] T058 Atualizar `README.md` e `specs/001-missoes-protecao-dados/quickstart.md` para os comandos realmente implementados, limitações e publicação futura via branch de entrega e /docs; conferir `docs/.nojekyll` e ausência de segredos; documentar resumo revisável da entrega, sem commit/push/publicação automática (depende de T057).
- [ ] T059 Após aprovação explícita da publicação e disponibilidade do repositório remoto, publicar `docs/` no GitHub Pages e repetir abertura, missão, percurso completo, recarga, recursos sob o prefixo real e privacidade; registrar endereço, resultados e falhas em `specs/001-missoes-protecao-dados/validation.md`; manter esta tarefa pendente se faltar aprovação ou acesso (depende de T058).

**Checkpoint**: T001–T058 sustentam a entrega local validada; T059 só termina após publicação aprovada e verificada. Pendências manuais ou externas continuam explícitas.

---

## Dependencies & Execution Order

### Phase Dependencies

| Fase | Gate de entrada | Saída necessária |
| --- | --- | --- |
| 1 — Setup | Nenhum | T001–T005 concluídas. |
| 2 — Fundação | Fase 1 | T006–T015 concluídas com testes das fixtures aprovados. |
| 3 — US1 / P1 | Fase 2 | T016–T029; primeira situação demonstrável. |
| 4 — US2 / P1 | US1 | T030–T035; progressão integral. |
| 5 — US4 / P1 | US2 | T036–T041; acesso validado nas telas existentes. |
| 6 — US3 / P2 | US4 | T042–T049; resultado e reinício com os mesmos critérios de acesso. |
| 7 — Transversal | Quatro histórias | T050–T058; T059 tem gate adicional de publicação. |

O caminho padrão prioriza P1 antes de P2 e evita alterações simultâneas nos mesmos
`app.js`, `view.js`, `state.test.js` e `journey.spec.js`.
“Teste independente” significa cenário/fixture que isola o aceite da história;
não significa duplicar infraestrutura ou eliminar dependências reais do produto.

### User Story Dependencies

```text
Setup → Fundação → US1 (P1) → US2 (P1) → US4 (P1) → US3 (P2)
                                                     ↓
                                   Validação transversal T050–T058
                                                     ↓
                              Aprovação + acesso remoto → T059
```

US1 fornece o catálogo completo e uma jornada de situação; US2 verifica continuidade
e desafio integrador; US4 consolida o acesso; US3 acrescenta a devolutiva detalhada.
O teste isolado da US3 pode usar fixtures sem reproduzir manualmente todo o percurso.
A US4 não fica incompleta por não haver resultado/dialog na sua fase: T047–T048 têm
responsabilidade explícita de estender sua validação às telas adicionadas pela US3.

### Within Each User Story

1. Escrever cenários e observar falha pelo comportamento ausente.
2. Implementar dados e regras antes de renderização/controlador que os consomem.
3. Integrar e executar os testes relevantes; não mascarar falhas com skips.
4. Registrar evidências e corrigir regressões antes do checkpoint.
5. Não alterar princípios, público, habilidade, sete missões ou quatro etapas para
   acomodar dificuldade de implementação.

### Parallel Opportunities

- Setup: depois de T002, T003, T004 e T005 não escrevem os mesmos arquivos.
- Fundação: depois de T006, T007/T008/T009 podem ser escritos juntos.
  Com esses testes definidos, T010–T012 formam uma cadeia; T013 e T014 podem avançar
  em paralelo com essa cadeia, respeitando seus testes predecessores.
- US1: T016/T017; depois de T021, T022/T023; depois de ambos, T024/T025.
  T018–T021 editam o mesmo catálogo e devem ser sequenciais.
- US2: T030/T031. Integração T032–T035 é sequencial.
- US4: T036/T037. Alterações em view e revisão de linguagem seguem a ordem prevista.
- US3: T042/T043. T044 pode começar quando T042 terminar, enquanto T043 é escrito;
  T045 espera ambos.
- Transversal: T050/T051/T053/T054/T055 usam arquivos distintos; T052 espera
  T050/T051 e pode ocorrer enquanto os demais testes são escritos. T056 espera todos.
- Relatórios compartilhados em validation.md são atualizados sequencialmente;
  T055 usa validation-performance.md para não conflitar.
- Nenhum marcador autoriza executar duas alterações no mesmo arquivo simultaneamente.

## Parallel Example: User Story 1

```text
Depois da fundação:
  T016 → tests/e2e/journey.spec.js
  T017 → tests/content/missions.test.js

Depois de T021:
  T022 → docs/assets/illustrations/mission-3.svg e mission-7.svg
  T023 → docs/js/evaluation.js e tests/unit/evaluation.test.js
```

## Parallel Example: User Story 2

```text
Depois de T029:
  T030 → tests/e2e/journey.spec.js
  T031 → tests/unit/state.test.js
Juntar resultados antes de T032.
```

## Parallel Example: User Story 4

```text
Depois de T035:
  T036 → tests/e2e/accessibility.spec.js
  T037 → tests/e2e/responsive.spec.js
Juntar resultados antes de T038.
```

## Parallel Example: User Story 3

```text
Depois de T041:
  T042 → tests/unit/evaluation.test.js
  T043 → tests/e2e/journey.spec.js
T044 pode começar depois de T042; T045 aguarda T043 e T044.
```

## Implementation Strategy

### MVP First (User Story 1 Only)

Concluir setup, fundação e US1 (T001–T029) e demonstrar localmente a Missão 1
com contexto, quatro etapas, feedback e avanço após erro. O catálogo já contém as
sete missões para cumprir sua validação estrutural; a progressão completa e a devolutiva
ainda precisam dos checkpoints seguintes. Não publicar uma demonstração parcial como
produto final nem remover a exigência de sete missões.

### Incremental Delivery

Adicionar US2, US4 e US3 na ordem das fases, com checkpoints reproduzíveis.
Concluir validações transversais, revisão pedagógica e documentação antes de solicitar
aprovação da publicação. A autorização de gerar tarefas não autoriza executar T059.
Não omitir tarefas obrigatórias por falta de dispositivo, revisão ou acesso remoto;
registrar o bloqueio concreto e manter o checkbox correspondente aberto.

### Parallel Team Strategy

Dividir somente as ondas listadas, com responsáveis por arquivos distintos.
A maior parte da interface compartilha arquivos, portanto a integração das histórias
é sequencial no caminho padrão. Não criar módulos duplicados ou novas camadas apenas
para aumentar paralelismo. Não realizar commits ou criar branches sem solicitação.

## Coverage & Acceptance

| Requisitos | Tarefas principais | Critérios de sucesso |
| --- | --- | --- |
| FR-001, FR-003, FR-004 | T018–T022, T024, T026, T028 | SC-001, SC-005, SC-008 |
| FR-002, FR-005, FR-011, FR-012, FR-024 | T009, T014, T016, T027, T030–T035 | SC-001, SC-003 |
| FR-006, FR-007, FR-008, FR-013 | T007, T012–T014, T016, T024, T027 | SC-001, SC-003, SC-005 |
| FR-009, FR-010, FR-022 | T017–T023, T028, T034, T057 | SC-002 |
| FR-014, FR-015 | T011, T014, T026, T050–T052, T057 | SC-005 |
| FR-016, FR-017 | T042–T045, T049 | SC-004 |
| FR-018 | T014, T043, T046–T049 | SC-009 |
| FR-019, FR-020, FR-021 | T036–T041, T047–T048, T057 | SC-006, SC-007, SC-008 |
| FR-023 | T001–T004, T053, T058–T059 | Publicação estática e recursos sob prefixo real. |

Metas adicionais do plano: tamanho em T054 e tempo de transição em T055.
As evidências de T056–T057 consolidam todos os critérios; T059 valida a hospedagem real.

## Notes

- 59 tarefas: 5 de setup, 10 de fundação, 14 de US1, 6 de US2, 6 de US4, 8 de US3
  e 10 transversais. Todas começam abertas.
- Testes e registros usam somente conteúdo fictício. Não armazenar respostas de
  estudantes em relatórios, capturas, logs ou telemetria.
- Arquivos públicos não recebem dependências de teste, fixtures nem relatórios.
- A nota de privacidade diferencia aplicação e provedor conforme research.md;
  não afirmar ausência absoluta de registros da infraestrutura.
- Gates de ambiente/aprovação não devem ser contornados. Revisão externa ou dispositivo
  não disponível deve aparecer como pendência verificável, nunca como teste aprovado.
- Não alterar o checklist de qualidade da especificação para simular conclusão
  de implementação; estes checkboxes representam trabalho de implementação.
