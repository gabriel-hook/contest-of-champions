CoC.settings.preset.add(null, "Defaults",{
//weights
  "stars-1":0.5,
  "stars-2":1,
  "stars-3":2,
  "stars-4":4,

  "awakened":1.5,

  "attack":5,
  "stun":4,
  "critrate":3,
  "critdamage":2,
  "powergain":1,
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
  "roster-filter-4":true,
  "roster-filter-3":true,
  "roster-filter-2":true,
  "roster-filter-1":true,
//build settings 
  "algorithm":"greedy",
  "size":3,
  "include-4":true,
  "include-3":true,
  "include-2":true,
  "include-1":true,
  "quest-group":false,
  "include-extras":true
});
CoC.settings.preset.add("Synergies", "Offensive",{
  "attack":7,
  "stun":5,
  "critrate":4,
  "critdamage":4,
  "powergain":2,
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