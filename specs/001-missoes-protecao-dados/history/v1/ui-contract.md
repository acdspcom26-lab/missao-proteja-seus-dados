# UI Contract: experiência educacional

**Versão do contrato**: 1.0.0
**Base**: [spec.md](../spec.md), [data-model.md](../data-model.md).
A interface pública é visual e acessível; não há API HTTP de negócio.

## Entrada e publicação

Uma única página index.html, acessível na raiz local e em subdiretório de projeto.
Recursos e imports usam caminhos relativos. A aplicação não altera a URL conforme
missão, etapa ou resposta. Nenhum botão simulado publica, envia dados ou abre serviços reais.
O site distribuído contém apenas arquivos de docs/; sem endpoints, segredos ou dependências
de rede externas. Navegação de etapas ocorre dentro do documento.

## Estados e ações observáveis

| Estado | Conteúdo obrigatório | Ações |
| --- | --- | --- |
| Abertura | Título, objetivo EF08CO08 em linguagem do público, 7 missões, ficção e progresso não salvo. | Começar missão. |
| IDENTIFIQUE | Missão X de 7, etapa 1 de 4, situação e pergunta com opções múltiplas. | Selecionar, confirmar identificação, reiniciar. |
| AVALIE | Etapa 2 de 4, mesma situação e opções múltiplas de riscos. | Selecionar, confirmar avaliação, reiniciar. |
| DECIDA | Etapa 3 de 4, mesma situação e alternativas de ação única. | Selecionar, confirmar decisão, reiniciar. |
| ENTENDA | Etapa 4 de 4, respostas, dados, riscos e decisão explicados. | Próxima missão, ou ver resultado na missão 7; reiniciar. |
| Resultado | Três dimensões, cada X de 7 e orientação; exemplos e missões para revisão conforme acertos. | Reiniciar. |
| Confirmação de reinício | Explica descarte da tentativa. | Cancelar; reiniciar percurso. |
| Erro de carregamento | Mensagem compreensível, nenhuma conclusão inventada. | Recarregar. |

Na abertura, o aviso de progresso deve dizer que fechar, recarregar ou sair da página
inicia novo percurso; trocar de aba não apaga a tentativa.
A comunicação de privacidade afirma que a atividade não pede dados reais, sem prometer
ausência de registros do provedor de hospedagem. Uma nota de privacidade pode explicar
essa diferença sem interromper o fluxo pedagógico.

## Seleção, confirmação e feedback

- IDENTIFIQUE/AVALIE usam checkboxes e DECIDA usa radios, todos rotulados e agrupados
  por fieldset/legend. Alteração antes da confirmação não conta como tentativa.
- Confirmar sem seleção mantém contexto e foco útil, apresenta instrução textual
  associada ao grupo e anunciada; não registra erro pedagógico.
- Após confirmação, a resposta é imutável naquela tentativa. Não revelar o gabarito
  antes de ENTENDA nem exigir correção para avançar.
- ENTENDA apresenta a síntese e comentários de opções selecionadas e esperadas omitidas.
  Dados, riscos e justificativa da proteção aparecem em todos os percursos.
- Desativar imediatamente o botão confirmado; consumir seu token e aposentar o controle.
  Renderizar novo controle para a próxima etapa, com rascunho vazio, evitando que
  eventos repetidos de um controle antigo avancem o novo estado.
- Usar um único caminho de ativação por ação; não confirmar por pointerdown e click
  simultaneamente. Foco segue para o título da nova etapa.
- Reinício confirmado vai à Missão 1; cancelamento mantém etapa e seleção do rascunho.
  Retorno pelo histórico ou recarga vai à abertura.

## Acessibilidade e apresentação

- Documento em pt-BR, título de página, landmark principal e hierarquia de títulos.
- Controles operáveis por Tab, Shift+Tab, Espaço/Enter e padrões nativos dos grupos.
  Foco sempre visível e sem armadilhas.
- Confirmação de reinício em dialog nativo rotulado: foco inicial em Cancelar,
  Escape cancela, fechar restaura foco ao acionador; reset move foco para o título.
- Erros usam região de anúncio; progresso e feedback têm texto independente da cor.
  Evitar anunciar simultaneamente o texto inteiro e o foco no título.
- Imagem informativa tem descrição equivalente; ilustrações de pistas não podem
  revelar informação indispensável apenas visualmente.
- Fonte base de pelo menos 16 px, contraste de texto de pelo menos 4,5:1, controles
  com área de acionamento de pelo menos 44 × 44 px como metas do projeto.
- Verificar 360, 768 e 1280 px de largura, ampliação de texto de 200%, orientação
  retrato/paisagem e ausência de rolagem horizontal ou sobreposição impeditiva.
- Sem áudio ou animação obrigatórios; respeitar preferência por movimento reduzido.
- Conteúdo fictício inserido como texto/elementos controlados, nunca como HTML remoto.

## Falhas e limites

Se JavaScript estiver desativado, mostrar explicação em noscript; o fluxo requer JavaScript.
HTML inicial mantém mensagem de carregamento/recarga se módulo falhar. Catálogo inválido
não libera uma atividade incompleta. As sete missões e recursos são carregados antes de
habilitar o início; desconexão posterior não deve inventar respostas. Offline não é garantia.

A ausência de coleta refere-se ao código da aplicação, não aos registros de segurança
do provedor descritos em research.md. Navegação normal de arquivos estáticos é necessária.

## Mapeamento de verificação

| Contrato | Requisitos | Evidência |
| --- | --- | --- |
| Abertura e simulação | FR-001, FR-003, FR-004, FR-014 | Acesso sem identificação; revisão pedagógica. |
| Estados e ordem | FR-002, FR-005, FR-011, FR-012, FR-024 | Percursos com 21 respostas, incluindo todos os erros. |
| Seleção e feedback | FR-006–FR-010, FR-013, FR-022 | Adequadas, parciais, indevidas e vazias; ENTENDA coerente. |
| Resultado e reinício | FR-016–FR-018 | Fixtures 7/7, 0/7 e mistas; cancelar/confirmar. |
| Acessibilidade | FR-019–FR-021 | Teclado, toque, leitura, texto ampliado e avaliação manual. |
| Ciclo de vida e publicação | FR-015, FR-023 | Recarga, BFCache, ausência de gravação/envio e subdiretório. |
