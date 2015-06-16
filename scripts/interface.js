
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
 
  this.update=function(result, size){
    var element = $(CoC.ui.teams.selector);
    element.text("");
    if(result.teams.length){
    
      var synergyCount = 0;
      for(var i=0; i<result.teams.length; i++)
        synergyCount += CoC.logic.synergy.count(result.teams[i])
      element.append($('<div>', { class:"message" }).text(synergyCount+" Synergies Found."));
    
    
      for(var i=0; i<result.teams.length; i++){

        var container = $('<div>').addClass('team').addClass(
          (size==3)? 'three': 
          (size==4)? 'four': 
          (size==5)? 'five': 
          'unknown');
      
        for(var j=0; j<result.teams[i].length; j++)
          container.append(CoC.ui.hero(result.teams[i][j]));
        container.append($('<br>',{style:'clear:both'}));
        
        var synergies = CoC.logic.synergy.get(result.teams[i])
        
        var synergieselement = $('<div>', { class : "synergies" })
        for(var o in synergies){
          var synergy = $('<div>', { class : "synergy" });
          synergy.append($('<img>', { src:CoC.ui.getSynergyImage(o, synergies[o]) }));
          synergy.append($('<span>').text(CoC.ui.getSynergyName(o) + " +" + synergies[o] + "%"));
          synergieselement.append(synergy)
        }
        container.append(synergieselement);
        
        container.append($('<div>', { style:'clear:both'}));
        element.append(container);
      }
    }
    else{
      element.append($('<div>', { class:"message" }).text("No Synergies Found."));
    }
    
    if(result.extras.length){
      element.append($('<h3>', { style:'clear:both'}).text("Extras"));
      var container = $('<div>').addClass('extras');
      for(var i=0; i<result.extras.length; i++)
        container.append(CoC.ui.hero(result.extras[i]));
      element.append(container);
    }
  }
}

CoC.ui.roster=new function(){

  this.selector="#roster"
  
  this.empty = true;
  
  this.update=function(){
    var heroes = CoC.roster.get();
    var heroCount = CoC.roster.size();
    CoC.ui.roster.empty = heroes.length == 0;
    
    var sortBy = CoC.settings.getValue("roster-sort");
    //stars > class > name
    if(sortBy === "stars")
      heroes.sort(function(a,b){
        var value = b.stars - a.stars;
        if(value !== 0)
          return value;
          
        var heroA = CoC.data.heroes[a.id], heroB = CoC.data.heroes[b.id]
        value = heroA.class.localeCompare(heroB.class);
        if(value !== 0)
          return value;
         
        return heroA.name.localeCompare(heroB.name);
      })
    //class > stars > name
    if(sortBy === "class")
      heroes.sort(function(a,b){
        var heroA = CoC.data.heroes[a.id], heroB = CoC.data.heroes[b.id]
        var value = heroA.class.localeCompare(heroB.class);
        if(value !== 0)
          return value;
         
        value = b.stars - a.stars;
        if(value !== 0)
          return value;
          
        return heroA.name.localeCompare(heroB.name);        
      })
    //name > stars
    if(sortBy === "name")
      heroes.sort(function(a,b){
        var heroA = CoC.data.heroes[a.id], heroB = CoC.data.heroes[b.id]
        var value = heroA.name.localeCompare(heroB.name);
        if(value !== 0)
          return value;
         
        return b.stars - a.stars;       
      })
    
    var element = $("<div>");
    $(CoC.ui.roster.selector).text("").append(element);
    
    element.append($('<div>', { class:"message" }).text(heroes.length+" of "+heroCount+" Champions."));
    
    for(var i in heroes)
      (function(hero,index){
        element.append(CoC.ui.hero(hero, index, function(event){
          var h = CoC.data.heroes[hero.id], synergies;
          
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
          
          $("#roster-configure-synergies-to").text("");
          synergies = CoC.logic.heroes.synergies.to(hero.id);
          for(var s=0; s<synergies.length; s++){
            var shero = CoC.data.heroes[synergies[s].id];
            var synergy = $('<div>', { class : "synergy", title: shero.name });
            synergy.append($('<img>', { class : "portrait "+shero.class.toLowerCase(), src:'images/champions/portrait_'+shero.id+'.png' }));
            synergy.append($('<img>', { src:CoC.ui.getSynergyImage(synergies[s].type, synergies[s].amount) }));
            synergy.append($('<span>').text(CoC.ui.getSynergyName(synergies[s].type) + " +" + synergies[s].amount + "%"));
            $("#roster-configure-synergies-to").append(synergy);
          }
          if(synergies.length == 0)
            $("#roster-configure-synergies-to").append($('<div>',{ class : "synergy none" }).append($('<span>').text("None")));
          $("#roster-configure-synergies-from").text("");
          synergies = CoC.logic.heroes.synergies.from(hero.id, hero.stars);
          for(var s=0; s<synergies.length; s++){
            var shero = CoC.data.heroes[synergies[s].id];
            var synergy = $('<div>', { class : "synergy", title:shero.name });
            synergy.append($('<img>', { class : "portrait "+shero.class.toLowerCase(), src:'images/champions/portrait_'+shero.id+'.png' }));
            synergy.append($('<img>', { src:CoC.ui.getSynergyImage(synergies[s].type, synergies[s].amount) }));
            synergy.append($('<span>').text(CoC.ui.getSynergyName(synergies[s].type) + " +" + synergies[s].amount + "%"));
            $("#roster-configure-synergies-from").append(synergy);
          }
          if(synergies.length == 0)
            $("#roster-configure-synergies-from").append($('<div>',{ class : "synergy none" }).append($('<span>').text("None")));
          $("#roster-configure-synergies").children(2).collapsible( "expand" );
            
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
              $("#roster-configure-stars").addClass("awakened");
              $("#roster-delete-confirm-stars").addClass("awakened");
            }
            else{
              el.removeClass("awakened");
              $("#roster-configure-stars").removeClass("awakened")
              $("#roster-delete-confirm-stars").removeClass("awakened");
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
            $('#popup-roster-configure').popup("option","transition","none").popup("close");
            setTimeout(function(){
              $("#popup-roster-delete-confirm").popup("open",{
                positionTo:"window"
              })
            },50);
          });
          
          $("#roster-delete-confirm-name").attr("class", h.class.toLowerCase()).text(h.name);
          $("#roster-delete-confirm-stars").text("").attr("class", (hero.awakened)? "awakened": "");
          for(var i=0; i<hero.stars;i++)
            $("#roster-delete-confirm-stars").append($("<span>",{ class:'star' }));
          $("#roster-delete-confirm-yes").unbind( "click" ).click(function(){
            $("#popup-roster-delete-confirm").popup("close");
            CoC.ui.teams.clear();
            CoC.roster.remove(hero.id, hero.stars);
            CoC.ui.roster.dirty();
            CoC.ui.hero.hide(element, index);
          })
          
          element.find(".container").removeClass("selected");
          $(event.target).parent().addClass("selected");
          
          $('#popup-roster-configure').popup("open",{
            positionTo:$(this)
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
    var roster = CoC.roster.get({ stars:{
      1:stars === 1, 2:stars === 2, 3:stars === 3, 4:stars === 4 }
    });
    var heroes = CoC.logic.heroes.excluding(roster, stars);
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
    $("#popup-roster-clear-confirm").popup("open",{
      positionTo:"window"
    });
  });
  
  $('#popup-roster-configure').on("popupafterclose",function(){
    $(CoC.ui.roster.selector).find(".container").removeClass("selected");
  });
  
  $("#roster-delete-confirm-no").click(function(){
    $("#popup-roster-delete-confirm").popup("close");
  });
  
  $("#roster-clear-confirm-no").click(function(){
    $("#popup-roster-clear-confirm").popup("close");
  });
  
  $("#roster-clear-confirm-yes").click(function(){
    CoC.roster.clear();
    CoC.ui.roster.update();
    CoC.ui.roster.dirty();
    $("#popup-roster-clear-confirm").popup("close");
    $('#panel-roster-options').panel("close");
  });

  $('#roster-sort-stars').change(function(){
    CoC.settings.setValue("roster-sort", "stars");
    CoC.ui.roster.update();
  }).prop("checked", (CoC.settings.getValue("roster-sort") == "stars")? true: false).checkboxradio('refresh');
  $('#roster-sort-class').change(function(){
    CoC.settings.setValue("roster-sort", "class");
    CoC.ui.roster.update();
  }).prop("checked", (CoC.settings.getValue("roster-sort") == "class")? true: false).checkboxradio('refresh');
  $('#roster-sort-name').change(function(){
    CoC.settings.setValue("roster-sort", "name");
    CoC.ui.roster.update();
  }).prop("checked", (CoC.settings.getValue("roster-sort") == "name")? true: false).checkboxradio('refresh');

  
  var filters = [
    'roster-filter-stars-1',
    'roster-filter-stars-2',
    'roster-filter-stars-3',
    'roster-filter-stars-4',
    "roster-filter-cosmic",
    "roster-filter-tech",
    "roster-filter-mutant",
    "roster-filter-skill",
    "roster-filter-science",
    "roster-filter-mystic",  
  ];
  $('#roster-filter-all').click(function(){
    for(var i=0; i<filters.length; i++){
      $('#'+filters[i]).prop("checked", true).checkboxradio('refresh')
      CoC.settings.setValue(filters[i], true);
    }
    CoC.ui.roster.update();
  });
  for(var i=0; i<filters.length; i++)
    (function(filter){
      $('#'+filter).change(function(){
        CoC.settings.setValue(filter, this.checked);
        CoC.ui.roster.update();
      })
      .prop("checked", CoC.settings.getValue(filter)? true: false)
      .checkboxradio('refresh');
    })(filters[i])
    
  
  CoC.ui.roster.update();
  CoC.ui.roster.dirty();
});

$("#page-add").on("pagebeforeshow",function(){
  $("#page-add #add-stars a").removeClass("ui-btn-active");
  $("#page-add a#add-stars-"+CoC.ui.add.stars).addClass("ui-btn-active");
  CoC.ui.add.update();
});

$("#page-teams").on( "pagecreate", function() {

  var algorithm = CoC.settings.getValue("algorithm") || "greedy";
  for(var i in CoC.algorithm)
    $("#team-settings-algorithm").append($('<option>', { value:i }).text( "Algorithm - " + CoC.algorithm[i].name ));

});
$("#page-teams").on( "pagebeforeshow", function() {
  $("#team-build-progress").attr("class", (CoC.ui.teams.worker === null)? "hidden": "");
  $("#team-build-progress input").css('opacity', 0).css('pointer-events','none');
  $("#team-build-progress .ui-slider-handle").remove();
  $('#team-build-progress .ui-slider-track').css('margin','0 15px 0 15px').css('pointer-events','none');
  
  var teamSettingsSize = $('input:radio[name=team-settings-size]');
  teamSettingsSize.filter('[value='+CoC.settings.getValue("size")+']').prop("checked", true).checkboxradio("refresh");
  teamSettingsSize.change(function(){ CoC.settings.setValue("size",this.value) });
    
  function enableResultOptions(){
    var algorithm = CoC.settings.getValue("algorithm") || "greedy";
    var isQuesting = CoC.settings.getValue("quest-group");
    
    var canQuest = true;
    if(!CoC.algorithm[algorithm].canQuest){
      isQuesting = false;
      canQuest = false;
    }

    var canExtras = false;
    if(!isQuesting)
      canExtras = true;
  
    $('#team-settings-algorithm-description').text( CoC.algorithm[algorithm].description );
    $('#team-settings-quest').slider(canQuest? "enable": "disable").slider("refresh");
    $('#team-settings-extras').slider(canExtras? "enable": "disable").slider("refresh");
  }
    
  $("#team-settings-algorithm").change(function(){
    CoC.settings.setValue("algorithm",this.value);
    enableResultOptions();
  }).val(CoC.settings.getValue("algorithm") || "greedy").selectmenu("refresh");  
    
  $('#team-settings-quest').change(function(){
    CoC.settings.setValue("quest-group",this.value=="yes");
    enableResultOptions();
  }).val(CoC.settings.getValue("quest-group")? "yes": "no").slider('refresh');
    
  $('#team-settings-extras').change(function(){
    CoC.settings.setValue("include-extras",this.value=="yes") 
  })
    .val(CoC.settings.getValue("include-extras")? "yes": "no")
    .slider('refresh');
    
    
  enableResultOptions();
  
  $("#button-team-settings-apply").click(function(){
    $("#panel-team-settings").panel( "close" );
    
    var size = CoC.settings.getValue("size");
    if(size === undefined)
      size = 3;
    var roster = CoC.roster.get();
    
    var algorithm = CoC.settings.getValue("algorithm") || "greedy";
    var single = CoC.settings.getValue("quest-group")===true;
    var extras = CoC.settings.getValue("include-extras")===true;
    $("#team-build-progress input").val(0).slider("refresh");
    $("#team-build-progress").attr("class","");
    
    CoC.ui.teams.empty = false;
    
    var startTime = new Date(), workerWorking = false;
    if (window.Worker){
  
      try{
        if(CoC.ui.teams.worker !== null)
          CoC.ui.teams.worker.terminate();
        CoC.ui.teams.worker = new Worker('scripts/worker-team.js');
        CoC.ui.teams.worker.onmessage=function(event){
          if(event.data.type === "progress"){
            var current = event.data.current;
            var max = event.data.max;
            var description = event.data.description;
            if(description){
              $("#onboarding-progress .text").text(description);
              $("#onboarding-progress").addClass("show");
            }
            $("#team-build-progress input").val(Math.min(1000 * (current / max), 1000)).slider("refresh");
          }
          if(event.data.type === "failed"){
            $("#team-build-progress input").val(10000).slider("refresh");
            $("#team-build-progress").attr("class","hidden");
            $("#onboarding-progress").removeClass("show");
            CoC.ui.teams.update(event.data.result, size);
            CoC.ui.teams.worker.terminate();
            CoC.ui.teams.worker = null;
            console.log(event.data.message);
          }
          if(event.data.type === "complete"){
            $("#team-build-progress input").val(10000).slider("refresh");
            $("#team-build-progress").attr("class","hidden");
            $("#onboarding-progress").removeClass("show");
            CoC.ui.teams.update(event.data.result, size);
            CoC.ui.teams.worker.terminate();
            CoC.ui.teams.worker = null;
            console.log(CoC.algorithm[algorithm].name + " search completed in "+((new Date() - startTime) / 1000)+" seconds");
          }
        };
        CoC.ui.teams.worker.postMessage({ 
          algorithm:algorithm,
          roster:roster, 
          size:size, 
          single:single, 
          extras:extras,
          weights:CoC.settings.weights, 
          update:250
        });
        workerWorking = true;
      }
      catch(e){}
    }

    if(!workerWorking){
      setTimeout(function(){
        var lastTime = (new Date()).getTime();
        var result = CoC.algorithm[algorithm].build({ heroes:roster, size:size, single:single, extras:extras });
        $("#team-build-progressprogress input").val(10000).slider("refresh");
        setTimeout(function(){
          CoC.ui.teams.update(result, size);
          $("#team-build-progress").attr("class","hidden");
          $("#onboarding-progress").removeClass("show");
          console.log(CoC.algorithm[algorithm].name + " search completed in "+((new Date() - startTime) / 1000)+" seconds");
        },0);
      },0);
    }
    
  });
});

$("#page-settings-advanced").on( "pagecreate", function() {

  var sliders = {};

  function addPresets(category){
    var container = $("#settings-advanced-preset-"+category.toLowerCase()),
      presets = CoC.settings.preset.ids(category);      
    for(var i in presets){
      var preset = CoC.settings.preset.info(presets[i]);
      container.append($('<option>', { value:preset.id }).text( preset.name ));
    }
  }
  addPresets("Synergies");
  addPresets("Duplicates");
  
  $("#settings-advanced-preset-defaults").click(function(){
    CoC.settings.preset.apply("defaults", function(key, value){
      var slider = $(sliders[key]);
      if(slider.length){
        slider.val(value * 100).slider("refresh")
        return true;
      }
      return false;
    });
  });
  
  $("#settings-advanced-preset-synergies, #settings-advanced-preset-duplicates").change(function(){
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
  enableSlider("#settings-advanced-critdamage","critdamage");
  enableSlider("#settings-advanced-perfectblock","perfectblock");
  enableSlider("#settings-advanced-block","block");
  enableSlider("#settings-advanced-powergain","powergain");
  enableSlider("#settings-advanced-armor","armor");
  enableSlider("#settings-advanced-health","health");
  
});