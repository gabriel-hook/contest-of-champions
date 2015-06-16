CoC.algorithm["greedy"]=new function(){
  
  this.name = "Greedy";
  this.description = "Slow, but finds the strongest possible teams first.";
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
  this.description = "Fast, will find the most teams, but not always a team as good as Greedy finds.";
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
          if(heroes.length <= options.size){
            addTeam(teams, heroes);
            distinct.splice(i, 1);
          }
        }
        var didSplit = false, splitDistinct = [], splitIndex = -1, splitBiggest = 0;
        
        //find the best one to split
        for(var i in distinct){
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
                  removeTeam(teams, smallTeams[s].team);
                  removeTeam(teams, largeTeams[l].team);
                  addTeam(teams, smallTeams[s].team.heroes.concat(largeTeams[l].team.heroes));
                  continue tooManyTeams;
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
                removeTeam(teams, smallTeams[s].team);
                removeTeam(teams, largeTeams[l].team);
                addTeam(teams, combineTeams(
                  smallTeams[s].team.heroes, 
                  largeTeams[l].team.heroes, 
                  heroesMap, synergiesMap, weights,
                  teams, options.size));
                continue tooManyTeams;
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
            if(value > 0 && (best === undefined || value > best.value))
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
      var extraSynergies = getSynergies(extras, synergiesMap).length;
      
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
    var heroFromMap = {}, heroToMap = {}, groupHeroes = getHeroesFromSynergies(group.synergies, heroesMap, teams);
    
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
      heroToMap[synergy.toId].synergies.push(synergy);
      heroToMap[synergy.toId].count++;
    }
    
    var pivot = {};
    for(var i=0; i<groupHeroes.length; i++){
      var value = heroFromMap[getHeroStarId(groupHeroes[i])].count + heroToMap[groupHeroes[i].id].count;
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

CoC.algorithm["bruteforce"]=new function(){
  this.name = "Brute Force";
  this.description = "Extremely slow, will find the best mix of teams possible.";
  this.canQuest = true;
  
  this.build=function(options){
    var size = options.size;
    var progressCounter, progressMax;

    var teamValues = {}, classWeights = [], heroes = preprocess(options.heroes, classWeights);
    function getTeamValue(team){
    
      var id = getTeamId(team);
      var result = teamValues[id];
      if(result === undefined){
        var heroes = 0, synergies = 0, classes = {};
        for(var i in team){
          //get my value
          heroes += team[i].value;
          //get my synergies
          for(var j in team)
            if(i != j){
              if(team[i].synergies[team[j].id]){
                synergies += team[i].synergies[team[j].id].value;
              }
            }
          //get my class dupes
          classes[team[i].class] = (classes[team[i].class] || 0) + 1;
        }
        var classesValue = 1;
        for(i in classes)
          if(classes[i] > 1)
            classesValue *= classWeights[classes[i]] || 1;
        //result
        teamValues[id] = result = classesValue * heroes * synergies;
      }
      return result;
    }
    
    var heroIds = [], heroMap = {};
    for(var i in heroes){
      heroIds.push(heroes[i].fid);
      heroMap[heroes[i].fid] = heroes[i];
    }
    
    progressCounter = 0;
    progressMax = combinations(heroIds.length, options.size);
    if(options.progress)
      options.progress(progressCounter, progressMax, "Finding all possible teams.");
    
    //create all possible hero combinations
    var teamList = [], teamMap = {};
    iterateSubsets(heroIds, options.size, function(ids){  
      progressCounter ++;
      if(options.progress)
        options.progress(progressCounter, progressMax);
        
      var idMap = {};
      for(var i in ids)
        idMap[ids[i]] = true;
        
      var team = [], value;
      for(var i in ids)
        team.push(heroMap[ids[i]]);
      value = getTeamValue(team);
        
      var result={
        id: ids.join('-'),
        ids: idMap,
        value: value,
        toString: function(){ return this.id }
      };
      teamList.push(result)
      teamMap[result.id]=result;
    })
    var maxTeams = Math.floor( options.heroes.length / options.size );
    
    if(options.single){
      var best = undefined;
      for(var i=0; i<teamList.length; i++){
        if(best === undefined || teamList[i].value > best.value)
          best = teamList[i];
      }
      var array = [];
      if(best)
        array.push(best);
      return postprocess(array, heroMap, false);
    }
    
    progressCounter = 0;
    progressMax = partitions(options.heroes.length, size, maxTeams);
    if(options.progress)
      options.progress(progressCounter, progressMax, "Comparing all possible team combinations.");

    var best;
    //look at all possible team arrangements
    iterateSubsets(teamList, maxTeams, function(teams){
      progressCounter++;
      if(options.progress)
        options.progress(progressCounter, progressMax);
    
      var total = 0, count = 0;
    
      for(var i in teams){
        var team = teams[i];
        if(team.value > 0)
          count++;
        total += team.value;
      }
      
      if(!total)
        return;
      
      if(!best || (best.count <= count && best.total < total)){
        best = {
          teams:teams,
          count:count,
          total:total
        } 
      }
    },
    function(current, team){
      var i, id;
      for(i in current)
        if(i !== 'length')
          for(id in team.ids)
            if(current[i].ids[id])
              return false;
      return true;
    })
    
    return postprocess(best.teams, heroMap, options.extras);
  }
  
  function preprocess(list, classWeights){
  
    for(i=2; i<=5; i++)
      classWeights[i] = CoC.settings.getDuplicateWeight(i);
  
    var heroes = [];
    for(var i in list){
      var data = list[i];
      var synergies = {};
      var hero = CoC.data.heroes[data.id];
      for(var s in hero.synergies[data.stars]){
        var synergy = hero.synergies[data.stars][s];
        synergies[synergy.id]={
          synergy:synergy,
          value:CoC.settings.getWeight(synergy.type) * synergy.amount / CoC.data.synergies[synergy.type].base
        }
      }
      heroes.push({
        id:data.id,
        fid:data.id+"_"+data.stars,
        synergies:synergies,
        class:hero.class.toLowerCase(),
        data:data,
        value:(function(stars, awakened){
          var value = CoC.settings.getStarWeight(stars);
          if(awakened)
            value *= CoC.settings.getWeight("awakened");
          return value;
        })(data.stars, data.awakened)
      })
    }
    return heroes;
  }
  
  function postprocess(teams, heroes, extras){
    var result = {
      teams:[],
      extras:[]
    };
    for(var i in teams){
      var team = [];
      if(teams[i].value === 0)
        continue;
      for(var id in teams[i].ids){
        team.push(heroes[id].data);
        delete heroes[id];
      }
      result.teams.push(team);
    }
    if(extras)
      for(var i in heroes)
        result.extras.push(heroes[i].data);
    return result;
  }
  
  function getTeamId(team){
    var ids = [];
    for(var i in team)
      ids.push(team[i].fid)
    ids.sort();
    return ids.join('-');
  }
  
  //factorial(n) / ( factorial(r) ^ k * factorial(k) )
  // Use math tricks to calc much less
  function partitions(n, r, k){
    var value = n / Math.pow(factorial(r), k - 1);
    for(var i = n - 1; i > r; i--)
      value = value * i;
    return value / factorial(k);
  }
  
  //factorial(n) / factorial(n - r)
  // Use math tricks to calc much less
  function permutations(n, r){
    var value = n;
    for(var i = n - 1; i > n - r; i--)
      value *= i;
    return value;
  }
  
  //factorial(n) / (factorial(r) * factorial(n - r))
  // Use math tricks to calc much less
  function combinations(n, r){
    var value = n / factorial(r);
    for(var i = n - 1; i > n - r; i--)
      value *= i;
    return value;
  }
  
  function factorial(n){
    if(factorial.cache === undefined)
      factorial.cache = [ 1, 1 ];
    if(n >= factorial.cache.length)
      for(var i=factorial.cache.length; i <= n; i++)
        factorial.cache.push( i * factorial.cache[i - 1] );
    return factorial.cache[n];
  }
  
  function iterateSubsets(array, size, callback, filter) {
    var stack = [{
      stage:0,
      index:0,
      current:{ length: 0 }
    }];
    while(stack.length > 0){
      var snapshot = stack.pop();
      switch(snapshot.stage){
      case 0:
      
        if (snapshot.current.length == size) {
          var keys = [];
          for(var i in snapshot.current)
            if(i !== "length")
              keys.push(snapshot.current[i]);
          callback(keys);
        }
        else{
          snapshot.stage = 1;
          stack.push(snapshot);
        }
        
        continue;
        break;
      case 1:
      
        if (snapshot.index < array.length){
          snapshot.stage = 2;
          stack.push(snapshot);
        }
        
        continue;
        break;
      case 2: 
      
        var value = array[snapshot.index], key = value.toString();
        if(!filter || filter(snapshot.current, value)){
          var current = {};
          for(var i in snapshot.current)
            current[i] = snapshot.current[i];
          current[key] = value;
          current.length++;
          stack.push({
            stage:0,
            index:snapshot.index + 1,
            current:current
          });
        }
        snapshot.stage = 3;
        stack.push(snapshot);
        
        continue;
        break;
      case 3:
      
        stack.push({
          stage:0,
          index:snapshot.index + 1,
          current:snapshot.current
        });
        
        continue;
        break;
      }
    }
    
  /*

    function subset(index, current) {
      //successful stop clause  
      if (current.length == size) {
        var keys = [];
        for(var i in current)
          if(i !== "length")
            keys.push(current[i]);
        callback(keys);
        return;
      }

      //unsuccessful stop clause
      if (index == array.length) 
        return;
        
      var value = array[index], key = value.toString();
      if(!filter || filter(current, value)){
        current[key] = value;
        current.length++;
        //"guess" value is in the subset
        subset(index+1, current);
        
        delete current[key];
        current.length--;
      }
      //"guess" value is not in the subset
      subset(index+1, current);
    }
    subset(0, { length: 0 });
*/
  }
}