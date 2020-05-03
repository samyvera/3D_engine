class Wall {
    constructor(a, b) {
        this.a = a;
        this.b = b;
        this.color = 'hsl(' + 360 * Math.random() + ', 100%, ' + (50 + 25 * Math.random()) + '%)';
    }
}