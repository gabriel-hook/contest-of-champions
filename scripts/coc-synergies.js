var CoC = CoC || {};
CoC.synergies = CoC.synergies || {};

CoC.synergies.version = "1.5.0";

CoC.synergies.initialize=function(stars, roster){
  console.log("Contest of Champions - Synergies Tool v"+CoC.synergies.version);
  
  var nodeSelected = function(nodes, edges){
    $('#legend div').removeClass('selected');
    $('#legend div span').text("");
    if(nodes.length === 0){
      $('#legend').removeClass('selected');
    }
    else if(edges !== undefined){
      $('#legend').addClass('selected');
      for(var i=0; i<edges.length; i++){
        $('#legend div[effectId='+edges[i].data.effect+']').addClass('selected');
      }
      if(nodes.length > 1){
        var amounts = {};
        for(var i=0; i<edges.length; i++)
          amounts[ edges[i].data.effect ] = edges[i].data.amount + 
            (amounts[ edges[i].data.effect ] || 0);
        for(var effect in amounts)
          $('#legend div[effectId='+effect+'] span').text(" - " + amounts[effect] + "%");
      }
    }
    CoC.synergies.updateLegend();
  };

  var baseURL = location.href.substr(0, location.href.lastIndexOf('/')+1),
    typeColors = {
      cosmic:"#3af",
      tech:"#23f",
      mutant:"#fa0",
      skill:"#f30",
      science:"#0a0",
      mystic:"#90f"
    },
    effectColors = {
      attack:"#f00",
      stun:"#f60",
      critrate:"#fa0",
      critdamage:"#a60",
      powergain:"#a0f",
      powersteal:"#a6f",
      perfectblock:"#00a",
      block:"#66f",
      armor:"#0af",
      health:"#0f0",
      healthsteal:"#af0"
    },
    springy = $('canvas').springy({
      stiffness: 800,
      repulsion: 1600,
      damping: 0.5,
      nodeSelected:nodeSelected
    }),
    nodes = {}, effects = {};
  
  //add nodes
  var champions = roster? CoC.data.roster.where({ stars:stars }): CoC.data.champions.where({ stars:stars });
  for(var i=0; i<champions.length; i++)
    (function(champion){
      var link = $('<a>', { href: baseURL+"#page-guide?guide="+champion.get('uid'), class:'hidden', target:'_blank' });
      $(document.body).append(link);
      
      //windows safari is stupid and doesn't give dom elements a click method
      if(link[0].click === undefined && document.createEvent){
        link[0].click = function(){
          var clickEvent = document.createEvent('MouseEvents');
              clickEvent.initEvent('click', true, true);
          this.dispatchEvent(clickEvent);
        };
      }
      
      nodes[ champion.get('uid') ] = springy.graph.newNode({
        label: champion.get('name'),
        image: (function(src){
          var image = new Image();
          image.src = src;
          return image;
        })( champion.portrait() ),
        type: champion.get('typeId'),
        color: typeColors[ champion.get('typeId') ],
        neighbors: {},
        effects:{},
        onOpen:function(){
          link[0].click();
        }
      });
    })(champions[i]);
    
  //add edges
  function addNeighbors(fromId, toId, effectId){
    var nodeFrom = nodes[fromId], nodeTo = nodes[toId];
    nodeFrom.data.neighbors[nodeTo.id] = true;
    nodeFrom.data.effects[effectId] = true;
    nodeTo.data.neighbors[nodeFrom.id] = true; 
    nodeTo.data.effects[effectId] = true;
  }
  var synergies = CoC.data.synergies.where({ fromStars:stars });
  for(var i=0; i<synergies.length; i++){
    var synergy = synergies[i];
    if(nodes[ synergy.get("fromId") ] === undefined || nodes[ synergy.get("toId") ] === undefined)
      continue;
    addNeighbors(synergy.get("fromId"), synergy.get("toId"), synergy.get('effectId'));
    springy.graph.newEdge(nodes[ synergy.get("fromId") ], nodes[ synergy.get("toId") ],{
      label: synergy.effect().get('name'),
      effect: synergy.get('effectId'),
      amount: synergy.get('effectAmount'),
      color: effectColors[ synergy.get('effectId') ]
    });
    effects[synergy.get('effectId')] = true;
  }
  
  //enable share popup with tracking
  $( "#popup-share" ).css('display','block').enhanceWithin().popup();
  $("#share-facebook").click(function(){
    CoC.tracking.event("share", "facebook");
  });
  $("#share-twitter").click(function(){
    CoC.tracking.event("share", "twitter");
  });
  $("#share-googleplus").click(function(){
    CoC.tracking.event("share", "googleplus");
  });
  
  //add types to legend
  CoC.data.effects.each(function(effect){
    var uid = effect.get('uid'), name = effect.get('name');
    if(!effects[uid])
      return;
    $('#legend').append( $('<div>', {
      effectId:uid,
      style:'border-color:'+(effectColors[uid] || '#000')+';'
    }).text(name).append('<span>').click(function(){
      $('#legend').addClass('selected');
      $('#legend div').removeClass('selected');
      $('#legend div[effectId='+uid+']').addClass('selected');
      $('#legend div span').empty();
      springy.selectEdgeType(uid);
    }));
  });
  
  //enable legend
  if(roster && champions.length === 0){
    $("#roster-hint").addClass("active");
    $("#roster-hint-stars").text(Array(stars + 1).join("★"));
  }

  if(_.isEmpty(effects))
    $("#legend").css("display", "none");
  else{
    $('.button.legend').click(CoC.synergies.toggleLegend);
    CoC.synergies.toggleLegend();
  }

  //enable stars buttons
  $(".button[stars="+stars+"]").addClass("ui-btn-a");
  if(!roster){
    $(".button[stars="+stars+"]").attr('href','?roster='+stars);
  }
  else{    
    $(".button[stars]").each(function(button){
      var el = $(this), s = el.attr("stars");
      if(stars === parseInt(s,10))
        el.addClass("ui-btn-e");
      else
        el.attr('href','?roster='+s);
    });
  }

  //track
  CoC.tracking.pageView();
};

CoC.synergies.toggleLegend = function(){
  if($('.button.legend').hasClass('active')){
    $('.button.legend').removeClass('active');
  }
  else{
    $('.button.legend').addClass('active');
  }
  CoC.synergies.updateLegend();
};

CoC.synergies.updateLegend = function(){
  var isActive = $('.button.legend').hasClass('active'), legendWidth = $('#legend').outerWidth();
  $('#legend').css('left', isActive? 0: -legendWidth).css("opacity", isActive? 1: 0);
};

CoC.synergies.canvasResize  = function(){
  var width = window.innerWidth, 
    height = window.innerHeight - 33,
    ratio = window.devicePixelRatio || 1;
  $('canvas').attr('width', width * ratio).attr('height', height * ratio).css("width", width).css("height", height);
  CoC.synergies.updateLegend();
};

var delayedResizeTimeout;
function delayedResize(){
  if(delayedResizeTimeout)
    clearTimeout(delayedResizeTimeout);
  delayedResizeTimeout = setTimeout(function(){
    CoC.synergies.canvasResize();

    delayedResizeTimeout = null;
  }, 10);
}

$(window).on('resize', delayedResize);
$(document).on('ready', delayedResize);
CoC.synergies.canvasResize();
