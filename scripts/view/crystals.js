var CoC = CoC || {};
CoC.view = CoC.view || {};


CoC.view.CrystalsViewHelpers={
  
  parseDescription:function(crystal){
    //convert $CURRENCY$ strings to images
    return crystal.get("description").replace(
      /([0-9]+)\s*[$]([a-zA-Z]+)[$]/gi, 
      "<span class=\"amount\"><img class=\"currency\" src=\"images/currency/$2.png\" />$1</span>"
    );
  }
  
}

CoC.view.CrystalsView = Backbone.View.extend({
  template: _.template( $('#crystalsTemplate').html() ),
  
  initialize: function(){
    var that = this;
    that._views = [];
    CoC.data.crystals.each(function(crystal){
    
      var data = {};
      _.extend(data, { crystal:crystal });
      _.extend(data, CoC.view.CrystalsViewHelpers);
    
      var html = $(that.template(data));
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
    this.$el.trigger("create");
    return this;
  }
});