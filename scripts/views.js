//Add Champion View
CoC.view.AddChampionsView = Backbone.View.extend({
  initialize: function(){
    var that = this;
    this._championViews=function(){
      var views = [];
      var champions = new Backbone.Collection(CoC.data.champions.where({ stars:that._stars }));
      _(CoC.data.roster.where({ stars:that._stars })).each(function(champion){
        var found = champions.findWhere({ uid:champion.get("uid"), stars:champion.get("stars") });
        champions.remove(found);
      });
      champions.each(function(champion){
        views.push(new CoC.view.ChampionView({
          model:champion
        }));
      });
      return _(views);
    }
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
    $(this.el).empty();
    this._championViews().each(function(view){
      $(that.el).append(view.el);
    });
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
  
    var filterStars = {
      1: CoC.settings.getValue("roster-filter-stars-1"),
      2: CoC.settings.getValue("roster-filter-stars-2"),
      3: CoC.settings.getValue("roster-filter-stars-3"),
      4: CoC.settings.getValue("roster-filter-stars-4")
    };
    var filterTypes = {
      Cosmic: CoC.settings.getValue("roster-filter-cosmic"),
      Tech: CoC.settings.getValue("roster-filter-tech"),
      Mutant: CoC.settings.getValue("roster-filter-mutant"),
      Skill: CoC.settings.getValue("roster-filter-skill"),
      Science: CoC.settings.getValue("roster-filter-science"),
      Mystic: CoC.settings.getValue("roster-filter-mystic")
    }
    var champions = CoC.data.roster.filter(function(champion){
      if(filterStars[champion.get("stars")] === false)
        return false;
      return filterTypes[champion.get("type")];
    });
    
    var sortBy = CoC.settings.getValue("roster-sort");
    var classSortIndex = {};
    for(var i=0; i<CoC.data.championTypes.length; i++)
      classSortIndex[CoC.data.championTypes[i]] = i;
    //stars > class > name
    if(sortBy === "stars")
      champions.sort(function(a,b){
        var value = b.get("stars") - a.get("stars");
        if(value !== 0)
          return value;
          
        value = classSortIndex[a.get("type")] - classSortIndex[b.get("type")];
        if(value !== 0)
          return value;
         
        return a.get("name").localeCompare(b.get("name"));
      })
    //class > stars > name
    if(sortBy === "class")
      champions.sort(function(a,b){
        var value = classSortIndex[a.get("type")] - classSortIndex[b.get("type")];
        if(value !== 0)
          return value;
         
        value = b.get("stars") - a.get("stars");
        if(value !== 0)
          return value;
          
        return a.get("name").localeCompare(b.get("name"));        
      })
    //name > stars
    if(sortBy === "name")
      champions.sort(function(a,b){
        var value = a.get("name").localeCompare(b.get("name"));
        if(value !== 0)
          return value;
        return b.get("stars") - a.get("stars");       
      })
    champions = new Backbone.Collection(champions)
      
    var views = [];
    //now add the actual views
    views.push(new CoC.view.MessageView({
      model:{ message: champions.length+" of "+CoC.data.roster.length+" Champions." }
    }));
    champions.each(function(champion){
      views.push(new CoC.view.ChampionView({
        model:champion
      }));
    });  
  
    var that = this;
    $(this.el).empty();
    _(views).each(function(view){
      $(that.el).append(view.render().el);
    });
    return this;
  }
});

//Team View
CoC.view.TeamView = Backbone.View.extend({
  template: _.template( $('#teamsTemplate').html() ),

  size:function(size){
    this._size = size;
  },
  
  teams:function(teams){
    
    if(teams === undefined || teams.length === 0){
      this._teams = undefined;
      this._message = "Found 0 teams.";
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
    
    this._message = "Found "+this._teams.length+" "+(this._teams.length === 1?"team":"teams");
    if(synergyCount > 0)
      this._message += " with "+synergyCount+" synergies.";
    else
      this._message += ".";
    
  },
  
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
        view.render();
        return view.el.outerHTML;
      }
    }));
    return this;
  }
});

//Message View
CoC.view.MessageView = Backbone.View.extend({
  tagName: 'div',
  template: _.template( '<div class="message"><%= message %></div>'),
  initialize: function (){
    this.render();
  },
  render:function(){  
    this.$el.html( this.template( this.model ) );
    return this;
  }
})

//Champion View
CoC.view.ChampionView = Backbone.View.extend({
  tagName: 'div',
  template: _.template( $('#championTemplate').html() ),
  initialize: function (){
    this.render();
  },
  render:function(){
    var model = this.model;
    var json = model.toJSON();
    json.portrait = model.portrait();
     
    var el = this.$el;
     
    //set my contents
    el.html( this.template(json) );
  
    //set my classes
    el.addClass("hero");
    el.addClass(model.get("type").toLowerCase());
    if(model.get("quest") === true)
      el.addClass("quest");
    if(model.get("awakened") > 0)
      el.addClass("awakened");
      
    el.attr("uid", model.get("uid"))
    el.attr("stars", model.get("stars"))
      
    return this;
  }
});