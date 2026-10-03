# Revisão 2 — avaliação do primeiro protótipo

**Seguimento**: o mapeamento desta revisão foi posteriormente reorganizado pelo pedido
de cenários visuais. Consulte [revision-scenarios.md](revision-scenarios.md) para a ordem
vigente; este documento preserva a justificativa original da redução e as regras de XP.

**Data**: 2026-10-03. **Autorização**: pedido explícito da responsável nesta conversa, após testar a primeira versão. **Constitution**: emenda 2.0.0.

## Decisão e justificativa

A especificação e a primeira implementação previam sete missões e 21 desafios. O teste da versão 1 indicou um percurso cansativo e longo para uso e demonstração. Esta revisão reduz o percurso para quatro missões e 12 desafios, melhorando duração e dinamismo sem alterar EF08CO08, público do 8º ano, segurança por design ou as três dimensões pedagógicas. O ciclo é IMPLEMENTAR → TESTAR → AVALIAR → AJUSTAR → TESTAR NOVAMENTE.

Os documentos e o catálogo anteriores foram preservados em `history/v1/`. São registro histórico, não requisitos vigentes. A revisão não afirma que novos testes já passaram.

## Reorganização

| Nova missão | Foco predominante | Conteúdo reaproveitado |
| --- | --- | --- |
| 1 — Identificar: o perfil que conta demais | Reconhecer dados pessoais | Antiga 1: nome, telefone e interesse genérico em perfil fictício. |
| 2 — Avaliar: o prêmio pede informação demais | Perceber riscos | Antiga 4: recompensa que solicita endereço, telefone e senha, em jogo fictício. |
| 3 — Decidir: quem vai ver essa postagem? | Escolher proteção | Antiga 5: rotina, dados de terceiros, autorização e audiência. |
| 4 — Desafio final: proteja a personagem | Integrar as três dimensões | Antiga 7, com pistas de imagem da 3, rotina/contato desconhecido da 2 e associação entre perfis da 6. |

Todas mantêm IDENTIFICAR → AVALIAR → DECIDIR → APRENDER, com três respostas e feedback obrigatório. Foco predominante não elimina nenhuma dimensão. Cada dimensão apresenta X de 4 respostas adequadas. Erros nunca bloqueiam avanço.

## XP e feedback

- 50 XP por identificação adequada, 50 por avaliação adequada, 100 por decisão adequada; 25 XP por concluir cada missão, mesmo com erros. Máximo: 900 XP; percurso todo incorreto: 100 XP.
- XP é derivado das respostas únicas e conclusões, sem contador paralelo, persistência, ranking, aprovação ou desbloqueio por pontos.
- Para não antecipar o gabarito, XP por acerto e feedback são revelados apenas em APRENDER. O bônus de conclusão é aplicado ao continuar; não pode ser duplicado.
- Três cartões de feedback, um por dimensão, cada um com preferencialmente uma ou duas frases curtas. O cartão distingue resposta adequada, omissões e escolhas indevidas, sem repetir explicações extensas.
- Resultado mantém as três dimensões em destaque; XP é um elemento secundário de motivação.

## Interface e áudio

Tema escuro, destaques ciano/lima/violeta moderados, HUD sem nome de estudante, progresso textual e visual, ícones locais e simulações fictícias Conecta/Ilha Pixel. Microinterações curtas; prefers-reduced-motion remove movimento não essencial.

Áudio sintetizado localmente com Web Audio, sem arquivos externos ou dependências. Som começa desligado e só é habilitado por gesto explícito. Botão visível com estado acessível; preferência apenas em memória. Seleção, acerto, alerta, XP, conclusão de missão e percurso têm sinais curtos; nenhum significado depende de áudio. Falta de suporte/erro de áudio não interrompe o jogo.

## Plano de adequação

1. Arquivar versão 1 e emendar apenas os requisitos afetados (quantidade, nomes das etapas, feedback, XP, áudio e visual).
2. Atualizar catálogo, contratos, estado, resultados e testes para quatro missões/12 respostas.
3. Implementar HUD, simulações, feedback breve, gamificação e áudio local.
4. Testar novamente percursos corretos, incorretos e mistos, XP sem duplicação, som, teclado, redução de movimento, privacidade, responsividade e prefixo GitHub Pages.
5. Registrar evidências e manter explícitas as pendências de ambiente, dispositivos reais, revisão externa e publicação.
