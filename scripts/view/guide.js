var CoC = CoC || {};
CoC.view = CoC.view || {};

CoC.view.GuideViewHelpers={
  
  gradeSpan:function(grade){
    if(grade === undefined)
      return "";
    var id = "grade-"+grade.toLowerCase().replace("-","").replace("+","").replace(" ","-");
    return "<span class=\""+id+"\">"+grade+"</span>";
  },

  ratingSpan:function(rating){
    if(rating === undefined)
      return "";
    return "<span class=\"rating\">" + "<span class=\"rating-"+rating+"\"> " + rating + " </span>/ 5</span>";
  },
  
  damageTypeSpan:function(damage){
    if(damage === undefined)
      return "";
    var id = "damage-"+damage.toLowerCase().replace(" ","-");
    return "<span class=\""+id+"\">"+damage+"</span>";
  },
  
  abilitySpan:function(ability){
    if(ability === undefined)
      return "";
    var id = "ability-"+ability.toLowerCase().replace(" ","-");
    return "<span class=\""+id+"\">"+ability+"</span>";
  },
  
  rangeSpan:function(range){
    if(range === undefined)
      return "";
    var id = "range-"+range.toLowerCase().replace(" ","-");
    return "<span class=\""+id+"\">"+range+"</span>";
  },
  
  crystalStarsSpan:function(data){
    if(data === undefined)
      return "";
  
    string = ""
    
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
    var id = "availability-"+availability.toLowerCase().replace(" ","-");
    return "<span class=\""+id+"\">"+availability+" Crystal</span>";
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
    if(this._crystals === undefined)
      this._crystals = [];
    var crystals = this._crystals[uid];
    if(crystals === undefined){
      var map = {};
      var ids = [];
      var ccs = CoC.data.crystalChampions.where({ championId:uid });
      for(var i=0; i<ccs.length; i++){
        var crystal = ccs[i].crystal();
        var champion = ccs[i].champion();
        var name = crystal.get("name");
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
      for(var i=0; i<ids.length; i++)
        crystals.push(map[ids[i]]);
      this._crystals[uid] = crystals;
    }
    return crystals;
  },
  
  synergiesFrom:function(uid){
    var synergies = this._synergiesFrom[uid], from;
    if(synergies === undefined){
      synergies = CoC.data.synergies.where({ fromId:uid });
      
      from = {};
      for(var i=0; i<synergies.length; i++)
        from[synergies[i].get("toId")]=synergies[i];
      synergies = [];
      for(var key in from)
        synergies.push(from[key]);
        
      this._synergiesFrom[uid] = synergies;
    }
    return _(synergies);
  },
  _synergiesFrom:{},
  
  synergiesTo:function(uid){
    var synergies = this._synergiesTo[uid], to;
    if(synergies === undefined){
      synergies = CoC.data.synergies.where({ toId:uid });
      
      to = {};
      for(var i=0; i<synergies.length; i++)
        to[synergies[i].get("fromId")]=synergies[i];
      synergies = [];
      for(var key in to)
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
  template: _.template( $('#guideTemplate').html() ),
  render:function(){  
    var data = {};
    _.extend(data, this.model);
    _.extend(data, CoC.view.GuideViewHelpers);
    
    this.$el.html( this.template(data) );
    this.$el.addClass("container")
    return this;
  }
});
//Message View
CoC.view.GuideMissingView = Backbone.View.extend({
  tagName: 'div',
  template: _.template( $('#guideMissingTemplate').html() ),
  render:function(){ 
    var data = {};
    _.extend(data, this.model);
    _.extend(data, CoC.view.GuideViewHelpers);
    
    this.$el.html( this.template( data ) );
    this.$el.addClass("container");
    return this;
  }
});