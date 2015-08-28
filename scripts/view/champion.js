var CoC = CoC || {};
CoC.view = CoC.view || {};

(function(){
  var portraitImages = {};

  CoC.view.ChampionView = Backbone.View.extend({
    tagName: 'div',
    template: _.template( $('#championTemplate').html() ),
    render:function(){
      var model = this.model,
        json = model.toJSON();
      json.portrait = model.portrait();

      var el = this.$el;
      el.html( this.template(json) );

      //set classes and attributes
      el.addClass("champion").addClass(model.get("typeId"));
      el.attr("uid", model.get("uid")).attr("stars", model.get("stars"));

      //init portrait placeholder swap, skip if we have the image already
      var image = el.find(".portrait"), placeholder = el.find(".portrait-placeholder");
      if(portraitImages[image[0].src]){
        image.addClass('loaded');
        placeholder.addClass('loaded');
      }
      else{
        image.addClass('fade');
        placeholder.addClass('fade');
      }
      return this;
    }
  });

  CoC.view.championPortraitLoaded=function(img){
    portraitImages[img.src] = true;
    
    var parent = $(img.parentNode), 
      image = parent.find('.portrait'), 
      placeholder = parent.find(".portrait-placeholder");

    image.addClass('loaded');
    placeholder.addClass('loaded');
  }
})();