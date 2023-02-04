class Tile {
  constructor(id, x, y, w, img) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.w = w;
    this.img = img;
  }

  draw(p5) {
    if (this.id) {
      p5.image(this.img, this.x, this.y, this.w, this.w);
    } else {
      p5.fill(0);
      p5.rect(this.x, this.y, this.w);
    }

    // Tile background
    p5.noFill();
    p5.rect(this.x, this.y, this.w);
  }

  isMouseInside(p5) {
    return (
      p5.mouseX > this.x &&
      p5.mouseX < this.x + this.w &&
      p5.mouseY > this.y &&
      p5.mouseY < this.y + this.w
    );
  }
}

export default Tile;
