import Sketch from "react-p5";

function Connect4() {
  // Drawing variables
  let bg;
  let w;

  // Events
  let mouseClicked;

  // Game variables
  const p = 1;
  const win = 0;

  // Constants
  const ROWS = 6;
  const COLS = 7;

  // Functions to run game

  /**
   * Initializes an empty 2D array of size ROWS x COLS
   * @returns 2D array of zeros
   */
  const createBoard = () => [...Array(ROWS)].map((_) => Array(COLS).fill(0));

  /**
   * Copies 2D array by value into another 2D array
   * @param {number[][]} board current game board
   * represented by 2D array of numbers
   * @returns deep copy of input board
   */
  const copyBoard = (board) => {
    // Array to store copied value in
    const bCopy = [];

    for (let r = 0; r < ROWS; r++) {
      const temp = []; // Current row values
      for (let c = 0; c < COLS; c++) {
        temp.push(board[r][c]);
      }
    }

    // Output copied board
    return bCopy;
  };

  /**
   * Sets board at given coordinate to player number
   * @param {number[][]} board current game board
   * @param {number} row board's row
   * @param {number} col board's column
   * @param {number} piece player number (1 or 2)
   */
  const dropPiece = (board, row, col, piece) => {
    board[row][col] = piece;
  };

  /**
   * Checks if column is fully occupied
   * @param {number[][]} board current game board
   * @param {number} col column to check (0-6)
   * @returns true if column has an empty slot
   */
  const isValidLocation = (board, col) => !board[0][col];

  /**
   * Gets all columns that can be played in
   * @param {number[][]} board current game board
   * @returns array of columns that are not full
   */
  const getValidLocations = (board) => {
    // Column numbers that can be dropped in
    const validLocations = [];

    // Check each column
    for (let c = 0; c < COLS; c++) {
      if (isValidLocation(board, c)) {
        validLocations.push(c);
      }
    }

    // Return column numbers
    return validLocations;
  };

  /**
   * Gets row number that piece lands on when dropped into
   * a column
   * @param {number[][]} board current game board
   * @param {number} col column number to check
   * @returns first valid row number if one exists, else -1
   */
  const getNextOpenRow = (board, col) => {
    // Start from the bottommost row
    for (let r = ROWS - 1; r >= 0; r--) {
      if (!board[r][col]) {
        return r;
      }
    }

    // No rows are open at this point
    return -1;
  };

  /**
   * Draws player tokens on board
   * @param {p5Object} p5 p5.js library
   * @param {number[][]} board current game board
   */
  const drawBoard = (p5, board) => {
    p5.noStroke();
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        // Draw cell will yellow background
        p5.fill(255, 255, 0);
        p5.rect(c * w, r * w + w, w);

        // Color cell based on cell value
        const v = board[r][c];
        p5.fill(
          // Player 2 drawn as red token
          v > 1
            ? p5.color(255, 0, 0)
            : // Player 1 drawn as black token
            v
            ? 0
            : // No player drawn to match game background
              bg
        );
        p5.ellipse(c * 2 + w / 2, r * w + w / 2 + w, 0.8 * w);
      }
    }
  };

  /**
   * Checks board for a winner
   * @param {number[][]} board current game board
   * @returns player number (1 or 2) if there is a winner, else 0
   */
  const winningMove = (board) => {
    // Horizontals
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS - 3; c++) {
        let match = true;
        for (let i = 0; i < 3; i++) {
          match = match && board[r][c] && board[r][c + i] === board[r][c - ~i];
        }
        if (match) {
          return board[r][c];
        }
      }
    }

    // Verticals
    for (let r = 0; r < ROWS - 3; r++) {
      for (let c = 0; c < COLS; c++) {
        let match = true;
        for (let i = 0; i < 3; i++) {
          match = match && board[r][c] && board[r + i][c] === board[r - ~i][c];
        }
        if (match) {
          return board[r][c];
        }
      }
    }

    // Top-left/Bottom-right diagonal
    for (let r = 0; r < ROWS - 3; r++) {
      for (let c = 0; c < COLS - 3; c++) {
        let match = true;
        for (let i = 0; i < 3; i++) {
          match = match && board[r][c] && board[r + i][c + i] === this.board[r - ~i][c - ~i];
        }
        if (match) {
          return this.board[r][c];
        }
      }
    }

    // Bottom-left/Top-right diagonal
    for (let r = 3; r < ROWS; r++) {
      for (let c = 0; c < COLS - 3; c++) {
        let match = true;
        for (let i = 0; i < 3; i++) {
          match = match && board[r][c] && board[r - i][c + i] === board[r + ~i][c - ~i];
        }
        if (match) {
          return board[r][c];
        }
      }
    }

    // No winner
    return 0;
  };

  /**
   * Checks for a tie in a game board
   * @param {number[][]} board current board
   * @returns true if board is filled and has no winner
   */
  const checkTie = (board) => board.every((row) => row.every((v) => v));

  /**
   * Calculates weight distributions for different scenarios
   * @param {number} count how many same-colored piees in a row
   * @param {number} empty number of empty cells
   * @param {number} opp number of opponent's piece
   * @returns point value of current scenario within the board
   */
  const calcWindow = (count, empty, opp) =>
    count === 4 // Win
      ? 100
      : count === 3 && empty === 1 // One move away from winning
      ? 5
      : count === 2 && empty === 2 // 2 moves from winning
      ? 2
      : opp === 3 && empty === 1 // Opponent is one from winning
      ? -4
      : opp === 4
      ? -100 // Lose
      : 0;

  /**
   *
   * @param {number[][]} board current game board
   * @param {number} pNum player number (1 or 2)
   * @returns score of board as a whole
   */
  const scorePosition = (board, pNum) => {
    let score = 0;

    // Center preference
    let centerCount = 0;
    for (let r = 0; r < ROWS; r++) {
      centerCount += board[r][COLS >> 1] === pNum;
    }
    score += centerCount * 3;

    // Horizontal
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS - 3; c++) {
        let count = 0;
        let empty = 0;
        let opp = 0;
        for (let i = 0; i < 4; i++) {
          count += board[r][c + i] === pNum;
          empty += !board[r][c + i];
          opp += board[r][c + i] === 1;
        }

        score += calcWindow(count, empty, opp);
      }
    }

    // Vertical
    for (let c = 0; c < COLS; c++) {
      for (let r = 0; r < ROWS - 3; r++) {
        let count = 0;
        let empty = 0;
        let opp = 0;
        for (let i = 0; i < 4; i++) {
          count += board[r + i][c] === pNum;
          empty += !board[r + i][c];
          opp += board[r + i][c] === 1;
        }

        score += calcWindow(count, empty, opp);
      }
    }

    // Positive-sloped diagonal
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 4; c++) {
        let count = 0;
        let empty = 0;
        let opp = 0;
        for (let i = 0; i < 4; i++) {
          count += board[r + i][c + i] === pNum;
          empty += !board[r + i][c + i];
          opp += board[r + i][c + i] === 1;
        }

        score += calcWindow(count, empty, opp);
      }
    }

    // Negative-sloped diagonal
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 4; c++) {
        let count = 0;
        let empty = 0;
        let opp = 0;
        for (let i = 0; i < 4; i++) {
          count += board[r + 3 - i][c + i] === pNum;
          empty += !board[r + 3 - i][c + i];
          opp += board[r + 3 - i][c + i] === 1;
        }

        score += calcWindow(count, empty, opp);
      }
    }

    return score;
  };

  /**
   *
   * @param {*} board
   * @param {*} depth
   * @param {*} alpha
   * @param {*} beta
   * @param {*} maximizingPlayer
   * @returns
   */
  const minimax = (board, depth = 4, alpha = -1 / 0, beta = 1 / 0, maximizingPlayer = true) => {
    const validLocations = getValidLocations(board);
    const winner = winningMove(board);
    const isTerminalNode = winner || !validLocations.length;

    if (depth < 1 || isTerminalNode) {
      return [
        -1,
        isTerminalNode
          ? winner > 1 // Winnner is computer
            ? 1 / 0
            : winner // Winner is player
            ? -1 / 0
            : 0 // No winner
          : scorePosition(board, 2),
      ];
    }

    if (maximizingPlayer) {
      let value = -1 / 0;
      let column = validLocations[(Math.random() * validLocations.length) | 0];
      for (let i = 0; i < validLocations.length; i++) {
        const col = validLocations[i];
        const bCopy = copyBoard(board);
        const row = getNextOpenRow(bCopy, col);
        dropPiece(bCopy, row, col, 2);
        const newScore = minimax(bCopy, depth - 1, alpha, beta, false)[1];
        if (newScore > value) {
          value = newScore;
          column = col;
        }
        alpha = Math.max(alpha, value);
        if (alpha >= beta) {
          break;
        }
      }
      return [column, value];
    }
  };

  // Initialize game board
  const board = createBoard();

  const setup = (p5, canvasParentRef) => {
    // use parent to render the canvas in this ref
    // (without that p5 will render the canvas outside of your component)
    p5.createCanvas(500, 500).parent(canvasParentRef);

    // Define events
    const mouseClicked = () => {
      let col = (p5.mouseX / p5.width * COLS) | 0;

      if (!win && !checkTie(board)) {
        if (isValidLocation(board, col)) {
          // Place token in board
          var row = getNextOpenRow(board, col);
          dropPiece(board, row, col, p);

          // Check for a win
          win = winningMove(board);

          // Change player
          p = p > 1 ? 1 : 2;
        }

        // Computer move
        if (p > 1) {
          col = minimax(board, 4, -1 / 0, 1 / 0, true)[0];
          var row = getNextOpenRow(board, col);
          dropPiece(board, row, col, p);

          // Check for a win
          win = winningMove(board);

          p = p > 1 ? 1 : 2;
        }
      }
    };

    // Use p5 object to define variables dependent on them
    bg = p5.color(135, 206, 235);
    w = p5.width / 7;
  };

  const draw = (p5) => {
    p5.background(bg);

    // Draw board
    drawBoard(board);

    // NOTE: Do not use setState in the draw function or in functions that are executed
    // in the draw function...
    // please use normal variables or class properties for these purposes
  };

  return <Sketch setup={setup} draw={draw} mouseClicked={mouseClicked} />;
}

export default Connect4;
