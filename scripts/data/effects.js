var CoC = CoC || {};
CoC.data = CoC.data || {};

//Effects
CoC.data.effects = new Backbone.Collection([

  { uid: "attack", name:"Attack", image:"images/effects/attack.jpg", base:5 },
  { uid: "critrate", name:"Critical Rate", image:"images/effects/critical.jpg", base:5 },
  { uid: "critdamage", name:"Critical Damage", image:"images/effects/critical.jpg", base:15 },
  { uid: "stun", name:"Stun", image:"images/effects/stun.jpg", base:15 },
  { uid: "powergain", name:"Power Gain", image:"images/effects/mana.jpg", base:3 },
  { uid: "powersteal", name:"Power Steal", image:"images/effects/mana_steal.jpg", base:3 },
  { uid: "perfectblock", name:"Perfect Block", image:"images/effects/block.jpg", base:3 },
  { uid: "block", name:"Block Proficiency", image:"images/effects/block.jpg", base:10 },
  { uid: "armor", name:"Armor", image:"images/effects/armor.jpg", base:4 },
  { uid: "health", name:"Health", image:"images/effects/health.jpg", base:4 },
  { uid: "healthsteal", name:"Health Steal", image:"images/effects/health_steal.jpg", base:4 }

], {
  model: CoC.model.Effect
});