var CoC = CoC || {};
CoC.view = CoC.view || {};
CoC.view.ChampionView = Backbone.View.extend({
  tagName: 'div',
  template: _.template( $('#championTemplate').html() ),
  render:function(){
    var model = this.model,
      json = model.toJSON();
    json.portrait = model.portrait();
     
    //set my contents, classes and attributes
    this.$el.html( this.template(json) );
    this.$el.addClass("champion").addClass(model.get("typeId"));
    this.$el.attr("uid", model.get("uid")).attr("stars", model.get("stars"))
      
    return this;
  }
});