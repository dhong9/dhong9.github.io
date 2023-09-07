// Constants
const N = 8;

class Othello_Util {
  constructor() {
    this.curPlayer = 1;

    // Initialize board with zeros
    this.board = [...Array(N)].map(() => Array(N).fill(0));

    // Initial tokens
    this.board[3][3] = 2;
    this.board[3][4] = 1;
    this.board[4][3] = 1;
    this.board[4][4] = 2;
  }

  /**
   * Copies 2D array by value into another 2D array
   * @param {number[][]} board current game board
   * represented by 2D array of numbers
   * @returns deep copy of input board
   */
  copyBoard(board) {
    return board.map((row) => [...row]);
  }

  /**
   * Checks if coordinate is within board boundaries
   * @param {number} r row to check
   * @param {number} c column to check
   * @returns true if coordinate fits in an 8x8 grid
   */
  inBounds(r, c) {
    return r >= 0 && r < N && c >= 0 && c < N;
  }

  /**
   * Flips pieces in the given direction until we don't hit any more opponent pieces
   * @param {number[][]} board current game board
   * @param {number} r row
   * @param {number} c column
   * @param {number} deltaRow row direction
   * @param {number} deltaCol column direction
   * @param {number} myPiece the piece being played
   * @param {number} opponentPiece the piece opposite to what's being played
   */
  flipPieces(board, r, c, deltaRow, deltaCol, myPiece, opponentPiece) {
    if (this.inBounds(r, c) && board[r][c] === opponentPiece) {
      const bCopy = this.copyBoard(board);
      bCopy[r][c] = myPiece;
      return this.flipPieces(
        bCopy,
        r + deltaRow,
        c + deltaCol,
        deltaRow,
        deltaCol,
        myPiece,
        opponentPiece
      );
    }
    return board;
  }
}

export default Othello_Util;
