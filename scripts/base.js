
var CoC=new function(){

  this.version = "1.003.a"

  this.data = new function() {};
  this.logic = new function() {};
  this.ui = new function() {};
  this.algorithm = new function() {};
  
  this.reset=function(){
    localStorage.clear();
    location.reload();
  }
  
  this.ui.getSynergyName=function(key){
    var value = CoC.data.synergies[key];
    return (value === undefined)? key: value.name;
  }
  this.ui.getSynergyImage=function(key, value){
    var synergy = CoC.data.synergies[key];
    return (!synergy)? "":
      (!value)? "images/synergybonuses/synergy_bonus_"+synergy.image+"2.jpg": 
      "images/synergybonuses/synergy_bonus_"+synergy.image+".jpg";
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
    if(parseInt(stars) === NaN || stars < 1 || stars > 4)
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
  
  this.settings.preset=new function(){
  
    this.list=[];
    function getPreset(id){
      for(var i in CoC.settings.preset.list)
        if(CoC.settings.preset.list[i].id === id)
          return CoC.settings.preset.list[i];
      return null;
    }
    
    this.ids=function(){
      var keys = [];
      for(var i in CoC.settings.preset.list)
        keys.push(CoC.settings.preset.list[i].id);
      return keys;
    }
    
    this.info=function(id){
      var preset = getPreset(id);
      if(preset)
        return {
          id:preset.id,
          name:preset.name,
          category:preset.category
        };
      return null;
    }
    
    this.apply=function(id, funcWeights, funcSettings){
      var preset = getPreset(id);
      if(preset){
        if(funcWeights !== undefined)
          for(var key in preset.weights)
            if(funcWeights(key, preset.weights[key]))
              CoC.settings.setWeight(key, preset.weights[key]);
        if(funcSettings !== undefined)
          for(var key in preset.settings)
            if(funcSettings(key, preset.settings[key]))
              CoC.settings.setValue(key, preset.settings[key]);
      }  
    }
    
    this.add=function(category, name, weights, settings){
      var id = (category)? [category,name].join("-").toLowerCase(): name.toLowerCase();
      CoC.settings.preset.list.push({
        id:id,
        name:name,
        category:category,
        weights:weights,
        settings:settings
      });
    }
    
    this.always=function(){ return true; }
  } 
  
  /*********
    ROSTER
  *********/
  this.roster = new function() {};
  this.roster.add=function(hero){
    if(hero === undefined || hero.id === undefined || hero.stars === undefined){
      console.error(hero);
      throw "Cannot add bad object to roster";
    }
    CoC.roster.stars[hero.stars][hero.id]=hero;
    CoC.roster.save();
  }
  this.roster.remove=function(id,stars){
    delete CoC.roster.stars[stars][id];
    CoC.roster.save();
  }
  this.roster.all=function(stars){
    var array=[];
    if(stars === undefined)
      stars = { 1:true, 2:true, 3:true, 4:true };
    for(var s=4;s>=1;s--)
      if(stars[s])
        for(var o in CoC.data.heroes)
          if(CoC.roster.stars[s][CoC.data.heroes[o].id])
            array.push(CoC.roster.stars[s][CoC.data.heroes[o].id]);
    return array;
  }
  this.roster.clear=function(){
    for(var i=1;i<=4; i++)
      CoC.roster.stars[i]={}
    CoC.roster.save();
  }
  
  this.roster.csv=function(string){
    if(string === undefined){
      var roster = CoC.roster.all()
      var csv = roster.map(function(value){
        return [
          JSON.stringify(value.id),
          value.stars,
          value.rank,
          value.level,
          value.awakened
        ].join(',');
      }).join('\n').replace(/(^\[)|(\]$)/mg, '');
      return csv;
    }
    else{
      var lines = string.split("\n");
      for(var i=0;i<lines.length;i++){
        var values = lines[i].split(",");
        if(values.length != 5)
          throw "Invalid roster CSV";
        CoC.roster.add({
          id:JSON.parse(values[0]),
          stars:JSON.parse(values[1]),
          rank:JSON.parse(values[2]),
          level:JSON.parse(values[3]),
          awakened:JSON.parse(values[4])
        });
      }
    }
  }
  
  this.roster.save=function(){
    CoC.settings.saveObjectToLocalStorage("oneStarHeroes", CoC.roster.stars[1]);
    CoC.settings.saveObjectToLocalStorage("twoStarHeroes", CoC.roster.stars[2]);
    CoC.settings.saveObjectToLocalStorage("threeStarHeroes", CoC.roster.stars[3]);
    CoC.settings.saveObjectToLocalStorage("fourStarHeroes", CoC.roster.stars[4]);
  }
    
  this.roster.stars=[]
  this.roster.stars[1]=this.settings.loadObjectFromLocalStorage("oneStarHeroes");
  this.roster.stars[2]=this.settings.loadObjectFromLocalStorage("twoStarHeroes");
  this.roster.stars[3]=this.settings.loadObjectFromLocalStorage("threeStarHeroes");
  this.roster.stars[4]=this.settings.loadObjectFromLocalStorage("fourStarHeroes");
};



































