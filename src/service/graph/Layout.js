import Point from './Point';
import Spring from './Spring';
import Vector from './Vector';
import { requestRender } from '../../util/animation';

class Layout {
    constructor(graph, stiffness, repulsion, damping, minEnergyThreshold = 0.01) {
        this.graph = graph;
        this.stiffness = stiffness; // spring stiffness constant
        this.repulsion = repulsion; // repulsion constant
        this.damping = damping; // velocity damping factor
        this.minEnergyThreshold = minEnergyThreshold; //threshold used to determine render stop

        this.nodePoints = {}; // keep track of points associated with nodes
        this.edgeSprings = {}; // keep track of springs associated with edges
    }

    point(node) {
        if (!(node.id in this.nodePoints)) {
            const mass = (node.data.mass !== undefined) ? node.data.mass : 1.0;
            this.nodePoints[ node.id ] = new Point(Vector.random(), mass);
        }
        return this.nodePoints[ node.id ];
    }

    spring(edge) {
        if (!this.edgeSprings[ edge.id ]) {
            const length = (edge.data.length !== undefined) ? edge.data.length : 1.0;
            let existingSpring = false;
            this.graph.getEdges(edge.source, edge.target).forEach((otherEdge) => {
                if (existingSpring === false && otherEdge.id in this.edgeSprings) {
                    existingSpring = this.edgeSprings[ otherEdge.id ];
                }
            }, this);
            if (existingSpring !== false) {
                return new Spring(
                    existingSpring.point1,
                    existingSpring.point2,
                    0.0,
                    0.0
                );
            }
            this.graph.getEdges(edge.target, edge.source).forEach((otherEdge) => {
                if (existingSpring === false && otherEdge.id in this.edgeSprings) {
                    existingSpring = this.edgeSprings[ otherEdge.id ];
                }
            }, this);
            if (existingSpring !== false) {
                return new Spring(
                    existingSpring.point2,
                    existingSpring.point1,
                    0.0,
                    0.0
                );
            }
            this.edgeSprings[ edge.id ] = new Spring(
                this.point(edge.source),
                this.point(edge.target),
                length,
                this.stiffness
            );
        }
        return this.edgeSprings[ edge.id ];
    }

    // callback should accept two arguments: Node, Point
    eachNode(callback) {
        this.graph.nodes.forEach((node) => callback.call(this, node, this.point(node)));
    }

    // callback should accept two arguments: Edge, Spring
    eachEdge(callback) {
        this.graph.edges.forEach((edge) => callback.call(this, edge, this.spring(edge)));
    }

    // callback should accept one argument: Spring
    eachSpring(callback) {
        this.graph.edges.forEach((edge) => callback.call(this, edge, this.spring(edge)));
    }

    // callback should accept one argument: Spring
    eachUniqueSpring(callback) {
        const ids = {};
        this.graph.edges.forEach((edge) => {
            if(ids[ edge.nodes ])
                return;
            ids[ edge.nodes ] = true;
            callback.call(this, this.spring(edge));
        });
    }

    // Physics stuff
    decayMasses() {
        this.eachNode((node, point) => {
            if(point.active || node.selected)
                return;
            if(point.m !== point.mass) {
                const difference = Math.abs(point.mass - point.m);
                if(difference < 1) {
                    point.m = point.mass;
                    point.delta = undefined;
                }
                else {
                    if(point.delta === undefined) {
                        point.delta = Math.max(1, difference / 100);
                        if(point.m < point.mass)
                            point.delta = -point.delta;
                    }
                    point.m -= point.delta;
                }
            }
        });
    }

    // Physics stuff
    applyCoulombsLaw() {
        this.eachNode((node1, point1) => {
            this.eachNode((node2, point2) => {
                if (node1.id === node2.id)
                    return;
                const direction = point1.p.clone().subtract(point2.p);
                // avoid massive forces at small distances (and divide by zero)
                const distanceSquared = Math.max(0.1, direction.lengthSquared());
                const normal = direction.normalise();
                const strong1 = node1.selected || point1.active;
                const strong2 = node2.selected || point2.active;
                let repulsion = this.repulsion;
                if(strong1 || strong2) {
                    repulsion *= Math.max(1, Math.min(
                        Math.max(point1.m, point2.m) / 10,
                        (strong1 && strong2)? 10: 5)
                    );
                }
                // apply force to each end point
                point1.applyForce(normal.multiply(repulsion).divide(0.5 * distanceSquared));
                point2.applyForce(normal.multiply(-1));
            });
        });
    }

    applyHookesLaw() {
        this.eachUniqueSpring((spring) => {
            // the direction of the spring
            const direction = spring.point2.p.clone().subtract(spring.point1.p);
            const displacement = spring.length - direction.length();
            const normal = direction.normalise();
            const k = spring.k;
            // apply opposite forces to each end point
            spring.point1.applyForce(normal.multiply(-0.5 * k * displacement));
            spring.point2.applyForce(normal.multiply(-1));
        });
    }

    attractToCentre() {
        this.eachNode((node, point) => {
            const direction = point.p.clone().multiply(-1.0),
                repulsion = this.repulsion;
            point.applyForce(direction.multiply(repulsion / 50.0));
        });
    }


    updateVelocity(timestep) {
        this.eachNode((node, point) => {
            point.v.add(point.a.multiply(timestep)).multiply(this.damping);
            point.a = new Vector(0, 0);
        });
    }

    updatePosition(timestep) {
        this.eachNode((node, point) => {
            point.p.add(point.v.clone().multiply(timestep));
        });
    }

    // Calculate the total kinetic energy of the system
    totalEnergy(/* timestep */) {
        let energy = 0;
        this.eachNode((node, point) => {
            const speedSquared = point.v.lengthSquared();
            energy += 0.5 * point.m * speedSquared;
        });
        return energy;
    }

    /**
     * Start simulation if it's not running already.
     * In case it's running then the call is ignored, and none of the callbacks passed is ever executed.
     */
    start(render, onRenderStop, onRenderStart) {
        if (this._started)
            return;
        this._started = true;
        this._stop = false;
        if (onRenderStart !== undefined) {
            onRenderStart();
        }
        const tickDelta = 0.01;
        const milliseconds = 25;
        const minEnergyThreshold = this.minEnergyThreshold;
        let totalEnergy = 500;
        let rendering = true;
        let renderOnce = false;
        //force initial render in case we start out of focus
        setTimeout(() => {
            this.tick(tickDelta);
            if (render !== undefined) {
                render();
            }
        }, 0);
        //do physics ticks on a timer
        const tickLoop = () => {
            this.tick(tickDelta);
            totalEnergy = this.totalEnergy();
            if (this._stop)
                rendering = false;
            if(rendering)
                setTimeout(tickLoop, milliseconds);
        };
        setTimeout(tickLoop, milliseconds);

        //do renders every animation frame
        requestRender({
            id: 'springy',
            callback: function renderLoop() {
                if(rendering || !renderOnce) {
                    requestRender({
                        id: 'springy',
                        callback: renderLoop,
                    });
                    if (render && (renderOnce || (!isNaN(totalEnergy) && totalEnergy > minEnergyThreshold))) {
                        render();
                        renderOnce = true;
                    }
                }
                else if (onRenderStop !== undefined) {
                    onRenderStop();
                }
            },
        });
    }

    stop() {
        this._started = false;
        this._stop = true;
    }

    tick(timestep) {
        this.decayMasses();
        this.applyCoulombsLaw();
        this.applyHookesLaw();
        this.attractToCentre();
        this.updateVelocity(timestep);
        this.updatePosition(timestep);
    }

    // Find the nearest point to a particular position
    nearest(position) {
        let min = {
            node: null,
            point: null,
            distance: null,
        };
        this.graph.nodes.forEach((node) => {
            const point = this.point(node);
            const distance = point.p.clone().subtract(position).length();
            if (min.distance === null || distance < min.distance) {
                min = {
                    node,
                    point,
                    distance,
                };
            }
        });
        return min;
    }

    // returns [bottomleft, topright]
    getBoundingBox() {
        const bottomleft = new Vector(-2, -2);
        const topright = new Vector(2, 2);
        const minimum = -50;
        const maximum = 50;
        this.eachNode((n, point) => {
            // Bound the node
            point.p.bound(minimum, maximum);
            // Resize the BBox if needed
            bottomleft.set(Math.min(bottomleft.x, point.p.x), Math.min(bottomleft.y, point.p.y));
            topright.set(Math.max(topright.x, point.p.x), Math.max(topright.y, point.p.y));
        });
        const padding = topright.clone().subtract(bottomleft).multiply(0.07); // ~5% padding
        return { bottomleft: bottomleft.subtract(padding), topright: topright.add(padding) };
    }
}

export default Layout;
