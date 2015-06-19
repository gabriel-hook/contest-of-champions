CoC.algorithm["greedy"]=new function(){
  
  this.name = "Greedy";
  this.description = "Slow & Consistent. Finds the best possible team and then does the same with remainders.";
  this.canQuest = true;
  
  function factorial(n){
    if(!factorial.cache)
      factorial.cache = [ 1, 1 ];
    if(factorial.cache.length < n)
      for(var i=factorial.cache.length; i <= n; i++)
        factorial.cache[i] = i * factorial.cache[i - 1];
    return factorial.cache[n];
  }

  this.build=function(options){
    var teams = {}, team, list = [], preselect = [], classWeights = [], progress = null;
    preProcess(options.heroes, list, classWeights);
    
    if(options.quest)
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
            if(options.quest)
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
            if(!options.quest)
              team = getSynergyCulledTeam(team, classWeights);
            
            teams[team_index]=team;
            teams.length=++team_index;
            for(var o in team.heroes)
              list.splice(list.indexOf(team.heroes[o]),1);
              
            if(options.quest)
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
      
    return postProcess(teams, (options.extras && options.quest !== true)? list: undefined);
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

CoC.algorithm["shuffle"]=new function(){
  this.name = "Shuffle";
  this.description = "Fast & Varied. Does iterated scans and swaps, balancing teams as best as possible.";
  this.canQuest = false;
  
  this.build=function(options){
    var size = parseInt(options.size), maxTeams = Math.floor(options.heroes.length/size), forceExtras = maxTeams * size;
    var heroMap = {}, synergyMap = {}, classWeights = {}, teamValues = {};
    preprocess(options.heroes, heroMap, synergyMap, classWeights);
  
    var array = [];
    for(var i in heroMap)
      array.push(heroMap[i]);
      
    var swaps;
      
    function checkValueAndSwap(a, b){
      //get team values and counts with swaps
      var v1a = getTeamValue(a), v1b = getTeamValue(b),
        v2a = getTeamValue(a, b), v2b = getTeamValue(b, a), 
        count1 = (v1a > 0? 1: 0) + (v1b > 0? 1: 0),
        count2 = (v2a > 0? 1: 0) + (v2b > 0? 1: 0);
      
      //dont accept less teams
      if(count1 > count2)
        return;
        
      //more teams, or more value
      if(count2 > count1 || (v2a + v2b > v1a + v1b)){
        var tmp = array[a];
        array[a] = array[b];
        array[b] = tmp;
        swaps++;
      }
    }
  
    function getTeamValue(index, swap){
      if(index >= forceExtras)
        return 0;
    
      var start = Math.floor(index/size) * size, team = array.slice(start, start + size);
      if(swap !== undefined)
        team[index % size] = array[swap];
        
      var tid = getTeamId(team), value = teamValues[tid];
      if(value === undefined){
        var hvalue = 0, svalue = 0, classes = {};
        for(var i=0; i<team.length; i++){
          var hero = team[i];
          //get my value
          hvalue += hero.value;
          //get my synergies
          var synergies = synergyMap[hero.fid];
          for(var j=0; j<team.length; j++){
            var synergy = synergies[team[j].id];
            if(synergy)
              svalue += synergy.value;
          }
          //get my class dupes
          classes[hero.class] = (classes[hero.class] || 0) + 1;
        }
        var cvalue = 1;
        for(i in classes)
          if(classes[i] > 1)
            cvalue *= classWeights[classes[i]] || 1;
        //combine them
        teamValues[tid] = value = hvalue * svalue * cvalue;
      }
      return value;
    }
    
    array.sort(function(){ return Math.random() > 0.5; });
    
    var progressMax = 128;
    for(var progressCounter=0; progressCounter<progressMax; progressCounter++){
      if(options.progress)
        options.progress(progressCounter, progressMax);
        
      swaps = 0;
      
      for(var i=0; i<forceExtras; i++)
        for(var j=(Math.floor(i/size)+1)*size; j<array.length; j++)
          checkValueAndSwap(i, j);
          
      if(swaps===0){
        console.log("Finished early at "+progressCounter+" of "+progressMax);
        break;
      }
    }
    if(options.progress)
      options.progress(progressMax, progressMax);
  
    return postprocess(array, size, options.extras, function(i){ 
      return getTeamValue(i);
    });
  }
  
  function preprocess(heroes, heroMap, synergyMap, classWeights){
    for(i=2; i<=5; i++)
      classWeights[i] = CoC.settings.getDuplicateWeight(i);
  
    for(var i=0, data, fid, hero; i<heroes.length; i++){
      data = heroes[i];
      fid = getHeroStarId(data);
      hero = CoC.data.heroes[data.id];
      
      //add hero
      heroMap[fid]={
        id:data.id,
        fid:fid,
        class:hero.class.toLowerCase(),
        value:(function(stars, awakened){
          var value = CoC.settings.getStarWeight(stars);
          if(awakened)
            value *= CoC.settings.getWeight("awakened");
          return value;
        })(data.stars, data.awakened),
        data:data
      }
      
      //add all synergies
      synergyMap[fid] = {};
      for(var s=0;s < hero.synergies[data.stars].length; s++){
        var synergy = hero.synergies[data.stars][s];
        synergyMap[fid][synergy.id]={
          synergy:synergy,
          value:CoC.settings.getWeight(synergy.type) * synergy.amount / CoC.data.synergies[synergy.type].base
        }
      }
    }
  }
  
  function postprocess(array, size, extras, getValue){
    var result = { teams:[], extras:[] }, teams = [];
    for(var i=0; i<array.length; i+=size){
      var value = getValue(i);
      if(value > 0){
        var team = [];
        for(var j=0; j<size; j++)
          team.push(array[i+j].data);
        teams.push({ team:team, value:value });
      }
      else if(extras)
        for(var j=0; j<size && i+j<array.length; j++)
          result.extras.push(array[i+j].data);
    }
    
    //best teams will be first
    teams.sort(function(a,b){ return b.value-a.value; });
    for(var i=0; i<teams.length; i++)
      result.teams.push(teams[i].team);
    
    return result;
  }

  //getHeroStarId
  function getHeroStarId(data){
    return [data.id, data.stars].join('-');
  }
  
  //getTeamId
  function getTeamId(team){
    var ids = [];
    for(var i in team)
      ids.push(team[i].fid)
    ids.sort();
    return ids.join('-');
  }
}

CoC.algorithm["balanced"]=new function(){
  this.name = "Balanced";
  this.description = "Fast & Consistent. Gets available synergy connections and then splits distinct groups into teams.";
  this.canQuest = false;
  
  this.build=function(options){
    var synergies, distinct, missing, full;
    var weights = getWeights();
    var heroesMap = getHeroesMap(options.heroes);
    var synergiesMap = getSynergiesMap(options.heroes);
    var teams = { map:{}, list:[], heroIds:{}, heroCount: 0 };
    var extras = getRemainingHeroes(teams, heroesMap);
     
    if(options.progress)
      options.progress(10, options.heroes.length);
      
    //all synergies 
    var wanted = Math.floor(options.heroes.length / options.size);
    fillTeams: do{
    
      synergies = getSynergies(getRemainingHeroes(teams, heroesMap), synergiesMap);
      distinct = getDistinctSynergies(synergies);
    
      do{
      
        if(options.progress)
            options.progress(teams.heroCount, options.heroes.length);
      
        //first get rid of ones that are small enough
        for(var i=distinct.length-1; i>=0; i--){
          var synergies = distinct[i].synergies;
          var heroes = getHeroesFromSynergies(synergies, heroesMap, teams);
          if(heroes.length <= options.size && getTeamValue(heroes, synergiesMap, weights) > 0){
            var value = getTeamValue(heroes, synergiesMap, weights)
            addTeam(teams, heroes);
            distinct.splice(i, 1);
          }
        }
        var didSplit = false, splitDistinct = [], splitIndex = -1, splitBiggest = 0;
        
        //find the best one to split
        for(var i=0; i<distinct.length; i++){
          var synergies = distinct[i].synergies;
          if(!synergies)
            continue;
          var heroes = getHeroesFromSynergies(synergies, heroesMap, teams);
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
          var result = splitDistinctGroup(group, heroesMap, synergiesMap, weights, teams, options.size);
          
          if(getTeamValue(result.heroes, synergiesMap, weights) > 0)
            addTeam(teams, result.heroes);
          
          
          if(result.extras){
            var synergies = getDistinctSynergies( getSynergies(result.extras, synergiesMap) );
            for(var i in synergies)
              distinct.push(synergies[i])
          }
          didSplit = true;
        }
        //check again for teams
      } while(didSplit)
    
      extras = getRemainingHeroes(teams, heroesMap);
    
      function getTeamsBySize(){
        var map = {}, needed = 0;
        for(var i=1;i<options.size;i++)
          map[i]=[];
        for(var i=0; i<teams.list.length; i++){
          var size = teams.list[i].heroes.length;
          if( options.size - size > 0){
            needed += options.size - size;
            map[size].push({
              size:size,
              team: teams.list[i]
            });
          }
        }
        return map;
      }
      
      //if we have too many teams, try to condense them
      tooManyTeams: while(teams.list.length > wanted){
        
        extras = getRemainingHeroes(teams, heroesMap);
        teamsBySize = getTeamsBySize();
      
        //look for prefect then undersized fits, if we find one start again
        findfit: for(var size=options.size; size > 1; size--)
          for(var i=2; i<size; i++){
            var smallTeams = teamsBySize[i];
            var largeTeams = teamsBySize[size - i];
            for(var s in smallTeams)
              for(var l in largeTeams)
                if(smallTeams[s] !== largeTeams[l]){
                  var team = smallTeams[s].team.heroes.concat(largeTeams[l].team.heroes);
                  if(getTeamValue(team, synergiesMap, weights) > 0){
                    removeTeam(teams, smallTeams[s].team);
                    removeTeam(teams, largeTeams[l].team);
                    addTeam(teams, team);
                    continue tooManyTeams;
                  }
                }
          }
          
        extras = getRemainingHeroes(teams, heroesMap);
        teamsBySize = getTeamsBySize();

        //look for near perfect fits, if we find one, combine, throw away extra, then start again
        findcombine: for(var i=2; i<options.size; i++){
          var smallTeams = teamsBySize[i];
          var largeTeams = teamsBySize[options.size - i + 1];
          for(var s in smallTeams)
            for(var l in largeTeams)
              if(smallTeams[s] !== largeTeams[l]){
                var team = combineTeams(smallTeams[s].team.heroes, largeTeams[l].team.heroes, 
                  heroesMap, synergiesMap, weights, teams, options.size)
                if(getTeamValue(team, synergiesMap, weights) > 0){
                  removeTeam(teams, smallTeams[s].team);
                  removeTeam(teams, largeTeams[l].team);
                  addTeam(teams, team);
                  continue tooManyTeams;
                }
              }
        }
      
        extras = getRemainingHeroes(teams, heroesMap);
      
        //Take the worst team out and add to extras
        var worst = undefined;
        for(var i=0; i<teams.list.length; i++)
          if(teams.list[i].heroes.length < options.size){
            var value = getTeamValue(teams.list[i].heroes, synergiesMap, weights);
            if(worst === undefined || value < worst.value)
              worst={
                value: value,
                team: teams.list[i]
              }
          }
        if(worst)
          removeTeam(teams, worst.team);
      }
        
      extras = getRemainingHeroes(teams, heroesMap);
      
      // fill the groups with remainders,
      // lets see what the best match is for each open spot
      teams.list.sort(function(a,b){
        return b.heroes.length - a.heroes.length;
      })
      for(var i=0; i<teams.list.length; i++)
        while(teams.list[i].heroes.length < options.size && extras.length > 0){
          var team = teams.list[i], best = undefined;
          
          for(var j=0; j<extras.length; j++){
            var value = getTeamValue([extras[j]].concat(team.heroes), synergiesMap, weights);
            if(best === undefined || value > best.value)
              best={ index: j, hero: extras[j], value: value };
          }
          
          if(best){
            addToTeam(teams, team, best.hero);
            extras = getRemainingHeroes(teams, heroesMap);
          }
        }
      
      //check if we're done
      extras = getRemainingHeroes(teams, heroesMap);
      missing = false;
      for(var i=0; i<teams.list.length; i++)
        if(teams.list[i].heroes.length != options.size)
          missing = true;
      full = (teams.list.length == wanted);
      var extraSynergies = (function(){
        var synergies = getSynergies(extras, synergiesMap);
        for(var i=0; i<synergies.length; i++)
          if(synergies[i].value > 0)
            return true;
        return false;
      })();
      
    } while(missing || (!full && extraSynergies))
    
    if(options.progress)
        options.progress(options.heroes.length, options.heroes.length);
   
    return {
      teams: getTeamsArray(teams),
      extras: (options.extras)? extras: undefined
    }
  }
  
  //combineTeams
  function combineTeams(smaller, larger, heroesMap, synergiesMap, weights, teams, size){
    var largerSize = size - smaller.length, smallerSize = size - larger.length;
    if(largerSize == smallerSize)
      largerSize = smallerSize = larger.length - 1;
    
    var largerSub = splitDistinctGroup(getDistinctSynergies(getSynergies(larger, synergiesMap))[0], 
      heroesMap, synergiesMap, weights, teams, largerSize).heroes;
    var smallerSub = splitDistinctGroup(getDistinctSynergies(getSynergies(smaller, synergiesMap))[0], 
      heroesMap, synergiesMap, weights, teams, smallerSize).heroes;
    
    var a = [larger, largerSub];
    var b = [smaller, smallerSub];
   
    //find the biggest team of or smaller than size
    var best = { };
    for(var i in a)
      for(var j in b){
        var join = (a[i].length > b[j].length)? [a[i],b[j]]: [b[j],a[i]];
        var team = join[0].concat(join[1]);
        
        //cull down to size if needed, removing the worst members one at a time
        var value = getTeamValue(team, synergiesMap, weights);
        while(team.length > size){
          var worst = undefined;
          for(var o=0; o<team.length; o++){
            var sub = team.slice();
            sub.splice(o, 1);
            var v = getTeamValue(sub, synergiesMap, weights);
            if(worst === undefined || v < worst.value)
              worst = {
                index:o,
                value:v
              }
          }
          if(worst)
            team.splice(worst.index, 1);
        }
        
        if(best.count === undefined || (team.length <= size && team.length > best.count)){
          best.team = team;
          best.count = team.length;
        }
      }
    
    //fill the team up if we can
    var team = best.team;
    if(team.length < size){

      var leftovers = [];
      for(var i = 0; i<smaller.length; i++)
        leftovers.push(smaller[i]);
      for(var i = 0; i<larger.length; i++)
        leftovers.push(larger[i]);
        
        
      while(team.length < size && leftovers.length)
        team.push(leftovers.shift())
      
    }
    
    return team;
  }
  
  //splitDistinctGroup
  function splitDistinctGroup(group, heroesMap, synergiesMap, weights, teams, size){
    var heroSynergiesMap = {}, groupHeroes = getHeroesFromSynergies(group.synergies, heroesMap, teams);

    for(var i=0; i<group.synergies.length; i++){
      var synergy = group.synergies[i];
      if(heroSynergiesMap[synergy.fromId] === undefined)
        heroSynergiesMap[synergy.fromId]={
          hero:groupHeroes[i],
          synergies:[],
          count:0
        }
      heroSynergiesMap[synergy.fromId].synergies.push(synergy);
      heroSynergiesMap[synergy.fromId].count++;
      if(heroSynergiesMap[synergy.toId] === undefined)
        heroSynergiesMap[synergy.toId] = {
          hero:groupHeroes[i],
          synergies:[],
          count:0
        };
      heroSynergiesMap[synergy.toId].synergies.push(synergy);
      heroSynergiesMap[synergy.toId].count++;
    }
    
    var pivot = {};
    for(var i=0; i<groupHeroes.length; i++){
      var value = 0, id = groupHeroes[i].id, fid = getHeroStarId(groupHeroes[i]);
      if(heroSynergiesMap[fid])
        value += heroSynergiesMap[fid].count;
      if(heroSynergiesMap[id])
        value += heroSynergiesMap[id].count;
      if(pivot.value === undefined || value > pivot.value)
        pivot={
          id:groupHeroes[i].id,
          hero:groupHeroes[i],
          value:value
        }
    }
    
    /*
    var pivot = (function(){
      var index = Math.floor( Math.random() * groupHeroes.length );
      return {
        id:groupHeroes[index].id,
        hero:groupHeroes[index]
      }
    })();
    */
    
    //get all the heroes connected to our pivot hero
    var synergies = [];
    for(var s = 0; s <group.synergies.length; s++){
      var synergy = group.synergies[s];
      if(synergy.toId === pivot.id || synergy.from.id === pivot.id)
        synergies.push(synergy);
    }

    //get the least popular partners for the pivot hero
    var heroes = getHeroesFromSynergies(synergies, heroesMap, teams);
    
    //get the best team from our pivot hero!
    if(heroes.length > size){
      heroes.splice(heroes.indexOf(pivot.hero), 1)
      var team = [ pivot.hero ];
      
      while(team.length < size){
        var best = null;
        for(var i=0; i<heroes.length; i++){
          var value = getTeamValue(team.concat([ heroes[i] ]), synergiesMap, weights);
          if(!best || value > best.value)
            best = {
              index: i,
              value: value,
              hero: heroes[i]
            };
        }
        if(best){
          heroes.splice(best.index, 1);
          team.push(best.hero);
        }
      }
      heroes = team;
    }
    
    if(heroes.length === 1 || getTeamValue(heroes, synergiesMap, weights) === 0)
      heroes = [];
    
    for(var i=0; i<heroes.length; i++)
      groupHeroes.splice(groupHeroes.indexOf(heroes[i]),1);
      
    return { heroes:heroes, extras:groupHeroes };
  }
  
  function getRemainingHeroes(teams, heroesMap){
    var heroes = [];
    for(var fid in heroesMap.fids)
      if(!teams.heroIds[fid])
        heroes.push(heroesMap.fids[fid]);
    return heroes;
  }
  
  //getDistinctSynergies
  function getDistinctSynergies(synergies){
    var distinct = [], ids = {}, synergy, group, groupTo, groupFrom;
    for(var i=0; i<synergies.length; i++){
      synergy = synergies[i];
      if(synergy.value === 0)
        continue;
      group = groupTo = ids[synergy.toId];
      groupFrom = ids[synergy.from.id];
      if(!groupTo)
        group = groupFrom;
      else if(groupFrom && groupTo != groupFrom){
        groupTo.synergies = groupTo.synergies.concat(groupFrom.synergies);
        for(var s in groupFrom.synergies){
          ids[groupFrom.synergies[s].toId] = groupTo;
          ids[groupFrom.synergies[s].from.id] = groupTo;
        }
        distinct.splice( distinct.indexOf(groupFrom), 1);
        group = groupTo;
      }
      if(!group){
        group = { synergies:[] };
        distinct.push(group);
      }
      ids[synergy.toId] = group;
      ids[synergy.from.id] = group;
      group.synergies.push(synergy);
    }
    
    distinct.sort(function(a,b){
      return a.synergies.length - b.synergies.length;
    });
    
    return distinct;
  }
  
  //getSynergies
  function getSynergies(heroes, synergiesMap){
    var synergies = [], ids = {}, fids = {};
    
    for(var i=0; i<heroes.length; i++){
      var fid = getHeroStarId(heroes[i]);
      fids[fid] = heroes[i];
      ids[heroes[i].id] = true;
    }
  
    for(var fid in fids){
      for(var toId in synergiesMap.from[fid])
        if(ids[toId])
          synergies.push(synergiesMap.from[fid][toId]);
    }
    return synergies;
  }
  
  function getTeamValue(heroes, synergiesMap, weights){
    
    var hvalue = 0;
    for(var i=0; i<heroes.length; i++){
      //get my value
      var heroValue = weights.stars[heroes[i].stars];
      if(heroes[i].awakened)
        heroValue = weights.awakened;
      hvalue += heroValue;
    }
      
    if(hvalue === 0)
      return 0;
    
    var svalue = 0;
    var synergies = getSynergies(heroes, synergiesMap);
    for(var i=0 ;i<synergies.length; i++)
      svalue += synergies[i].value;
      
    if(svalue === 0)
      return 0;
      
    var cvalue = 1, classes = {};
    for(var i=0; i<heroes.length; i++){
      var c = CoC.data.heroes[heroes[i].id].class
      classes[c] = (classes[c] || 0) + 1;
    }
    for(i in classes)
      if(classes[i] > 1)
        cvalue *= weights.classes[classes[i]] || 1;

    return hvalue * svalue * cvalue;
  }
  
  //getHeroStarId
  function getHeroStarId(data){
    return [data.id, data.stars].join('-');
  }
  
  //getTeamId
  function getTeamId(heroes){
    var ids = [];
    for(var i=0; i<heroes.length; i++)
      ids.push(getHeroStarId(heroes[i]));
    return ids.join('#');
  }
  
  //getSynergiesMap
  function getSynergiesMap(heroes){
    var synergiesMap = { to:{}, from:{} };
    function addSynergy(which, id1, id2, synergy){
      var hash = synergiesMap[which][id1];
      if(hash === undefined){
        synergiesMap[which][id1] = hash = {};
      }
      hash[id2] = synergy;
    }
    for(var i = 0; i<heroes.length; i++){
      var data = heroes[i], id = data.id, fid = getHeroStarId(data), hero = CoC.data.heroes[data.id];
      
      for(var s=0; s<hero.synergies[data.stars].length; s++){
        var sdata = hero.synergies[data.stars][s];
        var synergy = {
          fromId: fid,
          from: data,
          toId: sdata.id,
          value: CoC.settings.getWeight(sdata.type) * sdata.amount / CoC.data.synergies[sdata.type].base
        }
        addSynergy('from', synergy.fromId, synergy.toId, synergy);
        addSynergy('to', synergy.toId, id, synergy);
      }
    }
    return synergiesMap;
  }
  
  //getHeroesMap
  function getHeroesMap(heroes){
    var heroesMap = { fids:{}, ids:{} };
    for(var i = 0; i<heroes.length; i++){
      var id = heroes[i].id, fid = getHeroStarId(heroes[i]);
      heroesMap.fids[fid] = heroes[i];
      var array = heroesMap.ids[id];
      if(!array)
        heroesMap.ids[id] = array = [];
      array.push(heroes[i]);
    }
    return heroesMap;
  }
  
  //getHeroesFromSynergies
  function getHeroesFromSynergies(synergies, heroesMap, teams){
    var heroes = [], idsTo = {}, idsFrom = {};
    for(var i=0; i<synergies.length; i++){
      idsTo[synergies[i].toId] = true;
      idsFrom[synergies[i].fromId] = true;
    }
    for(var fid in heroesMap.fids){
      var hero = heroesMap.fids[fid];
      var id = hero.id;
      if(teams.heroIds[fid])
        continue;
      else if(idsTo[id])
        heroes.push(hero);
      else if(idsFrom[fid])
        heroes.push(hero);
    }
    return heroes;
  }
  
  //addToTeam
  function addToTeam(teams, team, hero){
    var id = getHeroStarId(hero);
    if(teams.heroIds[id])
      return;
    teams.heroCount++;
    teams.heroIds[id] = true;
    team.heroIds[id] = true;
    team.heroes.push(hero);
    team.tid = getTeamId(team.heroes);
  }
  
  //addTeam
  function addTeam(teams, heroes){
    var team = {
      heroes:[],
      heroIds:{},
      tid:getTeamId(heroes),
    }
    if(teams.map[team.tid])
      return;
    for(var i=0; i<heroes.length; i++){
      var id = getHeroStarId(heroes[i]);
      teams.heroCount++;
      teams.heroIds[id] = true;
      team.heroIds[id] = true;
      team.heroes.push(heroes[i]);
    }
    teams.map[team.tid] = team;
    teams.list.push(team);
  }
  
  //removeTeam
  function removeTeam(teams, team){
    if(!teams.map[team.tid])
      return;
    for(var id in team.heroIds){
      teams.heroCount--;
      delete teams.heroIds[id];
    }
    for(var i=0; i<teams.list.length; i++)
      if(team.tid === teams.list[i].tid){
        teams.list.splice(i, 1)
        break;
      }
    delete teams.map[team.tid];
  }
  
  //getTeamsArray
  function getTeamsArray(teams){
    var array = [];
    for(var i=0; i<teams.list.length; i++)
      array.push(teams.list[i].heroes);
    return array;
  }
  
  function getWeights(){
    var i, weights = {
      stars:{},
      classes:{}
    };
    for(i=2; i<=5; i++)
      weights.classes[i] = CoC.settings.getDuplicateWeight(i);
    for(i=0; i<=4; i++)
      weights.stars[i] = CoC.settings.getStarWeight(i)
    weights.awakened = CoC.settings.getWeight("awakened");
    return weights;
  }
}