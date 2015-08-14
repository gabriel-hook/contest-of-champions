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
	var stiffness = params.stiffness || 400.0;
	var repulsion = params.repulsion || 400.0;
	var damping = params.damping || 0.5;
	var minEnergyThreshold = params.minEnergyThreshold || 0.00001;
	var nodeSelected = params.nodeSelected || null;
	var nodeImages = {};
	var nodeImageContexts = {};
	var nodeImageContextTimeouts = {};
	var edgeLabelsUpright = true;

	var canvas = this[0];
	var ctx = canvas.getContext("2d");

	var graph = this.graph = params.graph || new Springy.Graph();
	var layout = this.layout = new Springy.Layout.ForceDirected(graph, stiffness, repulsion, damping, minEnergyThreshold);

	// calculate bounding box of graph layout.. with ease-in
	var currentBB;

	// convert to/from screen coordinates
	var toScreen = function(p) {
		var size = currentBB.topright.subtract(currentBB.bottomleft);
		var sx = p.subtract(currentBB.bottomleft).divide(size.x).x * canvas.width;
		var sy = p.subtract(currentBB.bottomleft).divide(size.y).y * canvas.height;
		return new Springy.Vector(sx, sy);
	};

	var fromScreen = function(s) {
		var size = currentBB.topright.subtract(currentBB.bottomleft);
		var px = (s.x / canvas.width) * size.x + currentBB.bottomleft.x;
		var py = (s.y / canvas.height) * size.y + currentBB.bottomleft.y;
		return new Springy.Vector(px, py);
	};

  var edgeSelected = null;
  this.selectEdgeType=function(type){
    edgeSelected = type;
    selected = null;
    dragged = null;
    renderer.start();
  };

	// half-assed drag and drop
	var selected = null;
	var dragged = null;
  var moved = 0;

  function pointerStart(point){
    moved = 0;
    var nearest = layout.nearest(point);
    if(nearest.node !== null){
      if(nearest.distance > 1){
        selected = dragged = null;
        if(nodeSelected){
          nodeSelected();
        }
        renderer.start();
        return;
      }
      dragged = nearest;
      if (dragged.node !== null) {
        dragged.point.m = 10000.0;
      }
    }
		renderer.start();
  }
  
  function pointerMove(point){
		if (dragged !== null) {
      moved += toScreen(point).subtract(toScreen(dragged.point.p)).magnitude();
			dragged.point.p.x = point.x;
			dragged.point.p.y = point.y;
		}
		renderer.start();
  }
  
  function pointerEnd(clicked){
    if(dragged != null){
      if(moved < 10){
        edgeSelected = null;
        selected = dragged;
        if (nodeSelected){
          var selectedEdges = [];
          for(var i=0,edge; i<graph.edges.length; i++){
            edge = graph.edges[i];
            if(selected.node === edge.source || selected.node === edge.target || (selected.node.data.neighbors[ edge.source.id ] && selected.node.data.neighbors[ edge.target.id ]) )
              selectedEdges.push(edge);
          }
          nodeSelected(selected.node, selectedEdges);
        }
      }
      dragged = null;
    }
    else if(clicked)
      edgeSelected = null;
  }

  function selectedOpen(){
    if (selected.node && selected.node.data && selected.node.data.onOpen) {
      selected.node.data.onOpen();
    }
  }
  
  $(canvas).on('taphold', function(e) {
    e.preventDefault();
    if(moved < 10 && selected){
      selectedOpen();
    }
	});
  
  $(canvas).on('dblclick', function(e) {
    e.preventDefault();
		var pos = $(canvas).offset(),
      p = fromScreen({x: e.pageX - pos.left, y: e.pageY - pos.top}),
      nearest = layout.nearest(p);
    if(moved < 10 && selected && nearest.node.id === selected.node.id)
      selectedOpen();
	});

  $(canvas).on('touchstart', function(e){
    e.preventDefault();
		var pos = $(canvas).offset(),
      event = window.event,
      p = fromScreen({x: event.touches[0].pageX - pos.left, y: event.touches[0].pageY - pos.top});
    pointerStart(p);
  });
  $(canvas).on('touchmove', function(e) {
    e.preventDefault();
    var event = window.event,
      pos = $(canvas).offset(),
      p = fromScreen({x: event.touches[0].pageX - pos.left, y: event.touches[0].pageY - pos.top});
    pointerMove(p);
  });
  $(canvas).on('touchend',function(e) {
    e.preventDefault();
    pointerEnd(true);
  });
  $(canvas).on('touchleave touchcancel',function(e) {
    e.preventDefault();
    pointerEnd();
	});
	$(window).on('touchend',function(e) {
    pointerEnd();
	});

	$(canvas).on('mousedown', function(e) {
    e.preventDefault();
		var pos = $(canvas).offset(),
      p = fromScreen({x: e.pageX - pos.left, y: e.pageY - pos.top});
    pointerStart(p);
	});
	$(canvas).on('mousemove', function(e) {
    e.preventDefault();
		var pos = $(canvas).offset(),
      p = fromScreen({x: e.pageX - pos.left, y: e.pageY - pos.top});
    pointerMove(p);
	});
	$(canvas).on('mouseleave',function(e) {
    e.preventDefault();
    pointerEnd();
	});
  $(canvas).on('mouseup',function(e) {
    e.preventDefault();
    pointerEnd(true);
  });
	$(canvas).on('mousemove mouseenter mouseleave',function(e) {
    try{
  		var pos = $(canvas).offset(),
        point = fromScreen({x: e.pageX - pos.left, y: e.pageY - pos.top}),
        o = layout.nearest(point),
        cursor = 'auto';
      if(o.node !== null && o.distance <= 1)
          cursor = 'pointer';
      $(canvas).css('cursor', cursor);
    }
    catch(x){
      console.log(e);
    }
	});

  //we cache the best sized portrait with type bar
  function getImageBySize(img, size, color){
    if(img === undefined)
      return;

    function canvasFromImage(image){
      var canvas = document.createElement('canvas'),
          context = canvas.getContext('2d'),
          barHeight = Math.max(2, Math.floor(image.height/10));
      canvas.width = canvas.height = image.width;
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      context.fillStyle = color;
      context.fillRect(0, canvas.height - barHeight, canvas.width, barHeight);
      return canvas;
    }

    var src = img.src;
    if (src in nodeImages) {
      if (nodeImages[src].loaded) {
        //sample down for better antialiasing
        var contexts = nodeImageContexts[src], context;
        for(var i=0; i < contexts.length; i++)
          if(contexts[i].canvas.width < (size << 1)){
            context = contexts[i];
            break;
          }
        //if we are too big, use the smallest one, and then resize with timer,
        // and only do one at a time
        if(context === undefined){
          context = contexts[contexts.length - 1];
          if(nodeImageContextTimeouts[src] === undefined){
            nodeImageContextTimeouts[src] = setTimeout(function(){
              var resizeCanvas = document.createElement('canvas'),
                  resizeContext = resizeCanvas.getContext('2d');
              resizeCanvas.width = resizeCanvas.height = context.image.width >> 1;
              resizeContext.drawImage(context.image, 0, 0, resizeCanvas.width, resizeCanvas.height);
              contexts.push({
                image:resizeCanvas,
                canvas:canvasFromImage(resizeCanvas)
              });
              delete nodeImageContextTimeouts[src]
            }, Math.random() * 250);
          }
        }
        return context.canvas;
      }
    }else{
      nodeImages[src] = {};
      var img = new Image();
      nodeImages[src].object = img;
      img.addEventListener("load", function () {
        nodeImages[src].loaded = true;
        nodeImageContexts[src] = [{ 
          image:img,
          canvas:canvasFromImage(img)
        }];
      });
      img.src = src;
    }
  }

	Springy.Node.prototype.getSize = function() {
    var canvasSize = Math.min($(canvas).width(), $(canvas).height()),
      size = Math.min(Math.max(16, canvasSize >> 4), 128);
    if(selected && selected.node.id === this.id)
      size *= 1.5;
    return size;
	}

	var renderer = this.renderer = new Springy.Renderer(layout,
		function clear() {
      currentBB = layout.getBoundingBox();
			ctx.clearRect(0,0,canvas.width,canvas.height);
		},
		function drawEdge(edge, p1, p2) {
      var point1 = toScreen(p1);
      var point2 = toScreen(p2);
      
			var direction = new Springy.Vector(point2.x-point1.x, point2.y-point1.y);
			var normal = direction.normal().normalise();

			var from = graph.getEdges(edge.source, edge.target);
			var to = graph.getEdges(edge.target, edge.source);

      var isSelected = false;
      if(edgeSelected){
        if(edge.data.effect === edgeSelected)
          isSelected = true;
      }
      else if(selected && selected.node){
        if(selected.node === edge.source || selected.node === edge.target)
          isSelected = true;
        if(selected.node.data.neighbors[ edge.source.id ] && selected.node.data.neighbors[ edge.target.id ])
          isSelected = true;
      }
      else
        isSelected = true;
      
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

			var paddingX = 6;
			var paddingY = 6;
			var boxWidth = edge.target.getSize() + paddingX;
			var boxHeight = edge.target.getSize() + paddingY;

			var intersection = intersect_line_box(s1, s2, {x: point2.x-boxWidth/2.0, y: point2.y-boxHeight/2.0}, boxWidth, boxHeight);
			if (!intersection) {
				intersection = s2;
			}
			var stroke = (edge.data.color !== undefined) ? edge.data.color : '#000000';
			var weight = (isSelected) ? 1.5 : 1.0;

      //line
      ctx.save();
			ctx.lineWidth = Math.max(weight *  2, 0.1);
      
			var arrowWidth = 1 + ctx.lineWidth;
      var arrowLength = 8;
      var directional = (edge.data.directional !== undefined) ? edge.data.directional : true;
      var lineEnd = (directional)? intersection.subtract(direction.normalise().multiply(arrowLength * 0.5)): s2;
      var alpha = (!isSelected)? 0.1: 1.0;

      ctx.globalAlpha = alpha;
			ctx.strokeStyle = stroke;
			ctx.beginPath();
			ctx.moveTo(s1.x, s1.y);
			ctx.lineTo(lineEnd.x, lineEnd.y);
			ctx.stroke();
      ctx.restore();
			// arrow
			if (directional) {
				ctx.save();
        ctx.globalAlpha = alpha;
				ctx.fillStyle = stroke;
				ctx.translate(intersection.x, intersection.y);
				ctx.rotate(Math.atan2(point2.y - point1.y, point2.x - point1.x));
				ctx.beginPath();
				ctx.moveTo(-arrowLength, arrowWidth);
				ctx.lineTo(0, 0);
				ctx.lineTo(-arrowLength, -arrowWidth);
				ctx.lineTo(-arrowLength * 0.8, -0);
				ctx.closePath();
				ctx.fill();
				ctx.restore();
			}
		},
		function drawNode(node, p) {
      if(selected !== null && selected.node !== null && selected.node.id === node.id)
        return;
    
			var s = toScreen(p);
      ctx.save();
      
      if(edgeSelected){
        ctx.globalAlpha = (node.data.effects[edgeSelected])? 1.0: 0.25;
      }
      else if(selected !== null){
        ctx.globalAlpha = (selected.node.id === node.id || selected.node.data.neighbors[ node.id ])? 1.0: 0.25;
      } 

			var contentSize = node.getSize(),
        x = Math.floor(s.x - contentSize/2),
        y = Math.floor(s.y - contentSize/2),
        size = Math.floor(contentSize),
        color = (node.data.color !== undefined) ? node.data.color : "#111111";

      //draw the portrait
      var image = getImageBySize(node.data.image, size, color);
      if(image){
        ctx.drawImage(image, x, y, size, size);
      }
			ctx.restore();
		},
		function drawNodeOverlay(node, p) {
      if (selected === null || selected.node === null || selected.node.id !== node.id)
        return;
    
			var s = toScreen(p);
			ctx.save();

			var contentSize = node.getSize();
      var halfSize = Math.floor(contentSize/2),
        x = Math.floor(s.x) - halfSize,
        y = Math.floor(s.y) - halfSize,
        size = Math.floor(contentSize),
        color = (node.data.color !== undefined) ? node.data.color : "#111111";
      
      //draw the portrait
      var image = getImageBySize(node.data.image, contentSize, color);
      if(image){
        ctx.drawImage(image, x, y, size, size);
      }

      //cache the portrait title
      if(node.textImage === undefined){
        var canvas = document.createElement('canvas'),
          context = canvas.getContext('2d');

        context.font = nodeFont;

        var textWidth = context.measureText(node.data.label).width;
        var textHeight = 16;

        canvas.width = Math.floor(textWidth + 6);
        canvas.height = Math.floor(textHeight + 4);

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
        context.fillText(node.data.label, 3, 0);

        node.textImage = canvas; 
      }
      ctx.drawImage(node.textImage, 
        x + halfSize - Math.floor(node.textImage.width / 2), y, 
        node.textImage.width, node.textImage.height);


			ctx.restore();
    }
	);

	renderer.start();

	// helpers for figuring out where to draw arrows
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

	function intersect_line_box(p1, p2, p3, w, h) {
		var tl = {x: p3.x, y: p3.y};
		var tr = {x: p3.x + w, y: p3.y};
		var bl = {x: p3.x, y: p3.y + h};
		var br = {x: p3.x + w, y: p3.y + h};

		var result;
		if (result = intersect_line_line(p1, p2, tl, tr)) { return result; } // top
		if (result = intersect_line_line(p1, p2, tr, br)) { return result; } // right
		if (result = intersect_line_line(p1, p2, br, bl)) { return result; } // bottom
		if (result = intersect_line_line(p1, p2, bl, tl)) { return result; } // left

		return false;
	}

	return this;
}

})();
