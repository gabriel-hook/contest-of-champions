CoC.data.guides={};

CoC.guides = new function(){

  this.initialize=function(){
  
    var uids = _.uniq( CoC.data.champions.pluck("uid") );
    _(uids).each(function(uid){
    
      var guide = undefined;
    
      var response = $.ajax({
        url: "scripts/guides/"+uid+".json",
        dataType: "json",
        async: false
      });
      if(response.status === 200)
        try{
          guide = JSON.parse( response.responseText );
        }
        catch(error){
          console.error(error);
        }
        
      var champion = CoC.data.champions.findWhere({ uid:uid }).clone();
      champion.set("stars", 0);
      
      CoC.data.guides[uid]={
        uid:uid,
        data:guide,
        champion:champion
      };
    });
  
  };

}