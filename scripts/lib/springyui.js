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
	var nearest = null;
	var dragged = null;

  function pointerStart(point){
    var o = layout.nearest(point);
    if(o.node !== null){
      if(o.distance > 1){
        selected = nearest = dragged = null;
        renderer.start();
        return;
      }
    }
		selected = nearest = dragged = o;
		if (o.node !== null) {
			dragged.point.m = 10000.0;
			if (nodeSelected) {
				nodeSelected(o.node);
			}
		}
		renderer.start();
  }
  
  function pointerMove(point){
		nearest = layout.nearest(point);
		if (dragged !== null && dragged.node !== null) {
			dragged.point.p.x = point.x;
			dragged.point.p.y = point.y;
		}
		renderer.start();
  }
  
  function pointerEnd(point){
		dragged = null;
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
	$(canvas).on('mouseup',function(e) {
    e.preventDefault();
		var pos = $(canvas).offset()
      p = fromScreen({x: e.pageX - pos.left, y: e.pageY - pos.top});
    pointerEnd(p);
	});
	$(window).on('mouseup',function(e) {
		var pos = $(canvas).offset()
      p = fromScreen({x: e.pageX - pos.left, y: e.pageY - pos.top});
    pointerEnd(p);
	});

	Springy.Node.prototype.getSize = function() {
		var size = Math.min(Math.max(16, Math.min(window.innerWidth, window.innerHeight)/20), 64);
    
    return size;
	}

	var renderer = this.renderer = new Springy.Renderer(layout,
		function clear() {
			ctx.clearRect(0,0,canvas.width,canvas.height);
		},
		function drawEdge(edge, p1, p2) {
			var x1 = toScreen(p1).x;
			var y1 = toScreen(p1).y;
			var x2 = toScreen(p2).x;
			var y2 = toScreen(p2).y;

			var direction = new Springy.Vector(x2-x1, y2-y1);
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

			var paddingX = 6;
			var paddingY = 6;

			var s1 = toScreen(p1).add(offset);
			var s2 = toScreen(p2).add(offset);

			var boxWidth = edge.target.getSize() + paddingX;
			var boxHeight = edge.target.getSize() + paddingY;

			var intersection = intersect_line_box(s1, s2, {x: x2-boxWidth/2.0, y: y2-boxHeight/2.0}, boxWidth, boxHeight);

			if (!intersection) {
				intersection = s2;
			}

			var stroke = (edge.data.color !== undefined) ? edge.data.color : '#000000';

			var arrowWidth;
			var arrowLength;

			var weight = (isSelected) ? 1.5 : 1.0;

			ctx.lineWidth = Math.max(weight *  2, 0.1);
			arrowWidth = 1 + ctx.lineWidth;
			arrowLength = 8;

			var directional = (edge.data.directional !== undefined) ? edge.data.directional : true;

			// line
			var lineEnd;
			if (directional) {
				lineEnd = intersection.subtract(direction.normalise().multiply(arrowLength * 0.5));
			} else {
				lineEnd = s2;
			}

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
				ctx.rotate(Math.atan2(y2 - y1, x2 - x1));
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

			if (node.data.image !== undefined){
				var src = node.data.image.src;
				if (src in nodeImages) {
					if (nodeImages[src].loaded) {
            //sample down for better antialiasing
            var contexts = nodeImageContexts[src], image;
            for(var i=0; i < contexts.length; i++)
              if(contexts[i].width < contentSize * 2){
                image = contexts[i];
                break;
              }
            if(image === undefined){
              var lastImage = contexts[contexts.length - 1];
              do{
                // step 1
                var image = document.createElement('canvas'),
                    context = image.getContext('2d');
                image.width = lastImage.width * 0.5;
                image.height = lastImage.height * 0.5;
                context.drawImage(lastImage, 0, 0, image.width, image.height);
                lastImage = image;
              } while( image.width > contentSize * 2 )
            }
						ctx.drawImage(image, s.x - contentSize/2, s.y - contentSize/2, contentSize, contentSize);
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
      
      var padding = 2;
      
      ctx.textAlign = "left";
      ctx.textBaseline = "bottom";
      ctx.font = (node.data.font !== undefined) ? node.data.font : nodeFont;
      ctx.fillStyle = "rgba(0, 0, 0, 0.66)";
      ctx.opacity = 0.5;
      
			var contentWidth = ctx.measureText(node.data.label).width;
			var contentHeight = 16 + padding;
      var nodeHeight = node.getSize();
      ctx.fillRect(s.x - contentWidth/2 - padding, s.y - nodeHeight/2 - contentHeight, contentWidth + padding*2, contentHeight);
      
      ctx.fillStyle = "#fff";
      ctx.shadowColor = "#000";
      ctx.shadowOffsetX = 1;
      ctx.shadowOffsetY = 1;
      ctx.shadowBlur = 1;
      
      ctx.fillText(node.data.label, s.x - contentWidth/2, s.y - nodeHeight/2);

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
