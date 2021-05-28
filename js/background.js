// backgouned Image
class Background {
    constructor() {
        this.backgroundImage = new Image();
        this.backgroundImage.src = "./assets/backbg.png";
    }

    draw() {
        ctx.beginPath();
        ctx.drawImage(this.backgroundImage, 0, 0, width, height);
    }
}
