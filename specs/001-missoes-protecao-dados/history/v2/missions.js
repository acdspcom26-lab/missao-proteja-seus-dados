// Revisão 2: quatro missões; proveniência e catálogo V1 em specs/.../history/v1/.
export const missions = [
  {
    "id": "mission-1",
    "order": 1,
    "title": "Identificar: o perfil que conta demais",
    "skill": "EF08CO08",
    "objective": "Distinguir dados pessoais e avaliar riscos: Reconhecer dados explícitos de identificação e contato.",
    "complexity": "Reconhecer dados explícitos de identificação e contato.",
    "context": {
      "kind": "social-profile",
      "introduction": "Lia está montando seu perfil na rede fictícia Conecta. Antes de deixar tudo público, ela pediu sua ajuda.",
      "elements": [
        {
          "id": "profile",
          "kind": "profile",
          "text": "Lia Estrela Inventada\n@lia.pixel • Perfil público\nNome completo: Lia Estrela Inventada\nTelefone: (XX) XXXXX-XXXX\nSobre mim: gosto de jogos de aventura."
        }
      ]
    },
    "personalData": [
      {
        "id": "name",
        "label": "Nome completo",
        "category": "identification",
        "elementIds": [
          "profile"
        ]
      },
      {
        "id": "phone",
        "label": "Telefone",
        "category": "contact",
        "elementIds": [
          "profile"
        ]
      }
    ],
    "risks": [
      {
        "id": "identify",
        "explanation": "O nome completo pode facilitar a identificação da personagem.",
        "datumIds": [
          "name"
        ]
      },
      {
        "id": "contact",
        "explanation": "O telefone exposto pode permitir contatos indesejados.",
        "datumIds": [
          "phone"
        ]
      }
    ],
    "questions": [
      {
        "id": "m1-identify",
        "dimension": "identify",
        "prompt": "Quais informações do perfil identificam Lia ou permitem entrar em contato com ela?",
        "selectionMode": "multiple",
        "expectedOptionIds": [
          "name",
          "phone"
        ],
        "options": [
          {
            "id": "name",
            "label": "Nome completo",
            "datumIds": [
              "name"
            ],
            "riskIds": [],
            "elementIds": [],
            "explanation": {
              "whenSelected": "O nome completo ajuda a identificar uma pessoa.",
              "whenOmitted": "Faltou o nome completo: ele pode identificar Lia."
            },
            "feedbackLabel": "nome completo"
          },
          {
            "id": "phone",
            "label": "Telefone",
            "datumIds": [
              "phone"
            ],
            "riskIds": [],
            "elementIds": [],
            "explanation": {
              "whenSelected": "O telefone permite contato direto e merece proteção.",
              "whenOmitted": "Faltou o telefone: ele abre um caminho de contato direto."
            },
            "feedbackLabel": "telefone"
          },
          {
            "id": "interest",
            "label": "Gostar de jogos de aventura",
            "datumIds": [],
            "riskIds": [],
            "elementIds": [],
            "explanation": {
              "whenSelected": "Neste contexto, esse interesse genérico não identifica Lia nem permite contato como um telefone.",
              "whenOmitted": "Um interesse genérico não equivale ao nome completo ou telefone."
            },
            "feedbackLabel": "interesse genérico"
          }
        ]
      },
      {
        "id": "m1-assess",
        "dimension": "assess",
        "prompt": "O que pode acontecer quando esses dados ficam públicos?",
        "selectionMode": "multiple",
        "expectedOptionIds": [
          "identify",
          "contact"
        ],
        "options": [
          {
            "id": "identify",
            "label": "Outras pessoas podem identificar Lia pelo nome",
            "datumIds": [
              "name"
            ],
            "riskIds": [
              "identify"
            ],
            "elementIds": [],
            "explanation": {
              "whenSelected": "O nome completo facilita ligar o perfil à pessoa.",
              "whenOmitted": "Considere que o nome completo facilita identificar Lia."
            },
            "feedbackLabel": "identificação"
          },
          {
            "id": "contact",
            "label": "Lia pode receber contatos indesejados",
            "datumIds": [
              "phone"
            ],
            "riskIds": [
              "contact"
            ],
            "elementIds": [],
            "explanation": {
              "whenSelected": "O telefone público pode chegar a pessoas com quem Lia não quer conversar.",
              "whenOmitted": "O telefone exposto pode ser usado para contatos indesejados."
            },
            "feedbackLabel": "contato indesejado"
          },
          {
            "id": "game",
            "label": "Gostar de aventura revela a senha do jogo",
            "datumIds": [],
            "riskIds": [],
            "elementIds": [],
            "explanation": {
              "whenSelected": "Uma preferência genérica não revela a senha. O risco aqui está nos dados de identificação e contato.",
              "whenOmitted": "A preferência por aventura não revela uma senha."
            },
            "feedbackLabel": "senha revelada por gosto"
          }
        ]
      },
      {
        "id": "m1-decide",
        "dimension": "decide",
        "prompt": "Qual versão do perfil reduz a exposição desnecessária?",
        "selectionMode": "single",
        "expectedOptionIds": [
          "protect"
        ],
        "options": [
          {
            "id": "protect",
            "label": "Usar um apelido e retirar nome completo e telefone",
            "datumIds": [
              "name",
              "phone"
            ],
            "riskIds": [],
            "elementIds": [],
            "explanation": {
              "whenSelected": "Retirar os dados desnecessários reduz a exposição, mantendo o interesse em jogos.",
              "whenOmitted": "A versão mais cuidadosa usa apelido e retira nome completo e telefone."
            },
            "feedbackLabel": "ação de proteção"
          },
          {
            "id": "phone",
            "label": "Retirar só o nome e manter o telefone",
            "datumIds": [
              "phone"
            ],
            "riskIds": [],
            "elementIds": [],
            "explanation": {
              "whenSelected": "O telefone ainda permite contato direto. Retire também esse dado.",
              "whenOmitted": "Manter o telefone mantém a possibilidade de contato indesejado."
            },
            "feedbackLabel": "telefone"
          },
          {
            "id": "keep",
            "label": "Manter tudo para encontrar mais amizades",
            "datumIds": [
              "name",
              "phone"
            ],
            "riskIds": [],
            "elementIds": [],
            "explanation": {
              "whenSelected": "Buscar amizades não exige publicar nome completo e telefone. Use a versão com menos dados.",
              "whenOmitted": "A vontade de conhecer pessoas não elimina os riscos de exposição."
            },
            "feedbackLabel": "manter os dados"
          }
        ]
      }
    ],
    "synthesis": {
      "dataExplanation": "Nome e telefone identificam ou permitem contato. Retire os dados desnecessários do perfil.",
      "riskExplanation": "Nome e telefone públicos facilitam identificação e contato indesejado.",
      "protectionExplanation": "Use apelido e retire nome completo e telefone para reduzir a exposição."
    },
    "integratedMissionIds": [],
    "focus": "identify",
    "sourceMissionNumbers": [
      1
    ],
    "shortFeedback": {
      "identify": "Nome e telefone identificam ou permitem contato. Retire os dados desnecessários do perfil.",
      "assess": "Nome e telefone públicos facilitam identificação e contato indesejado.",
      "decide": "Use apelido e retire nome completo e telefone para reduzir a exposição."
    }
  },
  {
    "id": "mission-2",
    "order": 2,
    "title": "Avaliar: o prêmio pede informação demais",
    "skill": "EF08CO08",
    "objective": "Distinguir dados pessoais e avaliar riscos: Avaliar múltiplos dados e uma credencial solicitados em troca de recompensa.",
    "complexity": "Avaliar múltiplos dados e uma credencial solicitados em troca de recompensa.",
    "context": {
      "kind": "game-offer",
      "introduction": "No jogo fictício Ilha Pixel, Téo recebeu esta oferta. Nenhum dado deve ser digitado: analise apenas a simulação.",
      "elements": [
        {
          "id": "offer",
          "kind": "offer",
          "text": "BAÚ LENDÁRIO GRÁTIS!\nOferta recebida por mensagem de um perfil desconhecido.\n“Para receber, envie seu endereço de casa, telefone e senha da conta.”\nRecompensa anunciada: 500 cristais virtuais."
        }
      ]
    },
    "personalData": [
      {
        "id": "address",
        "label": "Endereço",
        "category": "location",
        "elementIds": [
          "offer"
        ]
      },
      {
        "id": "phone",
        "label": "Telefone",
        "category": "contact",
        "elementIds": [
          "offer"
        ]
      },
      {
        "id": "password",
        "label": "Senha",
        "category": "credential",
        "elementIds": [
          "offer"
        ]
      }
    ],
    "risks": [
      {
        "id": "exposure",
        "explanation": "Endereço e telefone podem expor a pessoa a localização e contatos indesejados.",
        "datumIds": [
          "address",
          "phone"
        ]
      },
      {
        "id": "account",
        "explanation": "A senha pode permitir acesso indevido à conta.",
        "datumIds": [
          "password"
        ]
      }
    ],
    "questions": [
      {
        "id": "m2-identify",
        "dimension": "identify",
        "prompt": "Quais informações pessoais ou de acesso a oferta está pedindo?",
        "selectionMode": "multiple",
        "expectedOptionIds": [
          "address",
          "phone",
          "password"
        ],
        "options": [
          {
            "id": "address",
            "label": "Endereço de casa",
            "datumIds": [
              "address"
            ],
            "riskIds": [],
            "elementIds": [],
            "explanation": {
              "whenSelected": "O endereço indica onde a pessoa mora.",
              "whenOmitted": "Faltou o endereço de casa, que revela um local pessoal."
            },
            "feedbackLabel": "endereço"
          },
          {
            "id": "phone",
            "label": "Telefone",
            "datumIds": [
              "phone"
            ],
            "riskIds": [],
            "elementIds": [],
            "explanation": {
              "whenSelected": "O telefone permite contato direto.",
              "whenOmitted": "Faltou o telefone, que é um dado de contato."
            },
            "feedbackLabel": "telefone"
          },
          {
            "id": "password",
            "label": "Senha da conta",
            "datumIds": [
              "password"
            ],
            "riskIds": [],
            "elementIds": [],
            "explanation": {
              "whenSelected": "A senha é uma credencial: uma informação usada para acessar a conta.",
              "whenOmitted": "Faltou a senha, que protege o acesso à conta."
            },
            "feedbackLabel": "senha"
          },
          {
            "id": "crystals",
            "label": "Quantidade de cristais anunciada",
            "datumIds": [],
            "riskIds": [],
            "elementIds": [],
            "explanation": {
              "whenSelected": "O número de cristais descreve a recompensa; não identifica a personagem.",
              "whenOmitted": "A quantidade de cristais não é um dado pessoal neste contexto."
            },
            "feedbackLabel": "cristais"
          }
        ]
      },
      {
        "id": "m2-assess",
        "dimension": "assess",
        "prompt": "Quais riscos e sinais de alerta aparecem nessa oferta?",
        "selectionMode": "multiple",
        "expectedOptionIds": [
          "exposure",
          "account",
          "reward"
        ],
        "options": [
          {
            "id": "exposure",
            "label": "Endereço e telefone podem expor Téo fora do jogo",
            "datumIds": [
              "address",
              "phone"
            ],
            "riskIds": [
              "exposure"
            ],
            "elementIds": [],
            "explanation": {
              "whenSelected": "Esses dados podem permitir localização e contato indesejado.",
              "whenOmitted": "Não olhe só para a senha: endereço e telefone também expõem Téo."
            },
            "feedbackLabel": "exposição pessoal"
          },
          {
            "id": "account",
            "label": "A senha pode permitir que outra pessoa acesse a conta",
            "datumIds": [
              "password"
            ],
            "riskIds": [
              "account"
            ],
            "elementIds": [],
            "explanation": {
              "whenSelected": "Quem recebe a senha pode tentar entrar na conta.",
              "whenOmitted": "A senha solicitada coloca o acesso à conta em risco."
            },
            "feedbackLabel": "acesso à conta"
          },
          {
            "id": "reward",
            "label": "A recompensa está sendo usada para incentivar o envio de dados",
            "datumIds": [
              "address",
              "phone",
              "password"
            ],
            "riskIds": [
              "exposure",
              "account"
            ],
            "elementIds": [],
            "explanation": {
              "whenSelected": "Um prêmio atraente pode pressionar a compartilhar dados desnecessários.",
              "whenOmitted": "Observe a troca proposta: uma recompensa está incentivando o envio."
            },
            "feedbackLabel": "incentivo do prêmio"
          },
          {
            "id": "guarantee",
            "label": "Ser um prêmio gratuito garante que a oferta é segura",
            "datumIds": [],
            "riskIds": [],
            "elementIds": [],
            "explanation": {
              "whenSelected": "Gratuidade não comprova segurança nem justifica pedir senha e dados pessoais.",
              "whenOmitted": "Um prêmio gratuito não é garantia de confiança."
            },
            "feedbackLabel": "prêmio como garantia"
          }
        ]
      },
      {
        "id": "m2-decide",
        "dimension": "decide",
        "prompt": "Como agir diante dessa oferta?",
        "selectionMode": "single",
        "expectedOptionIds": [
          "protect"
        ],
        "options": [
          {
            "id": "protect",
            "label": "Recusar o envio e verificar a oferta por um canal confiável do jogo",
            "datumIds": [
              "address",
              "phone",
              "password"
            ],
            "riskIds": [],
            "elementIds": [],
            "explanation": {
              "whenSelected": "Recusar protege os dados; verificar em um canal confiável ajuda a avaliar a oferta sem entregar informações.",
              "whenOmitted": "A decisão adequada recusa os dados e verifica a oferta por um canal confiável."
            },
            "feedbackLabel": "ação de proteção"
          },
          {
            "id": "partial",
            "label": "Enviar endereço e telefone, mas guardar a senha",
            "datumIds": [
              "address",
              "phone"
            ],
            "riskIds": [],
            "elementIds": [],
            "explanation": {
              "whenSelected": "Guardar a senha é importante, mas endereço e telefone também não devem ser enviados nesse contexto.",
              "whenOmitted": "Não basta guardar a senha se outros dados continuam expostos."
            },
            "feedbackLabel": "envio parcial"
          },
          {
            "id": "send",
            "label": "Enviar tudo para garantir os cristais",
            "datumIds": [
              "address",
              "phone",
              "password"
            ],
            "riskIds": [],
            "elementIds": [],
            "explanation": {
              "whenSelected": "Uma recompensa não justifica entregar dados pessoais ou senha a um perfil desconhecido.",
              "whenOmitted": "Não envie os dados para garantir a recompensa."
            },
            "feedbackLabel": "enviar tudo"
          }
        ]
      }
    ],
    "synthesis": {
      "dataExplanation": "Endereço e telefone são dados pessoais; senha permite acesso à conta.",
      "riskExplanation": "A recompensa incentiva o envio: os dados expõem você e a senha abre sua conta.",
      "protectionExplanation": "Recuse o envio e verifique a oferta em um canal confiável do jogo."
    },
    "integratedMissionIds": [],
    "focus": "assess",
    "sourceMissionNumbers": [
      4
    ],
    "shortFeedback": {
      "identify": "Endereço e telefone são dados pessoais; senha permite acesso à conta.",
      "assess": "A recompensa incentiva o envio: os dados expõem você e a senha abre sua conta.",
      "decide": "Recuse o envio e verifique a oferta em um canal confiável do jogo."
    }
  },
  {
    "id": "mission-3",
    "order": 3,
    "title": "Decidir: quem vai ver essa postagem?",
    "skill": "EF08CO08",
    "objective": "Distinguir dados pessoais e avaliar riscos: Combinar cuidado com rotina, dados de terceiros e alcance da publicação.",
    "complexity": "Combinar cuidado com rotina, dados de terceiros e alcance da publicação.",
    "context": {
      "kind": "social-post",
      "introduction": "Luna preparou uma postagem pública e marcou uma amizade. A outra pessoa ainda não autorizou aparecer.",
      "elements": [
        {
          "id": "post",
          "kind": "post",
          "text": "@luna.desenha • Audiência: qualquer pessoa\n“Eu e @caio.inventado treinamos na Praça das Nuvens toda terça às 17h. Encontre a gente lá!”\nCaio não autorizou a marcação."
        }
      ]
    },
    "personalData": [
      {
        "id": "routine",
        "label": "Local e horário habitual",
        "category": "routine",
        "elementIds": [
          "post"
        ]
      },
      {
        "id": "friend",
        "label": "Identificação da amizade",
        "category": "identification",
        "elementIds": [
          "post"
        ]
      }
    ],
    "risks": [
      {
        "id": "audience",
        "explanation": "Desconhecidos podem ver a rotina publicada.",
        "datumIds": [
          "routine"
        ]
      },
      {
        "id": "forward",
        "explanation": "A postagem pode ser repassada além da audiência escolhida.",
        "datumIds": [
          "routine",
          "friend"
        ]
      },
      {
        "id": "other",
        "explanation": "A marcação expõe outra pessoa sem autorização.",
        "datumIds": [
          "friend"
        ]
      }
    ],
    "questions": [
      {
        "id": "m3-identify",
        "dimension": "identify",
        "prompt": "Quais dados pessoais aparecem na postagem?",
        "selectionMode": "multiple",
        "expectedOptionIds": [
          "routine",
          "friend"
        ],
        "options": [
          {
            "id": "routine",
            "label": "Local, dia e horário do treino",
            "datumIds": [
              "routine"
            ],
            "riskIds": [],
            "elementIds": [],
            "explanation": {
              "whenSelected": "Local, dia e horário descrevem uma rotina.",
              "whenOmitted": "Faltou a rotina: praça, terça e 17h indicam onde e quando."
            },
            "feedbackLabel": "rotina"
          },
          {
            "id": "friend",
            "label": "A marcação que identifica Caio",
            "datumIds": [
              "friend"
            ],
            "riskIds": [],
            "elementIds": [],
            "explanation": {
              "whenSelected": "Marcar alguém liga essa pessoa à postagem e à rotina.",
              "whenOmitted": "Faltou a identificação de Caio, que também merece cuidado."
            },
            "feedbackLabel": "marcação de Caio"
          },
          {
            "id": "public",
            "label": "O rótulo “Audiência: qualquer pessoa”, por si só",
            "datumIds": [],
            "riskIds": [],
            "elementIds": [],
            "explanation": {
              "whenSelected": "O rótulo informa o alcance da postagem; não é, por si só, um dado pessoal da personagem.",
              "whenOmitted": "O rótulo da audiência é uma configuração, relevante para avaliar o risco."
            },
            "feedbackLabel": "rótulo de audiência"
          }
        ]
      },
      {
        "id": "m3-assess",
        "dimension": "assess",
        "prompt": "Quais riscos precisam ser considerados?",
        "selectionMode": "multiple",
        "expectedOptionIds": [
          "audience",
          "forward",
          "other"
        ],
        "options": [
          {
            "id": "audience",
            "label": "Desconhecidos podem descobrir a rotina",
            "datumIds": [
              "routine"
            ],
            "riskIds": [
              "audience"
            ],
            "elementIds": [],
            "explanation": {
              "whenSelected": "Uma publicação pública permite que desconhecidos vejam local e horário.",
              "whenOmitted": "Considere que o público inclui desconhecidos."
            },
            "feedbackLabel": "alcance da postagem"
          },
          {
            "id": "forward",
            "label": "A postagem pode ser repassada, mesmo com audiência limitada",
            "datumIds": [
              "routine",
              "friend"
            ],
            "riskIds": [
              "forward"
            ],
            "elementIds": [],
            "explanation": {
              "whenSelected": "Limitar quem vê ajuda, mas alguém ainda pode repassar o conteúdo.",
              "whenOmitted": "Audiência limitada não impede todo repasse."
            },
            "feedbackLabel": "repasse"
          },
          {
            "id": "other",
            "label": "Caio pode ter seus dados expostos sem autorização",
            "datumIds": [
              "friend"
            ],
            "riskIds": [
              "other"
            ],
            "elementIds": [],
            "explanation": {
              "whenSelected": "A postagem também revela dados de outra pessoa.",
              "whenOmitted": "A proteção inclui os dados da amizade marcada."
            },
            "feedbackLabel": "dados de Caio"
          },
          {
            "id": "zero",
            "label": "Restringir a audiência elimina todos os riscos",
            "datumIds": [],
            "riskIds": [],
            "elementIds": [],
            "explanation": {
              "whenSelected": "Ainda pode haver repasse e exposição desnecessária. Revise também o conteúdo.",
              "whenOmitted": "Limitar audiência reduz o alcance, mas não garante risco zero."
            },
            "feedbackLabel": "risco zero"
          }
        ]
      },
      {
        "id": "m3-decide",
        "dimension": "decide",
        "prompt": "Qual versão cuida do conteúdo e de quem pode vê-lo?",
        "selectionMode": "single",
        "expectedOptionIds": [
          "protect"
        ],
        "options": [
          {
            "id": "protect",
            "label": "Retirar a rotina detalhada e a marcação sem autorização, e limitar a audiência",
            "datumIds": [
              "routine",
              "friend"
            ],
            "riskIds": [],
            "elementIds": [],
            "explanation": {
              "whenSelected": "Essa revisão reduz dados desnecessários, respeita a outra pessoa e limita o alcance.",
              "whenOmitted": "Combine menos dados, respeito à autorização e audiência limitada."
            },
            "feedbackLabel": "ação de proteção"
          },
          {
            "id": "audience",
            "label": "Limitar a audiência, mantendo a rotina e a marcação",
            "datumIds": [
              "routine",
              "friend"
            ],
            "riskIds": [],
            "elementIds": [],
            "explanation": {
              "whenSelected": "A rotina e os dados de Caio continuam expostos e podem ser repassados. Revise também o conteúdo.",
              "whenOmitted": "Só limitar a audiência não resolve os dados mantidos."
            },
            "feedbackLabel": "alcance da postagem"
          },
          {
            "id": "tag",
            "label": "Retirar a marcação, mas deixar o local e horário públicos",
            "datumIds": [
              "routine"
            ],
            "riskIds": [],
            "elementIds": [],
            "explanation": {
              "whenSelected": "Retirar a marcação ajuda Caio, mas a rotina de Luna permanece pública.",
              "whenOmitted": "O cuidado com terceiros não substitui a revisão da própria rotina."
            },
            "feedbackLabel": "retirar só marcação"
          }
        ]
      }
    ],
    "synthesis": {
      "dataExplanation": "A postagem revela rotina e identifica outra pessoa.",
      "riskExplanation": "A rotina pode chegar a desconhecidos e ser repassada; a marcação também expõe Caio.",
      "protectionExplanation": "Retire rotina e marcação sem autorização, e limite a audiência."
    },
    "integratedMissionIds": [],
    "focus": "decide",
    "sourceMissionNumbers": [
      5
    ],
    "shortFeedback": {
      "identify": "A postagem revela rotina e identifica outra pessoa.",
      "assess": "A rotina pode chegar a desconhecidos e ser repassada; a marcação também expõe Caio.",
      "decide": "Retire rotina e marcação sem autorização, e limite a audiência."
    }
  },
  {
    "id": "mission-4",
    "order": 4,
    "title": "Desafio final: proteja a personagem",
    "skill": "EF08CO08",
    "objective": "Distinguir dados pessoais e avaliar riscos: Integrar contato, pistas visuais, rotina, credenciais e incentivo de recompensa.",
    "complexity": "Integrar contato, pistas visuais, rotina, credenciais e incentivo de recompensa.",
    "context": {
      "kind": "combined",
      "introduction": "Perfil, foto, postagem e convite usam o mesmo @maya.pixel. Junte as pistas antes de decidir.",
      "elements": [
        {
          "id": "profile",
          "kind": "profile",
          "text": "@maya.pixel • Perfil público\nTelefone de contato: (XX) XXXXX-XXXX"
        },
        {
          "id": "photo",
          "kind": "illustration",
          "text": "Imagem que Maya publicou depois da aula.",
          "assetPath": "assets/illustrations/mission-4.svg",
          "description": "A mochila exibe um crachá da Escola Horizonte Inventado. Uma placa indica Praça das Nuvens, local fictício."
        },
        {
          "id": "post",
          "kind": "post",
          "text": "@maya.pixel: Toda terça às 17h estou na Praça das Nuvens depois da aula!"
        },
        {
          "id": "chat",
          "kind": "message",
          "text": "Organizador desconhecido • mensagem privada para @maya.pixel\nVi seu perfil e sua rotina! Você ganhou entrada e itens raros. Envie a senha da conta para confirmar sua vaga."
        }
      ]
    },
    "personalData": [
      {
        "id": "phone",
        "label": "Telefone público",
        "category": "contact",
        "elementIds": [
          "profile"
        ]
      },
      {
        "id": "location",
        "label": "Escola e praça na imagem",
        "category": "location",
        "elementIds": [
          "photo"
        ]
      },
      {
        "id": "routine",
        "label": "Rotina na postagem",
        "category": "routine",
        "elementIds": [
          "post"
        ]
      },
      {
        "id": "password",
        "label": "Senha solicitada",
        "category": "credential",
        "elementIds": [
          "chat"
        ]
      }
    ],
    "risks": [
      {
        "id": "contact",
        "explanation": "O telefone público permite contatos indesejados.",
        "datumIds": [
          "phone"
        ]
      },
      {
        "id": "locate",
        "explanation": "Imagem e rotina juntas podem revelar onde e quando encontrar Maya.",
        "datumIds": [
          "location",
          "routine"
        ]
      },
      {
        "id": "account",
        "explanation": "A senha solicitada pode permitir acesso indevido à conta.",
        "datumIds": [
          "password"
        ]
      }
    ],
    "questions": [
      {
        "id": "m4-identify",
        "dimension": "identify",
        "prompt": "Quais dados ou pistas pessoais aparecem nesses espaços?",
        "selectionMode": "multiple",
        "expectedOptionIds": [
          "phone",
          "location",
          "routine",
          "password"
        ],
        "options": [
          {
            "id": "phone",
            "label": "O telefone no perfil",
            "datumIds": [
              "phone"
            ],
            "riskIds": [],
            "elementIds": [],
            "explanation": {
              "whenSelected": "O telefone é um dado de contato direto.",
              "whenOmitted": "Revise o perfil: há um telefone público."
            },
            "feedbackLabel": "telefone"
          },
          {
            "id": "location",
            "label": "A escola e a praça mostradas na imagem",
            "datumIds": [
              "location"
            ],
            "riskIds": [],
            "elementIds": [],
            "explanation": {
              "whenSelected": "As pistas visuais revelam locais relacionados à personagem.",
              "whenOmitted": "Observe a imagem: crachá e placa revelam escola e praça."
            },
            "feedbackLabel": "pistas da imagem"
          },
          {
            "id": "routine",
            "label": "O dia, horário e local habitual na postagem",
            "datumIds": [
              "routine"
            ],
            "riskIds": [],
            "elementIds": [],
            "explanation": {
              "whenSelected": "Essas informações descrevem uma rotina.",
              "whenOmitted": "A postagem revela onde e quando Maya costuma estar."
            },
            "feedbackLabel": "rotina"
          },
          {
            "id": "password",
            "label": "A senha pedida na conversa",
            "datumIds": [
              "password"
            ],
            "riskIds": [],
            "elementIds": [],
            "explanation": {
              "whenSelected": "A senha protege o acesso à conta e não deve ser entregue para garantir prêmio.",
              "whenOmitted": "A conversa solicita uma credencial de acesso: a senha."
            },
            "feedbackLabel": "senha"
          },
          {
            "id": "items",
            "label": "A expressão “itens raros”, sozinha",
            "datumIds": [],
            "riskIds": [],
            "elementIds": [],
            "explanation": {
              "whenSelected": "Essa expressão descreve o incentivo, não um dado pessoal. Ela é relevante para avaliar a oferta.",
              "whenOmitted": "O prêmio é um incentivo; não é, por si só, um dado pessoal."
            },
            "feedbackLabel": "itens raros"
          }
        ]
      },
      {
        "id": "m4-assess",
        "dimension": "assess",
        "prompt": "Quais riscos ou sinais de alerta você reconhece no conjunto?",
        "selectionMode": "multiple",
        "expectedOptionIds": [
          "contact",
          "locate",
          "account",
          "reward"
        ],
        "options": [
          {
            "id": "contact",
            "label": "O telefone pode ser usado para contatos indesejados",
            "datumIds": [
              "phone"
            ],
            "riskIds": [
              "contact"
            ],
            "elementIds": [],
            "explanation": {
              "whenSelected": "Um perfil público pode expor o contato a desconhecidos.",
              "whenOmitted": "O risco do telefone também precisa ser considerado."
            },
            "feedbackLabel": "contato indesejado"
          },
          {
            "id": "locate",
            "label": "A imagem e a rotina podem revelar onde e quando encontrar Maya",
            "datumIds": [
              "location",
              "routine"
            ],
            "riskIds": [
              "locate"
            ],
            "elementIds": [],
            "explanation": {
              "whenSelected": "Placas e postagem se completam: local, dia e horário podem ser associados.",
              "whenOmitted": "Combine as pistas da imagem e da postagem para avaliar a localização."
            },
            "feedbackLabel": "combinação de localização e rotina"
          },
          {
            "id": "account",
            "label": "A senha pode permitir acesso indevido à conta",
            "datumIds": [
              "password"
            ],
            "riskIds": [
              "account"
            ],
            "elementIds": [],
            "explanation": {
              "whenSelected": "Entregar uma senha coloca o acesso à conta em risco.",
              "whenOmitted": "Não esqueça o risco de acesso à conta causado pela senha solicitada."
            },
            "feedbackLabel": "acesso à conta"
          },
          {
            "id": "reward",
            "label": "Itens raros estão sendo usados para incentivar o envio da senha",
            "datumIds": [
              "password"
            ],
            "riskIds": [
              "account"
            ],
            "elementIds": [],
            "explanation": {
              "whenSelected": "O incentivo do prêmio não justifica entregar credenciais.",
              "whenOmitted": "A recompensa é parte da pressão para enviar a senha."
            },
            "feedbackLabel": "incentivo do prêmio"
          },
          {
            "id": "known",
            "label": "Conhecer o perfil de Maya prova que o organizador é confiável",
            "datumIds": [],
            "riskIds": [],
            "elementIds": [],
            "explanation": {
              "whenSelected": "Qualquer pessoa pode ter visto o perfil público. Isso não comprova confiança.",
              "whenOmitted": "Conhecer dados públicos não confirma a identidade do contato."
            },
            "feedbackLabel": "confiança no desconhecido"
          }
        ]
      },
      {
        "id": "m4-decide",
        "dimension": "decide",
        "prompt": "Qual conjunto de ações protege melhor a personagem neste contexto?",
        "selectionMode": "single",
        "expectedOptionIds": [
          "protect"
        ],
        "options": [
          {
            "id": "protect",
            "label": "Recusar o envio; retirar telefone, pistas visuais e rotina; verificar ou denunciar o contato por um canal confiável",
            "datumIds": [
              "phone",
              "location",
              "routine",
              "password"
            ],
            "riskIds": [],
            "elementIds": [],
            "explanation": {
              "whenSelected": "Esse conjunto trata conta, contato, localização e rotina, além de permitir verificar ou denunciar a oferta.",
              "whenOmitted": "Combine recusa do envio, revisão de toda a exposição e verificação ou denúncia simulada."
            },
            "feedbackLabel": "ação de proteção"
          },
          {
            "id": "password",
            "label": "Recusar a senha, mas manter perfil e postagem como estão",
            "datumIds": [
              "phone",
              "location",
              "routine"
            ],
            "riskIds": [],
            "elementIds": [],
            "explanation": {
              "whenSelected": "A conta recebe cuidado, mas telefone, pistas da imagem e rotina continuam expostos. Revise também esses espaços.",
              "whenOmitted": "Só recusar a senha não resolve a exposição dos outros dados."
            },
            "feedbackLabel": "senha"
          },
          {
            "id": "hide",
            "label": "Apagar a postagem e enviar a senha para garantir a vaga",
            "datumIds": [
              "phone",
              "location",
              "password"
            ],
            "riskIds": [],
            "elementIds": [],
            "explanation": {
              "whenSelected": "Apagar a postagem não torna seguro entregar a senha; o perfil e a imagem também precisam de revisão.",
              "whenOmitted": "Não troque a credencial por uma recompensa."
            },
            "feedbackLabel": "apagar postagem e enviar senha"
          }
        ]
      }
    ],
    "synthesis": {
      "dataExplanation": "Telefone, pistas da imagem, rotina e senha exigem cuidado.",
      "riskExplanation": "O mesmo perfil conecta imagem e rotina; o prêmio incentiva entregar a senha.",
      "protectionExplanation": "Recuse o envio, revise perfil e postagem e verifique ou denuncie o contato."
    },
    "integratedMissionIds": [
      "mission-1",
      "mission-2",
      "mission-3"
    ],
    "focus": "integrate",
    "sourceMissionNumbers": [
      2,
      3,
      6,
      7
    ],
    "shortFeedback": {
      "identify": "Telefone, pistas da imagem, rotina e senha exigem cuidado.",
      "assess": "O mesmo perfil conecta imagem e rotina; o prêmio incentiva entregar a senha.",
      "decide": "Recuse o envio, revise perfil e postagem e verifique ou denuncie o contato."
    }
  }
];
