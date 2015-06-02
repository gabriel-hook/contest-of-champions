
CoC.ui.hero=function(raw, onclick){
  var hero = CoC.logic.heroes.get(raw.id);
  var element = $('<div>', { 
    id:hero.id, 
    stars:raw.stars, 
    class:"hero"
  });
  element.addClass(hero.class.toLowerCase());
  if(raw.awakened)
    element.addClass('awakened');
  var container = $('<div>',{
    class:'container'
  });
  var portrait = $('<div>',{
    class:'portrait'
  }).css({
    'background-image':'url(images/portraits/portrait_'+hero.id+'.png)'
  });
  portrait.append($('<div>',{class:'title'}).append($('<span>', { class:'name' }).text(hero.name)));
  portrait.append($('<span>', { id:hero.id, stars:raw.stars, class:'stars'}).text((function(){
    var string = "";
    for(var i=0;i<raw.stars;i++)
      string+="★";
    return string;
  })()));
  if(onclick !== undefined)
    portrait.click(onclick);
  return element.append(container.append(portrait));
};
CoC.ui.hero_listener=function(container){
  function setSize(){
    var element = container.find("div.hero");
    element.css({ height:element.width() });
  }
  container.on('resize', function(){
    setSize();
  });
  setSize();
}

CoC.ui.teams=new function(){

  this.selector="#teams"

  this.clear=function(){
    $(CoC.ui.teams.selector).text("");
  }
 
  this.update=function(teams, size){
    var element = $(CoC.ui.teams.selector);
    element.text("")
    for(var i in teams){
      
      if(teams[i] === null || teams[i].length ===0)
        continue;
    
      if(i === 'extras')
        element.append($('<h3>', { style:'clear:both'}).text("Extras"));

      var subelement = $('<div>')
      if(i === 'extras')
        subelement.addClass('extras');
      else{
        subelement.addClass('team');
        subelement.addClass((size==3)? 'three': (size==4)? 'four': (size==5)? 'five': 'unknown');
      }
    
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
    }
  }
}

CoC.ui.roster=new function(){

  this.selector="#roster"

  this.update=function(){
    var heroes = CoC.roster.all();
    var element = $("<div>");
    $(CoC.ui.roster.selector).text("").append(element);
    for(var i in heroes)
      (function(hero,i){
        element.append(CoC.ui.hero(hero, function(event){
        
          var h = CoC.logic.heroes.get(hero.id);
          $("#roster-configure-name").prop("class", h.class).text(h.name);
          $("#roster-configure-class").prop("class", h.class.toLowerCase()).text(h.class);
          
          console.log( $("#roster-configure-name") )
        
          function setupRankLevel(){
            $("#roster-configure-rank").unbind( "change" ).empty();
            for(var i = 1; i<=CoC.data.levels[hero.stars].length; i++)
              $("#roster-configure-rank").append($("<option>").val(i).text(i));
            $("#roster-configure-rank")
              .val(hero.rank).selectmenu('refresh')
              .change(function(e){
              
              hero.rank = e.target.value;
              CoC.roster.save();
              CoC.ui.roster.dirty();
              setupRankLevel();
            });
           
            $("#roster-configure-level").unbind( "change" ).empty();
            for(var i = 1; i<=CoC.data.levels[hero.stars][hero.rank-1]; i++)
              $("#roster-configure-level").append($("<option>").val(i).text(i));
            $("#roster-configure-level")
              .val(hero.level).selectmenu('refresh')
              .change(function(e){
              
              hero.level = e.target.value;
              CoC.roster.save();
              CoC.ui.roster.dirty();
              setupRankLevel();
            });
            
          }
          setupRankLevel();
          
          $("#roster-configure-awakened").unbind( "change" )
            .prop("checked",hero.awakened != 0).checkboxradio("refresh")
            .change(function(e){
            
            if(e.target.checked)
              hero.awakened = 1;
            else
              hero.awakened = 0;
            CoC.roster.save();
            CoC.ui.roster.dirty();
            var el = $(element.find(".hero")[i])
            if(hero.awakened)
              el.addClass("awakened");
            else
              el.removeClass("awakened");
          });
          
          $("#roster-configure-delete").unbind( "click" )
            .click(function(){
            
            CoC.ui.teams.clear();
            CoC.roster.remove(hero.id, hero.stars);
            CoC.ui.roster.dirty();
            $(element.find(".hero")[i]).addClass("hidden");
            $('#popup-roster-configure').popup("close");
          });
          
          element.find(".portrait").removeClass("selected");
          $(event.target).addClass("selected");
          
          $('#popup-roster-configure').popup("open",{
            positionTo:$(this)
          });
        }));
      })(heroes[i],i);
    element.append($('<div>').css({ 'clear':'both'}));
  }
  
  this.dirty=function(){
  
    var exporter = $('#roster-export');
    var csvRoster = CoC.roster.csv();
    exporter.attr('download', 'roster.csv').attr('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvRoster));
    exporter.click(function(){
      console.log("exporting to csv...");
      $('#popup-roster-modify').popup("close");
    });

  }
}

CoC.ui.add=new function(){

  this.stars;

  this.selector="#add-heroes"

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
    var element = $('<div>');
    $(CoC.ui.add.selector).text("").append(element);
    for(var i in heroes)
      (function(hero,i){
        element.append(CoC.ui.hero({ id:hero.id, stars:stars }, function(){
          CoC.ui.teams.clear();
          CoC.roster.add({ 
            id:hero.id, 
            stars:stars,
            rank:1,
            level:1,
            awakened:0
          });
          $(element.find(".hero")[i]).addClass("hidden");
        }));
      })(heroes[i],i);
    element.append($('<div>').css({ 'clear':'both'}));
  }
}

$("#page-roster").on("pagebeforeshow",function(){
  console.log("refreshing roster...")

  $('#roster-import a').click(function(){
    console.log("importing");
    
    $('#roster-import input').change(function(e){
      if (this.files && this.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
          var result = e.target.result;
          CoC.roster.csv(result);
          CoC.ui.roster.update();
          CoC.ui.roster.dirty();
        }
        reader.readAsText(this.files[0]);
      }
    }).click();
    $('#popup-roster-modify').popup("close");
  });
  
  $('#roster-clear-all').click(function(){
    CoC.roster.clear();
    CoC.ui.roster.update();
    CoC.ui.roster.dirty();
    $('#popup-roster-modify').popup("close");
  });
  
  CoC.ui.roster.update();
  CoC.ui.roster.dirty();
});


$("#page-add").on("pagebeforeshow",function(){
  console.log("refreshing add...")
  CoC.ui.add.update();
});

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
    
  $('#team-settings-quest').change(function(){
    CoC.settings.setValue("quest-group",this.value=="yes");
  }).val(CoC.settings.getValue("quest-group")? "yes": "no").slider('refresh');
    
  $('#team-settings-extras').change(function(){
    CoC.settings.setValue("include-extras",this.value=="yes") 
  }).val(CoC.settings.getValue("include-extras")? "yes": "no").slider('refresh');
  
  $("#button-team-settings-apply").click(function(){
    $("#panel-team-settings").panel( "close" );
    
    var size = CoC.settings.getValue("size");
    if(size === undefined)
      size = 3;
    var roster = CoC.roster.all({
      2:CoC.settings.getValue("include-2")===true,
      3:CoC.settings.getValue("include-3")===true,
      4:CoC.settings.getValue("include-4")===true
    });
    var single = CoC.settings.getValue("quest-group")===true;
    var extras = CoC.settings.getValue("include-extras")===true;
    
    $.mobile.loading('show',{
      text: 'calculating...',
      textVisible: true,
      theme: 'a',
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
        worker.postMessage({ roster:roster, size:size, weights:CoC.settings.weights, single:single, extras:extras });
        workerWorking = true;
        console.log("building team with worker");
      }
      catch(e){
        console.error(e)
      }
    }

    if(!workerWorking){
      console.log("building team inline");
      setTimeout(function(){
        var teams = CoC.logic.team.build(roster,{ size:size, extras:extras, single:single });
        setTimeout(function(){
          CoC.ui.teams.update(teams, size);
          $.mobile.loading('hide');
        },0);
      },0);
    }
    
  });
  
  setTimeout(function(){
    $("#panel-team-settings").panel('open');
  },500);
});

$("#page-settings-advanced").on( "pagebeforeshow", function() {

  function enableSlider(id, value, callback){
    $(id).val(value * 100).slider("refresh").change(function(){
      callback( parseInt(this.value) / 100.0 );
    })
  }

  enableSlider("#settings-advanced-star4",CoC.settings.getWeight("stars-4"),function(v){
    CoC.settings.setWeight("stars-4", v);
  });
  enableSlider("#settings-advanced-star3",CoC.settings.getWeight("stars-3"),function(v){
    CoC.settings.setWeight("stars-3", v);
  });
  enableSlider("#settings-advanced-star2",CoC.settings.getWeight("stars-2"),function(v){
    CoC.settings.setWeight("stars-2", v);
  });
  enableSlider("#settings-advanced-awakened",CoC.settings.getWeight("awakened"),function(v){
      CoC.settings.setWeight("awakened", v);
  });
  enableSlider("#settings-advanced-class2",CoC.settings.getDuplicateWeight(2),function(v){
    CoC.settings.setDuplicateWeight(2,v);
  });
  enableSlider("#settings-advanced-class3",CoC.settings.getDuplicateWeight(3),function(v){
    CoC.settings.setDuplicateWeight(3,v);
  });
  enableSlider("#settings-advanced-class4",CoC.settings.getDuplicateWeight(4),function(v){
    CoC.settings.setDuplicateWeight(4,v);
  });
  enableSlider("#settings-advanced-class5",CoC.settings.getDuplicateWeight(5),function(v){
    CoC.settings.setDuplicateWeight(5,v);
  });
  enableSlider("#settings-advanced-attack",CoC.settings.getWeight("attack"),function(v){
    CoC.settings.setWeight("attack",v);
  });
  enableSlider("#settings-advanced-critrate",CoC.settings.getWeight("critrate"),function(v){
    CoC.settings.setWeight("critrate",v);
  });
  enableSlider("#settings-advanced-critdmg",CoC.settings.getWeight("critdmg"),function(v){
    CoC.settings.setWeight("critdmg",v);
  });
  enableSlider("#settings-advanced-perfectblock",CoC.settings.getWeight("perfectblock"),function(v){
    CoC.settings.setWeight("perfectblock",v);
  });
  enableSlider("#settings-advanced-block",CoC.settings.getWeight("block"),function(v){
    CoC.settings.setWeight("block",v);
  });
  enableSlider("#settings-advanced-powergain",CoC.settings.getWeight("powergain"),function(v){
    CoC.settings.setWeight("powergain",v);
  });
  enableSlider("#settings-advanced-armor",CoC.settings.getWeight("armor"),function(v){
    CoC.settings.setWeight("armor",v);
  });
  enableSlider("#settings-advanced-health",CoC.settings.getWeight("health"),function(v){
    CoC.settings.setWeight("health",v);
  });
  
});

CoC.roster.load();
CoC.ui.add.setStars(2);
CoC.ui.teams.clear();