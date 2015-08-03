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
    
    that._addChampion=function(element){
      var uid = $(element).attr("uid"),
        stars = parseInt($(element).attr("stars"), 10),
        found = CoC.data.roster.findWhere({ uid: uid, stars:stars });
      if(found)
        return;
      var champion = CoC.data.champions.findWhere({ uid: uid, stars:stars }).clone();
      CoC.data.roster.add(champion);
      champion.save();
      CoC.tracking.event("roster", "add", uid + '-' + stars);
    };
  },
  
  events:{
    "click .champion":"championClicked",
    "click .add-all":"addAllClicked"
  },
  
  championClicked:function(e){
    e.preventDefault();
    this._addChampion(e.currentTarget);
    this.render();
  },
  
  addAllClicked:function(e){
    e.preventDefault();
    var that = this, champions = $(e.currentTarget).parent().find(".champion");
    champions.each(function(index, element){
      that._addChampion(element);
    });
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
    
    container.appendChild($('<button>',{ 
      'class':'add-all',
      'data-theme': 'b',
      'disabled':(champions.length > 0)? undefined: ""
    }).text( "Add All" )[0]);
    
    champions.each(function(champion){
      var view = that._championViews[champion.fid()];
      container.appendChild(view.el);
    });
    that.$el.append(container);
    this.$el.trigger("create");
    
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