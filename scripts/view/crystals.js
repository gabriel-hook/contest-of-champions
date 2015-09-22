var CoC = CoC || {};
CoC.view = CoC.view || {};


CoC.view.CrystalsViewHelpers={
  
  parseDescription:function(crystal){
    //convert $CURRENCY$ strings to images
    return crystal.get("description").replace(
      /([0-9]+)\s*[$]([A-Z]+)[$]/gi, function(match, amount, currency){
        return "<span class=\"amount\"><img class=\"currency\" src=\"images/currency/"+currency.toLowerCase()+".png\" />"+amount+"</span>"
      }
    );
  }
  
}

CoC.view.CrystalsView = Backbone.View.extend({
  template: CoC.data.template.crystals,
  
  initialize: function(){
    var that = this;
    that._views = [];
    CoC.data.crystals.each(function(crystal){
      var html, data = {};
      _.extend(data, { crystal:crystal });
      _.extend(data, CoC.view.CrystalsViewHelpers);
    
      html = $(that.template(data));
      for(var i=0; i<html.length; i++)
        that._views.push( html[i] );
    });
  },
  
  render: function(){
    var container = document.createDocumentFragment();

    this.$el.empty();
    _(this._views).each(function(el){
      container.appendChild(el);
    });
    this.$el.append(container);
    this.$el.trigger("create");
    return this;
  }
});