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

  /**
   * Count number of mines surrounding a tile
   * @param {number} row board row
   * @param {number} col board column
   * @returns number of mines in vicinity
   */
  countMines(row, col) {
    let count = 0;
    for (let r = row - 1; r <= row + 1; r++) {
      for (let c = col - 1; c <= col + 1; c++) {
        // If the coordinate is within bounds,
        // then add mine tally
        if (this.boardr[r]?.[c]) {
          count += this.board[r][c].hasMine;
        }
      }
    }
    return count;
  }

  /**
   * Reveal mine count at given tile
   * @param {number} row board row
   * @param {number} col board column
   */
  revealMines(row, col) {
    // Reveal current tile
    let tile = this.board[row][col];
    let mines = this.countMines(row, col);
    tile.mineCount = mines;
    tile.showCount = true;
    tile.hasFlag = false;
    this.tilesRemaining--;

    // If all tiles left are mines,
    // then player has won
    if (this.tilesRemaining === this.mines) {
      this.win = true;
      for (const row of this.board) {
        for (const tile of row) {
          tile.hasFlag = false;
          tile.isLoserTile = false;
        }
      }
    }

    // If there are no mines in given cell
    // reveal more tiles
    if (!mines) {
      for (var r = row - 1; r <= row + 1; r++) {
        for (var c = col - 1; c <= col + 1; c++) {
          if (!(row === r && col === c) && this.board[r]?.[c] && !this.board[r][c].showCount) {
            this.revealMines(r, c);
          }
        }
      }
    }
  }

  /**
   * Mouse click event handler for the game board
   * @param {p5Object} p5 p5 object
   */
  mouseClicked(p5) {
    // If the game is not over,
    // then let user play on
    if (!this.win && !this.lose) {
      for (const r in this.board) {
        for (const c in this.board[r]) {
          const tile = this.board[r][c];
          if (tile.isMouseInside(p5)) {
            // Reveal the tile
            tile.hasFlag = false;
            // If thie tile is a mine,
            // player loses
            if (tile.hasMine) {
              this.lose = true;
            }
            // If the tile is not a mine,
            // get mine count for that tile
            else {
              this.revealMines(+r, +c);
            }
          }
        }
      }
    }
  }
}

export default Board;
