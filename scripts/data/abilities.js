var CoC = CoC || {};
CoC.data = CoC.data || {};

//Champion Types
CoC.data.abilities = new Backbone.Collection([

  { uid:"stun" },
  { uid:"fatigue" },
  { uid:"powerdrain" },
  { uid:"powerburn" },
  { uid:"bleed" },
  { uid:"cauterize" },
  { uid:"armorbreak" },
  { uid:"fury" },
  { uid:"regeneration" },
  { uid:"unstoppable" },
  { uid:"poison" },
  { uid:"armorup" },
  { uid:"plusdamage" },
  { uid:"pluscritrate" },
  { uid:"pluscritdamage" },
  { uid:"poisonimmunity" },
  { uid:"bleedimmunity" },

], {
  model: CoC.model.Ability
});
