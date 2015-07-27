var CoC=CoC || {};
CoC.data = CoC.data || {};
CoC.data.guides = CoC.data.guides || {};

CoC.data.guides.each = function(callback){
  var that = this;
  _(CoC.data.guides.uids).each(function(uid){
    callback.call(that, CoC.data.guides.map[uid]);
  });
}

CoC.data.guides.get = function(uid){
  return CoC.data.guides.map[uid];
}

CoC.data.guides.onComplete=function(onComplete){
  if(CoC.data.guides._completed){
    onComplete();
    return;
  }
  CoC.data.guides._onComplete = onComplete;
}

setTimeout(function(){
  CoC.data.guides.map = {};
  CoC.data.guides.uids = _.uniq( CoC.data.champions.pluck("uid") );
  var working = CoC.data.guides.uids.length;
  _(CoC.data.guides.uids).each(function(uid){
  
    //set initial guide state
    var value = CoC.data.guides.map[uid] = {
      uid: uid,
      champion:(function(){
        var champion = CoC.data.champions.findWhere({ uid:uid }).clone();
        champion.set("stars", 0);
        return champion;
      })(),
      data:{
        unavailable: true
      }
    };
    
    //fetch more data if possible
    $.ajax({
      url: "scripts/data/guides/"+uid+".json",
      complete:function(response){
        try{
          if(response.status === 200){
            //update state and champion dummy
            value.data = JSON.parse( response.responseText );
            if(value.data.grades && value.data.grades.normal)
              value.champion.set("grade", value.data.grades.normal);  
            if(value.data.grades && value.data.grades.awakened)
              value.champion.set("gradeAwakened", value.data.grades.awakened);  
          }
        }
        catch(error){
          console.error(error);
        }
        //if done all of them, do callback
        working--;
        if(!working){
          CoC.data.guides._completed = true;
          if(CoC.data.guides._onComplete !== undefined)
            CoC.data.guides._onComplete();
        }
      }
    });
    
  });
}, 0);
