let distance = function (p0, p1) {
    var dx = p1.x - p0.x,
        dy = p1.y - p0.y;
    return Math.sqrt(dx * dx + dy * dy);
};

class Transition {
    constructor() {
        this.step = 20;
        this.animationSpeed = 50;
        this.topY = -height / 2;
        this.bottomY = height;
        this.curtionTop = new Image();
        this.curtionBottom = new Image();
        this.curtionTop.src = "./assets/curtainTop.png";
        this.curtionBottom.src = "./assets/curtainBottom.png";
    }

    animate() {
        ctx.beginPath();
        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(this.curtionTop, 0, this.topY, width, height / 2);
        ctx.drawImage(this.curtionBottom, 0, this.bottomY, width, height / 2);
    }

    close(destination) {
        console.log(destination)
        var intr = setInterval(() => {
            this.topY += this.step;
            this.bottomY -= this.step;
            if (this.topY >= 0) {
                this.topY = 0;
                this.bottomY = height / 2;
                stage=destination
                clearInterval(intr);
            }
            this.animate();
        }, 50);
    }
    open(destination) {
        var intr = setInterval(() => {
            this.topY -= this.step;
            this.bottomY += this.step;
            if (this.bottomY >= height) {
                this.topY = -height / 2;
                this.bottomY = height;
                stage=destination
                clearInterval(intr);
            }
            this.animate();
        }, 50);
    }
}
