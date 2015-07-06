var CoC = CoC || {};
CoC.data = CoC.data || {};

//Champions
CoC.data.crystals = new Backbone.Collection([

  { uid:"daily", name:"Daily", image:"daily", hologram:"basic" },
  { uid:"2star", name:"2-Star", image:"lottery", hologram:"basic" },
  { uid:"premium", name:"Premium", image:"premium", hologram:"event" },
  { uid:"versus", name:"Versus", image:"versus", hologram:"basic" },
  { uid:"arena", name:"Arena", image:"battlechips", hologram:"event" },
  
], {
  model: CoC.model.Crystal
});

CoC.data.crystalChampions = new Backbone.Collection([], {
  model: CoC.model.CrystalChampion
});

CoC.data.crystalChampions.add([
  { crystalId:"daily", championId:"gamora", championStars:1 },
]);

CoC.data.crystalChampions.add([
  { crystalId:"versus", championId:"punisher", championStars:2 },
]);

CoC.data.crystalChampions.add([
  { crystalId:"arena", championId:"punisher", championStars:3 },
  { crystalId:"arena", championId:"punisher", championStars:4 },
]);
