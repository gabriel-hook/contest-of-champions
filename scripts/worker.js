//load backbone and underscore
importScripts('lib/underscore-min.js', 'lib/backbone-min.js');

//load models, data and algorithms
importScripts('model/champion.js', 'model/effect.js', 'model/synergy.js', 'model/type.js');
importScripts('data/champions.js', 'data/effects.js', 'data/synergies.js', 'data/types.js');
importScripts('algorithm.js');

onmessage = function (event){
  var algorithm = event.data.algorithm;
  var rosterJSON = event.data.roster;
  var size = event.data.size;
  var weights = event.data.weights;
  var quest = event.data.quest;
  var extras = event.data.extras;
  var update = event.data.update;
  
  CoC.settings = {};
  
  CoC.settings.getWeight=function(key){
    var value = weights[key];
    if(value === undefined || value === null)
      return 1;
    return value;
  }
  CoC.settings.getStarWeight=function(stars){
    return CoC.settings.getWeight({
      2:"stars-2",
      3:"stars-3",
      4:"stars-4"
    }[stars]);
  }
  CoC.settings.getDuplicateWeight=function(number){
    return CoC.settings.getWeight({
    2:"duplicates-2",
    3:"duplicates-3",
    4:"duplicates-4",
    5:"duplicates-5"
    }[number]);
  }
  
  var lastTime = (new Date()).getTime();
  if(!CoC.algorithm[algorithm]){
    postMessage({ type:"failed", message:"Algorithm not found" });
    return;
  }
  
  var roster = [];
  for(var i=0; i<rosterJSON.length; i++)
    roster.push(new CoC.model.Champion( rosterJSON[i] ));
  
  var result = CoC.algorithm[algorithm].build({ 
    champions:roster, 
    size:size, 
    extras:extras, 
    quest:quest, 
    progress:function(current, max, description){
      var time = (new Date()).getTime();
      if(!description && time-lastTime < update)
        return;
      lastTime = time;
      postMessage({ 
        type:"progress", 
        current:current, 
        max:max,
        description:description        
      });
    }  
  });

  if(result.teams)
    for(var i=0; i<result.teams.length; i++)
      for(var j=0; j<result.teams[i].length; j++)
        result.teams[i][j] = result.teams[i][j].toJSON();
  
  if(result.extras)
    for(var i=0; i<result.extras.length; i++)
      result.extras[i] = result.extras[i].toJSON();
  
  postMessage({ type:"complete", result:result });
};