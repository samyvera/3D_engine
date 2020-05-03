const DATA = {
    vertexes: [{
            y: 0,
            x: [0, 6, 28]
        },
        {
            y: 2,
            x: [1, 17.5]
        },
        {
            y: 5,
            x: [4, 6, 18, 21]
        },
        {
            y: 6.5,
            x: [9, 11, 13, 13.5, 17.5]
        },
        {
            y: 7,
            x: [5, 7, 8, 9, 11, 13, 13.5, 15, 17, 19, 21]
        },
        {
            y: 7.5,
            x: [4, 6]
        },
        {
            y: 10.5,
            x: [4, 6]
        },
        {
            y: 11,
            x: [5, 7, 8, 9, 11, 13, 13.5, 15, 17, 19, 21]
        },
        {
            y: 11.5,
            x: [9, 11, 13, 13.5, 17.5]
        },
        {
            y: 13,
            x: [4, 6, 18, 21]
        },
        {
            y: 16,
            x: [1, 17.5]
        },
        {
            y: 18,
            x: [0, 6, 28]
        }
    ],
    sectors: [{
            floor: 0,
            ceil: 20,
            vertexes: [3, 14, 29, 49],
            opositeSector: [-1, 1, 11, 22]
        },
        {
            floor: 0,
            ceil: 20,
            vertexes: [17, 15, 14, 3, 9],
            opositeSector: [-1, 12, 11, 0, 21]
        },
        {
            floor: 0,
            ceil: 20,
            vertexes: [41, 42, 43, 44, 50, 49, 40],
            opositeSector: [-1, 20, -1, 3, -1, -1, 22]
        },
        {
            floor: 0,
            ceil: 14,
            vertexes: [12, 13, 44, 43, 35, 20],
            opositeSector: [-1, 21, -1, 2, -1, 4]
        },
        {
            floor: 0,
            ceil: 12,
            vertexes: [16, 20, 35, 31],
            opositeSector: [-1, -1, 3, -1]
        },
        {
            floor: 16,
            ceil: 28,
            vertexes: [24, 8, 2, 53, 48, 39],
            opositeSector: [18, -1, 7, -1, 6, -1]
        },
        {
            floor: 16,
            ceil: 28,
            vertexes: [53, 52, 46, 47, 48],
            opositeSector: [5, -1, 8, 10, -1]
        },
        {
            floor: 16,
            ceil: 28,
            vertexes: [1, 2, 8, 7, 6],
            opositeSector: [23, -1, 5, -1, 10]
        },
        {
            floor: 16,
            ceil: 36,
            vertexes: [46, 52, 51, 45],
            opositeSector: [-1, 6, -1, 24]
        },
        {
            floor: 16,
            ceil: 36,
            vertexes: [25, 26, 28, 27],
            opositeSector: [24, -1, 10, -1]
        },
        {
            floor: 16,
            ceil: 26,
            vertexes: [6, 7, 47, 46, 28, 26],
            opositeSector: [-1, 7, -1, 6, -1, 9]
        },
        {
            floor: 2,
            ceil: 20,
            vertexes: [14, 15, 30, 29],
            opositeSector: [0, 1, 12, 22]
        },
        {
            floor: 4,
            ceil: 20,
            vertexes: [15, 17, 32, 30],
            opositeSector: [11, 1, 13, 22]
        },
        {
            floor: 6,
            ceil: 20,
            vertexes: [17, 18, 33, 32],
            opositeSector: [12, -1, 14, -1]
        },
        {
            floor: 8,
            ceil: 20,
            vertexes: [18, 19, 34, 33],
            opositeSector: [13, 19, 15, 20]
        },
        {
            floor: 10,
            ceil: 24,
            vertexes: [19, 21, 36, 34],
            opositeSector: [14, -1, 16, -1]
        },
        {
            floor: 12,
            ceil: 24,
            vertexes: [21, 22, 37, 36],
            opositeSector: [15, -1, 17, -1]
        },
        {
            floor: 14,
            ceil: 28,
            vertexes: [22, 23, 38, 37],
            opositeSector: [16, -1, 18, -1]
        },
        {
            floor: 16,
            ceil: 28,
            vertexes: [23, 24, 39, 38],
            opositeSector: [17, -1, 5, -1]
        },
        {
            floor: 8,
            ceil: 14,
            vertexes: [10, 11, 19, 18],
            opositeSector: [-1, 21, -1, 14]
        },
        {
            floor: 8,
            ceil: 14,
            vertexes: [33, 34, 42, 41],
            opositeSector: [-1, 14, -1, 2]
        },
        {
            floor: 0,
            ceil: 20,
            vertexes: [4, 13, 12, 11, 10, 9, 3],
            opositeSector: [-1, -1, 3, -1, 19, -1, 1]
        },
        {
            floor: 0,
            ceil: 20,
            vertexes: [29, 30, 32, 40, 49],
            opositeSector: [0, 11, 12, -1, 2]
        },
        {
            floor: 16,
            ceil: 36,
            vertexes: [1, 6, 5, 0],
            opositeSector: [-1, 7, -1, 24]
        },
        {
            floor: 16,
            ceil: 36,
            vertexes: [0, 5, 25, 27, 45, 51],
            opositeSector: [-1, 23, -1, 9, -1, 8]
        }
    ],
    player: {
        x: 2,
        y: 9,
        angle: 0,
        sector: 0
    }
    // lightSources: [
    //     { pos: { x: 2, y: 4, z: 18 }, sector: 0, color: "rgb(247, 228, 170)" },
    //     { pos: { x: 2, y: 14, z: 18 }, sector: 0, color: "rgb(247, 228, 170)" },
    //     { pos: { x: 9, y: 9, z: 11 }, sector: 4, color: "rgb(247, 170, 112)" },
    //     { pos: { x: 26, y: 3, z: 26 }, sector: 5, color: "rgb(183, 204, 218)" },
    //     { pos: { x: 26, y: 15, z: 26 }, sector: 5, color: "rgb(183, 204, 218)" },
    //     { pos: { x: 1.2, y: 3, z: 30 }, sector: 24, color: "rgb(247, 228, 170)" },
    //     { pos: { x: 1.2, y: 7, z: 30 }, sector: 24, color: "rgb(247, 228, 170)" },
    //     { pos: { x: 1.2, y: 11, z: 30 }, sector: 24, color: "rgb(247, 228, 170)" },
    //     { pos: { x: 1.2, y: 15, z: 30 }, sector: 24, color: "rgb(247, 228, 170)" }
    // ]
}
const DATA2 = {
    vertexes: [
        {
            y: 0,
            x: [0, 6]
        },
        {
            y: 3,
            x: [6, 10, 14]
        },
        {
            y: 7,
            x: [6, 10, 14]
        },
        {
            y: 10,
            x: [0, 6]
        }
    ],
    sectors: [
        {
            floor: 0,
            ceil: 20,
            vertexes: [0, 1, 2, 5, 9, 8],
            opositeSector: [-1, 2, 1, 3, -1, -1]
        },
        {
            floor: 4,
            ceil: 20,
            vertexes: [2, 3, 6, 5],
            opositeSector: [2, 4, 3, 0]
        },
        {
            floor: 2,
            ceil: 20,
            vertexes: [1, 3, 2],
            opositeSector: [-1, 1, 0]
        },
        {
            floor: 2,
            ceil: 20,
            vertexes: [5, 6, 9],
            opositeSector: [1, -1, 0]
        },
        {
            floor: 6,
            ceil: 18,
            vertexes: [3, 4, 7, 6],
            opositeSector: [-1, -1, -1, 1]
        }
    ],
    player: {
        x: 4,
        y: 5,
        angle: 0,
        sector: 0
    }
}