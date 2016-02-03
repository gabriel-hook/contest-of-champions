import Node from './Node';
import Edge from './Edge';

class Graph {
    constructor(forceUpdate = false) {
        this.forceUpdate = forceUpdate;
        this.nodeSet = {};
        this.nodes = [];
        this.edges = [];
        this.adjacency = {};
        this.nextNodeId = 0;
        this.nextEdgeId = 0;
        this.eventListeners = [];
    }

    addNode(node) {
        if (!(node.id in this.nodeSet)) {
            this.nodes.push(node);
        }
        this.nodeSet[ node.id ] = node;
        this.notify();
        return node;
    }

    addEdge(edge) {
        let exists = false;
        this.edges.forEach((otherEdge) => {
            if (edge.id === otherEdge.id) {
                exists = true;
            }
        });
        if (!exists) {
            this.edges.push(edge);
        }
        if (!(edge.source.id in this.adjacency)) {
            this.adjacency[ edge.source.id ] = {};
        }
        if (!(edge.target.id in this.adjacency[ edge.source.id ])) {
            this.adjacency[ edge.source.id ][ edge.target.id ] = [];
        }
        exists = false;
        this.adjacency[ edge.source.id ][ edge.target.id ].forEach((otherEdge) => {
            if (edge.id === otherEdge.id) {
                exists = true;
            }
        });
        if (!exists) {
            this.adjacency[ edge.source.id ][ edge.target.id ].push(edge);
        }
        this.notify();
        return edge;
    }

    newNode(data) {
        const node = new Node(this.nextNodeId++, data);
        this.addNode(node);
        return node;
    }

    newEdge(source, target, data) {
        const edge = new Edge(this.nextEdgeId++, source, target, data);
        this.addEdge(edge);
        return edge;
    }

    // find the edges from node1 to node2
    getEdges(node1, node2) {
        if (node1.id in this.adjacency && node2.id in this.adjacency[ node1.id ]) {
            return this.adjacency[ node1.id ][ node2.id ];
        }
        return [];
    }

    // remove a node and it's associated edges from the graph
    removeNode(node) {
        if (node.id in this.nodeSet) {
            Reflect.deleteProperty(this.nodeSet, node.id);
        }
        for (let i = this.nodes.length - 1; i >= 0; i--) {
            if (this.nodes[ i ].id === node.id) {
                this.nodes.splice(i, 1);
            }
        }
        this.detachNode(node);
    }

    // removes edges associated with a given node
    detachNode(node) {
        this.edges.slice().forEach((edge) => {
            if (edge.source.id === node.id || edge.target.id === node.id) {
                this.removeEdge(edge);
            }
        }, this);
        this.notify();
    }

    // remove a node and it's associated edges from the graph
    removeEdge(edge) {
        for (let i = this.edges.length - 1; i >= 0; i--) {
            if (this.edges[ i ].id === edge.id) {
                this.edges.splice(i, 1);
            }
        }
        for (const x in this.adjacency) {
            for (const y in this.adjacency[ x ]) {
                const edges = this.adjacency[ x ][ y ];
                for (let j = edges.length - 1; j >= 0; j--) {
                    if (this.adjacency[ x ][ y ][ j ].id === edge.id) {
                        this.adjacency[ x ][ y ].splice(j, 1);
                    }
                }
                // Clean up empty edge arrays
                if (this.adjacency[ x ][ y ].length === 0) {
                    Reflect.deleteProperty(this.adjacency[ x ], y);
                }
            }
            // Clean up empty objects
            if (isEmpty(this.adjacency[ x ])) {
                Reflect.deleteProperty(this.adjacency, x);
            }
        }
        this.notify();
    }

    addGraphListener(obj) {
        this.eventListeners.push(obj);
    }

    notify() {
        this.eventListeners.forEach((obj) => {
            obj.graphChanged();
        });
    }
}

function isEmpty(obj) {
    for (const k in obj) {
        if (obj.hasOwnProperty(k)) {
            return false;
        }
    }
    return true;
}

export default Graph;
