
var CoC=new function(){

  this.data = new function() {};
  this.logic = new function() {};
  this.ui = new function() {};
  
  this.getSynergyTitle=function(key){
    var value = CoC.data.synergies[key];
    return (value === undefined)? key: value;
  }

  
  /************
    SETTINGS
  ************/
  this.settings = new function() {};
  this.settings.weights = {};
  
  this.settings.getWeight=function(key){
    var weight = CoC.settings.weights[key];
    if(weight === undefined)
      weight = 1;
    return weight;
  }
  this.settings.setWeight=function(type, weight){
    CoC.settings.weights[type] = weight;
  }
  
  this.settings.setDuplicateWeight=function(number,weight){
    if(parseInt(number) === NaN || number < 2 || number > 5)
      return;
  
    CoC.settings.weights["class"+number+"x"] = weight;
  }
  
  /*********
    ROSTER
  *********/
  this.roster = new function() {};
  this.roster.add=function(id,stars){
    CoC.roster.stars[stars][id]={
      id:id,
      stars:stars
    }
    CoC.roster.save();
  }
  this.roster.remove=function(id,stars){
    delete CoC.roster.stars[stars][id];
    CoC.roster.save();
  }
  this.roster.all=function(){
    var array=[];
    for(var s=1;s<=4;s++)
      for(var o in CoC.roster.stars[s])
        array.push(CoC.roster.stars[s][o]);
    return array;
  }
  this.roster.load=function(){
    function loadObjectFromLocalStorage(key){
      var object = {};
      if(window.Storage){
        var string = localStorage.getItem(key);
        object = JSON.parse(string);
      }
      if(object === null || object === undefined)
        object = {};
      return object;
    }
    CoC.roster.stars=[]
    CoC.roster.stars[1]=loadObjectFromLocalStorage("oneStarHeroes");
    CoC.roster.stars[2]=loadObjectFromLocalStorage("twoStarHeroes");
    CoC.roster.stars[3]=loadObjectFromLocalStorage("threeStarHeroes");
    CoC.roster.stars[4]=loadObjectFromLocalStorage("fourStarHeroes");
    
  }
  this.roster.save=function(){
    function saveObjectToLocalStorage(key,value){
      if(window.Storage){
        localStorage.setItem(key, JSON.stringify(value));
      }
    }
    saveObjectToLocalStorage("oneStarHeroes", CoC.roster.stars[1]);
    saveObjectToLocalStorage("twoStarHeroes", CoC.roster.stars[2]);
    saveObjectToLocalStorage("threeStarHeroes", CoC.roster.stars[3]);
    saveObjectToLocalStorage("fourStarHeroes", CoC.roster.stars[4]);
  }
};



































