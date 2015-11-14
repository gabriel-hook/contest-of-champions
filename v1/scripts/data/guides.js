var CoC=CoC || {};
CoC.data = CoC.data || {};
CoC.data.guides = CoC.data.guides || {};

(function(){ 
  var map = {};
  var uids = _.uniq( CoC.data.champions.pluck("uid") );

  CoC.data.guides.each = function(callback){
    _(uids).each(function(uid){
      callback.call(CoC.data.guides, map[uid]);
    });
  };

  CoC.data.guides.get = function(uid){
    return map[uid];
  };

  CoC.data.guides.set = function(uid, guide){
    map[uid] = guide;
  };

  CoC.data.guides.init = function(uid){
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
    //Add in champion grades
    if(CoC.data.guides.raw[uid]){
      value.data = CoC.data.guides.raw[uid];
      if(value.data.grades !== undefined){
        if(value.data.grades.normal !== undefined)
          value.champion.set("grade", value.data.grades.normal);  
        if(value.data.grades.awakened !== undefined)
          value.champion.set("gradeAwakened", value.data.grades.awakened);  
      }
    }
  };

  _(uids).each(function(uid){
    CoC.data.guides.init(uid);
  });

})();
