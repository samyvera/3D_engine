class Actor {
    constructor(player, sectors) {
        this.frame = 0;
        
        this.eyeHeight = 6;
        this.duckHeight = 2.5;
        this.headMargin = 1;
        this.kneeHeight = 2;
        
        this.sector = player.sector;
        this.pos = {
            x: player.x,
            y: player.y,
            z: sectors[this.sector].floor + this.eyeHeight
        }
        this.velocity = {
            x: 0,
            y: 0,
            z: 0
        }

        this.angle = player.angle;
        this.rotationSpeed = 6;
        this.angleStep = Math.PI * 2 / (360 / this.rotationSpeed);
        this.speed = 1 / 8;
    }

    update = (game, keys) => {
        if (keys.left && !keys.right) this.angle -= this.angleStep;
        if (keys.right && !keys.left) this.angle += this.angleStep;

        if (keys.up && !keys.down) {
            this.pos.x += Math.cos(this.angle) * this.speed;
            this.pos.y += Math.sin(this.angle) * this.speed;
        }
        if (keys.down && !keys.up) {
            this.pos.x -= Math.cos(this.angle) * this.speed;
            this.pos.y -= Math.sin(this.angle) * this.speed;
        }
    
        this.frame++;
    }
}
