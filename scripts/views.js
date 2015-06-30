//Add Champion View
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
    "click .hero":"clicked"
  },
  
  clicked:function(e){
    e.preventDefault();
    var uid = $(e.currentTarget).attr("uid");
    var stars = parseInt( $(e.currentTarget).attr("stars") );
    
    var found = CoC.data.roster.findWhere({ uid: uid, stars:stars });
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

//Roster View
CoC.view.RosterView = Backbone.View.extend({
 
  initialize: function(){
    this._championViews = {}
  },
  
  events:{
    "click .hero":"clicked"
  },
  
  clicked:function(e){
    e.preventDefault();
    var uid = $(e.currentTarget).attr("uid");
    var stars = parseInt( $(e.currentTarget).attr("stars") );
    var champion = CoC.data.roster.findWhere({ uid: uid, stars:stars });
    if(champion)
      CoC.ui.roster.popup(e.currentTarget, champion);
  },
  
  render: function(){
    var that = this, els = [], rosterCount = 0;
    
    //add champion views, updating if they've changed
    CoC.data.roster.sortBy( CoC.settings.getValue("roster-sort"), CoC.settings.getValue("roster-sort-direction") === "descending" );
    
    var filterStars = {
      1: CoC.settings.getValue("roster-filter-stars-1"),
      2: CoC.settings.getValue("roster-filter-stars-2"),
      3: CoC.settings.getValue("roster-filter-stars-3"),
      4: CoC.settings.getValue("roster-filter-stars-4")
    };
    
    CoC.data.roster.each(function(champion){
      if(filterStars[champion.get("stars")] !== true)
        return;
    
      var fid = champion.fid(), view = that._championViews[fid];
      if(view === undefined){
        view = new CoC.view.ChampionView({
          model:champion
        })
        view.render();
        champion.bind("change", function(){
          view.render();
        });
        champion.bind("destroy", function(){
          console.log("boom")
          delete that._championViews[fid]
        });
        that._championViews[fid] = view;
      }
      
      els.push(view.el);
      rosterCount++;
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

//Team View
CoC.view.TeamView = Backbone.View.extend({
  template: _.template( $('#teamsTemplate').html() ),

  //set team size
  size:function(size){
    this._size = size;
  },
  
  //build champion/effect team pairs
  teams:function(teams){
    
    if(teams === undefined || teams.length === 0){
      this._teams = undefined;
      this._message = "Found 0 Teams";
      return;
    }
  
    var synergyCount = 0;
  
    this._teams = [];
    for(var i=0; i<teams.length; i++){
      var champions = teams[i], synergies = {}, effects = [];
      for(var a=0; a<champions.length; a++)
        for(var b=0; b<champions.length; b++)
          if(a !== b){
            var synergy = CoC.data.synergies.findWhere({ fromId:champions[a].get("uid"), fromStars:champions[a].get("stars"), toId:champions[b].get("uid") })
            if(synergy !== undefined){
              synergyCount++;
              var effect = synergies[synergy.get("effectId")];
              if(effect === undefined){
                synergies[synergy.get("effectId")]={
                  uid:synergy.get("effectId"),
                  amount:synergy.get("effectAmount")
                }
              }
              else
                effect.amount += synergy.get("effectAmount");
            }
          }
      effects = [];
      for(var s in synergies){
        var effect = CoC.data.effects.findWhere({ uid:synergies[s].uid }).clone();
        effect.set("amount", synergies[s].amount);
        effects.push(effect);
      } 
      this._teams.push({ champions:champions, effects:effects });
    }
    
    this._message = "Found "+this._teams.length+" "+(this._teams.length === 1?"Team":"Teams");
    if(synergyCount > 0)
      this._message += " with "+synergyCount+" Synergies";
    else
      this._message += ".";
    
  },
  
  //add extras
  extras:function(extras){
    this._extras = (extras === undefined || extras.length === 0)? undefined: extras;
  },
  
  render: function(){
    this.$el.html(this.template({
      message:this._message,
      size:this._size,
      teams:this._teams,
      extras:this._extras,
      renderChampion:function(champion){
        var view = new CoC.view.ChampionView({ model:champion });
        return view.render().el.outerHTML;
      }
    }));
    return this;
  }
});

//Message View
CoC.view.MessageView = Backbone.View.extend({
  tagName: 'div',
  template: _.template('<div class="message"><%= message %></div>'),
  render:function(){  
    this.$el.html( this.template( this.model ) );
    return this;
  }
})

//Champion View
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
    el.addClass("hero");
    el.addClass(model.get("typeId"));
    if(model.get("quest") === true)
      el.addClass("quest");
    if(model.get("awakened") > 0)
      el.addClass("awakened");
      
    //set my data
    el.attr("uid", model.get("uid"))
    el.attr("stars", model.get("stars"))
      
    return this;
  }
});