class Util {}
Util.min = (a, b) => a < b ? a : b;
Util.max = (a, b) => a > b ? a : b;
Util.clamp = (num, min, max) => Util.min(Util.max(num, min), max);
Util.vxs = (x1, y1, x2, y2) => x1 * y2 - x2 * y1;
Util.overlap = (a1, a2, b1, b2) => Util.min(a1, a2) <= Util.max(b1, b2) && Util.min(b1, b2) <= Util.max(a1, a2);
Util.intersectBox = (x1, y1, x2, y2, x3, y3, x4, y4) => Util.overlap(x1, x2, x3, x4) && Util.overlap(y1, y2, y3, y4);
Util.pointSide = (px, py, x1, y1, x2, y2) => Util.vxs(x2 - x1, y2 - y1, px - x1, py - y1);
Util.intersect = (x1, y1, x2, y2, x3, y3, x4, y4) => {
    let x = Util.vxs(x1, y1, x2, y2);
    let y = Util.vxs(x3, y3, x4, y4);
    let det = Util.vxs(x1 - x2, y1 - y2, x3 - x4, y3 - y4);
    return {
        x: Util.vxs(x, x1 - x2, y, x3 - x4) / det,
        y: Util.vxs(x, y1 - y2, y, y3 - y4) / det
    }
}