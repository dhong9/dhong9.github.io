// Constants
const N = 8;
const directions = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
  [-1, -1],
  [1, 1],
  [-1, 1],
  [1, -1],
];

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

  /**
   * Checks a direction from a cell to see if we can make a move
   * @param {number[][]} board current game board
   * @param {number} r row
   * @param {number} c column
   * @param {number} deltaRow row direction
   * @param {number} deltaCol column direction
   * @param {number} myPiece the piece being played
   * @param {number} opponentPiece the piece opposite to what's being played
   * @returns true if piece can be flipped at coordinate
   */
  checkFlip(board, r, c, deltaRow, deltaCol, myPiece, opponentPiece) {
    let row = r;
    let col = c;

    if (this.inBounds(row, col) && board[row][col] === opponentPiece) {
      while (this.inBounds(row + deltaRow, col + deltaCol)) {
        row += deltaRow;
        col += deltaCol;
        if (!board[row][col]) {
          // not consecutive
          return false;
        }
        if (board[row][col] === myPiece) {
          // At least one piece we can flip
          return true;
        }
        // It is an opponent piece, just keep scanning in our direction
      }
    }
    return false; // Either no consecutive opponent pieces or hit the edge
  }

  /**
   * Checks if piece can be placed at specified coordinate
   * @param {number[][]} board current game board
   * @param {number} r row
   * @param {number} c column
   * @param {number} piece the piece being played
   * @returns true if move is valid
   */
  validMove(board, r, c, piece) {
    // Check that the coordinates are empty
    if (!this.inBounds(r, c) || board[r][c]) {
      return false;
    }

    // Figure out the character of the opponent's piece
    let opponent = 2;
    if (piece === 2) {
      opponent = 1;
    }

    // If we can flip in any direction, it is valid
    return directions.some(([deltaRow, deltaCol]) =>
      this.checkFlip(board, r + deltaRow, c + deltaCol, deltaRow, deltaCol, piece, opponent)
    );
  }

  /**
   * Gets list of tiles that can be played
   * @param {number[][]} board current game board
   * @param {number} the piece being played
   * @returns list of coordinates that can be played
   */
  getMoveList(board, piece) {
    const moves = [];

    // Check each square of the board and if we can move there, remember the coords
    for (let r = 0; r < N; r += 1) {
      for (let c = 0; c < N; c += 1) {
        if (this.validMove(board, r, c, piece)) {
          moves.push([r, c]);
        }
      }
    }

    return moves;
  }

  /**
   * Place a piece at specified coordinate
   * @param {number[][]} board current game board
   * @param {number} r row
   * @param {number} c column
   * @param {number} piece the piece being played
   */
  makeMove(board, r, c, piece) {
    // Put the piece at x,y
    let bCopy = this.copyBoard(board);
    bCopy[r][c] = piece;

    // Figure out the character of the opponent's piece
    let opponent = 2;
    if (piece === 2) {
      opponent = 1;
    }

    // Check all 8 directions
    for (let i = 0; i < directions.length; i += 1) {
      const [deltaRow, deltaCol] = directions[i];
      // If pieces can be flipped in that direction,
      // then flip all valid pieces
      if (this.checkFlip(bCopy, r + deltaRow, c + deltaCol, deltaRow, deltaCol, piece, opponent)) {
        bCopy = this.flipPieces(
          bCopy,
          r + deltaRow,
          c + deltaCol,
          deltaRow,
          deltaCol,
          piece,
          opponent
        );
      }
    }

    return bCopy;
  }

  /**
   * Counts player's pieces on the board
   * @param {number[][]} board current game board
   * @param {number} piece the piece to count
   * @returns number of player's piece
   */
  score(board, piece) {
    let total = 0;
    for (let r = 0; r < N; r += 1) {
      for (let c = 0; c < N; c += 1) {
        total += board[r][c] === piece;
      }
    }
    return total;
  }

  /**
   * Calculates how behind/ahead player's piece is of/from opponent
   * @param {number[][]} board current game board
   * @param {number} whoseTurn current player
   * @returns heuristic score of current position
   */
  heuristic(board, whoseTurn) {
    return this.score(board, whoseTurn) - this.score(board, whoseTurn === 2 ? 1 : 2);
  }

  /**
   * Checks if game is over
   * @param {number[][]} board current game board
   * @returns true if both players are out of moves
   */
  gameOver(board) {
    return !this.getMoveList(board, 1)[0] && !this.getMoveList(board, 2)[0];
  }

  minimaxValue(board, originalTurn, currentTurn, searchPly) {
    if (searchPly === 5 || this.gameOver(board)) {
      // Change to desired ply lookahead
      return this.heuristic(board, originalTurn);
    }

    let opponent = 2;
    if (currentTurn === 2) {
      opponent = 1;
    }

    const moves = this.getMoveList(board, currentTurn);

    if (!moves[0]) {
      // if no moves skip to next player's turn
      return this.minimaxValue(board, originalTurn, opponent, searchPly + 1);
    }

    // Remember the best move
    let bestMoveVal = -99999; // for finding max
    if (originalTurn !== currentTurn) {
      bestMoveVal = 99999; // for finding min
    }
    // Try out every single move
    for (let i = 0; i < moves.length; i += 1) {
      const [moveRow, moveCol] = moves[i];
      // Apply the move to a new board
      let tempBoard = this.copyBoard(board);
      tempBoard = this.makeMove(tempBoard, moveRow, moveCol, currentTurn);
      // Recursive call
      const val = this.minimaxValue(tempBoard, originalTurn, opponent, searchPly + 1);
      // Remember best move
      if (originalTurn === currentTurn && val > bestMoveVal) {
        // Remember max if it's the originator's turn
        bestMoveVal = val;
      } else if (val < bestMoveVal) {
        // Remember min if it's opponent turn
        bestMoveVal = val;
      }
    }
    return bestMoveVal;
  }

  minimaxDecision(board, whoseTurn) {
    let opponent = 2;
    if (whoseTurn === 2) {
      opponent = 1;
    }

    const moves = this.getMoveList(board, whoseTurn);

    // If there are no moves, return -1
    if (!moves[0]) {
      return [-1, -1];
    }

    let bestMoveVal = -99999;
    let [bestX, bestY] = moves[0];

    // Try out every move
    for (let i = 0; i < moves.length; i += 1) {
      const [moveRow, moveCol] = moves[i];
      let tempBoard = this.copyBoard(board);
      tempBoard = this.makeMove(tempBoard, moveRow, moveCol, whoseTurn);
      // Recursive call, initial search ply = 1
      const val = this.minimaxValue(tempBoard, whoseTurn, opponent, 1);
      // Remember best move
      if (val > bestMoveVal) {
        bestMoveVal = val;
        bestX = moveRow;
        bestY = moveCol;
      }
    }

    return [bestX, bestY];
  }
}

export default Othello_Util;
