/**
 * Renderer handles the layout rendering loop
 * @param onRenderStop optional callback function that gets executed whenever rendering stops.
 * @param onRenderStart optional callback function that gets executed whenever rendering starts.
 */
class Renderer {
    constructor(layout, clear, processNode, drawEdge, drawNode, drawNodeOverlay, drawOverlay, onRenderStop, onRenderStart) {
        this.layout = layout;
        this.clear = clear;
        this.processNode = processNode;
        this.drawEdge = drawEdge;
        this.drawNode = drawNode;
        this.drawNodeOverlay = drawNodeOverlay;
        this.drawOverlay = drawOverlay;
        this.onRenderStop = onRenderStop;
        this.onRenderStart = onRenderStart;
        this.layout.graph.addGraphListener(this);
    }

    graphChanged(/* e */) {
        this.start();
    }

    /**
     * Starts the simulation of the layout in use.
     *
     * Note that in case the algorithm is still or already running then the layout that's in use
     * might silently ignore the call, and your optional <code>done</code> callback is never executed.
     * At least the built-in ForceDirected layout behaves in this way.
     *
     * @param done An optional callback function that gets executed when the springy algorithm stops,
     * either because it ended or because stop() was called.
     */
    start(/* done */) {
        this.layout.start(() => {
            this.clear();
            //build arrays of functions to process
            const opsBefore = [], opsAfter = [];
            this.layout.eachNode((node, point) => {
                this.processNode(node, point.p);
                opsBefore.push({
                    args:[ node, point.p ],
                    callback:this.drawNode,
                    zindex:point.p.y,
                });
                opsAfter.push({
                    args:[ node, point.p ],
                    callback:this.drawNodeOverlay,
                    zindex:point.p.y,
                });
            });
            this.layout.eachEdge((edge, spring) => {
                opsBefore.push({
                    args:[ edge, spring.point1.p, spring.point2.p ],
                    callback:this.drawEdge,
                    zindex:(spring.point1.p.y + spring.point2.p.y + Math.max(spring.point1.p.y, spring.point2.p.y)) / 3,
                });
            });
            //sort by z-index
            opsBefore.sort((a, b) => {
                return a.zindex - b.zindex;
            });
            opsAfter.sort((a, b) => {
                return a.zindex - b.zindex;
            });
            //process the rendering functions
            for(let i=0; i<opsBefore.length; i++)
                opsBefore[ i ].callback.apply(this, opsBefore[ i ].args);
            for(let i=0; i<opsAfter.length; i++)
                opsAfter[ i ].callback.apply(this, opsAfter[ i ].args);
            this.drawOverlay();
        }, this.onRenderStop, this.onRenderStart);
    }

    stop() {
        this.layout.stop();
    }
}

export default Renderer;
