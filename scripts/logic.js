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
    var teams = {}, i=1, team, list = options.heroes.slice(), preselect = [], progress = null;
    
    if(options.single)
      for(var i=list.length-1;i>=0;i--)
        if(list[i].quest){
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
      team = getNextPartner(list,preselect,0,options.size, progress);
      if(team && CoC.logic.synergy.has(team))
        teams[0]=team;
    }
    else{
      
      do {
        team = getTopPartner(list,0,options.size, progress);
        if(team){          
          if (CoC.logic.synergy.has(team)){
            if(!options.single)
              team = CoC.logic.synergy.cull(team);
            
            teams[i]=team;
            teams.length=i++;
            for(var o in team)
              list.splice(list.indexOf(team[o]),1);
              
            if(options.single)
              break;
          }
          else break;
        }
      } while(team != null)
    
      //check if we have enough
      var needed = 0;
      for(i in teams)
        if(i !== 'length')
          needed += options.size - teams[i].length;
        
      //break up teams if we dont have enough
      while(list.length < needed){
        var i = teams.length;
        team = teams[i];
        for(var t in team){
          list.push(team[t]);
          needed--;
        }
        delete teams[i];
      }
      
      function getIds(list){
        var ids=[];
        for(var i in list)
          ids.push(list[i].id);
        return JSON.stringify(ids);
      }
      
      function appendToTeam(list, object){
        var l = list.slice();
        l.push(object)
        return l;
      }
      
      //add into existing teams, using the comparison to find best partner
      for(i in teams){
        while(teams[i].length < options.size){
          var current_object = list[0];
          var current_value = getTeamValue(appendToTeam(teams[i],current_object));
          var current_index = 0;
          
          for(var j=1;j<list.length;j++){
            var next_object = list[j];
            var next_value = getTeamValue(appendToTeam(teams[i],next_object));
            var next_index = j;
            
            if(next_value > current_value){
              current_object = next_object;
              current_value = next_value;
              current_index = next_index;
            }
          }
            
          teams[i].push(list[current_index])
          list.splice(current_index,1);
        }
      }
      
      delete teams.length
    }
    if(options.extras && options.single !== true)
      teams['extras'] = list;
    
    return teams;
  }

  function getTopPartner(list,i,depth, progress){
    var current = getNextPartner(list,[ list[i] ],i+1,depth, progress);
    if(current == null)
      return null;
    var next = getTopPartner(list,i+1,depth, progress);
    return (compareTeams(current,next) >= 0)? current: next;
  }

  function getNextPartner(list,arr,i,depth, progress){
    if(i > list.length)
      return null;
    var current = arr;
    if(arr.length < depth){
      var array = arr.slice();
      array.push(list[i]);
      current = getNextPartner(list,array,i+1,depth, progress);
    }
    else{
      if(progress)
        progress.callback(++progress.current, progress.max)
      return arr;
    }
    if(current == null)
      return null;
    var next = getNextPartner(list,arr,i+1,depth, progress);
    return (compareTeams(current,next) >= 0)? current: next;
  }
  
  function compareTeams(a, b){
    if(b == null)
      return 1;
    
    if(a == null || a === undefined)
      console.log(a)
    if(b == null || b === undefined)
      console.log(b)
    
    return getTeamValue(a) - getTeamValue(b);
  }
    
  function getTeamValue(team, list){
    return CoC.logic.synergy.value(team) * (CoC.logic.heroes.value(team) * getClassesWeight(team));
  }
  
  function getClassesWeight(team){
    var classes = {};
    for(var i in CoC.data.classes)
      classes[CoC.data.classes[i]]=0;
    for(var i in team)
      classes[CoC.data.heroes[team[i].id].class]++;
      
    var multiplier = 1;
    for(var i in classes)
      if(classes[i] > 1)
        multiplier *= CoC.settings.getDuplicateWeight(classes[i])
    return multiplier;
  }
  
};
