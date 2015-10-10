var CoC = CoC || {};
CoC.data = CoC.data || {};

//Champion Types
CoC.data.types = new Backbone.Collection([

  { uid:"cosmic", name:"Cosmic", image:"images/icons/cosmic.png" },
  { uid:"tech", name:"Tech", image:"images/icons/tech.png" },
  { uid:"mutant", name:"Mutant", image:"images/icons/mutant.png" },
  { uid:"skill", name:"Skill", image:"images/icons/skill.png" },
  { uid:"science", name:"Science", image:"images/icons/science.png" },
  { uid:"mystic", name:"Mystic", image:"images/icons/mystic.png" }
  
], {
  model: CoC.model.Type
});
