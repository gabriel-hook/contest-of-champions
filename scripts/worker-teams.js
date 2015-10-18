onmessage = function (event){
  if (event.data.type === 'build'){
    build(event.data.options);
  }
};

function build(options){
  var algorithm = options.algorithm;
  var champions = options.champions;
  var size = options.size;
  var levels = options.levels;
  var weights = options.weights;

  var delay = 250;
  var lastTime;
  function progress(current, max, description){
    var now = new Date().getTime();
    var elapsed = now - (lastTime || 0);
    var value = {
      current: current,
      max: max
    };
    if(description)
      value.description = description;

    if(current === 0 || current === max || elapsed >= delay){
      postMessage({ 
        type: 'progress', 
        progress: value
      });
      lastTime = now;
    }
  }
  
  if(!CoC.algorithm[algorithm]){
    postMessage({ 
      type: 'failed', 
      message: 'Algorithm not found'
    });
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
        '2': 'duplicates-2',
        '3': 'duplicates-3',
        '4': 'duplicates-4',
        '5': 'duplicates-5'
      };
    return CoC.settings.getWeight(CoC.settings.getDuplicateWeight.keys[number]);
  };

  //Get result from algorithm
  var result = CoC.algorithm[algorithm].build({ 
    champions: champions, 
    size: size, 
    levels: levels,
    progress: progress
  });

  postMessage({ 
    type: 'complete', 
    result: result 
  });
}
