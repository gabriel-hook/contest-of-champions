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
	var nodeFont = "16px Hanzel, sans-serif";
	var edgeFont = "8px Verdana, sans-serif";
	var stiffness = params.stiffness || function(){ return 400.0 };
	var repulsion = params.repulsion || function(){ return 400.0 };
	var damping = params.damping || 0.5;
	var minEnergyThreshold = params.minEnergyThreshold || 0.00001;
	var nodeSelected = params.nodeSelected || null;
	var nodeImages = {};
	var nodeImageContexts = {};
	var nodeImageContextQueue = {};
  var maxTeamSize = params.maxTeamSize || 5;
  var activeMass = params.activeMass || 500;

	var canvas = this[0];
	var ctx = canvas.getContext("2d");

	var graph = this.graph = params.graph || new Springy.Graph();
	var layout = this.layout = new Springy.Layout.ForceDirected(graph, stiffness, repulsion, damping, minEnergyThreshold);

	// calculate bounding box of graph layout.. with ease-in
	var currentBB = layout.getBoundingBox();

	// convert to/from screen coordinates
	var toScreen = function(p) {
		var size = currentBB.topright.subtract(currentBB.bottomleft),
      sx = p.subtract(currentBB.bottomleft).divide(size.x).x * canvas.width,
      sy = p.subtract(currentBB.bottomleft).divide(size.y).y * canvas.height;
		return new Springy.Vector(sx, sy);
	};

	var fromScreen = function(s) {
		var size = currentBB.topright.subtract(currentBB.bottomleft),
      px = (s.x / canvas.width) * size.x + currentBB.bottomleft.x,
      py = (s.y / canvas.height) * size.y + currentBB.bottomleft.y;
		return new Springy.Vector(px, py);
	};

  function graphShake(){
    layout.eachNode(function(node, point){
      point.p = Springy.Vector.random();
    });
  }

  function findNodeAt(coord){
    var nearest = {};
    graph.nodes.forEach(function(node){
      var distance = node.distanceSquared(coord.x, coord.y);
      if(nearest.distance === undefined || distance < nearest.distance)
        if(node.containsPoint(coord.x, coord.y))
          nearest = {
            node:node,
            distance:distance
          };
    });
    return nearest.node;
  }

	// half-assed drag and drop
	var selected = [];
  var edgeSelected = null;
	var dragged = null;
  var moved = 0;
  var selection = null;

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
      if(node.bb.x > x1 && node.bb.x < x2 && node.bb.y > y1 && node.bb.y < y2){
        var dx = selection.start.x - node.bb.x, dy = selection.start.y - node.bb.y;
        array.push({ distance: dx*dx + dy*dy, node: node });
      }
    });
    array.sort(function(a, b){
      return b.distance - a.distance;
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
        else
          for(var j=0; j<selected.length; j++)
            if(selected[j] === edge.source || selected[j] === edge.target || (selected[j].data.neighbors[ edge.source.id ] && selected[j].data.neighbors[ edge.target.id ]) )
              selectedEdges.push(edge);
      }
      nodeSelected(selected, selectedEdges);
    }
  }

  //Pointer actions
  function pointerStart(coord, selectType){
    if(dragged)
      dragged.point.active = false;
    var node = findNodeAt(coord);
    if(!node){
      if(!selectType || selectType === "replace"){
        clearSelected();
        updateNodesSelected();
      }
      if(selectType)
        selection = { start: coord, before:selected, type:selectType };
    }
    else{
      var point = fromScreen(coord);
      dragged = { node:node, point:layout.point(node) };
      dragged.offset = { x: dragged.point.p.x - point.x, y: dragged.point.p.y - point.y };
      dragged.coord = coord;
      dragged.point.active = true;
      dragged.point.m = activeMass;
    }
    moved = 0;
		renderer.start();
  }
  
  function pointerMove(coord, selectType){
    var point = fromScreen(coord);
		if (dragged !== null) {
      var dx = dragged.coord.x - coord.x, dy = dragged.coord.y - coord.y;
      moved += Math.sqrt(dx*dx + dy*dy) | 0;
      dragged.coord = coord;
			dragged.point.p.x = point.x + dragged.offset.x;
			dragged.point.p.y = point.y + dragged.offset.y;
      dragged.point.m = activeMass;
      dragged.point.active = true;
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
    if(e.shiftKey || e.ctrlKey)
      return;
    if(moved < 10 && dragged && dragged.node.isSelected()){
      selectedOpen(dragged.node);
      pointerEnd();
    }
	});
  
  $(canvas).on('dblclick', function(e) {
    e.preventDefault();
    if(e.shiftKey || e.ctrlKey)
      return;
		var pos = $(canvas).offset(),
      node = findNodeAt({x: e.pageX - pos.left, y: e.pageY - pos.top });
    if(node && node.isSelected())
      selectedOpen(node);
	});
  $('body').on('keyup', function(e){
    switch(e.which){
      case 27: //Escape
        e.preventDefault();
        clearSelected()
        if(nodeSelected){
          nodeSelected(selected);
        }
        break;
      case 32: //Space Bar
        graphShake();
        break;
      default:
        break;
    }
  });
  $(canvas).on('touchstart', function(e){
    e.preventDefault();
		var pos = $(canvas).offset(),
      event = window.event;
    pointerStart({x: event.touches[0].pageX - pos.left, y: event.touches[0].pageY - pos.top});
  });
  $(canvas).on('touchmove', function(e) {
    e.preventDefault();
    var event = window.event,
      pos = $(canvas).offset();
    pointerMove({x: event.touches[0].pageX - pos.left, y: event.touches[0].pageY - pos.top});
  });
  $(canvas).on('touchend',function(e) {
    e.preventDefault();
    pointerEnd(true, "toggle");
  });
  $(canvas).on('touchleave touchcancel',function(e) {
    e.preventDefault();
    pointerEnd(false, "toggle");
	});
	$(window).on('touchend',function(e) {
    pointerEnd(false, "toggle");
	});

	$(canvas).on('mousedown', function(e) {
    if(e.button === 2)
      return;
    e.preventDefault();
		var pos = $(canvas).offset();
    pointerStart({x: e.pageX - pos.left, y: e.pageY - pos.top}, selectType(e));
	});
	$(window).on('mousemove', function(e) {
    e.preventDefault();
		var pos = $(canvas).offset();
    pointerMove({x: e.pageX - pos.left, y: e.pageY - pos.top}, selectType(e));
	});
  $(window).on('mouseup',function(e) {
    e.preventDefault();
    pointerEnd(true, selectType(e));
  });
	$(canvas).on('mousedown mousemove mouseenter mouseleave',function(e) {
    var state = '';
    if(selection)
      state = 'selecting'
    else if(dragged != null)
      state = 'dragging';
    else{
      var pos = $(canvas).offset();
      if(findNodeAt({x: e.pageX - pos.left, y: e.pageY - pos.top}))
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

  nodeImageContextQueue.list = [];
  nodeImageContextQueue.todo = {};
  nodeImageContextQueue.add = function(id, callback){
    nodeImageContextQueue.todo[id] = callback;
    nodeImageContextQueue.list.push(id);
    if(!nodeImageContextQueue.timeout)
      nodeImageContextQueue.next();
  }
  nodeImageContextQueue.next = function(){
    if(nodeImageContextQueue.list.length === 0)
      return;
    var id = nodeImageContextQueue.list.shift();
    nodeImageContextQueue.timeout = setTimeout(function(){
      nodeImageContextQueue.todo[id].call(null)
      delete nodeImageContextQueue.timeout;
      delete nodeImageContextQueue.todo[id];
      nodeImageContextQueue.next();
    }, 1);
  }

  function addPortaitContexts(src, image, color){
    var canvas = document.createElement('canvas'),
        context = canvas.getContext('2d'),
        barHeight = Math.max(2, (image.height/10) | 0);
    canvas.width = canvas.height = image.width;
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    context.fillStyle = color;
    context.fillRect(0, canvas.height - barHeight, canvas.width, barHeight);
    if(nodeImageContexts[src] === undefined)
      nodeImageContexts[src] = [];
    nodeImageContexts[src].push({
      image:image,
      canvas:canvas
    });
  }

  var placeholders={};
  var placeholderHitbox = getHitbox(getPlaceholder(220));

  //Used the svg path from here and just filled the path
  //https://upload.wikimedia.org/wikipedia/en/b/b9/No_free_portrait.svg
  function getDefaultPlaceholder(){
    if(!placeholders['default']){
      var canvas = document.createElement('canvas'),
        context = canvas.getContext('2d'),
        coords = [3.5709275,215.81378,3.7352275,204.03019,3.8497975,199.05392,3.5005675,183.77748,11.214111,174.15409,38.3674,169.74066,45.785393,167.0981,55.358378,159.98075,66.203698,153.92378,75.552667,148.56151,80.7154,145.60034,80.782546,135.45005,80.404668,128.63362,78.689369,118.98009,77.782686,110.65561,70.86354,103.56735,70.47649,101.54341,69.346365,96.899211,65.948685,90.832271,63.662168,80.636072,54.650066,68.010083,56.914311,61.532735,62.944238,44.282973,57.676043,37.272904,61.378834,35.798494,69.823479,32.435953,72.10706,25.082426,79.841538,17.698566,102.43887,13.411138,98.965362,1.9932189,115.84961,4.1987589,136.77696,6.9324259,125.2515,10.014792,139.60507,17.279644,157.23926,26.204921,146.73196,27.108963,162.83032,50.739759,172.38972,64.771999,153.76819,65.728581,158.59298,78.146165,163.04993,89.617072,152.54354,91.572613,147.24294,104.12579,142.15767,116.16899,138.96668,119.70997,144.82195,135.58386,150.25927,150.32462,159.28667,143.58938,179.677,165.66778,184.85448,171.27389,203.45549,164.48784,216.26305,180.85898,216.25506,189.25148,216.44185,198.19473,216.49943,216.08121,159.09474,215.87646,3.5709275,215.81378,3.5709275,215.81378];
      canvas.height = canvas.width = 220;
      context.fillStyle = "#999";
      context.beginPath();
      context.moveTo(coords[0], coords[1]);
      for(var i=2; i<coords.length; i+=2)
        context.lineTo(coords[i], coords[i+1]);
      context.closePath();
      context.fill();
      placeholders['default'] = canvas;
    }
    return placeholders['default']
  }
  function getPlaceholder(size, color){
    var id = (color)? size + '_' + color: size;
    if(!placeholders[id]){
      var canvas = document.createElement('canvas'),
        context = canvas.getContext('2d'),
        barHeight = Math.max(2, (size / 10) | 0),
        placeholder = getDefaultPlaceholder();
      canvas.height = canvas.width = size;
      context.drawImage(placeholder, 0, 0, canvas.width, canvas.height);
      context.fillStyle = color || "#000";
      context.fillRect(0, canvas.height - barHeight, canvas.width, barHeight);
      placeholders[id] = canvas;
    }
    return placeholders[id];
  }

  function getHitbox(image){
    var size = image.width, 
      imageData = image.getContext('2d').getImageData(0, 0, size, size), 
      data = imageData.data, 
      x, 
      y,
      opaque = {};
    for(x=0; x<size; x++){
      opaque[x] = {};
      for(y=0; y<size; y++)
        if(data[(y*size*4) + x*4 + 3] > 127)
          opaque[x][y] = true;
    }
    return { size:size, opaque:opaque };
  }

  Springy.Node.prototype.addHitbox = function(image) {
    if(this.hitbox !== undefined)
      return;
    this.hitbox = getHitbox(image);
  }

  Springy.Node.prototype.getHitbox = function() {
    return this.hitbox || placeholderHitbox;
  }

  //we cache the best sized portrait with type bar
  Springy.Node.prototype.getPortraitImage = function(size) {
    var portrait, img = this.data.image, color = this.data.color || "#111111", node = this;
    size = size | 0;
    if(img){
      var src = img.src;
      if (src in nodeImages) {
        if (nodeImages[src].loaded) {
          //sample down for better antialiasing
          var contexts = nodeImageContexts[src], context, target = ceilPower2(size);
          for(var i=0; i < contexts.length; i++)
            if(contexts[i].canvas.width <= target){
              context = contexts[i];
              break;
            }
          //if we are too big, use the smallest one, and then resize with timer,
          // and only do one at a time
          if(context === undefined){
            context = contexts[contexts.length - 1];
            if(!nodeImageContextQueue.todo[src]){
              nodeImageContextQueue.add(src, function(){
                var resizeCanvas = document.createElement('canvas'),
                    resizeContext = resizeCanvas.getContext('2d');
                resizeCanvas.width = resizeCanvas.height = context.image.width >> 1;
                resizeContext.drawImage(context.image, 0, 0, resizeCanvas.width, resizeCanvas.height);
                addPortaitContexts(src, resizeCanvas, color);
              });
            }
          }
          portrait = context.canvas;
        }
      }
      else{
        nodeImages[src] = {};
        var image = new Image();
        nodeImages[src].object = image;
        image.addEventListener("load", function () {
          nodeImages[src].loaded = true;
          addPortaitContexts(src, image, color);
        });
        image.src = src;
      }
    }
    if(!portrait)
      portrait = getPlaceholder(size, color);
    else
      node.addHitbox(portrait);
    return portrait;
  }

  Springy.Node.prototype.getPortraitTextImage = function() {
    if(!this.textImage){
      var canvas = document.createElement('canvas'),
        context = canvas.getContext('2d'),
        text = this.data.label.toUpperCase();

      context.font = nodeFont;

      var textWidth = context.measureText(text).width;
      var textHeight = 16;

      canvas.width = (textWidth + 6) | 0;
      canvas.height = (textHeight + 4) | 0;

      //draw the text background
      context.fillStyle = "rgba(0, 0, 0, 0.5)";
      context.fillRect(0, 0, canvas.width, canvas.height);
      //draw the name
      context.font = nodeFont;
      context.fillStyle = "#ffffff";
      context.textAlign = "left";
      context.textBaseline = "top";
      context.shadowColor = "#000";
      context.shadowOffsetX = 1;
      context.shadowOffsetY = 1;
      context.fillText(text, 3, 0);

      this.textImage = canvas; 
    }
    return this.textImage;
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
        dragged.point.p.x = point.x + dragged.offset.x;
        dragged.point.p.y = point.y + dragged.offset.y;
        dragged.point.m = activeMass;
      }
		},
    function processNode(node, p) {
      var s = toScreen(p), 
        x = (s.x | 0), 
        y = (s.y | 0), 
        size = node.getSize(),
        fullSize = size | 0, 
        halfSize = (size / 2) | 0;
      node.setBoundingBox(x - halfSize, y - halfSize, fullSize);
    },
		function drawEdge(edge, p1, p2) {
      var point1 = toScreen(p1);
      var point2 = toScreen(p2);
      
			var normal = new Springy.Vector(point2.x-point1.x, point2.y-point1.y).normal().normalise();
			var from = graph.getEdges(edge.source, edge.target);
			var to = graph.getEdges(edge.target, edge.source);

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
      
			var total = from.length + to.length;

			// Figure out edge's position in relation to other edges between the same nodes
			var n = 0;
			for (var i=0; i<from.length; i++) {
				if (from[i].id === edge.id) {
					n = i;
				}
			}

			//change default to  10.0 to allow text fit between edges
			var spacing = Math.min(Math.max(4, Math.min(window.innerWidth, window.innerHeight)/50), 12);

			// Figure out how far off center the line should be drawn
			var offset = normal.multiply(-((total - 1) * spacing)/2.0 + (n * spacing));
			var s1 = toScreen(p1).add(offset);
			var s2 = toScreen(p2).add(offset);
      var weight = (selected.length > 1 && isSelected === 1)? 2: 1.0;
      var width = Math.max(weight *  2, 0.1);
      var arrowWidth = 1 + width;
      var arrowLength = 8;
      var overlapping = edge.target.overlapping(edge.source);
      var lineStart = overlapping? s1: edge.source.intersectLine(s2, s1, -1);
      var lineEnd =  edge.target.intersectLine(s1, s2, arrowLength);
      var arrowStart = lineEnd.add( lineEnd.subtract(lineStart).normalise().multiply( arrowLength * 0.75 ) )
			var stroke = (edge.data.color !== undefined) ? edge.data.color : '#000000';
      var alpha = (isSelected === 0)? 0.1: (isSelected === 0.5)? 0.5: 1.0;

      ctx.save();

      //settings
			ctx.lineWidth = width;
      ctx.strokeStyle = stroke;
      ctx.fillStyle = stroke;
      ctx.globalAlpha = alpha;

      //line
			ctx.beginPath();
			ctx.moveTo(lineStart.x, lineStart.y);
			ctx.lineTo(lineEnd.x, lineEnd.y);
			ctx.stroke();

			// arrow
			ctx.translate(arrowStart.x, arrowStart.y);
			ctx.rotate(Math.atan2(point2.y - point1.y, point2.x - point1.x));
			ctx.beginPath();
			ctx.moveTo(-arrowLength, arrowWidth);
			ctx.lineTo(0, 0);
			ctx.lineTo(-arrowLength, -arrowWidth);
			ctx.lineTo(-arrowLength * 0.8, -0);
			ctx.closePath();
			ctx.fill();
      
      ctx.restore();
		},
		function drawNode(node, p) {
      if(node.isSelected())
        return;
    
      var size = node.bb.size;
      if(edgeSelected)
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
      node.image = node.getPortraitImage(size);
      ctx.drawImage(node.image, node.bb.left, node.bb.top, size, size);
		},
		function drawNodeOverlay(node, p) {
      if (!node.isSelected())
          return;
    
      var size = node.bb.size;
      ctx.globalAlpha = 1.0;

      //draw the portrait
      node.image = node.getPortraitImage(size);
      ctx.drawImage(node.image, node.bb.left, node.bb.top, size, size);

      //draw the portrait text
      var text = node.getPortraitTextImage();
      ctx.drawImage(text, 
        Math.min(Math.max(0, node.bb.x - (text.width / 2) | 0), canvas.width - text.width), 
        Math.min(Math.max(0, node.bb.y - text.height - (size / 2) | 0), canvas.height - text.height), 
        text.width, text.height);
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
        ctx.lineWidth = 1;
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
    this.bb = { left:x, top:y, right:x+size, bottom:y+size, x:(x+size/2)|0, y:(y+size/2)|0, size:size };
  }

  //return true if inside BB and not over a 0 opacity pixel
  Springy.Node.prototype.containsPoint = function(x, y) {
    if(this.bb){
      var hitbox = this.getHitbox(),
        px = (hitbox.size * (x - this.bb.left) / this.bb.size) | 0,
        py = (hitbox.size * (y - this.bb.top) / this.bb.size) | 0;
      if(hitbox.opaque[px])
        return hitbox.opaque[px][py] === true;
    }
    return false;
  }

  //check bboxes to see if they overlap
  Springy.Node.prototype.overlapping = function(node) {
    return this.bb && node.bb &&
      this.bb.left < node.bb.right && 
      this.bb.right > node.bb.left &&
      this.bb.top < node.bb.bottom && 
      this.bb.bottom > node.bb.top;
  }

  Springy.Node.prototype.distanceSquared = function(x, y) {
    if(!this.bb)
      return null;
    var dx = this.bb.x - x, dy = this.bb.y - y;
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
    var canvasSize = Math.min($(canvas).width(), $(canvas).height()),
      size = Math.min(Math.max(16, canvasSize >> 4), 128);
    if(this.isSelected())
      size *= 1.5;
    return size;
  }

  Springy.Node.prototype.intersectLine = function(start, end, padding){
    if(!this.bb)
      return end;

    //find the fast intersect
    var size = this.getSize(), 
      halfSize = (size >> 1) | 0,
      point = intersect_line_box(start, end, {x: this.bb.left, y: this.bb.top}, size, size);
    if(!point)
      return end;

    var i, direction = end.subtract(point), 
      delta = direction.normalise(),
      distance = direction.magnitude();
    for(i=0; i < distance && !this.containsPoint(point.x, point.y); i++){
      point.x += delta.x;
      point.y += delta.y;
    }

    return point.subtract(delta.multiply(padding));
  }

  function intersect_line_box(start, end, topleft, size) {
    var tl = {x: topleft.x, y: topleft.y};
    var tr = {x: topleft.x + size, y: topleft.y};
    var bl = {x: topleft.x, y: topleft.y + size};
    var br = {x: topleft.x + size, y: topleft.y + size};
    var result;
    if (result = intersect_line_line(start, end, tl, tr)) { return result; } // top
    if (result = intersect_line_line(start, end, tr, br)) { return result; } // right
    if (result = intersect_line_line(start, end, br, bl)) { return result; } // bottom
    if (result = intersect_line_line(start, end, bl, tl)) { return result; } // left
    return false;
  }

  function intersect_line_line(p1, p2, p3, p4) {
    var denom = ((p4.y - p3.y)*(p2.x - p1.x) - (p4.x - p3.x)*(p2.y - p1.y));
    // lines are parallel
    if (denom === 0) {
      return false;
    }
    var ua = ((p4.x - p3.x)*(p1.y - p3.y) - (p4.y - p3.y)*(p1.x - p3.x)) / denom;
    var ub = ((p2.x - p1.x)*(p1.y - p3.y) - (p2.y - p1.y)*(p1.x - p3.x)) / denom;
    if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
      return false;
    }
    return new Springy.Vector(p1.x + ua * (p2.x - p1.x), p1.y + ua * (p2.y - p1.y));
  }

  function ceilPower2(number){
    ceilPower2 = function(number){
      if(ceilPower2.list[number] === undefined){
        var i = 1;
        while(i < number)
          i = i << 1;
        ceilPower2.list[number] = i;
      }
      return ceilPower2.list[number];
    }
    ceilPower2.list = {};
    return ceilPower2(number);
  }

  renderer.start();
	return this;
}

})();
