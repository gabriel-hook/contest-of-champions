var CoC = CoC || {};
CoC.view = CoC.view || {};
CoC.view.ChampionView = Backbone.View.extend({
  tagName: 'div',
  template: _.template( $('#championTemplate').html() ),
  render:function(){
    var model = this.model;
    var json = model.toJSON();
    json.portrait = model.portrait();
     
    var el = this.$el;
     
    //set my contents
    el.html( this.template(json) );
  
    //set my classes
    el.addClass("champion");
    el.addClass(model.get("typeId"));
      
    //set my data
    el.attr("uid", model.get("uid"))
    el.attr("stars", model.get("stars"))
      
    return this;
  }
});