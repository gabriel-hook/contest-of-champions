var CoC = CoC || {};
CoC.data = CoC.data || {};

//Effects
CoC.data.effects = new Backbone.Collection([

  { uid: "attack", name:"Attack", description:"Increases damage on all attacks.", image:"images/effects/attack", base:5 },
  { uid: "stun", name:"Stun", description:"Chance to Stun on special attacks.", image:"images/effects/stun", base:15 },
  { uid: "critrate", name:"Critical Rate", description:"Increases the chance for Critical hit.", image:"images/effects/critical", base:5 },
  { uid: "critdamage", name:"Critical Damage", description:"Increases damage multiplier for Critical hits.", image:"images/effects/critical", base:15 },
  { uid: "powergain", name:"Power Gain", description:"Gain additional Power (used to trigger a special) whenever Power is gained.", image:"images/effects/mana", base:3 },
  { uid: "powersteal", name:"Power Steal", description:"Gain Power (used to trigger a special) when attacking.", image:"images/effects/mana_steal", base:3 },
  { uid: "perfectblock", name:"Perfect Block", description:"Increased chance to Perfect Block for 0 damage.", image:"images/effects/block", base:3 },
  { uid: "block", name:"Block Proficiency", description:"Increases Block effectiveness for less damage taken.", image:"images/effects/block", base:10 },
  { uid: "armor", name:"Armor", description:"Increases Armor so that all damage taken is decreased.", image:"images/effects/armor", base:4 },
  { uid: "health", name:"Health", description:"Increases champion Health.", image:"images/effects/health", base:4 },
  { uid: "healthsteal", name:"Health Steal", description:"Gain Health when attacking.", image:"images/effects/health_steal", base:4 }

], {
  model: CoC.model.Effect
});