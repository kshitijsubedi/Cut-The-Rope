class Game {
    constructor(level){
        this.pin = level.pins
        this.stars = level.stars
        this.frog= level.frog
        this.ropes = level.ropes
        this.candy = level.candy
        this.background = new Background()
        this.mainRope = new Rope("", "", "", { candy: true });
        this.isGameOver =false
        this.isCutting = false
        this.mousePosition = {}
        this.joinRopes()
        this.mouseEvent()
        this.mainLoop()
    }

    draw(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.background.draw();
        this.frog.drawFrogImage();
        this.drawMouseSwipe();
    }
    update(){
        this.mainRope.update();
        for(let star of this.stars){
            star.update()
        }
    }

    mainLoop(){
        this.animationFrame = requestAnimationFrame(this.mainLoop.bind(this));
        this.draw();
        this.update();
    }

    joinRopes() {
        let newpoints = this.ropes[0].points;
        let newsticks = this.ropes[0].sticks;
        let joint = this.ropes[0].points[this.ropes[0].points.length - 1];
        this.ropes.forEach((rope, index) => {
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
        this.mainRope.points = newpoints;
        this.mainRope.sticks = newsticks;
    }

    isRopeIntersecting() {
        let p1 = { x: this.mousePosition.x, y: this.mousePosition.y },
            p2 = { x: this.mousePosition.ex, y: this.mousePosition.ey },
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

    drawMouseSwipe() {
        if (!this.isCutting) return;
        ctx.beginPath();
        ctx.strokeStyle = "rgb(255,255,220,0.5)";
        ctx.lineWidth = 4;
        ctx.moveTo(this.mousePosition.ex, this.mousePosition.ey);
        ctx.lineTo(this.mousePosition.x, this.mousePosition.y);
        ctx.stroke();
    }

    mouseEvent(){
        canvas.addEventListener("mousemove", (e) => {
            this.mousePosition.x = e.clientX;
            this.mousePosition.y = e.clientY;
        });
        canvas.addEventListener("mousedown", (e) => {
            this.mousePosition.ex = e.clientX;
            this.mousePosition.ey = e.clientY;
            this.isCutting = true;
        });
        canvas.addEventListener("mouseup", (e) => {
            this.isCutting = false;
            // if (isIntersecting()) {
            //     newr.sticks = [];
            // }
        });
    }
}