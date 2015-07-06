var CoC = CoC || {};
CoC.model = CoC.model || {};
CoC.model.Crystal = Backbone.Model.extend({
	defaults: {
    name: "Crystal",
    uid: "crystal",
    image:"crystal",
    hologram:"basic",
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
  }
});