class Tile {
  constructor(id, x, y, w) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.w = w;
  }

  draw(p5) {
    p5.strokeWeight(5);
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
