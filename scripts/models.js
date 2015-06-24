//Champions
CoC.model.Champion = Backbone.Model.extend({

	defaults: {
    uid: "champion",
		name: 'Champion',
		type: "Mutant",
    stars:2,
    awakened: 0,
    rank: 1,
    level: 1,
    pi: 0,
    quest: false
  },
  
  initialize: function(){
  //  this.bind("change", this.save);
  },
  
  portrait:function(){
    return 'images/champions/portrait_'+this.get('uid')+'.png'
  },
  
  image:function(){
    return 'images/champions/fullsize_'+this.get('uid')+'.png'
  }
});

//Synergies
CoC.model.Synergy = Backbone.Model.extend({
	defaults: {
    fromId: "champion",
    fromStars: 1,
		toId: 'champion',
		effectId: "effect",
    effectAmount: 20,
    image:function(){
      return 'images/effects/'+this.get('effectId')+'.jpg'
    }
  }
});

//Effects
CoC.model.Effect = Backbone.Model.extend({
	defaults: {
    name: "Effect Name",
    uid: "effect",
		base: 10,
    amount:0,
    image:function(){
      return 'images/effects/'+this.get('uid')+'.jpg'
    }
  }
});