/**
 * Picture tile with a fraction of a full image
 */
class Tile {
  /**
   * Initializes Tile object with ID, dimensions, and image
   * @param {number} id tile ID >= 0
   * @param {number} x x position
   * @param {number} y y position
   * @param {number} w width
   * @param {p5Image} img image
   */
  constructor(id, x, y, w, img) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.w = w;
    this.img = img;
  }

  /**
   * Draws tile
   * @param {p5Object} p5 p5 object
   */
  draw(p5) {
    // Draw an image if ID is not 0
    // Otherwise, draw a blank space
    if (this.id) {
      p5.image(this.img, this.x, this.y, this.w, this.w);
    } else {
      p5.fill(0);
      p5.rect(this.x, this.y, this.w);
    }

    // Tile border
    p5.noFill();
    p5.rect(this.x, this.y, this.w);
  }

  /**
   * Checks if mouse is inside the tile
   * @param {p5Object} p5 object
   * @returns true if mouse is inside the tile
   */
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
