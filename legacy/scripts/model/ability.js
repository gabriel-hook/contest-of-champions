var CoC = CoC || {};
CoC.model = CoC.model || {};
CoC.model.Ability = Backbone.Model.extend({
	defaults: {
    name: "Ability",
    uid: "ability",
  },

  constructor: function() {
    Backbone.Model.apply(this, arguments);
    var uid = this.get('uid');
    var name = CoC.lang.model('ability-'+uid+'-name');
    if(name)
      this.set('name', name);
  },

});
