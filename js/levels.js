let levels = [];

levels.push({
    candy: { x: width / 2.2, y: height / 3 },
    ropes: [
        new Rope(
            { x: width / 2, y: height / 5 },
            { x: width / 2.2, y: height / 3 },
            10,
            { pin: true, candy: true }
        ),
    ],
    stars: [
        new Star({ x: width / 2, y: height / 2 }, 1),
        new Star({ x: width / 2, y: height / 1.7 }, 6),
        new Star({ x: width / 2, y: height / 1.4 }, 10),
    ],
    frog: new Frog({ x: width / 2, y: height - 120 }),
});

levels.push({
    candy: { x: width / 2.2, y: height / 3 },
    ropes: [
        new Rope(
            { x: width / 2, y: height / 5 },
            { x: width / 2.2, y: height / 3 },
            10,
            { pin: true, candy: true }
        ),
    ],
    stars: [
        new Star({ x: width / 2, y: height / 2 }, 1),
        new Star({ x: width / 2, y: height / 1.7 }, 6),
        new Star({ x: width / 2, y: height / 1.4 }, 10),
    ],
    frog: new Frog({ x: width / 2, y: height - 120 }),
});
