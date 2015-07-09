var CoC = CoC || {};
CoC.view = CoC.view || {};
CoC.view.RosterView = Backbone.View.extend({
 
  initialize: function(){
    var that = this;
    
    that._championViews = {};
    
    CoC.data.roster.bind("remove", function(champion){
      that.render();
    });
  },
  
  events:{
    "click .champion":"clicked"
  },
  
  clicked:function(e){
    e.preventDefault();
    var uid = $(e.currentTarget).attr("uid");
    var stars = parseInt( $(e.currentTarget).attr("stars") );
    var champion = CoC.data.roster.findWhere({ uid: uid, stars:stars });
    if(champion)
      CoC.ui.roster.popup(e.currentTarget, champion);
  },
  
  championView:function(champion){
    var that = this, fid = champion.fid(), view = this._championViews[fid];
    if(view === undefined){
      view = new CoC.view.ChampionView({
        model:champion
      })
      view.render();
      champion.bind("change", function(){
        view.render();
      });
      champion.bind("destroy", function(){
        delete that._championViews[fid]
      });
      this._championViews[fid] = view;
    }
    
    return view;
  },
  
  render: function(){
    var that = this, els = [], rosterCount = 0;
    
    //add champion views, updating if they've changed
    CoC.data.roster.sortBy( CoC.settings.getValue("roster-sort"), CoC.settings.getValue("roster-sort-direction") === "descending" );
    
    var filterStars = {
      1: CoC.settings.getValue("roster-filter-stars-1"),
      2: CoC.settings.getValue("roster-filter-stars-2"),
      3: CoC.settings.getValue("roster-filter-stars-3"),
      4: CoC.settings.getValue("roster-filter-stars-4"),
      5: CoC.settings.getValue("roster-filter-stars-5")
    };
    
    CoC.data.roster.each(function(champion){
      if(filterStars[champion.get("stars")] !== true)
        return;
      
      var view = that.championView(champion);
      if(view){      
        els.push(view.el);
        rosterCount++;
      }
    });  
    
    //add the message view
    els.unshift(new CoC.view.MessageView({
      model:{ message: rosterCount+" of "+CoC.data.roster.length+" Champions" }
    }).render().el);
    
    this.$el.empty();
    var container = document.createDocumentFragment();
    _(els).each(function(el){
      container.appendChild(el);
    });
    this.$el.append(container);
    
    return this;
  }
});