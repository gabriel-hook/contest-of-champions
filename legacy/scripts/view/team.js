var CoC = CoC || {};
CoC.view = CoC.view || {};
CoC.view.TeamView = Backbone.View.extend({
  template: CoC.data.template.teams,

  events:{
    "click .champion":"championClicked",
    "tap .synergy":"synergyTapped",
    "click .synergy":"synergyClicked",
    "mouseover .synergy":"synergyHoverBegin",
    "mouseout .synergy":"synergyHoverEnd"
  },
  
  championClicked:function(event){
    event.preventDefault();
    var uid = $(event.currentTarget).attr("uid");
    CoC.ui.guides.open( uid );
  },

  synergyTapped:function(event){
    var selected = $(event.currentTarget).hasClass('selected');

    this.synergyHoverEnd(event);
    if(!selected)
      this.synergyHoverBegin(event);

    event.preventDefault();
    return false;
  },
  
  synergyClicked:function(event){
    var synergy = $(event.currentTarget),
      root = synergy.closest(".team");

    if(root.hasClass('locked')){
      root.removeClass('locked');
      if(!synergy.hasClass('selected')){
        this.synergyHoverEnd.call(this, event);
        this.synergyHoverBegin.call(this, event);
        root.addClass('locked');
      }
    }
    else
      root.addClass('locked');

    event.preventDefault();
    return false;
  },

  synergyHoverBegin:function(event){
    var synergy = $(event.currentTarget),
      root = synergy.closest(".team"),
      champions = root.find(".champion"),
      ids = synergy.attr("championIds").split(" ");

    if(root.hasClass('locked'))
      return;

    root.addClass("selected");
    synergy.addClass("selected");
    champions.each(function(i, obj){
      var champion = $(obj);
      if(ids.indexOf(champion.attr("uid")) !== -1)
        champion.addClass("selected");
    });
  },

  synergyHoverEnd:function(event){
    var root = $(event.currentTarget).closest(".team");

    if(root.hasClass('locked'))
      return;

    root.removeClass("selected");
    root.find(".champion").removeClass("selected");
    root.find(".synergy").removeClass("selected");
  },
  
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
  
    var champions, championIds = {};
    var effectMap, effects, effect, effectId;
    var synergy, synergies, synergyCount = 0;

    function synergiesFromChampion(champion, championIds){
      var filtered = [];
      var synergies = CoC.data.synergies.where({ 
        fromId: champion.get("uid"), 
        fromStars: champion.get("stars") 
      });
      for(var i=0; i<synergies.length; i++)
        if(championIds[synergies[i].get('toId')])
          filtered.push(synergies[i]);
      return filtered;
    }
  
    this._teams = [];
    for(var c, s, i=0; i<teams.length; i++){
      champions = teams[i];
      championIds = {};
      synergies = [];
      for(c=0; c<champions.length; c++)
        championIds[champions[c].get('uid')] = true;
      //Get all valid synergies
      for(c=0; c<champions.length; c++)
        synergies = synergies.concat(synergiesFromChampion(champions[c], championIds));
      synergyCount += synergies.length;
      //Reduce to Effects
      effectMap = {};
      for(s=0; s<synergies.length; s++){
        synergy = synergies[s];
        effectId = synergy.get('effectId');
        if(effectMap[effectId] === undefined){
          effectMap[effectId] = {
            amount: 0,
            champions: {},
            effect: synergy.effect()
          };
        }
        effectMap[effectId].champions[synergy.get('fromId')] = true;
        effectMap[effectId].champions[synergy.get('toId')] = true;
        effectMap[effectId].amount += synergy.get('effectAmount');
      }
      effects = [];
      for(effectId in effectMap){
        effect = effectMap[effectId].effect.clone();
        effect.set('amount', effectMap[effectId].amount);
        effect.championIds(effectMap[effectId].champions);
        effects.push(effect);
      }
      this._teams.push({ champions:champions, effects:effects });
    }
    
    this._message = CoC.lang.string('found')+" "+this._teams.length+" "+CoC.lang.string('teams');
    if(synergyCount > 0)
      this._message += " "+CoC.lang.string('with')+" "+synergyCount+" "+CoC.lang.string('synergies');
    else
      this._message += ".";
  },
  
  //add extras
  extras:function(extras){
    this._extras = (extras === undefined || extras.length === 0)? undefined: extras;
  },
  
  render: function(){
    this.$el.html(this.template({
      string:CoC.lang.string,
      message:this._message,
      size:this._size,
      teams:this._teams,
      extras:this._extras,
      renderMessage:function(message){
        var view = new CoC.view.MessageView({ model:{ message:message } });
        return view.render().el.outerHTML;
      },
      renderChampion:function(champion){
        var view = new CoC.view.ChampionView({ model:champion });
        return view.render().el.outerHTML;
      }
    }));
    return this;
  }
});
