# Research: Missão: Proteja seus Dados

**Data**: 2026-10-02
**Base**: [spec.md](spec.md) e constituição v1.0.0.

## Questões resolvidas

### R1 — Plataforma e organização

- **Decision**: HTML semântico, CSS responsivo e JavaScript ES2022 com módulos nativos.
  Publicar somente `docs/`; nenhuma dependência de execução, compilação ou framework.
- **Rationale**: sete situações e um fluxo linear cabem em uma aplicação pequena.
  Separar conteúdo, avaliação, estado e renderização permite testes sem criar infraestrutura.
- **Alternatives considered**: React/Vue e ferramenta de build adicionariam dependências
  sem necessidade funcional; arquivo monolítico dificultaria revisão pedagógica e testes.
- **Evidence**: módulos são suportados pelos navegadores modernos; o desenvolvimento
  deve usar HTTP local, não abertura direta de arquivos.
  [MDN: JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules).

### R2 — Hospedagem e caminhos

- **Decision**: GitHub Pages com publicação da pasta `/docs` da branch de entrega;
  `docs/index.html` como entrada, `docs/.nojekyll`, referências relativas e sem roteador
  que dependa de reescrita de URLs. Etapas não aparecem na URL.
- **Rationale**: mantém apenas os arquivos públicos na origem de publicação e funciona
  no subdiretório do repositório. Ferramentas e testes permanecem fora da pasta publicada.
- **Alternatives considered**: publicar a raiz exporia documentação interna desnecessária;
  pipeline de build não é necessário; backend contraria a constituição.
- **Evidence**: Pages aceita publicação de uma branch usando raiz ou `/docs`.
  [GitHub: publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

### R3 — Limite da privacidade

- **Decision**: nenhuma identificação, campo livre, telemetria, cookie da aplicação,
  armazenamento persistente, fonte remota, CDN ou integração. Respostas apenas em memória.
  Não registrar respostas no console, em URLs ou requisições.
- **Rationale**: implementa FR-014–FR-015 sem tentar transformar desempenho pedagógico
  em histórico pessoal. Dados fictícios de contato devem ser claramente não operacionais;
  não usar números discáveis, links de envio ou credenciais funcionais.
- **Alternatives considered**: localStorage/sessionStorage e contas criariam retenção
  não prevista; analytics ou recursos externos adicionariam compartilhamento desnecessário.
- **Limite verificável**: ausência de coleta pela aplicação não equivale a ausência
  de registros da hospedagem. GitHub informa que Pages registra IPs por segurança.
  Não prometer anonimato absoluto da infraestrutura nem afirmar que o aplicativo
  controla esses registros. Essa delimitação aplica o requisito à aplicação e mantém
  a hospedagem expressamente escolhida pelo usuário.
  [GitHub: data collection](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages#data-collection).

### R4 — Conteúdo e avaliação

- **Decision**: catálogo de sete missões como objetos de dados em módulo local.
  Cada missão possui três perguntas: conjuntos de opções em identificação/avaliação
  e escolha única em decisão. Comparação exata de conjuntos; nenhuma nota parcial agregada.
- **Rationale**: corresponde aos 21 registros e às três contagens de 0 a 7 definidos
  na especificação. Feedback por opção permite explicar acertos, omissões e itens indevidos.
- **Alternatives considered**: texto livre implicaria coleta e correção ambígua;
  feedback gerado por serviço externo introduziria rede e resultados não revisáveis.
- **Evidence**: critérios de avaliação de [spec.md](spec.md); julgamento de engenharia
  derivado desses requisitos, sem alteração pedagógica.

### R5 — Interface acessível

- **Decision**: controles HTML nativos; `fieldset`/`legend`, rótulos, checkboxes/radios,
  botões, regiões com títulos, foco explícito nas transições e erros anunciados.
  Ilustrações locais acompanhadas de descrição textual das mesmas pistas.
- **Rationale**: permite teclado e leitores de tela sem recriar padrões de interação.
  Usar texto para missão, etapa e feedback; não depender de arrastar, som ou animação.
- **Alternatives considered**: canvas ou interação apenas por arraste dificultariam
  equivalência textual e navegação. A aparência de rede social não precisa copiar seus
  mecanismos reais.
- **Evidence**: WAI recomenda agrupar controles relacionados com identificação do grupo.
  [W3C: Grouping Controls](https://www.w3.org/WAI/tutorials/forms/grouping/).

### R6 — Testes e ferramentas locais

- **Decision**: Node.js 24.x; `node:test` e `node:assert/strict` para domínio/conteúdo;
  `@playwright/test` para navegador, `@axe-core/playwright` para apoio à acessibilidade,
  `http-server` somente para servir os arquivos em desenvolvimento.
  Fixar versões compatíveis exatas e gerar lockfile na implementação.
- **Rationale**: testes do domínio não precisam de DOM; testes reais de navegador
  verificam foco, interação, armazenamento e caminhos. Dependências não vão ao site.
- **Alternatives considered**: testes só manuais não protegem regras de progressão;
  um DOM simulado não substitui comportamento real de teclado e layout.
- **Evidence**: [Node 24: test runner](https://nodejs.org/docs/latest-v24.x/api/test.html),
  [Playwright: installation](https://playwright.dev/docs/intro),
  [Playwright: accessibility testing](https://playwright.dev/docs/accessibility-testing)
  e [http-server](https://github.com/http-party/http-server).
  Verificações automáticas de acessibilidade não substituem revisão manual.
- **Ambiente observado**: Node v24.21.0 e npm 11.19.0 disponíveis. Nenhuma dependência
  instalada nesta etapa; nenhum comando de teste do produto foi executado.

### R7 — Orçamento de desempenho

- **Decision**: arquivos públicos somando no máximo 1 MiB sem compressão; fontes do sistema
  e ilustrações locais leves; atualização de etapa em até 100 ms no percentil 95 em
  30 ações automatizadas no Chromium local sem throttling, após carregamento.
- **Rationale**: metas técnicas de implementação para conteúdo curto e operação local;
  são critérios de verificação, não promessa de tempo de carregamento em qualquer rede.
- **Alternatives considered**: vídeo, fontes remotas ou animações obrigatórias aumentariam
  tráfego sem contribuir para os objetivos definidos.
- **Evidence**: decisão de projeto, a validar na implementação; não é medição realizada.

### R8 — Ciclo de vida e confirmação única

- **Decision**: inicializar uma tentativa vazia; limpar estado e interface em `pagehide`;
  ao restaurar página do BFCache (`pageshow.persisted`), reinicializar a abertura.
  Alternar abas não reinicia. Reset incrementa uma geração; transições usam token
  imutável de geração, missão, etapa e revisão.
- **Rationale**: o cache de navegação pode preservar memória e DOM. Uma resposta só
  pode ser confirmada uma vez por etapa; validar e consumir o token sincronicamente,
  antes de qualquer espera, evita que eventos antigos avancem etapas novas.
- **Alternatives considered**: debounce sozinho não garante idempotência; depender de
  `unload` não garante limpeza; apagar ao ocultar a aba interromperia o uso normal.
- **Evidence**: [BFCache](https://web.dev/articles/bfcache),
  [Page Lifecycle](https://developer.chrome.com/docs/web-platform/page-lifecycle-api)
  e [HTML: disabled controls](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#enabling-and-disabling-form-controls:-the-disabled-attribute).
- **Limite**: não prometer apagamento imediato da memória física ao encerrar o navegador.
  O compromisso é não salvar nem oferecer retomada da tentativa. Confirmar deve desativar
  o botão de origem e aposentar seu manipulador; novos formulários começam sem seleção
  e o foco vai para o título. O evento de saída não é requisito para destruir o estado
  de um novo documento.
- **Pesquisa delegada**: revisão específica de BFCache e repetição de eventos retornou
  recomendações incorporadas aqui; não houve edição de arquivos pelo agente.

## Conclusão da fase 0

Decisões técnicas resolvidas. Nenhuma alteração da constituição ou do escopo é necessária.
O limite de registros da hospedagem está documentado; a aplicação não recebe nem usa
esses registros. Prosseguir ao modelo de dados, contrato de interface e guia de validação.
