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
	var currentBB = layout.getBoundingBox();
	var targetBB = {bottomleft: new Springy.Vector(-2, -2), topright: new Springy.Vector(2, 2)};

	// auto adjusting bounding box
	Springy.requestAnimationFrame(function adjust() {
		targetBB = layout.getBoundingBox();
		// current gets 20% closer to target every iteration
		currentBB = {
			bottomleft: currentBB.bottomleft.add( targetBB.bottomleft.subtract(currentBB.bottomleft)
				.divide(10)),
			topright: currentBB.topright.add( targetBB.topright.subtract(currentBB.topright)
				.divide(10))
		};

		Springy.requestAnimationFrame(adjust);
	});

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

	// half-assed drag and drop
	var selected = null;
	var dragged = null;
  var moved = 0;

  function pointerStart(point){
    moved = 0;
    var o = layout.nearest(point);
    if(o.node !== null){
      if(o.distance > 1){
        selected = dragged = null;
        renderer.start();
        return;
      }
      dragged = o;
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
  
  function pointerEnd(point){
    if(dragged != null){
      console.log(moved)
      if(true){//moved < 10){
        selected = dragged;
        if (nodeSelected){
          nodeSelected(selected.node);
        }
      }
      dragged = null;
    }
  }

  this.on('dblclick', function(e) {
    e.preventDefault();
		var pos = jQuery(this).offset();
		var p = fromScreen({x: e.pageX - pos.left, y: e.pageY - pos.top});
		var o = layout.nearest(p);
    if(selected && o.node.id === selected.node.id)
      if (o.node && o.node.data && o.node.data.ondoubleclick) {
        o.node.data.ondoubleclick();
      }
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
  $(canvas).on('touchend touchleave touchcancel',function(e) {
    e.preventDefault();
    var event = window.event,
      pos = $(canvas).offset(),
      p = fromScreen({x: event.touches[0].pageX - pos.left, y: event.touches[0].pageY - pos.top});
    pointerEnd(p);
	});
	$(window).on('touchend',function(e) {
    var event = window.event,
      pos = $(canvas).offset(),
      p = fromScreen({x: event.touches[0].pageX - pos.left, y: event.touches[0].pageY - pos.top});
    pointerEnd(p);
	});
	$(canvas).on('mousedown', function(e) {
    e.preventDefault();
		var pos = $(canvas).offset(),
      p = fromScreen({x: e.pageX - pos.left, y: e.pageY - pos.top});
    pointerStart(p);
	});
	$(canvas).on('mousemove', function(e) {
    e.preventDefault();
		var pos = $(canvas).offset()
      p = fromScreen({x: e.pageX - pos.left, y: e.pageY - pos.top});
    pointerMove(p);
	});
	$(canvas).on('mouseup mouseleave',function(e) {
    e.preventDefault();
		var pos = $(canvas).offset()
      p = fromScreen({x: e.pageX - pos.left, y: e.pageY - pos.top});
    pointerEnd(p);
	});
  
	$(canvas).on('mousemove mouseenter mouseleave',function(e) {
		var pos = $(canvas).offset()
      point = fromScreen({x: e.pageX - pos.left, y: e.pageY - pos.top}),
      o = layout.nearest(point),
      cursor = 'auto';
    if(o.node !== null && o.distance <= 1)
        cursor = 'pointer';
    $(canvas).css('cursor', cursor);
	});

  function getImageBySize(img, size){
    if(img === undefined)
      return;
    var src = img.src;
    if (src in nodeImages) {
      if (nodeImages[src].loaded) {
        //sample down for better antialiasing
        var contexts = nodeImageContexts[src], image;
        for(var i=0; i < contexts.length; i++)
          if(contexts[i].width < (size << 1)){
            image = contexts[i];
            break;
          }
        //if we are too big, use the smallest one, and then resize with timer,
        // and only do one at a time
        if(image === undefined){
          image = contexts[contexts.length - 1];
          if(nodeImageContextTimeouts[src] === undefined){
            nodeImageContextTimeouts[src] = setTimeout(function(){
              var canvas = document.createElement('canvas'),
                  context = canvas.getContext('2d');
              canvas.width = canvas.height = image.width >> 1;
              context.drawImage(image, 0, 0, canvas.width, canvas.height);
              contexts.push(canvas);
              delete nodeImageContextTimeouts[src]
            }, Math.random() * 250);
          }
        }
        return image;
      }
    }else{
      nodeImages[src] = {};
      var img = new Image();
      nodeImages[src].object = img;
      img.addEventListener("load", function () {
        nodeImages[src].loaded = true;
        nodeImageContexts[src] = [ img ];
      });
      img.src = src;
    }
  }

	Springy.Node.prototype.getSize = function() {
    var canvasSize = Math.min($(canvas).width(), $(canvas).height()),
      size = Math.min(Math.max(16, canvasSize / 20.0), 64);
    if(selected && selected.node.id === this.id)
      size *= 1.5;
    return size;
	}

	var renderer = this.renderer = new Springy.Renderer(layout,
		function clear() {
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
      if(selected && selected.node){
        if(selected.node === edge.source || selected.node === edge.target)
          isSelected = true;
        if(selected.node.data.neighbors[ edge.source.id ] && selected.node.data.neighbors[ edge.target.id ])
          isSelected = true;
      }
      
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

			ctx.lineWidth = Math.max(weight *  2, 0.1);
      
			var arrowWidth = 1 + ctx.lineWidth;
      var arrowLength = 8;
      var directional = (edge.data.directional !== undefined) ? edge.data.directional : true;
      var lineEnd = (directional)? intersection.subtract(direction.normalise().multiply(arrowLength * 0.5)): s2;

      ctx.globalAlpha= (selected !== null && !isSelected)? 0.25: 1.0;
			ctx.strokeStyle = stroke;
			ctx.beginPath();
			ctx.moveTo(s1.x, s1.y);
			ctx.lineTo(lineEnd.x, lineEnd.y);
			ctx.stroke();

			// arrow
			if (directional) {
				ctx.save();
        ctx.globalAlpha= (selected !== null && !isSelected)? 0.25: 1.0;
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

			// label
			if (edge.data.label !== undefined && isSelected && spacing > 10) {
				text = edge.data.label
				ctx.save();
				ctx.textAlign = "center";
				ctx.textBaseline = "top";
				ctx.font = (edge.data.font !== undefined) ? edge.data.font : edgeFont;
				ctx.fillStyle = "#000000";
				var angle = Math.atan2(s2.y - s1.y, s2.x - s1.x);
				var displacement = -8;
				if (edgeLabelsUpright && (angle > Math.PI/2 || angle < -Math.PI/2)) {
					displacement = 8;
					angle += Math.PI;
				}
				var textPos = s1.add(s2).divide(2).add(normal.multiply(displacement));
				ctx.translate(textPos.x, textPos.y);
				ctx.rotate(angle);
        ctx.shadowColor = "#fff";
        ctx.shadowOffsetX = 0.5;
        ctx.shadowOffsetY = 0.5;
				ctx.fillText(text, 0,-2);
				ctx.restore();
			}
      ctx.globalAlpha=1.0;
		},
		function drawNode(node, p) {
      if(selected !== null && selected.node !== null && selected.node.id === node.id)
        return;
    
			var s = toScreen(p);
			ctx.save();
      
			var contentSize = node.getSize();
      if(selected !== null && selected.node !== null){
        if(selected.node.id === node.id || selected.node.data.neighbors[ node.id ])
          ctx.globalAlpha = 1.0;
        else
          ctx.globalAlpha = 0.25;
      }
      else
        ctx.globalAlpha=1.0;
        
      //draw the portrait
      var image = getImageBySize(node.data.image, contentSize);
      if(image){
        ctx.drawImage(image, s.x - contentSize/2, s.y - contentSize/2, contentSize, contentSize);
      }
      //show the type
      ctx.fillStyle = (node.data.color !== undefined) ? node.data.color : "#111111";
      ctx.fillRect(s.x - contentSize/2, s.y + contentSize/2 - contentSize/10, contentSize, contentSize/10);
      
      ctx.globalAlpha=1.0;
			ctx.restore();
		},
		function drawNodeOverlay(node, p) {
      if (selected === null || selected.node === null || selected.node.id !== node.id)
        return;
    
			var s = toScreen(p);
			ctx.save();
      
      ctx.font = (node.data.font !== undefined) ? node.data.font : nodeFont;
			var contentSize = node.getSize();
      var padding = 2;
			var textWidth = ctx.measureText(node.data.label).width;
			var textHeight = 16 + padding;
      
      //draw the portrait
      var image = getImageBySize(node.data.image, contentSize);
      if(image){
        ctx.drawImage(image, s.x - contentSize/2, s.y - contentSize/2, contentSize, contentSize);
      }
      //show the type
      ctx.fillStyle = (node.data.color !== undefined) ? node.data.color : "#111111";
      ctx.fillRect(s.x - contentSize/2, s.y + contentSize/2 - contentSize/10, contentSize, contentSize/10);
      //draw the text background
      ctx.fillStyle = "rgba(0, 0, 0, 0.66)";
      ctx.fillRect(s.x - textWidth/2 - padding, s.y - contentSize/2 - textHeight, textWidth + padding*2, textHeight);
      //draw the name
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "left";
      ctx.textBaseline = "bottom";
      ctx.shadowColor = "#000";
      ctx.shadowOffsetX = 1;
      ctx.shadowOffsetY = 1;
      ctx.shadowBlur = 1;
      ctx.fillText(node.data.label, s.x - textWidth/2, s.y - contentSize/2);

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
