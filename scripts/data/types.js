var CoC = CoC || {};
CoC.data = CoC.data || {};

//Champion Types
CoC.data.types = new Backbone.Collection([

  { uid:"cosmic", image:"images/icons/cosmic.png" },
  { uid:"tech", image:"images/icons/tech.png" },
  { uid:"mutant", image:"images/icons/mutant.png" },
  { uid:"skill", image:"images/icons/skill.png" },
  { uid:"science", image:"images/icons/science.png" },
  { uid:"mystic", image:"images/icons/mystic.png" }
  
], {
  model: CoC.model.Type
});
