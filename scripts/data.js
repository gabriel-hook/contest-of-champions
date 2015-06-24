//All Effect Types
CoC.data.effects = new Backbone.Collection([], {
  model: CoC.model.Effect
});
CoC.data.effects.add({ uid: "attack", name:"Attack", image:"images/effects/attack.jpg", base:5 });
CoC.data.effects.add({ uid: "critrate", name:"Critical Rate", image:"images/effects/critical.jpg", base:5 });
CoC.data.effects.add({ uid: "critdamage", name:"Critical Damage", image:"images/effects/critical.jpg", base:15 });
CoC.data.effects.add({ uid: "stun", name:"Stun", image:"images/effects/stun.jpg", base:15 });
CoC.data.effects.add({ uid: "powergain", name:"Power Gain", image:"images/effects/mana.jpg", base:3 });
CoC.data.effects.add({ uid: "powersteal", name:"Power Steal", image:"images/effects/mana_steal.jpg", base:3 });
CoC.data.effects.add({ uid: "perfectblock", name:"Perfect Block", image:"images/effects/block.jpg", base:3 });
CoC.data.effects.add({ uid: "block", name:"Block Proficiency", image:"images/effects/block.jpg", base:10 });
CoC.data.effects.add({ uid: "armor", name:"Armor", image:"images/effects/armor.jpg", base:4 });
CoC.data.effects.add({ uid: "health", name:"Health", image:"images/effects/health.jpg", base:4 });
CoC.data.effects.add({ uid: "healthsteal", name:"Health Steal", image:"images/effects/health_steal.jpg", base:4 });

//Classes
CoC.data.championTypes=[
  "Cosmic",
  "Tech",
  "Mutant",
  "Skill",
  "Science",
  "Mystic"
];

//Ranks and Levels
CoC.data.championLevels={
  1:[ 10, 20 ],
  2:[ 10, 20, 30 ],
  3:[ 10, 20, 30, 40 ],
  4:[ 10, 20, 30, 40, 50 ]
}

//Champions
CoC.data.champions = new Backbone.Collection([], {
  model: CoC.model.Champion
});
CoC.data.champions.add({ uid:"blackbolt", name:"Black Bolt", type:"Cosmic", stars: 2 });
CoC.data.champions.add({ uid:"blackbolt", name:"Black Bolt", type:"Cosmic", stars: 3 });
CoC.data.champions.add({ uid:"captainmarvel", name:"Captain Marvel", type:"Cosmic", stars: 3 });
CoC.data.champions.add({ uid:"captainmarvel", name:"Captain Marvel", type:"Cosmic", stars: 4 });
CoC.data.champions.add({ uid:"drax", name:"Drax", type:"Cosmic", stars: 2 });
CoC.data.champions.add({ uid:"drax", name:"Drax", type:"Cosmic", stars: 3 });
CoC.data.champions.add({ uid:"drax", name:"Drax", type:"Cosmic", stars: 4 });
CoC.data.champions.add({ uid:"gamora", name:"Gamora", type:"Cosmic", stars: 1 });
CoC.data.champions.add({ uid:"gamora", name:"Gamora", type:"Cosmic", stars: 2 });
CoC.data.champions.add({ uid:"gamora", name:"Gamora", type:"Cosmic", stars: 3 });
CoC.data.champions.add({ uid:"gamora", name:"Gamora", type:"Cosmic", stars: 4 });
CoC.data.champions.add({ uid:"msmarvel", name:"Ms. Marvel", type:"Cosmic", stars: 3 });
CoC.data.champions.add({ uid:"msmarvel", name:"Ms. Marvel", type:"Cosmic", stars: 4 });
CoC.data.champions.add({ uid:"ronan", name:"Ronan", type:"Cosmic", stars: 2 });
CoC.data.champions.add({ uid:"ronan", name:"Ronan", type:"Cosmic", stars: 3 });
CoC.data.champions.add({ uid:"ronan", name:"Ronan", type:"Cosmic", stars: 4 });
CoC.data.champions.add({ uid:"superiorironman", name:"Superior Iron Man", type:"Cosmic", stars: 2 });
CoC.data.champions.add({ uid:"superiorironman", name:"Superior Iron Man", type:"Cosmic", stars: 3 });
CoC.data.champions.add({ uid:"superiorironman", name:"Superior Iron Man", type:"Cosmic", stars: 4 });
CoC.data.champions.add({ uid:"thor", name:"Thor", type:"Cosmic", stars: 2 });
CoC.data.champions.add({ uid:"thor", name:"Thor", type:"Cosmic", stars: 3 });
CoC.data.champions.add({ uid:"thor", name:"Thor", type:"Cosmic", stars: 4 });
CoC.data.champions.add({ uid:"ironman", name:"Iron Man", type:"Tech", stars: 1 });
CoC.data.champions.add({ uid:"ironman", name:"Iron Man", type:"Tech", stars: 2 });
CoC.data.champions.add({ uid:"ironman", name:"Iron Man", type:"Tech", stars: 3 });
CoC.data.champions.add({ uid:"ironman", name:"Iron Man", type:"Tech", stars: 4 });
CoC.data.champions.add({ uid:"hulkbuster", name:"Hulkbuster", type:"Tech", stars: 2 });
CoC.data.champions.add({ uid:"hulkbuster", name:"Hulkbuster", type:"Tech", stars: 3 });
CoC.data.champions.add({ uid:"hulkbuster", name:"Hulkbuster", type:"Tech", stars: 4 });
CoC.data.champions.add({ uid:"rocket", name:"Rocket Raccoon", type:"Tech", stars: 3 });
CoC.data.champions.add({ uid:"rocket", name:"Rocket Raccoon", type:"Tech", stars: 4 });
CoC.data.champions.add({ uid:"starlord", name:"Star-Lord", type:"Tech", stars: 2 });
CoC.data.champions.add({ uid:"starlord", name:"Star-Lord", type:"Tech", stars: 3 });
CoC.data.champions.add({ uid:"starlord", name:"Star-Lord", type:"Tech", stars: 4 });
CoC.data.champions.add({ uid:"vision", name:"Vision", type:"Tech", stars: 1 });
CoC.data.champions.add({ uid:"vision", name:"Vision", type:"Tech", stars: 2 });
CoC.data.champions.add({ uid:"vision", name:"Vision", type:"Tech", stars: 3 });
CoC.data.champions.add({ uid:"vision", name:"Vision", type:"Tech", stars: 4 });
CoC.data.champions.add({ uid:"thevision", name:"The Vision", type:"Tech", stars: 2 });
CoC.data.champions.add({ uid:"thevision", name:"The Vision", type:"Tech", stars: 3 });
CoC.data.champions.add({ uid:"thevision", name:"The Vision", type:"Tech", stars: 4 });
CoC.data.champions.add({ uid:"ultron", name:"Ultron", type:"Tech", stars: 3 });
CoC.data.champions.add({ uid:"ultron", name:"Ultron", type:"Tech", stars: 4 });
CoC.data.champions.add({ uid:"colossus", name:"Colossus", type:"Mutant", stars: 1 });
CoC.data.champions.add({ uid:"colossus", name:"Colossus", type:"Mutant", stars: 2 });
CoC.data.champions.add({ uid:"colossus", name:"Colossus", type:"Mutant", stars: 3 });
CoC.data.champions.add({ uid:"colossus", name:"Colossus", type:"Mutant", stars: 4 });
CoC.data.champions.add({ uid:"cyclops", name:"Cyclops", type:"Mutant", stars: 2 });
CoC.data.champions.add({ uid:"cyclops", name:"Cyclops", type:"Mutant", stars: 3 });
CoC.data.champions.add({ uid:"cyclops", name:"Cyclops", type:"Mutant", stars: 4 });
CoC.data.champions.add({ uid:"deadpool", name:"Deadpool", type:"Mutant", stars: 2 });
CoC.data.champions.add({ uid:"deadpool", name:"Deadpool", type:"Mutant", stars: 3 });
CoC.data.champions.add({ uid:"deadpool", name:"Deadpool", type:"Mutant", stars: 4 });
CoC.data.champions.add({ uid:"magneto", name:"Magneto", type:"Mutant", stars: 3 });
CoC.data.champions.add({ uid:"magneto", name:"Magneto", type:"Mutant", stars: 4 });
CoC.data.champions.add({ uid:"storm", name:"Storm", type:"Mutant", stars: 2 });
CoC.data.champions.add({ uid:"storm", name:"Storm", type:"Mutant", stars: 3 });
CoC.data.champions.add({ uid:"storm", name:"Storm", type:"Mutant", stars: 4 });
CoC.data.champions.add({ uid:"wolverine", name:"Wolverine", type:"Mutant", stars: 1 });
CoC.data.champions.add({ uid:"wolverine", name:"Wolverine", type:"Mutant", stars: 2 });
CoC.data.champions.add({ uid:"wolverine", name:"Wolverine", type:"Mutant", stars: 3 });
CoC.data.champions.add({ uid:"wolverine", name:"Wolverine", type:"Mutant", stars: 4 });
CoC.data.champions.add({ uid:"blackpanther", name:"Black Panther", type:"Skill", stars: 1 });
CoC.data.champions.add({ uid:"blackpanther", name:"Black Panther", type:"Skill", stars: 2 });
CoC.data.champions.add({ uid:"blackpanther", name:"Black Panther", type:"Skill", stars: 3 });
CoC.data.champions.add({ uid:"blackpanther", name:"Black Panther", type:"Skill", stars: 4 });
CoC.data.champions.add({ uid:"blackwidow", name:"Black Widow", type:"Skill", stars: 2 });
CoC.data.champions.add({ uid:"blackwidow", name:"Black Widow", type:"Skill", stars: 3 });
CoC.data.champions.add({ uid:"blackwidow", name:"Black Widow", type:"Skill", stars: 4 });
CoC.data.champions.add({ uid:"daredevil", name:"Daredevil", type:"Skill", stars: 3 });
CoC.data.champions.add({ uid:"daredevil", name:"Daredevil", type:"Skill", stars: 4 });
CoC.data.champions.add({ uid:"hawkeye", name:"Hawkeye", type:"Skill", stars: 1 });
CoC.data.champions.add({ uid:"hawkeye", name:"Hawkeye", type:"Skill", stars: 2 });
CoC.data.champions.add({ uid:"hawkeye", name:"Hawkeye", type:"Skill", stars: 3 });
CoC.data.champions.add({ uid:"hawkeye", name:"Hawkeye", type:"Skill", stars: 4 });
CoC.data.champions.add({ uid:"punisher", name:"Punisher", type:"Skill", stars: 2 });
CoC.data.champions.add({ uid:"punisher", name:"Punisher", type:"Skill", stars: 3 });
CoC.data.champions.add({ uid:"punisher", name:"Punisher", type:"Skill", stars: 4 });
CoC.data.champions.add({ uid:"wintersoldier", name:"Winter Soldier", type:"Skill", stars: 2 });
CoC.data.champions.add({ uid:"wintersoldier", name:"Winter Soldier", type:"Skill", stars: 3 });
CoC.data.champions.add({ uid:"wintersoldier", name:"Winter Soldier", type:"Skill", stars: 4 });
CoC.data.champions.add({ uid:"abomination", name:"Abomination", type:"Science", stars: 2 });
CoC.data.champions.add({ uid:"abomination", name:"Abomination", type:"Science", stars: 3 });
CoC.data.champions.add({ uid:"abomination", name:"Abomination", type:"Science", stars: 4 });
CoC.data.champions.add({ uid:"captainamerica", name:"Captain America", type:"Science", stars: 2 });
CoC.data.champions.add({ uid:"captainamerica", name:"Captain America", type:"Science", stars: 3 });
CoC.data.champions.add({ uid:"captainamerica", name:"Captain America", type:"Science", stars: 4 });
CoC.data.champions.add({ uid:"electro", name:"Electro", type:"Science", stars: 3 });
CoC.data.champions.add({ uid:"electro", name:"Electro", type:"Science", stars: 4 });
CoC.data.champions.add({ uid:"hulk", name:"Hulk", type:"Science", stars: 1 });
CoC.data.champions.add({ uid:"hulk", name:"Hulk", type:"Science", stars: 2 });
CoC.data.champions.add({ uid:"hulk", name:"Hulk", type:"Science", stars: 3 });
CoC.data.champions.add({ uid:"hulk", name:"Hulk", type:"Science", stars: 4 });
CoC.data.champions.add({ uid:"rhino", name:"Rhino", type:"Science", stars: 2 });
CoC.data.champions.add({ uid:"rhino", name:"Rhino", type:"Science", stars: 3 });
CoC.data.champions.add({ uid:"rhino", name:"Rhino", type:"Science", stars: 4 });
CoC.data.champions.add({ uid:"spiderman", name:"Spider-Man", type:"Science", stars: 1 });
CoC.data.champions.add({ uid:"spiderman", name:"Spider-Man", type:"Science", stars: 2 });
CoC.data.champions.add({ uid:"spiderman", name:"Spider-Man", type:"Science", stars: 3 });
CoC.data.champions.add({ uid:"spiderman", name:"Spider-Man", type:"Science", stars: 4 });
CoC.data.champions.add({ uid:"drstrange", name:"Dr. Strange", type:"Mystic", stars: 3 });
CoC.data.champions.add({ uid:"drstrange", name:"Dr. Strange", type:"Mystic", stars: 4 });
CoC.data.champions.add({ uid:"ironfist", name:"Iron Fist", type:"Mystic", stars: 2 });
CoC.data.champions.add({ uid:"ironfist", name:"Iron Fist", type:"Mystic", stars: 3 });
CoC.data.champions.add({ uid:"juggernaut", name:"Juggernaut", type:"Mystic", stars: 1 });
CoC.data.champions.add({ uid:"juggernaut", name:"Juggernaut", type:"Mystic", stars: 2 });
CoC.data.champions.add({ uid:"juggernaut", name:"Juggernaut", type:"Mystic", stars: 3 });
CoC.data.champions.add({ uid:"juggernaut", name:"Juggernaut", type:"Mystic", stars: 4 });
CoC.data.champions.add({ uid:"magik", name:"Magik", type:"Mystic", stars: 2 });
CoC.data.champions.add({ uid:"magik", name:"Magik", type:"Mystic", stars: 3 });
CoC.data.champions.add({ uid:"magik", name:"Magik", type:"Mystic", stars: 4 });
CoC.data.champions.add({ uid:"scarletwitch", name:"Scarlet Witch", type:"Mystic", stars: 1 });
CoC.data.champions.add({ uid:"scarletwitch", name:"Scarlet Witch", type:"Mystic", stars: 2 });
CoC.data.champions.add({ uid:"scarletwitch", name:"Scarlet Witch", type:"Mystic", stars: 3 });
CoC.data.champions.add({ uid:"unstoppablecolossus", name:"Unstoppable Colossus", type:"Mystic", stars: 2 });
CoC.data.champions.add({ uid:"unstoppablecolossus", name:"Unstoppable Colossus", type:"Mystic", stars: 3 });
CoC.data.champions.add({ uid:"unstoppablecolossus", name:"Unstoppable Colossus", type:"Mystic", stars: 4 });

CoC.data.synergies = new Backbone.Collection([], {
  model: CoC.model.Synergy
});

CoC.data.synergies.add({ fromId:"blackbolt", fromStars: 2, toId: "cyclops", effectId:"block", effectAmount:10 });
CoC.data.synergies.add({ fromId:"blackbolt", fromStars: 3, toId: "cyclops", effectId:"block", effectAmount:15 });
CoC.data.synergies.add({ fromId:"blackbolt", fromStars: 3, toId: "spiderman", effectId:"armor", effectAmount:5 });
CoC.data.synergies.add({ fromId:"blackbolt", fromStars: 3, toId: "ronan", effectId:"attack", effectAmount:4 });
CoC.data.synergies.add({ fromId:"blackbolt", fromStars: 3, toId: "hulk", effectId:"critdamage", effectAmount:20 });

CoC.data.synergies.add({ fromId:"captainmarvel", fromStars: 3, toId: "captainamerica", effectId:"armor", effectAmount:5 });
CoC.data.synergies.add({ fromId:"captainmarvel", fromStars: 3, toId: "gamora", effectId:"armor", effectAmount:5 });
CoC.data.synergies.add({ fromId:"captainmarvel", fromStars: 3, toId: "ironman", effectId:"armor", effectAmount:5 });
CoC.data.synergies.add({ fromId:"captainmarvel", fromStars: 4, toId: "captainamerica", effectId:"armor", effectAmount:6 });
CoC.data.synergies.add({ fromId:"captainmarvel", fromStars: 4, toId: "gamora", effectId:"armor", effectAmount:6 });
CoC.data.synergies.add({ fromId:"captainmarvel", fromStars: 4, toId: "ironman", effectId:"armor", effectAmount:6 });
CoC.data.synergies.add({ fromId:"captainmarvel", fromStars: 4, toId: "wolverine", effectId:"powergain", effectAmount:5 });

CoC.data.synergies.add({ fromId:"drax", fromStars:2, toId:"starlord", effectId:"perfectblock", effectAmount:3 });
CoC.data.synergies.add({ fromId:"drax", fromStars:2, toId:"gamora", effectId:"critdamage", effectAmount:15 });
CoC.data.synergies.add({ fromId:"drax", fromStars:3, toId:"starlord", effectId:"perfectblock", effectAmount:4 });
CoC.data.synergies.add({ fromId:"drax", fromStars:3, toId:"gamora", effectId:"critdamage", effectAmount:20 });
CoC.data.synergies.add({ fromId:"drax", fromStars:4, toId:"starlord", effectId:"perfectblock", effectAmount:5 });
CoC.data.synergies.add({ fromId:"drax", fromStars:4, toId:"gamora", effectId:"critdamage", effectAmount:25 });

CoC.data.synergies.add({ fromId:"gamora", fromStars:2, toId:"starlord", effectId:"armor", effectAmount:4 });
CoC.data.synergies.add({ fromId:"gamora", fromStars:3, toId:"starlord", effectId:"armor", effectAmount:5 });
CoC.data.synergies.add({ fromId:"gamora", fromStars:3, toId:"drax", effectId:"critdamage", effectAmount:20 });
CoC.data.synergies.add({ fromId:"gamora", fromStars:4, toId:"starlord", effectId:"armor", effectAmount:6 });
CoC.data.synergies.add({ fromId:"gamora", fromStars:4, toId:"drax", effectId:"critdamage", effectAmount:25 });

CoC.data.synergies.add({ fromId:"msmarvel", fromStars:3, toId:"captainamerica", effectId:"armor", effectAmount:5 });
CoC.data.synergies.add({ fromId:"msmarvel", fromStars:3, toId:"ironman", effectId:"perfectblock", effectAmount:4 });
CoC.data.synergies.add({ fromId:"msmarvel", fromStars:3, toId:"thor", effectId:"perfectblock", effectAmount:4 });
CoC.data.synergies.add({ fromId:"msmarvel", fromStars:3, toId:"hulk", effectId:"perfectblock", effectAmount:4 });
CoC.data.synergies.add({ fromId:"msmarvel", fromStars:4, toId:"captainamerica", effectId:"armor", effectAmount:6 });
CoC.data.synergies.add({ fromId:"msmarvel", fromStars:4, toId:"ironman", effectId:"perfectblock", effectAmount:5 });
CoC.data.synergies.add({ fromId:"msmarvel", fromStars:4, toId:"thor", effectId:"perfectblock", effectAmount:5 });
CoC.data.synergies.add({ fromId:"msmarvel", fromStars:4, toId:"hulk", effectId:"perfectblock", effectAmount:5 });

CoC.data.synergies.add({ fromId:"ronan", fromStars:2, toId:"blackbolt", effectId:"critdamage", effectAmount:15 });
CoC.data.synergies.add({ fromId:"ronan", fromStars:3, toId:"blackbolt", effectId:"critdamage", effectAmount:20 });
CoC.data.synergies.add({ fromId:"ronan", fromStars:3, toId:"ironman", effectId:"critrate", effectAmount:6 });
CoC.data.synergies.add({ fromId:"ronan", fromStars:3, toId:"gamora", effectId:"critdamage", effectAmount:20 });
CoC.data.synergies.add({ fromId:"ronan", fromStars:4, toId:"blackbolt", effectId:"critdamage", effectAmount:25 });
CoC.data.synergies.add({ fromId:"ronan", fromStars:4, toId:"ironman", effectId:"critrate", effectAmount:7 });
CoC.data.synergies.add({ fromId:"ronan", fromStars:4, toId:"gamora", effectId:"critdamage", effectAmount:25 });

CoC.data.synergies.add({ fromId:"superiorironman", fromStars:2, toId:"captainamerica", effectId:"critrate", effectAmount:5 });
CoC.data.synergies.add({ fromId:"superiorironman", fromStars:2, toId:"daredevil", effectId:"critdamage", effectAmount:15 });
CoC.data.synergies.add({ fromId:"superiorironman", fromStars:2, toId:"thor", effectId:"perfectblock", effectAmount:3 });
CoC.data.synergies.add({ fromId:"superiorironman", fromStars:3, toId:"captainamerica", effectId:"critrate", effectAmount:6 });
CoC.data.synergies.add({ fromId:"superiorironman", fromStars:3, toId:"daredevil", effectId:"critdamage", effectAmount:20 });
CoC.data.synergies.add({ fromId:"superiorironman", fromStars:3, toId:"thor", effectId:"perfectblock", effectAmount:4 });
CoC.data.synergies.add({ fromId:"superiorironman", fromStars:4, toId:"captainamerica", effectId:"critrate", effectAmount:7 });
CoC.data.synergies.add({ fromId:"superiorironman", fromStars:4, toId:"daredevil", effectId:"critdamage", effectAmount:25 });
CoC.data.synergies.add({ fromId:"superiorironman", fromStars:4, toId:"thor", effectId:"perfectblock", effectAmount:4 });

CoC.data.synergies.add({ fromId:"thor", fromStars:2, toId:"drstrange", effectId:"armor", effectAmount:4 });
CoC.data.synergies.add({ fromId:"thor", fromStars:2, toId:"ironman", effectId:"armor", effectAmount:4 });
CoC.data.synergies.add({ fromId:"thor", fromStars:3, toId:"drstrange", effectId:"armor", effectAmount:5 });
CoC.data.synergies.add({ fromId:"thor", fromStars:3, toId:"ironman", effectId:"armor", effectAmount:5 });
CoC.data.synergies.add({ fromId:"thor", fromStars:3, toId:"juggernaut", effectId:"armor", effectAmount:6 });
CoC.data.synergies.add({ fromId:"thor", fromStars:4, toId:"drstrange", effectId:"armor", effectAmount:6 });
CoC.data.synergies.add({ fromId:"thor", fromStars:4, toId:"ironman", effectId:"armor", effectAmount:6 });
CoC.data.synergies.add({ fromId:"thor", fromStars:4, toId:"juggernaut", effectId:"armor", effectAmount:7 });

CoC.data.synergies.add({ fromId:"ironman", fromStars:2, toId:"thor", effectId:"perfectblock", effectAmount:3 });
CoC.data.synergies.add({ fromId:"ironman", fromStars:3, toId:"captainamerica", effectId:"armor", effectAmount:5 });
CoC.data.synergies.add({ fromId:"ironman", fromStars:3, toId:"thor", effectId:"perfectblock", effectAmount:4 });
CoC.data.synergies.add({ fromId:"ironman", fromStars:4, toId:"captainamerica", effectId:"armor", effectAmount:6 });
CoC.data.synergies.add({ fromId:"ironman", fromStars:4, toId:"thor", effectId:"perfectblock", effectAmount:5 });

CoC.data.synergies.add({ fromId:"hulkbuster", fromStars:2, toId:"hulk", effectId:"critdamage", effectAmount:15 });
CoC.data.synergies.add({ fromId:"hulkbuster", fromStars:3, toId:"hulk", effectId:"critdamage", effectAmount:20 });
CoC.data.synergies.add({ fromId:"hulkbuster", fromStars:3, toId:"ironman", effectId:"perfectblock", effectAmount:5 });
CoC.data.synergies.add({ fromId:"hulkbuster", fromStars:3, toId:"superiorironman", effectId:"perfectblock", effectAmount:5 });
CoC.data.synergies.add({ fromId:"hulkbuster", fromStars:4, toId:"hulk", effectId:"critdamage", effectAmount:25 });
CoC.data.synergies.add({ fromId:"hulkbuster", fromStars:4, toId:"ironman", effectId:"perfectblock", effectAmount:6 });
CoC.data.synergies.add({ fromId:"hulkbuster", fromStars:4, toId:"superiorironman", effectId:"perfectblock", effectAmount:6 });

CoC.data.synergies.add({ fromId:"rocket", fromStars:3, toId:"starlord", effectId:"armor", effectAmount:5 });
CoC.data.synergies.add({ fromId:"rocket", fromStars:3, toId:"ronan", effectId:"critrate", effectAmount:6 });
CoC.data.synergies.add({ fromId:"rocket", fromStars:3, toId:"gamora", effectId:"perfectblock", effectAmount:4 });
CoC.data.synergies.add({ fromId:"rocket", fromStars:3, toId:"drax", effectId:"perfectblock", effectAmount:4 });
CoC.data.synergies.add({ fromId:"rocket", fromStars:4, toId:"starlord", effectId:"armor", effectAmount:6 });
CoC.data.synergies.add({ fromId:"rocket", fromStars:4, toId:"ronan", effectId:"critrate", effectAmount:7 });
CoC.data.synergies.add({ fromId:"rocket", fromStars:4, toId:"gamora", effectId:"perfectblock", effectAmount:5 });
CoC.data.synergies.add({ fromId:"rocket", fromStars:4, toId:"drax", effectId:"perfectblock", effectAmount:5 });

CoC.data.synergies.add({ fromId:"starlord", fromStars:2, toId:"rocket", effectId:"armor", effectAmount:4 });
CoC.data.synergies.add({ fromId:"starlord", fromStars:2, toId:"drax", effectId:"perfectblock", effectAmount:3 });
CoC.data.synergies.add({ fromId:"starlord", fromStars:3, toId:"rocket", effectId:"armor", effectAmount:5 });
CoC.data.synergies.add({ fromId:"starlord", fromStars:3, toId:"drax", effectId:"perfectblock", effectAmount:4 });
CoC.data.synergies.add({ fromId:"starlord", fromStars:3, toId:"gamora", effectId:"perfectblock", effectAmount:4 });
CoC.data.synergies.add({ fromId:"starlord", fromStars:4, toId:"rocket", effectId:"armor", effectAmount:6 });
CoC.data.synergies.add({ fromId:"starlord", fromStars:4, toId:"drax", effectId:"perfectblock", effectAmount:5 });
CoC.data.synergies.add({ fromId:"starlord", fromStars:4, toId:"gamora", effectId:"perfectblock", effectAmount:5 });

CoC.data.synergies.add({ fromId:"vision", fromStars:2, toId:"scarletwitch", effectId:"powergain", effectAmount:3 });
CoC.data.synergies.add({ fromId:"vision", fromStars:2, toId:"ironman", effectId:"perfectblock", effectAmount:3 });
CoC.data.synergies.add({ fromId:"vision", fromStars:3, toId:"scarletwitch", effectId:"powergain", effectAmount:4 });
CoC.data.synergies.add({ fromId:"vision", fromStars:3, toId:"ironman", effectId:"perfectblock", effectAmount:4 });
CoC.data.synergies.add({ fromId:"vision", fromStars:4, toId:"scarletwitch", effectId:"powergain", effectAmount:5 });
CoC.data.synergies.add({ fromId:"vision", fromStars:4, toId:"ironman", effectId:"perfectblock", effectAmount:5 });

CoC.data.synergies.add({ fromId:"thevision", fromStars:2, toId:"ironman", effectId:"health", effectAmount:4 });
CoC.data.synergies.add({ fromId:"thevision", fromStars:2, toId:"scarletwitch", effectId:"perfectblock", effectAmount:3 });
CoC.data.synergies.add({ fromId:"thevision", fromStars:3, toId:"ironman", effectId:"health", effectAmount:5 });
CoC.data.synergies.add({ fromId:"thevision", fromStars:3, toId:"scarletwitch", effectId:"perfectblock", effectAmount:4 });
CoC.data.synergies.add({ fromId:"thevision", fromStars:3, toId:"ultron", effectId:"attack", effectAmount:4 });
CoC.data.synergies.add({ fromId:"thevision", fromStars:4, toId:"ironman", effectId:"health", effectAmount:6 });
CoC.data.synergies.add({ fromId:"thevision", fromStars:4, toId:"scarletwitch", effectId:"perfectblock", effectAmount:5 });
CoC.data.synergies.add({ fromId:"thevision", fromStars:4, toId:"ultron", effectId:"attack", effectAmount:5 });

CoC.data.synergies.add({ fromId:"ultron", fromStars:3, toId:"ironman", effectId:"health", effectAmount:5 });
CoC.data.synergies.add({ fromId:"ultron", fromStars:3, toId:"scarletwitch", effectId:"armor", effectAmount:5 });
CoC.data.synergies.add({ fromId:"ultron", fromStars:4, toId:"ironman", effectId:"health", effectAmount:6 });
CoC.data.synergies.add({ fromId:"ultron", fromStars:4, toId:"scarletwitch", effectId:"armor", effectAmount:6 });
  
CoC.data.synergies.add({ fromId:"colossus", fromStars:2, toId:"juggernaut", effectId:"critrate", effectAmount:5 });
CoC.data.synergies.add({ fromId:"colossus", fromStars:3, toId:"juggernaut", effectId:"critrate", effectAmount:6 });
CoC.data.synergies.add({ fromId:"colossus", fromStars:3, toId:"wolverine", effectId:"armor", effectAmount:5 });
CoC.data.synergies.add({ fromId:"colossus", fromStars:3, toId:"magik", effectId:"health", effectAmount:4 });
CoC.data.synergies.add({ fromId:"colossus", fromStars:4, toId:"juggernaut", effectId:"critrate", effectAmount:7 });
CoC.data.synergies.add({ fromId:"colossus", fromStars:4, toId:"wolverine", effectId:"armor", effectAmount:6 });
CoC.data.synergies.add({ fromId:"colossus", fromStars:4, toId:"magik", effectId:"health", effectAmount:5 });

CoC.data.synergies.add({ fromId:"cyclops", fromStars:2, toId:"wolverine", effectId:"critdamage", effectAmount:15 });
CoC.data.synergies.add({ fromId:"cyclops", fromStars:3, toId:"wolverine", effectId:"critdamage", effectAmount:20 });
CoC.data.synergies.add({ fromId:"cyclops", fromStars:3, toId:"magneto", effectId:"attack", effectAmount:4 });
CoC.data.synergies.add({ fromId:"cyclops", fromStars:4, toId:"wolverine", effectId:"critdamage", effectAmount:25 });
CoC.data.synergies.add({ fromId:"cyclops", fromStars:4, toId:"magneto", effectId:"attack", effectAmount:5 });

CoC.data.synergies.add({ fromId:"deadpool", fromStars:2, toId:"rhino", effectId:"critrate", effectAmount:5 });
CoC.data.synergies.add({ fromId:"deadpool", fromStars:2, toId:"wolverine", effectId:"health", effectAmount:3 });
CoC.data.synergies.add({ fromId:"deadpool", fromStars:2, toId:"punisher", effectId:"perfectblock", effectAmount:3 });
CoC.data.synergies.add({ fromId:"deadpool", fromStars:3, toId:"rhino", effectId:"critrate", effectAmount:6 });
CoC.data.synergies.add({ fromId:"deadpool", fromStars:3, toId:"wolverine", effectId:"health", effectAmount:4 });
CoC.data.synergies.add({ fromId:"deadpool", fromStars:3, toId:"punisher", effectId:"perfectblock", effectAmount:4 });
CoC.data.synergies.add({ fromId:"deadpool", fromStars:4, toId:"rhino", effectId:"critrate", effectAmount:7 });
CoC.data.synergies.add({ fromId:"deadpool", fromStars:4, toId:"wolverine", effectId:"health", effectAmount:5 });
CoC.data.synergies.add({ fromId:"deadpool", fromStars:4, toId:"punisher", effectId:"perfectblock", effectAmount:5 });

CoC.data.synergies.add({ fromId:"magneto", fromStars:3, toId:"wolverine", effectId:"critrate", effectAmount:6 });
CoC.data.synergies.add({ fromId:"magneto", fromStars:3, toId:"cyclops", effectId:"block", effectAmount:15 });
CoC.data.synergies.add({ fromId:"magneto", fromStars:3, toId:"storm", effectId:"critdamage", effectAmount:20 });
CoC.data.synergies.add({ fromId:"magneto", fromStars:4, toId:"wolverine", effectId:"critrate", effectAmount:7 });
CoC.data.synergies.add({ fromId:"magneto", fromStars:4, toId:"cyclops", effectId:"block", effectAmount:20 });
CoC.data.synergies.add({ fromId:"magneto", fromStars:4, toId:"storm", effectId:"critdamage", effectAmount:25 });

CoC.data.synergies.add({ fromId:"storm", fromStars:2, toId:"blackpanther", effectId:"powergain", effectAmount:3 });
CoC.data.synergies.add({ fromId:"storm", fromStars:3, toId:"magik", effectId:"armor", effectAmount:6 });
CoC.data.synergies.add({ fromId:"storm", fromStars:3, toId:"cyclops", effectId:"perfectblock", effectAmount:4 });
CoC.data.synergies.add({ fromId:"storm", fromStars:3, toId:"blackpanther", effectId:"powergain", effectAmount:4 });
CoC.data.synergies.add({ fromId:"storm", fromStars:4, toId:"magik", effectId:"armor", effectAmount:7 });
CoC.data.synergies.add({ fromId:"storm", fromStars:4, toId:"cyclops", effectId:"perfectblock", effectAmount:5 });
CoC.data.synergies.add({ fromId:"storm", fromStars:4, toId:"blackpanther", effectId:"powergain", effectAmount:5 });
CoC.data.synergies.add({ fromId:"storm", fromStars:4, toId:"magneto", effectId:"critrate", effectAmount:7 });

CoC.data.synergies.add({ fromId:"wolverine", fromStars:2, toId:"cyclops", effectId:"critdamage", effectAmount:15 });
CoC.data.synergies.add({ fromId:"wolverine", fromStars:3, toId:"cyclops", effectId:"critdamage", effectAmount:20 });
CoC.data.synergies.add({ fromId:"wolverine", fromStars:3, toId:"captainamerica", effectId:"armor", effectAmount:5 });
CoC.data.synergies.add({ fromId:"wolverine", fromStars:3, toId:"magneto", effectId:"critrate", effectAmount:6 });
CoC.data.synergies.add({ fromId:"wolverine", fromStars:4, toId:"cyclops", effectId:"critdamage", effectAmount:25 });
CoC.data.synergies.add({ fromId:"wolverine", fromStars:4, toId:"captainamerica", effectId:"armor", effectAmount:6 });
CoC.data.synergies.add({ fromId:"wolverine", fromStars:4, toId:"magneto", effectId:"critrate", effectAmount:7 });

CoC.data.synergies.add({ fromId:"blackpanther", fromStars:2, toId:"ironfist", effectId:"critdamage", effectAmount:15 });
CoC.data.synergies.add({ fromId:"blackpanther", fromStars:3, toId:"ironfist", effectId:"critdamage", effectAmount:20 });
CoC.data.synergies.add({ fromId:"blackpanther", fromStars:3, toId:"storm", effectId:"powergain", effectAmount:4 });
CoC.data.synergies.add({ fromId:"blackpanther", fromStars:3, toId:"deadpool", effectId:"critrate", effectAmount:6 });
CoC.data.synergies.add({ fromId:"blackpanther", fromStars:4, toId:"ironfist", effectId:"critdamage", effectAmount:25 });
CoC.data.synergies.add({ fromId:"blackpanther", fromStars:4, toId:"storm", effectId:"powergain", effectAmount:5 });
CoC.data.synergies.add({ fromId:"blackpanther", fromStars:4, toId:"deadpool", effectId:"critrate", effectAmount:7 });

CoC.data.synergies.add({ fromId:"daredevil", fromStars:3, toId:"superiorironman", effectId:"critdamage", effectAmount:20 });
CoC.data.synergies.add({ fromId:"daredevil", fromStars:3, toId:"blackwidow", effectId:"powergain", effectAmount:4 });
CoC.data.synergies.add({ fromId:"daredevil", fromStars:4, toId:"superiorironman", effectId:"critdamage", effectAmount:25 });
CoC.data.synergies.add({ fromId:"daredevil", fromStars:4, toId:"blackwidow", effectId:"powergain", effectAmount:5 });

CoC.data.synergies.add({ fromId:"hawkeye", fromStars:2, toId:"scarletwitch", effectId:"powergain", effectAmount:3 });
CoC.data.synergies.add({ fromId:"hawkeye", fromStars:3, toId:"scarletwitch", effectId:"powergain", effectAmount:4 });
CoC.data.synergies.add({ fromId:"hawkeye", fromStars:3, toId:"ironman", effectId:"armor", effectAmount:5 });
CoC.data.synergies.add({ fromId:"hawkeye", fromStars:4, toId:"scarletwitch", effectId:"powergain", effectAmount:5 });
CoC.data.synergies.add({ fromId:"hawkeye", fromStars:4, toId:"ironman", effectId:"armor", effectAmount:6 });
CoC.data.synergies.add({ fromId:"hawkeye", fromStars:4, toId:"hulk", effectId:"armor", effectAmount:6 });

CoC.data.synergies.add({ fromId:"punisher", fromStars:2, toId:"spiderman", effectId:"critdamage", effectAmount:15 });
CoC.data.synergies.add({ fromId:"punisher", fromStars:3, toId:"spiderman", effectId:"critdamage", effectAmount:20 });
CoC.data.synergies.add({ fromId:"punisher", fromStars:3, toId:"rhino", effectId:"perfectblock", effectAmount:4 });
CoC.data.synergies.add({ fromId:"punisher", fromStars:4, toId:"spiderman", effectId:"critdamage", effectAmount:25 });
CoC.data.synergies.add({ fromId:"punisher", fromStars:4, toId:"rhino", effectId:"perfectblock", effectAmount:5 });

CoC.data.synergies.add({ fromId:"wintersoldier", fromStars:2, toId:"wolverine", effectId:"armor", effectAmount:4 });
CoC.data.synergies.add({ fromId:"wintersoldier", fromStars:2, toId:"captainamerica", effectId:"perfectblock", effectAmount:3 });
CoC.data.synergies.add({ fromId:"wintersoldier", fromStars:3, toId:"wolverine", effectId:"armor", effectAmount:5 });
CoC.data.synergies.add({ fromId:"wintersoldier", fromStars:3, toId:"captainamerica", effectId:"perfectblock", effectAmount:4 });
CoC.data.synergies.add({ fromId:"wintersoldier", fromStars:4, toId:"wolverine", effectId:"armor", effectAmount:6 });
CoC.data.synergies.add({ fromId:"wintersoldier", fromStars:4, toId:"captainamerica", effectId:"perfectblock", effectAmount:5 });

CoC.data.synergies.add({ fromId:"blackwidow", fromStars:2, toId:"msmarvel", effectId:"armor", effectAmount:4 });
CoC.data.synergies.add({ fromId:"blackwidow", fromStars:2, toId:"wintersoldier", effectId:"powergain", effectAmount:3 });
CoC.data.synergies.add({ fromId:"blackwidow", fromStars:3, toId:"hulk", effectId:"stun", effectAmount:20 });
CoC.data.synergies.add({ fromId:"blackwidow", fromStars:3, toId:"msmarvel", effectId:"armor", effectAmount:5 });
CoC.data.synergies.add({ fromId:"blackwidow", fromStars:3, toId:"wintersoldier", effectId:"powergain", effectAmount:4 });
CoC.data.synergies.add({ fromId:"blackwidow", fromStars:3, toId:"hawkeye", effectId:"powergain", effectAmount:4 });
CoC.data.synergies.add({ fromId:"blackwidow", fromStars:4, toId:"hulk", effectId:"stun", effectAmount:25 });
CoC.data.synergies.add({ fromId:"blackwidow", fromStars:4, toId:"msmarvel", effectId:"armor", effectAmount:6 });
CoC.data.synergies.add({ fromId:"blackwidow", fromStars:4, toId:"wintersoldier", effectId:"powergain", effectAmount:5 });
CoC.data.synergies.add({ fromId:"blackwidow", fromStars:4, toId:"hawkeye", effectId:"powergain", effectAmount:5 });

CoC.data.synergies.add({ fromId:"abomination", fromStars:2, toId:"rhino", effectId:"armor", effectAmount:4 });
CoC.data.synergies.add({ fromId:"abomination", fromStars:3, toId:"rhino", effectId:"armor", effectAmount:5 });
CoC.data.synergies.add({ fromId:"abomination", fromStars:3, toId:"hulk", effectId:"attack", effectAmount:4 });
CoC.data.synergies.add({ fromId:"abomination", fromStars:4, toId:"rhino", effectId:"armor", effectAmount:6 });
CoC.data.synergies.add({ fromId:"abomination", fromStars:4, toId:"hulk", effectId:"attack", effectAmount:5 });

CoC.data.synergies.add({ fromId:"captainamerica", fromStars:2, toId:"spiderman", effectId:"armor", effectAmount:4 });
CoC.data.synergies.add({ fromId:"captainamerica", fromStars:2, toId:"superiorironman", effectId:"critrate", effectAmount:5 });
CoC.data.synergies.add({ fromId:"captainamerica", fromStars:2, toId:"ironman", effectId:"armor", effectAmount:3 });
CoC.data.synergies.add({ fromId:"captainamerica", fromStars:3, toId:"wintersoldier", effectId:"armor", effectAmount:5 });
CoC.data.synergies.add({ fromId:"captainamerica", fromStars:3, toId:"spiderman", effectId:"armor", effectAmount:5 });
CoC.data.synergies.add({ fromId:"captainamerica", fromStars:3, toId:"superiorironman", effectId:"critrate", effectAmount:6 });
CoC.data.synergies.add({ fromId:"captainamerica", fromStars:3, toId:"ironman", effectId:"perfectblock", effectAmount:4 });
CoC.data.synergies.add({ fromId:"captainamerica", fromStars:4, toId:"wintersoldier", effectId:"armor", effectAmount:6 });
CoC.data.synergies.add({ fromId:"captainamerica", fromStars:4, toId:"spiderman", effectId:"armor", effectAmount:6 });
CoC.data.synergies.add({ fromId:"captainamerica", fromStars:4, toId:"superiorironman", effectId:"critrate", effectAmount:7 });
CoC.data.synergies.add({ fromId:"captainamerica", fromStars:4, toId:"ironman", effectId:"perfectblock", effectAmount:5 });

CoC.data.synergies.add({ fromId:"electro", fromStars:3, toId:"spiderman", effectId:"attack", effectAmount:4 });
CoC.data.synergies.add({ fromId:"electro", fromStars:3, toId:"rhino", effectId:"armor", effectAmount:5 });
CoC.data.synergies.add({ fromId:"electro", fromStars:4, toId:"spiderman", effectId:"attack", effectAmount:5 });
CoC.data.synergies.add({ fromId:"electro", fromStars:4, toId:"rhino", effectId:"armor", effectAmount:6 });

CoC.data.synergies.add({ fromId:"hulk", fromStars:2, toId:"thor", effectId:"critdamage", effectAmount:15 });
CoC.data.synergies.add({ fromId:"hulk", fromStars:3, toId:"thor", effectId:"armor", effectAmount:5 });
CoC.data.synergies.add({ fromId:"hulk", fromStars:3, toId:"abomination", effectId:"critrate", effectAmount:6 });
CoC.data.synergies.add({ fromId:"hulk", fromStars:3, toId:"hawkeye", effectId:"critdamage", effectAmount:20 });
CoC.data.synergies.add({ fromId:"hulk", fromStars:4, toId:"thor", effectId:"armor", effectAmount:6 });
CoC.data.synergies.add({ fromId:"hulk", fromStars:4, toId:"abomination", effectId:"critrate", effectAmount:7 });
CoC.data.synergies.add({ fromId:"hulk", fromStars:4, toId:"hawkeye", effectId:"critdamage", effectAmount:25 });

CoC.data.synergies.add({ fromId:"rhino", fromStars:2, toId:"spiderman", effectId:"critrate", effectAmount:5 });
CoC.data.synergies.add({ fromId:"rhino", fromStars:2, toId:"abomination", effectId:"armor", effectAmount:4 });
CoC.data.synergies.add({ fromId:"rhino", fromStars:3, toId:"spiderman", effectId:"critrate", effectAmount:6 });
CoC.data.synergies.add({ fromId:"rhino", fromStars:3, toId:"abomination", effectId:"armor", effectAmount:5 });
CoC.data.synergies.add({ fromId:"rhino", fromStars:3, toId:"electro", effectId:"perfectblock", effectAmount:4 });
CoC.data.synergies.add({ fromId:"rhino", fromStars:4, toId:"spiderman", effectId:"critrate", effectAmount:7 });
CoC.data.synergies.add({ fromId:"rhino", fromStars:4, toId:"abomination", effectId:"armor", effectAmount:6 });
CoC.data.synergies.add({ fromId:"rhino", fromStars:4, toId:"electro", effectId:"perfectblock", effectAmount:5 });

CoC.data.synergies.add({ fromId:"spiderman", fromStars:1, toId:"wolverine", effectId:"health", effectAmount:5 });
CoC.data.synergies.add({ fromId:"spiderman", fromStars:1, toId:"hawkeye", effectId:"attack", effectAmount:5 });
CoC.data.synergies.add({ fromId:"spiderman", fromStars:2, toId:"wolverine", effectId:"health", effectAmount:5 });
CoC.data.synergies.add({ fromId:"spiderman", fromStars:2, toId:"hawkeye", effectId:"attack", effectAmount:5 });
CoC.data.synergies.add({ fromId:"spiderman", fromStars:3, toId:"wolverine", effectId:"health", effectAmount:5 });
CoC.data.synergies.add({ fromId:"spiderman", fromStars:3, toId:"hawkeye", effectId:"attack", effectAmount:5 });
CoC.data.synergies.add({ fromId:"spiderman", fromStars:3, toId:"electro", effectId:"health", effectAmount:6 });
CoC.data.synergies.add({ fromId:"spiderman", fromStars:3, toId:"captainamerica", effectId:"attack", effectAmount:5 });
CoC.data.synergies.add({ fromId:"spiderman", fromStars:4, toId:"wolverine", effectId:"health", effectAmount:6 });
CoC.data.synergies.add({ fromId:"spiderman", fromStars:4, toId:"hawkeye", effectId:"attack", effectAmount:6 });
CoC.data.synergies.add({ fromId:"spiderman", fromStars:4, toId:"electro", effectId:"health", effectAmount:7 });
CoC.data.synergies.add({ fromId:"spiderman", fromStars:4, toId:"captainamerica", effectId:"attack", effectAmount:6 });


CoC.data.synergies.add({ fromId:"drstrange", fromStars:3, toId:"thor", effectId:"armor", effectAmount:5 });
CoC.data.synergies.add({ fromId:"drstrange", fromStars:3, toId:"spiderman", effectId:"armor", effectAmount:5 });
CoC.data.synergies.add({ fromId:"drstrange", fromStars:3, toId:"scarletwitch", effectId:"block", effectAmount:15 });
CoC.data.synergies.add({ fromId:"drstrange", fromStars:3, toId:"blackbolt", effectId:"perfectblock", effectAmount:4 });
CoC.data.synergies.add({ fromId:"drstrange", fromStars:4, toId:"thor", effectId:"armor", effectAmount:6 });
CoC.data.synergies.add({ fromId:"drstrange", fromStars:4, toId:"spiderman", effectId:"armor", effectAmount:6 });
CoC.data.synergies.add({ fromId:"drstrange", fromStars:4, toId:"scarletwitch", effectId:"block", effectAmount:20 });
CoC.data.synergies.add({ fromId:"drstrange", fromStars:4, toId:"blackbolt", effectId:"perfectblock", effectAmount:5 });

CoC.data.synergies.add({ fromId:"ironfist", fromStars:2, toId:"blackpanther", effectId:"armor", effectAmount:4 });
CoC.data.synergies.add({ fromId:"ironfist", fromStars:3, toId:"blackpanther", effectId:"armor", effectAmount:5 });
CoC.data.synergies.add({ fromId:"ironfist", fromStars:3, toId:"drstrange", effectId:"armor", effectAmount:5 });

CoC.data.synergies.add({ fromId:"juggernaut", fromStars:2, toId:"colossus", effectId:"critrate", effectAmount:5 });
CoC.data.synergies.add({ fromId:"juggernaut", fromStars:3, toId:"drstrange", effectId:"attack", effectAmount:4 });
CoC.data.synergies.add({ fromId:"juggernaut", fromStars:3, toId:"colossus", effectId:"critrate", effectAmount:6 });
CoC.data.synergies.add({ fromId:"juggernaut", fromStars:3, toId:"hulk", effectId:"critrate", effectAmount:6 });
CoC.data.synergies.add({ fromId:"juggernaut", fromStars:4, toId:"drstrange", effectId:"attack", effectAmount:5 });
CoC.data.synergies.add({ fromId:"juggernaut", fromStars:4, toId:"colossus", effectId:"critrate", effectAmount:7 });
CoC.data.synergies.add({ fromId:"juggernaut", fromStars:4, toId:"hulk", effectId:"critrate", effectAmount:7 });


CoC.data.synergies.add({ fromId:"magik", fromStars:2, toId:"colossus", effectId:"health", effectAmount:4 });
CoC.data.synergies.add({ fromId:"magik", fromStars:3, toId:"storm", effectId:"armor", effectAmount:5 });
CoC.data.synergies.add({ fromId:"magik", fromStars:3, toId:"colossus", effectId:"health", effectAmount:5 });
CoC.data.synergies.add({ fromId:"magik", fromStars:3, toId:"cyclops", effectId:"perfectblock", effectAmount:4 });
CoC.data.synergies.add({ fromId:"magik", fromStars:4, toId:"storm", effectId:"armor", effectAmount:6 });
CoC.data.synergies.add({ fromId:"magik", fromStars:4, toId:"colossus", effectId:"health", effectAmount:6 });
CoC.data.synergies.add({ fromId:"magik", fromStars:4, toId:"cyclops", effectId:"perfectblock", effectAmount:5 });
CoC.data.synergies.add({ fromId:"magik", fromStars:4, toId:"juggernaut", effectId:"critrate", effectAmount:7 });

CoC.data.synergies.add({ fromId:"scarletwitch", fromStars:2, toId:"captainmarvel", effectId:"armor", effectAmount:4 });
CoC.data.synergies.add({ fromId:"scarletwitch", fromStars:3, toId:"captainmarvel", effectId:"armor", effectAmount:5 });
CoC.data.synergies.add({ fromId:"scarletwitch", fromStars:3, toId:"vision", effectId:"powergain", effectAmount:4 });

CoC.data.synergies.add({ fromId:"unstoppablecolossus", fromStars:2, toId:"magik", effectId:"health", effectAmount:4 });
CoC.data.synergies.add({ fromId:"unstoppablecolossus", fromStars:2, toId:"juggernaut", effectId:"critdamage", effectAmount:15 });
CoC.data.synergies.add({ fromId:"unstoppablecolossus", fromStars:3, toId:"wolverine", effectId:"armor", effectAmount:5 });
CoC.data.synergies.add({ fromId:"unstoppablecolossus", fromStars:3, toId:"magik", effectId:"health", effectAmount:5 });
CoC.data.synergies.add({ fromId:"unstoppablecolossus", fromStars:3, toId:"cyclops", effectId:"perfectblock", effectAmount:4 });
CoC.data.synergies.add({ fromId:"unstoppablecolossus", fromStars:3, toId:"juggernaut", effectId:"critdamage", effectAmount:20 });
CoC.data.synergies.add({ fromId:"unstoppablecolossus", fromStars:4, toId:"wolverine", effectId:"armor", effectAmount:6 });
CoC.data.synergies.add({ fromId:"unstoppablecolossus", fromStars:4, toId:"magik", effectId:"health", effectAmount:6 });
CoC.data.synergies.add({ fromId:"unstoppablecolossus", fromStars:4, toId:"cyclops", effectId:"perfectblock", effectAmount:5 });
CoC.data.synergies.add({ fromId:"unstoppablecolossus", fromStars:4, toId:"juggernaut", effectId:"critdamage", effectAmount:25 });