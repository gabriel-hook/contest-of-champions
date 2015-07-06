var CoC = CoC || {};
CoC.model = CoC.model || {};
CoC.model.Synergy = Backbone.Model.extend({
	defaults: {
    fromId: "champion",
    fromStars: 1,
		toId: 'champion',
		effectId: "effect",
    effectAmount: 20
  },
  
  to:function(){
    if(this._to === undefined){
      this._to = CoC.data.champions.findWhere({ uid:this.get("toId") });
    }
    return this._to;
  },
  
  from:function(){
    if(this._from === undefined){
      this._from = CoC.data.champions.findWhere({ uid:this.get("fromId"), stars:this.get("fromStars") });
    }
    return this._from;
  },
  
  effect: function(){
    if(this._effect === undefined){
      this._effect = CoC.data.effects.findWhere({ uid:this.get("effectId") });
    }
    return this._effect;
  }
});