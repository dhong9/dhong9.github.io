import Tile from "./Tile";

class Board {
  constructor(p5, bw, n, img) {
    this.n = n;

    // Temporarily draw image to get pixel data
    p5.image(img, 0, 0, bw, bw);

    this.board = [];
    const w = bw / n;
    for (let r = 0; r < this.n; r += 1) {
      const temp = [];
      for (let c = 0; c < this.n; c += 1) {
        // Using ID n * c + r gives range [0...n], excluding n
        // So add 1 to the IDs
        temp.push(
          new Tile(n * r + c + 1, c * w, r * w, w, p5.get(this.x + c * w, this.y + r * w, w, w))
        );
      }
      this.board.push(temp);
    }

    // Bottom left of the board should be empty
    this.board[n - 1][n - 1].id = 0;
  }

  draw(p5) {
    for (let r = 0; r < this.n; r += 1) {
      for (let c = 0; c < this.n; c += 1) {
        this.board[r][c].draw(p5);
      }
    }
  }

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
        const temp = this.board[r][c];
        this.board[r][c] = this.board[nRow][nCol];
        this.board[nRow][nCol] = temp;
      }
    }
  }
}

export default Board;
