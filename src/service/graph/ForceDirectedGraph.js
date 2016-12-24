import lang from '../../service/lang';
import { getImage } from '../../images';
import Layout from './Layout';
import Renderer from './Renderer';
import Graph from './Graph';
import Vector from './Vector';
import Node from './Node';

const EDGE_HISTORY_TRAIL_LENGTH = 8;

/* eslint-disable no-implicit-coercion */
/* eslint-disable no-param-reassign */
/* eslint-disable no-invalid-this */

export default function({
    stiffness = 400.0,
    repulsion = 400.0,
    damping = 0.5,
    minEnergyThreshold = 0.00001,
    nodeSelected = null,
    effectSelected = null,
    maxTeamSize = 5,
    activeMass = 500,
    graph = new Graph(),
}) {
    const canvas = this.canvas = document.createElement('canvas');
    const ctx = this.ctx = canvas.getContext('2d');

    //We can check to see if the font has been loaded before using.
    function ScaledNodeFont() {
        this.fontSize = 16 * pixelRatio;
        this.font = `${ this.fontSize }px Hanzel, sans-serif`;

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        context.font = `${ this.fontSize }px sans-serif`;
        const wrongSize = context.measureText('wE arE reaDY.').width;

        context.font = this.font;

        this.isReady = () => {
            if (!this.loaded && context.measureText('wE arE reaDY.').width !== wrongSize)
                this.loaded = true;
            return this.loaded;
        };
    }

    let nodeFont;
    let pixelRatio;
    let canvasState = {};
    let lastCanvasState = {};

    function resize() {
        if(!canvas.parentNode)
            return;
        //resize only when the value changes, so we don't get canvas blinking.
        if(lastCanvasState.width !== canvasState.width)
            canvas.width = canvasState.width;
        if(lastCanvasState.height !== canvasState.height)
            canvas.height = canvasState.height;
    }
    let resizeTimeout;

    function isActive() {
        let node = canvas;
        while(node && node.parentNode) {
            node = node.parentNode;
            if(node && node.className && node.className.indexOf('page--current') !== -1)
                return true;
        }
        return false;
    }

    this.update = (id, showStars, graph, top, left, width, height) => {
        if(graph && (this.id !== id || graph.forceUpdate)) {
            this.update.init = true;
            this.id = id;
            this.showStars = showStars;

            this.layout.graph = graph;
            this.layout.nodePoints = {};
            this.layout.edgeSprings = {};

            graph.forceUpdate = false;
            graph.eventListeners = this.graph.eventListeners;
            this.graph = graph;
            clearSelected();
        }
        if(width && height) {
            pixelRatio = window.devicePixelRatio || 1;
            nodeFont = new ScaledNodeFont();
            lastCanvasState = canvasState;
            canvasState = {
                top,
                left,
                width: width * pixelRatio,
                height: height * pixelRatio,
            };

            //resize with a max rate of every 50ms, so we don't get resize blinking.
            if (!resizeTimeout)
                resizeTimeout = setTimeout(() => {
                    resize();
                    resizeTimeout = null;
                }, 50);

            if(isActive() && this.id === id)
                this.renderer.start();
            else
                this.renderer.stop();
        }
    };

    function addEventListeners(element, events, listener) {
        events.split(' ').forEach((event) => element.addEventListener(event, function(...args) {
            if(!isActive())
                return;
            return listener.apply(this, args);
        }, true));
    }

    this.graph = graph;
    this.layout = new Layout(graph, stiffness, repulsion, damping, minEnergyThreshold);

    // calculate bounding box of graph layout.. with ease-in
    let currentBB = this.layout.getBoundingBox();

    // convert to/from screen coordinates
    function toScreen(point) {
        const size = currentBB.topright.clone().subtract(currentBB.bottomleft);
        const delta = point.clone().subtract(currentBB.bottomleft);
        return new Vector(delta.x / size.x * canvasState.width, delta.y / size.y * canvasState.height);
    }

    function fromScreen(point) {
        const size = currentBB.topright.clone().subtract(currentBB.bottomleft);
        return new Vector((point.x / canvasState.width) * size.x + currentBB.bottomleft.x, (point.y / canvasState.height) * size.y + currentBB.bottomleft.y);
    }

    function getCoordinate(x, y) {
        return new Vector(x, y).multiply(pixelRatio);
    }

    const graphShake = () => {
        this.layout.eachNode((node, point) => {
            point.p = Vector.random();
        });
    };

    // half-assed drag and drop
    let selected = [];
    let edgeSelected = null;
    let dragged = null;
    let moved = 0;
    let selection = null;
    let clicks = 0;
    let clickSource;

    this.selectEdgeType = (type) => {
        clearSelected();
        edgeSelected = type;
        if (dragged)
            dragged.point.active = false;
        dragged = null;
        effectSelected(type);
        renderer.start();
    };

    //Selection Modifications
    const addSelected = (node) => {
        const array = selected.slice(), index = array.indexOf(node);
        if (index !== -1)
            array.splice(index, 1);
        array.push(node);
        updateSelected(array);
    };
    const toggleSelected = (node) => {
        const array = selected.slice(), index = array.indexOf(node);
        if (index !== -1)
            array.splice(index, 1);
        else
            array.push(node);
        updateSelected(array);
    };
    const replaceSelected = (node) => {
        const index = selected.indexOf(node);
        if (index === -1)
            updateSelected([ node ]);
    };
    const boxSelected = (selectType) => {
        //select the first 5 closest to the start point and inside
        const x1 = Math.min(selection.start.x, selection.end.x) | 0;
        const y1 = Math.min(selection.start.y, selection.end.y) | 0;
        const x2 = x1 + Math.abs(selection.start.x - selection.end.x) | 0;
        const y2 = y1 + Math.abs(selection.start.y - selection.end.y) | 0;

        let array = [];
        this.graph.nodes.forEach((node) => {
            if (!node.bb)
                return;
            if (array.indexOf(node) !== -1)
                return;
            if (node.bb.center.x > x1 && node.bb.center.x < x2 && node.bb.center.y > y1 && node.bb.center.y < y2) {
                const dx = Math.abs(selection.start.x + selection.end.x) / 2 - node.bb.center.x;
                const dy = Math.abs(selection.start.y + selection.end.y) / 2 - node.bb.center.y;
                array.push({ distanceSquared: dx * dx + dy * dy, node });
            }
        });
        array.sort((a, b) => {
            return b.distanceSquared - a.distanceSquared;
        });
        array = array.map((element) => element.node);
        if (selectType === 'add') {
            for (let i = 0; i < selection.before.length; i++) {
                const index = array.indexOf(selection.before[ i ]);
                if (index !== -1)
                    array.splice(index, 1);
                array.push(selection.before[ i ]);
            }
        }
        if (selectType === 'toggle') {
            for (let i = 0; i < selection.before.length; i++) {
                const index = array.indexOf(selection.before[ i ]);
                if (index !== -1)
                    array.splice(index, 1);
                else
                    array.push(selection.before[ i ]);
            }
        }
        updateSelected(array);
    };

    const clearSelected = () => {
        edgeSelected = null;
        updateSelected([]);
    };
    const updateSelected = (array) => {
        if (array.length > maxTeamSize)
            array = array.slice(-maxTeamSize);

        for (let i = 0; i < selected.length; i++)
            selected[ i ].selected = false;

        selected = array;
        for (let i = 0; i < selected.length; i++) {
            const point = this.layout.point(selected[ i ]);
            if (point)
                point.m = activeMass;
            selected[ i ].selected = true;
        }
    };
    const updateNodesSelected = () => {
        if (nodeSelected) {
            const selectedEdges = [];
            for (let i = 0; i < this.graph.edges.length; i++) {
                const edge = this.graph.edges[ i ];
                if (selected.length > 1) {
                    for (let j = 0; j < selected.length; j++)
                        for (let k = 0; k < selected.length; k++)
                            if (selected[ j ] === edge.source && selected[ k ] === edge.target)
                                selectedEdges.push(edge);
                }
                else {
                    for (let j = 0; j < selected.length; j++)
                        if (selected[ j ] === edge.source ||
                            selected[ j ] === edge.target ||
                            (selected[ j ].data.neighbors[ edge.source.id ] && selected[ j ].data.neighbors[ edge.target.id ]))
                            selectedEdges.push(edge);
                }
            }
            nodeSelected(selected, selectedEdges);
        }
    };

    const findNodeAt = (coord) => {
        const nearest = {};
        this.graph.nodes.forEach((node) => {
            const distance = node.distanceSquared(coord.x, coord.y);
            if (nearest.distance === undefined || distance < nearest.distance) {
                let found;
                if (clickSource === 'touch') {
                    const radius = Math.max(32, node.bb.size);
                    found = (node.bb) ? distance < radius * radius : false;
                }
                else
                    found = node.containsPoint(coord);
                if (found) {
                    nearest.node = node;
                    nearest.distance = distance;
                }
            }
        });
        return nearest.node;
    };

    //Pointer actions
    const pointerStart = (coord, selectType, otherCoord) => {
        if (dragged)
            dragged.point.active = false;
        const node = findNodeAt(coord);
        if (!node) {
            if (selectType === 'replace' || clickSource === 'touch') {
                clearSelected();
                updateNodesSelected();
            }
            if (clickSource === 'touch') {
                if (coord && otherCoord) {
                    selection = { start: coord, end: otherCoord, before: selected, type: selectType };
                }
            }
            else if (selectType)
                selection = { start: coord, before: selected, type: selectType };
            clicks = 0;
        }
        else {
            if (node.isSelected())
                clicks++;
            const point = fromScreen(coord);
            dragged = { node, point: this.layout.point(node) };
            dragged.offset = new Vector(dragged.point.p.x - point.x, dragged.point.p.y - point.y);
            dragged.coord = coord;
            dragged.point.active = true;
            dragged.point.m = activeMass;
        }
        moved = 0;
        renderer.start();
    };

    const pointerMove = (coord, selectType, otherCoord) => {
        const point = fromScreen(coord);
        if (dragged !== null) {
            moved += coord.clone().subtract(dragged.coord).length();
            dragged.coord = coord;
            dragged.point.p = point.add(dragged.offset);
            dragged.point.m = activeMass;
            dragged.point.active = true;
        }
        else if (clickSource === 'touch') {
            if (coord && otherCoord) {
                selection.start = coord;
                selection.end = otherCoord;
                selection.type = selectType;
            }
        }
        else if (selection) {
            selection.end = coord;
            selection.type = selectType;
        }
        renderer.start();
    };

    const pointerEnd = (clicked, selectType) => {
        selection = null;
        if (dragged !== null) {
            if (moved < 10) {
                switch (selectType) {
                    case 'add': {
                        addSelected(dragged.node);
                        break;
                    }
                    case 'toggle': {
                        toggleSelected(dragged.node);
                        break;
                    }
                    case 'replace': {
                        replaceSelected(dragged.node);
                        break;
                    }
                }
                updateNodesSelected();
                edgeSelected = null;
            }
            dragged.point.active = false;
            dragged = null;
        }
        else if (clicked)
            edgeSelected = null;
    };

    function selectType(event) {
        return (event.shiftKey) ? 'add' : (event.ctrlKey) ? 'toggle' : 'replace';
    }

    addEventListeners(document.body, 'keyup', (e) => {
        if (e.which === 27) { // escape
            e.preventDefault();
            clearSelected();
            if (nodeSelected) {
                nodeSelected(selected);
            }
        }
        else if (e.which === 32) { // space bar
            e.preventDefault();
            graphShake();
        }
    });

    const tapHold = {
        handler: () => {
            const node = dragged && dragged.node;
            if (moved < 10 && node && node.isSelected() && node.data.onOpen) {
                node.data.onOpen();
                pointerEnd();
            }
        },
        timeout: 0,
        timeoutDelay: 1000,
    };

    addEventListeners(canvas, 'dblclick', (e) => {
        if (clickSource !== 'mouse' || clicks < 2 || e.shiftKey || e.ctrlKey)
            return;
        const node = findNodeAt(getCoordinate(e.pageX - canvasState.left, e.pageY - canvasState.top));
        if (moved < 10 && node && node.isSelected() && node.data.onOpen) {
            node.data.onOpen();
            pointerEnd();
        }
        e.preventDefault();
    });

    addEventListeners(canvas, 'touchstart', (e) => {
        clearTimeout(tapHold.timeout);
        if (window.event.touches.length === 1)
            tapHold.timeout = setTimeout(tapHold.handler, tapHold.timeoutDelay);
        clickSource = 'touch';
        const coord = getCoordinate(window.event.touches[ 0 ].pageX - canvasState.left, window.event.touches[ 0 ].pageY - canvasState.top);
        let otherCoord;
        if (window.event.touches.length > 1)
            otherCoord = getCoordinate(window.event.touches[ 1 ].pageX - canvasState.left, window.event.touches[ 1 ].pageY - canvasState.top);
        pointerStart(coord, 'toggle', otherCoord);
        e.preventDefault();
        e.stopPropagation();
        return false;
    });

    addEventListeners(canvas, 'touchmove', (e) => {
        clickSource = 'touch';
        const coord = getCoordinate(window.event.touches[ 0 ].pageX - canvasState.left, window.event.touches[ 0 ].pageY - canvasState.top);
        let otherCoord;
        if (window.event.touches.length > 1)
            otherCoord = getCoordinate(window.event.touches[ 1 ].pageX - canvasState.left, window.event.touches[ 1 ].pageY - canvasState.top);
        pointerMove(coord, 'toggle', otherCoord);
        e.preventDefault();
        e.stopPropagation();
        return false;
    });

    addEventListeners(canvas, 'touchend', (e) => {
        clearTimeout(tapHold.timeout);
        clickSource = 'touch';
        if (window.event.touches.length === 0)
            pointerEnd(true, 'toggle');
        e.preventDefault();
        e.stopPropagation();
        return false;
    });

    addEventListeners(canvas, 'touchleave touchcancel', (/* e */) => {
        clearTimeout(tapHold.timeout);
        clickSource = 'touch';
        pointerEnd(false, 'toggle');
        return false;
    });

    addEventListeners(window, 'touchend', (/* e */) => {
        clearTimeout(tapHold.timeout);
        clickSource = 'touch';
        pointerEnd(false, 'toggle');
        return false;
    });

    addEventListeners(canvas, 'mousedown', (e) => {
        if (e.button === 2)
            return;
        clickSource = 'mouse';
        pointerStart(getCoordinate(e.pageX - canvasState.left, e.pageY - canvasState.top), selectType(e));
        e.preventDefault();
    });

    addEventListeners(window, 'mousemove', (e) => {
        clickSource = 'mouse';
        pointerMove(getCoordinate(e.pageX - canvasState.left, e.pageY - canvasState.top), selectType(e));
        e.preventDefault();
    });

    addEventListeners(window, 'mouseup', (e) => {
        if (e.target !== canvas && !dragged && !selection)
            return;
        clickSource = 'mouse';
        pointerEnd(true, selectType(e));
        e.preventDefault();
    });

    addEventListeners(canvas, 'mousedown mousemove mouseenter mouseleave', (e) => {
        let state = '';
        if (selection)
            state = 'selecting';
        else if (dragged !== null)
            state = 'dragging';
        else {
            if (findNodeAt(getCoordinate(e.pageX - canvasState.left, e.pageY - canvasState.top)))
                state = 'hover';
        }
        switch (state) {
            case 'selecting': {
                canvas.className = 'selecting';
                break;
            }
            case 'dragging': {
                canvas.className = 'dragging';
                break;
            }
            case 'hover': {
                canvas.className = 'hover';
                break;
            }
            default: {
                canvas.className = '';
            }
        }
    });

    const portraitHitmasks = {};

    function getHitmask(src, image) {
        if (!portraitHitmasks[ src ]) {
            if (typeof image === 'function')
                image = image();
            const size = image.width;
            const imageData = image.getContext('2d').getImageData(0, 0, size, size);
            const data = imageData.data;
            const opaque = {};
            for (let x = 0; x < size; x++) {
                opaque[ x ] = {};
                for (let y = 0; y < size; y++)
                    opaque[ x ][ y ] = (data[ (y * size * 4) + x * 4 + 3 ] > 127) ? true : undefined;
            }
            portraitHitmasks[ src ] = { size, opaque };
        }
        return portraitHitmasks[ src ];
    }

    const portraitImages = {};
    const portraitImageResampleQueue = {
        list: [],
        todo: {},
    };
    portraitImageResampleQueue.insert = function(id, callback) {
        portraitImageResampleQueue.todo[ id ] = callback;
        portraitImageResampleQueue.list.unshift(id);
        if (!portraitImageResampleQueue.timeout)
            portraitImageResampleQueue.next();
    };
    portraitImageResampleQueue.next = function() {
        if (portraitImageResampleQueue.list.length === 0)
            return;
        const id = portraitImageResampleQueue.list.shift();
        const todo = portraitImageResampleQueue.todo[ id ];
        delete portraitImageResampleQueue.todo[ id ];
        portraitImageResampleQueue.timeout = setTimeout(() => {
            delete portraitImageResampleQueue.timeout;
            todo();
            portraitImageResampleQueue.next();
        }, 25);
    };

    function addPortaitImages(src, image, color) {
        //build the image
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        const barHeight = Math.max(2, (image.width / 10) | 0);
        canvas.width = canvas.height = image.width;
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        context.fillStyle = color;
        context.fillRect(0, canvas.height - barHeight, canvas.width, barHeight);
        if (portraitImages[ src ].portraits === undefined)
            portraitImages[ src ].portraits = [];
        portraitImages[ src ].portraits.push(canvas);
        portraitImages[ src ].loaded = true;

        const resampleWidth = image.width >> 1;
        if (resampleWidth >= 16) {
            const resampleCanvas = document.createElement('canvas');
            const resampleContext = resampleCanvas.getContext('2d');
            resampleCanvas.width = resampleCanvas.height = resampleWidth;
            resampleContext.drawImage(image, 0, 0, resampleWidth, resampleWidth);
            portraitImageResampleQueue.insert(src, () => addPortaitImages(src, resampleCanvas, color));
        }
    }

    const placeholders = {};
    const placeholderCoords = [
        //Used the svg path from here and just filled the path with bezier curves.
        //The original size of the svg path was 220x220 so scale to new size.
        //https://upload.wikimedia.org/wikipedia/en/b/b9/No_free_portrait.svg
        3.5709275, 215.81378,
        3.7352275, 204.03019, 3.8497975, 199.05392, 3.5005675, 183.77748,
        11.214111, 174.15409, 38.3674, 169.74066, 45.785393, 167.0981,
        55.358378, 159.98075, 66.203698, 153.92378, 75.552667, 148.56151,
        80.7154, 145.60034, 80.782546, 135.45005, 80.404668, 128.63362,
        78.689369, 118.98009, 77.782686, 110.65561, 70.86354, 103.56735,
        70.47649, 101.54341, 69.346365, 96.899211, 65.948685, 90.832271,
        63.662168, 80.636072, 54.650066, 68.010083, 56.914311, 61.532735,
        62.944238, 44.282973, 57.676043, 37.272904, 61.378834, 35.798494,
        69.823479, 32.435953, 72.10706, 25.082426, 79.841538, 17.698566,
        102.43887, 13.411138, 98.965362, 1.9932189, 115.84961, 4.1987589,
        136.77696, 6.9324259, 125.2515, 10.014792, 139.60507, 17.279644,
        157.23926, 26.204921, 146.73196, 27.108963, 162.83032, 50.739759,
        172.38972, 64.771999, 153.76819, 65.728581, 158.59298, 78.146165,
        163.04993, 89.617072, 152.54354, 91.572613, 147.24294, 104.12579,
        142.15767, 116.16899, 138.96668, 119.70997, 144.82195, 135.58386,
        150.25927, 150.32462, 159.28667, 143.58938, 179.677, 165.66778,
        184.85448, 171.27389, 203.45549, 164.48784, 216.26305, 180.85898,
        216.25506, 189.25148, 216.44185, 198.19473, 216.49943, 216.08121,
        159.09474, 215.87646, 3.5709275, 215.81378, 3.5709275, 215.81378,
    ];

    function getPlaceholder(size, color = '#000000') {
        const id = `${ size }_${ color || '' }`;
        if (!placeholders[ id ]) {
            let canvas;
            let context;
            if (!placeholders[ size ]) {
                const ratio = size / 220;
                canvas = document.createElement('canvas');
                context = canvas.getContext('2d');
                canvas.height = canvas.width = size;
                context.beginPath();
                context.moveTo(placeholderCoords[ 0 ] * ratio, placeholderCoords[ 1 ] * ratio);
                for (let i = 2; i < placeholderCoords.length; i += 6)
                    context.bezierCurveTo(
                        placeholderCoords[ i ] * ratio, placeholderCoords[ i + 1 ] * ratio,
                        placeholderCoords[ i + 2 ] * ratio, placeholderCoords[ i + 3 ] * ratio,
                        placeholderCoords[ i + 4 ] * ratio, placeholderCoords[ i + 5 ] * ratio
                    );
                context.closePath();
                context.lineWidth = 3;
                context.strokeStyle = '#868686';
                context.stroke();
                context.fillStyle = '#909090';
                context.fill();
                placeholders[ size ] = canvas;
            }
            const barHeight = Math.max(2, (size / 10) | 0);
            canvas = document.createElement('canvas');
            context = canvas.getContext('2d');
            canvas.height = canvas.width = size;
            context.drawImage(placeholders[ size ], 0, 0, canvas.width, canvas.height);
            context.fillStyle = color;
            context.fillRect(0, canvas.height - barHeight, canvas.width, barHeight);
            placeholders[ id ] = canvas;
        }
        return placeholders[ id ];
    }

    let getPortraitSizeTarget = (number) => {
        const list = {};
        getPortraitSizeTarget = (number) => {
            if (list[ number ] === undefined) {
                let i = 1;
                let last = 0;
                while (i !== number && i + (i - last) >> 1 < number) {
                    last = i;
                    i = i << 1;
                }
                list[ number ] = i;
            }
            return list[ number ];
        };
        return getPortraitSizeTarget(number);
    };

    //we cache the best sized portrait with type bar
    Node.prototype.setPortraitImage = function(size) {
        const src = this.data.image;
        const image = getImage(src);
        const color = this.data.color || '#111111';
        let portrait;
        let hitmask;
        if (image) {
            if (src in portraitImages) {
                if (portraitImages[ src ].loaded) {
                    //sample down for better anti-aliasing
                    const portraits = portraitImages[ src ].portraits;
                    const target = getPortraitSizeTarget(size);
                    for(let i = 0; i < portraits.length && portraits[ i ].width >= target; i++)
                        portrait = portraits[ i ];

                    //get hitmask from largest image
                    hitmask = getHitmask(src, portraits[ 0 ]);
                }
            }
            else if(!portraitImageResampleQueue.todo[ src ]) {
                portraitImages[ src ] = {
                    loaded: false,
                    portraits: [],
                };
                portraitImageResampleQueue.insert(src, () => addPortaitImages(src, image, color));
            }
        }
        if (!portrait) {
            portrait = getPlaceholder(size, color);
            hitmask = getHitmask('portrait', getPlaceholder(256));
        }
        this.image = portrait;
        this.hitmask = hitmask;
    };

    Node.prototype.setPortraitText = function(showStars) {
        if(!nodeFont) {
            return;
        }
        if (!this.text || this.text.font !== nodeFont || (!this.text.ready && this.text.ready !== nodeFont.isReady())) {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');

            const uid = this.data.label;
            const name = lang.string(`champion-${ uid }-shortname`, null) || lang.string(`champion-${ uid }-name`);
            const stars = showStars? `${ this.data.stars }★ `: '';
            const text = `${ stars }${ name }`;

            context.font = nodeFont.font;
            const paddingX = pixelRatio * (nodeFont.isReady() ? 6 : 3);
            const paddingTop = pixelRatio * (nodeFont.isReady() ? 4 : 3);
            const paddingBottom = pixelRatio * 3;
            const textWidth = context.measureText(text).width;
            const textHeight = nodeFont.fontSize;

            canvas.width = (textWidth + paddingX * 2) | 0;
            canvas.height = (textHeight + paddingTop + paddingBottom) | 0;

            //draw the text background
            context.fillStyle = 'rgba(0, 0, 0, 0.5)';
            context.fillRect(0, 0, canvas.width, canvas.height);
            //draw the name
            context.font = nodeFont.font;
            context.fillStyle = '#ffffff';
            context.textAlign = 'left';
            context.textBaseline = 'top';
            context.shadowColor = '#000';
            context.shadowOffsetX = 1 * pixelRatio;
            context.shadowOffsetY = 1 * pixelRatio;
            context.fillText(text, paddingX, paddingTop);

            this.text = canvas;
            this.text.font = nodeFont;
            this.text.ready = nodeFont.isReady();
        }
    };

    const renderer = this.renderer = new Renderer(this.layout,
        // clear
        () => {
            currentBB = this.layout.getBoundingBox();
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            if (selection && selection.start && selection.end) {
                boxSelected(selection.type);
                updateNodesSelected();
            }
            if (dragged) {
                const point = fromScreen(dragged.coord);
                dragged.point.p = point.add(dragged.offset);
                dragged.point.m = activeMass;
            }
        },
        // processNode
        (node, point) => {
            const s = toScreen(point),
                x = (s.x | 0),
                y = (s.y | 0),
                fullSize = node.getSize() | 0,
                halfSize = fullSize >> 1;
            //set images/bounds
            node.setPortraitText(this.showStars);
            node.setPortraitImage(fullSize);
            node.setBoundingBox(x - halfSize, y - halfSize, fullSize);

            const { size, topLeft, bottomRight } = node.bb;

            ctx.save();

            if (node.isSelected())
                ctx.globalAlpha = 1.0;
            else if (edgeSelected)
                ctx.globalAlpha = (node.data.effects[ edgeSelected ]) ? 1.0 : 0.25;
            else if (selected.length === maxTeamSize)
                ctx.globalAlpha = 0.25;
            else if (selected.length > 1)
                ctx.globalAlpha = (node.isSelectedNeighbor()) ? 0.75 : 0.25;
            else if (selected.length)
                ctx.globalAlpha = (node.isSelectedNeighbor()) ? 1.0 : 0.25;
            else
                ctx.globalAlpha = 1.0;

            ctx.fillStyle = '#c0c0c0';
            ctx.fillRect((topLeft.x + 2) | 0, bottomRight.y | 0, (size - 4) | 0, 3);

            ctx.restore();
        },
        // drawEdge
        (edge, pointStart, pointEnd) => {
            const p1 = toScreen(pointStart), p2 = toScreen(pointEnd);
            let isSelected = 0;
            if (edgeSelected) {
                if (edge.data.effect === edgeSelected)
                    isSelected = 1;
            }
            else if (selected.length === maxTeamSize) {
                if (edge.source.isSelected() && edge.target.isSelected())
                    isSelected = 1;
            }
            else if (selected.length > 1) {
                const sourceSelected = edge.source.isSelected(), targetSelected = edge.target.isSelected();
                if (sourceSelected && targetSelected)
                    isSelected = 1;
                else if (sourceSelected || targetSelected)
                    isSelected = 0.5;
                else if (edge.target.isSelectedNeighbor() && edge.source.isSelectedNeighbor())
                    isSelected = 0.5;
            }
            else if (selected.length) {
                if (edge.source.isSelected() || edge.target.isSelected())
                    isSelected = 1;
                if (edge.target.isSelectedNeighbor() && edge.source.isSelectedNeighbor())
                    isSelected = 0.5;
            }
            else
                isSelected = 1;

            const normal = p2.clone().subtract(p1).normal().normalise();
            const from = this.graph.getEdges(edge.source, edge.target);
            const to = this.graph.getEdges(edge.target, edge.source);
            const total = from.length + to.length;

            // Figure out edge's position in relation to other edges between the same nodes
            let n = 0;
            for (let i = 0; i < from.length; i++) {
                if (from[ i ].id === edge.id) {
                    n = i;
                }
            }

            //change default to  10.0 to allow text fit between edges
            const spacing = Math.min(Math.max(4, Math.min(window.innerWidth, window.innerHeight) / 50), 12) * pixelRatio;

            // Figure out how far off center the line should be drawn
            const offset = normal.multiply(-((total - 1) * spacing) / 2.0 + (n * spacing));
            const s1 = p1.clone().add(offset);
            const s2 = p2.clone().add(offset);
            const sdelta = s2.clone().subtract(s1).normalise();
            const weight = (selected.length > 1 && isSelected === 1) ? 2 : 1.0;
            const width = Math.max(weight * 1.5, 0.1) * pixelRatio;
            const arrowWidth = 1 + width;
            const arrowLength = arrowWidth * 4;
            const overlapping = edge.target.overlapping(edge.source);
            const halfArrow = sdelta.clone().multiply(arrowLength * 0.75);
            const sourceAbove = s1.y < s2.y;

            let lineStart;
            let lineEnd;
            let lineDiff;

            //get best line start/end
            if (overlapping) {
                if (sourceAbove) {
                    lineStart = s1.clone();
                    lineEnd = edge.target.intersection(s1, s2);
                }
                else {
                    lineStart = edge.source.intersection(s2, s1);
                    lineEnd = s2.clone();
                }
            }
            else {
                lineStart = edge.source.intersection(s2, s1);
                lineEnd = edge.target.intersection(s1, s2);

                //adjust if we have too short or long direction
                if (!lineStart || !lineEnd ||
                    (lineDiff = lineEnd.clone().subtract(lineStart)).lengthSquared() < arrowLength * arrowLength ||
                    lineDiff.normalise().dot(sdelta) < 0) {
                    if (sourceAbove) {
                        lineStart = s1.clone();
                        lineEnd = edge.target.intersection(s1, s2);
                    }
                    else {
                        lineStart = edge.source.intersection(s2, s1);
                        lineEnd = s2.clone();
                    }
                }
            }
            lineStart = lineStart || s1.clone();
            lineEnd = lineEnd || s2.clone();
            lineEnd.subtract(halfArrow);
            const ldelta = lineEnd.clone().subtract(lineStart).normalise();

            const arrowStart = lineEnd.clone().add(halfArrow);
            const stroke = edge.data.color || '#000000';
            const alpha = (isSelected === 0) ? 0.1 : (isSelected === 0.5) ? 0.5 : 1.0;

            ctx.save();

            //settings
            ctx.lineWidth = width;
            ctx.lineCap = overlapping ? 'round' : 'butt';
            ctx.strokeStyle = stroke;
            ctx.fillStyle = stroke;
            ctx.globalAlpha = alpha;

            //line
            if (ldelta.dot(sdelta) > 0) {
                edge.history.unshift({
                    start: lineStart,
                    end: lineEnd,
                });
                if(edge.history.length > EDGE_HISTORY_TRAIL_LENGTH)
                    edge.history.pop();
                const trailing = edge.history[ edge.history.length - 1 ];
                ctx.beginPath();
                ctx.moveTo(lineStart.x, lineStart.y);
                ctx.bezierCurveTo(
                    trailing.start.x, trailing.start.y,
                    trailing.end.x, trailing.end.y,
                    lineEnd.x, lineEnd.y
                );
                ctx.stroke();
            }
            else
                edge.history = [];

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
        // drawNode
        (node /* point */) => {
            const size = node.bb.size;

            if (node.isSelected())
                ctx.globalAlpha = 1.0;
            else if (edgeSelected)
                ctx.globalAlpha = (node.data.effects[ edgeSelected ]) ? 1.0 : 0.25;
            else if (selected.length === maxTeamSize)
                ctx.globalAlpha = 0.25;
            else if (selected.length > 1)
                ctx.globalAlpha = (node.isSelectedNeighbor()) ? 0.75 : 0.25;
            else if (selected.length)
                ctx.globalAlpha = (node.isSelectedNeighbor()) ? 1.0 : 0.25;
            else
                ctx.globalAlpha = 1.0;

            //draw the portrait
            ctx.drawImage(node.image, node.bb.topLeft.x, node.bb.topLeft.y, size, size);
        },
        // drawNodeOverlay
        (node /* point */) => {
            if(this.showStars && !node.isSelected() && nodeFont) {
                const { stars, color } = node.data;
                ctx.save();

                ctx.globalAlpha = 1.0;
                ctx.font = nodeFont.font;
                ctx.fillStyle = color;
                ctx.textAlign = 'left';
                ctx.textBaseline = 'top';
                ctx.shadowColor = '#333';
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 1 * pixelRatio;
                ctx.fillText(`${ stars }★`, node.bb.topLeft.x, node.bb.bottomRight.y);

                ctx.restore();
            }

            if (!node.isSelected() || !node.text)
                return;

            ctx.globalAlpha = 1.0;

            //draw the portrait text
            const width = node.text.width;
            const height = node.text.height;
            ctx.drawImage(node.text,
                Math.min(Math.max(0, node.bb.center.x - (width / 2) | 0), canvasState.width - width),
                Math.min(Math.max(0, node.bb.center.y - height - (node.bb.size / 2) | 0), canvasState.height - height),
                width, height);
        },
        // drawOverlay
        () => {
            if (selection && selection.start && selection.end) {
                const x = -0.5 + Math.min(selection.start.x, selection.end.x) | 0,
                    y = -0.5 + Math.min(selection.start.y, selection.end.y) | 0,
                    width = 0.5 + Math.abs(selection.start.x - selection.end.x) | 0,
                    height = 0.5 + Math.abs(selection.start.y - selection.end.y) | 0;

                ctx.save();

                //translate the entire context by .5 to get 1px width lines
                ctx.translate(0.5, 0.5);

                //draw the outline
                ctx.lineWidth = pixelRatio;
                ctx.strokeStyle = 'rgb(95, 156, 255)';
                ctx.strokeRect(x, y, width, height);

                //draw the overlay, but not over drawn content
                ctx.globalCompositeOperation = 'destination-over';
                ctx.fillStyle = 'rgba(64, 138, 226, 0.15)';
                ctx.fillRect(x, y, width, height);

                ctx.restore();
            }
        }
    );

    Node.prototype.setBoundingBox = function(x, y, size) {
        this.bb = {
            topLeft: new Vector(x, y),
            bottomRight: new Vector(x + size, y + size),
            center: new Vector((x + size / 2) | 0, (y + size / 2) | 0),
            size,
        };
    };

    // return true if inside BB and not over a 0 opacity pixel
    Node.prototype.containsPoint = function(point, y) {
        let x;
        if (y === undefined) {
            y = point.y;
            x = point.x;
        }
        else
            x = point;

        if (this.bb && this.hitmask) {
            const px = ((x - this.bb.topLeft.x) / this.bb.size * this.hitmask.size) | 0;
            const py = ((y - this.bb.topLeft.y) / this.bb.size * this.hitmask.size) | 0;
            if (this.hitmask.opaque[ px ])
                return this.hitmask.opaque[ px ][ py ];
        }
        return false;
    };

    Node.prototype.containsPointRaw = function(x, y) {
        return this.hitmask.opaque[ x | 0 ][ y | 0 ];
    };

    Node.prototype.overlappingBoundingBox = function(node) {
        return this.bb && node.bb &&
            this.bb.topLeft.x <= node.bb.bottomRight.x &&
            this.bb.bottomRight.x >= node.bb.topLeft.x &&
            this.bb.topLeft.y <= node.bb.bottomRight.y &&
            this.bb.bottomRight.y >= node.bb.topLeft.y;
    };

    Node.prototype.overlapping = function(node) {
        if (this.overlappingBoundingBox(node)) {
            if (this.hitmask && node.hitmask) {
                let tlx;
                let tly;
                let brx;
                let bry;
                if (this.bb.bottomRight.y < node.bb.bottomRight.y) {
                    tly = node.bb.topLeft.y | 0;
                    bry = this.bb.bottomRight.y | 0;
                }
                else {
                    tly = this.bb.topLeft.y | 0;
                    bry = node.bb.bottomRight.y | 0;
                }
                if (this.bb.topLeft.x < node.bb.topLeft.x) {
                    tlx = node.bb.topLeft.x | 0;
                    brx = this.bb.bottomRight.x | 0;
                }
                else {
                    tlx = this.bb.topLeft.x | 0;
                    brx = node.bb.bottomRight.x | 0;
                }
                for (let x = tlx; x < brx; x++)
                    for (let y = tly; y < bry; y++)
                        if (this.containsPoint(x, y) && node.containsPoint(x, y))
                            return true;
                return false;
            }
            return true;
        }
        return false;
    };

    Node.prototype.distanceSquared = function(x, y) {
        if (!this.bb)
            return null;
        const dx = this.bb.center.x - x, dy = this.bb.center.y - y;
        return dx * dx + dy * dy;
    };

    Node.prototype.isSelected = function() {
        return this.selected;
    };

    Node.prototype.isSelectedNeighbor = function() {
        for(let i = 0; i < selected.length; i++)
            if (selected[ i ].data.neighbors[ this.id ])
                return true;
        return false;
    };

    Node.prototype.getSize = function() {
        const canvasSize = Math.min(canvasState.width, canvasState.height);
        let size = Math.min(Math.max(16, canvasSize >> 4), 128);
        if (this.isSelected()) {
            size *= 1.5;
        }
        return size;
    };

    //find the nearest edge of the image, assuming end is inside of node
    Node.prototype.intersection = function(outside, inside) {
        if (!this.hitmask || !this.bb)
            return null;

        //get position relative to hitmask
        const check = inside.clone().subtract(this.bb.topLeft).divide(this.bb.size).multiply(this.hitmask.size);
        const delta = outside.clone().subtract(inside).normalise().divide(this.bb.size).multiply(this.hitmask.size);
        let last;
        while (check.x >= 0 && check.y >= 0 && check.y < this.hitmask.size && check.x < this.hitmask.size) {
            if (this.containsPointRaw(check.x, check.y)) {
                if (!last)
                    last = check.clone();
                else
                    last.copy(check);
            }
            check.add(delta);
        }
        if (!last)
            return null;

        //scale and move back to relative position
        return last.divide(this.hitmask.size).multiply(this.bb.size).add(this.bb.topLeft);
    };

    this.update(undefined, null, 0, 0, 100, 100);

    return this;
}

/* eslint-enable no-invalid-this */
/* eslint-enable no-param-reassign */
