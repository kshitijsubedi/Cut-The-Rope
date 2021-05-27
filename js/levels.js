let levels = [];
let pins=[];

levels.push({
    candy: { x: width / 2.2, y: height / 3 },
    pinPoints:[
        { x: width / 2, y: height / 5 ,length:10},
    ],
    stars: [
        new Star({ x: width / 2, y: height / 2 }, 1),
        new Star({ x: width / 2, y: height / 1.7 }, 6),
        new Star({ x: width / 2, y: height / 1.4 }, 10),
    ],
    frog: new Frog({ x: width / 2, y: height - 120 }),
});

levels.push({
    candy: { x: width / 3, y: height / 3 },
    pinPoints :[
        { x: width / 3, y: height / 5 ,length:10},
        { x: width / 2.5, y: height / 5,length:10},
        { x: width / 2, y: height / 5 ,length:20}
    ],
    stars: [
        new Star({ x: width / 2.5, y: height / 2 }, 1),
        new Star({ x: width / 2, y: height / 1.7 }, 6),
        new Star({ x: width / 2.5, y: height / 1.4 }, 10),
    ],
    frog: new Frog({ x: width / 2, y: height - 120 }),
});
