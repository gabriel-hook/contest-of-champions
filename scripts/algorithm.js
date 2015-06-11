CoC.algorithm["greedy"]=new function(){
  
  this.name = "Greedy";
  this.description = "Slowest, but finds the strongest possible teams.";
  this.canQuest = true;

  function factorial(n){
    if(!factorial.cache)
      factorial.cache = { '0':1, '1':1 };
    if(!factorial.cache.hasOwnProperty(n)){
      factorial.cache[n] = n * factorial(n-1);
    }
    return factorial.cache[n];
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
        max:(function(r){
          var value = 0;
          for(var n = list.length; n > r; n-=r){
            value += factorial(n) / (factorial(r) * factorial(n - r));
            if(options.single)
              break;
          }
          return value;
        })(preselect.length? options.size - preselect.length: options.size),
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
    var data, heroes, synergies, synergy, i;
  
    for(i=2; i<=5; i++)
      classWeights[i] = CoC.settings.getDuplicateWeight(i);
      
    for(var i=0; i<heroes.length; i++){
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
    var result = {
      teams:[],
      extras:[]
    };
    for(var i in teams){
      var team = [];    
      for(var o in teams[i].heroes)
        team.push(teams[i].heroes[o].data);
      result.teams.push(team);
    }
    if(extras !== undefined){
      for(var o in extras)
        result.extras.push(extras[o].data);
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
    var classes=[0,0,0,0,0,0], i;
    if(heroes !== undefined)
      for(var i=0;i<heroes.length;i++)
        classes[heroes[i].class]++;
    return classes;
  }
  
  function addPartnerSynergies(oldSynergies, list, next){
    var synergies = oldSynergies.slice(), i;    
    for(var i=0;i<list.length;i++){
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
    }, i, s, cull;
    for(i=0;i<team.heroes.length;i++ ){
      cull = true;
      synergies: for(s=0;s<team.synergies.length;s++){
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

CoC.algorithm["balanced"]=new function(){
  this.name = "Balanced";
  this.description = "Fast, will find most teams, but quality might be bad.";
  this.canQuest = false;
  
  this.build=function(options){
    var wanted = Math.floor(options.heroes.length / options.size);
    var heroesMap = getHeroesMap(options.heroes);
    var synergies = getSynergies(options.heroes);
    var distinct = getDistinctSynergies(synergies);
    var teams = [];
     
    //all synergies 
    do{
      var available = 0;
    
      //first get rid of ones that are small enough
      for(var i=distinct.length-1; i>=0; i--){
        var synergies = distinct[i].synergies;
        var heroes = getHeroesFromSynergies(synergies, heroesMap);
        if(heroes.length <= options.size){
          teams.push(heroes)
          distinct.splice(i, 1);
          wanted--;
        }
        else
          available += heroes.length;
      }
      var didSplit = false, splitDistinct = [], splitIndex = -1, splitBiggest = 0;
      
      //find the best one to split
      for(var i in distinct){
        var synergies = distinct[i].synergies;
        if(!synergies)
          continue;
        var heroes = getHeroesFromSynergies(synergies, heroesMap);
      
        if(heroes.length > options.size && heroes.length > splitBiggest){
          splitIndex = i;
          splitBiggest = heroes.length;
        }
      }
      
      //split it
      if(splitIndex !== -1){
        var group = distinct[splitIndex];
        distinct.splice(splitIndex, 1);
        
        //pull out a group from
        var result = splitDistinctGroup(group, heroesMap, options.size);
        teams.push(result.heroes)
        if(result.extras){
          var synergies = getDistinctSynergies( getSynergies(result.extras) );
          for(var i in synergies)
            distinct.push(synergies[i])
        }
        didSplit = true;
      }
      //check again for teams
    } while(wanted > 0 && didSplit)
    
    var teamsFull, times = 10;
    fillTeams: do{
      var teamsBySize = {}, needed = 0;
      for(var i=1;i<options.size;i++)
        teamsBySize[i]=[];
      for(var i=0; i<teams.length; i++){
        var size = teams[i].length;
        if( options.size - size > 0){
          needed += options.size - size;
          teamsBySize[size].push({
            size:size,
            team: teams[i]
          });
        }
      }

      wanted = Math.floor(options.heroes.length / options.size);
      
      //if we have too many teams, try to condense them
      if(teams.length > wanted){
      
        //look for prefect then undersized fits, if we find one start again
        findfit: for(var size=options.size; size > 1; size--)
          for(var i=2; i<size; i++){
            var smallTeams = teamsBySize[i];
            var largeTeams = teamsBySize[size - i];
            for(var s in smallTeams)
              for(var l in largeTeams)
                if(smallTeams[s] !== largeTeams[l]){
                  teams.splice(teams.indexOf(smallTeams[s].team), 1)
                  teams.splice(teams.indexOf(largeTeams[l].team), 1)
                  teams.push(smallTeams[s].team.concat(largeTeams[l].team));
                  continue fillTeams;
                }
          }
          
      
        //no perfect fits found
        var extras = getRemainingHeroes(teams, options.heroes);
        var almost = teamsBySize[options.size - 1];
        for(var i = almost.length - 1; i >= 0 && extras.length; i--){
          almost[i].team.push(extras.shift());
          almost.splice(i, 1);
        }
      
        //look for near perfect fits, if we find one, combine, throw away extra, then start again
        findfit: for(var i=2; i<options.size; i++){
          var smallTeams = teamsBySize[i];
          var largeTeams = teamsBySize[options.size - i + 1];
          for(var s in smallTeams)
            for(var l in largeTeams)
              if(smallTeams[s] !== largeTeams[l]){
                teams.splice(teams.indexOf(smallTeams[s].team), 1)
                teams.splice(teams.indexOf(largeTeams[l].team), 1)
                teams.push(combineTeams(smallTeams[s].team, largeTeams[l].team, heroesMap, options.size));
                continue fillTeams;
              }
        }
        
        //remove the last unusable group or keep chopping
        extras = getRemainingHeroes(teams, options.heroes);
        needed = 0;
        var groups = 0, group = null;
        for(var i in teams)
          if(teams[i].length < options.size){
            needed += options.size - teams[i].length;
            groups++;
            group = teams[i];
          }
        
        var finished = false;
        if(groups == 0)
          finished = true;
        if(groups == 1 && extras.length < needed){
          teams.splice(teams.indexOf(group), 1);
          finished = true;
        }
        if(finished)
          break;
      }
      //fill groups where we can
      else{
      
        var extras = getRemainingHeroes(teams, options.heroes);
        
        teams.sort(function(a,b){
          return b.length - a.length;
        });
        
        //fill the groups with remainders
        for(var i=0; i<teams.length; i++)
          while(teams[i].length < options.size && extras.length)
            teams[i].push(extras.shift());
      
      }
    }
    while(needed && times--)
    
    return {
      teams:teams,
      extras:(options.extras)? getRemainingHeroes(teams, options.heroes): undefined
    }
  }
  
  function combineTeams(smaller, larger, heroesMap, size){
    var largerSize = size - smaller.length, smallerSize = size - larger.length;
    if(largerSize == smallerSize)
      largerSize = smallerSize = larger.length - 1;
    
    var largerSub = splitDistinctGroup(getDistinctSynergies(getSynergies(larger))[0], heroesMap, largerSize).heroes;
    var smallerSub = splitDistinctGroup(getDistinctSynergies(getSynergies(smaller))[0], heroesMap, smallerSize).heroes;
    
    var a = [larger, largerSub]
    var b = [smaller, smallerSub]
   
    var best = { };
    for(var i in a)
      for(var j in b){
        var team = a[i].concat(b[j]);
        if(team.length <= size && (!best.count || team.length > best.count)){
          best.team = team;
          best.count = team.length;
        }
      }
    return best.team;
  }
  
  //sort the group and then take 
  function splitDistinctGroup(group, heroesMap, size){
    var heroFromMap = {}, heroToMap = {}, groupHeroes = getHeroesFromSynergies(group.synergies, heroesMap);
    
    //zero out map values
    for(var i in groupHeroes){
      var id = getHeroStarId(groupHeroes[i]);
      if(!heroFromMap[id])
        heroFromMap[id]={
          hero:groupHeroes[i],
          synergies:[],
          count:0
        }
      if(!heroToMap[groupHeroes[i].id])
        heroToMap[groupHeroes[i].id] = {
          hero:groupHeroes[i],
          synergies:[],
          count:0
        };
    }
  
    for(var s in group.synergies){
      var synergy = group.synergies[s];
      heroFromMap[synergy.fromId].synergies.push(synergy);
      heroFromMap[synergy.fromId].count++;
      heroToMap[synergy.to].synergies.push(synergy);
      heroToMap[synergy.to].count++;
    }
    var lowest = {};
    for(var i in groupHeroes){
      count = heroFromMap[getHeroStarId(groupHeroes[i])].count + heroToMap[groupHeroes[i].id].count;
      if(lowest.value === undefined || lowest.value > count)
        lowest={
          id:groupHeroes[i].id,
          hero:groupHeroes[i],
          count:count
        }
    }
    
    //get all the heroes connected to the least popular hero
    var synergies = [];
    for(var s in group.synergies){
      var synergy = group.synergies[s];
      if(synergy.to === lowest.id || synergy.from.id === lowest.id)
        synergies.push(synergy);
    }

    //get the least popular partners for the least popular hero
    var heroes = getHeroesFromSynergies(synergies, heroesMap); 
    while(heroes.length > size){
      var highest = { hero:null, count:0 };
      for(var i in heroes){
        if(lowest.hero === heroes[i])
        continue;
      
        count = heroFromMap[getHeroStarId(heroes[i])].count + heroToMap[heroes[i].id].count;
        if(id && count > highest.count){
          highest.count = count;
          highest.hero = heroes[i];
        }
      }
      if(highest)
        heroes.splice(heroes.indexOf(highest.hero), 1);
      else
        break;
    }
    
    if(heroes.length == 1)
      heroes = [];
    
    for(var i in heroes)
      groupHeroes.splice(groupHeroes.indexOf(heroes[i]),1);
      
    return { heroes:heroes, extras:groupHeroes };
  }
  
  function getRemainingHeroes(teams, heroes){
    var remaining = heroes.slice(), index, i, j;
    for(i=0; i<teams.length; i++)
      for(j=0; j<teams[i].length; j++){
        index = remaining.indexOf(teams[i][j]);
        if(index !== -1)
          remaining.splice(index,1);
      }
    return remaining;
  }
  
  function getHeroesMap(heroes){
    var map = {};
    for(var i = 0; i<heroes.length; i++){
      var array = map[heroes[i].id];
      if(!array)
        map[heroes[i].id] = array = [];
      array.push(heroes[i]);
    }
    return map;
  }
  
  function getHeroStarId(data){
    return data.id + "_" + data.stars;
  }
  
  function getSynergies(heroes){
    var synergies = [], ids = {}, hero, synergy;
    for(var i = 0; i<heroes.length; i++)
      ids[heroes[i].id] = true;
    for(var i = 0; i<heroes.length; i++){
      data = heroes[i];
      hero = CoC.data.heroes[data.id];      
      for(var s in hero.synergies[data.stars]){
        synergy = hero.synergies[data.stars][s];
        if(ids[synergy.id])
          synergies.push({
            fromId: getHeroStarId(data),
            from: data,
            to: synergy.id,
            value: CoC.settings.getWeight(synergy.type) * synergy.amount / CoC.data.synergies[synergy.type].base
          });
      }
    }
    return synergies;
  }
  
  function getHeroesFromSynergies(synergies, heroesMap){
    var heroes = [], idsTo = {}, idsFrom = {};
    for(var i=0; i<synergies.length; i++){
      idsTo[synergies[i].to] = true;
      idsFrom[synergies[i].fromId] = true;
    }
    for(var id in heroesMap){
      var list = heroesMap[id];
      for(var i in list){
        var fromId = getHeroStarId(list[i]);
        if(idsTo[id])
          heroes.push(list[i]);
        else if(idsFrom[fromId])
          heroes.push(list[i]);
      }
    }
    return heroes;
  }
  
  function getDistinctSynergies(synergies){
    var distinct = [], ids = {}, synergy, group, groupTo, groupFrom;
    for(var i=0; i<synergies.length; i++){
      synergy = synergies[i];
      group = groupTo = ids[synergy.to];
      groupFrom = ids[synergy.from.id];
      if(!groupTo)
        group = groupFrom;
      else if(groupFrom && groupTo != groupFrom){
        groupTo.synergies = groupTo.synergies.concat(groupFrom.synergies);
        for(var s in groupFrom.synergies){
          ids[groupFrom.synergies[s].to] = groupTo;
          ids[groupFrom.synergies[s].from.id] = groupTo;
        }
        distinct.splice( distinct.indexOf(groupFrom), 1);
        group = groupTo;
      }
      if(!group){
        group = { synergies:[] };
        distinct.push(group);
      }
      ids[synergy.to] = group;
      ids[synergy.from.id] = group;
      group.synergies.push(synergy);
    }
    return distinct;
  }
}