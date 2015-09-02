/**
Copyright (c) 2010 Dennis Hotson

 Permission is hereby granted, free of charge, to any person
 obtaining a copy of this software and associated documentation
 files (the "Software"), to deal in the Software without
 restriction, including without limitation the rights to use,
 copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the
 Software is furnished to do so, subject to the following
 conditions:

 The above copyright notice and this permission notice shall be
 included in all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 OTHER DEALINGS IN THE SOFTWARE.
 */
(function() {
  "use strict";

jQuery.fn.springy = function(params) {
  var stiffness = params.stiffness || 400.0;
  var repulsion = params.repulsion || 400.0;
  var damping = params.damping || 0.5;
  var minEnergyThreshold = params.minEnergyThreshold || 0.00001;
  var nodeSelected = params.nodeSelected || null;
  var maxTeamSize = params.maxTeamSize || 5;
  var activeMass = params.activeMass || 500;

  var canvas = this[0];
  var ctx = canvas.getContext("2d");

  var nodeFont;
  var pixelRatio;
  var canvasOffset;

  //We can check to see if the font has been loaded before using.
  var ScaledNodeFont = function(){
    this.fontSize = 14 * pixelRatio;
    this.font = this.fontSize + "px Hanzel, sans-serif";

    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');

    context.font = this.fontSize + "px sans-serif";
    var wrongSize = context.measureText("wE arE reaDY.").width;

    context.font = this.font;

    this.isReady = function(){
      if(!this.loaded && context.measureText("wE arE reaDY.").width !== wrongSize)
        this.loaded = true;
      return this.loaded;
    }
  };

  function doResize(){
    pixelRatio = window.devicePixelRatio || 1;
    canvasOffset = $(canvas).offset();
    nodeFont = new ScaledNodeFont();
  }
  doResize();

  var resizeTimeout;
  $(window).on("resize", function(e){
    if(resizeTimeout)
      clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function(){
      doResize();
      resizeTimeout = null;
    }, 50);
  });

  var graph = this.graph = params.graph || new Springy.Graph();
  var layout = this.layout = new Springy.Layout.ForceDirected(graph, stiffness, repulsion, damping, minEnergyThreshold);

	// calculate bounding box of graph layout.. with ease-in
	var currentBB = layout.getBoundingBox();

	// convert to/from screen coordinates
	var toScreen = function(point) {
		var size = currentBB.topright.clone().subtract(currentBB.bottomleft),
    delta = point.clone().subtract(currentBB.bottomleft);
    return new Springy.Vector(delta.x / size.x * canvas.width, delta.y / size.y * canvas.height);
  };

  var fromScreen = function(point) {
    var size = currentBB.topright.clone().subtract(currentBB.bottomleft);
    return new Springy.Vector((point.x / canvas.width) * size.x + currentBB.bottomleft.x, (point.y / canvas.height) * size.y + currentBB.bottomleft.y);
  };

  var getCoordinate = function(x, y){
    return new Springy.Vector(x, y).multiply(pixelRatio);
  }

  function graphShake(){
    layout.eachNode(function(node, point){
      point.p = Springy.Vector.random();
    });
  }

	// half-assed drag and drop
	var selected = [];
  var edgeSelected = null;
  var dragged = null;
  var moved = 0;
  var selection = null;
  var clicks = 0;
  var clickSource;

  this.selectEdgeType=function(type){
    clearSelected();
    edgeSelected = type;
    if(dragged)
      dragged.point.active = false;
    dragged = null;
    renderer.start();
  };

  //Selection Modifications
  function addSelected(node){
    var array = selected.slice(), index = array.indexOf(node);
    if(index !== -1)
      array.splice(index, 1);
    array.push(node);
    updateSelected(array);
  }
  function toggleSelected(node){
    var array = selected.slice(), index = array.indexOf(node);
    if(index !== -1)
      array.splice(index, 1);
    else
      array.push(node);
    updateSelected(array);
  }
  function replaceSelected(node){
    var index = selected.indexOf(node);
    if(index === -1)
      updateSelected([ node ]);
  }
  function boxSelected(selectType){
    //select the first 5 closest to the start point and inside
    var x1 = Math.min(selection.start.x, selection.end.x) | 0,
    y1 = Math.min(selection.start.y, selection.end.y) | 0,
    x2 = x1 + Math.abs(selection.start.x - selection.end.x) | 0,
    y2 = y1 + Math.abs(selection.start.y - selection.end.y) | 0;

    var array = [];
    graph.nodes.forEach(function(node){
      if(!node.bb)
        return;
      if(array.indexOf(node) !== -1)
        return;
      if(node.bb.center.x > x1 && node.bb.center.x < x2 && node.bb.center.y > y1 && node.bb.center.y < y2){
        var dx = selection.start.x - node.bb.center.x, dy = selection.start.y - node.bb.center.y;
        array.push({ distanceSquared: dx*dx + dy*dy, node: node });
      }
    });
    array.sort(function(a, b){
      return b.distanceSquared - a.distanceSquared;
    });
    for(var i=0; i<array.length; i++)
      array[i] = array[i].node;

    if(selectType === "add"){
      for(var i=0; i<selection.before.length; i++){
        var index = array.indexOf(selection.before[i]);
        if(index !== -1)
          array.splice(index, 1);
        array.push(selection.before[i]);
      }
    }
    if(selectType === "toggle"){
      for(var i=0; i<selection.before.length; i++){
        var index = array.indexOf(selection.before[i]);
        if(index !== -1)
          array.splice(index, 1);
        else
          array.push(selection.before[i]);
      }
    }

    updateSelected(array);
  }
  function clearSelected(){
    updateSelected([]);
  }
  function updateSelected(array){
    if(array.length > maxTeamSize)
      array = array.slice(-maxTeamSize);

    for(var i=0; i<selected.length; i++)
      selected[i].selected = false;

    selected = array;
    for(var i=0; i<selected.length; i++){
      var point = layout.point(selected[i]);
      if(point)
        point.m = activeMass;
      selected[i].selected = true;
    }
  }
  function updateNodesSelected(){
    if (nodeSelected){
      var selectedEdges = [];
      for(var i=0,edge; i<graph.edges.length; i++){
        edge = graph.edges[i];
        if(selected.length > 1){
          for(var j=0; j<selected.length; j++)
            for(var k=0; k<selected.length; k++)
              if(selected[j] === edge.source && selected[k] === edge.target)
                selectedEdges.push(edge);
        } 
        else{
          for(var j=0; j<selected.length; j++)
            if(selected[j] === edge.source || selected[j] === edge.target || (selected[j].data.neighbors[ edge.source.id ] && selected[j].data.neighbors[ edge.target.id ]) )
              selectedEdges.push(edge);
        }
      }
      nodeSelected(selected, selectedEdges);
    }  
  }

  function findNodeAt(coord){
    var nearest = {};
    graph.nodes.forEach(function(node){
      var distance = node.distanceSquared(coord.x, coord.y);
      if(nearest.distance === undefined || distance < nearest.distance){
        var found;
        if(clickSource === "touch"){
          var radius = Math.max(32, node.bb.size);
          found = (node.bb)? distance < radius * radius : false;
        }
        else
          found = node.containsPoint(coord);
        if(found){
          nearest.node = node,
          nearest.distance = distance;
        }
      }
    });
    return nearest.node;
  }

  //Pointer actions
  function pointerStart(coord, selectType, otherCoord){
    if(dragged)
      dragged.point.active = false;
    var node = findNodeAt(coord);
    if(!node){
      if(selectType === "replace" || clickSource === "touch"){
        clearSelected();
        updateNodesSelected();
      }
      if(clickSource === "touch"){
        if(coord && otherCoord){
          selection = { start: coord, end: otherCoord, before:selected, type:selectType };
        }
      }
      else if(selectType)
        selection = { start: coord, before:selected, type:selectType };
      clicks = 0;
    }
    else{
      if(node.isSelected())
        clicks++;
      var point = fromScreen(coord);
      dragged = { node:node, point:layout.point(node) };
      dragged.offset = new Springy.Vector(dragged.point.p.x - point.x, dragged.point.p.y - point.y);
      dragged.coord = coord;
      dragged.point.active = true;
      dragged.point.m = activeMass;
    }
    moved = 0;
    renderer.start();
  }
  
  function pointerMove(coord, selectType, otherCoord){
    var point = fromScreen(coord);
    if (dragged !== null) {
      moved += coord.clone().subtract(dragged.coord).length();
      dragged.coord = coord;
      dragged.point.p = point.add(dragged.offset);
      dragged.point.m = activeMass;
      dragged.point.active = true;
    }
    else if(clickSource === "touch"){
      if(coord && otherCoord){
        selection.start = coord;
        selection.end = otherCoord;
        selection.type = selectType;
        boxSelected(selectType);
        updateNodesSelected();
      }
    }
    else if(selection){
      selection.end = coord;
      selection.type = selectType;
      boxSelected(selectType);
      updateNodesSelected();
    }
    renderer.start();
  }
  
  function pointerEnd(clicked, selectType){
    selection = null;
    if(dragged != null){
      if(moved < 10){
        switch(selectType){
          case "add":
            addSelected( dragged.node );
            break;
          case "toggle":
            toggleSelected( dragged.node );
            break;
          case "replace":
            replaceSelected( dragged.node );
            break;
        }
        updateNodesSelected();
        edgeSelected = null;
      }
      dragged.point.active = false;
      dragged = null;
    }
    else if(clicked)
      edgeSelected = null;
  }

  function selectType(event){
    return (event.shiftKey)? "add": (event.ctrlKey)? "toggle": "replace";
  }

  function selectedOpen(node){
    if (node.data.onOpen) {
      node.data.onOpen();
    }
  }
  
  $(canvas).on('taphold', function(e) {
    e.preventDefault();
    if(clickSource !== "touch" || e.shiftKey || e.ctrlKey)
      return;
    if(moved < 10 && dragged && dragged.node.isSelected()){
      selectedOpen(dragged.node);
      pointerEnd();
    }
  });
  $(canvas).on('dblclick', function(e) {
    e.preventDefault();
    if(clickSource !== "mouse" || clicks < 2 || e.shiftKey || e.ctrlKey)
      return;
    var node = findNodeAt(getCoordinate(e.pageX - canvasOffset.left, e.pageY - canvasOffset.top));
    if(moved < 10 && node && node.isSelected())
      selectedOpen(node);
  });
  $('body').on('keyup', function(e){
    if(e.which === 27){ // escape
      e.preventDefault();
      clearSelected();
      if(nodeSelected){
        nodeSelected(selected);
      }
    }
    else if(e.which === 32){ // space bar
      e.preventDefault();
      graphShake();
    }
  });
  $(canvas).on('touchstart', function(e){
    clickSource = "touch";
    e.preventDefault();
    var coord = getCoordinate(window.event.touches[0].pageX - canvasOffset.left, window.event.touches[0].pageY - canvasOffset.top),
      otherCoord;
    if(window.event.touches.length > 1)
      otherCoord = getCoordinate(window.event.touches[1].pageX - canvasOffset.left, window.event.touches[1].pageY - canvasOffset.top);
    pointerStart(coord, "toggle", otherCoord);
    return false;
  });
  $(canvas).on('touchmove', function(e) {
    clickSource = "touch";
    e.preventDefault();
    var coord = getCoordinate(window.event.touches[0].pageX - canvasOffset.left, window.event.touches[0].pageY - canvasOffset.top),
      otherCoord;
    if(window.event.touches.length > 1)
      otherCoord = getCoordinate(window.event.touches[1].pageX - canvasOffset.left, window.event.touches[1].pageY - canvasOffset.top);
    pointerMove(coord, "toggle", otherCoord);
    return false;
  });
  $(canvas).on('touchend',function(e) {
    clickSource = "touch";
    e.preventDefault();
    pointerEnd(true, "toggle");
    return false;
  });
  $(canvas).on('touchleave touchcancel',function(e) {
    clickSource = "touch";
    e.preventDefault();
    pointerEnd(false, "toggle");
    return false;
  });
  $(window).on('touchend',function(e) {
    clickSource = "touch";
    pointerEnd(false, "toggle");
    return false;
  });

  $(canvas).on('mousedown', function(e) {
    if(e.button === 2)
      return;
    clickSource = "mouse";
    e.preventDefault();
    pointerStart(getCoordinate(e.pageX - canvasOffset.left, e.pageY - canvasOffset.top), selectType(e));
  });
  $(window).on('mousemove', function(e) {
    clickSource = "mouse";
    e.preventDefault();
    pointerMove(getCoordinate(e.pageX - canvasOffset.left, e.pageY - canvasOffset.top), selectType(e));
  });
  $(window).on('mouseup',function(e) {
    clickSource = "mouse";
    e.preventDefault();
    if(e.target === canvas || dragged || selection)
      pointerEnd(true, selectType(e));
  });
  $(canvas).on('mousedown mousemove mouseenter mouseleave',function(e) {
    var state = '';
    if(selection)
      state = 'selecting'
    else if(dragged != null)
      state = 'dragging';
    else{
      if(findNodeAt(getCoordinate(e.pageX - canvasOffset.left, e.pageY - canvasOffset.top)))
        state = 'hover';
    }
    switch(state){
      case 'selecting':
      $(canvas)[0].className="selecting";
      break;
      case 'dragging':
      $(canvas)[0].className="dragging";
      break;
      case 'hover':
      $(canvas)[0].className="hover";
      break;
      default:
      $(canvas)[0].className="";
    }
  });

  var nodeHitmasks = {};
  function getHitmask(src, image){
    if(!nodeHitmasks[src]){
      if(typeof image === "function")
        image = image();
      var x, y,
        size = image.width, 
        imageData = image.getContext('2d').getImageData(0, 0, size, size), 
        data = imageData.data, 
        opaque = {};
      for(x=0; x<size; x++){
        opaque[x] = {};
        for(y=0; y<size; y++)
          opaque[x][y] = (data[(y*size*4) + x*4 + 3] > 127)? true: undefined;
      }
      nodeHitmasks[src] = { size:size, opaque:opaque };
    }
    return nodeHitmasks[src];
  }

  var nodeImages = {};
  var nodeImageQueue = {
    list:[],
    todo:{}
  };
  nodeImageQueue.push = function(id, callback){
    nodeImageQueue.insert(id, callback, 'push');
  }
  nodeImageQueue.unshift = function(id, callback){
    nodeImageQueue.insert(id, callback, 'unshift');
  }
  nodeImageQueue.insert = function(id, callback, method){
    nodeImageQueue.todo[id] = callback;
    nodeImageQueue.list[method].call(nodeImageQueue.list, id);
    if(!nodeImageQueue.timeout)
      nodeImageQueue.next();
  }
  nodeImageQueue.next = function(){
    if(nodeImageQueue.list.length === 0)
      return;
    var id = nodeImageQueue.list.shift();
    var todo = nodeImageQueue.todo[id];
    delete nodeImageQueue.todo[id];
    nodeImageQueue.timeout = setTimeout(function(){
      delete nodeImageQueue.timeout;
      todo.call(null);
      nodeImageQueue.next();
    }, 25);
  }

  function addPortaitImages(src, image, color){
    //build the image 
    var canvas = document.createElement('canvas'),
    context = canvas.getContext('2d'),
    barHeight = Math.max(2, (image.width/10) | 0);
    canvas.width = canvas.height = image.width;
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    context.fillStyle = color;
    context.fillRect(0, canvas.height - barHeight, canvas.width, barHeight);

    if(nodeImages[src].portraits === undefined)
      nodeImages[src].portraits = [];
    nodeImages[src].portraits.push(canvas);

    var resize = image.width >> 1;
    if(resize >= 16){
      var resizeCanvas = document.createElement('canvas'),
      resizeContext = resizeCanvas.getContext('2d');
      resizeCanvas.width = resizeCanvas.height = resize;
      resizeContext.drawImage(image, 0, 0, resize, resize);
      nodeImageQueue.unshift(src, function(){
        addPortaitImages(src, resizeCanvas, color);
      }, 'unshift');
    }
    else{
      nodeImages[src].loaded = true;
    }
  }

  var placeholders={};
  var placeholderCoords = [
    //Used the svg path from here and just filled the path with bezier curves.
    //The original size of the svg path was 220x220 so scale to new size.
    //https://upload.wikimedia.org/wikipedia/en/b/b9/No_free_portrait.svg
    3.5709275,215.81378,
    3.7352275,204.03019,3.8497975,199.05392,3.5005675,183.77748,
    11.214111,174.15409,38.3674,169.74066,45.785393,167.0981,
    55.358378,159.98075,66.203698,153.92378,75.552667,148.56151,
    80.7154,145.60034,80.782546,135.45005,80.404668,128.63362,
    78.689369,118.98009,77.782686,110.65561,70.86354,103.56735,
    70.47649,101.54341,69.346365,96.899211,65.948685,90.832271,
    63.662168,80.636072,54.650066,68.010083,56.914311,61.532735,
    62.944238,44.282973,57.676043,37.272904,61.378834,35.798494,
    69.823479,32.435953,72.10706,25.082426,79.841538,17.698566,
    102.43887,13.411138,98.965362,1.9932189,115.84961,4.1987589,
    136.77696,6.9324259,125.2515,10.014792,139.60507,17.279644,
    157.23926,26.204921,146.73196,27.108963,162.83032,50.739759,
    172.38972,64.771999,153.76819,65.728581,158.59298,78.146165,
    163.04993,89.617072,152.54354,91.572613,147.24294,104.12579,
    142.15767,116.16899,138.96668,119.70997,144.82195,135.58386,
    150.25927,150.32462,159.28667,143.58938,179.677,165.66778,
    184.85448,171.27389,203.45549,164.48784,216.26305,180.85898,
    216.25506,189.25148,216.44185,198.19473,216.49943,216.08121,
    159.09474,215.87646,3.5709275,215.81378,3.5709275,215.81378
    ];

  function getPlaceholder(size, color){
    var id = size + '_' + (color || '');
    if(!placeholders[id]){
      var canvas, context;
      if(!placeholders[size]){
        var ratio = size / 220;
        canvas = document.createElement('canvas');
        context = canvas.getContext('2d');
        canvas.height = canvas.width = size;
        context.beginPath();
        context.moveTo(placeholderCoords[0] * ratio, placeholderCoords[1] * ratio);
        for(var i=2; i<placeholderCoords.length; i+=6)
          context.bezierCurveTo(
            placeholderCoords[i]*ratio, placeholderCoords[i+1]*ratio,
            placeholderCoords[i+2]*ratio, placeholderCoords[i+3]*ratio,
            placeholderCoords[i+4]*ratio, placeholderCoords[i+5]*ratio
          );
        context.closePath();
        context.lineWidth = 3;
        context.strokeStyle = "#868686";
        context.stroke();
        context.fillStyle = "#909090";
        context.fill();
        placeholders[size] = canvas;
      }
      var canvas = document.createElement('canvas'),
      context = canvas.getContext('2d'),
      barHeight = Math.max(2, (size / 10) | 0);
      canvas.height = canvas.width = size;
      context.drawImage(placeholders[size], 0, 0, canvas.width, canvas.height);
      context.fillStyle = color || "#000";
      context.fillRect(0, canvas.height - barHeight, canvas.width, barHeight);
      placeholders[id] = canvas;
    }
    return placeholders[id]
  }

  function getPortraitSizeTarget(number){
    var list = {};
    getPortraitSizeTarget = function(number){
      if(list[number] === undefined){
        var i = 1, last = 0;
        while(i != number && i + (i-last)>>1 < number){
          last = i;
          i = i << 1;
        }
        list[number] = i;
      }
      return list[number];
    }
    return getPortraitSizeTarget(number);
  }

  //we cache the best sized portrait with type bar
  Springy.Node.prototype.setPortraitImage = function(size){
    var portrait,
      hitmask,
      img = this.data.image, 
      color = this.data.color || "#111111", 
      node = this;
    if(img){
      var src = img.src;
      if (src in nodeImages) {
        if (nodeImages[src].loaded) {
          //sample down for better antialiasing
          var portraits = nodeImages[src].portraits, 
          target = getPortraitSizeTarget(size);
          for(var i=0; i < portraits.length && portraits[i].width >= target; i++)
            portrait = portraits[i];

          //get hitmask from largest image
          hitmask = getHitmask(src, portraits[0]);
        }
      }
      else{
        nodeImages[src] = {  
          loaded: false,
          portraits:[]
        };
        var image = new Image();
        image.addEventListener("load", function (){
          nodeImageQueue.push(src, function(){
            addPortaitImages(src, image, color);
          });
        });
        image.src = src;
      }
    }
    if(!portrait){
      portrait = getPlaceholder(size, color);
      hitmask = getHitmask('portrait', function(){ return getPlaceholder(256) });
    }

    this.image = portrait;
    this.hitmask = hitmask;
  }

  Springy.Node.prototype.setPortraitText = function() {
    if(nodeFont.isReady() && (!this.text || this.text.font != nodeFont)){
      var canvas = document.createElement('canvas'),
      context = canvas.getContext('2d'),
      text = this.data.label.toUpperCase();

      context.font = nodeFont.font;
      var paddingX = pixelRatio * 6;
      var paddingY = pixelRatio * 3;
      var textWidth = context.measureText(text).width;
      var textHeight = nodeFont.fontSize;

      canvas.width = (textWidth + paddingX) | 0;
      canvas.height = (textHeight + paddingY) | 0;

      //draw the text background
      context.fillStyle = "rgba(0, 0, 0, 0.5)";
      context.fillRect(0, 0, canvas.width, canvas.height);
      //draw the name
      context.font = nodeFont.font;
      context.fillStyle = "#ffffff";
      context.textAlign = "left";
      context.textBaseline = "top";
      context.shadowColor = "#000";
      context.shadowOffsetX = 1 * pixelRatio;
      context.shadowOffsetY = 1 * pixelRatio;
      context.fillText(text, paddingX >> 1, paddingY >> 3);

      this.text = canvas;
      this.text.font = nodeFont;
    }
  }

  var renderer = this.renderer = new Springy.Renderer(layout,
    function clear() {
      currentBB = layout.getBoundingBox();
      ctx.clearRect(0,0,canvas.width,canvas.height);
      if(selection && selection.start && selection.end){
        boxSelected(selection.type);
        updateNodesSelected();
      }
      if(dragged){
        var point = fromScreen(dragged.coord);
        dragged.point.p = point.add(dragged.offset);
        dragged.point.m = activeMass;
      }
    },
    function processNode(node, point) {
      var s = toScreen(point), 
      x = (s.x | 0), 
      y = (s.y | 0), 
      fullSize = node.getSize() | 0, 
      halfSize = fullSize >> 1;
      //set images/bounds
      node.setPortraitText();
      node.setPortraitImage(fullSize);
      node.setBoundingBox(x - halfSize, y - halfSize, fullSize);
    },
    function drawEdge(edge, pointStart, pointEnd) {
      var p1 = toScreen(pointStart), p2 = toScreen(pointEnd);
      var isSelected = 0;
      if(edgeSelected){
        if(edge.data.effect === edgeSelected)
          isSelected = 1;
      }
      else if (selected.length === maxTeamSize){
        if(edge.source.isSelected() && edge.target.isSelected())
          isSelected = 1;
      }
      else if(selected.length > 1){
        var sourceSelected = edge.source.isSelected(), targetSelected = edge.target.isSelected();
        if(sourceSelected && targetSelected)
          isSelected = 1;
        else if(sourceSelected || targetSelected)
          isSelected = 0.5;
        else if(edge.target.isSelectedNeighbor() && edge.source.isSelectedNeighbor())
          isSelected = 0.5;
      }
      else if(selected.length){
        if(edge.source.isSelected() || edge.target.isSelected())
          isSelected = 1;
        if(edge.target.isSelectedNeighbor() && edge.source.isSelectedNeighbor())
          isSelected = 0.5;
      }
      else
        isSelected = 1;
      
      var normal = p2.clone().subtract(p1).normal().normalise();
      var from = graph.getEdges(edge.source, edge.target);
      var to = graph.getEdges(edge.target, edge.source);
      var total = from.length + to.length;

			// Figure out edge's position in relation to other edges between the same nodes
			var n = 0;
			for (var i=0; i<from.length; i++) {
				if (from[i].id === edge.id) {
					n = i;
				}
			}

			//change default to  10.0 to allow text fit between edges
			var spacing = Math.min(Math.max(4, Math.min(window.innerWidth, window.innerHeight)/50), 12) * pixelRatio;

			// Figure out how far off center the line should be drawn
			var offset = normal.multiply(-((total - 1) * spacing)/2.0 + (n * spacing));
			var s1 = p1.clone().add(offset);
			var s2 = p2.clone().add(offset);
      var sdelta = s2.clone().subtract(s1).normalise();
      var weight = (selected.length > 1 && isSelected === 1)? 2: 1.0;
      var width = Math.max(weight *  1.5, 0.1) * pixelRatio;
      var arrowWidth = 1 + width;
      var arrowLength = arrowWidth * 4;
      var overlapping = edge.target.overlapping(edge.source);
      var lineStart, lineEnd, lineDelta, lineDiff;
      var halfArrow = sdelta.clone().multiply( arrowLength * 0.75 );
      var sourceAbove = s1.y < s2.y;

      //get best line start/end
      if(overlapping){
        if(sourceAbove){
          lineStart = s1.clone();
          lineEnd = edge.target.intersection(s1, s2);
        }
        else{
          lineStart = edge.source.intersection(s2, s1);
          lineEnd = s2.clone();
        }
      }
      else{
        lineStart = edge.source.intersection(s2, s1);
        lineEnd = edge.target.intersection(s1, s2);

        //adjust if we have too short or long direction
        if(!lineStart || !lineEnd ||
          (lineDiff = lineEnd.clone().subtract(lineStart)).lengthSquared() < arrowLength*arrowLength || 
          lineDiff.normalise().dot(sdelta) < 0){
          if(sourceAbove){
            lineStart = s1.clone();
            lineEnd = edge.target.intersection(s1, s2);
          }
          else{
            lineStart = edge.source.intersection(s2, s1);
            lineEnd = s2.clone();
          }
        }
      }
      lineStart = lineStart || s1.clone();
      lineEnd = lineEnd || s2.clone();
      lineEnd.subtract(halfArrow);
      var ldelta = lineEnd.clone().subtract(lineStart).normalise();

      var arrowStart = lineEnd.clone().add(halfArrow);
      var stroke = edge.data.color || '#000000';
      var alpha = (isSelected === 0)? 0.1: (isSelected === 0.5)? 0.5: 1.0;

      ctx.save();

      //settings
      ctx.lineWidth = width;
      ctx.lineCap = overlapping? "round": "butt";
      ctx.strokeStyle = stroke;
      ctx.fillStyle = stroke;
      ctx.globalAlpha = alpha;

      //line

      if(ldelta.dot(sdelta) > 0){
        ctx.beginPath();
        ctx.moveTo(lineStart.x, lineStart.y);
        ctx.lineTo(lineEnd.x, lineEnd.y);
        ctx.closePath();
        ctx.stroke();
      }

			// arrow
			ctx.translate(arrowStart.x, arrowStart.y);
			ctx.rotate(Math.atan2(p2.y - p1.y, p2.x - p1.x));
			ctx.beginPath();
			ctx.moveTo(-arrowLength, arrowWidth);
			ctx.lineTo(0, 0);
			ctx.lineTo(-arrowLength, -arrowWidth);
			ctx.lineTo(-arrowLength * 0.8, -0);
			ctx.closePath();
			ctx.fill();

      ctx.restore();
    },
    function drawNode(node, point) {    
      var size = node.bb.size;

      if (node.isSelected())
        ctx.globalAlpha = 1.0;
      else if(edgeSelected)
        ctx.globalAlpha = (node.data.effects[edgeSelected])? 1.0: 0.25;
      else if(selected.length === maxTeamSize)
        ctx.globalAlpha = 0.25;
      else if(selected.length > 1)
        ctx.globalAlpha = (node.isSelectedNeighbor())? 0.75: 0.25;
      else if(selected.length)
        ctx.globalAlpha = (node.isSelectedNeighbor())? 1.0: 0.25;
      else
        ctx.globalAlpha = 1.0;

      //draw the portrait
      ctx.drawImage(node.image, node.bb.topLeft.x, node.bb.topLeft.y, size, size);
    },
    function drawNodeOverlay(node, point) {
      if (!node.isSelected() || !node.text)
        return;

      ctx.globalAlpha = 1.0;

      //draw the portrait text
      var width = node.text.width, height = node.text.height;
      ctx.drawImage(node.text, 
        Math.min(Math.max(0, node.bb.center.x - (width / 2) | 0), canvas.width - width), 
        Math.min(Math.max(0, node.bb.center.y - height - (node.bb.size / 2) | 0), canvas.height - height), 
        width, height);
    },
    function drawOverlay(){
      if(selection && selection.start && selection.end){
        var x = -0.5 + Math.min(selection.start.x, selection.end.x) | 0,
        y = -0.5 + Math.min(selection.start.y, selection.end.y) | 0,
        width = 0.5 + Math.abs(selection.start.x - selection.end.x) | 0,
        height = 0.5 + Math.abs(selection.start.y - selection.end.y) | 0;

        ctx.save();

        //translate the entire context by .5 to get 1px width lines
        ctx.translate(0.5, 0.5);

        //draw the dashed border
        ctx.lineWidth = pixelRatio;
        ctx.strokeStyle = "#333";
        ctx.setLineDash([5, 5]);
        ctx.strokeRect(x, y, width, height);

        //draw the overlay, but not over drawn content
        ctx.globalAlpha = 0.25;
        ctx.globalCompositeOperation = "destination-over";
        ctx.fillStyle = "#000";
        ctx.fillRect(x, y, width, height);

        ctx.restore();
      }
    }
  );

  Springy.Node.prototype.setBoundingBox = function(x, y, size) {
    this.bb = { 
      topLeft: new Springy.Vector(x, y),
      bottomRight: new Springy.Vector(x + size, y + size),
      center: new Springy.Vector((x + size / 2) | 0, (y + size / 2) | 0),
      size:size 
    };
  }

  // return true if inside BB and not over a 0 opacity pixel
  Springy.Node.prototype.containsPoint = function(point, y) {
    var x, px, py;
    if(y === undefined){
      y = point.y;
      x = point.x;
    }
    else
      x = point;

    if(this.bb && this.hitmask){
      px = ((x - this.bb.topLeft.x) / this.bb.size * this.hitmask.size) | 0;
      py = ((y - this.bb.topLeft.y) / this.bb.size * this.hitmask.size) | 0;
      if(this.hitmask.opaque[px])
        return this.hitmask.opaque[px][py];
    }
    return false;
  }

  Springy.Node.prototype.containsPointRelative = function(x, y) {
    x = (x * this.hitmask.size) | 0;
    y = (y * this.hitmask.size) | 0;
    if(this.hitmask.opaque[x])
      return this.hitmask.opaque[x][y];
    return false;
  }

  Springy.Node.prototype.overlappingBoundingBox = function(node) {
    return this.bb && node.bb &&
    this.bb.topLeft.x <= node.bb.bottomRight.x && 
    this.bb.bottomRight.x >= node.bb.topLeft.x &&
    this.bb.topLeft.y <= node.bb.bottomRight.y && 
    this.bb.bottomRight.y >= node.bb.topLeft.y;
  }

  Springy.Node.prototype.overlapping = function(node) {
    if(this.overlappingBoundingBox(node)){
      if(this.hitmask && node.hitmask){
        var tlx, tly, brx, bry;
        if(this.bb.bottomRight.y < node.bb.bottomRight.y){
          tly = node.bb.topLeft.y | 0;
          bry = this.bb.bottomRight.y | 0;
        }
        else{
          tly = this.bb.topLeft.y | 0;
          bry = node.bb.bottomRight.y | 0;
        }
        if(this.bb.topLeft.x < node.bb.topLeft.x){
          tlx = node.bb.topLeft.x | 0;
          brx = this.bb.bottomRight.x | 0;
        }
        else{
          tlx = this.bb.topLeft.x | 0;
          brx = node.bb.bottomRight.x | 0;
        }
        for(var x=tlx; x<brx; x++)
          for(var y=tly; y<bry; y++)
            if(this.containsPoint(x,y) && node.containsPoint(x,y))
              return true;
            return false;
      }
      return true;
    }
    return false;
  }

  Springy.Node.prototype.distanceSquared = function(x, y) {
    if(!this.bb)
      return null;
    var dx = this.bb.center.x - x, dy = this.bb.center.y - y;
    return dx*dx + dy*dy;
  }

  Springy.Node.prototype.isSelected = function() {
    return this.selected;
  }

  Springy.Node.prototype.isSelectedNeighbor = function() {
    for(var i=0; i<selected.length; i++)
      if(selected[i].data.neighbors[ this.id ])
        return true;
      return false;
    }

  Springy.Node.prototype.getSize = function() {
    var canvasSize = Math.min(canvas.width, canvas.height),
    size = Math.min(Math.max(16, canvasSize >> 4), 128);
    if(this.isSelected())
      size *= 1.5;
    return size;
  }

  //find the nearest edge of the image, assuming end is inside of node
  Springy.Node.prototype.intersection = function(outside, inside){
    if(!this.hitmask || !this.bb)
      return inside;

    //get position relative to hitmask
    var check = inside.clone().subtract(this.bb.topLeft).divide(this.bb.size),
      delta = outside.clone().subtract(inside).normalise().divide(this.bb.size),
      last;
    while(true){
      check.add(delta);
      if(check.x < 0 || check.y < 0 || check.y > 1 || check.x > 1)
        break;
      if(this.containsPointRelative(check.x, check.y)){
        if(!last)
          last = check.clone();
        else
          last.copy(check);
      }
    }
    if(!last)
      return null;

    //scale and move back to relative position
    return last.multiply(this.bb.size).add(this.bb.topLeft);
  }

  renderer.start();
  return this;
}

})();
