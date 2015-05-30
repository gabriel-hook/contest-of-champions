
CoC.ui.hero_listener=function(container,options){
  if(options === undefined)
    options = {};

  function setSize(){
    var element = container.find("div.hero");
    if(element.length === 0)
      return;
    element.css({ width:"", height:"" });
    
    var width = container.width(), size = element.width(), margin, perline;
    margin = parseInt(element.css("margin-left"));
    perline = (options.perline)? options.perline: Math.ceil(width/(size+margin*2));
      
    if(options['min-width']){
      var breakpoint = null;
      for(var i in options['min-width'])
        if(width < i){
          perline = options['min-width'][i];
          break;
        }
    }
    
    var maximum = width/perline - margin*2;
    if(size>maximum)
      size=maximum;
      
    if(size === null)
      console.log(element)
    
    element.css({ width:size, height:size });
  }
  container.on('resize', setSize);
  if(options.onpageshow)
    options.onpageshow.on("pageshow",setSize);
  setSize();
}

CoC.ui.hero=function(raw, onclick){
  var hero = CoC.logic.heroes.get(raw.id);
  var element = $('<div>', { 
    id:hero.id, 
    stars:raw.stars, 
    class:"hero "+hero.class.toLowerCase()
  }).css({
    'background-image':'url(images/portraits/portrait_'+hero.id+'.png)'
  });
  element.append($('<div>',{class:'title'}).append($('<span>', { class:'name' }).text(hero.name)));
  element.append($('<span>', { id:hero.id, stars:raw.stars, class:'stars'+((raw.awakened)?" awakened":"")}).text((function(){
    var string = "";
    for(var i=0;i<raw.stars;i++)
      string+="★";
    return string;
  })()));
  if(onclick !== undefined)
    element.click(onclick);
  return element;
};

CoC.ui.teams=new function(){

  this.selector="#teams"

  this.update=function(teams, size){
    var element = $(CoC.ui.teams.selector);
    element.text("")
    for(var i in teams){
      
      if(teams[i] === null || teams[i].length ===0)
        continue;
    
      if(i === 'extras')
        element.append($('<h3>', { style:'clear:both'}).text("Extras"));

      var subelement = $('<div>', { class:(i === 'extras')?'extras':'team' })
    
      for(var h in teams[i]){
        subelement.append(CoC.ui.hero(teams[i][h]));
      }
      subelement.append($('<br>',{style:'clear:both'}));
      
      if(i !== 'extras'){
        var synergies = CoC.logic.synergy.map(teams[i])
        
        var synergieselement = $('<div>', { class : "synergies" })
        for(var o in synergies){
        
          var synergy = $('<div>', { class : "synergy" });
          synergy.append($('<img>', { src:CoC.getSynergyImage(o,synergies[o]) }));
          synergy.append($('<span>').text(CoC.getSynergyName(o) + " +" + synergies[o] + "%"));
          
          synergieselement.append(synergy)
        }
        subelement.append(synergieselement);
      }
      
      subelement.append($('<div>', { style:'clear:both'}));
      element.append(subelement);
      
      CoC.ui.hero_listener(subelement, (i === 'extras')? { 
        'min-width':{ 150:1, 250:2, 350:3 }
      }:{ 
        perline:size
      });
    }
  }
}

CoC.ui.roster=new function(){

  this.selector="#roster"
  
  this.onRosterAction=function(){};

  this.update=function(){
    var heroes = CoC.roster.all();
    
    var element = $(CoC.ui.roster.selector);
    element.text("")
    for(var i in heroes)
      (function(hero,i){
        element.append(CoC.ui.hero(hero, function(event){
        
          $("#roster-configure-awakened").unbind( "change" );
          $("#roster-configure-delete").unbind( "click" );
          
          $('#roster-configure-awakened').prop("checked",hero.awakened===true).checkboxradio("refresh");
        
          $('#roster-configure-awakened').change(function(e){
            if(e.target.checked)
              hero.awakened=true;
            else
              delete hero.awakened;
             
            CoC.roster.save();
            CoC.ui.roster.update();
            CoC.ui.roster.onRosterAction();
            
            //add class back to me
            $(element.find(".hero")[i]).addClass("selected");
          });
          $('#roster-configure-delete').click(function(){
            CoC.roster.remove(hero.id, hero.stars);
            CoC.ui.add.update();
            CoC.ui.roster.update();
            CoC.ui.roster.onRosterAction();
            $('#popup-roster-configure').popup("close");
          });
          
          
          element.find(".hero").removeClass("selected");
          $(event.target).addClass("selected");
          
          $('#popup-roster-configure').popup("open",{
            positionTo:$(this)
          });
        }));
      })(heroes[i],i);
    element.append($('<div>').css({ 'clear':'both'}));
  }
}

CoC.ui.add=new function(){

  this.stars;

  this.selector="#add-heroes"

  this.onAddAction=function(){};
  
  this.setStars=function(stars){
    this.stars = stars;
    CoC.ui.add.update();
  }
  
  this.update=function(){
    var stars = this.stars;
    
    var heroes = CoC.logic.heroes.excluding(CoC.roster.all({
      2:stars === 2,
      3:stars === 3,
      4:stars === 4
    }));
    
    var element = $(CoC.ui.add.selector);
    element.text("")
    for(var i in heroes){
      element.append(CoC.ui.hero({ id:heroes[i].id, stars:stars }, function(){
        CoC.roster.add($(this).attr('id'), stars);
        CoC.ui.add.update();
        CoC.ui.roster.update();
        CoC.ui.add.onAddAction();
      }));
    }
    element.append($('<div>').css({ 'clear':'both'}));
    CoC.ui.hero_listener(element, { 
      'min-width':{ 150:1, 250:2, 350:3, 500:4 }
    });
  }
}

$("#page-teams").on( "pagebeforeshow", function() {

  //get settings
  console.log("setting stuff up...")
      
  var teamSettingsSize = $('input:radio[name=team-settings-size]');
  teamSettingsSize.filter('[value='+CoC.settings.getValue("size")+']').prop("checked", true).checkboxradio("refresh");
  teamSettingsSize.change(function(){ CoC.settings.setValue("size",this.value) });

  for(var i=2; i<=4;i++)
    (function(stars){
      $('#team-settings-include-'+stars).change(function(){
        CoC.settings.setValue("include-"+stars,this.value=="yes") 
      }).val(CoC.settings.getValue("include-"+stars)? "yes": "no").slider('refresh');
    })(i)
  
  function delayedTeamUpdate(){
    var size = CoC.settings.getValue("size");
    if(size === undefined)
      size = 3;
    var roster = CoC.roster.all({
      2:CoC.settings.getValue("include-2")===true,
      3:CoC.settings.getValue("include-3")===true,
      4:CoC.settings.getValue("include-4")===true
    });
    
    $.mobile.loading('show',{
      text: 'calculating...',
      textVisible: true,
      theme: 'b',
      html: ""
    });
    
    var workerWorking = false;
    if (window.Worker){
  
      try{
        var worker = new Worker('scripts/worker-team.js');
        worker.onmessage = function (event) {
          var teams = event.data;
          CoC.ui.teams.update(teams, size);
          $.mobile.loading('hide');
        };
        worker.postMessage({ roster:roster, size:size, weights:CoC.settings.weights });
        workerWorking = true;
      }
      catch(e){
        console.error(e)
      }
    }

    if(!workerWorking){
      setTimeout(function(){
        var teams = CoC.logic.team.build(roster,size);
        setTimeout(function(){
          CoC.ui.teams.update(teams, size);
          $.mobile.loading('hide');
        },0);
      },0);
    }
  }
  
  $("#button-team-settings-apply").click(function(){
    $("#panel-team-settings").panel( "close" )
    delayedTeamUpdate();
  });
  
  if($("#teams").text() === "")
    setTimeout(function(){
      $("#panel-team-settings").panel( "open" )
    }, 500);
});

CoC.roster.load();
CoC.ui.hero_listener($(CoC.ui.roster.selector),{
  'min-width':{ 150:1, 250:2, 350:3 },
  onpageshow:$("#page-roster")
})

//make buttons live
CoC.ui.add.setStars(2);
CoC.ui.add.update();
CoC.ui.add.onAddAction=function(){
  location.href="#page-roster";
};

CoC.ui.roster.update();
