var CoC = CoC || {};
CoC.data = CoC.data || {};

//Champions
CoC.data.crystals = new Backbone.Collection([

  { crystalId:"daily", crystalName:"Daily", image:"daily", hologram:"basic" },
  { crystalId:"2star", crystalName:"2-Star", image:"lottery", hologram:"basic" },
  { crystalId:"premium", crystalName:"Premium", image:"premium", hologram:"event" },
  { crystalId:"versus", crystalName:"Versus", image:"versus", hologram:"basic" },
  { crystalId:"arena", crystalName:"Arena", image:"battlechips", hologram:"event" },
  
], {
  model: CoC.model.Crystal
});

CoC.data.crystalChampions = new Backbone.Collection([], {
  model: CoC.model.CrystalChampion
});

CoC.data.crystalChampions.add([
  { crystalId:"daily", championId:"gamora", championStars:1 },
]);
