// Spring
class Spring {
    constructor(point1, point2, length, k) {
        this.point1 = point1;
        this.point2 = point2;
        this.length = length; // spring length at rest
        this.k = k; // spring constant (See Hooke's law) .. how stiff the spring is
    }
}

export default Spring;
