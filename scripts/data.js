CoC.data.synergies={
  "pblock":{
    name:"Perfect Block Chance",
    image:"block",
    base:3
  },
  "block":{
    name:"Block Proficiency",
    image:"block",
    base:10
  },
  "armor":{
    name:"Armor",
    image:"armor_up",
    base:4
  },
  "critdmg":{
    name:"Crit Damage",
    image:"crit",
    base:15
  },
  "critrate":{
    name:"Crit Rate",
    image:"crit",
    base:5
  },
  "pgain":{
    name:"Power Gain",
    image:"mana",
    base:3
  },
  "attack":{
    name:"Attack",
    image:"attack",
    base:5
  },
  "health":{
    name:"Health",
    image:"health",
    base:5
  },
  "healthsteal":{
    name:"Health Steal",
    image:"health_steal",
    base:5
  },
  "manasteal":{
    name:"Mana Steal",
    image:"mana_steal",
    base:5
  },
};

CoC.data.classes=[
  "Cosmic",
  "Tech",
  "Mutant",
  "Skill",
  "Science",
  "Mystic"
];

CoC.data.heroes = {
  "blackbolt":{
    id:"blackbolt",
    name:"Black Bolt",
    class:"Cosmic",
    synergies:{
      2:[
        { id:"cyclops", type:"block", amount:10 }
      ],
      3:[
        { id:"spiderman", type:"armor", amount:5 },
        { id:"ronan", type:"attack", amount:4 },
        { id:"cyclops", type:"block", amount:15 },
        { id:"hulk", type:"critdmg", amount:20 }
      ],
      4:[
        { id:"spiderman", type:"armor", amount:6 },
        { id:"ronan", type:"attack", amount:5 },
        { id:"cyclops", type:"block", amount:20 },
        { id:"hulk", type:"critdmg", amount:25 }
      ]
    }
  },
  "msmarvel":{
    id:"msmarvel",
    name:"Ms. Marvel",
    class:"Cosmic",
    synergies:{
      2:[]
    }
  },
  "drax":{
    id:"drax",
    name:"Drax",
    class:"Cosmic",
    synergies:{
      2:[
        { id:"starlord", type:"pblock", amount:3 },
        { id:"gamora", type:"critdmg", amount:15 }
      ]
    }
  },
  "gamora":{
    id:"gamora",
    name:"Gamora",
    class:"Cosmic",
    synergies:{
      2:[
        { id:"starlord", type:"armor", amount:4 }
      ]
    }
  },
  "ronan":{
    id:"ronan",
    name:"Ronan",
    class:"Cosmic",
    synergies:{
      2:[
        { id:"blackbolt", type:"critdmg", amount:15 }
      ]
    }
  },
  "superiorironman":{
    id:"superiorironman",
    name:"Superior Iron Man",
    class:"Cosmic",
    synergies:{
      2:[
        { id:"captainamerica", type:"critrate", amount:5 },
        { id:"thor", type:"pblock", amount:3 }
      ]
    }
  },
  "thor":{
    id:"thor",
    name:"Thor",
    class:"Cosmic",
    synergies:{
      2:[
        { id:"drstrange", type:"armor", amount:4 },
        { id:"ironman", type:"armor", amount:4 }
      ]
    }
  },
  
  "ironman":{
    id:"ironman",
    name:"Iron Man",
    class:"Tech",
    synergies:{
      2:[
        { id:"thor", type:"pblock", amount:3 }
      ]
    }
  },
  "hulkbuster":{
    id:"hulkbuster",
    name:"Hulk Buster ",
    class:"Tech",
    synergies:{
      2:[
        { id:"hulk", type:"critdmg", amount:15 }
      ],
      3:[
        { id:"hulk", type:"critdmg", amount:30 },
        { id:"ironman", type:"pblock", amount:3 },
        { id:"superiorironman", type:"pblock", amount:3 }
      ]
    }
  },
  "rocket":{
    id:"rocket",
    name:"Rocket",
    class:"Tech",
    synergies:{
      2:[]
    }
  },
  "starlord":{
    id:"starlord",
    name:"Star Lord",
    class:"Tech",
    synergies:{
      2:[
        { id:"rocket", type:"armor", amount:4 },
        { id:"drax", type:"pblock", amount:3 }
      ]
    }
  },
  "vision":{
    id:"vision",
    name:"Vision",
    class:"Tech",
    synergies:{
      2:[
        { id:"scarletwitch", type:"pgain", amount:3 },
        { id:"ironman", type:"pblock", amount:3 }
      ]
    }
  },
  "thevision":{
    id:"thevision",
    name:"The Vision",
    class:"Tech",
    synergies:{
      2:[
        { id:"ironman", type:"health", amount:4 },
        { id:"scarletwitch", type:"pblock", amount:3 }
      ]
    }
  },
  "colossus":{
    id:"colossus",
    name:"Colossus",
    class:"Mutant",
    synergies:{
      2:[
        { id:"juggernaut", type:"critrate", amount:5 },
      ]
    }
  },
  "cyclops":{
    id:"cyclops",
    name:"Cyclops",
    class:"Mutant",
    synergies:{
      2:[
        { id:"wolverine", type:"critdmg", amount:15 },
      ]
    }
  },
  "deadpool":{
    id:"deadpool",
    name:"Deadpool",
    class:"Mutant",
    synergies:{
      2:[]
    }
  },
  "storm":{
    id:"storm",
    name:"Storm",
    class:"Mutant",
    synergies:{
      2:[
        { id:"blackpanther", type:"pgain", amount:3 },
      ]
    }
  },
  "wolverine":{
    id:"wolverine",
    name:"Wolverine",
    class:"Mutant",
    synergies:{
      2:[
        { id:"cyclops", type:"critdmg", amount:15 },
      ]
    }
  },
  "blackpanther":{
    id:"blackpanther",
    name:"Black Panther",
    class:"Skill",
    synergies:{
      2:[
        { id:"ironfist", type:"critdmg", amount:15 },
      ]
    }
  },
  "hawkeye":{
    id:"hawkeye",
    name:"Hawkeye",
    class:"Skill",
    synergies:{
      2:[
        { id:"scarletwitch", type:"pgain", amount:3 },
      ]
    }
  },
  "punisher":{
    id:"punisher",
    name:"Punisher",
    class:"Skill",
    synergies:{
      2:[
        { id:"spiderman", type:"critdmg", amount:15 },
      ]
    }
  },
  "wintersoldier":{
    id:"wintersoldier",
    name:"Winter Soldier",
    class:"Skill",
    synergies:{
      2:[
        { id:"wolverine", type:"armor", amount:4 },
        { id:"captainamerica", type:"pblock", amount:3 },
      ]
    }
  },
  "blackwidow":{
    id:"blackwidow",
    name:"Black Widow",
    class:"Skill",
    synergies:{
      2:[
        { id:"msmarvel", type:"armor", amount:4 },
        { id:"wintersoldier", type:"pgain", amount:3 },
      ]
    }
  },
  "abomination":{
    id:"abomination",
    name:"Abomination",
    class:"Science",
    synergies:{
      2:[
        { id:"rhino", type:"armor", amount:4 },
      ]
    }
  },
  "captainamerica":{
    id:"captainamerica",
    name:"Captain America",
    class:"Science",
    synergies:{
      2:[
        { id:"spiderman", type:"armor", amount:4 },
        { id:"superiorironman", type:"critrate", amount:5 },
        { id:"ironman", type:"armor", amount:3 },
      ]
    }
  },
  "electro":{
    id:"electro",
    name:"Electro",
    class:"Science",
    synergies:{
      2:[]
    }
  },
  "hulk":{
    id:"hulk",
    name:"Hulk",
    class:"Science",
    synergies:{
      2:[
        { id:"thor", type:"critdmg", amount:15 },
      ]
    }
  },
  "rhino":{
    id:"rhino",
    name:"Rhino",
    class:"Science",
    synergies:{
      2:[
        { id:"spiderman", type:"critrate", amount:5 },
        { id:"abomination", type:"armor", amount:4 },
      ]
    }
  },
  "spiderman":{
    id:"spiderman",
    name:"Spider-man",
    class:"Science",
    synergies:{
      2:[
        { id:"wolverine", type:"health", amount:5 },
        { id:"hawkeye", type:"attack", amount:5 },
      ]
    }
  },
  "drstrange":{
    id:"drstrange",
    name:"Dr. Strange",
    class:"Mystic",
    synergies:{
      2:[]
    }
  },
  "ironfist":{
    id:"ironfist",
    name:"Iron Fist",
    class:"Mystic",
    synergies:{
      2:[
        { id:"blackpanther", type:"armor", amount:4 },
      ]
    }
  },
  "juggernaut":{
    id:"juggernaut",
    name:"Juggernaut",
    class:"Mystic",
    synergies:{
      2:[
        { id:"colossus", type:"critrate", amount:5 },
      ]
    }
  },
  "magik":{
    id:"magik",
    name:"Magik",
    class:"Mystic",
    synergies:{
      2:[]
    }
  },
  "scarletwitch":{
    id:"scarletwitch",
    name:"Scarlet Witch",
    class:"Mystic",
    synergies:{
      2:[
        { id:"msmarvel", type:"armor", amount:4 },
      ]
    }
  },
  "unstoppablecolossus":{
    id:"unstoppablecolossus",
    name:"Unstoppable Colossus",
    class:"Mystic",
    synergies:{
      2:[
        { id:"magik", type:"health", amount:5 },
        { id:"juggernaut", type:"critdmg", amount:20 },
      ]
    }
  }
};