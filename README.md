# Missão: Proteja seus Dados

## Identificação e justificativa pedagógica

**Público-alvo:** estudantes do 8º ano do Ensino Fundamental.

**Habilidade da BNCC Computação:** EF08CO08.

A aplicação trabalha a distinção dos tipos de dados pessoais solicitados em espaços digitais e dos riscos associados ao seu compartilhamento. Situações simuladas de redes sociais e jogos online permitem identificar informações, avaliar riscos e escolher ações de proteção, sem fornecer dados reais.

O conteúdo de segurança digital e proteção de dados já havia sido trabalhado com os estudantes, principalmente por meio de atividades em papel. A aplicação foi desenvolvida como recurso complementar para retomar essa aprendizagem de forma mais dinâmica e interativa, aproximando a análise de situações dos ambientes digitais presentes no cotidiano dos estudantes.

## Aplicação e repositório

- [Acessar a aplicação publicada](https://acdspcom26-lab.github.io/missao-proteja-seus-dados/)
- [Acessar o repositório no GitHub](https://github.com/acdspcom26-lab/missao-proteja-seus-dados)

O projeto foi versionado, recebeu commit final e push para o GitHub e está publicado no GitHub Pages, conforme atualização da responsável pelo projeto.

## Experiência de aprendizagem

O percurso reúne **quatro missões e doze desafios**, com três respostas por missão. Todas preservam a sequência **IDENTIFICAR → AVALIAR → DECIDIR → APRENDER**:

1. **Ilha Pixel:** recompensa suspeita solicita endereço, telefone e senha.
2. **Conecta+:** postagem pública expõe rotina e informações de outra pessoa.
3. **Conversa privada:** desconhecido pede escola e horário de saída.
4. **Evento final:** perfil, imagem, rotina e pedido urgente de senha se combinam.

Feedbacks explicam as escolhas; erros não impedem o avanço após a orientação. O resultado apresenta separadamente **identificação de dados pessoais, avaliação de riscos e decisões de proteção**. O painel de progresso, o XP motivacional e os sons opcionais complementam a experiência; XP não é nota nem ranking. O som começa desligado.

## Artefatos de especificação e histórico

Os documentos orientam a implementação e permitem acompanhar as decisões:

- [Constitution — princípios do projeto](.specify/memory/constitution.md)
- [Especificação](specs/001-missoes-protecao-dados/spec.md)
- [Plano de implementação](specs/001-missoes-protecao-dados/plan.md)
- [Pesquisa e decisões técnicas](specs/001-missoes-protecao-dados/research.md)
- [Modelo de dados](specs/001-missoes-protecao-dados/data-model.md)
- [Contrato de interface](specs/001-missoes-protecao-dados/contracts/ui-contract.md)
- [Guia de execução e validação](specs/001-missoes-protecao-dados/quickstart.md)
- [Tarefas de implementação](specs/001-missoes-protecao-dados/tasks.md)
- [Revisão da primeira versão](specs/001-missoes-protecao-dados/revision-v2.md) e [revisão dos cenários](specs/001-missoes-protecao-dados/revision-scenarios.md)
- [Histórico da versão de sete missões](specs/001-missoes-protecao-dados/history/v1/) e [histórico anterior à revisão dos quatro cenários](specs/001-missoes-protecao-dados/history/v2/)

Os registros anteriores foram preservados. Referências históricas a publicação ou teste físico pendentes descrevem o momento em que foram escritas; o estado atualizado dessas duas verificações está neste README.

## Execução local e publicação

Pré-requisito de desenvolvimento: **Node.js 24.x**, com npm. Na pasta do projeto:

```sh
npm ci
npm run dev
```

Abra [a aplicação local](http://127.0.0.1:4173/). Para conferir os caminhos sob um prefixo, execute `npm run preview:prefix` e abra [a prévia em /docs/](http://127.0.0.1:4174/docs/).

A aplicação está publicada pelo **GitHub Pages a partir da branch `main` e da pasta `/docs`**, sem etapa de build. HTML, CSS, JavaScript e recursos visuais são estáticos. Não há backend, banco de dados, credenciais ou dependências de execução externas.

A aplicação não coleta dados pessoais reais. Respostas, XP e preferência de som ficam em memória; sair ou recarregar inicia outro percurso. O provedor de hospedagem possui seus próprios registros de acesso. O funcionamento offline não é garantido.

## Uso do agente de codificação e supervisão humana

O agente de codificação apoiou a implementação e os testes a partir dos artefatos produzidos no processo orientado por especificação. As decisões pedagógicas, a avaliação da experiência e as revisões permaneceram sob supervisão humana.

O planejamento inicial previa **sete missões, com três desafios em cada uma**. Após testar a primeira versão, a avaliação humana identificou que o percurso ficaria longo e poderia ser mais dinâmico. A revisão autorizada incluiu:

- redução para quatro missões e doze desafios;
- redução do tamanho dos feedbacks, mantendo orientação explicativa;
- inclusão e aperfeiçoamento de XP e sons opcionais;
- melhoria dos cenários simulados de jogos e redes sociais;
- preservação das quatro etapas pedagógicas e das três dimensões do resultado.

Essa revisão representa o ciclo **testar → avaliar → ajustar**, próprio do desenvolvimento de um recurso educacional, e não uma falha do projeto. Os documentos de revisão mantêm a justificativa e a rastreabilidade das mudanças.

## Roteiro de testes e resultados

### Como reproduzir os testes automatizados

Após instalar as dependências, instale os navegadores usados pelo Playwright:

```sh
npx playwright install chromium firefox webkit
npm test
npx playwright test --project=chromium --workers=1
```

`npm run test:e2e` executa os projetos dos três motores; `npm run test:a11y -- --project=chromium` verifica acessibilidade automatizada no Chromium. `npm run test:budget` verifica tamanho dos arquivos e tempo das transições. Para a medição de desempenho, evite executar outros testes de navegador simultaneamente.

### Resultados registrados

As [evidências de validação](specs/001-missoes-protecao-dados/validation.md) documentam **13 testes de domínio/conteúdo aprovados** e **32 testes Chromium aprovados**, sem skips, no ambiente Windows x64 com Chromium 153.0.8010.12. A cobertura inclui quatro missões, doze desafios, percursos corretos/incorretos/mistos, feedback, progressão, conclusão, reinício, XP, som, privacidade e caminhos relativos.

O [registro de desempenho](specs/001-missoes-protecao-dados/validation-performance.md) apresenta **p95 de 66,5 ms em 30 transições**, dentro da meta de 100 ms, em execução sequencial. Esse resultado descreve o ambiente medido e não garante o mesmo tempo em qualquer dispositivo.

| Ambiente | Roteiro e evidência | Resultado e alcance |
| --- | --- | --- |
| **Desktop** | Percorrer as missões e o resultado; conferir teclado, foco, diálogo de reinício, áudio opcional e layout de 1280 px com texto a 200%. | Suíte Chromium aprovada; axe sem violações detectadas nas telas verificadas. Capturas das quatro cenas inspecionadas, com cenário e desafio lado a lado. |
| **Tablet** | Percorrer as quatro missões e o resultado em largura emulada de 768 px, com texto a 200%, e conferir orientação paisagem. | Verificações automatizadas aprovadas, sem rolagem horizontal. Não há registro de validação em tablet físico. |
| **Celular** | Conferir largura emulada de 360 px, texto a 200%, toque emulado e cenário antes do desafio; acessar também a versão publicada em aparelho real. | Testes automatizados e captura mobile aprovados. **A responsável também testou a aplicação publicada em celular real e confirmou o funcionamento do acesso e da interface responsiva.** Esse relato não equivale a uma validação completa de todos os fluxos e navegadores móveis. |

Para conferência manual, iniciar o percurso, observar cada cenário, responder aos três desafios, ler o feedback e avançar mesmo após erros. Ao concluir, verificar as três dimensões do resultado, testar o controle de som e conferir o cancelamento e a confirmação do reinício.

**Limitações:** a validação completa em Firefox/WebKit permanece pendente devido a falhas de inicialização desses motores no ambiente de testes. Também faltam validação com leitor de tela, revisão pedagógica externa, confirmação de BFCache real e avaliação perceptiva dos sons. Os testes automatizados de acessibilidade e a emulação não substituem essas verificações.

## Reflexão final

O desenvolvimento de “Missão: Proteja seus Dados” começou pela definição do público, da habilidade EF08CO08 e dos objetivos de aprendizagem, antes da escrita do código. Como segurança digital e proteção de dados já haviam sido trabalhadas principalmente em atividades em papel, o recurso foi pensado para retomar esses conhecimentos por meio de situações interativas. A sequência IDENTIFICAR → AVALIAR → DECIDIR → APRENDER e a devolutiva em três dimensões estabeleceram uma organização pedagógica que deveria permanecer reconhecível em todas as versões.

Também foram antecipadas decisões técnicas: aplicação estática, publicação no GitHub Pages, ausência de cadastro e de coleta de dados pessoais reais, responsividade e navegação por teclado. Esses limites ajudaram a transformar intenções gerais em critérios verificáveis. A especificação funcionou como guia para o agente, mas não substituiu a tomada de decisão humana sobre a adequação do conteúdo, a duração da atividade ou a clareza das orientações.

A primeira versão funcionava tecnicamente, porém a avaliação humana identificou necessidades que os testes automatizados não poderiam resolver sozinhos. Sete missões, com três desafios cada, tornariam o percurso extenso; os feedbacks estavam longos e a experiência precisava ser mais dinâmica. Surgiu ainda a necessidade de distinguir o papel motivacional da pontuação da avaliação pedagógica, evitando que o XP substituísse a análise de identificação, avaliação e decisão. Na apresentação, cenários com aparência de cartões precisavam comunicar melhor os ambientes digitais simulados.

As mudanças documentadas após os testes e a revisão correspondem ao propósito do Converge: confrontar a implementação com os requisitos e identificar o que ainda precisa ser ajustado. Os registros disponíveis sustentam as alterações, sem permitir atribuir cada uma a uma execução específica dessa ferramenta. A decisão humana levou à versão final com quatro missões, doze desafios, feedbacks mais curtos, XP, sons opcionais e cenários contextualizados de jogos e redes sociais. A sequência pedagógica e a possibilidade de continuar após receber orientação foram mantidas. Novos testes verificaram os fluxos e ajudaram a corrigir problemas de acessibilidade e apresentação.

Supervisionar o agente exigiu formular instruções claras, conferir os resultados e distinguir funcionamento técnico de qualidade educacional. Também exigiu registrar limitações, preservar o histórico e evitar interpretar testes aprovados como comprovação completa da aprendizagem. O ciclo testar, avaliar e ajustar mostrou que revisar escolhas faz parte do amadurecimento do projeto. O agente acelerou a implementação e os testes, mas a entrega dependeu de acompanhamento, avaliação crítica e decisões pedagógicas humanas.
