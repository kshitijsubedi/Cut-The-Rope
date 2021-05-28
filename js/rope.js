// Rope 
class Rope {
    constructor(orig, dest, segment, options, points) {
        this.orig = orig;
        this.dest = dest;
        this.segment = segment;
        this.points = points ? points : [];
        this.sticks = [];
        this.pins = [];
        this.candy = options.candy || false;
        this.candyBall = this.candy ? new Candy() : false;
        this.genRopes();
    }
    genRopes() {
        if (this.points.length == 0) {
            let stepX = (this.dest.x - this.orig.x) / this.segment;
            let stepY = (this.dest.y - this.orig.y) / this.segment;
            for (var i = 0; i < this.segment + 1; i++) {
                this.points.push({
                    x: this.orig.x + stepX * i,
                    y: this.orig.y + stepY * i,
                    oldx: this.orig.x + i * stepX,
                    oldy: this.orig.y + i * stepY,
                    pinned: i == 0 ? true : false,
                    main:
                        i == this.segment ? (this.candy ? true : false) : false,
                });
            }
            for (var i = 0; i < this.points.length - 1; i++) {
                let dist = distance(this.points[i], this.points[i + 1]);
                if (dist <= ropeStep) {
                    this.sticks.push({
                        p0: this.points[i],
                        p1: this.points[i + 1],
                        length: ropeStep,
                    });
                }
            }
        }
    }
    generatePins() {
        this.points.forEach((point) => {
            if (point.pinned) {
                this.pins.push(new Pin({ x: point.x, y: point.y }));
            }
        });
    }

    endPoint() {
        return this.points[this.points.length - 1];
    }

    updatePoints() {
        for (var i = 0; i < this.points.length; i++) {
            var p = this.points[i];
            if (!p.pinned) {
                var vx = (p.x - p.oldx) * friction,
                    vy = (p.y - p.oldy) * friction;

                p.oldx = p.x;
                p.oldy = p.y;
                p.x += vx;
                p.y += vy;
                p.y += gravity;
            }
            if (p.main) {
                this.candyBall.x = p.x;
                this.candyBall.y = p.y;
            }
        }
    }
    constrainPoints() {
        for (var i = 0; i < this.points.length; i++) {
            var p = this.points[i];
            if (!p.pinned) {
                var vx = (p.x - p.oldx) * friction,
                    vy = (p.y - p.oldy) * friction;

                if (p.x > width) {
                    p.x = width;
                    p.oldx = p.x + vx * bounce;
                } else if (p.x < 0) {
                    p.x = 0;
                    p.oldx = p.x + vx * bounce;
                }
                if (p.y > height) {
                    p.y = height;
                    //  p.oldy = p.y + vy * bounce;
                } else if (p.y < 0) {
                    p.y = 0;
                    p.oldy = p.y + vy * bounce;
                }
            }
        }
    }

    updateSticks() {
        for (var i = 0; i < this.sticks.length; i++) {
            var s = this.sticks[i],
                dx = s.p1.x - s.p0.x,
                dy = s.p1.y - s.p0.y,
                distance = Math.sqrt(dx * dx + dy * dy),
                difference = s.length - distance,
                percent = difference / distance / 2,
                offsetX = dx * percent,
                offsetY = dy * percent;

            if (!s.p0.pinned) {
                s.p0.x -= offsetX;
                s.p0.y -= offsetY;
            }
            if (!s.p1.pinned) {
                s.p1.x += offsetX;
                s.p1.y += offsetY;
            }
        }
    }
    renderRopes() {
        for (var i = 0; i < this.sticks.length; i++) {
            var s = this.sticks[i];
            if (!s.hidden) {
                ctx.beginPath();
                ctx.strokeStyle = "#3D2718FF";
                ctx.lineWidth = s.width ? s.width : 3;
                ctx.moveTo(s.p0.x, s.p0.y);
                ctx.lineTo(s.p1.x, s.p1.y);
                ctx.stroke();
            }
        }
    }

    update() {
        this.updatePoints();
        // for (var i = 0; i < 5; i++) {
        this.updateSticks();
        this.constrainPoints();
        // }
        this.pins.forEach((pin) => {
            pin.renderPin();
        });
        this.renderRopes();
        this.pins.forEach((pin) => {
            pin.renderDot();
        });
        if (this.candy) this.candyBall.renderCandy();
    }
}
