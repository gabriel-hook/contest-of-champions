class Node {
    constructor(id, data = {}) {
        this.id = id;
        this.data = data;

        // Data fields used by layout algorithm in this file:
        // this.data.mass
        // Data used by default renderer in springyui.js
        // this.data.label
    }
}

export default Node;
