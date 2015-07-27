var CoC=CoC || {};
CoC.data = CoC.data || {};

CoC.data.guides = CoC.data.guides = new function(){
  var that = this,
    map = {},
    uids = [],
    loaded = false,
    onComplete;
  
  this.each = function(callback){
    _(uids).each(function(uid){
      callback.call(that, map[uid]);
    });
  };

  this.get = function(uid){
    return map[uid];
  };
  

  this.onComplete=function(callback){
    if(loaded){
      callback.call(that);
      return;
    }
    onComplete = callback;
  };
  
  //Initialize next tick
  setTimeout(function(){
    uids = _.uniq( CoC.data.champions.pluck("uid") );
    var working = uids.length;
    _(uids).each(function(uid){
    
      //set initial guide state
      var value = map[uid] = {
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
              if(value.data.grades !== undefined){
                if(value.data.grades.normal !== undefined)
                  value.champion.set("grade", value.data.grades.normal);  
                if(value.data.grades.awakened !== undefined)
                  value.champion.set("gradeAwakened", value.data.grades.awakened);  
              }
            }
          }
          catch(error){
            console.error(error);
          }
          //if done all of them, do callback
          if(--working === 0){
            loaded = true;
            if(onComplete !== undefined)
              onComplete.call(that);
          }
        }
      });
      
    });
    
  }, 0);
};
