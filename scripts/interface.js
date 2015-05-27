CoC.ui.hero=function(id,stars,onclick){
  var hero = CoC.logic.heroes.get(id);
  var element = $('<li>', { id:hero.id, stars:stars, class:"hero" });
  element.append($('<span>', { id:hero.id, stars:hero.stars, class:'stars '+hero.class.toLowerCase()}).text((function(){
    var string = "";
    for(var i=0;i<stars;i++)
      string+="★";
    return string;
  })()));
  element.append($('<span>', { class:'name '+hero.class.toLowerCase() }).text(hero.name));
  if(onclick !== undefined)
    element.click(onclick);
  return element;
};

CoC.ui.teams=new function(){

  this.selector="#teams"

  this.update=function(size){
    if(size === undefined)
      size = 3;
  
    var teams = CoC.logic.team.build(CoC.roster.all(),size);
    var element = $(CoC.ui.teams.selector);
    element.text("")
    for(var i in teams){
      var subelement = $('<ul>', {class:'team'})
    
      for(var h in teams[i]){
        subelement.append(CoC.ui.hero(teams[i][h].id, teams[i][h].stars));
      }
      
      if(i !== 'extras'){
        var synergies = CoC.logic.synergy.map(teams[i])
        for(var o in synergies){
        
          var synergy = $('<li>', { class : "synergy" });
          synergy.append($('<span>', { class:'synergy' }).text(CoC.getSynergyTitle(o) + " +" + synergies[o] + "%"));
          
          subelement.append(synergy)
        }
      }
      
      element.append($('<li>').append(subelement));
    }
  }
}

CoC.ui.roster=new function(){

  this.selector="#roster"

  this.update=function(){
    var heroes = CoC.roster.all();
    var element = $(CoC.ui.roster.selector);
    element.text("")
    for(var i in heroes){
      element.append(CoC.ui.hero(heroes[i].id, heroes[i].stars, function(){
        CoC.roster.remove($(this).attr('id'), $(this).attr('stars'));
        CoC.ui.add.update();
        CoC.ui.roster.update();
      }));
    }
  }
}

CoC.ui.add=new function(){

  this.selector="#add"

  this.update=function(){
    var heroes = CoC.logic.heroes.excluding(CoC.roster.all());
    var element = $(CoC.ui.add.selector);
    element.text("")
    for(var i in heroes){
      element.append(CoC.ui.hero(heroes[i].id, 2, function(){
        CoC.roster.add($(this).attr('id'), 2);
        CoC.ui.add.update();
        CoC.ui.roster.update();
      }));
    }
  }
}