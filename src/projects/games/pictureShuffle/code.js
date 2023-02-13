const pictureShuffleCode = `/**
 * Project: Picture Shuffle
 * Author: Daniel Hong
 * Description: Rearrange parts of a picture on a
 *              shuffle board
 */

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
     */
    draw() {
        // Draw an image if ID is not 0
        // Otherwise, draw a blank space
        if (this.id) {
            image(this.img, this.x, this.y, this.w, this.w);
        } else {
            fill(0);
            rect(this.x, this.y, this.w);
        }

        // Tile border
        noFill();
        rect(this.x, this.y, this.w);
    }

    /**
     * Checks if mouse is inside the tile
     * @returns true if mouse is inside the tile
     */
    isMouseInside() {
        return (
            mouseX > this.x &&
            mouseX < this.x + this.w &&
            mouseY > this.y &&
            mouseY < this.y + this.w
        );
  }
}`;

export default pictureShuffleCode;
