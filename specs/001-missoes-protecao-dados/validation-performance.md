# Desempenho da revisão dos cenários

Data: 2026-10-03. Chromium 153.0.8010.12, Windows x64. Execução: `npx playwright test --project=chromium --workers=1`.

Método preservado: `performance.now()` desde a ação aceita até duas `requestAnimationFrame`, após carregamento, sem throttling. 30 transições, incluindo início, confirmações, conclusão, reinício e novo percurso. p95 pelo método nearest-rank: 29º valor ordenado.

**p95: 66,5 ms**, meta até 100 ms. Arquivos públicos: **119.168 bytes**, abaixo de 1 MiB, medidos pelo teste de orçamento. Amostra em ms (arredondada a uma casa):

69,0; 31,7; 22,9; 27,0; 66,5; 27,3; 15,5; 31,0; 44,4; 33,0; 19,9; 22,8; 60,8; 24,4; 25,3; 19,0; 33,8; 27,2; 19,9; 20,1; 27,5; 18,8; 32,0; 24,7; 28,9; 21,9; 35,8; 18,0; 17,8; 20,7.

A execução paralela inicial excedeu a meta (141,3 ms); a medição final foi feita sem outro processo de testes concorrente. Isso descreve este equipamento, não garante latência em todo dispositivo. JSON sem arredondamento é anexado por performance.spec.js ao resultado Playwright. O teste de orçamento verifica a soma de todos os arquivos públicos de docs/ contra 1 MiB.
