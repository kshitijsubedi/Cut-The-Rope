// Main Game Class

class Game {
    constructor(level) {
        this.pinPoints = level.pinPoints;
        this.stars = level.stars;
        this.frog = level.frog;
        this.candy = level.candy;
        this.ropes = [];
        this.background = new Background();
        this.mainRope = new Rope("", "", "", { candy: true });
        this.gameScore = new StarScore({ x: 200, y: 100 }, this.stars);
        this.isGameOver = false;
        this.isCutting = false;
        this.isCandyNearFrog = false;
        this.isMouthOpen = false;
        this.hasEaten = false;
        this.isSad = false;
        this.mousePosition = {};
        this.ropeGroupIndex = [0];
        this.initRope(this.candy);
        this.joinRopes();
        this.mouseEvent();
        this.mainLoop();
    }

    draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        transition.open("levels");
        this.background.draw();
        this.frog.drawFrogImage();
        this.drawMouseSwipe();
        this.gameScore.drawGameStarScore("ingame");
    }
    update() {
        this.candyNearFrogDetection();
        if (this.hasEaten || this.isSad) {
            this.mainRope.candy = false;
        }
        this.mainRope.update();
        for (let star of this.stars) {
            star.update();
            this.starCollisionDetection(star);
            star.drawDisappearStar();
        }
        this.gameScore.updateStarScore();
    }

    //Game Loop
    mainLoop() {
        this.animationFrame = requestAnimationFrame(this.mainLoop.bind(this));
        if (this.isGameOver) {
            if (this.isSad) {
                nextButton.style.display = "none";
            } else {
                nextButton.style.removeProperty("display");
            }
            this.gameScore.loadGameOverScore();
            transition.close("gameover", true);
            this.gameScore.drawGameStarScore("gameover");
        } else {
            this.draw();
            this.update();
        }
    }

    initRope(candy) {
        this.pinPoints.forEach((point, index) => {
            this.ropes.push(
                new Rope(
                    { x: point.x, y: point.y },
                    { x: candy.x, y: candy.y },
                    point.length,
                    {
                        candy: index == 0 ? true : false,
                    }
                )
            );
        });
    }

    // Join Individual Ropes into single rope
    joinRopes() {
        let newpoints = this.ropes[0].points;
        let newsticks = this.ropes[0].sticks;
        this.ropeGroupIndex.push(newsticks.length);
        let joint = this.ropes[0].points[this.ropes[0].points.length - 1];
        this.ropes.forEach((rope, index) => {
            if (index > 0) {
                newpoints = [...newpoints, ...rope.points];
                newsticks = [...newsticks, ...rope.sticks];
                this.ropeGroupIndex.push(newsticks.length);
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
        this.mainRope.generatePins();
    }

    // Check if mouse swipe interact with rope or not?
    isRopeIntersecting(stick) {
        let p1 = { x: this.mousePosition.x, y: this.mousePosition.y },
            p2 = { x: this.mousePosition.ex, y: this.mousePosition.ey },
            p3 = stick.p0,
            p4 = stick.p1;
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

    // Check Collision between candy and stars
    starCollisionDetection(star) {
        if (
            this.mainRope.candyBall.x < star.position.x + star.spriteWidth &&
            this.mainRope.candyBall.x + this.mainRope.candyBall.radius >
                star.position.x &&
            this.mainRope.candyBall.y <
                star.position.y + star.singleSpriteHeight &&
            this.mainRope.candyBall.y + this.mainRope.candyBall.radius >
                star.position.y
        ) {
            star.starDisappearAnimation();
        }
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

    mouseEvent() {
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
            this.mainRope.sticks.forEach((stick, index) => {
                let ss = this.isRopeIntersecting(stick);
                if (ss) this.removeStick(index);
            });
        });
    }

    // Remove stick after mouse intersect
    removeStick(index) {
        function inRange(x, min, max) {
            return (x - min) * (x - max) <= 0;
        }
        for (var i = 0; i < this.ropeGroupIndex.length - 1; i++) {
            let xx = inRange(
                index,
                this.ropeGroupIndex[i],
                this.ropeGroupIndex[i + 1]
            );
            if (xx) {
                this.mainRope.sticks.splice(
                    this.ropeGroupIndex[i] + 1,
                    this.ropeGroupIndex[i + 1] - (this.ropeGroupIndex[i] + 1)
                );
            }
        }
    }

    // Check if candy is near frog
    candyNearFrogDetection() {
        if (!this.isCandyNearFrog) {
            if (
                this.mainRope.candyBall.x <
                    this.frog.position.x + this.frog.spriteWidth &&
                this.mainRope.candyBall.x + this.mainRope.candyBall.radius >
                    this.frog.position.x - nearFrogDistance &&
                this.mainRope.candyBall.y <
                    this.frog.position.y + this.frog.singleSpriteHeight &&
                this.mainRope.candyBall.y + this.mainRope.candyBall.radius >
                    this.frog.position.y - nearFrogDistance
            ) {
                this.isCandyNearFrog = true;
                this.frog.setFrogStatus("mouthopen");
                this.isMouthOpen = true;
            }
        }
        if (this.isMouthOpen) {
            if (
                !(
                    this.mainRope.candyBall.x <
                        this.frog.position.x + this.frog.spriteWidth &&
                    this.mainRope.candyBall.x + this.mainRope.candyBall.radius >
                        this.frog.position.x - nearFrogDistance &&
                    this.mainRope.candyBall.y <
                        this.frog.position.y + this.frog.singleSpriteHeight &&
                    this.mainRope.candyBall.y + this.mainRope.candyBall.radius >
                        this.frog.position.y - nearFrogDistance
                )
            ) {
                this.isCandyNearFrog = false;
                this.frog.setFrogStatus("mouthclose");
                this.isMouthOpen = false;
            }
        }
        if (!this.hasEaten) {
            if (
                this.mainRope.candyBall.x <
                    this.frog.position.x +
                        this.frog.spriteWidth -
                        frogEatDistance &&
                this.mainRope.candyBall.x + this.mainRope.candyBall.radius >
                    this.frog.position.x - frogEatDistance &&
                this.mainRope.candyBall.y <
                    this.frog.position.y + this.frog.singleSpriteHeight &&
                this.mainRope.candyBall.y + this.mainRope.candyBall.radius >
                    this.frog.position.y + frogEatDistance
            ) {
                this.hasEaten = true;
                this.frog.setFrogStatus("chew");
                this.candy.hasEaten = true;
                this.isMouthOpen = false;
                setTimeout(() => {
                    this.isGameOver = true;
                }, this.frog.numOfRows * this.frog.animationSpeed);
            }

            if (!this.isSad)
                if (
                    this.mainRope.candyBall.y >
                    this.frog.position.y + this.frog.singleSpriteHeight / 2
                ) {
                    this.frog.setFrogStatus("sad");
                    this.isSad = true;
                    setTimeout(() => {
                        this.isGameOver = true;
                    }, this.frog.numOfRows * this.frog.animationSpeed);
                }
        }
    }
}
