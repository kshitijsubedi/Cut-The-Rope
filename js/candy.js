class Candy {
  constructor(point) {
      this.x = point?point.x:0
      this.y= point?point.y:0
      this.radius = candyRadius
      this.image = new Image()
      this.image.src= "./assets/candy.png";
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
