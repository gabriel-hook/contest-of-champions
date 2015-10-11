var CoC = CoC || {};
CoC.data = CoC.data || {};

//Effects
CoC.data.effects = new Backbone.Collection([

  { uid: "attack", image:"images/effects/attack", base:5 },
  { uid: "stun", image:"images/effects/stun", base:15 },
  { uid: "critrate", image:"images/effects/critical", base:5 },
  { uid: "critdamage", image:"images/effects/critical", base:15 },
  { uid: "powergain", image:"images/effects/mana", base:3 },
  { uid: "powersteal", image:"images/effects/mana_steal", base:3 },
  { uid: "perfectblock", image:"images/effects/block", base:3 },
  { uid: "block", image:"images/effects/block", base:10 },
  { uid: "armor", image:"images/effects/armor", base:4 },
  { uid: "health", image:"images/effects/health", base:4 },
  { uid: "healthsteal", image:"images/effects/health_steal", base:4 }

], {
  model: CoC.model.Effect
});
