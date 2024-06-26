// Constants
const ROWS = 6,
  COLS = 7;

class Connect4_Util {
  constructor() {
    this.p = 1;
    this.win = 0;
    this.board = [...Array(ROWS)].map(() => Array(COLS).fill(0));
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
   * Sets board at given coordinate to player number
   * @param {number[][]} board current game board
   * @param {number} row board's row
   * @param {number} col board's column
   * @param {number} piece player number (1 or 2)
   * @returns Copy of game board with updated coordinate
   */
  dropPiece(board, row, col, piece) {
    const bCopy = this.copyBoard(board);
    bCopy[row][col] = piece;
    return bCopy;
  }

  /**
   * Checks if column is fully occupied
   * @param {number[][]} board current game board
   * @param {number} col column to check (0-6)
   * @returns true if column has an empty slot
   */
  isValidLocation(board, col) {
    return col >= 0 && col <= 6 && !board[0][col];
  }

  /**
   * Gets all columns that can be played in
   * @param {number[][]} board current game board
   * @returns array of columns that are not full
   */
  getValidLocations(board) {
    // Column numbers that can be dropped in
    const validLocations = [];

    // Check each column
    for (let c = 0; c < COLS; c += 1) {
      if (this.isValidLocation(board, c)) {
        validLocations.push(c);
      }
    }

    // Return column numbers
    return validLocations;
  }

  /**
   * Gets row number that piece lands on when dropped into
   * a column
   * @param {number[][]} board current game board
   * @param {number} col column number to check
   * @returns first valid row number if one exists, else -1
   */
  getNextOpenRow(board, col) {
    // Start from the bottommost row
    for (let r = ROWS - 1; r >= 0; r -= 1) {
      if (!board[r][col]) {
        return r;
      }
    }

    // No rows are open at this point
    return -1;
  }

  /**
   * Checks board for a winner
   * @param {number[][]} board current game board
   * @returns player number (1 or 2) if there is a winner, else 0
   */
  winningMove(board) {
    // Horizontals
    for (let r = 0; r < ROWS; r += 1) {
      for (let c = 0; c < COLS - 3; c += 1) {
        let match = true;
        for (let i = 0; i < 3; i += 1) {
          match = match && board[r][c] && board[r][c + i] === board[r][c + i + 1];
        }
        if (match) {
          return board[r][c];
        }
      }
    }

    // Verticals
    for (let r = 0; r < ROWS - 3; r += 1) {
      for (let c = 0; c < COLS; c += 1) {
        let match = true;
        for (let i = 0; i < 3; i += 1) {
          match = match && board[r][c] && board[r + i][c] === board[r + i + 1][c];
        }
        if (match) {
          return board[r][c];
        }
      }
    }

    // Top-left/Bottom-right diagonal
    for (let r = 0; r < ROWS - 3; r += 1) {
      for (let c = 0; c < COLS - 3; c += 1) {
        let match = true;
        for (let i = 0; i < 3; i += 1) {
          match = match && board[r][c] && board[r + i][c + i] === board[r + i + 1][c + i + 1];
        }
        if (match) {
          return board[r][c];
        }
      }
    }

    // Bottom-left/Top-right diagonal
    for (let r = 3; r < ROWS; r += 1) {
      for (let c = 0; c < COLS - 3; c += 1) {
        let match = true;
        for (let i = 0; i < 3; i += 1) {
          match = match && board[r][c] && board[r - i][c + i] === board[r - i - 1][c + i + 1];
        }
        if (match) {
          return board[r][c];
        }
      }
    }

    // No winner
    return 0;
  }

  /**
   * Checks for a tie in a game board
   * @param {number[][]} board current board
   * @returns true if board is filled and has no winner
   */
  checkTie(board) {
    return board.every((row) => row.every((v) => v));
  }

  /**
   * Calculates weight distributions for different scenarios
   * @param {number} count how many same-colored piees in a row
   * @param {number} empty number of empty cells
   * @param {number} opp number of opponent's piece
   * @returns point value of current scenario within the board
   */
  calcWindow(count, empty, opp) {
    if (count === 4) {
      return 100; // Win
    }
    if (count === 3 && empty === 1) {
      return 5; // One away from winning
    }
    if (count === 2 && empty === 2) {
      return 2; // 2 moves from winning
    }
    if (opp === 3 && empty === 1) {
      return -4; // Opponent is one from winning
    }
    if (opp === 4) {
      return -100; // Lose
    }
    return 0;
  }

  /**
   *
   * @param {number[][]} board current game board
   * @param {number} pNum player number (1 or 2)
   * @returns score of board as a whole
   */
  scorePosition(board, pNum) {
    let score = 0;

    // Center preference
    let centerCount = 0;
    for (let r = 0; r < ROWS; r += 1) {
      centerCount += board[r][Math.floor(COLS / 2)] === pNum;
    }
    score += centerCount * 3;

    // Horizontal
    for (let r = 0; r < ROWS; r += 1) {
      for (let c = 0; c < COLS - 3; c += 1) {
        let count = 0;
        let empty = 0;
        let opp = 0;
        for (let i = 0; i < 4; i += 1) {
          count += board[r][c + i] === pNum;
          empty += !board[r][c + i];
          opp += board[r][c + i] === 1;
        }

        score += this.calcWindow(count, empty, opp);
      }
    }

    // Vertical
    for (let c = 0; c < COLS; c += 1) {
      for (let r = 0; r < ROWS - 3; r += 1) {
        let count = 0;
        let empty = 0;
        let opp = 0;
        for (let i = 0; i < 4; i += 1) {
          count += board[r + i][c] === pNum;
          empty += !board[r + i][c];
          opp += board[r + i][c] === 1;
        }

        score += this.calcWindow(count, empty, opp);
      }
    }

    // Positive-sloped diagonal
    for (let r = 0; r < 3; r += 1) {
      for (let c = 0; c < 4; c += 1) {
        let count = 0;
        let empty = 0;
        let opp = 0;
        for (let i = 0; i < 4; i += 1) {
          count += board[r + i][c + i] === pNum;
          empty += !board[r + i][c + i];
          opp += board[r + i][c + i] === 1;
        }

        score += this.calcWindow(count, empty, opp);
      }
    }

    // Negative-sloped diagonal
    for (let r = 0; r < 3; r += 1) {
      for (let c = 0; c < 4; c += 1) {
        let count = 0;
        let empty = 0;
        let opp = 0;
        for (let i = 0; i < 4; i += 1) {
          count += board[r + 3 - i][c + i] === pNum;
          empty += !board[r + 3 - i][c + i];
          opp += board[r + 3 - i][c + i] === 1;
        }

        score += this.calcWindow(count, empty, opp);
      }
    }

    return score;
  }

  /**
   * Applies minmax algorithm on current board state to calculate next move
   * @param {number[][]} board current game board
   * @param {number} depth number of steps to calculate forward
   * @param {number} alpha
   * @param {number} beta
   * @param {number} maximizingPlayer playing as (1 or 2)
   * @returns pair with move and score
   */
  minimax(board, depth = 4, alpha = -1 / 0, beta = 1 / 0, maximizingPlayer = true) {
    const validLocations = this.getValidLocations(board);
    const winner = this.winningMove(board);
    const isTerminalNode = winner || !validLocations.length;

    if (depth < 1 || isTerminalNode) {
      let score;
      if (isTerminalNode) {
        if (winner > 1) {
          score = 1 / 0; // Winner is computer
        } else if (winner) {
          score = -1 / 0; // Winner is player
        } else {
          score = 0; // No winner
        }
      } else {
        score = this.scorePosition(board, 2);
      }
      return [-1, score];
    }

    if (maximizingPlayer) {
      let value = -1 / 0;
      let column = validLocations[Math.floor(Math.random() * validLocations.length)];
      for (let i = 0; i < validLocations.length; i += 1) {
        const col = validLocations[i];
        let bCopy = this.copyBoard(board);
        const row = this.getNextOpenRow(bCopy, col);
        bCopy = this.dropPiece(bCopy, row, col, 2);
        const newScore = this.minimax(bCopy, depth - 1, alpha, beta, false)[1];
        if (newScore > value) {
          value = newScore;
          column = col;
        }
        const a = Math.max(alpha, value);
        if (a >= beta) {
          break;
        }
      }
      return [column, value];
    }

    let value = 1 / 0;
    let column = validLocations[Math.floor(Math.random() * validLocations.length)];
    for (let i = 0; i < validLocations.length; i += 1) {
      const col = validLocations[i];
      let bCopy = this.copyBoard(board);
      const row = this.getNextOpenRow(bCopy, col);
      bCopy = this.dropPiece(bCopy, row, col, 1);
      const newScore = this.minimax(bCopy, depth - 1, alpha, beta, true)[1];
      if (newScore < value) {
        value = newScore;
        column = col;
      }
      const b = Math.min(beta, value);
      if (alpha >= b) {
        break;
      }
    }
    return [column, value];
  }
}

export default Connect4_Util;
