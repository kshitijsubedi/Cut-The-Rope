class MainScreen {
    constructor() {
        this.titleImage = new Image();
        this.buttonImage = new Image();
        this.backgroundImage = new Image();
        this.backgroundImage.src = "./assets/startbg.jpg";
        this.titleImage.src='./assets/title.png';
        this.buttonImage.src='./assets/buttons.png';
    }

    draw() {
        ctx.beginPath();
        ctx.drawImage(this.backgroundImage, 0,0, width, height);
        ctx.drawImage(this.titleImage,width/3,height/5,width/4,height/2.5);
        ctx.closePath();
    }

    drawButton(){
        ctx.beginPath();
        ctx.drawImage(
            this.buttonImage,0,0,300,60,width/2.7,height/1.5,width/5,60
        )
        ctx.font='45px gooddp';
        ctx.fillStyle= 'white';
        ctx.textAlign = "center";
        ctx.fillText('Play',width/2.13,height/1.37)
    }
    update(){
        this.draw();
        this.drawButton();
    }
}