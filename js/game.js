class Game {
    constructor(DATA) {
        this.frame = 0;

        this.viewWidth = 640;
        this.viewHeight = 480;
        this.hFov = 0.73 * this.viewHeight;
        this.vFov = 0.2 * this.viewHeight;

        this.vertexes = [];
        DATA.vertexes.forEach(vertex => {
            vertex.x.forEach(x => {
                this.vertexes.push({ x: x, y: vertex.y });
            });
        });

        this.sectors = [];
        DATA.sectors.forEach(sector => {
            this.sectors.push(new Sector(sector.floor, sector.ceil, sector.vertexes, sector.opositeSector));
        });

        this.player = new Actor(DATA.player, this.sectors);
    }
    
    update = keys => {
        this.player.update(this, keys);
        this.frame++;
    }
}