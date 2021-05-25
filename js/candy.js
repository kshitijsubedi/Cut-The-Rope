class Candy {
    constructor(position) {
        this.x = position ? position.x : 0;
        this.y = position ? position.y : 0;
        this.radius = candyRadius;
        this.image = new Image();
        this.image.src = "./assets/candy.png";
    }

    renderCandy() {
        ctx.drawImage(
            this.image,
            this.x - this.radius,
            this.y - this.radius,
            2 * this.radius,
            2 * this.radius
        );
    }
}

class Pin {
    constructor(position) {
        this.x = position ? position.x : 0;
        this.y = position ? position.y : 0;
        this.radius = 15;
        this.image = new Image();
        this.image.src = "./assets/pin.png";
    }

    renderPin() {
        ctx.drawImage(
            this.image,
            this.x - this.radius,
            this.y - this.radius,
            2 * this.radius,
            2 * this.radius
        );
    }
    renderDot() {
        ctx.fillStyle = "#8CD8FBFF";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 5, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }
}
