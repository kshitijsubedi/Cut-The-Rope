import Background from "./background.js";

window.onload = function () {
    let newr;
    let coord = { x: 0, y: 0 };
    let paint = false;
    let ropes = [];
    let candyPos = { x: width / 2.2, y: height / 3 };
    ropes.push(
        new Rope(
            { x: width / 2, y: height / 5 },
            { x: candyPos.x, y: candyPos.y },
            10,
            { pin: true, color: "red", candy: true }
        )
    );
    ropes.forEach((rope) => {
        rope.genRopes();
    });
    let frog = new Frog({ x: width / 2, y: height - 120 });
    let star = new Star({ x: width / 2, y: height / 2 }, 1);
    let star1 = new Star({ x: width / 2, y: height / 1.7 }, 6);
    let star2 = new Star({ x: width / 2, y: height / 1.4 }, 10);
    let bg = new Background();
    let ms = new MainScreen();
    joinRopes();

    //backgroundSound.play();
    //update();

    function update() {
        ctx.clearRect(0, 0, width, height);
        bg.draw();
        //ms.update();
        // frog.drawFrogImage();
        // newr.update();
        // star.update();
        // star1.update();
        // star2.update();
        // draw();
        requestAnimationFrame(update);
    }

    function joinRopes() {
        let newpoints = ropes[0].points;
        let newsticks = ropes[0].sticks;
        let joint = ropes[0].points[ropes[0].points.length - 1];
        ropes.forEach((rope, index) => {
            if (index > 0) {
                newpoints = [...newpoints, ...rope.points];
                newsticks = [...newsticks, ...rope.sticks];
                let len = { p: rope.points.length, s: rope.sticks.length };
                newsticks.push({
                    p0: joint,
                    p1: rope.points[len.s],
                    length: ropeStep,
                });
            }
        });
        newr = new Rope("", "", "", { candy: true });
        newr.points = newpoints;
        newr.sticks = newsticks;
    }
    function isIntersecting() {
        let p1 = { x: coord.x, y: coord.y },
            p2 = { x: coord.ex, y: coord.ey },
            p3 = newr.points[0],
            p4 = newr.points[10];
        function CCW(p1, p2, p3) {
            return (
                (p3.y - p1.y) * (p2.x - p1.x) > (p2.y - p1.y) * (p3.x - p1.x)
            );
        }
        return (
            CCW(p1, p3, p4) != CCW(p2, p3, p4) &&
            CCW(p1, p2, p3) != CCW(p1, p2, p4)
        );
    }

    function draw() {
        if (!paint) return;
        ctx.beginPath();
        ctx.strokeStyle = "rgb(255,255,220,0.5)";
        ctx.lineWidth = 4;
        ctx.moveTo(coord.ex, coord.ey);
        ctx.lineTo(coord.x, coord.y);
        ctx.stroke();
    }

    document.addEventListener("mousemove", (e) => {
        coord.x = e.clientX;
        coord.y = e.clientY;
    });
    document.addEventListener("mousedown", (e) => {
        paint = true;
        coord.ex = e.clientX;
        coord.ey = e.clientY;
    });
    document.addEventListener("mouseup", (e) => {
        paint = false;
        if (isIntersecting()) {
            newr.sticks = [];
        }
    });
};
