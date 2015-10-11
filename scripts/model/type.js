var CoC = CoC || {};
CoC.model = CoC.model || {};
CoC.model.Type = Backbone.Model.extend({
	defaults: {
    name: "Type",
    uid: "type",
  },

  constructor: function() {
    Backbone.Model.apply(this, arguments);
    var uid = this.get('uid');
    var name = CoC.lang.model('type-'+uid+'-name');
    if(name)
      this.set('name', name);
  },

});
