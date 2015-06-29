//Champions
CoC.model.Champion = Backbone.Model.extend({

	defaults: {
    uid: "champion",
    stars:2,
		name: 'Champion',
		typeId: "mutant",
    awakened: 0,
    rank: 1,
    level: 1,
    pi: 0,
    quest: false
  },
  
  fid:function(){
    return this.get("uid")+"_"+this.get("stars");
  },
  
  portrait:function(){
    return 'images/champions/portrait_'+this.get('uid')+'.png'
  },
  
  image:function(){
    return 'images/champions/fullsize_'+this.get('uid')+'.png'
  },
  
  type:function(){
    return CoC.data.types.findWhere({ uid:this.get("typeId") });
  },
  
  //dirty way to migrate to new data model using uid/stars as given
  update:function(other){
    var other = CoC.data.champions.findWhere({ uid:this.get("uid"), stars:this.get("stars") });
    if(!other)
      return false;
  
    this.set("name", other.get("name"));
    this.set("typeId", other.get("typeId"));
    
    return true;
  }
});

//Synergies
CoC.model.Synergy = Backbone.Model.extend({
	defaults: {
    fromId: "champion",
    fromStars: 1,
		toId: 'champion',
		effectId: "effect",
    effectAmount: 20
  },
  
  effect: function(){
    var effect = CoC.data.effects.findWhere({ uid:this.get("effectId") });
    if(!effect)
      return null;
      
    return effect;
  }
});

//Effects
CoC.model.Effect = Backbone.Model.extend({
	defaults: {
    name: "Effect Name",
    uid: "effect",
		base: 10,
    amount:0,
    image:""
  }
});

//Types
CoC.model.Type = Backbone.Model.extend({
	defaults: {
    name: "Type",
    uid: "type",
  }
});