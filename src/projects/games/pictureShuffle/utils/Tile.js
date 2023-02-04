class Tile {
  constructor(id, x, y, w, img) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.w = w;
    this.img = img;
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
