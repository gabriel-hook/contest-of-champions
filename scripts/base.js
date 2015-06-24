
var CoC=new function(){

  this.version = "1.007.a"

  this.data = new function() {};
  this.logic = new function() {};
  this.ui = new function() {};
  this.algorithm = new function() {};
  this.model = new function() {};
  this.view = new function() {};
  
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
    
    this.ids=function(category){
      var keys = [];
      for(var i in CoC.settings.preset.list)
        if(category === undefined || category === CoC.settings.preset.list[i].category)
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
  
  this.roster.load = function(){
  
    var Roster = Backbone.Collection.extend({
      model: CoC.model.Champion,
      localStorage: new Backbone.LocalStorage("coc-roster")
    });
    CoC.data.roster = new Roster();
    CoC.data.roster.fetch();
  }
  
  this.roster.clear = function(){
  
    while(CoC.data.roster.length > 0)
      CoC.data.roster.first().destroy();
  
  }
  
  this.roster.csv=function(string){
    if(string === undefined){
      var array = []
      CoC.data.roster.each(function(champion){
        array.push([
          JSON.stringify(champion.get("uid")),
          champion.get("stars"),
          champion.get("rank"),
          champion.get("level"),
          champion.get("awakened")
        ].join(','));
      });
      var csv = array.join('\n').replace(/(^\[)|(\]$)/mg, '');
      return csv;
    }
    else{
      var lines = string.split("\n");
      for(var i=0;i<lines.length;i++){
        var values = lines[i].split(",");
        if(values.length != 5)
          throw "Invalid roster CSV";
          
        var uid = JSON.parse(values[0]);
        var stars = JSON.parse(values[1]);
        var rank = JSON.parse(values[2]);
        var level = JSON.parse(values[3]);
        var awakened = JSON.parse(values[4]);
          
        var champion = CoC.data.roster.findWhere({ uid: uid, stars:stars });
        if(champion === undefined){
          champion = CoC.data.champions.findWhere({ uid: uid, stars:stars }).clone();
          CoC.data.roster.add(champion);
        }
        if(champion === undefined){
          console.error("Champion not found \""+ uid + "\"");
          continue;
        }
          
        champion.set("rank", rank);
        champion.set("level", level);
        champion.set("awakened", awakened);
        champion.save();
      }
    }
  }
};



































