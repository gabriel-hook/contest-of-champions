var CoC = CoC || {};
CoC.settings = CoC.settings || {};
CoC.settings.preset = CoC.settings.preset || {};

CoC.settings.preset.list=[];

CoC.settings.preset.ids=function(category){
  var keys = [];
  for(var i in CoC.settings.preset.list)
    if(category === undefined || category === CoC.settings.preset.list[i].category)
      keys.push(CoC.settings.preset.list[i].id);
  return keys;
}

CoC.settings.preset.get=function(id){
  for(var i in CoC.settings.preset.list)
    if(CoC.settings.preset.list[i].id === id)
      return CoC.settings.preset.list[i];
  return null;
}

CoC.settings.preset.info=function(id){
  var preset = CoC.settings.preset.get(id);
  if(preset)
    return {
      id:preset.id,
      name:preset.name,
      category:preset.category
    };
  return null;
}

CoC.settings.preset.apply=function(id, funcWeights, funcSettings){
  var preset = CoC.settings.preset.get(id);
  if(preset){
    if(funcWeights !== undefined)
      for(var key in preset.weights)
        if(funcWeights === true || funcWeights(key, preset.weights[key]))
          CoC.settings.setWeight(key, preset.weights[key]);
    if(funcSettings !== undefined)
      for(var key in preset.settings)
        if(funcSettings === true || funcSettings(key, preset.settings[key]))
          CoC.settings.setValue(key, preset.settings[key]);
  }  
}

CoC.settings.preset.add=function(category, name, weights, settings){
  var id = (category)? [category,name].join("-").toLowerCase(): name.toLowerCase();
  CoC.settings.preset.list.push({
    id:id,
    name:name,
    category:category,
    weights:weights,
    settings:settings
  });
}

CoC.settings.preset.add(null, "Defaults",{
//effect weights
  "attack":8,
  "stun":5,
  "critrate":5,
  "critdamage":5,
  "powergain":3,
  "perfectblock":1,
  "block":1,
  "armor":1,
  "health":1,
//class duplicate weights  
  "duplicates-2":0.8,
  "duplicates-3":0.4,
  "duplicates-4":0.2,
  "duplicates-5":0.1
},{
//roster settings 
  "roster-sort":"stars",
  "roster-sort-direction":"descending",
  "roster-filter-stars-5":true,
  "roster-filter-stars-4":true,
  "roster-filter-stars-3":true,
  "roster-filter-stars-2":true,
  "roster-filter-stars-1":true,
//build settings 
  "build-algorithm":"shuffle",
  "build-size":3,
  "build-levels":true,
  "build-filter-stars-5":true,
  "build-filter-stars-4":true,
  "build-filter-stars-3":true,
  "build-filter-stars-2":true,
  "build-filter-stars-1":true,
  "build-quest-group":false,
  "build-include-extras":true
});
CoC.settings.preset.add("Synergies", "Offensive",{
  "attack":8,
  "stun":4,
  "critrate":4,
  "critdamage":4,
  "powergain":3,
  "perfectblock":1,
  "block":1,
  "armor":1,
  "health":1
})
CoC.settings.preset.add("Synergies", "Balanced",{
  "attack":1,
  "stun":1,
  "critrate":1,
  "critdamage":1,
  "powergain":1,
  "perfectblock":1,
  "block":1,
  "armor":1,
  "health":1
})
CoC.settings.preset.add("Synergies", "Defensive",{
  "attack":1,
  "stun":3,
  "critrate":1,
  "critdamage":1,
  "powergain":2,
  "perfectblock":5,
  "block":5,
  "armor":4,
  "health":3
})
CoC.settings.preset.add("Duplicates", "All",{
  "duplicates-2":1,
  "duplicates-3":1,
  "duplicates-4":1,
  "duplicates-5":1
})
CoC.settings.preset.add("Duplicates", "Balanced",{
  "duplicates-2":0.8,
  "duplicates-3":0.4,
  "duplicates-4":0.2,
  "duplicates-5":0.1
})
CoC.settings.preset.add("Duplicates", "None",{
  "duplicates-2":0,
  "duplicates-3":0,
  "duplicates-4":0,
  "duplicates-5":0
})