let levels = [];
let pins = [];


// All levels defined here.
// Define candy, stars, pins and frog positions for certain level.
levels.push({
    candy: { x: width / 2.2, y: height / 3 },
    pinPoints: [{ x: width / 2, y: height / 5, length: 10 }],
    stars: [
        new Star({ x: width / 2, y: height / 2 }, 1),
        new Star({ x: width / 2, y: height / 1.7 }, 6),
        new Star({ x: width / 2, y: height / 1.4 }, 10),
    ],
    frog: new Frog({ x: width / 2, y: height - 120 }),
});

levels.push({
    candy: { x: width / 3, y: height / 3 },
    pinPoints: [
        { x: width / 3, y: height / 5, length: 15 },
        { x: width / 2.2, y: height / 5, length: 15 },
        { x: width / 1.5, y: height / 5, length: 25 },
    ],
    stars: [
        new Star({ x: width / 2.5, y: height / 2 }, 1),
        new Star({ x: width / 2, y: height / 1.7 }, 6),
        new Star({ x: width / 2.5, y: height / 1.4 }, 10),
    ],
    frog: new Frog({ x: width / 2, y: height - 120 }),
});

levels.push({
    candy: { x: width / 2, y: height / 2 },
    pinPoints: [
        { x: width / 2.5, y: height / 2, length: 10 },
        { x: width / 2.2, y: height / 1.5, length: 10 },
        { x: width / 1.5, y: height / 3, length: 15 },
    ],
    stars: [
        new Star({ x: width / 1.8, y: height / 1.4 }, 1),
        new Star({ x: width / 2, y: height / 1.7 }, 6),
        new Star({ x: width / 2.5, y: height / 1.4 }, 10),
    ],
    frog: new Frog({ x: width / 2, y: height - 120 }),
});

levels.push({
    candy: { x: width / 2, y: height / 2 },
    pinPoints: [
        { x: width / 2, y: height / 5, length: 15 },
        { x: width / 3, y: height / 2, length: 13 },
        { x: width / 1.5, y: height / 2, length: 13 },
    ],
    stars: [
        new Star({ x: width / 2.5, y: height / 2 }, 1),
        new Star({ x: width / 2.5, y: height / 1.4 }, 6),
        new Star({ x: width / 2, y: height / 1.4 }, 10),
    ],
    frog: new Frog({ x: width / 2, y: height - 120 }),
});

levels.push({
    candy: { x: width / 2, y: height / 2 },
    pinPoints: [
        { x: width / 2, y: height / 5, length: 15 },
        { x: width / 3, y: height / 5, length: 20 },
        { x: width / 1.5, y: height / 5, length: 20 },
        { x: width / 3.5, y: height / 1.8, length: 17 },
    ],
    stars: [
        new Star({ x: width / 2.5, y: height / 2 }, 1),
        new Star({ x: width / 2.5, y: height / 1.4 }, 6),
        new Star({ x: width / 2, y: height / 1.4 }, 10),
    ],
    frog: new Frog({ x: width / 2, y: height - 120 }),
});

levels.push({
    candy: { x: width / 2, y: height / 2 },
    pinPoints: [
        { x: width / 2.5, y: height / 2, length: 10 },
        { x: width / 2.2, y: height / 1.5, length: 10 },
        { x: width / 1.5, y: height / 3, length: 15 },
    ],
    stars: [
        new Star({ x: width / 1.8, y: height / 1.4 }, 1),
        new Star({ x: width / 2, y: height / 1.7 }, 6),
        new Star({ x: width / 2.5, y: height / 1.4 }, 10),
    ],
    frog: new Frog({ x: width / 2, y: height - 120 }),
});
