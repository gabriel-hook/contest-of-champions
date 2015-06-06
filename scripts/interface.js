
CoC.ui.hero=function(raw, index, onclick){
  var hero = CoC.data.heroes[raw.id];
  var element = $('<div>', { 
    id:hero.id, 
    stars:raw.stars, 
    class:"hero",
    "tabindex":index
  });
  element.addClass(hero.class.toLowerCase());
  if(raw.awakened)
    element.addClass('awakened');
  if(raw.quest)
    element.addClass('quest');
  var container = $('<div>',{
    class:'container'
  });
  var portrait = $('<div>',{
    class:'portrait'
  }).css({
    'background-image':'url(images/champions/portrait_'+hero.id+'.png)'
  });
  portrait.append($('<div>',{class:'quest'}));
  portrait.append($('<div>',{class:'title'}).append($('<span>', { class:'name' }).text(hero.name)));
  portrait.append($('<div>', { class:'stars'}).html((function(){
    var string = "";
    for(var i=0;i<raw.stars;i++)
      string+="<span class='star'></span>";
    return string;
  })()));
  if(onclick !== undefined){
    element.on("click", onclick);
    element.on("keyup", function(event){
      if(event.keyCode != 13)
        return;
      onclick.call(this, event);
    });
  }
  return element.append(container.append(portrait));
};
CoC.ui.hero.hide=function(container, i){
  var element = $(container.find(".hero")[i]), rect;
  rect = element[0].getBoundingClientRect();
  element.css({
    left:rect.left,
    top:rect.top
  });
  element.addClass("hidden");
}

CoC.ui.teams=new function(){

  this.selector="#teams"

  this.worker = null;
  this.empty = true;
  
  this.clear=function(){
    $(CoC.ui.teams.selector).text("");
    CoC.ui.teams.empty = true;
  }
 
  this.update=function(teams, size){
    var element = $(CoC.ui.teams.selector);
    element.text("");
    if(teams && (teams[0] || teams["extra"])){
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
          var synergies = CoC.logic.synergy.get(teams[i])
          
          var synergieselement = $('<div>', { class : "synergies" })
          for(var o in synergies){
            var synergy = $('<div>', { class : "synergy" });
            synergy.append($('<img>', { src:CoC.ui.getSynergyImage(o, synergies[o]) }));
            synergy.append($('<span>').text(CoC.ui.getSynergyName(o) + " +" + synergies[o] + "%"));
            synergieselement.append(synergy)
          }
          subelement.append(synergieselement);
        }
        
        subelement.append($('<div>', { style:'clear:both'}));
        element.append(subelement);
      }
    }
    else{
      element.append($('<div>', { class:"noteam" }).text("No Synergies Found."));
    }
  }
}

CoC.ui.roster=new function(){

  this.selector="#roster"
  
  this.empty = true;
  
  this.update=function(){
    var heroes = CoC.roster.all();
    CoC.ui.roster.empty = heroes.length == 0;
    
    var element = $("<div>");
    $(CoC.ui.roster.selector).text("").append(element);
    for(var i in heroes)
      (function(hero,index){
        element.append(CoC.ui.hero(hero, index, function(event){
          var h = CoC.data.heroes[hero.id];
          
          $("#roster-configure-stars").text("");
          $("#roster-configure-stars").append((function(){
            var string = "";
            for(var i=0;i<hero.stars;i++)
              string+="<span class='star'></span>";
            return string;
          })());
          if(hero.awakened)
            $("#roster-configure-stars").addClass("awakened")
          else
            $("#roster-configure-stars").removeClass("awakened")
          
          $("#roster-configure-synergies").text("");
          var synergies = h.synergies[hero.stars];
          for(var s=0; s<synergies.length; s++){
            var synergy = $('<div>', { class : "synergy", title: CoC.data.heroes[synergies[s].id].name });
            synergy.append($('<img>', { src:'images/champions/portrait_'+synergies[s].id+'.png' }));
            synergy.append($('<img>', { src:CoC.ui.getSynergyImage(synergies[s].type, synergies[s].amount) }));
            synergy.append($('<span>').text(CoC.ui.getSynergyName(synergies[s].type) + " +" + synergies[s].amount + "%"));
            $("#roster-configure-synergies").append(synergy);
          }
          if(!synergies.length)
            $("#roster-configure-synergies").append($('<div>',{ class : "synergy none" }).text("None"));
          $("#roster-configure-image").prop("src", 'images/champions/fullsize_'+hero.id+'.png');
          $("#roster-configure-name").prop("class", h.class).text(h.name);
          $("#roster-configure-class").prop("class", h.class.toLowerCase()).text(h.class);
        
          function setupRankLevel(){
            if(hero.level > CoC.data.levels[hero.stars][hero.rank-1]){
              hero.level = CoC.data.levels[hero.stars][hero.rank-1];
              CoC.roster.save();
            }
          
            $("#roster-configure-level").empty();
            for(var i = 1; i<=CoC.data.levels[hero.stars][hero.rank-1]; i++)
              $("#roster-configure-level").append($("<option>").val(i).text(i));
            $("#roster-configure-level").unbind( "change" ).change(function(e){              
                hero.level = e.target.value;
                CoC.roster.save();
                CoC.ui.roster.dirty();
                $("#roster-configure-level").selectmenu('refresh');
              }).val(hero.level).selectmenu('refresh');
          }
          
          $("#roster-configure-rank").text("");
          for(var i = 1; i<=CoC.data.levels[hero.stars].length; i++)
            $("#roster-configure-rank").append($("<option>").val(i).text(i));
          $("#roster-configure-rank").unbind( "change" ).change(function(e){
            hero.rank = e.target.value;
            CoC.roster.save();
            CoC.ui.roster.dirty();
            setupRankLevel();
            $("#roster-configure-rank").selectmenu('refresh');
          }).val(hero.rank).selectmenu('refresh');
          
          setupRankLevel();
          
          $("#roster-configure-awakened").prop("checked",hero.awakened != 0).checkboxradio("refresh").unbind( "change" ).change(function(e){
            if(e.target.checked)
              hero.awakened = 1;
            else
              hero.awakened = 0;
            CoC.roster.save();
            CoC.ui.roster.dirty();
            var el = $(element.find(".hero")[index])
            if(hero.awakened){
              el.addClass("awakened");
              $("#roster-configure-stars").addClass("awakened")
            }
            else{
              el.removeClass("awakened");
              $("#roster-configure-stars").removeClass("awakened")
            }
          });
          
          $("#roster-configure-quest").prop("checked",hero.quest === true).checkboxradio("refresh").unbind( "change" ).change(function(e){
            if(e.target.checked)
              hero.quest = true;
            else
              hero.quest = false;
            CoC.roster.save();
            CoC.ui.roster.dirty();
            var el = $(element.find(".hero")[index])
            if(hero.quest)
              el.addClass("quest");
            else
              el.removeClass("quest");
          });
          
          $("#roster-configure-delete").unbind( "click" ).click(function(){
            CoC.ui.teams.clear();
            CoC.roster.remove(hero.id, hero.stars);
            CoC.ui.roster.dirty();
            CoC.ui.hero.hide(element, index);
            $('#popup-roster-configure').popup("close");
          });
          
          element.find(".container").removeClass("selected");
          $(event.target).parent().addClass("selected");
          
          $('#popup-roster-configure').popup("open",{
            positionTo:$(this),
            transition:"pop"
          })
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
      $('#panel-roster-options').panel("close");
    });

  }
}

CoC.ui.add=new function(){

  this.selector="#add-heroes"

  this.stars = 2;
  this.setStars=function(stars){
    this.stars = stars;
    CoC.ui.add.update();
  }
  
  this.update=function(){
    var stars = this.stars;
    var heroes = CoC.logic.heroes.excluding(CoC.roster.all({
      1:stars === 1,
      2:stars === 2,
      3:stars === 3,
      4:stars === 4
    }), stars);
    var element = $('<div>');
    $(CoC.ui.add.selector).text("").append(element);
    for(var i in heroes)
      (function(hero,i){
        element.append(CoC.ui.hero({ id:hero.id, stars:stars }, i, function(){
          CoC.roster.add({ 
            id:hero.id, 
            stars:stars,
            rank:1,
            level:1,
            awakened:0
          });
          CoC.ui.hero.hide(element, i);
        }));
      })(heroes[i],i);
    element.append($('<div>').css({ 'clear':'both'}));
  }
}

//Make swipes move to the next screen
$( document ).on( "pagecreate", "#page-add", function() {
  $( document ).on( "swipeleft", "#page-add", function( e ) {
    $("#page-add").find("#header a[href=#page-roster]").click()
  });
});

//Make swipes move to the next screen
$( document ).on( "pagecreate", "#page-roster", function() {
  $( document ).on( "swipeleft", "#page-roster", function( e ) {
    if($("#page-roster").find(".ui-popup-active").length)
      return;
    $("#page-roster").find("#footer a[href=#page-teams]").click()
  });
  $( document ).on( "swiperight", "#page-roster", function( e ) {
    if($("#page-roster").find(".ui-popup-active").length)
      return;
    if($("#page-roster").find(".panel").hasClass("ui-panel-open"))
      $("#page-roster").find(".panel a[href=#page-add]").click()
    else
      $("#page-roster").find("#header a[href=#panel-roster-options]").click()
  });
});

//Make swipes move to the last screen or open the panel
$( document ).on( "pagecreate", "#page-teams", function() {
  $( document ).on( "swipeleft", "#page-teams", function( e ) {
    if($("#page-teams").find(".panel").hasClass("ui-panel-open"))
      $("#page-teams").find(".panel a[href=#page-settings-advanced]").click()
    else
      $("#page-teams").find("#header a[href=#panel-team-settings]").click()
  });
  $( document ).on( "swiperight", "#page-teams", function( e ) {
    $("#page-teams").find("#footer a[href=#page-roster]").click()
  });
});

//Make swipes move to the next screen
$( document ).on( "pagecreate", "#page-settings-advanced", function() {
  $( document ).on( "swiperight", "#page-settings-advanced", function( e ) {
    $("#page-settings-advanced").find("#footer a[href=#page-teams]").click()
  });
});

$("#page-roster").on("pagebeforeshow",function(){
  console.log("refreshing roster...")

  $('#roster-import a').click(function(){
    console.log("importing csv...");
    
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
    $('#panel-roster-options').panel("close");
  });
  
  $('#roster-clear-all').click(function(){
    CoC.roster.clear();
    CoC.ui.roster.update();
    CoC.ui.roster.dirty();
    $('#panel-roster-options').panel("close");
  });
  
  $('#popup-roster-configure').on("popupafterclose",function(){
    $(CoC.ui.roster.selector).find(".container").removeClass("selected");
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
      
  $("#team-build-progress").attr("class", (CoC.ui.teams.worker === null)? "hidden": "");
  $("#team-build-progress input").css('opacity', 0).css('pointer-events','none');
  $("#team-build-progress .ui-slider-handle").remove();
  $('#team-build-progress .ui-slider-track').css('margin','0 15px 0 15px').css('pointer-events','none');
  
  var teamSettingsSize = $('input:radio[name=team-settings-size]');
  teamSettingsSize.filter('[value='+CoC.settings.getValue("size")+']').prop("checked", true).checkboxradio("refresh");
  teamSettingsSize.change(function(){ CoC.settings.setValue("size",this.value) });

  for(var i=1; i<=4;i++)
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
    $("#team-build-progress").attr("class","");
    
    CoC.ui.teams.empty = false;
    
    var workerWorking = false;
    if (window.Worker){
  
      try{
        if(CoC.ui.teams.worker !== null)
          CoC.ui.teams.worker.terminate();
        CoC.ui.teams.worker = new Worker('scripts/worker-team.js');
        CoC.ui.teams.worker.onmessage=function(event){
          if(event.data.type === "progress"){
            var current = event.data.current;
            var max = event.data.max;
        
            $("#team-build-progress input").val(Math.min(100 * current / max, 100)).slider("refresh");
          }
          if(event.data.type === "complete"){
            $("#team-build-progress input").val(100).slider("refresh");
            $("#team-build-progress").attr("class","hidden");
            CoC.ui.teams.update(event.data.teams, size);
            CoC.ui.teams.worker.terminate();
            CoC.ui.teams.worker = null;
          }
        };
        CoC.ui.teams.worker.postMessage({ roster:roster, size:size, single:single, extras:extras, weights:CoC.settings.weights, update:100 });
        workerWorking = true;
        console.log("building team with worker");
      }
      catch(e){}
    }

    if(!workerWorking){
      console.log("building team inline");
      setTimeout(function(){
        var lastTime = (new Date()).getTime();
        var teams = CoC.logic.team.build({ heroes:roster, size:size, single:single, extras:extras, progress:function(current, max){
          var time = (new Date()).getTime();
          if(time-lastTime < 100)
            return;
          lastTime = time;
          $("#team-build-progress input").val(Math.min(100 * current / max, 100)).slider("refresh");
        } });
        $("#team-build-progress input").val(100).slider("refresh");
        setTimeout(function(){
          CoC.ui.teams.update(teams, size);
          $("#team-build-progress").attr("class","hidden");
        },0);
      },0);
    }
    
  });
});

$("#page-settings-advanced").on( "pagecreate", function() {

  var sliders = {};

  var groups = {}, presets = CoC.settings.preset.ids();
  for(var i in presets){
    var preset = CoC.settings.preset.info(presets[i]);
    var container = $("#settings-advanced-preset");
    if(preset.category){
      if(groups[preset.category] === undefined){
        groups[preset.category] = $('<optgroup>', { label:preset.category });
        container.append(groups[preset.category]);
      }
      container = groups[preset.category];
    }
  
    container.append($('<option>', { value:preset.id }).text( preset.name ));
    container.select("refresh")
  }
  $("#settings-advanced-preset").change(function(){
    CoC.settings.preset.apply(this.value, function(key, value){
      var slider = $(sliders[key]);
      if(slider.length){
        slider.val(value * 100).slider("refresh")
        return true;
      }
      return false;
    });
  });
  
  function enableSlider(id, type){
    var value = CoC.settings.getWeight(type);
    $(id).val(value * 100).slider("refresh").change(function(){
      CoC.settings.setWeight(type, parseInt(this.value) / 100.0);
    })
    sliders[type]=id;
  }
  enableSlider("#settings-advanced-star4","stars-4");
  enableSlider("#settings-advanced-star3","stars-3");
  enableSlider("#settings-advanced-star2","stars-2");
  enableSlider("#settings-advanced-star1","stars-1");
  enableSlider("#settings-advanced-awakened","awakened");
  enableSlider("#settings-advanced-class2","duplicates-2");
  enableSlider("#settings-advanced-class3","duplicates-3");
  enableSlider("#settings-advanced-class4","duplicates-4");
  enableSlider("#settings-advanced-class5","duplicates-5");
  enableSlider("#settings-advanced-attack","attack");
  enableSlider("#settings-advanced-stun","stun");
  enableSlider("#settings-advanced-critrate","critrate");
  enableSlider("#settings-advanced-critdmg","critdmg");
  enableSlider("#settings-advanced-perfectblock","perfectblock");
  enableSlider("#settings-advanced-block","block");
  enableSlider("#settings-advanced-powergain","powergain");
  enableSlider("#settings-advanced-armor","armor");
  enableSlider("#settings-advanced-health","health");
  
});