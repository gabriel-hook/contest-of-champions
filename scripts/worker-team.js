var CoC=new function(){
  this.logic={}
  this.data={}
  this.settings={}
};
importScripts('logic.js');
importScripts('data.js');

onmessage = function (event) {
  var roster = event.data.roster;
  var size = event.data.size;
  var settings = event.data.settings;
  var weights = event.data.weights;
  var single = event.data.single;
  var extras = event.data.extras;
  var update = event.data.update;
  
  CoC.settings.getWeight=function(key){
    return weights[key];
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
  var result = CoC.logic.team.build({ 
    heroes:roster, 
    size:size, 
    extras:extras, 
    single:single, 
    progress:function(current, max){
      var time = (new Date()).getTime();
      if(time-lastTime < update)
        return;
      lastTime = time;
      postMessage({ type:"progress", current:current, max:max });
    }  
  });
  postMessage({ type:"complete", result:result });
};