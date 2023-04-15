import Tile from "./Tile";

/**
 * Picture shuffle board containing image tiles
 */
class Board {
  /**
   * Initializes Board object with ID, dimensions, and image
   * @param {p5Object} p5 p5 object
   * @param {x} x position
   * @param {y} y position
   * @param {number} bw board width
   * @param {number} n rows/columns in a board
   * @param {p5Image} img puzzle image
   */
  constructor(p5, x, y, bw, n, img) {
    this.x = x;
    this.y = y;
    this.n = n;
    this.bw = bw;
    this.solved = false;

    // Temporarily draw image to get pixel data
    p5.image(img, this.x, this.y, bw, bw);

    this.board = [];
    const w = bw / n;
    for (let r = 0; r < this.n; r += 1) {
      const temp = [];
      for (let c = 0; c < this.n; c += 1) {
        // Using ID n * c + r gives range [0...n], excluding n
        // So add 1 to the IDs
        temp.push(
          new Tile(
            n * r + c + 1,
            this.x + c * w,
            this.y + r * w,
            w,
            p5.get(this.x + c * w, this.y + r * w, w, w)
          )
        );
      }
      this.board.push(temp);
    }

    // Bottom left of the board should be empty
    this.board[n - 1][n - 1].id = 0;

    this.shuffle();
  }

  /**
   * Draws all tiles on board
   * @param {p5Object} p5 p5 object
   */
  draw(p5) {
    for (let r = 0; r < this.n; r += 1) {
      for (let c = 0; c < this.n; c += 1) {
        this.board[r][c].draw(p5);
      }
    }
  }

  /**
   * Make 1000 random clicks on the board to shuffle
   * tiles around
   */
  shuffle() {
    for (let n = 1000; n; n -= 1) {
      const randX = Math.floor(Math.random() * this.n);
      const randY = Math.floor(Math.random() * this.n);
      this.moveTile(randX, randY);
    }
  }

  /**
   * Moves a tile to neighboring empty cell
   * if available
   * @param {number} r board row
   * @param {number} c board column
   */
  moveTile(r, c) {
    // Try to move tile
    const dir = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ];

    for (let i = 0; i < 4; i += 1) {
      const [dRow, dCol] = dir[i];
      const nRow = r + dRow;
      const nCol = c + dCol;
      if (this.board[nRow]?.[nCol] && !this.board[nRow][nCol].id) {
        // If the destination tile is empty,
        // then move the tile there
        this.board[r][c].x += dCol * this.board[r][c].w;
        this.board[r][c].y += dRow * this.board[r][c].w;

        // Move blank tile to old tile's spot
        this.board[nRow][nCol].x -= dCol * this.board[nRow][nCol].w;
        this.board[nRow][nCol].y -= dRow * this.board[nRow][nCol].w;

        // Swap board positions in the array
        [this.board[r][c], this.board[nRow][nCol]] = [this.board[nRow][nCol], this.board[r][c]];
      }
    }
  }

  /**
   * Handle mouse clicked event at board level
   * @param {p5Object} p5 object
   */
  mouseClicked(p5) {
    if (!this.solved) {
      // Get tile location
      const r = Math.floor(((p5.mouseY - this.y) / this.bw) * this.n);
      const c = Math.floor(((p5.mouseX - this.x) / this.bw) * this.n);

      this.moveTile(r, c);

      // Check for a win
      let win = true;
      for (let i = 0; i < this.n; i += 1) {
        for (let j = 0; j < this.n; j += 1) {
          win =
            win &&
            (i === this.n - 1 && j === this.n - 1
              ? !this.board[i][j].id
              : this.board[i][j].id === this.n * i + j + 1);
        }
      }
      this.solved = win;
    }
  }
}

export default Board;
