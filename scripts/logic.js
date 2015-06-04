CoC.logic.heroes=new function(){
  
  this.get=function(id){
    return CoC.data.heroes[id];
  }
  
  this.value=function(heroes){
    var value = 1, v;
    if(heroes.length === undefined)
      heroes = [heroes];
    for(var h in heroes){
      v = CoC.settings.getStarWeight(heroes[h].stars);
      if(heroes[h].awakened)
        v *= CoC.settings.getWeight("awakened");
      value += v;
    }    
    return value;
  }

  this.all=function(){
    var array = [];
    for(var i in CoC.data.heroes)
      array.push(CoC.data.heroes[i]);
    return array;
  }
  this.including=function(map){
    var array = [];
    
    if(map instanceof Array){
      var swap = {};
      for(var i in map)
        swap[map[i].id]=true;
      map = swap;
    }
    
    for(var i in CoC.data.heroes)
      if(map[CoC.data.heroes[i].id])
        array.push(CoC.data.heroes[i]);
    return array;
  }
  this.excluding=function(map, stars){
    var array = [];
    
    if(map instanceof Array){
      var swap = {};
      for(var i in map)
        swap[map[i].id]=true;
      map = swap;
    }
    
    for(var i in CoC.data.heroes)
      if(map[CoC.data.heroes[i].id] === undefined)
        if(stars === undefined || CoC.data.heroes[i].synergies[stars] !== undefined)
          array.push(CoC.data.heroes[i]);
    return array;
  }
}

CoC.logic.synergy=new function(){

  var characterSynergies = {1:{},2:{},3:{},4:{}};
  
  function getSynergy(a,b){
    var map = characterSynergies[a.stars][a.id];
    if(map === undefined){
      map = {};
      var synergies = CoC.data.heroes[a.id].synergies[a.stars];
      for(var s in synergies){
        map[synergies[s].id]=synergies[s];
      }
      characterSynergies[a.stars][a.id]=map;
    }
    return map[b.id];
  }

  function iterateSynergies(list,callback){
    for(var i=0;i<list.length;i++)
      for(var j=0;j<list.length;j++)
        if(j != i){
          var s = getSynergy(list[i],list[j]);
          if(s)
            if(callback(s,i,j) === true)
              return;
        }
  }

  //remove non-contributors
  this.cull=function(list){
    var hasSynergies={}
    iterateSynergies(list,function(s,i,j){
      hasSynergies[i]=true;
      hasSynergies[j]=true;
    });
    
    var culled=[];
    for(var i in list)
      if(hasSynergies[i])
        culled.push(list[i])

    return culled;
  }
  
  
  this.map=function(list){
    var map = {};
    iterateSynergies(list,function(synergy){
      var value = synergy.amount;
      if(map[synergy.type])
        map[synergy.type]+=synergy.amount;
      else
        map[synergy.type]=synergy.amount;
    });
    return map;
  }
  
  this.list=function(list){
    var s = [];
    iterateSynergies(list,function(synergy){
      s.push(synergy);
    });
    return s;
  }
  
  this.value=function(list){
    var value = 0;
    iterateSynergies(list,function(synergy){
      value += CoC.settings.getWeight(synergy.type) * synergy.amount / CoC.data.synergies[synergy.type].base;
    });
    return value;
  }
  
  this.has=function(list){
    var value = false;       
    iterateSynergies(list,function(synergy){
      if(CoC.settings.getWeight(synergy.type) != 0)
        return value = true;
    });
    return value;
  }
}

CoC.logic.team=new function(){

  this.classes={};
  for(var i in CoC.data.classes)
    this.classes[CoC.data.classes[i]]=i;

  this.factorials=[1,1];
  this.factorial=function(n){
    if (n < 2)
      return 1;
    else{
      if(CoC.logic.team.factorials[n]===undefined)
        CoC.logic.team.factorials[n] = n * CoC.logic.team.factorial(n - 1);
      return CoC.logic.team.factorials[n];
    }
  }

  this.build=function(options){
    var teams = {}, team, list = [], preselect = [], classWeights = [], progress = null;
    preProcess(options.heroes, list, classWeights);
    
    if(options.single)
      for(var i=list.length-1;i>=0;i--)
        if(list[i].data.quest){
          preselect.push(list[i]);
          list.splice(i,1);
        }
        
    if(options.progress)
      progress={
        current:0,
        max:function(r){
          var value = 0;
          for(var n = list.length; n > r; n-=r){
            value += CoC.logic.team.factorial(n) / (CoC.logic.team.factorial(r) * CoC.logic.team.factorial(n - r));
            if(options.single)
              break;
          }
          return value;
        }(preselect.length? options.size - preselect.length: options.size),
        callback:options.progress
      }

    if(preselect.length > 0){
      if(preselect.length > options.size){
        team = getTopPartner(preselect,0,options.size, classWeights, progress);
      }
      else{
        var synergies = [], classes = getClasses(preselect);
        team = getNextPartner(list,preselect,synergies,classes,0,options.size,classWeights,progress);
      }
      if(team && team.value > 0)
        teams[0]=team;
    }
    else{
      
      var team_index = 0;
      do {
        team = getTopPartner(list,0,options.size, classWeights, progress);
        
        if(team){          
          if (team.value){
            if(!options.single)
              team = getSynergyCulledTeam(team, classWeights);
            
            teams[team_index]=team;
            teams.length=++team_index;
            for(var o in team.heroes)
              list.splice(list.indexOf(team.heroes[o]),1);
              
            if(options.single)
              break;
          }
          else break;
        }
      } while(team != null)
      
      //check if we have enough
      var needed = 0;
      for(var i in teams)
        if(i !== 'length')
          needed += options.size - teams[i].heroes.length;
        
      //break up teams if we dont have enough
      while(list.length < needed){
        var i = teams.length - 1;
        for(var t in teams[i].heroes){
          list.push(teams[i].heroes[t]);
          needed--;
        }
        delete teams[i];
        teams.length--;
      }
      
      function appendToTeam(list, object){
        var l = list.slice();
        l.push(object)
        return l;
      }
      
      
      //add into existing teams, using the comparison to find best partner
      for(var i=teams.length-1, index; i>=0; i--){
        var team;
        if(teams[i].heroes.length < options.size){
          var team = getNextPartner(list, teams[i].heroes, teams[i].synergies, getClasses(teams[i].heroes), 0, options.size, classWeights, progress);
          if(team){
            for(var o in team.heroes){
              index = list.indexOf(team.heroes[o]);
              if(index != -1)
                list.splice(index,1);
            }
            teams[i] = team;
          }
          else{
            for(var o in teams[i].heroes)
              list.push(teams[i].heroes[o]);
            delete teams[i];
          }
        }
      }
      
      delete teams.length
    }
      
    return postProcess(teams, (options.extras && options.single !== true)? list: undefined);
  }
  
  function preProcess(heroes, list, classWeights){
    var data, heroes, synergies, synergy;
  
    for(var i=2; i<=5; i++)
      classWeights[i] = CoC.settings.getDuplicateWeight(i);
      
    for(var i in heroes){
      data = heroes[i];
      hero = CoC.data.heroes[data.id];
      
      if(hero === undefined || hero.synergies[data.stars] === undefined)
        continue;
      
      synergies = {};
      for(var s in hero.synergies[data.stars]){
        var synergy = hero.synergies[data.stars][s];
        if(CoC.data.synergies[synergy.type] === undefined)
          continue;
      
        synergies[synergy.id]={
          data:synergy,
          to:synergy.id,
          from:hero.id,
          value:CoC.settings.getWeight(synergy.type) * synergy.amount / CoC.data.synergies[synergy.type].base
        }
      }
      list.push({
        id:data.id,
        data:data,
        class:CoC.data.classes.indexOf(hero.class),
        synergies:synergies,
        value:(function(stars, awakened){
          var value = CoC.settings.getStarWeight(stars);
          if(awakened)
            value *= CoC.settings.getWeight("awakened");
          return value;
        })(data.stars, data.awakened)
      })
    }  
  }
  
  function postProcess(teams, extras){
    var result = {};
    for(var i in teams){
      result[i] = [];      
      for(var o in teams[i].heroes)
        result[i].push(teams[i].heroes[o].data);
    }
    if(extras !== undefined){
      result["extras"]=[];
      for(var o in extras)
        result["extras"].push(extras[o].data);
      
    }
    return result;
  }

  function getTopPartner(list, index, depth, classWeights, progress){
    if(index >= list.length)
      return null;
    var current = getNextPartner(list, addPartnerHero([], list[index]), [], getClasses([ list[index] ]), index+1, depth, classWeights, progress);
    if(current == null)
      return null;
    var next = getTopPartner(list,index+1,depth, classWeights, progress);
    return (compareTeams(current,next) >= 0)? current: next;
  }
  
  function getNextPartner(list, heroes, synergies, classes, index, depth, classWeights, progress){
    if(heroes.length == depth){
      if(progress)
        progress.callback(++progress.current, progress.max);
      return {
        heroes:heroes,
        synergies:synergies,
        value:getTeamValue(heroes, synergies, classes, classWeights)
      };
    }
    if(index == list.length)
      return null;
    var current = getNextPartner(list, 
      addPartnerHero(heroes, list[index]), 
      addPartnerSynergies(synergies, heroes, list[index]), 
      addPartnerClass(classes, list[index]), 
      index+1, depth, classWeights, progress
    );
    var next = getNextPartner(list, heroes, synergies, classes, index+1, depth, classWeights, progress);

    return (compareTeams(current,next) >= 0)? current: next;
  }
  
  function addPartnerHero(list, hero){
    var heroes = list.slice();
    heroes.push(hero);
    return heroes;
  }
  
  function addPartnerClass(list, hero){
    var classes = list.slice();
    classes[hero.class]++;
    return classes;
  }

  function getClasses(heroes){
    var classes=[0,0,0,0,0,0];
    if(heroes !== undefined)
      for(var i in heroes)
        classes[heroes[i].class]++;
    return classes;
  }
  
  function addPartnerSynergies(oldSynergies, list, next){
    var synergies = oldSynergies.slice();    
    for(var i in list){
      if(list[i].synergies[next.id] !== undefined)
        synergies.push(list[i].synergies[next.id]);
      if(next.synergies[list[i].id] !== undefined)
        synergies.push(next.synergies[list[i].id]);
    }
    return synergies;
  }
  
  function getSynergies(list){
    if(list.length < 2)
      return [];
  
    var heroes = [], synergies = [], remaining = heroes.slice();
    while(remaining.length > 0){
      var hero = remaining[0];
      remaining.splice(0,1);
      synergies = addPartnerSynergies(synergies, heroes, hero);
      heroes.push(hero);
    }
    return synergies;
  }
    
  function getTeamValue(heroes, synergies, classes, classWeights){
    var vsynergies = 0, vheroes = 0, vclasses = 1, i;
    for(i in synergies)
      vsynergies += synergies[i].value;
    for(i in heroes)
      vheroes += heroes[i].value;
    for(i in classes)
      if(classes[i] > 1)
        vclasses *= classWeights[classes[i]];
    return vsynergies * vheroes * vclasses;
  }
  
  function compareTeams(a, b){
    if(b == null)
      return 1;
    return a.value - b.value;
  }
  
  function getSynergyCulledTeam(team, classWeights){
    var classes = [0,0,0,0,0,0], culled = {
      heroes:[],
      synergies:team.synergies,
      value:0
    };
    for(var i in team.heroes){
      var cull = true;
      synergies: for(var s in team.synergies){
        if(team.synergies[s].to === team.heroes[i].id || team.synergies[s].from === team.heroes[i].id){
          addPartnerClass(classes, team.heroes[i]);
          culled.heroes.push(team.heroes[i]);
          break synergies;
        }
      }
    }
    culled.value = getTeamValue(culled.heroes, culled.synergies, classes, classWeights)
    return culled;
  }
};
