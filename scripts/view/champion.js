var CoC = CoC || {};
CoC.view = CoC.view || {};
CoC.view.ChampionView = Backbone.View.extend({
  tagName: 'div',
  template: _.template( $('#championTemplate').html() ),
  render:function(){
    var model = this.model,
      json = model.toJSON();
    json.portrait = model.portrait();


    var el = this.$el;
    //set my contents, classes and attributes
    el.html( this.template(json) );
    el.addClass("champion").addClass(model.get("typeId"));
    el.attr("uid", model.get("uid")).attr("stars", model.get("stars"));

    //animate placeholder swap if we take more than 50ms
    setTimeout(function(){
      el.find(".portrait").addClass('fade');
      el.find(".portrait-placeholder").addClass('show').addClass('fade');
    }, 50);

    return this;
  }
});

CoC.view.championPortraitLoaded=function(parentNode){
  var parent = $(parentNode);
  parent.find('.portrait').addClass('loaded');
  parent.find(".portrait-placeholder").addClass('loaded');
}