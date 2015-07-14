var CoC=CoC || {};
CoC.guides=CoC.guides || {}

CoC.guides.initialize=function(){
  CoC.guides.data = {};
  setTimeout(function(){
    var uids = _.uniq( CoC.data.champions.pluck("uid") ),
      working = uids.length;
    _(uids).each(function(uid){
      $.ajax({
        url: "scripts/data/guides/"+uid+".json",
        complete:function(response){
          var data;
          try{
            if(response.status === 200)
              data = JSON.parse( response.responseText );
          }
          catch(error){
            console.error(error);
          }
          CoC.guides.add(uid, data);
          
          //if done all of them, do callback
          working--;
          if(!working){
            CoC.guides._completed = true;
            if(CoC.guides._onComplete !== undefined)
              CoC.guides._onComplete();
          }
        }
      });
    });
  },0);
}
  
CoC.guides.get=function(uid){
  return CoC.guides.data[uid];
}
  
CoC.guides.add=function(uid, data){
  var champion = CoC.data.champions.findWhere({ uid:uid }).clone();
  champion.set("stars", 0);
  var value = {
    uid:uid,
    champion:champion
  };
  if(data){
    if(data.grades)
      if(data.grades.normal){
        champion.set("grade", data.grades.normal);  
        if(data.grades.awakened)
          champion.set("gradeAwakened", data.grades.awakened);  
      }
    value.data = data;
  }
  CoC.guides.data[uid] = value;
}

CoC.guides.complete=function(func){
  if(CoC.guides._completed){
    func();
    return;
  }
  CoC.guides._onComplete = func;
}
