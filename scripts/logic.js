CoC.logic.heroes=new function(){
  
  this.get=function(id){
    return CoC.data.heroes[id];
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
    
    for(i=list.length-1;i>=0;i--){
      if(!hasSynergies[i])
        list.splice(i,1);
    }
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
          CoC.logic.synergy.cull(oTeam);
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
        console.log(team[t])
        list.push(team[t]);
        needed--;
      }
      delete teams[i];
    }
    
    //add into existing teams, using the comparison to find best partner
    for(i in teams){
      while(teams[i].length < size){
        var current=teams[i].slice().push(list[0]), best = 0;
        for(var j=1;j<list.length;j++){
          var next=teams[i].slice().push(list[j])
          if(compareTeams(undefined,next,current)){
            current = next;
            best = j;
          }
        }
        teams[i].push(list[best])
        list.splice(best,1);
      }
    }

    teams['extras'] = list;
    
    return teams;
  }
  
  function getClassesWeight(team){
    var classes = {}, highest = 0;
    for(var i in CoC.data.classes)
      classes[CoC.data.classes[i]]=0;
    for(var i in team)
      classes[CoC.data.heroes[team[i].id].class]++;
    for(var i in classes)
      if(classes[i] > highest)
        highest = classes[i];
    if(highest >= 2 && highest <= 5)
      return CoC.settings.getWeight("class"+highest+"x")
    else
      return 1;
  }
    
  function compareTeams(list,a,b){
    if(b==null)
      return 1;
      
    var teamA = [], teamB = [];
    if(list === undefined){
      teamA = a;
      teamB = b;
    }
    else{
      for(var i in a)
        teamA.push(list[a[i]]);
      for(var i in b)
        teamB.push(list[b[i]]);
    }
      
    var valueA = CoC.logic.synergy.value(teamA) * getClassesWeight(teamA), 
      valueB = CoC.logic.synergy.value(teamB) * getClassesWeight(teamB);
    return valueA-valueB >= 0;
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
    return (compareTeams(list,current,next))? current: next;
  }

  function getTopPartner(list,i,depth){
    var current = getNextPartner(list,[i],i+1,depth);
    if(current == null)
      return null;
    var next = getTopPartner(list,i+1,depth);
    return (compareTeams(list,current,next))? current: next;
  }
  
};
