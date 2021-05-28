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
        this.background = new Image();
        this.background.src = "./assets/bgr.jpg";
        this.curtionTop.src = "./assets/curtainTop.png";
        this.curtionBottom.src = "./assets/curtainBottom.png";
    }

    animate() {
        ctx.beginPath();
        ctx.drawImage(this.background, 0, 0, width, height);
        ctx.drawImage(this.curtionTop, 0, this.topY, width, height / 2);
        ctx.drawImage(this.curtionBottom, 0, this.bottomY, width, height / 2);
    }

    async close(destination, game) {
        if (game) {
            window.cancelAnimationFrame(game.animationFrame);
            gameOverMenu.style.removeProperty("display");
        }
        // var intr = setInterval(() => {
        this.topY += this.step;
        this.bottomY -= this.step;
        if (this.topY >= 0) {
            this.topY = 0;
            this.bottomY = height / 2;
            stage = destination;
            // clearInterval(intr);
        }
        this.animate();
        // }, this.animationSpeed);
    }
    async open(destination, game) {
        if (game) {
            window.cancelAnimationFrame(game.animationFrame);
            gameOverMenu.style.removeProperty("display");
        }
        var intr = setInterval(() => {
            this.topY -= this.step;
            this.bottomY += this.step;
            if (this.bottomY >= height) {
                this.topY = -height / 2;
                this.bottomY = height;
                stage = destination;
                clearInterval(intr);
            }
            this.animate();
        }, this.animationSpeed);
    }
}
