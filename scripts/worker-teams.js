onmessage = function (event){
  var algorithm = event.data.algorithm,
    champions = event.data.champions,
    size = event.data.size,
    levels = event.data.levels,
    weights = event.data.weights,
    quest = event.data.quest,
    extras = event.data.extras,
    update = event.data.update;
  var i, j;
  
  if(!CoC.algorithm[algorithm]){
    postMessage({ type:"failed", message:"Algorithm not found" });
    return;
  }
  
  //build mock settings with weights
  CoC.settings = {};
  CoC.settings.getWeight=function(key){
    var value = weights[key];
    if(value === undefined || value === null)
      return 1;
    return value;
  };

  CoC.settings.getDuplicateWeight=function(number){
    if(CoC.settings.getDuplicateWeight.keys === undefined)
      CoC.settings.getDuplicateWeight.keys = {
        2:"duplicates-2",
        3:"duplicates-3",
        4:"duplicates-4",
        5:"duplicates-5"
      };
    return CoC.settings.getWeight(CoC.settings.getDuplicateWeight.keys[number]);
  };
  
  //Build progress function (update only every %update)
  var lastTime = (new Date()).getTime(),
    progress = function(current, max, description){
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
    };

  //Get result from algorithm
  var result = CoC.algorithm[algorithm].build({ 
    champions:champions, 
    size:size, 
    levels:levels,
    extras:extras, 
    quest:quest, 
    progress:progress 
  });

  postMessage({ type:"complete", result:result });
};
