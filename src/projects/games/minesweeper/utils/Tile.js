/**
=========================================================
* Danyo-1.2
=========================================================

* Copyright 2024 Danyo (https://www.danyo.tech)

Coded by www.danyo.tech

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/**
 * Minesweeper tile
 */
class Tile {
  /**
   * Defines a minesweeper tile
   * @param {number} x x coordinate
   * @param {number} y y coordinate
   * @param {number} width tile width
   * @param {number} width tile height
   * @param {p5Image} loserImg image to display when the player loses
   * @param {p5Image} flagImg image to display when the player flags a tile
   * @param {p5Image} smileImg image to display when the player wins
   */
  constructor(x, y, width, height, loserImg, flagImg, smileImg) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.hasMine = false;
    this.hasFlag = false;

    // Images
    this.loserImg = loserImg;
    this.flagImg = flagImg;
    this.smileImg = smileImg;

    // Variables for showing mine count
    this.showCount = false;
    this.mineCount = 0;
    this.isLoserTile = true;
  }

  /**
   * Draws tile
   * @param {p5Object} p5 p5 object
   */
  draw(p5) {
    // Show mine count
    if (this.showCount) {
      p5.fill(220);
      p5.rect(this.x, this.y, this.width, this.height);
      p5.textSize(this.width / 2);

      // If there are no mines, don't show the count
      if (this.mineCount) {
        p5.fill(0);
        p5.textAlign(p5.CENTER, p5.CENTER);
        p5.text(this.mineCount, this.x + this.width / 2, this.y + this.height / 2);
      }
    } else {
      // Tile has not been checked
      p5.noStroke();

      // Outline
      p5.fill(200);
      p5.rect(this.x, this.y, this.width, this.height);

      // Inside
      p5.fill(220);
      p5.rect(
        this.x + 0.05 * this.width,
        this.y + 0.05 * this.height,
        0.9 * this.width,
        0.9 * this.height
      );
    }

    if (this.hasFlag) {
      p5.image(this.flagImg, this.x, this.y, this.width, this.height);
    }
    if (this.hasMine && this.showCount) {
      p5.image(
        this.isLoserTile ? this.loserImg : this.smileImg,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }
  }
}

export default Tile;
