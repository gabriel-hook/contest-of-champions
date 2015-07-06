var CoC = CoC || {};

CoC.guides = new function(){
  
  this.data = {}

  this.initialize=function(){
    var that = this;
    setTimeout(function(){
    
      var uids = _.uniq( CoC.data.champions.pluck("uid") );
      var working = uids.length;
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
              that._completed = true;
              that._onComplete();
            }
          }
        });
      });
      
    },0);
  };
  
  this.get=function(uid){
    return CoC.guides.data[uid];
  }
  
  this.add=function(uid, data){
    var champion = CoC.data.champions.findWhere({ uid:uid }).clone();
    champion.set("stars", 0);
    var value = {
      uid:uid,
      champion:champion
    };
    if(data)
      value.data = data;
    CoC.guides.data[uid] = value;
  }

  this.complete=function(func){
    if(this._completed){
      func();
      return;
    }
    this._onComplete = func;
  }
  this._onComplete = function(){}
  this._completed = false;
}