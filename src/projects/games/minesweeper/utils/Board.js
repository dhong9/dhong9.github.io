/**
=========================================================
* Danyo-1.2
=========================================================

* Copyright 2024 Danyo (https://www.danyo.tech)

Coded by www.danyo.tech

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import Tile from "./Tile";

class Board {
  /**
   * Initializes a Minesweeper board with given dimensions and difficulty level
   * @param {number} x
   * @param {number} y
   * @param {number} width
   * @param {number} height
   * @param {number} rows
   * @param {number} cols
   * @param {number} mines
   * @param {p5Image} mineImg
   * @param {p5Image} flagImg
   * @param {p5Image} smileImg
   */
  constructor(x, y, width, height, rows, cols, mines, mineImg, flagImg, smileImg) {
    // Images
    this.mineImg = mineImg;
    this.flagImg = flagImg;
    this.smileImg = smileImg;

    this.mines = mines;
    let tileWidth = width / cols,
      tileHeight = height / rows;

    // Initialize board with empty tiles
    this.board = [];
    for (let r = 0; r < rows; r++) {
      let temp = [];
      for (let c = 0; c < cols; c++) {
        temp.push(
          new Tile(
            x + c * tileWidth,
            y + r * tileHeight,
            tileWidth,
            tileHeight,
            mineImg,
            flagImg,
            smileImg
          )
        );
      }
      this.board.push(temp);
    }

    // Randomly assign mines
    const indices = new Set();
    while (indices.size < mines) {
      indices.add(-~(Math.random() * rows * cols));
    }
    for (const index of indices) {
      const row = (index / cols) | 0,
        col = index % cols;
      this.board[row][col].hasMine = true;
    }

    // Game over properties
    this.tilesRemaining = rows * cols;
    this.win = false;
    this.lose = false;
  }

  /**
   * Draws Minesweeper board
   * @param {p5Object} p5 p5 object
   */
  draw(p5) {
    // Draw all tiles
    for (const row of this.board) {
      for (const tile of row) {
        tile.draw(p5);
      }
    }

    // If game is over, reveal all tiles
    if (this.win || this.lose) {
      for (const row of this.board) {
        for (const tile of row) {
          tile.showCount = true;
        }
      }
    }
  }
}

export default Board;
