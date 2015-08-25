var CoC = CoC || {};
CoC.synergies = CoC.synergies || {};

CoC.synergies.version = "1.1.0";

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

  function animateFromTo(from, to, milliseconds, easing){
    var start = new Date(), done = (from === to), ease = CoC.synergies.easingFunctions[easing] || CoC.synergies.easingFunctions['linear'];
    return function(){
      if(done)
        return to;
      var now = new Date(), fraction = (now - start)/ milliseconds;
      if(fraction >= 1){
        done = true;
        return to;
      }
      return from + (to - from) * ease( fraction );
    }
  }

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
      stiffness: animateFromTo(1000, 200, 10000, 'easeInQuad'),
      repulsion: animateFromTo(100, 1000, 10000, 'easeInQuad'),
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
        }
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
  $( "#popup-share" ).enhanceWithin().popup();
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
  
  //enable legend and stars buttons
  $(".button[stars="+stars+"]").addClass("active");
  if(!roster){
    $(".button[stars="+stars+"]").attr('href','?roster='+stars);
  }
  else{    
    $(".button[stars]").each(function(button){
      var el = $(this), s = el.attr("stars");
      if(stars === parseInt(s,10))
        el.addClass('roster');
      else
        el.attr('href','?roster='+s);
    });
  }
  $('.button.legend').click(CoC.synergies.toggleLegend);
  CoC.synergies.toggleLegend();

  //track
  CoC.tracking.pageView();
}

CoC.synergies.canvasResize  = function(){
  $('canvas').attr('width', window.innerWidth - 2).attr('height', window.innerHeight - 2 - 33);
  CoC.synergies.updateLegend();
}

CoC.synergies.toggleLegend = function(){
  if($('.button.legend').hasClass('active')){
    $('.button.legend').removeClass('active');
  }
  else{
    $('.button.legend').addClass('active');
  }
  CoC.synergies.updateLegend();
}

CoC.synergies.updateLegend = function(){
  var isActive = $('.button.legend').hasClass('active'), legendWidth = $('#legend').outerWidth();
  $('#legend').css('left', isActive? 1: -legendWidth).css("opacity", isActive? 1: 0);
}

CoC.synergies.easingFunctions = {
  linear: function (t) { return t },
  easeInQuad: function (t) { return t*t },
  easeOutQuad: function (t) { return t*(2-t) },
  easeInOutQuad: function (t) { return t<.5 ? 2*t*t : -1+(4-2*t)*t },
  easeInCubic: function (t) { return t*t*t },
  easeOutCubic: function (t) { return (--t)*t*t+1 },
  easeInOutCubic: function (t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 },
  easeInQuart: function (t) { return t*t*t*t },
  easeOutQuart: function (t) { return 1-(--t)*t*t*t },
  easeInOutQuart: function (t) { return t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t },
  easeInQuint: function (t) { return t*t*t*t*t },
  easeOutQuint: function (t) { return 1+(--t)*t*t*t*t },
  easeInOutQuint: function (t) { return t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t }
}
