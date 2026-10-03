# Data Model: Missão: Proteja seus Dados

**Data**: 2026-10-02
**Referências**: [spec.md](spec.md), [research.md](research.md).

## Separação de dados

O catálogo pedagógico é público, imutável durante a tentativa e entregue com o site.
O estado da tentativa é transitório e restrito à memória do documento.
Nenhuma entidade representa estudante, turma, identidade, dispositivo ou conta.
IDs identificam conteúdo, nunca pessoas. Não guardar horários, IPs ou identificadores de sessão.

## Catálogo

### Mission

| Campo | Tipo | Regra |
| --- | --- | --- |
| id | string | Estável e único: mission-1 até mission-7. |
| order | inteiro | 1 a 7, sem lacunas ou duplicações. |
| title | string | Título do roteiro em português. |
| objective | string | Objetivo verificável ligado à EF08CO08. |
| skill | string | Exatamente EF08CO08. |
| complexity | string | Explica o acréscimo de complexidade em relação à missão anterior. |
| context | Scenario | Contexto fictício consultável em todas as etapas. |
| personalData | PersonalDatum[] | Dados e pistas pessoais analisados no contexto. |
| risks | Risk[] | Riscos relacionados aos dados ou às combinações. |
| questions | Question[3] | Ordem identify, assess, decide. |
| synthesis | objeto | dataExplanation, riskExplanation, protectionExplanation, todos não vazios. |
| integratedMissionIds | string[] | Missão 7 referencia missões 1 a 6; nas demais, vazio. |

Cada missão termina em ENTENDA, que deriva das respostas e não cria uma quarta pergunta.
Validar os sete roteiros contra os aceites de conteúdo de spec.md, não apenas contar campos.

### Scenario

| Campo | Tipo | Regra |
| --- | --- | --- |
| kind | enum | social-profile, game-chat, social-post, game-offer ou combined. |
| introduction | string | Contextualização curta e indicação de simulação. |
| elements | ScenarioElement[] | Elementos ordenados; IDs únicos no contexto. |

ScenarioElement contém id, kind (profile, message, post, offer ou illustration),
text e, opcionalmente, assetPath e description. Ilustrações informativas exigem descrição
das mesmas pistas visuais. assetPath é relativo e local; nenhuma URL de terceiro,
HTML arbitrário, link discável ou controle com efeito fora da aplicação.

### PersonalDatum e Risk

PersonalDatum contém id, label, category (identification, contact, location, routine,
credential ou linking-clue) e elementIds não vazios, todos existentes no contexto.
As categorias são pedagógicas, não uma classificação jurídica de dados sensíveis.

Risk contém id, explanation e datumIds não vazios que referenciam PersonalDatum.
Um risco combinado referencia dois ou mais dados e explica a associação.
Elementos distratores não precisam corresponder a um dado pessoal.

### Question e Option

| Campo de Question | Tipo | Regra |
| --- | --- | --- |
| id | string | Único no catálogo. |
| dimension | enum | identify, assess ou decide. |
| prompt | string | Instrução específica da etapa. |
| selectionMode | enum | multiple para identify/assess; single para decide. |
| options | Option[] | Pelo menos duas; IDs únicos na pergunta. |
| expectedOptionIds | string[] | Não vazio; IDs existentes; exatamente um em decide. |

Option contém id, label, elementIds, datumIds, riskIds e explanation.
Referências podem ser vazias para distratores, mas, quando presentes, devem existir.
explanation contém whenSelected e whenOmitted: explica a seleção adequada/indevida e,
para opção esperada omitida, o que faltou. Não criar combinações exponenciais de feedback.
A síntese da missão apresenta sempre a decisão adequada, mesmo quando o estudante acerta.

No mínimo uma alternativa não esperada por pergunta; nunca fornecer um formulário
livre. Uma eventual opção explícita “nenhum destes” deve ser exclusiva e não combinar
com outras seleções. Os roteiros atuais têm dados/riscos a identificar e não precisam dela.

## Estado transitório

### AttemptState

| Campo | Tipo | Regra |
| --- | --- | --- |
| screen | enum | welcome, mission, result ou error. |
| missionIndex | inteiro ou null | 0 a 6 em mission; null na abertura. |
| stage | enum ou null | identify, assess, decide ou understand. |
| draftOptionIds | string[] | Seleção editável somente da pergunta atual; inicia vazia. |
| answers | AnswerRecord[] | No máximo 21; chave única missionId + dimension. |
| completedMissionIds | string[] | Prefixo ordenado de mission-1 a mission-7. |
| generation | inteiro | Incrementado em todo reset para invalidar eventos antigos. |
| revision | inteiro | Incrementado em transição aceita e na abertura/saída de confirmação de reinício. |
| restartPromptOpen | boolean | Suspende ações do percurso enquanto a confirmação está aberta. |
| validationMessage | string ou null | Orientação de omissão; não é resposta nem erro pedagógico. |

Não serializar AttemptState. Não colocá-lo em window global, URL, history.state, logs,
cookies, localStorage, sessionStorage, IndexedDB ou requisições.

### AnswerRecord

missionId, questionId, dimension e selectedOptionIds. Cópia dos IDs confirmados,
sem mutação após aceite e sem timestamp. Chave única por missão/dimensão.
A adequação é derivada da comparação com o catálogo, não um valor recebido da interface.

### Evaluation e DimensionResult

Evaluation é derivada: adequate (boolean), matchedOptionIds, missingOptionIds e
extraOptionIds. adequate requer igualdade de conjuntos, independentemente da ordem.
Resposta vazia não produz Evaluation nem AnswerRecord.

DimensionResult contém dimension, adequateCount (0–7), total (7), adequateMissionIds,
reviewMissionIds e guidance. Só existe quando as sete missões estão concluídas.
Contagens 0, 1–6 e 7 seguem as regras descritivas de spec.md. Não há total agregado.

## Transições e invariantes

Toda ação carrega token de origem {generation, revision, missionId, stage}.
O controlador compara o token com o estado, verifica pré-condições e efetiva a alteração
sincronicamente. Ação com token antigo, missão errada ou etapa incompatível é ignorada.

| Origem | Ação e pré-condição | Destino/efeito |
| --- | --- | --- |
| welcome | iniciar, catálogo válido | mission-1 / identify, sem seleção. |
| identify ou assess | selecionar | Atualiza rascunho, sem gravar resposta. |
| identify ou assess | confirmar seleção não vazia | Grava uma resposta; próxima etapa, rascunho vazio. |
| decide | confirmar seleção única | Grava decisão; understand com feedback das três dimensões. |
| pergunta | confirmar sem seleção | Permanece na etapa, orientação acessível; nenhuma resposta gravada. |
| understand, missão 1–6 | continuar | Marca missão concluída; próxima missão / identify. |
| understand, missão 7 | ver resultado | Marca missão concluída; result, exatamente 21 respostas. |
| mission ou result | pedir reinício | Abre confirmação; invalida tokens anteriores; preserva tentativa. |
| confirmação | cancelar | Fecha confirmação; preserva tentativa; gera novos tokens. |
| confirmação | confirmar reinício | Limpa tentativa e interface; nova geração; mission-1 / identify. |
| qualquer | novo documento ou restauração BFCache | welcome vazio; nenhuma retomada. |
| carregamento | catálogo inválido | error, sem perguntas ou resultados parciais. |

O resultado não depende de quantidade de acertos. Não permitir confirmação de resposta
já registrada, passagem direta a result ou conclusão de missão anterior às três respostas.
Reset invalida callbacks pendentes. pagehide limpa estado e DOM; pageshow.persisted
reinicializa a abertura. Troca de abas preserva a tentativa. Não depender de unload.
Os limites do ciclo de vida e da hospedagem estão em research.md.

## Validação prevista

- Catálogo: IDs, contagem, ordem, referências, alternativas, explicações e mídia local.
- Conteúdo: presença das pistas, resposta esperada e feedback nos sete roteiros.
- Domínio: conjuntos exatos, respostas parciais, IDs inválidos, ordenação e duplicações.
- Estado: 21 confirmações, 7 conclusões, token obsoleto, reinício e restauração.
- Privacidade: nenhuma gravação ou envio do estado; fixtures contêm somente dados fictícios.
