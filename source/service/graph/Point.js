import Vector from './Vector';

// Point
class Point {
    constructor(position, mass) {
        this.p = position; // position
        this.mass = this.m = mass; // mass
        this.v = new Vector(0, 0); // velocity
        this.a = new Vector(0, 0); // acceleration
    }

    applyForce(force) {
        this.a.x += force.x / this.m;
        this.a.y += force.y / this.m;
    }
}

export default Point;
