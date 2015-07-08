var CoC = CoC || {};
CoC.view = CoC.view || {};
CoC.view.TeamView = Backbone.View.extend({
  template: _.template( $('#teamsTemplate').html() ),

  events:{
    "click .champion":"clicked"
  },
  
  clicked:function(e){
    e.preventDefault();
    var uid = $(e.currentTarget).attr("uid");
    CoC.ui.guides.open( uid );
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