# Evidências da revisão dos quatro cenários

Data: 2026-10-03. Escopo autorizado: `revision-scenarios.md`. Histórico V1 em `history/v1/validation.md`. Constitution não foi alterada nesta revisão visual; sua emenda 2.0.0 pertence à revisão anterior autorizada.

## Resultados

| Verificação | Evidência observada |
| --- | --- |
| `npm test` | 13 testes aprovados: catálogo de quatro missões, gabaritos, mutações inválidas, avaliação, estado, resultados, XP, seis sinais de áudio e orçamento. |
| `npx playwright test --project=chromium --workers=1` | 32 testes aprovados, sem skips, Chromium 153.0.8010.12, Windows x64. |
| Percurso | 12 respostas, quatro etapas por missão; respostas certas, erradas e mistas; confirmação repetida, seleção vazia, reinício/cancelamento e conclusão. |
| Três dimensões | Contagens 4/4–4/4–4/4, 0/4–0/4–0/4 e 1/4–2/4–3/4 corretas e independentes. |
| XP | 900, 100 e 550 nos três percursos; revelado em Aprender, bônus único de conclusão, reinício limpo. |
| Sons | Desligados por padrão; toggle por teclado, síntese local, seis sinais em teste unitário e falha segura de AudioContext. Avaliação perceptiva por pessoa ainda pendente. |
| Cenários | Jogo, feed, conversa privada e evento reconhecíveis; lobby, comentários, curtida e perfil têm interações locais sem alterar XP/respostas. |
| Acessibilidade | axe sem violações detectadas na abertura, quatro etapas da primeira missão, cenários das demais, resultado e diálogo; teclado, foco, cancelamento e movimento reduzido. |
| Responsividade | Todas as missões em 360, 768 e 1280 px, fonte raiz de 16 para 32 px, paisagem e toque emulado; sem rolagem horizontal. |
| Privacidade | Somente recursos locais via GET, sem respostas em URL/logs/cookies/storage/IndexedDB/service workers. Sem campo livre, upload ou dados reais. |
| Ciclo de vida | Recarga/saída limpam; trocar de aba preserva. Eventos sintéticos pagehide/pageshow testados; isso não comprova BFCache real. |
| Entrega estática | Percurso completo na raiz e em /docs/, sem 404; falha de módulo/recurso, catálogo inválido e JavaScript desativado apresentam orientação. |
| Desempenho | p95 de 66,5 ms em 30 transições sequenciais; detalhes em validation-performance.md. |

## Correções e revisão visual

Corrigida a hierarquia do título da mensagem de recompensa (h2 após h1). A entrada de cada missão mantém a simulação no início da rolagem, inclusive em celular; etapas seguintes continuam levando foco ao desafio. O teste visual passou a percorrer e capturar as quatro simulações, com tempo compatível com duas jornadas completas.

A primeira execução paralela teve p95 de 141,3 ms, acima da meta. Uma tentativa concorrente adicional não foi evidência válida de isolamento e causou conflito de arquivos temporários entre execuções Playwright. A suíte final foi executada sequencialmente em um único processo: 32 aprovações e p95 de 66,5 ms. Não houve mudança da meta de 100 ms.

Capturas produzidas por `tests/e2e/visual.spec.js`: abertura, quatro missões, feedback, celular, texto ampliado e resultado. As quatro cenas desktop foram inspecionadas pelo agente: conteúdo íntegro, painel à esquerda/desafio à direita, dados legíveis e sem sobreposição persistente. O aviso transitório de XP aparece nas capturas logo após avançar. Emulação e revisão automatizada não substituem uso por estudantes.

## Rastreabilidade e limites

Conferência complementar: o teste visual passou novamente após adicionar captura da
missão em 360 px e asserção de que o desafio começa abaixo do cenário. Captura mobile
inspecionada pelo agente, sem cortes ou sobreposição. Saída em `test-results-visual/`.

Nova tentativa de inicialização nesta revisão: os dois testes de abertura em Firefox
e WebKit falharam antes de carregar a aplicação, respectivamente `spawn UNKNOWN` e
dependência `harfbuzz.dll` ausente segundo o verificador do motor. Não houve aprovação
funcional desses navegadores. Relatórios locais em `test-results-other-engines/`.

- FR-001–FR-013, FR-022, FR-024 / SC-001–SC-004: catálogo, testes de domínio e journey.spec.js.
- FR-014–FR-015 / SC-005: privacy.spec.js e lifecycle.spec.js.
- FR-016–FR-018 / SC-004, SC-009: resultados, reinício e gamification.spec.js.
- FR-019–FR-021 / SC-006–SC-008: accessibility.spec.js, responsive.spec.js, scenarios.spec.js e capturas.
- FR-023: deployment.spec.js valida raiz/prefixo local; hospedagem real pendente.
- FR-025–FR-027: HUD, áudio e feedback breve; testes de gamificação, áudio e cenas.

Firefox e WebKit não foram aprovados: falhas de inicialização do ambiente Windows já registradas (Firefox: spawn/configuração lado a lado; WebKit: bibliotecas harfbuzz.dll/libpng16.dll). Repetir os fluxos em ambiente funcional. Continuam pendentes dispositivos físicos, leitor de tela, BFCache real, percepção dos sons, revisão pedagógica externa e validação no endereço público. Nenhum commit, push ou publicação foi realizado.
