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
  this.excluding=function(map){
    var array = [];
    
    if(map instanceof Array){
      var swap = {};
      for(var i in map)
        swap[map[i].id]=true;
      map = swap;
    }
    
    for(var i in CoC.data.heroes)
      if(map[CoC.data.heroes[i].id] === undefined)
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
      value += synergy.amount * CoC.settings.getWeight(synergy.type);
    });
    return value;
  }
  
  this.has=function(list){
    var value = false;       
    iterateSynergies(list,function(synergy){
      return value = true;
    });
    return value;
  }
}

CoC.logic.team=new function(){

  this.build=function(_list,size){
    var teams = {}, i=1, team;
    var list = _list.slice();
    do {
      team = getTopPartner(list,0,size);
      if(team){
        var oTeam = [];
        for(var o in team)
          oTeam.push(list[team[o]]);
        if (CoC.logic.synergy.has(oTeam)){
        
          oTeam = CoC.logic.synergy.cull(oTeam);
          
          teams[i]=oTeam;
          teams.length=i++;
          for(var o in oTeam)
            list.splice(list.indexOf(oTeam[o]),1);
        }
        else break;
      }
    } while(team != null)
    
    //check if we have enough
    var needed = 0;
    for(i in teams)
      if(i !== 'length')
        needed += size - teams[i].length;
      
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
      while(teams[i].length < size){
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
    teams['extras'] = list;
    
    return teams;
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
    
  function getTeamValue(team, list){
    if(list !== undefined){
      var l = [];
      for(var i in team)
        l.push(list[team[i]]);
      team = l;
    }
    return (CoC.logic.synergy.value(team) + CoC.logic.heroes.value(team)) * getClassesWeight(team);
  }
  
  function compareTeams(list, a, b){
    if(b == null)
      return 1;
    
    return getTeamValue(a, list) - getTeamValue(b, list);
  }

  function getNextPartner(list,arr,i,depth){
    if(i > list.length)
      return null;
    var current = arr;
    if(arr.length < depth){
      var array = arr.slice();
      array.push(i);
      current = getNextPartner(list,array,i+1,depth);
    }
    else
      return arr;
    if(current == null)
      return null;
    var next = getNextPartner(list,arr,i+1,depth);
    return (compareTeams(list,current,next) >= 0)? current: next;
  }

  function getTopPartner(list,i,depth){
    var current = getNextPartner(list,[i],i+1,depth);
    if(current == null)
      return null;
    var next = getTopPartner(list,i+1,depth);
    return (compareTeams(list,current,next) >= 0)? current: next;
  }
  
};
