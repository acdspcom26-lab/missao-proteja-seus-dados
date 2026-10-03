# Missão: Proteja seus Dados

Aplicação para o 8º ano, alinhada à EF08CO08. Quatro missões fictícias seguem IDENTIFICAR → AVALIAR → DECIDIR → APRENDER. Erros não impedem o avanço.

- Ilha Pixel: recompensa suspeita solicita dados e senha.
- Conecta+: postagem pública expõe rotina e outra pessoa.
- Conversa privada: desconhecido pede escola e horário de saída.
- Evento final: perfil, imagem, rotina e pedido urgente de senha se combinam.

HUD, XP motivacional e sons opcionais complementam a experiência. A aprendizagem é apresentada em três dimensões independentes; XP não é nota nem ranking.

## Desenvolvimento e testes

Node.js 24.x. Execute `npm ci`, `npx playwright install chromium firefox webkit` e `npm run dev`. Abra http://127.0.0.1:4173/.

`npm test` verifica domínio/conteúdo/áudio/orçamento. Use `npx playwright test --project=chromium --workers=1` para a suíte Chromium; a execução sequencial evita concorrência na medição de transições. `npm run test:e2e` cobre os três motores. `npm run test:budget` mede tamanho e 30 transições. `npm run preview:prefix` disponibiliza http://127.0.0.1:4174/docs/ para conferir caminhos relativos.

Publicar somente `docs/` no GitHub Pages, sem build. Não há backend, banco de dados, credenciais, dependências de execução ou coleta de dados pessoais pela aplicação. Respostas, XP e som ficam em memória; sair/recarregar inicia outro percurso. O provedor possui seus próprios registros de acesso. Offline não é garantido.

## Estado da revisão

13 testes de domínio/conteúdo e 32 testes Chromium passaram. Incluem quatro missões, erros sem bloqueio, resultados independentes, XP, som, axe, teclado, toque emulado, texto 200%, privacidade e caminhos relativos. Transições: p95 de 66,5 ms em execução sequencial neste Windows.

Decisões e histórico: `specs/001-missoes-protecao-dados/revision-v2.md` e `revision-scenarios.md`. Evidências: `validation.md` e `validation-performance.md`. Versões anteriores: `history/v1/` e `history/v2/`.

Firefox/WebKit têm limitações de execução neste Windows; falta validá-los em ambiente funcional. Também faltam dispositivos reais, leitor de tela, BFCache real e revisão pedagógica externa. Não houve publicação, commit ou push. Após autorização e acesso ao remoto, configurar Pages para `/docs` e repetir os fluxos no endereço público.
