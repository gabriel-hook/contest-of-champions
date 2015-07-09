var CoC = CoC || {};
CoC.roster = {};

CoC.roster.initialize = function(){

  var typeIds = {};
  CoC.data.types.each(function(type, i){
    typeIds[ type.get("uid") ] = i;
  });

  var Roster = Backbone.Collection.extend({
    model: CoC.model.Champion,
    localStorage: new Backbone.LocalStorage("coc-roster"),
    sortBy: function(key, direction){
      this._order = (key === "name")? [
        { field: "name", order: (direction? "asc": "desc") }, { field: "stars", order: "desc" }
      ]: (key === "type")? [ 
        { field: "typeId", order: (direction? "asc": "desc"), map:typeIds }, { field: "stars", order: "desc" }, { field: "name", order: "asc" }
      ]: (key === "stars")? [ 
        { field: "stars", order: (direction? "desc": "asc") }, { field: "typeId", order: "asc", map:typeIds }, { field: "name", order: "asc" }
      ]: undefined;
      this.sort();
    },
    comparator: function(one, another) {
      if (this._order) {
        for (var i = 0; i < this._order.length; i++) {
          var greater;
        
          if(this._order[i].map){
            greater = this._order[i].map[ one.get(this._order[i].field) ] > this._order[i].map[ another.get(this._order[i].field) ];
          }
          else{
            greater = one.get(this._order[i].field) > another.get(this._order[i].field)
          }
          
          if (greater) {
            return ("desc" !== this._order[i].order) ? 1 : -1;
          } else if (one.get(this._order[i].field) === another.get(this._order[i].field)) {
            // do nothing but let the loop move further for next layer comparison
          } else {
            return ("desc" !== this._order[i].order) ? -1 : 1;
          }
        }
      }
      return 0;
    }
  });
  CoC.data.roster = new Roster();
  CoC.data.roster.sortBy("stars");
  CoC.data.roster.fetch();
  CoC.data.roster.each(function(champion){
    var updated = champion.update();
    if(updated)
      champion.save();
    else
      champion.destroy();
  });
}

CoC.roster.clear = function(){
  while(CoC.data.roster.length > 0)
    CoC.data.roster.first().destroy();
}

CoC.roster.filtered = function(){
  var filterStars = {
    1: CoC.settings.getValue("build-filter-stars-1"),
    2: CoC.settings.getValue("build-filter-stars-2"),
    3: CoC.settings.getValue("build-filter-stars-3"),
    4: CoC.settings.getValue("build-filter-stars-4"),
    5: CoC.settings.getValue("build-filter-stars-5")
  };
  return CoC.data.roster.filter(function(champion){
    return filterStars[champion.get("stars")];
  });
}

CoC.roster.csv=function(string){
  if(string === undefined){
    var array = []
    CoC.data.roster.each(function(champion){
      array.push([
        JSON.stringify(champion.get("uid")),
        champion.get("stars"),
        champion.get("rank"),
        champion.get("level"),
        champion.get("awakened")
      ].join(','));
    });
    var csv = array.join('\n').replace(/(^\[)|(\]$)/mg, '');
    return csv;
  }
  else{
    var lines = string.split("\n");
    for(var i=0;i<lines.length;i++){
      var values = lines[i].split(",");
      if(values.length != 5)
        throw "Invalid roster CSV";
        
      var uid = JSON.parse(values[0]);
      var stars = JSON.parse(values[1]);
      var rank = JSON.parse(values[2]);
      var level = JSON.parse(values[3]);
      var awakened = JSON.parse(values[4]);
        
      var champion = CoC.data.roster.findWhere({ uid: uid, stars:stars });
      if(champion === undefined){
        champion = CoC.data.champions.findWhere({ uid: uid, stars:stars }).clone();
        CoC.data.roster.add(champion);
      }
      if(champion === undefined){
        console.error("Champion not found \""+ uid + "\"");
        continue;
      }
        
      champion.set("rank", rank);
      champion.set("level", level);
      champion.set("awakened", awakened);
      champion.save();
    }
  }
}