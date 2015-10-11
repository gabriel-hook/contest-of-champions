var CoC = CoC || {};
CoC.model = CoC.model || {};
CoC.model.Crystal = Backbone.Model.extend({
	defaults: {
    name: "Crystal",
    uid: "crystal",
    image:"crystal"
  },

  constructor: function() {
    Backbone.Model.apply(this, arguments);
    var uid = this.get('uid');
    var name = CoC.lang.model('crystal-'+uid+'-name');
    var description = CoC.lang.model('crystal-'+uid+'-description');
    if(name)
      this.set('name', name);
    if(description)
      this.set('description', description);
  },

  image:function(){
    if(this._image === undefined){
      this._image = 'images/crystals/crystal_'+this.get('image')+'.png';
    }
    return this._image;
  },
  
  hologram:function(){
    if(this._hologram === undefined){
      this._hologram = 'images/crystals/hologram_'+this.get('hologram')+'.png';
    }
    return this._hologram;
  },
  
  champions:function(stars){
    var champions, ccs, i;
    if(this._champions === undefined)
      this._champions = [];
    if(stars === undefined){
      champions = this._champions[0];
      if(champions === undefined){
        champions = [];
        ccs = CoC.data.crystalChampions.where({ crystalId:this.get("uid") });
        for(i=0; i<ccs.length; i++)
          if(ccs[i].champion() !== undefined)
            champions.push( ccs[i].champion() );
        champions = _(champions);
        this._champions[0] = champions;
      }
    }
    else{
      champions = this._champions[stars];
      if(champions === undefined){
        champions = [];
        ccs = CoC.data.crystalChampions.where({ crystalId:this.get("uid"), championStars:stars });
        for(i=0; i<ccs.length; i++)
          if(ccs[i].champion() !== undefined)
            champions.push( ccs[i].champion() );
        champions = _(champions);
        this._champions[stars] = champions;
      }
    }
    return champions;
  }
});
