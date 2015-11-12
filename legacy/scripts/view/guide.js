var CoC = CoC || {};
CoC.view = CoC.view || {};

CoC.view.GuideViewHelpers={

  string: CoC.lang.string,
  model: CoC.lang.model,
  
  gradeSpan:function(grade){
    if(grade === undefined)
      return "";
    var id = grade.toLowerCase().replace("-","").replace("+","").replace(" ","-");
    return "<span class=\"grade-"+id+"\">"+grade+"</span>";
  },

  ratingSpan:function(rating){
    if(rating === undefined)
      return "";
    return "<span class=\"rating\">" + "<span class=\"rating-"+rating+"\"> " + rating + " </span>/ 5</span>";
  },
  
  damageTypeSpan:function(damage){
    if(damage === undefined)
      return "";
    var id = damage.toLowerCase().replace(" ","-");
    return "<span class=\"damage-"+id+"\">"+damage+"</span>";
  },
  
  abilitySpan:function(ability){
    if(ability === undefined)
      return "";
    return "<span class=\"ability-"+ability+"\">"+CoC.lang.model('ability-'+ability+'-name')+"</span>";
  },
  
  rangeSpan:function(range){
    if(range === undefined)
      return "";
    var id = range.toLowerCase().replace(" ","-");
    return "<span class=\"range-"+id+"\">"+range+"</span>";
  },
  
  crystalStarsSpan:function(data){
    if(data === undefined)
      return "";
  
    string = "";
    
    for(var i=0; i<data.champions.length; i++){
      if(i > 0)
        string += (i==data.champions.length-1)? " and ": ", ";
      string += data.champions[i].stars();
    }
  
    return "<span class=\"stars\">"+string+"</span>";
  },
  
  availabilityImage:function(availability){
    for(var crystal in availability){
      return "<img class=\"crystal\" src=\"images/crystals/crystal_"+crystal.toLowerCase().replace(" ","_")+".png\" />";  
    }
    return "";
  },
  
  availabilitySpan:function(availability){
    if(availability === undefined)
      return "";
    var id = availability.toLowerCase().replace(" ","-");
    return "<span class=\"availability-"+id+"\">"+availability+" "+ CoC.lang.string('crystal') +"</span>";
  },
  
  joinSpans:function(list, render){
    if(list === undefined || !list.length)
      return "";
    var spans = [];
    for(var i=0; i<list.length; i++)
      spans.push(render.call(this, list[i]));
    return spans.join(", ");
  },
  
  definition:function(object, render){
    if(object === undefined)
      return "";
    if(typeof object === "string")
      return "<b>"+render.call(this, object)+"</b>";
    for(var key in object)
      return "<b>"+render.call(this, key) + ":</b> " + object[key];
    return "";
  },
  
  crystals:function(uid){
    var i;
    if(this._crystals === undefined)
      this._crystals = [];
    var crystals = this._crystals[uid];
    if(crystals === undefined){
      var map = {},
        ids = [],
        ccs = CoC.data.crystalChampions.where({ championId:uid });
      for(i=0; i<ccs.length; i++){
        var crystal = ccs[i].crystal(),
          champion = ccs[i].champion(),
          name = crystal.get("name");
        if(map[name] === undefined){
          map[name] = {
            crystal:crystal,
            champions:[]
          };
          ids.push(name);
        }
        map[name].champions.push( champion );
      }
      crystals = [];
      for(i=0; i<ids.length; i++)
        crystals.push(map[ids[i]]);
      this._crystals[uid] = crystals;
    }
    return crystals;
  },
  
  synergiesFrom:function(uid){
    var key, old, i;
    var synergies = this._synergiesFrom[uid], from;
    if(synergies === undefined){
      synergies = CoC.data.synergies.where({ fromId:uid });
      
      from = {};
      for(i=0; i<synergies.length; i++){
        key = synergies[i].get("toId");
        old = from[key];
        if(!old || old.from().get("stars") >= synergies[i].from().get("stars"))
          from[key]=synergies[i];
      }
      synergies = [];
      for(key in from)
        synergies.push(from[key]);
        
      this._synergiesFrom[uid] = synergies;
    }
    return _(synergies);
  },
  _synergiesFrom:{},
  
  synergiesTo:function(uid){
    var key, old, i;
    var synergies = this._synergiesTo[uid], to;
    if(synergies === undefined){
      synergies = CoC.data.synergies.where({ toId:uid });
      
      to = {};

      for(i=0; i<synergies.length; i++){
        key = synergies[i].get("fromId");
        old = to[key];
        if(!old || old.to().get("stars") < synergies[i].to().get("stars"))
          to[key]=synergies[i];
      }
        
      synergies = [];
      for(key in to)
        synergies.push(to[key]);
        
      this._synergiesTo[uid] = synergies;
    }
    return _(synergies);
  },
  _synergiesTo:{}
};

//Message View
CoC.view.GuideView = Backbone.View.extend({
  tagName: 'div',
  guideTemplate: CoC.data.template.guide,
  
  initialize:function(){
    var that = this;

    this._guides = {};
    this._guideChampionsView = this.model;
  },
  
  events:{
    "click .synergy .champion-title":"synergyChampionClick",
    "click .synergy .effect":"synergyEffectClick",
  },
  
  synergyChampionClick:function(event){
    if(this._guideChampionsView === undefined)
      return;
    var uid = $(event.currentTarget).attr("uid");
    if(uid === undefined)
      return;
    this._guideChampionsView.select(uid);
  },
  
  synergyEffectClick:function(event){
    if(CoC.ui && CoC.ui.hasSelection())
      return;
      
    var effectElement = $(event.currentTarget),
      uid = effectElement.attr("uid");
    if(uid === undefined)
      return;
  
    var effect = CoC.data.effects.findWhere({ uid:uid });
    if(!effect)
      return;
      
    $("#popup-guide-effect .ui-content").text(effect.get("description"));
    $("#popup-guide-effect").popup("open",{ positionTo:effectElement });
  },
  
  render:function(uid, forceRefresh){
    if(uid === undefined)
      return this;
      
    var html = this._guides[uid];
    if(html === undefined || forceRefresh){
      var guide = CoC.data.guides.get(uid),
        data = {};
      _.extend(data, guide);
      _.extend(data, CoC.view.GuideViewHelpers);
      this._guides[uid] = html = this.guideTemplate(data);
    }
    if(html === undefined)
      return this;

    this.$el.empty();
    this.$el.append( html );
    this.$el.trigger("create");
    this.$el.removeClass("dirty");
    
    return this;
  }
});
