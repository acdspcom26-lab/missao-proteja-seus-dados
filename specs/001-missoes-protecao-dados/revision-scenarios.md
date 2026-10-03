# Revisão dos cenários — 2026-10-03

Pedido explícito da responsável: aproximar a experiência da referência visual anexada,
com simulação à esquerda e desafio à direita; no celular, cenário antes do desafio.
Esta revisão sucede `revision-v2.md`. A especificação e o catálogo imediatamente
anteriores estão em `history/v2/`; a versão de sete missões permanece em `history/v1/`.

| Missão atual | Reutilização pedagógica | Representação |
| --- | --- | --- |
| 1 — Identificar: o convite do baú lendário | Oferta da missão 2 da V2, originalmente missão 4 da V1 | Ilha Pixel: paisagem, lobby, chat, recompensa, endereço, telefone, senha e urgência. |
| 2 — Avaliar: a rotina no feed | Postagem da missão 3 da V2, originalmente missão 5 da V1 | Conecta+: audiência pública, praça, horário, marcação, comentários e solicitação recebida. |
| 3 — Decidir: o contato desconhecido | Conversa da missão 2 da V1, alternativa equivalente autorizada no pedido | Mensagem privada pedindo escola e horário; remetente desconhecido com perfil fictício. |
| 4 — Desafio final: proteja a personagem | Integração existente da V2 | Evento com item raro, urgência, perfil, postagem, pistas de imagem e pedido de senha. |

Não se trata de quatro etapas isoladas: cada missão mantém IDENTIFICAR → AVALIAR →
DECIDIR → APRENDER e três respostas. Erros não bloqueiam. Resultados continuam em três
dimensões independentes. XP, sons, estado, progresso e regras de avaliação foram preservados.
A Constitution não foi alterada nesta revisão. `spec.md` recebeu somente o alinhamento
dos cenários explicitamente solicitados; não houve flexibilização de requisitos para
acomodar o código.

`docs/js/scenarios.js` cuida exclusivamente da apresentação. Lobby/amizades/loja/eventos
exibem informações locais sem esconder as pistas. Curtir, comentários, alcance e perfil
do remetente são simulações sem envio, compra, cadastro ou alteração de respostas/XP.
Não existem campos livres. SVGs locais representam avatares, ilha e assistente.

O HUD mostra XP, progresso e missão; a indicação Explorador Digital é decorativa,
sem criar níveis calculados ou outra avaliação. Ícones complementam texto, controles
possuem estado acessível e o foco permanece visível. Ao entrar em cada missão, a
rolagem começa no cenário, inclusive no celular.

Evidências e pendências: `validation.md` e `validation-performance.md`.
