var CoC = CoC || {};
CoC.model = CoC.model || {};
CoC.model.Crystal = Backbone.Model.extend({
	defaults: {
    name: "Crystal",
    uid: "crystal",
    image:"crystal"
  },

  image:function(){
    if(this._image === undefined){
      this._image = 'images/crystals/crystal_'+this.get('image')+'.png'
    }
    return this._image;
  },
  
  hologram:function(){
    if(this._hologram === undefined){
      this._hologram = 'images/crystals/hologram_'+this.get('hologram')+'.png'
    }
    return this._hologram;
  },
  
  champions:function(stars){
    var champions;
    if(this._champions === undefined)
      this._champions = [];
    if(stars === undefined){
      champions = this._champions[0]
      if(champions === undefined){
        champions = [];
        var ccs = CoC.data.crystalChampions.where({ crystalId:this.get("uid") });
        for(var i=0; i<ccs.length; i++)
          if(ccs[i].champion() !== undefined)
            champions.push( ccs[i].champion() );
        champions = _(champions);
        this._champions[0] = champions;
      }
    }
    else{
      champions = this._champions[stars]
      if(champions === undefined){
        champions = [];
        var ccs = CoC.data.crystalChampions.where({ crystalId:this.get("uid"), championStars:stars });
        for(var i=0; i<ccs.length; i++)
          if(ccs[i].champion() !== undefined)
            champions.push( ccs[i].champion() );
        champions = _(champions);
        this._champions[stars] = champions;
      }
    }
    return champions;
  }
});