var CoC = CoC || {};
CoC.view = CoC.view || {};
CoC.view.CrystalsView = Backbone.View.extend({
  template: _.template( $('#crystalsTemplate').html() ),
  
  initialize: function(){
    var that = this;
    that._views = [];
    CoC.data.crystals.each(function(crystal){
      var html = $(that.template({
        crystal:crystal
      }));
      
      for(var i=0; i<html.length; i++)
        that._views.push( html[i] );
    });
  },
  
  render: function(){

    this.$el.empty();
    var container = document.createDocumentFragment();
    _(this._views).each(function(el){
      container.appendChild(el);
    });
    this.$el.append(container);
    this.$el.enhanceWithin()
    
    return this;
  }
});