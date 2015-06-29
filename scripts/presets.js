CoC.settings.preset.add(null, "Defaults",{
//weights
  "stars-1":0.5,
  "stars-2":1,
  "stars-3":2,
  "stars-4":4,

  "awakened":1.5,

  "attack":8,
  "stun":5,
  "critrate":5,
  "critdamage":5,
  "powergain":3,
  "perfectblock":1,
  "block":1,
  "armor":1,
  "health":1,
  
  "duplicates-2":0.8,
  "duplicates-3":0.4,
  "duplicates-4":0.2,
  "duplicates-5":0.1
},{
//roster settings 
  "roster-sort":"stars",
  "roster-filter-stars-4":true,
  "roster-filter-stars-3":true,
  "roster-filter-stars-2":true,
  "roster-filter-stars-1":true,
//build settings 
  "build-algorithm":"shuffle",
  "build-size":3,
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


//Set defaults
if(CoC.settings.getValue("hasDefaults") !== true || CoC.settings.getValue("version") != CoC.version){
  CoC.settings.preset.apply("defaults", CoC.settings.preset.always, CoC.settings.preset.always);
  CoC.settings.setValue("hasDefaults", true);
  CoC.settings.setValue("version", CoC.version);
}