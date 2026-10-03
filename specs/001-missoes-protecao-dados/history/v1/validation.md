# Evidências de implementação

Data: 2026-10-02. Constitution e spec.md preservadas.

## Fundação

- Checklist requirements.md: 16/16 satisfeitos; somente leitura.
- T001–T005: estrutura estática, ferramentas locais e navegadores instalados. O instalador alertou bibliotecas ausentes para um motor; validar execução real antes de aprovação.
- Antes dos módulos, `npm test` falhou nos três arquivos por módulos ausentes (ERR_MODULE_NOT_FOUND).
- Após implementação, quatro testes passaram: validação/mutações do catálogo, conjuntos exatos/parciais/indevidos, 21 respostas com erros, tokens obsoletos e reinício.
- Revisão do domínio: sem DOM, rede, armazenamento ou logs de respostas.

## Resultado das verificações

| Verificação | Resultado observado |
| --- | --- |
| `npm ci` | PASS; dependências exatas reproduzidas, auditoria npm sem vulnerabilidades reportadas. |
| `npm test` | PASS: 10 testes, incluindo 45 mutações inválidas de catálogo, gabaritos esperados das 21 perguntas, feedback de todas as alternativas, conjuntos, estado, resultados e orçamento. |
| `npm run test:e2e` | Não aprovado integralmente: na primeira execução, 23 cenários Chromium passaram, um teste de noscript precisou de correção e 46 cenários não iniciaram nos outros motores. |
| `npx playwright test --project=chromium` após correções | PASS: 24 cenários, sem skips. |
| Acessibilidade no Chromium | axe sem violações detectadas na abertura, quatro etapas, resultado e diálogo; teclado, foco, Escape e retorno ao acionador verificados. |
| `npm run test:a11y -- --project=chromium` | PASS: dois testes, sem skips. |
| Resultado por dimensão | PASS: 7/7–7/7–7/7; 0/7–0/7–0/7; 3/7–4/7–5/7. Sem pontuação geral. |
| Responsividade | PASS: todas as missões e resultado em 360, 768 e 1280 px com fonte raiz ampliada de 16 a 32 px, sem rolagem horizontal; orientação paisagem, preferência de movimento reduzido e toque emulado. |
| Privacidade | PASS no percurso misto: somente GET de recursos locais, sem respostas em URL, logs, cookies, localStorage, sessionStorage, IndexedDB ou service workers. Nenhum campo livre/upload. |
| Ciclo de vida | PASS: recarga na Missão 4 e saída/retorno abrem início vazio; troca de aba preserva; handlers sintéticos pagehide/pageshow.persisted limpam e reiniciam. Isso não comprova restauração BFCache real. |
| Raiz e prefixo /docs/ | PASS: sete missões, resultado e recarga, sem 404. Falha de recurso/módulo, catálogo inválido e JavaScript desativado têm mensagem sem resultado inventado. |
| `npm run test:budget` | PASS: 70.368 bytes públicos e p95 29,8 ms. Método e amostra em validation-performance.md. |

### Falhas encontradas e corrigidas

- Rótulo textual da alternativa incluía a letra decorativa na busca: cada controle passou a referenciar o texto da opção via aria-labelledby.
- Quadro de etapas da abertura transbordava em 360 px a 200%: colunas passaram a aceitar contração e quebra de texto.
- Seta decorativa afetava o nome exato do botão de reinício: nome acessível explícito no botão.
- Retorno de foco do diálogo no resultado: foco restaurado ao botão Reiniciar também nessa tela.
- Callbacks de diálogo: token da abertura capturado, evitando que eventos obsoletos usem a revisão corrente.
- Aviso de seleção vazia: limpo ao selecionar uma opção.
- Inicialização assíncrona: geração verificada antes de renderizar após saída/reset.
- Teste de orçamento confundia catalog-validation.js com relatório: regra passou a distinguir arquivos de produção de testes/relatórios.
- Teste noscript: aviso envolvido em parágrafo e verificado por visibilidade/texto do elemento exibido, pois o extrator do Playwright ignora o texto direto de noscript.

## Revisão pedagógica e visual realizada no código

Revisão pelo agente dos sete roteiros, gabaritos e explicações, comparando com spec.md:

| Missão | Conteúdo preservado e pontos conferidos |
| --- | --- |
| 1 — O perfil que conta demais | Nome e telefone versus interesse genérico; retirar ambos os dados. |
| 2 — O convite no chat do jogo | Escola + horário; recusa, encerrar/denunciar e ajuda de adulto. |
| 3 — A foto entrega o lugar | Escola e praça em imagem/legenda; equivalência textual; apagar só legenda deixa pistas visuais. |
| 4 — O prêmio pede informação demais | Endereço, telefone, senha; recompensa como incentivo; envio parcial também expõe. |
| 5 — Quem vai ver essa postagem? | Rotina, dados da amizade e audiência; repasse possível mesmo com audiência limitada. |
| 6 — As pistas se juntam | Apelido reutilizado + escola + horários; risco da combinação entre fontes. |
| 7 — Desafio final: proteja a personagem | Contato, pistas visuais, rotina e credencial; integração das missões 1–6 e limites da solução parcial. |

Contato fictício usa (XX) XXXXX-XXXX, sem número discável. Nenhuma senha real ou campo de senha é apresentado. Os cenários não executam ações externas. Feedback usa explicação de seleção/omissão; respostas incorretas não impedem avanço.

Capturas locais geradas por tests/e2e/visual.spec.js para abertura, missão, feedback, celular, ampliação e resultado. Revisão visual do agente não substitui participação de estudantes ou validação por docente.

## Rastreabilidade

| Requisitos / critérios | Evidência |
| --- | --- |
| FR-001–FR-005; SC-001, SC-008 | Catálogo revisado, abertura e sete roteiros; tests/content/missions.test.js e journey.spec.js. Revisão externa ainda pendente. |
| FR-006–FR-013, FR-022; SC-002, SC-003 | Evaluation/feedback, gabaritos, todas as alternativas, seleção vazia, parcial/extra e percurso incorreto. |
| FR-014–FR-015; SC-005 | privacy.spec.js, lifecycle.spec.js; domínio sem efeitos externos. |
| FR-016–FR-018, FR-024; SC-004, SC-009 | Contagens independentes, resultado só ao final, reset/cancelamento e tokens obsoletos. |
| FR-019–FR-021; SC-006–SC-008 | axe, teclado, toque emulado, texto 200%, conteúdo e capturas. Dispositivos reais/leitor de tela não aprovados. |
| FR-023 | deployment.spec.js: raiz e prefixo local. Hospedagem real pendente. |

## Limitações e tarefas ainda abertas

- **T035**: Firefox não inicia (`spawn UNKNOWN`; execução direta informa configuração lado a lado incorreta). WebKit não inicia: verificador acusa harfbuzz.dll e libpng16.dll, embora os arquivos tenham sido baixados. São falhas do ambiente Windows, não aprovações nem resultados funcionais da aplicação. Repetir a suíte nesses motores em ambiente funcional.
- **T040 e T048**: falta conferência por pessoa em celular e tablet reais, leitor de tela e ampliação real de texto. Testes automatizados e emulação estão aprovados no Chromium, mas não substituem essas verificações.
- **T056**: execução completa nos três motores ainda não aprovada. Comandos e evidências da parte disponível estão registrados acima.
- **T057**: falta revisão pedagógica externa e de acessibilidade, além de BFCache real confirmado. O teste sintético valida apenas os handlers.
- **T058**: README e quickstart atualizados; fechamento da entrega revisada aguarda T057.
- **T059**: sem publicação, commit ou push. Requer aprovação explícita, acesso ao remoto e repetição dos testes no endereço GitHub Pages.

Constitution, spec.md, plan.md, research.md, data-model.md, ui-contract.md e checklist de requisitos não foram alterados. Nenhum hook before_implement/after_implement: .specify/extensions.yml não existe.
