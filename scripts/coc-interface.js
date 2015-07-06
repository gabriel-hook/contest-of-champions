﻿var CoC = CoC || {};
CoC.ui = CoC.ui || {};

//initialize
CoC.ui.initialize=function(){
  CoC.ui.roster.initialize();
  CoC.ui.add.initialize();
  CoC.ui.teams.initialize();
  CoC.ui.guides.initialize();
  CoC.ui.crystals.initialize();
}

CoC.ui.roster=new function(){

  this.initialize=function(){
    this.view = new CoC.view.RosterView({
      el: $("#roster")[0]
    });
  }
  
  this.popup=function(element, champion){
    
    $("#roster-configure-stars").text("");
    $("#roster-configure-stars").append((function(){
      var string = "";
      for(var i=0;i<champion.get("stars");i++)
        string+="<span class='star'></span>";
      return string;
    })());
    if(champion.get("awakened") > 0)
      $("#roster-configure-stars").addClass("awakened")
    else
      $("#roster-configure-stars").removeClass("awakened")

      
    $(".roster-configure-guide").unbind("click").bind("click",function(event){
    
      $('#popup-roster-configure').one("popupafterclose", function(){
        CoC.ui.guides.open( champion.get("uid") );
      });
      $('#popup-roster-configure').popup("close");
      
    });

    $("#roster-configure-image").prop("src", champion.image());
    $("#roster-configure-name").prop("class", champion.get("typeId")).text(champion.get("name"));
    
    $("#roster-configure-type").prop("src", CoC.data.types.findWhere({ uid:champion.get("typeId") }).get("image"));

    function setupRankLevel(){
      var levels = CoC.data.championLevels[champion.get("stars")];
    
      $("#roster-configure-level").empty();
      for(var i = 1; i<=levels[champion.get("rank")-1]; i++)
        $("#roster-configure-level").append($("<option>").val(i).text(i));
        
      $("#roster-configure-level").unbind( "change" ).change(function(e){              
        champion.set("level", e.target.value);
        champion.save();
        $("#roster-configure-level").selectmenu('refresh');
      }).val(champion.get("level")).selectmenu('refresh');
    }
    
    $("#roster-configure-rank").text("");
    for(var i = 1; i<=CoC.data.championLevels[champion.get("stars")].length; i++)
      $("#roster-configure-rank").append($("<option>").val(i).text(i));
    $("#roster-configure-rank").unbind( "change" ).change(function(e){        
      champion.set("rank", e.target.value);
      champion.save();
      setupRankLevel();
      $("#roster-configure-rank").selectmenu('refresh');
    }).val(champion.get("rank")).selectmenu('refresh');
    
    setupRankLevel();
    
    $("#roster-configure-awakened").prop("checked", champion.get("awakened") != 0).checkboxradio("refresh").unbind( "change" ).change(function(e){

      champion.set("awakened", (e.target.checked)? 1: 0)
      champion.save();
      
      if(champion.get("awakened") > 0){
        $("#roster-configure-stars").addClass("awakened");
        $("#roster-delete-confirm-stars").addClass("awakened");
      }
      else{
        $("#roster-configure-stars").removeClass("awakened")
        $("#roster-delete-confirm-stars").removeClass("awakened");
      }
    });
    
    $("#roster-configure-quest").prop("checked", champion.get("quest")).checkboxradio("refresh").unbind( "change" ).change(function(e){
      champion.set("quest", (e.target.checked)? true: false);
      champion.save();
    });
    
    $("#roster-configure-delete").unbind( "click" ).click(function(){

      $('#popup-roster-configure').one("popupafterclose", function(){
        $("#popup-roster-delete-confirm").popup("open",{
          positionTo:"window"
        })
      });
      $('#popup-roster-configure').popup("close");
      
    });
    
    $("#roster-delete-confirm-name").attr("class", champion.get("typeId")).text(champion.get("name"));
    $("#roster-delete-confirm-stars").text("").attr("class", (champion.get("awakened") > 0)? "awakened": "");
    for(var i=0; i<champion.get("stars");i++)
      $("#roster-delete-confirm-stars").append($("<span>",{ class:'star' }));
    $("#roster-delete-confirm-yes").unbind( "click" ).click(function(){
      $("#popup-roster-delete-confirm").popup("close");
      champion.destroy();
    })
    
    $('#popup-roster-configure').popup("open",{
      positionTo:$(element)
    })
  
  }
  
  this.update=function(){
    this.view.render();
  }
}

CoC.ui.add=new function(){
  
  this.initialize=function(){
    this.view = new CoC.view.AddChampionsView({
      el: $("#add-champions")[0]
    });
    this.view.stars(this.stars)
  }
  
  this.stars = 2;

  this.setStars=function(stars){
    this.stars = stars;
    this.view.stars(this.stars)
    this.update();
  }
  
  this.update=function(){
    this.view.render();
  }
}

CoC.ui.teams=new function(){

  this.initialize=function(){
    this.view = new CoC.view.TeamView({
      el: $("#teams")[0]
    });
  }
      
  this.worker = null;
  this.empty = true;
 
  this.update=function(result, size){
    this.empty = false;
    this.view.size(size);
    this.view.teams(result.teams);
    this.view.extras(result.extras);
    this.view.render();
  }
}

CoC.ui.guides=new function(){

  this.initialized = false;
  this.shown = false;
  this.seen = false;
  
  this.initialize=function(){
    var that = this;
    CoC.guides.complete(function(){
      that.view = new CoC.view.GuideChampionsView({
        el: $("#guide-champions")[0]
      });
      that.view.render();
      if(that.shown)
        that.show();
    });
  }
  
  
  this.open=function(uid){
    this._uid = uid;
    jQuery.mobile.changePage("#page-guide",{
      transition:"fade"
    });
  }

  this.render=function(){
    if(!this.view)
      return;
      
    this.view.render();
  }
  
  this.show=function(){
    if(!this.view){
      this.shown = true;
      return;
    }
    
    var uid = this.seen? undefined: (CoC.getUrlParam("page-guide", "guide") || 0);
    if(this._uid){
      uid = this._uid;
      delete this._uid;
    }
    this.seen = true;
    
    this.view.enable();
    this.view.reload();
    this.view.select(uid);
  }
  
  this.hide=function(){
    if(!this.view)
      return;
    this.view.disable();
  }
}

CoC.ui.crystals=new function(){
  
  this.initialize=function(){
    this.view = new CoC.view.CrystalsView({
      el: $("#crystals")[0]
    });
  }
  
  this.update=function(){
    this.view.render();
  }
}

//Make swipes move to the next screen
$( document ).on( "pagecreate", "#page-roster", function() {
  $( document ).on( "swiperight", "#page-roster", function( e ) {
    if($("#page-roster").find(".ui-popup-active").length || $("#page-roster").find(".ui-panel-open").length)
      return;
    $("#page-roster").find("#header a[href=#panel-roster-options]").click()
  });
});

//Make swipes move to the last screen or open the panel
$( document ).on( "pagecreate", "#page-teams", function() {
  $( document ).on( "swipeleft", "#page-teams", function( e ) {
    if($("#page-teams").find(".panel").hasClass("ui-panel-open"))
      return;
    $("#page-teams").find("#header a[href=#panel-team-settings]").click()
  });
});
  
$("#page-roster").on("pagebeforeshow",function(){
  CoC.ui.roster.update();
});

$("#page-guide").on("pagebeforeshow",function(){
  CoC.ui.guides.render();
});
$("#page-guide").on("pageshow",function(){
  CoC.ui.guides.show();
});
$("#page-guide").on("pagehide",function(){
  CoC.ui.guides.hide();
});

$("#page-crystals").on("pagebeforeshow",function(){
  CoC.ui.crystals.update();
});

$("#page-add").on("pagebeforeshow",function(){
  $("#page-add #add-stars a").removeClass("ui-btn-active");
  $("#page-add a#add-stars-"+CoC.ui.add.stars).addClass("ui-btn-active");
  CoC.ui.add.update();
});

$("#page-roster").on("pagecreate",function(){

  $('#roster-import-input').change(function(e){
    if (this.files && this.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        var result = e.target.result;
        CoC.roster.csv(result);
        CoC.ui.roster.update();
      }
      reader.readAsText(this.files[0]);
    }
  });

  $('#roster-import').click(function(){
    console.log("importing csv...");
    $('#roster-import-input').click();
    $('#panel-roster-options').panel("close");
  });
  
  $('#roster-export').click(function(){
    console.log("exporting to csv...");
    
    var csvRoster = CoC.roster.csv();
    $('#roster-export').attr('download', 'champions.csv').attr('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvRoster));
    
    $('#panel-roster-options').panel("close");
  });  
  
  $('#roster-clear-all').click(function(){
    $("#popup-roster-clear-confirm").popup("open",{
      positionTo:"window"
    });
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
    $("#popup-roster-clear-confirm").popup("close");
    $('#panel-roster-options').panel("close");
  });

  var sorts = [ "stars", "type", "name" ];
  _(sorts).each(function(sort){
    function setAscendingDescending(){
      if(CoC.settings.getValue("roster-sort-direction") === "ascending")
        $("label[for=roster-sort-"+sort+"]").removeClass("ui-descending").addClass("ui-ascending");
      else
        $("label[for=roster-sort-"+sort+"]").removeClass("ui-ascending").addClass("ui-descending");
    }
    var element = $('#roster-sort-' + sort);
    element.change(function(){
      var newSort = CoC.settings.getValue("roster-sort") !== sort;
      var wasAscending = CoC.settings.getValue("roster-sort-direction") === "ascending";
      CoC.settings.setValue("roster-sort-direction", (newSort || wasAscending)? "descending": "ascending");
      CoC.settings.setValue("roster-sort", sort);
      setAscendingDescending();
      CoC.ui.roster.update();
    })
    element.prop("checked", (CoC.settings.getValue("roster-sort") === sort)? true: false).checkboxradio('refresh');
    setAscendingDescending();
  });
  
  var filters = [
    'roster-filter-stars-1',
    'roster-filter-stars-2',
    'roster-filter-stars-3',
    'roster-filter-stars-4'
  ];
  for(var i=0; i<filters.length; i++)
    (function(filter){
      $('#'+filter).change(function(){
        CoC.settings.setValue(filter, this.checked);
        CoC.ui.roster.update();
      })
      .prop("checked", CoC.settings.getValue(filter)? true: false)
      .checkboxradio('refresh');
    })(filters[i]);
});

$("#page-teams").on( "pagecreate", function() {
  var algorithm = CoC.settings.getValue("algorithm") || "greedy";
  for(var i in CoC.algorithm)
    $("#build-settings-algorithm").append($('<option>', { value:i }).text( CoC.algorithm[i].name ));
});

$("#page-teams").on( "pagecreate", function() {
  $("#team-build-progress").attr("class", (CoC.ui.teams.worker === null)? "hidden": "");
  $("#team-build-progress input").css('opacity', 0).css('pointer-events','none');
  $("#team-build-progress .ui-slider-handle").remove();
  $('#team-build-progress .ui-slider-track').css('margin','0 15px 0 15px').css('pointer-events','none');
  
  var teamSettingsSize = $('input:radio[name=build-settings-size]');
  teamSettingsSize.filter('[value='+CoC.settings.getValue("build-size")+']').prop("checked", true).checkboxradio("refresh");
  teamSettingsSize.change(function(){ CoC.settings.setValue("build-size",this.value) });
    
  function enableResultOptions(){
    var algorithm = CoC.settings.getValue("build-algorithm");    
    var isQuesting = CoC.settings.getValue("build-quest-group");
    
    var canQuest = true;
    if(!CoC.algorithm[algorithm].canQuest){
      isQuesting = false;
      canQuest = false;
    }

    var canExtras = false;
    if(!isQuesting)
      canExtras = true;
  
    $('#build-settings-algorithm-description').text( CoC.algorithm[algorithm].description );
    $('#build-settings-quest').checkboxradio(canQuest? "enable": "disable").checkboxradio("refresh");
    $('#build-settings-extras').checkboxradio(canExtras? "enable": "disable").checkboxradio("refresh");
  }
    
  $("#build-settings-algorithm").change(function(){
    CoC.settings.setValue("build-algorithm", this.value);
    enableResultOptions();
  }).val(CoC.settings.getValue("build-algorithm") || "greedy").selectmenu("refresh");  
    
  $('#build-settings-quest').change(function(){
    CoC.settings.setValue("build-quest-group", this.checked);
    enableResultOptions();
  }).prop("checked", CoC.settings.getValue("build-quest-group") === true).checkboxradio('refresh');
    
  $('#build-settings-extras').change(function(){
    CoC.settings.setValue("build-include-extras", this.checked) 
  }).prop("checked", CoC.settings.getValue("build-include-extras") === true).checkboxradio('refresh');
    
  var filters = [
    'build-filter-stars-1',
    'build-filter-stars-2',
    'build-filter-stars-3',
    'build-filter-stars-4'
  ];
  for(var i=0; i<filters.length; i++)
    (function(filter){
      $('#'+filter).change(function(){
        CoC.settings.setValue(filter, this.checked);
      })
      .prop("checked", CoC.settings.getValue(filter)? true: false)
      .checkboxradio('refresh');
    })(filters[i]);
    
  enableResultOptions();
  
  $("#button-build-settings-apply").click(function(){
    $("#panel-team-settings").panel( "close" );
    
    var size = CoC.settings.getValue("build-size");
    if(size === undefined)
      size = 3;
    
    var roster = CoC.roster.filtered();
    var algorithm = CoC.settings.getValue("build-algorithm") || "greedy";
    var quest = CoC.settings.getValue("build-quest-group")===true;
    var extras = CoC.settings.getValue("build-include-extras")===true;
    
    $("#team-build-progress input").val(0).slider("refresh");
    $("#team-build-progress").attr("class","");
    
    var startTime = new Date(), workerWorking = false;
    if (window.Worker){
  
      try{
        if(CoC.ui.teams.worker !== null)
          CoC.ui.teams.worker.terminate();
        CoC.ui.teams.worker = new Worker('scripts/worker.js?');
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
            
            var result = {};
            if(event.data.result.teams !== undefined){
              result.teams=[];
              for(var i=0; i<event.data.result.teams.length; i++){
                var team = [];
                for(var j=0; j<event.data.result.teams[i].length; j++)
                  team.push(new CoC.model.Champion( event.data.result.teams[i][j] ))
                result.teams.push(team);
              }
            }
            if(event.data.result.extras !== undefined){
              result.extras=[];
              for(var i=0; i<event.data.result.extras.length; i++)
                result.extras.push(new CoC.model.Champion( event.data.result.extras[i] ))
            }
            
            CoC.ui.teams.update(result, size);
            CoC.ui.teams.worker.terminate();
            CoC.ui.teams.worker = null;
            console.log(CoC.algorithm[algorithm].name + " search completed in "+((new Date() - startTime) / 1000)+" seconds");
          }
        };
        
        var rosterJSON = [];
        for(var i=0; i<roster.length; i++)
          rosterJSON.push(roster[i].toJSON());
        
        CoC.ui.teams.worker.postMessage({
          algorithm:algorithm,
          roster:rosterJSON, 
          size:size, 
          quest:quest, 
          extras:extras,
          weights:CoC.settings.weights, 
          update:250
        });
        workerWorking = true;
      }
      catch(e){
        console.error(e)
      }
    }

    if(!workerWorking){
      setTimeout(function(){
        var lastTime = (new Date()).getTime();
        var result = CoC.algorithm[algorithm].build({ champions:roster, size:size, quest:quest, extras:extras });
        $("#team-build-progressprogress input").val(10000).slider("refresh");
        setTimeout(function(){
          CoC.ui.teams.update(result, size);
          $("#team-build-progress").attr("class","hidden");
          $("#onboarding-progress").removeClass("show");
          console.log(CoC.algorithm[algorithm].name + " search completed in "+((new Date() - startTime) / 1000)+" seconds (worker failed)");
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