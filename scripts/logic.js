CoC.logic.heroes=new function(){
  
  this.excluding=function(map, stars){
    var array = [], i;
    if(map instanceof Array){
      for(array=map, map={}, i=0; i<array.length; i++)
        map[array[i].id]=true;
      array = [];
    }
    
    for(i in CoC.data.heroes)
      if(!map[CoC.data.heroes[i].id] && CoC.data.heroes[i].synergies[stars])
          array.push(CoC.data.heroes[i]);
          
    console.log(array)
          
    return array;
  }
}

CoC.logic.synergy=new function(){

  var characterSynergies = {1:{},2:{},3:{},4:{}};
  
  this.get=function(list){
    var map = {}, i, j, synergies, s;
    for(i=0;i<list.length;i++)
      for(j=0;j<list.length;j++)
        if(j != i){
          synergies = CoC.data.heroes[list[i].id].synergies[list[i].stars];
          for(s=0; s<synergies.length; s++)
            if(synergies[s].id === list[j].id){
              if(map[synergies[s].type] === undefined)
                map[synergies[s].type] = 0;
              map[synergies[s].type] += synergies[s].amount;
            }
        }
    return map;
  }
  
  this.count=function(list){
    var count = 0, i, j, synergies, s;
    for(i=0;i<list.length;i++)
      for(j=0;j<list.length;j++)
        if(j != i){
          synergies = CoC.data.heroes[list[i].id].synergies[list[i].stars];
          for(s=0; s<synergies.length; s++)
            if(synergies[s].id === list[j].id)
              count++;
        }
    return count;
  }
}