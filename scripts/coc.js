var CoC=CoC || {};
CoC.version = "1.0";

CoC.initialize = function(){
  console.log("Contest of Champions - Roster Manager v"+CoC.version);

  if(CoC.settings.getValue("hasDefaults") !== true || CoC.settings.getValue("version") != CoC.version){
    CoC.settings.preset.apply("defaults", CoC.settings.preset.always, CoC.settings.preset.always);
    CoC.settings.setValue("hasDefaults", true);
    CoC.settings.setValue("version", CoC.version);
  }
  CoC.roster.load();
  CoC.preloadImages();
}

CoC.reset=function(){
  localStorage.clear();
  location.reload();
}

CoC.hasUrlParam=function(fragment, param){
  if(fragment === undefined)
    return false;
  if(param !== undefined)
    return $.url().fparam(fragment + "?" + param) !== undefined;
  return $.url().attr("fragment").replace(/[?].*/, '') === fragment;
}

CoC.getUrlParam=function(fragment, param){
  if(fragment === undefined || param === undefined)
    return undefined;
  return $.url().fparam(fragment + "?" + param);
}

CoC.setUrlParam=function(fragment, param, value){
  if(fragment === undefined || param === undefined || value === undefined)
    return;
  window.location.hash = "#"+fragment+"?"+param + "=" + value;
}

//image preloader for known images
CoC.preloadImages = function(){
  CoC.data.effects.each(function(effect){
    $('<img/>')[0].src = effect.get("image");
  });
  CoC.data.champions.each(function(champion){
    $('<img/>')[0].src = champion.portrait();
    $('<img/>')[0].src = champion.image();
  });
}

CoC.settings = CoC.settings || {};

CoC.settings.loadObjectFromLocalStorage=function(key){
  var object = {};
  if(window && window.Storage){
    var string = localStorage.getItem(key);
    object = JSON.parse(string);
  }
  if(object === null || object === undefined)
    object = {};
  return object;
}
CoC.settings.saveObjectToLocalStorage=function(key,value){
  if(window && window.Storage){
    localStorage.setItem(key, JSON.stringify(value));
  }
}

CoC.settings.misc = CoC.settings.loadObjectFromLocalStorage("misc");
CoC.settings.getValue=function(key){
  return CoC.settings.misc[key];
}
CoC.settings.setValue=function(key,value){
  CoC.settings.misc[key]=value;
  CoC.settings.saveObjectToLocalStorage("misc", CoC.settings.misc);
}

CoC.settings.weights = CoC.settings.loadObjectFromLocalStorage("weights");

CoC.settings.getWeight=function(key){
  var weight = CoC.settings.weights[key];
  return (weight === undefined)? 1: weight;
}

CoC.settings.setWeight=function(type, weight){
  CoC.settings.weights[type] = weight;
  CoC.settings.saveObjectToLocalStorage("weights", CoC.settings.weights);
}

CoC.settings.keys = CoC.settings.keys || {};
 
CoC.settings.keys.stars=new function(){
  this.map = {};
  this.get=function(stars){
    var value = this.map[stars]
    if(value === undefined){
      value = this.map[stars] = "stars-"+stars;
    }
    return value;
  }
};  

//duplcates-X
CoC.settings.keys.duplicates=new function(){
  this.map = {};
  this.get=function(number){
    var value = this.map[number]
    if(value === undefined){
      value = this.map[number] = "duplicates-"+number;
    }
    return value;
  }
};

CoC.settings.setStarWeight=function(stars,weight){
  if(parseInt(stars) === NaN || stars < 1 || stars > 4)
    return;
  CoC.settings.setWeight(CoC.settings.keys.stars.get(stars), weight);
}
CoC.settings.getStarWeight=function(stars){
  return CoC.settings.getWeight(CoC.settings.keys.stars.get(stars));
}

CoC.settings.setDuplicateWeight=function(number,weight){
  if(parseInt(number) === NaN || number < 2 || number > 5)
    return;
  CoC.settings.setWeight(CoC.settings.keys.duplicates.get(number), weight);
}
CoC.settings.getDuplicateWeight=function(number){
  return CoC.settings.getWeight(CoC.settings.keys.duplicates.get(number));
}