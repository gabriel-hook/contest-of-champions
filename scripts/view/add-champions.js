var CoC = CoC || {};
CoC.view = CoC.view || {};
CoC.view.AddChampionsView = Backbone.View.extend({
  initialize: function(){
    var that = this;
    that._championViews = {};
    CoC.data.champions.each(function(champion){
      var view = new CoC.view.ChampionView({
        model:champion
      });
      view.render();
      that._championViews[champion.fid()] = view;
    });
  },
  
  events:{
    "click .champion":"clicked"
  },
  
  clicked:function(e){
    e.preventDefault();
    var uid = $(e.currentTarget).attr("uid"),
      stars = parseInt( $(e.currentTarget).attr("stars") ),
      found = CoC.data.roster.findWhere({ uid: uid, stars:stars });
    if(found)
      return;

    var champion = CoC.data.champions.findWhere({ uid: uid, stars:stars }).clone();
    CoC.data.roster.add(champion);
    champion.save();
    
    this.render();
  },
  
  render: function(){
    var that = this;
    
    that.$el.empty();
    var champions = new Backbone.Collection(CoC.data.champions.where({ stars:that._stars }));
    _(CoC.data.roster.where({ stars:that._stars })).each(function(champion){
      var found = champions.findWhere({ uid:champion.get("uid"), stars:champion.get("stars") });
      champions.remove(found);
    });
    var container = document.createDocumentFragment();
    champions.each(function(champion){
      var view = that._championViews[champion.fid()];
      container.appendChild(view.el);
    });
    that.$el.append(container);
    
    return this;
  },
  
  stars: function(stars){
    this._stars = stars;
  },
  
  destroy: function(){
    this.remove();
    this.unbind();
  }
});