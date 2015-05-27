CoC.data.synergies={
  "pblock":"Perfect Block Chance",
  "block":"Block Proficiency",
  "armor":"Armor",
  "critdmg":"Crit Damage",
  "critrate":"Crit Rate",
  "pgain":"Power Gain",
  "attack":"Attack",
  "health":"Health"
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
    name:"Spiderman",
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