var CoC = CoC || {};
CoC.synergies = CoC.synergies || {};

CoC.synergies.version = "1.1.0";

CoC.synergies.initialize=function(stars){
  console.log("Contest of Champions - Synergies Tool v"+CoC.synergies.version);
  
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
      stun:"#f66",
      critrate:"#fa0",
      critdamage:"#fa6",
      powergain:"#a0f",
      powersteal:"#a6f",
      perfectblock:"#00f",
      block:"#66f",
      armor:"#3af",
      health:"#0f0",
      healthsteal:"#af0"
    },
    springy = $('canvas').springy({
      stiffness: 100.0,
      repulsion: 800.0,
      damping: 0.5,
      nodeSelected:function(node, edges){
        $('#legend div').removeClass('selected');
        if(node === undefined){
          $('#legend').removeClass('selected');
        }
        else if(edges !== undefined){
          $('#legend').addClass('selected');
          for(var i=0; i<edges.length; i++){
            $('#legend div[effectId='+edges[i].data.effect+']').addClass('selected');

          }
        }
      }
    }),
    nodes = {}, effects = {};
  
  //add nodes
  var champions = CoC.data.champions.where({ stars:stars });
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
  var synergies = CoC.data.synergies.where({ fromStars:stars });
  function addNeighbors(node1, node2, effectId){
    node1.data.neighbors[ node2.id ] = true;
    node2.data.neighbors[ node1.id ] = true; 
    node1.data.effects[effectId] = true;
    node2.data.effects[effectId] = true;
  }
  for(var i=0; i<synergies.length; i++){
    var synergy = synergies[i];
    if(nodes[ synergy.get("toId") ] === undefined)
      continue;
    addNeighbors(nodes[ synergy.get("fromId") ], nodes[ synergy.get("toId") ], synergy.get('effectId'));
    springy.graph.newEdge(nodes[ synergy.get("fromId") ], nodes[ synergy.get("toId") ],{
      label: synergy.effect().get('name'),
      effect: synergy.get('effectId'),
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
    }).text(name).click(function(){
      $('#legend').addClass('selected');
      $('#legend div').removeClass('selected');
      $('#legend div[effectId='+uid+']').addClass('selected');
      springy.selectEdgeType(uid);
    }));
  });
  
  //enable legend and stars buttons
  $(".button[stars="+stars+"]").addClass("active");
  $('.button.legend').click(CoC.synergies.toggleLegend);
  CoC.synergies.toggleLegend();
  
  //track
  CoC.tracking.pageView();
}

CoC.synergies.canvasResize  = function(){
  $('canvas').attr('width', window.innerWidth - 2).attr('height', window.innerHeight - 2 - 33);
}

CoC.synergies.toggleLegend = function(){
  if($('.button.legend').hasClass('active')){
    $('.button.legend').removeClass('active');
    $('#legend').css('left', -($('#legend').outerWidth()));
  }
  else{
    $('.button.legend').addClass('active');
    $('#legend').css('left', 1);
  }
}