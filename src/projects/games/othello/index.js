import Sketch from "react-p5";

function Othello() {
  // Game variables
  let curPlayer = 1;

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

  // Functions to run game

  /**
   * Initializes an 8x8 array with player pieces
   * @returns 2D array of with first 4 player pieces
   */
  const createBoard = () => {
    // Fill board with zeros
    const board = [...Array(N)].map(() => Array(N).fill(0));

    // Initial tokens
    board[3][3] = 2;
    board[3][4] = 1;
    board[4][3] = 1;
    board[4][4] = 2;

    return board;
  };

  /**
   * Checks if coordinate is within board boundaries
   * @param {number} r row to check
   * @param {number} c column to check
   * @returns true if coordinate fits in an 8x8 grid
   */
  const inBounds = (r, c) => r >= 0 && r < N && c >= 0 && c < N;

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
  const flipPieces = (board, r, c, deltaRow, deltaCol, myPiece, opponentPiece) => {
    while (inBounds(board, r, c) && board[r][c] === opponentPiece) {
      board[r][c] = myPiece;
      r += deltaRow;
      c += deltaCol;
    }
  };

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
  const checkFlip = (board, r, c, deltaRow, deltaCol, myPiece, opponentPiece) => {
    if (inBounds(board, r, c) && board[r][c] === opponentPiece) {
      while (inBounds(board, r + deltaRow, c + deltaCol)) {
        r += deltaRow;
        c += deltaCol;
        if (!board[r][c]) {
          // not consecutive
          return false;
        }
        if (board[r][c] === myPiece) {
          // At least one piece we can flip
          return true;
        }
        // It is an opponent piece, just keep scanning in our direction
      }
    }
    return false; // Either no consecutive opponent pieces or hit the edge
  };

  /**
   * Checks if piece can be placed at specified coordinate
   * @param {number[][]} board current game board
   * @param {number} r row
   * @param {number} c column
   * @param {piece} piece the piece being played
   * @returns true if move is valid
   */
  const validMove = (board, r, c, piece) => {
    // Check that the coordinates are empty
    if (!inBounds(board, r, c) || board[r][c]) {
      return false;
    }

    // Figure out the character of the opponent's piece
    let opponent = 2;
    if (piece === 2) {
      opponent = 1;
    }

    // If we can flip in any direction, it is valid
    return directions.some(([deltaRow, deltaCol]) =>
      checkFlip(board, r + deltaRow, c + deltaCol, deltaRow, deltaCol, piece, opponent)
    );
  };

  /**
   * Gets list of tiles that can be played
   * @param {number[][]} board current game board
   * @param {piece} the piece being played
   * @returns list of coordinates that can be played
   */
  const getMoveList = (board, piece) => {
    const moves = [];

    // Check each square of the board and if we can move there, remember the coords
    for (let r = 0; r < N; r++) {
      for (let c = 0; c < N; c++) {
        if (validMove(board, r, c, piece)) {
          moves.push([r, c]);
        }
      }
    }

    return moves;
  };

  /**
   * Place a piece at specified coordinate
   * @param {number[][]} board current game board
   * @param {number} r row
   * @param {number} c column
   * @param {number} piece the piece being played
   */
  const makeMove = (board, r, c, piece) => {
    // Put the piece at x,y
    board[r][c] = piece;

    // Figure out the character of the opponent's piece
    let opponent = 2;
    if (piece === 2) {
      opponent = 1;
    }

    // Check all 8 directions
    for (const [deltaRow, deltaCol] of directions) {
      // If pieces can be flipped in that direction,
      // then flip all valid pieces
      if (checkFlip(board, r + deltaRow, c + deltaCol, deltaRow, deltaCol, piece, opponent)) {
        flipPieces(board, r + deltaRow, c + deltaCol, deltaRow, deltaCol, piece, opponent);
      }
    }
  };

  /**
   * Counts player's pieces on the board
   * @param {number[][]} board current game board
   * @param {number} piece the piece to count
   * @returns number of player's piece
   */
  const score = (board, piece) => {
    let total = 0;
    for (let r = 0; r < N; r++) {
      for (let c = 0; c < N; c++) {
        total += board[r][c] === piece;
      }
    }
    return total;
  };

  /**
   * Calculates how behind/ahead player's piece is of/from opponent
   * @param {number[][]} board current game board
   * @param {number} whoseTurn current player
   * @returns heuristic score of current position
   */
  const heuristic = (board, whoseTurn) =>
    score(board, whoseTurn) - score(board, whoseTurn === 2 ? 1 : 2);

  /**
   * Copies 2D array by value into another 2D array
   * @param {number[][]} board current game board
   * represented by 2D array of numbers
   * @returns deep copy of input board
   */
  const copyBoard = (board) => board.map((row) => [...row]);

  /**
   * Checks if game is over
   * @param {number[][]} board current game board
   * @returns true if both players are out of moves
   */
  const gameOver = (board) => !getMoveList(board, 1)[0] && !getMoveList(board, 2)[0];

  const minimaxValue = (board, originalTurn, currentTurn, searchPly) => {
    if (searchPly === 5 || gameOver(board)) {
      // Change to desired ply lookahead
      return heuristic(board, originalTurn);
    }

    let opponent = 2;
    if (currentTurn === 2) {
      opponent = 1;
    }

    const moves = getMoveList(board, currentTurn);

    if (!moves[0]) {
      // if no moves skip to next player's turn
      return minimaxValue(board, originalTurn, opponent, searchPly + 1);
    }

    // Remember the best move
    let bestMoveVal = -99999; // for finding max
    if (originalTurn !== currentTurn) {
      bestMoveVal = 99999; // for finding min
    }
    // Try out every single move
    for (const move of moves) {
      // Apply the move to a new board
      const tempBoard = copyBoard(board);
      makeMove(tempBoard, move[0], move[1], currentTurn);
      // Recursive call
      const val = minimaxValue(tempBoard, originalTurn, opponent, searchPly + 1);
      // Remember best move
      if (originalTurn === currentTurn) {
        // Remember max if it's the originator's turn
        if (val > bestMoveVal) {
          bestMoveVal = val;
        }
      } else {
        // Remember min if it's opponent turn
        if (val < bestMoveVal) {
          bestMoveVal = val;
        }
      }
    }
    return bestMoveVal;
  };

  const minimaxDecision = (board, whoseTurn) => {
    let opponent = 2;
    if (whoseTurn === 2) {
      opponent = 1;
    }

    const moves = getMoveList(board, whoseTurn);

    // If there are no moves, return -1
    if (!moves[0]) {
      return [-1, -1];
    }

    let bestMoveVal = -99999;
    let [bestX, bestY] = moves[0];

    // Try out every move
    for (const move of moves) {
      const tempBoard = copyBoard(board);
      makeMove(tempBoard, move[0], move[1], whoseTurn);
      // Recursive call, initial search ply = 1
      const val = minimaxValue(tempBoard, whoseTurn, opponent, 1);
      // Remember best move
      if (val > bestMoveVal) {
        bestMoveVal = val;
        [bestX, bestY] = move;
      }
    }

    return [bestX, bestY];
  };

  // Initialize game board
  const board = createBoard();
  let moves = getMoveList(board, curPlayer);

  const setup = (p5, canvasParentRef) => {
    // use parent to render the canvas in this ref
    // (without that p5 will render the canvas outside of your component)
    p5.createCanvas(500, 500).parent(canvasParentRef);
  };

  const draw = (p5) => {
    // Draw board
    for (let r = 0; r < N; r++) {
      for (let c = 0; c < N; c++) {
        // Board tile
        const w = p5.width / N;
        p5.stroke(0);
        p5.strokeWeight(2);
        p5.fill(52, 168, 85);
        p5.rect(c * w, r * w, w);

        // Draw player
        const v = board[r][c];
        if (v > 0) {
          // Player token exists
          p5.strokeWeight(1);
          p5.fill((v === 2) * 255);
          const tokenWidth = 0.85 * w;
          p5.ellipse(c * w + w / 2, r * w + w / 2, tokenWidth);
        }
      }
    }

    // Draw valid moves
    p5.noFill();
    p5.strokeWeight(2);
    p5.stroke(160);
    const tileWidth = width / N;
    for (const [moveRow, moveCol] of moves) {
      p5.ellipse(
        (moveCol * width) / N + tileWidth / 2,
        (moveRow * height) / N + tileWidth / 2,
        0.85 * tileWidth,
        0.85 * tileWidth
      );
    }

    // NOTE: Do not use setState in the draw function or in functions that are executed
    // in the draw function...
    // please use normal variables or class properties for these purposes
  };

  // Define events
  const mouseClicked = (p5) => {
    const c = ((p5.mouseX / p5.width) * N) | 0;
    const r = ((p5.mouseY / p5.width) * N) | 0;
    if (validMove(board, r, c, curPlayer)) {
      makeMove(board, r, c, curPlayer);
      if (curPlayer === 1) {
        curPlayer = 2;
        const computerMove = minimaxDecision(board, curPlayer);
        if (computerMove[0] !== -1) {
          makeMove(board, computerMove[0], computerMove[1], curPlayer);
          curPlayer = 1;
        }
      } else {
        curPlayer = 1;
      }
      moves = getMoveList(board, curPlayer);
    }
  };

  return <Sketch setup={setup} draw={draw} mouseClicked={mouseClicked} />;
}

export default Othello;
