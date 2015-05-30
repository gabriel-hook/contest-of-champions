
var CoC=new function(){

  this.data = new function() {};
  this.logic = new function() {};
  this.ui = new function() {};
  
  this.reset=function(){
    localStorage.clear();
    location.reload();
  }
  
  this.getSynergyName=function(key){
    var value = CoC.data.synergies[key];
    return (value === undefined)? key: value.name;
  }
  this.getSynergyImage=function(key,amount){
    var value = CoC.data.synergies[key];
    return (value === undefined)? "": "images/synergybonuses/synergy_bonus_"+value.image+".jpg";
  }
  this.getSynergyImageDisabled=function(key,amount){
    var value = CoC.data.synergies[key];
    return (value === undefined)? "": "images/synergybonuses/synergy_bonus_"+value.image+"2.jpg";
  }
  
  /************
    SETTINGS
  ************/
  this.settings = new function() {
    this.loadObjectFromLocalStorage=function(key){
      var object = {};
      if(window && window.Storage){
        var string = localStorage.getItem(key);
        object = JSON.parse(string);
      }
      if(object === null || object === undefined)
        object = {};
      return object;
    }
    this.saveObjectToLocalStorage=function(key,value){
      if(window && window.Storage){
        localStorage.setItem(key, JSON.stringify(value));
      }
    }
  };
  
  this.settings.misc = this.settings.loadObjectFromLocalStorage("misc");
  this.settings.getValue=function(key){
    return CoC.settings.misc[key];
  }
  this.settings.setValue=function(key,value){
    CoC.settings.misc[key]=value;
    CoC.settings.saveObjectToLocalStorage("misc", CoC.settings.misc);
  }
  
  this.settings.weights = this.settings.loadObjectFromLocalStorage("weights");
  this.settings.getWeight=function(key){
    var weight = CoC.settings.weights[key];
    return (weight === undefined)? 1: weight;
  }
  this.settings.setWeight=function(type, weight){
    CoC.settings.weights[type] = weight;
    CoC.settings.saveObjectToLocalStorage("weights", CoC.settings.weights);
  }
  
  var starsKey=new function(){
    this.map = {};
    this.get=function(stars){
      var value = this.map[stars]
      if(value === undefined){
        value = this.map[stars] = "stars-"+stars;
      }
      return value;
    }
  };
  this.settings.setStarWeight=function(stars,weight){
    if(parseInt(stars) === NaN || stars < 2 || stars > 4)
      return;
    CoC.settings.setWeight(starsKey.get(stars), weight);
  }
  this.settings.getStarWeight=function(stars){
    return CoC.settings.getWeight(starsKey.get(stars));
  }
  
  //duplcates-X
  var duplicateKey=new function(){
    this.map = {};
    this.get=function(number){
      var value = this.map[number]
      if(value === undefined){
        value = this.map[number] = "duplicates-"+number;
      }
      return value;
    }
  };
  this.settings.setDuplicateWeight=function(number,weight){
    if(parseInt(number) === NaN || number < 2 || number > 5)
      return;
    CoC.settings.setWeight(duplicateKey.get(number), weight);
  }
  this.settings.getDuplicateWeight=function(number){
    return CoC.settings.getWeight(duplicateKey.get(number));
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
  this.roster.all=function(stars){
    var array=[];
    if(stars === undefined)
      stars = { 2:true, 3:true, 4:true };
    for(var s=4;s>=2;s--)
      if(stars[s])
        for(var o in CoC.roster.stars[s])
          array.push(CoC.roster.stars[s][o]);
    return array;
  }
  this.roster.load=function(){
    CoC.roster.stars=[]
    CoC.roster.stars[1]=CoC.settings.loadObjectFromLocalStorage("oneStarHeroes");
    CoC.roster.stars[2]=CoC.settings.loadObjectFromLocalStorage("twoStarHeroes");
    CoC.roster.stars[3]=CoC.settings.loadObjectFromLocalStorage("threeStarHeroes");
    CoC.roster.stars[4]=CoC.settings.loadObjectFromLocalStorage("fourStarHeroes");
    
  }
  this.roster.save=function(){
    CoC.settings.saveObjectToLocalStorage("oneStarHeroes", CoC.roster.stars[1]);
    CoC.settings.saveObjectToLocalStorage("twoStarHeroes", CoC.roster.stars[2]);
    CoC.settings.saveObjectToLocalStorage("threeStarHeroes", CoC.roster.stars[3]);
    CoC.settings.saveObjectToLocalStorage("fourStarHeroes", CoC.roster.stars[4]);
  }
};



































