class View {
    constructor() {
        this.canvas = document.createElement("canvas");
        this.canvas.width = 640;
        this.canvas.height = 480;
        this.cx = this.canvas.getContext("2d");
        document.body.appendChild(this.canvas);
    }

    renderTopDown = game => {
        let cx = this.cx;
        cx.save();

        let step = 32;
        cx.scale(step, step);
        cx.lineWidth = 0.0625;

        // game variables
        let player = game.player;
        let vertexes = game.vertexes;
        let sectors = game.sectors;

        // viewport
        let viewport = {};
        viewport.width = this.canvas.width / step;
        viewport.height = this.canvas.height / step;
        viewport.top = viewport.width / 2 - player.pos.x;
        viewport.left = viewport.height / 2 - player.pos.y;
        viewport.xOffset = viewport.top % 1;
        viewport.yOffset = viewport.left % 1;
        cx.translate(viewport.top, viewport.left);

        // background
        cx.fillStyle = "#000";
        cx.fillRect(-viewport.top, -viewport.left, viewport.width, viewport.height);

        // grid
        cx.strokeStyle = "#040";
        for (let x = -viewport.top + viewport.xOffset; x <= -viewport.top + viewport.width + viewport.xOffset; x++) {
            cx.beginPath();
            cx.moveTo(x, -viewport.left);
            cx.lineTo(x, -viewport.left + viewport.height);
            cx.stroke();
        }
        for (let y = -viewport.left + viewport.yOffset; y <= -viewport.left + viewport.height + viewport.yOffset; y++) {
            cx.beginPath();
            cx.moveTo(-viewport.top, y);
            cx.lineTo(-viewport.top + viewport.width, y);
            cx.stroke();
        }

        // sectors
        sectors.forEach((sector, s) => {
            for (let v = 0; v < sector.vertexes.length; v++) {
                cx.strokeStyle = (sector.neighbors[v] === -1) ?
                    (player.sector === s ? "#fff" : "#888") :
                    (player.sector === s ? "#f00" : "#800");
                let vx1 = vertexes[sector.vertexes[v]];
                let vx2 = vertexes[sector.vertexes[(v + 1 === sector.vertexes.length) ? 0 : v + 1]];
                cx.beginPath();
                cx.moveTo(vx1.x, vx1.y);
                cx.lineTo(vx2.x, vx2.y);
                cx.stroke();
            }
        });

        // vertexes
        cx.strokeStyle = "#0f0";
        cx.fillStyle = '#f00';
        cx.font = 1 + 'px consolas';
        cx.textAlign = 'center';
        vertexes.forEach((vertex, i) => {
            cx.strokeRect(vertex.x - 0.125, vertex.y - 0.125, 0.25, 0.25);
            cx.strokeText(i, vertex.x, vertex.y);
            cx.fillText(i, vertex.x, vertex.y);
        });

        // player
        cx.fillStyle = "#08f";
        cx.beginPath();
        cx.arc(player.pos.x, player.pos.y, 0.125, 0, 2 * Math.PI);
        cx.fill();

        cx.strokeStyle = "#08f";
        cx.beginPath();
        cx.moveTo(player.pos.x, player.pos.y);
        cx.lineTo(player.pos.x + Math.cos(player.angle), player.pos.y + Math.sin(player.angle));
        cx.stroke();

        // reset cx
        cx.restore();
    }

    renderFirstPerson = game => {
        let cx = this.cx;
        cx.save();

        cx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        let zoom = 1;
        cx.scale(zoom, zoom);
        cx.lineWidth = 2;

        // game variables
        let player = game.player;
        let vertexes = game.vertexes;
        let sectors = game.sectors;

        // view
        let view = {
            width: game.viewWidth,
            height: game.viewHeight,
            hFov: game.hFov,
            vFov: game.vFov
        };

        // local variables
        let yTop = new Array(view.width).fill(0);
        let yBottom = new Array(view.width).fill(view.width - 1);

        let maxQueue = 32;
        let queueIndex = 0;
        let queue = [{
            sector: sectors[player.sector],
            sx1: 0,
            sx2: view.width - 1
        }];

        do {
            let current = queue[queueIndex];
            for (let s = 0; s < current.sector.vertexes.length; s++) {
                let vx1 = vertexes[current.sector.vertexes[s + 0]].x - player.pos.x;
                let vy1 = vertexes[current.sector.vertexes[s + 0]].y - player.pos.y;
                let vx2 = vertexes[current.sector.vertexes[(s + 1 === current.sector.vertexes.length) ? 0 : s + 1]].x - player.pos.x;
                let vy2 = vertexes[current.sector.vertexes[(s + 1 === current.sector.vertexes.length) ? 0 : s + 1]].y - player.pos.y;
                let tx1 = vx1 * Math.sin(player.angle) - vy1 * Math.cos(player.angle);
                let tz1 = vx1 * Math.cos(player.angle) + vy1 * Math.sin(player.angle);
                let tx2 = vx2 * Math.sin(player.angle) - vy2 * Math.cos(player.angle);
                let tz2 = vx2 * Math.cos(player.angle) + vy2 * Math.sin(player.angle);
                
                if (tz1 <= 0 && tz2 <= 0) continue;
                if (tz1 <= 0 || tz2 <= 0) {
                    let nearZ = 0.0001;
                    let farZ = 5;
                    let nearSide = 0.00001;
                    let farSide = 20;
                    let i1 = Util.intersect(tx1, tz1, tx2, tz2, -nearSide, nearZ, -farSide, farZ);
                    let i2 = Util.intersect(tx1, tz1, tx2, tz2, nearSide, nearZ, farSide, farZ);
                    if (tz1 < nearZ) {
                        tx1 = i1.y > 0 ? i1.x : i2.x;
                        tz1 = i1.y > 0 ? i1.y : i2.y;
                    }
                    if (tz2 < nearZ) {
                        tx2 = i1.y > 0 ? i1.x : i2.x;
                        tz2 = i1.y > 0 ? i1.y : i2.y;
                    }
                }
                let xScale1 = view.hFov / tz1;
                let yScale1 = view.vFov / tz1;
                let xScale2 = view.hFov / tz2;
                let yScale2 = view.vFov / tz2;
                let x1 = view.width / 2 - tx1 * xScale1;
                let x2 = view.width / 2 - tx2 * xScale2;
                if (x1 >= x2 || x2 < current.sx1 || x1 > current.sx2) continue;
                let yCeil = current.sector.ceil - player.pos.z;
                let yFloor = current.sector.floor - player.pos.z;
                let neighbor = current.sector.neighbors[s];
                let nYCeil = 0;
                let nYFloor = 0;
                if (neighbor >= 0) {
                    nYCeil = sectors[neighbor].ceil - player.pos.z;
                    nYFloor = sectors[neighbor].floor - player.pos.z;
                }
                let y1a = view.height / 2 - yCeil * yScale1;
                let y1b = view.height / 2 - yFloor * yScale1;
                let y2a = view.height / 2 - yCeil * yScale2;
                let y2b = view.height / 2 - yFloor * yScale2;
                let nY1a = view.height / 2 - nYCeil * yScale1;
                let nY1b = view.height / 2 - nYFloor * yScale1;
                let nY2a = view.height / 2 - nYCeil * yScale2;
                let nY2b = view.height / 2 - nYFloor * yScale2;
                let xStart = Math.floor(Util.max(x1, current.sx1));
                let xEnd = Math.floor(Util.min(x2, current.sx2));
                for (let x = xStart; x <= xEnd; x++) {
                    let ya = (x - x1) * (y2a - y1a) / (x2 - x1) + y1a;
                    let cya = Util.clamp(ya, yTop[x], yBottom[x]);
                    let yb = (x - x1) * (y2b - y1b) / (x2 - x1) + y1b;
                    let cyb = Util.clamp(yb, yTop[x], yBottom[x]);

                    // draw ceil
                    cx.strokeStyle = "#222";
                    cx.beginPath();
                    cx.moveTo(x, yTop[x]);
                    cx.lineTo(x, cya - 1);
                    cx.stroke();

                    // draw floor
                    cx.strokeStyle = "#00f";
                    cx.beginPath();
                    cx.moveTo(x, cyb + 1);
                    cx.lineTo(x, yBottom[x]);
                    cx.stroke();

                    if (neighbor >= 0) {
                        let nYa = (x - x1) * (nY2a - nY1a) / (x2 - x1) + nY1a;
                        let cNya = Util.clamp(nYa, yTop[x], yBottom[x]);
                        let nYb = (x - x1) * (nY2b - nY1b) / (x2 - x1) + nY1b;
                        let cNyb = Util.clamp(nYb, yTop[x], yBottom[x]);

                        // draw top portal
                        cx.strokeStyle = "#aaa";
                        cx.beginPath();
                        cx.moveTo(x, cya);
                        cx.lineTo(x, cNya);
                        cx.stroke();
                        yTop[x] = Util.clamp(Util.max(cya, cNya), yTop[x], view.height - 1);

                        // draw bottom portal
                        cx.strokeStyle = "#80f";
                        cx.beginPath();
                        cx.moveTo(x, cNyb + 1);
                        cx.lineTo(x, cyb);
                        cx.stroke();
                        yBottom[x] = Util.clamp(Util.min(cyb, cNyb), 0, yBottom[x]);
                    } else {
                        // draw wall
                        cx.strokeStyle = "#aaa";
                        cx.beginPath();
                        cx.moveTo(x, cya);
                        cx.lineTo(x, cyb);
                        cx.stroke();
                    }
                }

                if (neighbor >= 0 && xEnd >= xStart && queue.length < maxQueue) {
                    queue.push({
                        sector: sectors[neighbor],
                        sx1: xStart,
                        sx2: xEnd
                    });
                }
            }
            queueIndex++;
        } while (queue.length > queueIndex);

        // reset cx
        cx.restore();
    }
}