var CoC=CoC || {};
CoC.manager = CoC.manager || {};

CoC.manager.initialize = function(){
  CoC.utils.info({
    style: 'initialize',
    value: "Contest of Champions - Roster Manager v"+CoC.version+" -"
  },{
    style: 'link',
    value: "https://github.com/gabriel-hook/contest-of-champions"
  });

  //reset settings if we are a new version!
  if(CoC.settings.getValue("hasDefaults") !== true || CoC.settings.getValue("version") !== CoC.version){
    CoC.settings.preset.apply("defaults", true, true);
    CoC.settings.setValue("hasDefaults", true);
    CoC.settings.setValue("version", CoC.version);
  }
};

CoC.manager.reset=function(){
  localStorage.clear();
  location.reload();
};

CoC.hasUrlParam=function(fragment, param){
  if(fragment === undefined)
    return false;
  if(param !== undefined)
    return $.url().fparam(fragment + "?" + param) !== undefined;
  return $.url().attr("fragment").replace(/[?].*/, '') === fragment;
};

CoC.getUrlParam=function(fragment, param){
  if(fragment === undefined || param === undefined)
    return undefined;
  return $.url().fparam(fragment + "?" + param);
};

CoC.setUrlParam=function(fragment, param, value){
  if(fragment === undefined || param === undefined || value === undefined)
    return;
  //build hash
  var hash = "#"+fragment+"?"+param + "=" + value;
  window.location.hash = hash;
  //track this pageview
  var path = location.pathname;
  if(location.hash)
    path += location.hash;
  CoC.tracking.pageView(path);
};

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
};
CoC.settings.saveObjectToLocalStorage=function(key,value){
  if(window && window.Storage){
    localStorage.setItem(key, JSON.stringify(value));
  }
};

CoC.settings.misc = CoC.settings.loadObjectFromLocalStorage("misc");
CoC.settings.getValue=function(key){
  return CoC.settings.misc[key];
};
CoC.settings.setValue=function(key,value){
  CoC.settings.misc[key]=value;
  CoC.settings.saveObjectToLocalStorage("misc", CoC.settings.misc);
};

CoC.settings.weights = CoC.settings.loadObjectFromLocalStorage("weights");

CoC.settings.getWeight=function(key){
  var weight = CoC.settings.weights[key];
  return (weight === undefined)? 1: weight;
};

CoC.settings.setWeight=function(type, weight){
  CoC.settings.weights[type] = weight;
  CoC.settings.saveObjectToLocalStorage("weights", CoC.settings.weights);
};

CoC.settings.keys = CoC.settings.keys || {};

//duplcates-X
CoC.settings.keys.duplicates=new function(){
  this.map = {};
  this.get=function(number){
    var value = this.map[number];
    if(value === undefined){
      value = this.map[number] = "duplicates-"+number;
    }
    return value;
  };
};

CoC.settings.setDuplicateWeight=function(number,weight){
  if(isNaN(parseInt(number)) || number < 2 || number > 5)
    return;
  CoC.settings.setWeight(CoC.settings.keys.duplicates.get(number), weight);
};
CoC.settings.getDuplicateWeight=function(number){
  return CoC.settings.getWeight(CoC.settings.keys.duplicates.get(number));
};
