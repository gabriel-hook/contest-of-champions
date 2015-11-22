const VECTOR_EQUALS_TOLERANCE = 0.0000001;

class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    clone() {
        return new Vector(this.x, this.y);
    }

    bound(minimum, maximum) {
        this.x = Math.max(minimum, Math.min(maximum, this.x));
        this.y = Math.max(minimum, Math.min(maximum, this.y));
        return this;
    }

    set(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }

    copy(otherVector) {
        this.x = otherVector.x;
        this.y = otherVector.y;
        return this;
    }

    add(otherVector) {
        this.x += otherVector.x;
        this.y += otherVector.y;
        return this;
    }

    subtract(otherVector) {
        this.x -= otherVector.x;
        this.y -= otherVector.y;
        return this;
    }

    multiply(n) {
        this.x *= n;
        this.y *= n;
        return this;
    }

    divide(n) {
        this.x = (this.x / n) || 0;
        this.y = (this.y / n) || 0;
        return this;
    }

    dot(otherVector) {
        return this.x * otherVector.x + this.y * otherVector.y;
    }

    lengthSquared() {
        return this.x * this.x + this.y * this.y;
    }

    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    normal() {
        const tmp = this.x;
        this.x = -this.y;
        this.y = tmp;
        return this;
    }

    normalise() {
        this.divide(this.length());
        return this;
    }

    equals(otherVector) {
        return Math.abs(this.x - otherVector.x) < VECTOR_EQUALS_TOLERANCE &&
            Math.abs(this.y - otherVector.y) < VECTOR_EQUALS_TOLERANCE;
    }

    static random() {
        return new Vector(
            5.0 * (Math.random() - 0.5),
            5.0 * (Math.random() - 0.5)
        );
    }
}

export default Vector;
