window.DATA = {

  classes: [
    {
      id: "investigador",
      name: "Investigador",
      initialHp: 8,
      initialItems: ["Lanterna", "Caderno e lápis", "Lupa", "Câmera fotográfica", "Faca"],
      description: "Especialista em encontrar pistas, conectar informações e perceber detalhes que passam despercebidos pelos outros. O Investigador sabe fazer perguntas, analisar situações e juntar pequenos fragmentos até revelar aquilo que está escondido por trás do Véu.",
      abilities: [
        {
          id: "olho-clinico",
          name: "Olho Clínico",
          description: "Uma vez por cena, ao examinar uma pessoa, objeto ou local, você pode perguntar ao Mestre por um detalhe importante que passaria despercebido para alguém comum."
        },
        {
          id: "raciocinio-rapido",
          name: "Raciocínio Rápido",
          description: "Quando encontrar uma pista, você pode imediatamente relacioná-la com algo que já descobriu. O Mestre deve informar uma possível conexão, mesmo que ela ainda não seja totalmente compreendida."
        },
        {
          id: "interrogador",
          name: "Interrogador",
          description: "Ao conversar com alguém, você consegue perceber contradições, hesitações e informações omitidas. Uma vez por cena, pode perguntar ao Mestre se a pessoa está escondendo algo importante."
        }
      ]
    },
    {
      id: "ex-militar",
      name: "Ex-militar",
      initialHp: 12,
      initialItems: ["Mochila", "Lanterna", "Canivete", "Corda", "Cantil", "Kit de primeiros socorros"],
      description: "Treinado para sobreviver em situações de perigo, o Ex-militar possui experiência com armas, combate e tomada de decisões sob pressão. Sabe reconhecer ameaças, manter a calma diante do caos e agir quando uma situação exige força e disciplina.",
      abilities: [
        {
          id: "treinamento-de-combate",
          name: "Treinamento de Combate",
          description: "Você possui treinamento formal com armas e combate. Ao realizar uma ação de combate sob pressão, pode repetir uma rolagem malsucedida uma vez por cena."
        },
        {
          id: "sangue-frio",
          name: "Sangue Frio",
          description: "Você sabe agir mesmo quando todos ao redor entram em pânico. Ignore a primeira penalidade causada por medo ou estresse em uma cena."
        },
        {
          id: "tatica",
          name: "Tática",
          description: "Você consegue identificar rapidamente uma posição vantajosa. Antes de um combate, pode escolher uma posição ou estratégia que conceda uma vantagem inicial ao grupo."
        }
      ]
    },
    {
      id: "medico",
      name: "Médico",
      initialHp: 9,
      initialItems: ["Bolsa médica", "Ataduras", "Antisséptico", "Analgésicos", "Luvas descartáveis", "Tesoura médica"],
      description: "Acostumado a lidar com ferimentos e situações de emergência, o Médico é uma das pessoas mais importantes do grupo quando as coisas dão errado. Conhece primeiros socorros, anatomia e procedimentos capazes de manter alguém vivo mesmo em condições extremas.",
      abilities: [
        {
          id: "primeiros-socorros",
          name: "Primeiros Socorros",
          description: "Você pode estabilizar um personagem ferido e impedir que sua condição piore imediatamente, desde que tenha acesso aos materiais necessários."
        },
        {
          id: "conhecimento-anatomico",
          name: "Conhecimento Anatômico",
          description: "Ao atacar uma criatura ou pessoa, você sabe identificar pontos vulneráveis. Uma vez por cena, pode obter do Mestre uma informação sobre uma possível fraqueza física do alvo."
        },
        {
          id: "emergencia",
          name: "Emergência",
          description: "Uma vez por cena, quando um aliado próximo sofrer um ferimento grave, você pode agir imediatamente para tentar ajudá-lo, antes da próxima ação normal."
        }
      ]
    },
    {
      id: "ocultista",
      name: "Ocultista",
      initialHp: 8,
      initialItems: ["Livro de ocultismo", "Caderno de anotações", "Velas", "Fósforos", "Incenso", "Símbolo religioso"],
      description: "Estudioso de fenômenos que desafiam a compreensão comum, o Ocultista conhece símbolos, rituais, crenças e histórias relacionadas ao sobrenatural. É capaz de reconhecer sinais que os outros sequer percebem e compreender aspectos do Véu que deveriam permanecer desconhecidos.",
      abilities: [
        {
          id: "conhecimento-proibido",
          name: "Conhecimento Proibido",
          description: "Você reconhece símbolos, objetos e manifestações sobrenaturais que seriam incompreensíveis para outras pessoas. Pode perguntar ao Mestre o que determinado elemento sobrenatural representa ou sugere."
        },
        {
          id: "ritual",
          name: "Ritual",
          description: "Você conhece procedimentos capazes de interagir com forças sobrenaturais. Com tempo e os componentes adequados, pode realizar pequenos rituais para obter informações ou produzir efeitos limitados."
        },
        {
          id: "sensibilidade",
          name: "Sensibilidade",
          description: "Você percebe quando algo sobrenatural está próximo. O Mestre pode fornecer sinais sutis quando houver uma presença, influência ou alteração sobrenatural nas proximidades."
        }
      ]
    },
    {
      id: "jornalista",
      name: "Jornalista",
      initialHp: 9,
      initialItems: ["Gravador", "Caderno e lápis", "Câmera fotográfica", "Lanterna", "Celular", "Fita adesiva"],
      description: "Curioso, persistente e acostumado a procurar informações onde ninguém mais procura. O Jornalista sabe conversar, investigar pessoas, encontrar informações e seguir histórias até suas últimas consequências. Sua capacidade de descobrir a verdade pode ser tão perigosa quanto aquilo que está sendo investigado.",
      abilities: [
        {
          id: "rede-de-contatos",
          name: "Rede de Contatos",
          description: "Você conhece pessoas em diferentes lugares e profissões. Uma vez por sessão, pode declarar que conhece alguém que possa fornecer uma informação ou auxílio plausível."
        },
        {
          id: "persuasivo",
          name: "Persuasivo",
          description: "Você sabe conduzir uma conversa para conseguir informações. Uma vez por cena, pode insistir em uma conversa e obter uma informação que o interlocutor normalmente tentaria esconder."
        },
        {
          id: "investigacao",
          name: "Investigação",
          description: "Você sabe procurar informações em documentos, arquivos e registros. Quando tiver acesso a uma fonte de informação, consegue encontrar detalhes que uma pessoa comum provavelmente ignoraria."
        }
      ]
    },
    {
      id: "fazendeiro",
      name: "Fazendeiro",
      initialHp: 11,
      initialItems: ["Enxada", "Corda", "Canivete", "Lanterna", "Fósforos", "Cantil"],
      description: "Acostumado ao trabalho pesado, ao isolamento e às dificuldades da vida no campo, o Fazendeiro conhece ferramentas, animais, armas improvisadas e maneiras práticas de resolver problemas. É alguém resistente, acostumado a fazer muito com pouco e capaz de sobreviver longe de qualquer ajuda.",
      abilities: [
        {
          id: "improviso",
          name: "Improviso",
          description: "Você consegue transformar objetos comuns em ferramentas úteis. Quando precisar de uma ferramenta simples, pode improvisá-la utilizando materiais disponíveis no ambiente."
        },
        {
          id: "braco-forte",
          name: "Braço Forte",
          description: "Seu trabalho pesado tornou você fisicamente resistente. Você possui vantagem em ações que dependam diretamente de força física ou esforço prolongado."
        },
        {
          id: "conhecimento-do-campo",
          name: "Conhecimento do Campo",
          description: "Você sabe reconhecer rastros, condições do terreno, animais e sinais de passagem. Em ambientes rurais ou naturais, consegue identificar sinais que outras pessoas dificilmente perceberiam."
        }
      ]
    },
    {
      id: "sobrevivente",
      name: "Sobrevivente",
      initialHp: 10,
      initialItems: ["Mochila", "Canivete", "Corda", "Isqueiro", "Lanterna", "Cantil"],
      description: "Alguém que já passou por situações extremas e aprendeu, da pior maneira possível, como continuar vivo. O Sobrevivente conhece os sinais do perigo, sabe improvisar quando os recursos acabam e possui uma resistência adquirida através da experiência. Não precisa entender o que está acontecendo para saber que algo está errado.",
      abilities: [
        {
          id: "instinto-de-sobrevivencia",
          name: "Instinto de Sobrevivência",
          description: "Quando uma situação estiver prestes a se tornar perigosa, você percebe sinais de ameaça antes que ela aconteça. O Mestre deve fornecer uma indicação de perigo iminente quando houver algo que possa ser percebido."
        },
        {
          id: "improvisador-nato",
          name: "Improvisador Nato",
          description: "Quando estiver sem equipamento adequado, você consegue encontrar uma solução usando o que estiver disponível. Uma vez por cena, pode declarar um objeto simples e plausível que poderia estar ao seu alcance."
        },
        {
          id: "nao-vou-morrer-aqui",
          name: "Não Vou Morrer Aqui",
          description: "Quando sofrer um ferimento que normalmente o deixaria incapaz de continuar, você pode permanecer de pé e agir por mais uma rodada. Depois disso, precisa lidar normalmente com as consequências do ferimento."
        }
      ]
    }
  ],

  attributeValues: [-2, -1, 0, 1, 2],

  attributes: [
    {
      id: "forca",
      name: "Força",
      description: "Força física, esforço, agarrar, empurrar, quebrar."
    },
    {
      id: "agilidade",
      name: "Agilidade",
      description: "Velocidade, reflexos, esquiva, coordenação."
    },
    {
      id: "intelecto",
      name: "Intelecto",
      description: "Raciocínio, conhecimento, investigação, lógica."
    },
    {
      id: "percepcao",
      name: "Percepção",
      description: "Atenção, sentidos, percepção de perigo e detalhes."
    },
    {
      id: "presenca",
      name: "Presença",
      description: "Influência, persuasão, intimidação, autocontrole social."
    }
  ],

  weaponDistances: ["Muito Perto", "Perto", "Distante", "Muito Distante"],

  weapons: [
    { id: "pau", name: "Pau", distance: "Muito Perto", damage: "1d4", category: "Improvisadas" },
    { id: "tijolo", name: "Tijolo", distance: "Perto", damage: "1d4", category: "Improvisadas" },
    { id: "garrafa-quebrada", name: "Garrafa quebrada", distance: "Muito Perto", damage: "1d6", category: "Improvisadas" },
    { id: "garrafa", name: "Garrafa", distance: "Muito Perto", damage: "1d4", category: "Improvisadas" },
    { id: "pedra", name: "Pedra", distance: "Perto", damage: "1d4", category: "Improvisadas" },
    { id: "cadeira", name: "Cadeira", distance: "Muito Perto", damage: "1d6", category: "Improvisadas" },
    { id: "pedaco-de-madeira", name: "Pedaço de madeira", distance: "Muito Perto", damage: "1d6", category: "Improvisadas" },
    { id: "barra-de-ferro", name: "Barra de ferro", distance: "Muito Perto", damage: "1d8", category: "Improvisadas" },
    { id: "cano-de-metal", name: "Cano de metal", distance: "Muito Perto", damage: "1d6", category: "Improvisadas" },
    { id: "corrente", name: "Corrente", distance: "Perto", damage: "1d6", category: "Improvisadas" },
    { id: "pa", name: "Pá", distance: "Muito Perto", damage: "1d6", category: "Improvisadas" },
    { id: "enxada", name: "Enxada", distance: "Muito Perto", damage: "1d8", category: "Improvisadas" },
    { id: "foice", name: "Foice", distance: "Muito Perto", damage: "1d8", category: "Improvisadas" },
    { id: "martelo", name: "Martelo", distance: "Muito Perto", damage: "1d6", category: "Improvisadas" },
    { id: "machado-improvisado", name: "Machado improvisado", distance: "Muito Perto", damage: "1d8", category: "Improvisadas" },

    { id: "faca", name: "Faca", distance: "Muito Perto", damage: "1d6", category: "Armas brancas" },
    { id: "faca-de-caca", name: "Faca de caça", distance: "Muito Perto", damage: "1d6", category: "Armas brancas" },
    { id: "facao", name: "Facão", distance: "Muito Perto", damage: "1d8", category: "Armas brancas" },
    { id: "machado", name: "Machado", distance: "Muito Perto", damage: "1d8", category: "Armas brancas" },
    { id: "porrete", name: "Porrete", distance: "Muito Perto", damage: "1d6", category: "Armas brancas" },
    { id: "bastao", name: "Bastão", distance: "Muito Perto", damage: "1d6", category: "Armas brancas" },
    { id: "canivete", name: "Canivete", distance: "Muito Perto", damage: "1d4", category: "Armas brancas" },
    { id: "pe-de-cabra", name: "Pé de cabra", distance: "Muito Perto", damage: "1d6", category: "Armas brancas" },
    { id: "lanca", name: "Lança", distance: "Perto", damage: "1d8", category: "Armas brancas" },

    { id: "revolver", name: "Revólver", distance: "Perto", damage: "1d8", category: "Armas de fogo" },
    { id: "pistola", name: "Pistola", distance: "Perto", damage: "1d8", category: "Armas de fogo" },
    { id: "pistola-pesada", name: "Pistola pesada", distance: "Perto", damage: "1d10", category: "Armas de fogo" },
    { id: "espingarda", name: "Espingarda", distance: "Perto", damage: "2d6", category: "Armas de fogo" },
    { id: "carabina", name: "Carabina", distance: "Distante", damage: "1d10", category: "Armas de fogo" },
    { id: "rifle-de-caca", name: "Rifle de caça", distance: "Distante", damage: "1d10", category: "Armas de fogo" },
    { id: "rifle", name: "Rifle", distance: "Muito Distante", damage: "1d10", category: "Armas de fogo" },
    { id: "submetralhadora", name: "Submetralhadora", distance: "Perto", damage: "1d8", category: "Armas de fogo" },
    { id: "fuzil", name: "Fuzil", distance: "Muito Distante", damage: "1d10", category: "Armas de fogo" },

    { id: "arco-e-flecha", name: "Arco e flecha", distance: "Distante", damage: "1d8", category: "Outras" },
    { id: "besta", name: "Besta", distance: "Distante", damage: "1d8", category: "Outras" }
  ],

  items: {
    comuns: [],
    improvisados: []
  },

  diceTable: [
    { min: 1, max: 1, label: "Erro Crítico", description: "Falha grave e consequência severa.", icon: "erro-critico" },
    { min: 2, max: 9, label: "Erro", description: "A ação falha, sem consequência adicional obrigatória.", icon: "erro" },
    { min: 10, max: 13, label: "Erro com Complicação", description: "A ação falha, mas surge uma consequência, custo ou nova situação.", icon: "erro-complicacao" },
    { min: 14, max: 15, label: "Acerto com Complicação", description: "A ação funciona, mas o personagem sofre uma consequência ou paga um custo.", icon: "acerto-complicacao" },
    { min: 16, max: 19, label: "Acerto", description: "A ação funciona normalmente.", icon: "acerto" },
    { min: 20, max: 20, label: "Acerto Crítico", description: "A ação funciona excepcionalmente e recebe um benefício adicional.", icon: "acerto-critico" }
  ]

};
