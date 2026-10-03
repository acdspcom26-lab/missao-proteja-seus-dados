<!--
Sync Impact Report
Version change: template sem versão adotada → 1.0.0 (adoção inicial).
Modified principles: os cinco espaços genéricos do template foram substituídos pelos
oito princípios obrigatórios definidos para o projeto:
1. ALINHAMENTO À BNCC COMPUTAÇÃO
2. APRENDIZAGEM POR SITUAÇÕES CONTEXTUALIZADAS
3. FEEDBACK PEDAGÓGICO
4. PROGRESSÃO DA APRENDIZAGEM
5. LINGUAGEM E INTERFACE ADEQUADAS
6. ACESSIBILIDADE E USABILIDADE
7. SEGURANÇA POR DESIGN
8. SIMPLICIDADE TÉCNICA E VERIFICABILIDADE
Added sections: Contexto e regras pedagógicas; Fluxo de desenvolvimento e verificação;
regras concretas de governança.
Removed sections: nenhuma seção de governança previamente adotada.
Follow-up TODOs: nenhum. Nenhum placeholder foi mantido.
Escopo da atualização: somente .specify/memory/constitution.md.
Este relatório é temporário e deve ser removido antes do commit da constituição.
-->

# Missão: Proteja seus Dados Constitution

## Core Principles

### I. ALINHAMENTO À BNCC COMPUTAÇÃO

Toda interação DEVE contribuir diretamente para o desenvolvimento da habilidade EF08CO08
da BNCC Computação: “Distinguir os tipos de dados pessoais que são solicitados em espaços
digitais e os riscos associados”. A atividade principal DEVE levar o estudante do 8º ano
do Ensino Fundamental a distinguir dados pessoais e avaliar os riscos associados.
Cada missão DEVE explicitar essa contribuição em seus objetivos e critérios de aceitação.

### II. APRENDIZAGEM POR SITUAÇÕES CONTEXTUALIZADAS

As atividades DEVEM utilizar situações simuladas próximas da realidade dos estudantes,
especialmente redes sociais e jogos online. O estudante DEVE identificar dados pessoais
presentes ou solicitados na situação, avaliar os riscos e decidir como agir naquele contexto.
A aplicação NÃO DEVE se limitar a um quiz tradicional: cada atividade DEVE apresentar uma
situação contextualizada que dê sentido à análise dos dados e à decisão de proteção.

### III. FEEDBACK PEDAGÓGICO

Após cada situação, a aplicação DEVE apresentar feedback pedagógico explicativo,
independentemente do acerto. O feedback DEVE explicar qual dado pessoal está envolvido,
qual é o possível risco e por que determinada decisão é adequada.
O feedback NÃO DEVE apresentar somente “certo” ou “errado”. Quando houver erro, DEVE
explicar o problema da decisão e orientar uma alternativa de proteção, transformando
o erro em oportunidade de aprendizagem.

### IV. PROGRESSÃO DA APRENDIZAGEM

A aplicação DEVE conter exatamente 7 missões, organizadas de situações mais simples
para situações mais complexas. A Missão 7 DEVE funcionar como desafio final integrador,
articulando identificação de dados pessoais, avaliação de riscos e decisões de proteção.
A especificação de cada missão DEVE descrever sua complexidade e sua contribuição para
a progressão. Respostas incorretas NÃO DEVEM impedir o avanço.

### V. LINGUAGEM E INTERFACE ADEQUADAS

A aplicação DEVE utilizar linguagem clara e apropriada para estudantes do 8º ano do
Ensino Fundamental. As instruções DEVEM indicar a tarefa e a próxima ação de forma
compreensível para esse público. A interface DEVE ser simples, intuitiva e responsiva
para computador, tablet e celular, preservando acesso ao conteúdo e às ações em cada formato.

### VI. ACESSIBILIDADE E USABILIDADE

A aplicação DEVE garantir boa legibilidade, navegação simples e botões identificáveis.
Informações importantes NÃO DEVEM depender exclusivamente de cores, sons ou animações;
DEVEM contar com texto ou outro recurso acessível que transmita o mesmo significado.
As ações essenciais DEVEM ser utilizáveis por teclado, com foco visível e rótulos
compreensíveis. A verificação DEVE abranger leitura das instruções, identificação das
ações, navegação e compreensão do feedback nos formatos de tela previstos.

### VII. SEGURANÇA POR DESIGN

A aplicação NÃO DEVE solicitar, coletar ou armazenar dados pessoais reais dos estudantes.
Nomes, perfis, mensagens e situações utilizados nas simulações DEVEM ser fictícios.
As interações DEVEM permitir a realização das atividades sem informar dados reais.
Qualquer mecanismo de progresso ou resultado DEVE respeitar essa proibição, inclusive
em armazenamento local, registros e integrações externas. A experiência DEVE ensinar
proteção de dados sem expor o estudante aos riscos que apresenta.

### VIII. SIMPLICIDADE TÉCNICA E VERIFICABILIDADE

A aplicação DEVE funcionar como site estático no GitHub Pages, sem servidor próprio,
banco de dados ou credenciais expostas. As funcionalidades DEVEM ser verificáveis e
testáveis por critérios de aceitação explícitos. As escolhas técnicas DEVEM se limitar
ao necessário para cumprir os requisitos pedagógicos e de interface, com justificativa
para dependências adicionais. O funcionamento publicado DEVE ser verificado no ambiente
estático previsto, incluindo navegação e carregamento dos recursos.

## Contexto e regras pedagógicas

O projeto “Missão: Proteja seus Dados” é uma aplicação web educacional para estudantes
do 8º ano do Ensino Fundamental. Seu objetivo é desenvolver a habilidade EF08CO08
por meio de situações simuladas de redes sociais e jogos online, com análise de dados
pessoais, avaliação de riscos, decisões de proteção e feedback pedagógico explicativo.

Cada uma das 7 missões DEVE seguir, nesta ordem, a sequência
**IDENTIFIQUE → AVALIE → DECIDA → ENTENDA**:

1. **IDENTIFIQUE**: distinguir os dados pessoais presentes ou solicitados na situação.
2. **AVALIE**: analisar os riscos associados aos dados e ao contexto apresentado.
3. **DECIDA**: escolher como agir diante da situação e dos riscos identificados.
4. **ENTENDA**: receber a explicação do dado envolvido, do risco e da decisão adequada.

Respostas incorretas NÃO DEVEM bloquear o avanço nem exigir acerto para liberar a próxima
missão. O feedback explicativo DEVE permanecer parte do percurso após o erro.
A Missão 7 DEVE integrar os aprendizados das missões anteriores e preservar essa sequência.

A pontuação DEVE ser um elemento secundário. O resultado final DEVE priorizar e apresentar
separadamente as três dimensões de aprendizagem:

- identificação de dados pessoais;
- avaliação de riscos;
- decisões de proteção.

Um total de pontos NÃO DEVE substituir a devolutiva nessas três dimensões. Os critérios de
avaliação DEVEM relacionar as respostas a cada dimensão sem solicitar identificação real
do estudante.

## Fluxo de desenvolvimento e verificação

Toda especificação, plano e conjunto de tarefas DEVE respeitar esta constituição.
Antes da implementação de uma missão, sua especificação DEVE registrar o contexto fictício,
o objetivo ligado à EF08CO08, a posição na progressão, as quatro etapas pedagógicas,
os riscos trabalhados e o feedback previsto para decisões adequadas e inadequadas.

Cada alteração DEVE incluir critérios de aceitação e evidências de verificação compatíveis
com seu impacto. A revisão pedagógica e técnica DEVE verificar:

- público do 8º ano, alinhamento à EF08CO08, exatamente 7 missões e desafio final integrador;
- sequência IDENTIFIQUE → AVALIE → DECIDA → ENTENDA em todas as missões;
- feedback explicativo após cada situação e avanço permitido após respostas incorretas;
- resultado final nas três dimensões, com pontuação secundária;
- linguagem, legibilidade, navegação e acesso às ações em computador, tablet e celular;
- acesso por teclado e compreensão de informações sem depender só de cor, som ou animação;
- uso de dados fictícios e ausência de solicitação, coleta ou armazenamento de dados reais;
- funcionamento estático no GitHub Pages, sem servidor próprio, banco de dados ou credenciais.

Os fluxos funcionais DEVEM ser verificados por testes automatizados quando aplicável e
por roteiros manuais reproduzíveis para aspectos pedagógicos, visuais e de interação.
Os registros DEVEM indicar o que foi verificado, o resultado e eventuais falhas.
Uma entrega NÃO DEVE ser considerada concluída enquanto houver descumprimento destes
critérios. Complexidade adicional DEVE ser justificada no plano antes de sua implementação.

## Governance

Esta constituição tem precedência sobre especificações, planos, tarefas e decisões de
implementação do projeto. Os oito princípios e as regras pedagógicas são obrigatórios;
documentos derivados NÃO DEVEM alterar implicitamente o público, a habilidade EF08CO08,
a quantidade de missões ou a estrutura pedagógica aqui definida.

Qualquer emenda DEVE registrar a mudança proposta, sua justificativa, os impactos
pedagógicos e técnicos e os documentos afetados. A pessoa responsável pelo projeto DEVE
aprovar explicitamente a emenda antes de sua adoção. Quando houver impacto em trabalho
existente, a emenda DEVE incluir um plano de adequação.

O versionamento DEVE seguir MAJOR.MINOR.PATCH: MAJOR para remoções ou redefinições
incompatíveis de princípios ou governança; MINOR para novos princípios, seções ou ampliação
material de diretrizes; PATCH para esclarecimentos e correções sem mudança de significado.
Cada emenda DEVE atualizar a versão e a data de última alteração, preservando a data de
ratificação original. As datas DEVEM utilizar o formato YYYY-MM-DD.

Toda revisão de especificação, plano e entrega DEVE registrar a conformidade com a
constituição e resolver divergências antes da aprovação. Requisitos incompatíveis DEVEM
ser corrigidos ou submetidos ao procedimento formal de emenda; decisões isoladas de
implementação NÃO DEVEM criar exceções aos princípios.

**Version**: 1.0.0 | **Ratified**: 2026-10-02 | **Last Amended**: 2026-10-02
