CoC.data.synergies={
  "perfectblock":{
    name:"Perfect Block",
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
  "critdamage":{
    name:"Crit Damage",
    image:"crit",
    base:15
  },
  "critrate":{
    name:"Crit Rate",
    image:"crit",
    base:5
  },
  "stun":{
    name:"Stun Chance",
    image:"stun",
    base:15
  },
  "powergain":{
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

CoC.data.levels={
  1:[ 10, 20 ],
  2:[ 10, 20, 30 ],
  3:[ 10, 20, 30, 40 ],
  4:[ 10, 20, 30, 40, 50 ]
}

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
        { id:"hulk", type:"critdamage", amount:20 }
      ],
    }
  },
  "captainmarvel":{
    id:"captainmarvel",
    name:"Captain Marvel",
    class:"Cosmic",
    synergies:{
      3:[
        { id:"captainamerica", type:"armor", amount:5 },
        { id:"gamora", type:"armor", amount:5 },
        { id:"ironman", type:"armor", amount:5 }
      ],
      4:[
        { id:"captainamerica", type:"armor", amount:6 },
        { id:"gamora", type:"armor", amount:6 },
        { id:"ironman", type:"armor", amount:6 },
        { id:"wolverine", type:"powergain", amount:5 }
      ]
    }
  },
  "drax":{
    id:"drax",
    name:"Drax",
    class:"Cosmic",
    synergies:{
      2:[
        { id:"starlord", type:"perfectblock", amount:3 },
        { id:"gamora", type:"critdamage", amount:15 }
      ],
      3:[
        { id:"starlord", type:"perfectblock", amount:4 },
        { id:"gamora", type:"critdamage", amount:20 }
      ],
      4:[
        { id:"starlord", type:"perfectblock", amount:5 },
        { id:"gamora", type:"critdamage", amount:25 }
      ]
    }
  },
  "gamora":{
    id:"gamora",
    name:"Gamora",
    class:"Cosmic",
    synergies:{
      1:[],
      2:[
        { id:"starlord", type:"armor", amount:4 }
      ],
      3:[
        { id:"starlord", type:"armor", amount:5 },
        { id:"drax", type:"critdamage", amount:20 }
      ],
      4:[
        { id:"starlord", type:"armor", amount:6 },
        { id:"drax", type:"critdamage", amount:25 }
      ]
    }
  },
  "msmarvel":{
    id:"msmarvel",
    name:"Ms. Marvel",
    class:"Cosmic",
    synergies:{
      3:[
        { id:"captainamerica", type:"armor", amount:5 },
        { id:"ironman", type:"perfectblock", amount:4 },
        { id:"thor", type:"perfectblock", amount:4 },
        { id:"hulk", type:"perfectblock", amount:4 }
      ],
      4:[
        { id:"captainamerica", type:"armor", amount:6 },
        { id:"ironman", type:"perfectblock", amount:5 },
        { id:"thor", type:"perfectblock", amount:5 },
        { id:"hulk", type:"perfectblock", amount:5 }
      ]
    }
  },
  "ronan":{
    id:"ronan",
    name:"Ronan",
    class:"Cosmic",
    synergies:{
      2:[
        { id:"blackbolt", type:"critdamage", amount:15 }
      ],
      3:[
        { id:"blackbolt", type:"critdamage", amount:20 },
        { id:"ironman", type:"critrate", amount:6 },
        { id:"gamora", type:"critdamage", amount:20 }
      ],
      4:[
        { id:"blackbolt", type:"critdamage", amount:25 },
        { id:"ironman", type:"critrate", amount:7 },
        { id:"gamora", type:"critdamage", amount:25 }
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
        { id:"daredevil", type:"critdamage", amount:15 },
        { id:"thor", type:"perfectblock", amount:3 }
      ],
      3:[
        { id:"captainamerica", type:"critrate", amount:6 },
        { id:"daredevil", type:"critdamage", amount:20 },
        { id:"thor", type:"perfectblock", amount:4 }
      ],
      4:[
        { id:"captainamerica", type:"critrate", amount:7 },
        { id:"daredevil", type:"critdamage", amount:25 },
        { id:"thor", type:"perfectblock", amount:4 }
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
      ],
      3:[
        { id:"drstrange", type:"armor", amount:5 },
        { id:"ironman", type:"armor", amount:5 },
        { id:"juggernaut", type:"armor", amount:6 }
      ],
      4:[
        { id:"drstrange", type:"armor", amount:6 },
        { id:"ironman", type:"armor", amount:6 },
        { id:"juggernaut", type:"armor", amount:7 }
      ]
    }
  },
  
  "ironman":{
    id:"ironman",
    name:"Iron Man",
    class:"Tech",
    synergies:{
      1:[],
      2:[
        { id:"thor", type:"perfectblock", amount:3 }
      ],
      3:[
        { id:"captainamerica", type:"armor", amount:5 },
        { id:"thor", type:"perfectblock", amount:4 }
      ],
      4:[
        { id:"captainamerica", type:"armor", amount:6 },
        { id:"thor", type:"perfectblock", amount:5 }
      ]
    }
  },
  "hulkbuster":{
    id:"hulkbuster",
    name:"Hulk Buster ",
    class:"Tech",
    synergies:{
      2:[
        { id:"hulk", type:"critdamage", amount:15 }
      ],
      3:[
        { id:"hulk", type:"critdamage", amount:20 },
        { id:"ironman", type:"perfectblock", amount:5 },
        { id:"superiorironman", type:"perfectblock", amount:5 }
      ],
      4:[
        { id:"hulk", type:"critdamage", amount:25 },
        { id:"ironman", type:"perfectblock", amount:6 },
        { id:"superiorironman", type:"perfectblock", amount:6 }
      ]
    }
  },
  "rocket":{
    id:"rocket",
    name:"Rocket Raccoon",
    class:"Tech",
    synergies:{
      3:[
        { id:"starlord", type:"armor", amount:5 },
        { id:"ronan", type:"critrate", amount:6 },
        { id:"gamora", type:"perfectblock", amount:4 },
        { id:"drax", type:"perfectblock", amount:4 }
      ],
      4:[
        { id:"starlord", type:"armor", amount:6 },
        { id:"ronan", type:"critrate", amount:7 },
        { id:"gamora", type:"perfectblock", amount:5 },
        { id:"drax", type:"perfectblock", amount:5 }
      ]
    }
  },
  "starlord":{
    id:"starlord",
    name:"Star-Lord",
    class:"Tech",
    synergies:{
      2:[
        { id:"rocket", type:"armor", amount:4 },
        { id:"drax", type:"perfectblock", amount:3 }
      ],
      3:[
        { id:"rocket", type:"armor", amount:5 },
        { id:"drax", type:"perfectblock", amount:4 },
        { id:"gamora", type:"perfectblock", amount:4 }
      ],
      4:[
        { id:"rocket", type:"armor", amount:6 },
        { id:"drax", type:"perfectblock", amount:5 },
        { id:"gamora", type:"perfectblock", amount:5 }
      ]
    }
  },
  "vision":{
    id:"vision",
    name:"Vision",
    class:"Tech",
    synergies:{
      1:[],
      2:[
        { id:"scarletwitch", type:"powergain", amount:3 },
        { id:"ironman", type:"perfectblock", amount:3 }
      ],
      3:[
        { id:"scarletwitch", type:"powergain", amount:4 },
        { id:"ironman", type:"perfectblock", amount:4 }
      ],
      4:[
        { id:"scarletwitch", type:"powergain", amount:5 },
        { id:"ironman", type:"perfectblock", amount:5 }
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
        { id:"scarletwitch", type:"perfectblock", amount:3 }
      ],
      3:[
        { id:"ironman", type:"health", amount:5 },
        { id:"scarletwitch", type:"perfectblock", amount:4 },
        { id:"ultron", type:"attack", amount:4 }
      ],
      4:[
        { id:"ironman", type:"health", amount:6 },
        { id:"scarletwitch", type:"perfectblock", amount:5 },
        { id:"ultron", type:"attack", amount:5 }
      ]
    }
  },
  "ultron":{
    id:"ultron",
    name:"Ultron",
    class:"Tech",
    synergies:{
      3:[
        { id:"ironman", type:"health", amount:5 },
        { id:"scarletwitch", type:"armor", amount:5 }
      ],
      4:[
        { id:"ironman", type:"health", amount:6 },
        { id:"scarletwitch", type:"armor", amount:6 }
      ],
    }
  },
  "colossus":{
    id:"colossus",
    name:"Colossus",
    class:"Mutant",
    synergies:{
      1:[],
      2:[
        { id:"juggernaut", type:"critrate", amount:5 },
      ],
      3:[
        { id:"juggernaut", type:"critrate", amount:6 },
        { id:"wolverine", type:"armor", amount:5 },
        { id:"magik", type:"health", amount:4 }
      ],
      4:[
        { id:"juggernaut", type:"critrate", amount:7 },
        { id:"wolverine", type:"armor", amount:6 },
        { id:"magik", type:"health", amount:5 }
      ]
    }
  },
  "cyclops":{
    id:"cyclops",
    name:"Cyclops",
    class:"Mutant",
    synergies:{
      2:[
        { id:"wolverine", type:"critdamage", amount:15 }
      ],
      3:[
        { id:"wolverine", type:"critdamage", amount:20 },
        { id:"magneto", type:"attack", amount:4 }
      ],
      4:[
        { id:"wolverine", type:"critdamage", amount:25 },
        { id:"magneto", type:"attack", amount:5 }
      ]
    }
  },
  "deadpool":{
    id:"deadpool",
    name:"Deadpool",
    class:"Mutant",
    synergies:{
      2:[
        { id:"rhino", type:"critrate", amount:5 },
        { id:"wolverine", type:"health", amount:3 },
        { id:"punisher", type:"perfectblock", amount:3 }
      ],
      3:[
        { id:"rhino", type:"critrate", amount:6 },
        { id:"wolverine", type:"health", amount:4 },
        { id:"punisher", type:"perfectblock", amount:4 }
      ],
      4:[
        { id:"rhino", type:"critrate", amount:7 },
        { id:"wolverine", type:"health", amount:5 },
        { id:"punisher", type:"perfectblock", amount:5 }
      ]
    }
  },
  "magneto":{
    id:"magneto",
    name:"Magneto",
    class:"Mutant",
    synergies:{
      3:[
        { id:"wolverine", type:"critrate", amount:6 },
        { id:"cyclops", type:"block", amount:15 },
        { id:"storm", type:"critdamage", amount:20 }
      ],
      4:[
        { id:"wolverine", type:"critrate", amount:7 },
        { id:"cyclops", type:"block", amount:20 },
        { id:"storm", type:"critdamage", amount:25 }
      ]
    }
  },
  "storm":{
    id:"storm",
    name:"Storm",
    class:"Mutant",
    synergies:{
      2:[
        { id:"blackpanther", type:"powergain", amount:3 },
      ],
      3:[
        { id:"magik", type:"armor", amount:6 },
        { id:"cyclops", type:"perfectblock", amount:4 },
        { id:"blackpanther", type:"powergain", amount:4 }
      ],
      4:[
        { id:"magik", type:"armor", amount:7 },
        { id:"cyclops", type:"perfectblock", amount:5 },
        { id:"blackpanther", type:"powergain", amount:5 },
        { id:"magneto", type:"critrate", amount:7 }
      ]
    }
  },
  "wolverine":{
    id:"wolverine",
    name:"Wolverine",
    class:"Mutant",
    synergies:{
      1:[],
      2:[
        { id:"cyclops", type:"critdamage", amount:15 }
      ],
      3:[
        { id:"cyclops", type:"critdamage", amount:20 },
        { id:"captainamerica", type:"armor", amount:5 },
        { id:"magneto", type:"critrate", amount:6 }
      ],
      4:[
        { id:"cyclops", type:"critdamage", amount:25 },
        { id:"captainamerica", type:"armor", amount:6 },
        { id:"magneto", type:"critrate", amount:7 }
      ]
    }
  },
  "blackpanther":{
    id:"blackpanther",
    name:"Black Panther",
    class:"Skill",
    synergies:{
      1:[],
      2:[
        { id:"ironfist", type:"critdamage", amount:15 }
      ],
      3:[
        { id:"ironfist", type:"critdamage", amount:20 },
        { id:"storm", type:"powergain", amount:4 },
        { id:"deadpool", type:"critrate", amount:6 },
      ],
      4:[
        { id:"ironfist", type:"critdamage", amount:25 },
        { id:"storm", type:"powergain", amount:5 },
        { id:"deadpool", type:"critrate", amount:7 },
      ]
    }
  },
  "daredevil":{
    id:"daredevil",
    name:"Daredevil",
    class:"Skill",
    synergies:{
      3:[
        { id:"superiorironman", type:"critdamage", amount:20 },
        { id:"blackwidow", type:"powergain", amount:4 }
      ],
      4:[
        { id:"superiorironman", type:"critdamage", amount:25 },
        { id:"blackwidow", type:"powergain", amount:5 }
      ]
    }
  },
  "hawkeye":{
    id:"hawkeye",
    name:"Hawkeye",
    class:"Skill",
    synergies:{
      1:[],
      2:[
        { id:"scarletwitch", type:"powergain", amount:3 }
      ],
      3:[
        { id:"scarletwitch", type:"powergain", amount:4 },
        { id:"ironman", type:"armor", amount:5 }
      ],
      4:[
        { id:"scarletwitch", type:"powergain", amount:5 },
        { id:"ironman", type:"armor", amount:6 },
        { id:"hulk", type:"armor", amount:6 }
      ]
    }
  },
  "punisher":{
    id:"punisher",
    name:"Punisher",
    class:"Skill",
    synergies:{
      2:[
        { id:"spiderman", type:"critdamage", amount:15 },
      ],
      3:[
        { id:"spiderman", type:"critdamage", amount:20 },
        { id:"rhino", type:"perfectblock", amount:4 }
      ],
      4:[
        { id:"spiderman", type:"critdamage", amount:25 },
        { id:"rhino", type:"perfectblock", amount:5 }
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
        { id:"captainamerica", type:"perfectblock", amount:3 },
      ],
      3:[
        { id:"wolverine", type:"armor", amount:5 },
        { id:"captainamerica", type:"perfectblock", amount:4 },
      ],
      4:[
        { id:"wolverine", type:"armor", amount:6 },
        { id:"captainamerica", type:"perfectblock", amount:5 },
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
        { id:"wintersoldier", type:"powergain", amount:3 },
      ],
      3:[
        { id:"hulk", type:"stun", amount:20 },
        { id:"msmarvel", type:"armor", amount:5 },
        { id:"wintersoldier", type:"powergain", amount:4 },
        { id:"hawkeye", type:"powergain", amount:4 },
      ],
      4:[
        { id:"hulk", type:"stun", amount:25 },
        { id:"msmarvel", type:"armor", amount:6 },
        { id:"wintersoldier", type:"powergain", amount:5 },
        { id:"hawkeye", type:"powergain", amount:5 },
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
      ],
      3:[
        { id:"rhino", type:"armor", amount:5 },
        { id:"hulk", type:"attack", amount:4 },
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
      ],
      3:[
        { id:"wintersoldier", type:"armor", amount:5 },
        { id:"spiderman", type:"armor", amount:5 },
        { id:"superiorironman", type:"critrate", amount:6 },
        { id:"ironman", type:"perfectblock", amount:4 },
      ],
      4:[
        { id:"wintersoldier", type:"armor", amount:6 },
        { id:"spiderman", type:"armor", amount:6 },
        { id:"superiorironman", type:"critrate", amount:7 },
        { id:"ironman", type:"perfectblock", amount:5 },
      ]
    }
  },
  "electro":{
    id:"electro",
    name:"Electro",
    class:"Science",
    synergies:{
      3:[
        { id:"spiderman", type:"attack", amount:4 },
        { id:"rhino", type:"armor", amount:5 },
      ],
      4:[
        { id:"spiderman", type:"attack", amount:5 },
        { id:"rhino", type:"armor", amount:6 },
      ]
    }
  },
  "hulk":{
    id:"hulk",
    name:"Hulk",
    class:"Science",
    synergies:{
      1:[],
      2:[
        { id:"thor", type:"critdamage", amount:15 },
      ],
      3:[
        { id:"thor", type:"armor", amount:5 },
        { id:"abomination", type:"critrate", amount:6 },
        { id:"hawkeye", type:"critdamage", amount:20 },
      ],
      4:[
        { id:"thor", type:"armor", amount:6 },
        { id:"abomination", type:"critrate", amount:7 },
        { id:"hawkeye", type:"critdamage", amount:25 },
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
      ],
      3:[
        { id:"spiderman", type:"critrate", amount:6 },
        { id:"abomination", type:"armor", amount:5 },
        { id:"electro", type:"perfectblock", amount:4 },
      ],
      4:[
        { id:"spiderman", type:"critrate", amount:7 },
        { id:"abomination", type:"armor", amount:6 },
        { id:"electro", type:"perfectblock", amount:5 },
      ]
    }
  },
  "spiderman":{
    id:"spiderman",
    name:"Spider-Man",
    class:"Science",
    synergies:{
      1:[
        { id:"wolverine", type:"health", amount:5 },
        { id:"hawkeye", type:"attack", amount:5 },
      ],
      2:[
        { id:"wolverine", type:"health", amount:5 },
        { id:"hawkeye", type:"attack", amount:5 },
      ],
      3:[
        { id:"wolverine", type:"health", amount:5 },
        { id:"hawkeye", type:"attack", amount:5 },
        { id:"electro", type:"health", amount:6 },
        { id:"captainamerica", type:"attack", amount:5 },
      ],
      4:[
        { id:"wolverine", type:"health", amount:6 },
        { id:"hawkeye", type:"attack", amount:6 },
        { id:"electro", type:"health", amount:7 },
        { id:"captainamerica", type:"attack", amount:6 },
      ]
    }
  },
  "drstrange":{
    id:"drstrange",
    name:"Dr. Strange",
    class:"Mystic",
    synergies:{
      3:[
        { id:"thor", type:"armor", amount:5 },
        { id:"spiderman", type:"armor", amount:5 },
        { id:"scarletwitch", type:"block", amount:15 },
        { id:"blackbolt", type:"perfectblock", amount:4 },
      ],
      4:[
        { id:"thor", type:"armor", amount:6 },
        { id:"spiderman", type:"armor", amount:6 },
        { id:"scarletwitch", type:"block", amount:20 },
        { id:"blackbolt", type:"perfectblock", amount:5 },
      ]
    }
  },
  "ironfist":{
    id:"ironfist",
    name:"Iron Fist",
    class:"Mystic",
    synergies:{
      2:[
        { id:"blackpanther", type:"armor", amount:4 },
      ],
      3:[
        { id:"blackpanther", type:"armor", amount:5 },
        { id:"drstrange", type:"armor", amount:5 },
      ]
    }
  },
  "juggernaut":{
    id:"juggernaut",
    name:"Juggernaut",
    class:"Mystic",
    synergies:{
      1:[],
      2:[
        { id:"colossus", type:"critrate", amount:5 },
      ],
      3:[
        { id:"drstrange", type:"attack", amount:4 },
        { id:"colossus", type:"critrate", amount:6 },
        { id:"hulk", type:"critrate", amount:6 },
      ],
      4:[
        { id:"drstrange", type:"attack", amount:5 },
        { id:"colossus", type:"critrate", amount:7 },
        { id:"hulk", type:"critrate", amount:7 },
      ]
    }
  },
  "magik":{
    id:"magik",
    name:"Magik",
    class:"Mystic",
    synergies:{
      2:[
        { id:"colossus", type:"health", amount:4 },
      ],
      3:[
        { id:"storm", type:"armor", amount:5 },
        { id:"colossus", type:"health", amount:5 },
        { id:"cyclops", type:"perfectblock", amount:4 },
      ],
      4:[
        { id:"storm", type:"armor", amount:6 },
        { id:"colossus", type:"health", amount:6 },
        { id:"cyclops", type:"perfectblock", amount:5 },
        { id:"juggernaut", type:"critrate", amount:7 },
      ]
    }
  },
  "scarletwitch":{
    id:"scarletwitch",
    name:"Scarlet Witch",
    class:"Mystic",
    synergies:{
      1:[],
      2:[
        { id:"captainmarvel", type:"armor", amount:4 },
      ],
      3:[
        { id:"captainmarvel", type:"armor", amount:5 },
        { id:"vision", type:"powergain", amount:4 },
      ]
    }
  },
  "unstoppablecolossus":{
    id:"unstoppablecolossus",
    name:"Unstoppable Colossus",
    class:"Mystic",
    synergies:{
      2:[
        { id:"magik", type:"health", amount:4 },
        { id:"juggernaut", type:"critdamage", amount:15 },
      ],
      3:[
        { id:"wolverine", type:"armor", amount:5 },
        { id:"magik", type:"health", amount:5 },
        { id:"cyclops", type:"perfectblock", amount:4 },
        { id:"juggernaut", type:"critdamage", amount:20 },
      ],
      4:[
        { id:"wolverine", type:"armor", amount:6 },
        { id:"magik", type:"health", amount:6 },
        { id:"cyclops", type:"perfectblock", amount:5 },
        { id:"juggernaut", type:"critdamage", amount:25 },
      ]
    }
  }
};