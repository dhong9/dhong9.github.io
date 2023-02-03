import Tile from "./Tile";

class Board {
  constructor(bw, n) {
    this.n = n;

    this.board = [];
    const w = bw / n;
    for (let r = 0; r < this.n; r += 1) {
      const temp = [];
      for (let c = 0; c < this.n; c += 1) {
        // Using ID n * c + r gives range [0...n], excluding n
        // So add 1 to the IDs
        temp.push(new Tile(n * r + c + 1, c * w, r * w, w));
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
}

export default Board;
