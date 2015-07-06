var CoC = CoC || {};
CoC.model = CoC.model || {};
CoC.model.CrystalChampion = Backbone.Model.extend({
	defaults: {
    crystalId: "crystal",
    championId: "champion",
    championStars:1
  },
  
  crystal:function(){
    if(this._crystal === undefined){
      this._crystal = CoC.data.crystals.findWhere({ uid:this.get("crystalId") });
    }
    return this._crystal;
  },

  champion:function(){
    if(this._champion === undefined){
      this._champion = CoC.data.champions.findWhere({ uid:this.get("championId"), stars:this.get("championStars") });
    }
    
    //If we can't load this champion it probably wasn't defined.
    if(this._champion === undefined)
      console.error(this.toJSON())
    
    return this._champion;
  }
});