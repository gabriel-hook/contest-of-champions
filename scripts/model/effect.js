var CoC = CoC || {};
CoC.model = CoC.model || {};
CoC.model.Effect = Backbone.Model.extend({
	defaults: {
    name: "Effect",
    uid: "effect",
		base: 10,
    amount:0,
    image:"",
    altimage:""
  },

  constructor: function() {
    Backbone.Model.apply(this, arguments);
    var uid = this.get('uid');
    var name = CoC.lang.model('effect-'+uid+'-name');
    var description = CoC.lang.model('effect-'+uid+'-description');
    if(name)
      this.set('name', name);
    if(description)
      this.set('description', description);
  },

  image:function(){
    return this.get("image") + ".jpg";
  },

  imageOff:function(){
    return this.get("image") + "_off.jpg";
  },

  championIds:function(ids){
    if(ids){
      this._championIds = [];
      for(var id in ids)
        this._championIds.push(id);
    }
    return this._championIds;
  }

});
