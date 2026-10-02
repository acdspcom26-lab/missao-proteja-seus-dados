# Quickstart: validação da implementação

**Estado atual**: guia de execução futura. O plano não cria a aplicação, package.json,
testes ou dependências. Os comandos abaixo tornam-se executáveis após a implementação.
Referências: [plan.md](plan.md), [data-model.md](data-model.md),
[contrato de interface](contracts/ui-contract.md).

## Pré-requisitos e preparação

- Node.js 24.x e npm; navegadores do Playwright instalados para testes automatizados.
- Implementação e package-lock.json disponíveis; executar comandos na raiz do repositório.
- Conteúdo fictício revisado por pessoa responsável pela revisão pedagógica.
- Primeiro preparo de dependências pelo implementador: instalar como dependências de
  desenvolvimento @playwright/test, @axe-core/playwright e http-server, com versões exatas
  compatíveis, e versionar o lockfile. Nenhuma biblioteca deve ser entregue por CDN.

Após esse preparo:

```powershell
npm ci
npx playwright install chromium firefox webkit
npm test
npm run test:e2e
npm run dev
```

Abrir http://127.0.0.1:4173/ após o comando dev. Encerrar o servidor com Ctrl+C.
npm test executa testes de domínio e catálogo; test:e2e executa Playwright.
A configuração de testes inicia seus próprios servidores, sem exigir dev em paralelo.

## Contrato dos comandos a implementar

| Comando | Comportamento |
| --- | --- |
| npm run dev | http-server docs -a 127.0.0.1 -p 4173 -c-1 |
| npm run preview:prefix | http-server . -a 127.0.0.1 -p 4174 -c-1 |
| npm test | node --test, limitado explicitamente aos arquivos unitários e de conteúdo. |
| npm run test:e2e | playwright test, configurado somente para tests/e2e. |
| npm run test:a11y | playwright test tests/e2e/accessibility.spec.js |
| npm run test:budget | Teste do orçamento de tamanho e medição local de transições. |

preview:prefix serve a raiz apenas no loopback para verificar /docs/; nunca publicar
esse servidor. Teste de prefixo usa http://127.0.0.1:4174/docs/.
Dev e preview são ferramentas locais, não um servidor de produção.
Não há comando de build obrigatório: docs/ já contém os arquivos publicáveis.

## Validação automatizada

1. **Catálogo**: sete IDs/ordens, perguntas e referências válidas, explicação por opção,
   síntese completa, pistas equivalentes em texto, todos os recursos locais.
2. **Domínio**: igualdade de conjuntos sem depender da ordem; seleção parcial/extra
   inadequada; seleção vazia não produz registro; decisão única.
3. **Transições**: gravar exatamente 21 respostas, concluir 7 missões; rejeitar token
   obsoleto, ID inválido e confirmação repetida; nenhum erro bloqueia avanço.
4. **Percursos E2E**: todas adequadas → 7/7 nas três dimensões; todas inadequadas → 0/7;
   mistura controlada → identificação 3/7, avaliação 4/7 e decisão 5/7.
   Fixtures esperadas devem ser revisadas independentemente do avaliador testado.
5. **Feedback**: para cada uma das sete missões, confirmar que a resposta esperada
   e ao menos um caso parcial/indevido levam a explicações coerentes, sem só “certo/errado”.
   Testes de catálogo conferem cobertura de todas as alternativas.
6. **Reinício**: cancelar preserva etapa, rascunho e respostas; confirmar limpa
   tudo e abre a Missão 1; repetir reinício não reintroduz callbacks antigos.
7. **Recarga e navegação**: recarregar na Missão 4 volta à abertura sem respostas;
   sair e voltar também. Testar BFCache real manualmente conforme seção seguinte;
   evento sintético em teste unitário não prova restauração real.
8. **Rede/privacidade**: perfil limpo, somente recursos locais estáticos; nenhuma chamada
   POST, telemetria, destino externo, resposta em URL ou persistência da aplicação.
   Verificar cookies, local/sessionStorage, IndexedDB e registros de service workers
   antes/depois; não interpretar ausência no cliente como ausência de logs do provedor.
9. **Subdiretório**: executar percurso em /docs/ e verificar todos os recursos sem 404.
10. **Matriz**: Chromium, Firefox e WebKit para o fluxo principal; Chromium com
    viewports 360 × 800, 768 × 1024 e 1280 × 800, mais toque em contexto móvel.
    Emulação não substitui conferência manual em um celular e um tablet disponíveis.
11. **Acessibilidade automática**: axe na abertura, quatro etapas, resultado e confirmação.
    Falhas precisam de correção; ausência de falha automática não encerra a revisão manual.
12. **Orçamento técnico**: somar bytes de docs/ (até 1 MiB); medir 30 transições locais
    após carregamento, do acionamento aceito até atualização visível, com relógio
    monotônico e próxima pintura; percentil 95 até 100 ms, Chromium sem throttling.
    Registrar máquina/navegador e valores; não extrapolar para qualquer dispositivo.

Esperado: todos os testes passam; não há erro não tratado, salto de etapa,
duplicação de resposta ou acesso antecipado ao resultado.

## Validação manual obrigatória

- Percorrer uma missão e o resultado usando apenas teclado; verificar ordem/foco,
  controles agrupados, confirmação de reinício e Escape/retorno de foco.
- Conferir com leitor de tela disponível (por exemplo, NVDA ou VoiceOver) nomes,
  estados, erro de seleção vazia e leitura das pistas e do feedback.
- Ampliar texto a 200% em cada largura de referência; não usar apenas deviceScaleFactor,
  que não prova aumento real do texto. Conferir rolagem e sobreposição.
- Desligar som, reduzir movimento e verificar informação sem distinção de cores.
- No navegador comum, iniciar uma tentativa, navegar para outra página e voltar;
  verificar restauração BFCache pelas ferramentas do navegador e conferir estado vazio.
  Se BFCache não ocorrer, registrar a limitação e repetir em ambiente que o permita.
- Alternar abas durante uma missão: progresso deve permanecer.
- Repetir cliques/toques e Enter nas confirmações: só uma transição é aceita por origem.
- Revisão pedagógica das sete missões: conferir objetivo EF08CO08, progressão,
  realidade dos contextos, ausência de dados reais e explicações de todos os distratores.
  Na Missão 7, conferir integração de dados explícitos, pistas indiretas e combinações.
- Confirmar orientação final nos casos 0, intermediário e 7 em cada dimensão.
  Não aceitar linguagem de reprovação ou promessa de risco zero.

Registrar cenário, navegador/dispositivo, resultado observado e pendências, usando apenas
respostas fictícias. SC-001–SC-009 exigem evidência; não registrar dados de estudantes.

## Verificação de publicação futura

Após aprovação da entrega, configurar GitHub Pages para a branch de entrega e /docs,
conforme [documentação oficial](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).
Confirmar que index.html e .nojekyll estão na pasta publicada. Não incluir segredos.

No endereço público fornecido pelo GitHub, repetir abertura, uma missão, recarga e
percurso completo; verificar recursos sob o prefixo real do repositório, ausência de
404, responsividade e não envio de respostas. Não há implantação executada neste plano.
