# Implementation Plan: Missão: Proteja seus Dados

**Branch**: `main` | **Date**: 2026-10-02 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `specs/001-missoes-protecao-dados/spec.md`

**Identificador retornado pelo setup**: `001-missoes-protecao-dados`.
O script usa o nome da funcionalidade como BRANCH quando resolve feature.json;
`git branch --show-current` confirma a branch Git real `main`. Nenhuma branch foi criada.

## Summary

Implementar uma aplicação educacional estática para o 8º ano, alinhada à EF08CO08,
com exatamente sete missões nos contextos descritos em spec.md. Cada missão segue
IDENTIFIQUE → AVALIE → DECIDA → ENTENDA; erros recebem explicação e nunca bloqueiam avanço.
O resultado apresenta identificação de dados pessoais, avaliação de riscos e decisões
de proteção, com sete observações por dimensão.

A solução usa HTML semântico, CSS responsivo e módulos JavaScript nativos, sem framework
ou dependência de execução. Um catálogo local define as situações e seus feedbacks;
funções puras fazem avaliação e transições, e uma camada de interface renderiza o estado.
A tentativa existe somente em memória. Publicar a pasta docs/ no GitHub Pages.

A pesquisa está em [research.md](research.md); decisões de ciclo de vida, acessibilidade
e testes foram verificadas com documentação primária. Este plano encerra as fases 0 e 1,
sem implementar funcionalidades, instalar dependências ou publicar o site.

## Technical Context

**Language/Version**: HTML, CSS e JavaScript ES2022 com ES modules; Node.js 24.x para
ferramentas e testes, não para produção. Ambiente observado: Node 24.21.0, npm 11.19.0.

**Primary Dependencies**: zero em execução. Somente desenvolvimento:
@playwright/test, @axe-core/playwright e http-server. Fixar versões compatíveis exatas
na implementação e versionar package-lock.json. Node oferece node:test e node:assert/strict.

**Storage**: catálogo local versionado e estado em memória; sem cookies da aplicação,
localStorage, sessionStorage, IndexedDB, contas ou banco de dados.

**Testing**: testes unitários de avaliação/transições; testes de integridade e conteúdo
das sete missões; E2E com Playwright; axe como apoio, mais teclado, leitor de tela,
texto ampliado, dispositivos reais e revisão pedagógica manual.

**Target Platform**: navegadores modernos com ES modules, controles nativos e dialog;
validar Chromium, Firefox e WebKit, além de navegador real de celular e tablet.
Larguras de referência: 360, 768 e 1280 px; texto a 200%.

**Project Type**: aplicação web estática de página única; navegação interna por estado,
sem rotas HTTP de aplicação, backend ou instalação pelo estudante.

**Performance Goals**: até 1 MiB de arquivos públicos sem compressão; p95 de atualização
visível até 100 ms em 30 transições no Chromium local após carregamento, sem throttling.
São metas técnicas a medir, não resultados já obtidos ou garantia em qualquer rede.

**Constraints**: GitHub Pages; sem credenciais, servidor próprio, dados pessoais reais,
telemetria, CDN, recursos externos ou comunicação com redes sociais/jogos reais.
Progresso não é salvo. Acesso inicial requer rede; offline não é garantido.

**Scale/Scope**: 7 missões, 3 perguntas por missão, 21 respostas, 3 dimensões e um
resultado final; conteúdo em pt-BR. Uma pessoa usa cada tentativa sem identificação;
não há sessão de servidor, coordenação entre usuários, painel docente ou ranking.

## Constitution Check

Avaliação pré-pesquisa: oito princípios compatíveis com a especificação e com a proposta
estática; nenhum desvio identificado. Reavaliação após o desenho da fase 1:

| Princípio obrigatório | Evidência no desenho | Pré-fase 0 | Pós-fase 1 |
| --- | --- | --- | --- |
| I. Alinhamento à BNCC Computação | Mission.skill = EF08CO08; objetivos e avaliação nas três dimensões; público preservado. | PASS | PASS |
| II. Situações contextualizadas | Catálogo dos sete roteiros, perfis/chats/postagens fictícios; contexto permanece consultável. | PASS | PASS |
| III. Feedback pedagógico | Síntese de dado, risco e proteção mais explicações de seleções e omissões. | PASS | PASS |
| IV. Progressão | Ordens 1–7, quatro etapas, desafio final integrado, avanço independente de acerto. | PASS | PASS |
| V. Linguagem e interface | pt-BR, revisão para o 8º ano e matriz computador/tablet/celular. | PASS | PASS |
| VI. Acessibilidade e usabilidade | Controles nativos, foco, equivalência textual e revisão automática/manual. | PASS | PASS |
| VII. Segurança por design | Sem dados reais, campos livres, persistência ou envio; estado transitório e dados fictícios. | PASS | PASS |
| VIII. Simplicidade e verificabilidade | Arquivos estáticos em docs/, funções testáveis, dependências somente de desenvolvimento. | PASS | PASS |

**Regras adicionais**: IDENTIFIQUE → AVALIE → DECIDA → ENTENDA preservada;
respostas erradas não bloqueiam; resultado por dimensão sem pontuação agregada.
Nenhuma alteração constitucional proposta.

**Limite de hospedagem**: o requisito de não coleta é aplicado ao código e às integrações
da aplicação. GitHub Pages mantém registros próprios de acesso; research.md documenta
essa característica e sua fonte. O desenho não promete que o provedor não registre IPs.
Não há integração do aplicativo com esses registros nem inclusão de respostas neles.

**Resultado do gate**: PASS de desenho, sem exceções. Isso não equivale a testes do
produto aprovados; a implementação deverá produzir as evidências de quickstart.md.

## Project Structure

### Documentation (this feature)

```text
specs/001-missoes-protecao-dados/
├── spec.md
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── ui-contract.md
└── checklists/
    └── requirements.md
```

tasks.md será produzido por $speckit-tasks; não faz parte desta entrega de planejamento.

### Source Code (repository root)

Estrutura proposta para a implementação, ainda não criada:

```text
docs/
├── .nojekyll
├── index.html
├── assets/
│   ├── styles.css
│   └── illustrations/
└── js/
    ├── app.js
    ├── catalog-validation.js
    ├── state.js
    ├── evaluation.js
    ├── view.js
    └── content/
        └── missions.js
tests/
├── unit/
│   ├── state.test.js
│   └── evaluation.test.js
├── content/
│   ├── missions.test.js
│   └── budget.test.js
└── e2e/
    ├── journey.spec.js
    ├── lifecycle.spec.js
    ├── accessibility.spec.js
    ├── privacy.spec.js
    ├── deployment.spec.js
    └── performance.spec.js
package.json
package-lock.json
playwright.config.js
README.md
```

**Structure Decision**: docs/ é tanto a origem do site quanto a pasta publicável;
testes e ferramentas ficam fora dela. Não há bundle, API, migração ou artefato de build.
package.json define type=module para importar o mesmo domínio nos testes.
As ilustrações são locais, leves e acompanhadas de descrição; fontes são do sistema.

## Complexity Tracking

Nenhuma violação constitucional a justificar. As três dependências de desenvolvimento
atendem verificação de navegador, acessibilidade e serviço HTTP local; não são carregadas
pelo estudante. A revisão de complexidade permanece obrigatória para dependências futuras.

## Phase 0 — Research concluída

- Escolhas e alternativas registradas em research.md: módulos nativos, publicação,
  privacidade, conteúdo/avaliação, acessibilidade, testes, desempenho e ciclo de vida.
- Pesquisa delegada delimitada a BFCache e transições repetidas; recomendações integradas.
- Todas as decisões técnicas necessárias foram resolvidas. Não há pendências de
  esclarecimento que impeçam a decomposição em tarefas.

## Phase 1 — Design concluído

### Responsabilidades e fluxo

1. app.js carrega e valida o catálogo antes de liberar início; conecta eventos e ciclo de vida.
2. missions.js contém apenas dados pedagógicos revisáveis, sem lógica de pontuação.
3. catalog-validation.js verifica estrutura, referências e completude das alternativas.
4. state.js aplica transições e tokens de origem; não acessa DOM, rede ou armazenamento.
5. evaluation.js compara conjuntos e produz feedback/resultados sem alterar respostas.
6. view.js usa elementos semânticos e texto seguro para refletir o estado, gerir foco
   e apresentar confirmação de reinício. Não decide regras de adequação.

O [modelo de dados](data-model.md) define campos, invariantes e transições.
O [contrato de interface](contracts/ui-contract.md) define os estados públicos e
comportamentos de interação. Não se aplica contrato de endpoints, pois não há serviço.

### Proteção contra inconsistências

Toda ação leva geração, revisão, missão e etapa de origem; a transição aceita consome
esse contexto sincronicamente. Botões antigos são desativados/aposentados, e novas
perguntas começam sem seleção. Uma resposta só é gravada uma vez por missão/dimensão.
Resultado deriva dos 21 registros; não manter um contador paralelo sujeito a duplicação.

Inicialização sempre cria estado vazio. Limpar em pagehide e reiniciar na restauração
BFCache; mudança de aba não reinicia. Reinício confirmado abre Missão 1; recarga abre
a introdução. Não depender de limpeza no encerramento forçado do processo.

### Validação e entrega

[quickstart.md](quickstart.md) contém os comandos previstos e os cenários reproduzíveis.
npm test cobre domínio/conteúdo; Playwright cobre jornadas e limites do navegador;
revisão manual verifica linguagem, feedback e acessibilidade que automação não comprova.
Casos totalmente corretos, totalmente incorretos e mistos têm resultados conhecidos.

A publicação futura será pela branch de entrega e /docs no GitHub Pages, após validação.
Testar previamente raiz e prefixo /docs/, depois repetir no prefixo real do repositório.
Nenhum comando de publicação, commit ou criação de branch foi executado nesta etapa.

## Handoff para tarefas

Decompor em fundação estática e testes de domínio, catálogo das sete missões,
jornada completa, resultado/reinício, acessibilidade, privacidade/ciclo de vida e
validação de publicação. Todas as histórias obrigatórias compõem a entrega final,
independentemente da ordem incremental de construção. Usar $speckit-tasks para gerar
a sequência executável a partir destes artefatos.
