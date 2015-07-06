var CoC = CoC || {};
CoC.data = CoC.data || {};

//Champions
CoC.data.crystals = new Backbone.Collection([

  { uid:"versus", name:"Versus", image:"versus", hologram:"basic" },
  { uid:"arena", name:"Arena", image:"battlechips", hologram:"event" },
  { uid:"alliance", name:"Alliance", image:"alliance", hologram:"event" },
  
  { uid:"daily", name:"Daily", image:"daily", hologram:"basic" },
  
  { uid:"2star", name:"2-Star", image:"lottery", hologram:"basic" },
  { uid:"premium", name:"Premium", image:"premium", hologram:"event" },
  
], {
  model: CoC.model.Crystal
});

CoC.data.crystalChampions = new Backbone.Collection([], {
  model: CoC.model.CrystalChampion
});

CoC.data.crystalChampions.add([
  { crystalId:"versus", championId:"punisher", championStars:2 },
]);

CoC.data.crystalChampions.add([
  { crystalId:"arena", championId:"punisher", championStars:3 },
  { crystalId:"arena", championId:"punisher", championStars:4 },
]);

CoC.data.crystalChampions.add([
  { crystalId:"alliance", championId:"unstoppablecolossus", championStars:2 },
  { crystalId:"alliance", championId:"unstoppablecolossus", championStars:3 },
  { crystalId:"alliance", championId:"unstoppablecolossus", championStars:4 },
]);

CoC.data.crystalChampions.add([
  { crystalId:"daily", championId:"gamora", championStars:1 },
  { crystalId:"daily", championId:"vision", championStars:1 },
  { crystalId:"daily", championId:"colossus", championStars:1 },
  { crystalId:"daily", championId:"blackpanther", championStars:1 },
  { crystalId:"daily", championId:"hawkeye", championStars:1 },
  { crystalId:"daily", championId:"hulk", championStars:1 },
  { crystalId:"daily", championId:"scarletwitch", championStars:1 },

  { crystalId:"daily", championId:"gamora", championStars:2 },
  { crystalId:"daily", championId:"vision", championStars:2 },
  { crystalId:"daily", championId:"colossus", championStars:2 },
  { crystalId:"daily", championId:"blackpanther", championStars:2 },
  { crystalId:"daily", championId:"hawkeye", championStars:2 }
]);

CoC.data.crystalChampions.add([

  { crystalId:"2star", championId:"blackbolt", championStars:2 },
  { crystalId:"2star", championId:"drax", championStars:2 },
  { crystalId:"2star", championId:"gamora", championStars:2 },
  { crystalId:"2star", championId:"superiorironman", championStars:2 },
  { crystalId:"2star", championId:"thor", championStars:2 },
  { crystalId:"2star", championId:"ironman", championStars:2 },
  { crystalId:"2star", championId:"starlord", championStars:2 },
  { crystalId:"2star", championId:"vision", championStars:2 },
  { crystalId:"2star", championId:"colossus", championStars:2 },
  { crystalId:"2star", championId:"cyclops", championStars:2 },
  { crystalId:"2star", championId:"storm", championStars:2 },
  { crystalId:"2star", championId:"wolverine", championStars:2 },
  { crystalId:"2star", championId:"blackpanther", championStars:2 },
  { crystalId:"2star", championId:"blackwidow", championStars:2 },
  { crystalId:"2star", championId:"hawkeye", championStars:2 },
  { crystalId:"2star", championId:"wintersoldier", championStars:2 },
  { crystalId:"2star", championId:"abomination", championStars:2 },
  { crystalId:"2star", championId:"captainamerica", championStars:2 },
  { crystalId:"2star", championId:"hulk", championStars:2 },
  { crystalId:"2star", championId:"rhino", championStars:2 },
  { crystalId:"2star", championId:"spiderman", championStars:2 },
  { crystalId:"2star", championId:"ironfist", championStars:2 },
  { crystalId:"2star", championId:"juggernaut", championStars:2 },
  { crystalId:"2star", championId:"magik", championStars:2 },
  { crystalId:"2star", championId:"scarletwitch", championStars:2 },

]);

CoC.data.crystalChampions.add([

  { crystalId:"premium", championId:"blackbolt", championStars:2 },
  { crystalId:"premium", championId:"drax", championStars:2 },
  { crystalId:"premium", championId:"gamora", championStars:2 },
  { crystalId:"premium", championId:"ronan", championStars:2 },
  { crystalId:"premium", championId:"superiorironman", championStars:2 },
  { crystalId:"premium", championId:"thor", championStars:2 },
  { crystalId:"premium", championId:"ironman", championStars:2 },
  { crystalId:"premium", championId:"starlord", championStars:2 },
  { crystalId:"premium", championId:"vision", championStars:2 },
  { crystalId:"premium", championId:"colossus", championStars:2 },
  { crystalId:"premium", championId:"cyclops", championStars:2 },
  { crystalId:"premium", championId:"storm", championStars:2 },
  { crystalId:"premium", championId:"wolverine", championStars:2 },
  { crystalId:"premium", championId:"blackpanther", championStars:2 },
  { crystalId:"premium", championId:"blackwidow", championStars:2 },
  { crystalId:"premium", championId:"hawkeye", championStars:2 },
  { crystalId:"premium", championId:"wintersoldier", championStars:2 },
  { crystalId:"premium", championId:"abomination", championStars:2 },
  { crystalId:"premium", championId:"captainamerica", championStars:2 },
  { crystalId:"premium", championId:"hulk", championStars:2 },
  { crystalId:"premium", championId:"rhino", championStars:2 },
  { crystalId:"premium", championId:"spiderman", championStars:2 },
  { crystalId:"premium", championId:"ironfist", championStars:2 },
  { crystalId:"premium", championId:"juggernaut", championStars:2 },
  { crystalId:"premium", championId:"magik", championStars:2 },
  { crystalId:"premium", championId:"scarletwitch", championStars:2 },

  { crystalId:"premium", championId:"blackbolt", championStars:3 },
  { crystalId:"premium", championId:"captainmarvel", championStars:3 },
  { crystalId:"premium", championId:"msmarvel", championStars:3 },
  { crystalId:"premium", championId:"drax", championStars:3 },
  { crystalId:"premium", championId:"gamora", championStars:3 },
  { crystalId:"premium", championId:"ronan", championStars:3 },
  { crystalId:"premium", championId:"superiorironman", championStars:3 },
  { crystalId:"premium", championId:"thor", championStars:3 },
  { crystalId:"premium", championId:"ironman", championStars:3 },
  { crystalId:"premium", championId:"rocket", championStars:3 },
  { crystalId:"premium", championId:"starlord", championStars:3 },
  { crystalId:"premium", championId:"colossus", championStars:3 },
  { crystalId:"premium", championId:"cyclops", championStars:3 },
  { crystalId:"premium", championId:"storm", championStars:3 },
  { crystalId:"premium", championId:"wolverine", championStars:3 },
  { crystalId:"premium", championId:"blackpanther", championStars:3 },
  { crystalId:"premium", championId:"blackwidow", championStars:3 },
  { crystalId:"premium", championId:"daredevil", championStars:3 },
  { crystalId:"premium", championId:"hawkeye", championStars:3 },
  { crystalId:"premium", championId:"wintersoldier", championStars:3 },
  { crystalId:"premium", championId:"abomination", championStars:3 },
  { crystalId:"premium", championId:"captainamerica", championStars:3 },
  { crystalId:"premium", championId:"electro", championStars:3 },
  { crystalId:"premium", championId:"hulk", championStars:3 },
  { crystalId:"premium", championId:"rhino", championStars:3 },
  { crystalId:"premium", championId:"spiderman", championStars:3 },
  { crystalId:"premium", championId:"drstrange", championStars:3 },
  { crystalId:"premium", championId:"ironfist", championStars:3 },
  { crystalId:"premium", championId:"juggernaut", championStars:3 },
  { crystalId:"premium", championId:"magik", championStars:3 },
  { crystalId:"premium", championId:"scarletwitch", championStars:3 },
  
  { crystalId:"premium", championId:"captainmarvel", championStars:4 },
  { crystalId:"premium", championId:"msmarvel", championStars:4 },
  { crystalId:"premium", championId:"drax", championStars:4 },
  { crystalId:"premium", championId:"gamora", championStars:4 },
  { crystalId:"premium", championId:"superiorironman", championStars:4 },
  { crystalId:"premium", championId:"thor", championStars:4 },
  { crystalId:"premium", championId:"ironman", championStars:4 },
  { crystalId:"premium", championId:"rocket", championStars:4 },
  { crystalId:"premium", championId:"starlord", championStars:4 },
  { crystalId:"premium", championId:"colossus", championStars:4 },
  { crystalId:"premium", championId:"storm", championStars:4 },
  { crystalId:"premium", championId:"wolverine", championStars:4 },
  { crystalId:"premium", championId:"blackpanther", championStars:4 },
  { crystalId:"premium", championId:"blackwidow", championStars:4 },
  { crystalId:"premium", championId:"daredevil", championStars:4 },
  { crystalId:"premium", championId:"hawkeye", championStars:4 },
  { crystalId:"premium", championId:"wintersoldier", championStars:4 },
  { crystalId:"premium", championId:"abomination", championStars:4 },
  { crystalId:"premium", championId:"captainamerica", championStars:4 },
  { crystalId:"premium", championId:"electro", championStars:4 },
  { crystalId:"premium", championId:"hulk", championStars:4 },
  { crystalId:"premium", championId:"spiderman", championStars:4 },
  { crystalId:"premium", championId:"drstrange", championStars:4 },
  { crystalId:"premium", championId:"juggernaut", championStars:4 },
  { crystalId:"premium", championId:"magik", championStars:4 },
  { crystalId:"premium", championId:"scarletwitch", championStars:4 },
]);
