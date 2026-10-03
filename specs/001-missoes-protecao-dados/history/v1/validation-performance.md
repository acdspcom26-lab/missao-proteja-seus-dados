# Medição de desempenho

Data: 2026-10-02. Ambiente: Windows 11 Home Single Language build 26200, x64, Intel Core i3-1215U (12ª geração), Node.js 24.21.0, Chromium 153.0.8010.12, Playwright 1.63.0. Execução local, um worker, sem throttling, após carregamento dos recursos.

Comando: `npm run test:budget`.

- Arquivos públicos: **70.368 bytes** (aproximadamente 68,7 KiB), incluindo as duas ilustrações SVG. Meta: até 1.048.576 bytes. PASS.
- Amostra: 30 transições aceitas — início, 21 confirmações, sete continuações e abertura do reinício.
- Método: relógio monotônico `performance.now()` imediatamente antes do clique; término após duas chamadas de `requestAnimationFrame`, permitindo uma pintura entre elas. Não mede somente o redutor de estado.
- p95: **29,8 ms**. Meta: até 100 ms. PASS.
- Valores em ms, arredondados a uma casa decimal: 16,7; 21,7; 22,9; 23,6; 20,2; 24,2; 24,5; 25,6; 20,1; 25,2; 26,0; 24,4; 18,9; 29,8; 27,3; 14,5; 22,3; 22,3; 21,8; 17,2; 21,1; 31,4; 15,3; 24,2; 19,2; 22,7; 24,7; 20,2; 22,1; 21,1.

O teste também anexa JSON com valores sem arredondamento ao resultado Playwright. Estas medidas descrevem este ambiente e não garantem desempenho em qualquer dispositivo ou rede.
