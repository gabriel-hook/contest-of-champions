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

CoC.roster.csv=function(csv, filename){
  //Export
  if(csv === undefined){
    var array = []
    //add headers
    array.push([
      "Id",
      "Stars",
      "Rank",
      "Level",
      "Awakened"
    ].join(','));
    //add champions
    CoC.data.roster.each(function(champion){
      array.push([
        '"' + champion.get("uid") + '"',
        champion.get("stars"),
        champion.get("rank"),
        champion.get("level"),
        champion.get("awakened")
      ].join(','));
    });
    return array.join('\n').replace(/(^\[)|(\]$)/mg, '');
  }
  //Import
  else{  
    var name = filename || "csv";
    var lines = csv.split("\n");
    for(var i=0;i<lines.length;i++){
      //skip first line if its headings
      if(i === 0 && lines[i].replace(/["]/g,'') === "Id,Stars,Rank,Level,Awakened")
        continue;
    
      var values = lines[i].split(",");
      if(values.length != 5)
        throw "Invalid roster CSV";
        
      var uid = values[0].replace(/["]/g,'').toLowerCase(),
        stars = parseInt(values[1].replace(/["]/g,''), 10),
        rank = parseInt(values[2].replace(/["]/g,''), 10),
        level = parseInt(values[3].replace(/["]/g,''), 10),
        awakened = parseInt(values[4].replace(/["]/g,''), 10);

      //throw a useful error
      if(typeof uid !== "string" || isNaN(stars) || isNaN(rank) || isNaN(level) || isNaN(awakened)){
        console.error("Invalid line in "+filename+":"+(i+1));
        continue;
      }
      
      var champion = CoC.data.roster.findWhere({ uid: uid, stars:stars });
      if(champion === undefined){
        champion = CoC.data.champions.findWhere({ uid: uid, stars:stars }).clone();
        CoC.data.roster.add(champion);
      }
      
      if(champion === undefined){
        console.error("Champion not found \""+ uid + "\" in "+filename+":"+(i+1));
        continue;
      }
        
      champion.set("rank", rank);
      champion.set("level", level);
      champion.set("awakened", awakened);
      champion.save();
    }
  }
}