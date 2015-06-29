(function(){
    
  function factorial(n){
    if(!factorial.cache)
      factorial.cache = [ 1, 1 ];
    if(factorial.cache.length < n)
      for(var i=factorial.cache.length; i <= n; i++)
        factorial.cache[i] = i * factorial.cache[i - 1];
    return factorial.cache[n];
  }

  CoC.algorithm["greedy"]=new function(){
    
    this.name = "Greedy";
    this.description = "Slow & Consistent. Finds the best possible team and then does the same with remainders.";
    this.canQuest = true;

    this.build=function(options){
      var teams = {}, team, list = [], preselect = [], classWeights = [], progress = null;
      preProcess(options.champions, list, classWeights);
      
      if(options.quest)
        for(var i=list.length-1;i>=0;i--)
          if(list[i].quest){
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
              for(var o in team.champions)
                list.splice(list.indexOf(team.champions[o]),1);
                
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
            needed += options.size - teams[i].champions.length;
          
        //break up teams if we dont have enough
        while(list.length < needed){
          var i = teams.length - 1;
          for(var t in teams[i].champions){
            list.push(teams[i].champions[t]);
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
          if(teams[i].champions.length < options.size){
            var team = getNextPartner(list, teams[i].champions, teams[i].synergies, getClasses(teams[i].champions), 0, options.size, classWeights, progress);
            if(team){
              for(var o in team.champions){
                index = list.indexOf(team.champions[o]);
                if(index != -1)
                  list.splice(index,1);
              }
              teams[i] = team;
            }
            else{
              for(var o in teams[i].champions)
                list.push(teams[i].champions[o]);
              delete teams[i];
            }
          }
        }
        
        delete teams.length
      }
        
      return postProcess(teams, (options.extras && options.quest !== true)? list: undefined);
    }
    
    function preProcess(champions, list, classWeights){
      for(var i=2; i<=5; i++)
        classWeights[i] = CoC.settings.getDuplicateWeight(i);
        
      for(var i=0, champion, synergies; i<champions.length; i++){
        champion = champions[i];
        
        synergies = {};
        _(CoC.data.synergies.where({ fromId:champion.get("uid"), fromStars:champion.get("stars") })).each(function(synergy){
          var effect = synergy.effect();
          synergies[synergy.get("toId")]={
            id:synergy.get("toId"),
            fromId:synergy.get("fromId"),
            fromStars:synergy.get("fromStars"),
            value:CoC.settings.getWeight(synergy.get("effectId")) * synergy.get("effectAmount") / effect.get("base")
          }
        })
        
        list.push({
          id:champion.get("uid"),
          stars:champion.get("stars"),
          quest:champion.get("quest"),
          data:champion,
          type:CoC.data.types.indexOf(champion.type()),
          synergies:synergies,
          value:(function(stars, awakened){
            var value = CoC.settings.getStarWeight(stars);
            if(awakened > 0)
              value *= CoC.settings.getWeight("awakened");
            return value;
          })(champion.get("stars"), champion.get("awakened"))
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
        for(var o in teams[i].champions)
          team.push(teams[i].champions[o].data);
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
    
    function getNextPartner(list, champions, synergies, classes, index, depth, classWeights, progress){
      if(champions.length == depth){
        if(progress)
          progress.callback(++progress.current, progress.max);
        return {
          champions:champions,
          synergies:synergies,
          value:getTeamValue(champions, synergies, classes, classWeights)
        };
      }
      if(index == list.length)
        return null;
      var current = getNextPartner(list, 
        addPartnerHero(champions, list[index]), 
        addPartnerSynergies(synergies, champions, list[index]), 
        addPartnerClass(classes, list[index]), 
        index+1, depth, classWeights, progress
      );
      var next = getNextPartner(list, champions, synergies, classes, index+1, depth, classWeights, progress);

      return (compareTeams(current,next) >= 0)? current: next;
    }
    
    function addPartnerHero(list, hero){
      var champions = list.slice();
      champions.push(hero);
      return champions;
    }
    
    function addPartnerClass(list, hero){
      var classes = list.slice();
      classes[hero.type]++;
      return classes;
    }

    function getClasses(champions){
      var classes=[0,0,0,0,0,0], i;
      if(champions !== undefined)
        for(var i=0;i<champions.length;i++)
          classes[champions[i].type]++;
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
    
      var champions = [], synergies = [], remaining = champions.slice();
      while(remaining.length > 0){
        var hero = remaining[0];
        remaining.splice(0,1);
        synergies = addPartnerSynergies(synergies, champions, hero);
        champions.push(hero);
      }
      return synergies;
    }
      
    function getTeamValue(champions, synergies, classes, classWeights){
      var vsynergies = 0, vchampions = 0, vclasses = 1, i;
      for(i in synergies)
        vsynergies += synergies[i].value;
      for(i in champions)
        vchampions += champions[i].value;
      for(i in classes)
        if(classes[i] > 1)
          vclasses *= classWeights[classes[i]];
      return vsynergies * vchampions * vclasses;
    }
    
    function compareTeams(a, b){
      if(b == null)
        return 1;
      return a.value - b.value;
    }
    
    function getSynergyCulledTeam(team, classWeights){
      var classes = [0,0,0,0,0,0], culled = {
        champions:[],
        synergies:team.synergies,
        value:0
      }, i, s, cull;
      for(i=0;i<team.champions.length;i++ ){
        cull = true;
        synergies: for(s=0;s<team.synergies.length;s++){
        
          var from = team.synergies[s].fromId === team.champions[i].id && team.synergies[s].fromStars === team.champions[i].stars;
          var to = team.synergies[s].id === team.champions[i].id;
          if(to || from){
            addPartnerClass(classes, team.champions[i]);
            culled.champions.push(team.champions[i]);
            break synergies;
          }
        }
      }
      culled.value = getTeamValue(culled.champions, culled.synergies, classes, classWeights)
      return culled;
    }
  };

  CoC.algorithm["shuffle"]=new function(){
    this.name = "Shuffle";
    this.description = "Fast & Varied. Does iterated scans and swaps, balancing teams as best as possible.";
    this.canQuest = false;
    
    this.build=function(options){
      var size = parseInt(options.size), maxTeams = Math.floor(options.champions.length/size), forceExtras = maxTeams * size;
      var heroMap = {}, synergyMap = {}, classWeights = {}, teamValues = {};
      preprocess(options.champions, heroMap, synergyMap, classWeights);
    
      var swaps;
      
      function checkValueAndSwap(array, a, b){
        //get team values and counts with swaps
        var v1a = getTeamValue(array, a), v1b = getTeamValue(array, b),
          v2a = getTeamValue(array, a, b), v2b = getTeamValue(array, b, a), 
          count1 = (v1a > 0? 1: 0) + (v1b > 0? 1: 0),
          count2 = (v2a > 0? 1: 0) + (v2b > 0? 1: 0);
        
        //dont accept less teams
        if(count1 > count2)
          return false;
          
        //more teams, or more value
        if(count2 > count1 || (v2a + v2b > v1a + v1b)){
          var tmp = array[a];
          array[a] = array[b];
          array[b] = tmp;
          swaps++;
          return true;
        }
        return false;
      }
    
      function getTeamValue(array, index, swap){
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
            classes[hero.type] = (classes[hero.type] || 0) + 1;
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
      
      var progressMax = 16, didExtrasShuffle, array, arrays = [];
      
      function addArray(){
        array = [];
        for(var i in heroMap)
          array.push(heroMap[i]);
        array.sort(function(){ return Math.random() > 0.5; });
        arrays.push(array);
        didExtrasShuffle = false;
      }
      
      addArray();
      
      for(var progressCounter=0; progressCounter<progressMax; progressCounter++){
        if(options.progress)
          options.progress(progressCounter, progressMax);
          
        swaps = 0;
        
        //do the swaps
        for(var i=0; i<forceExtras; i++)
          for(var j=(Math.floor(i/size)+1)*size; j<array.length; j++)
            if(checkValueAndSwap(array, i, j))
              break;
    
        //check if we are missing teams
        var allFull = true;
        for(var i=0; i<forceExtras; i+=size)
          if(getTeamValue(array, i) === 0)
            allFull = false;
    
        //exit if we have nothing left to mess with
        if(swaps === 0){
        
          //stuff at the end can be ignored, lets move to empty team
          if(!didExtrasShuffle && !allFull){
            var empty = -1;
            for(var i=0; i<forceExtras; i+=size)
              if(getTeamValue(array, i) === 0)
                empty = i;
            if(empty !== -1){
              for(var i=0, tmp; i<size && forceExtras+i<array.length; i++){
                tmp = array[empty+i];
                array[empty+i] = array[forceExtras+i];
                array[forceExtras+i] = tmp;
              }
              didExtrasShuffle = true;
              continue;
            }
          }
          
          //start new list
          addArray();
        }
        
      }
      if(options.progress)
        options.progress(progressMax, progressMax);
        
      //get the best array
      var best = {};
      for(var i=0; i<arrays.length; i++){
        var current = arrays[i], value = 0;
        for(var j=0; j<forceExtras; j+=size)
          value += getTeamValue(current, j);
        if(best.value === undefined || best.value < value){
          best.value = value;
          best.array = current;
        }
      }
    
      return postprocess(best.array, size, options.extras, function(array, i){ 
        return getTeamValue(array, i);
      });
    }
    
    function preprocess(champions, heroMap, synergyMap, classWeights){
      for(i=2; i<=5; i++)
        classWeights[i] = CoC.settings.getDuplicateWeight(i);
    
      for(var i=0, fid, champion, synergies; i<champions.length; i++){
        champion = champions[i];
        fid = getHeroStarId(champion);
        
        //add hero
        heroMap[fid]={
          id:champion.get("uid"),
          fid:fid,
          type:champion.get("typeId"),
          value:(function(stars, awakened){
            var value = CoC.settings.getStarWeight(stars);
            if(awakened)
              value *= CoC.settings.getWeight("awakened");
            return value;
          })(champion.get("stars"), champion.get("awakened")),
          data:champion
        }
        synergyMap[fid] = {};
        synergies = CoC.data.synergies.where({ fromId:champion.get("uid"), fromStars:champion.get("stars") })
        for(var s=0;s < synergies.length; s++){
          var synergy = synergies[s];          
          var effect = synergy.effect();
          synergyMap[fid][synergy.get("toId")]={
            value:CoC.settings.getWeight(synergy.get("effectId")) * synergy.get("effectAmount") / effect.get("base")
          }
        }
      }
    }
    
    function postprocess(array, size, extras, getValue){
      var result = { teams:[], extras:[] }, teams = [];
      for(var i=0; i<array.length; i+=size){
        var value = getValue(array, i);
        if(value > 0){
          var team = [];
          for(var j=0; j<size; j++)
            team.push(array[i+j].data);
            
          //sort so same teams don't shuffle around
          team.sort(function(a,b){
            return getHeroStarId(a).localeCompare(getHeroStarId(b));
          });
            
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
    function getHeroStarId(champion){
      return [champion.get("uid"), champion.get("stars")].join('-');
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

  CoC.algorithm["distinct"]=new function(){
    this.name = "Distinct";
    this.description = "Fast & Consistent. Gets available synergy connections and then splits distinct groups into teams.";
    this.canQuest = false;
    
    this.build=function(options){
      var synergies, distinct, missing, full;
      var weights = getWeights();
      var championsMap = getHeroesMap(options.champions);
      var synergiesMap = getSynergiesMap(options.champions);
      var teams = { map:{}, list:[], heroIds:{}, heroCount: 0 };
      var extras = getRemainingHeroes(teams, championsMap);
       
      if(options.progress)
        options.progress(10, options.champions.length);
        
      //all synergies 
      var wanted = Math.floor(options.champions.length / options.size);
      fillTeams: do{
      
        synergies = getSynergies(getRemainingHeroes(teams, championsMap), synergiesMap);
        distinct = getDistinctSynergies(synergies);
      
        do{
        
          if(options.progress)
              options.progress(teams.heroCount, options.champions.length);
        
          //first get rid of ones that are small enough
          for(var i=distinct.length-1; i>=0; i--){
            var synergies = distinct[i].synergies;
            var champions = getHeroesFromSynergies(synergies, championsMap, teams);
            if(champions.length <= options.size && getTeamValue(champions, synergiesMap, weights) > 0){
              var value = getTeamValue(champions, synergiesMap, weights)
              addTeam(teams, champions);
              distinct.splice(i, 1);
            }
          }
          var didSplit = false, splitDistinct = [], splitIndex = -1, splitBiggest = 0;
          
          //find the best one to split
          for(var i=0; i<distinct.length; i++){
            var synergies = distinct[i].synergies;
            if(!synergies)
              continue;
            var champions = getHeroesFromSynergies(synergies, championsMap, teams);
            if(champions.length > options.size && champions.length > splitBiggest){
              splitIndex = i;
              splitBiggest = champions.length;
            }
          }
          
          //split it
          if(splitIndex !== -1){
            var group = distinct[splitIndex];
            distinct.splice(splitIndex, 1);
            
            //pull out a group from
            var result = splitDistinctGroup(group, championsMap, synergiesMap, weights, teams, options.size);
            
            if(getTeamValue(result.champions, synergiesMap, weights) > 0)
              addTeam(teams, result.champions);
            
            
            if(result.extras){
              var synergies = getDistinctSynergies( getSynergies(result.extras, synergiesMap) );
              for(var i in synergies)
                distinct.push(synergies[i])
            }
            didSplit = true;
          }
          //check again for teams
        } while(didSplit)
      
        extras = getRemainingHeroes(teams, championsMap);
      
        function getTeamsBySize(){
          var map = {}, needed = 0;
          for(var i=1;i<options.size;i++)
            map[i]=[];
          for(var i=0; i<teams.list.length; i++){
            var size = teams.list[i].champions.length;
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
          
          extras = getRemainingHeroes(teams, championsMap);
          teamsBySize = getTeamsBySize();
        
          //look for prefect then undersized fits, if we find one start again
          findfit: for(var size=options.size; size > 1; size--)
            for(var i=2; i<size; i++){
              var smallTeams = teamsBySize[i];
              var largeTeams = teamsBySize[size - i];
              for(var s in smallTeams)
                for(var l in largeTeams)
                  if(smallTeams[s] !== largeTeams[l]){
                    var team = smallTeams[s].team.champions.concat(largeTeams[l].team.champions);
                    if(getTeamValue(team, synergiesMap, weights) > 0){
                      removeTeam(teams, smallTeams[s].team);
                      removeTeam(teams, largeTeams[l].team);
                      addTeam(teams, team);
                      continue tooManyTeams;
                    }
                  }
            }
            
          extras = getRemainingHeroes(teams, championsMap);
          teamsBySize = getTeamsBySize();

          //look for near perfect fits, if we find one, combine, throw away extra, then start again
          findcombine: for(var i=2; i<options.size; i++){
            var smallTeams = teamsBySize[i];
            var largeTeams = teamsBySize[options.size - i + 1];
            for(var s in smallTeams)
              for(var l in largeTeams)
                if(smallTeams[s] !== largeTeams[l]){
                  var team = combineTeams(smallTeams[s].team.champions, largeTeams[l].team.champions, 
                    championsMap, synergiesMap, weights, teams, options.size)
                  if(getTeamValue(team, synergiesMap, weights) > 0){
                    removeTeam(teams, smallTeams[s].team);
                    removeTeam(teams, largeTeams[l].team);
                    addTeam(teams, team);
                    continue tooManyTeams;
                  }
                }
          }
        
          extras = getRemainingHeroes(teams, championsMap);
        
          //Take the worst team out and add to extras
          var worst = undefined;
          for(var i=0; i<teams.list.length; i++)
            if(teams.list[i].champions.length < options.size){
              var value = getTeamValue(teams.list[i].champions, synergiesMap, weights);
              if(worst === undefined || value < worst.value)
                worst={
                  value: value,
                  team: teams.list[i]
                }
            }
          if(worst)
            removeTeam(teams, worst.team);
        }
          
        extras = getRemainingHeroes(teams, championsMap);
        
        // fill the groups with remainders,
        // lets see what the best match is for each open spot
        teams.list.sort(function(a,b){
          return b.champions.length - a.champions.length;
        })
        for(var i=0; i<teams.list.length; i++)
          while(teams.list[i].champions.length < options.size && extras.length > 0){
            var team = teams.list[i], best = undefined;
            
            for(var j=0; j<extras.length; j++){
              var value = getTeamValue([extras[j]].concat(team.champions), synergiesMap, weights);
              if(best === undefined || value > best.value)
                best={ index: j, hero: extras[j], value: value };
            }
            
            if(best){
              addToTeam(teams, team, best.hero);
              extras = getRemainingHeroes(teams, championsMap);
            }
          }
        
        //check if we're done
        extras = getRemainingHeroes(teams, championsMap);
        missing = false;
        for(var i=0; i<teams.list.length; i++)
          if(teams.list[i].champions.length != options.size)
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
          options.progress(options.champions.length, options.champions.length);
     
      return {
        teams: getTeamsArray(teams),
        extras: (options.extras)? getExtras(extras): undefined
      }
    }
    
    //combineTeams
    function combineTeams(smaller, larger, championsMap, synergiesMap, weights, teams, size){
      var largerSize = size - smaller.length, smallerSize = size - larger.length;
      if(largerSize == smallerSize)
        largerSize = smallerSize = larger.length - 1;
      
      var largerSub = splitDistinctGroup(getDistinctSynergies(getSynergies(larger, synergiesMap))[0], 
        championsMap, synergiesMap, weights, teams, largerSize).champions;
      var smallerSub = splitDistinctGroup(getDistinctSynergies(getSynergies(smaller, synergiesMap))[0], 
        championsMap, synergiesMap, weights, teams, smallerSize).champions;
      
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
    function splitDistinctGroup(group, championsMap, synergiesMap, weights, teams, size){
      var heroSynergiesMap = {}, groupHeroes = getHeroesFromSynergies(group.synergies, championsMap, teams);

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
            fid:groupHeroes[i].fid,
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
      
      //get all the champions connected to our pivot hero
      var synergies = [];
      for(var s = 0; s <group.synergies.length; s++){
        var synergy = group.synergies[s];
        if(synergy.toId === pivot.id || synergy.fromId === pivot.fid)
          synergies.push(synergy);
      }

      //get the least popular partners for the pivot hero
      var champions = getHeroesFromSynergies(synergies, championsMap, teams);
      
      //get the best team from our pivot hero!
      if(champions.length > size){
        champions.splice(champions.indexOf(pivot.hero), 1)
        var team = [ pivot.hero ];
        
        while(team.length < size){
          var best = null;
          for(var i=0; i<champions.length; i++){
            var value = getTeamValue(team.concat([ champions[i] ]), synergiesMap, weights);
            if(!best || value > best.value)
              best = {
                index: i,
                value: value,
                hero: champions[i]
              };
          }
          if(best){
            champions.splice(best.index, 1);
            team.push(best.hero);
          }
        }
        champions = team;
      }
      
      if(champions.length === 1 || getTeamValue(champions, synergiesMap, weights) === 0)
        champions = [];
      
      for(var i=0; i<champions.length; i++)
        groupHeroes.splice(groupHeroes.indexOf(champions[i]),1);
        
      return { champions:champions, extras:groupHeroes };
    }
    
    function getRemainingHeroes(teams, championsMap){
      var champions = [];
      for(var fid in championsMap.fids)
        if(!teams.heroIds[fid])
          champions.push(championsMap.fids[fid]);
      return champions;
    }
    
    //getDistinctSynergies
    function getDistinctSynergies(synergies){
      var distinct = [], ids = {}, synergy, group, groupTo, groupFrom;
      for(var i=0; i<synergies.length; i++){
        synergy = synergies[i];
        if(synergy.value === 0)
          continue;
        group = groupTo = ids[synergy.toId];
        groupFrom = ids[synergy.fromId];
        if(!groupTo)
          group = groupFrom;
        else if(groupFrom && groupTo != groupFrom){
          groupTo.synergies = groupTo.synergies.concat(groupFrom.synergies);
          for(var s in groupFrom.synergies){
            ids[groupFrom.synergies[s].toId] = groupTo;
            ids[groupFrom.synergies[s].fromId] = groupTo;
          }
          distinct.splice( distinct.indexOf(groupFrom), 1);
          group = groupTo;
        }
        if(!group){
          group = { synergies:[] };
          distinct.push(group);
        }
        ids[synergy.toId] = group;
        ids[synergy.fromId] = group;
        group.synergies.push(synergy);
      }
      
      distinct.sort(function(a,b){
        return a.synergies.length - b.synergies.length;
      });
      
      return distinct;
    }
    
    //getSynergies
    function getSynergies(champions, synergiesMap){
      var synergies = [], ids = {}, fids = {};
      
      for(var i=0; i<champions.length; i++){
        var fid = getHeroStarId(champions[i]);
        fids[fid] = champions[i];
        ids[champions[i].id] = true;
      }
    
      for(var fid in fids){
        for(var toId in synergiesMap.from[fid])
          if(ids[toId])
            synergies.push(synergiesMap.from[fid][toId]);
      }
      return synergies;
    }
    
    function getTeamValue(champions, synergiesMap, weights){
      
      var hvalue = 0;
      for(var i=0; i<champions.length; i++){
        //get my value
        var heroValue = weights.stars[champions[i].stars];
        if(champions[i].awakened)
          heroValue = weights.awakened;
        hvalue += heroValue;
      }
        
      if(hvalue === 0)
        return 0;
      
      var svalue = 0;
      var synergies = getSynergies(champions, synergiesMap);
      for(var i=0 ;i<synergies.length; i++)
        svalue += synergies[i].value;
        
      if(svalue === 0)
        return 0;
        
      var cvalue = 1, types = {};
      for(var i=0; i<champions.length; i++){
        types[champions[i].type] = (types[champions[i].type] || 0) + 1;
      }
      for(i in types)
        if(types[i] > 1)
          cvalue *= weights.types[types[i]] || 1;

      return hvalue * svalue * cvalue;
    }
    
    //getHeroStarId
    function getHeroStarId(data){
      return [data.id, data.stars].join('-');
    }
    
    //getTeamId
    function getTeamId(champions){
      var ids = [];
      for(var i=0; i<champions.length; i++)
        ids.push(getHeroStarId(champions[i]));
      return ids.join('#');
    }
    
    //getSynergiesMap
    function getSynergiesMap(champions){
      var synergiesMap = { to:{}, from:{} };
      function addSynergy(which, id1, id2, synergy){
        var hash = synergiesMap[which][id1];
        if(hash === undefined){
          synergiesMap[which][id1] = hash = {};
        }
        hash[id2] = synergy;
      }
      for(var i = 0; i<champions.length; i++){
        var champion = champions[i];
        var synergies = CoC.data.synergies.where({ fromId:champion.get("uid"), fromStars:champion.get("stars") })
        for(var s=0;s < synergies.length; s++){
          var synergy = synergies[s];
          var effect = synergy.effect();
          
          data = {
            fromId: getHeroStarId({ id:champion.get("uid"), stars:champion.get("stars") }),
            toId: synergy.get("toId"),
            value: CoC.settings.getWeight(synergy.get("effectId")) * synergy.get("effectAmount") / effect.get("base")
          }
          
          addSynergy('from', data.fromId, data.toId, data);
          addSynergy('to', data.toId, champion.get("uid"), data);
        }
      }
      return synergiesMap;
    }
    
    //getHeroesMap
    function getHeroesMap(champions){
      var championsMap = { fids:{}, ids:{} };
      for(var i = 0; i<champions.length; i++){
        var champion = champions[i];
        var data = {
          id: champion.get("uid"),
          stars: champion.get("stars"),
          awakened: champion.get("awakened"),
          type: champion.get("typeId"),
          champion:champion
        }
        data.fid = getHeroStarId(data)
      
        championsMap.fids[data.fid] = data;
        var array = championsMap.ids[data.id];
        if(!array)
          championsMap.ids[data.id] = array = [];
        array.push(champions[i]);
      }
      return championsMap;
    }
    
    //getHeroesFromSynergies
    function getHeroesFromSynergies(synergies, championsMap, teams){
      var champions = [], idsTo = {}, idsFrom = {};
      for(var i=0; i<synergies.length; i++){
        idsTo[synergies[i].toId] = true;
        idsFrom[synergies[i].fromId] = true;
      }
      for(var fid in championsMap.fids){
        var hero = championsMap.fids[fid];
        var id = hero.id;
        if(teams.heroIds[fid])
          continue;
        else if(idsTo[id])
          champions.push(hero);
        else if(idsFrom[fid])
          champions.push(hero);
      }
      return champions;
    }
    
    //addToTeam
    function addToTeam(teams, team, hero){
      var id = getHeroStarId(hero);
      if(teams.heroIds[id])
        return;
      teams.heroCount++;
      teams.heroIds[id] = true;
      team.heroIds[id] = true;
      team.champions.push(hero);
      team.tid = getTeamId(team.champions);
    }
    
    //addTeam
    function addTeam(teams, champions){
      var team = {
        champions:[],
        heroIds:{},
        tid:getTeamId(champions),
      }
      if(teams.map[team.tid])
        return;
      for(var i=0; i<champions.length; i++){
        var id = getHeroStarId(champions[i]);
        teams.heroCount++;
        teams.heroIds[id] = true;
        team.heroIds[id] = true;
        team.champions.push(champions[i]);
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
      for(var i=0; i<teams.list.length; i++){
        var team = [];
        for(j=0; j<teams.list[i].champions.length; j++)
          team.push(teams.list[i].champions[j].champion)
        array.push(team);
      }
      return array;
    }
    
    function getExtras(array){
      var extras = [];
      for(var i=0; i<array.length; i++)
        extras.push(array[i].champion);
      return extras;
    }
    
    function getWeights(){
      var i, weights = {
        stars:{},
        types:{}
      };
      for(i=2; i<=5; i++)
        weights.types[i] = CoC.settings.getDuplicateWeight(i);
      for(i=0; i<=4; i++)
        weights.stars[i] = CoC.settings.getStarWeight(i)
      weights.awakened = CoC.settings.getWeight("awakened");
      return weights;
    }
  }
  
})();