const connect4Code = `/**
 * Project: Connect 4 With AI
 * Author: Daniel Hong
 * Description: Single-player Connect 4 game with an AI.
 *              AI uses minmax with alpha-beta pruning.
 */

// Drawing variables
let bg, w;

// Game variables
let p = 1, win = 0;

// Constants
const ROWS = 6, COLS = 7;

// Functions to run game

/**
 * Initializes an empty 2D array of size ROWS x COLS
 * @returns 2D array of zeros
 */
const createBoard = _ => [...Array(ROWS)].map(_ => Array(COLS).fill(0));

/**
 * Copies 2D array by value into another 2D array
 * @param {number[][]} board current game board
 * represented by 2D array of numbers
 * @returns deep copy of input board
 */
const copyBoard = board => board.map(row => [...row]);

/**
 * Sets board at given coordinate to player number
 * @param {number[][]} board current game board
 * @param {number} row board's row
 * @param {number} col board's column
 * @param {number} piece player number (1 or 2)
 */
const dropPiece = (board, row, col, piece) => board[row][col] = piece;

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
const getValidLocations = board => {
    // Column numbers that can be dropped in
    const validLocations = [];

    // Check each column
    for (let c = 0; c < COLS; c++)
        if (isValidLocation(board, c))
            validLocations.push(c);

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
    for (let r = ROWS - 1; r >= 0; r--)
        if (!board[r][col])
            return r;

    // No rows are open at this point
    return -1;
};

/**
 * Draws player tokens on board
 * @param {number[][]} board current game board
 */
const drawBoard = board => {
    noStroke();
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            // Draw cell with yellow background
            fill(255, 255, 0);
            rect(c * w, r * w, w);

            // Color cell based on cell value
            const v = board[r][c];
            fill(
                // Player 2 drawn as red token
                v > 1 ?
                    color(255, 0, 0)
                // Player 1 drawn as black token
                : v ?
                    0
                // No player drawn to match game background
                : bg
            );
            ellipse(c * 2 + w / 2, r * w + w / 2 + w, 0.8 * w);
        }
    }
};

/**
 * Checks board for a winner
 * @param {number[][]} board current game board
 * @returns player number (1 or 2) if there is a winner, else 0
 */
const winningMove = board => {
    // Horizontals
    for (let r = 0; r < ROWS: r++) {
        for (let c = 0; c < COLS - 3; c++) {
            let match = true;
            for (let i = 0; i < 3; i++)
                match = match && board[r][c] && board[r][c + i] === board[r][c - ~i];
            if (match) return board[r][c];
        }
    }

    // Verticals
    for (let r = 0; r < ROWS - 3; r++) {
        for (let c = 0; c < COLS; c++) {
            let match = 0;
            for (let i = 0; i < 3; i++)
                match = match && board[r][c] && board[r + i][c] === board[r - ~i][c];
            if (match) return board[r][c];
        }
    }

    // Top-left/Bottom-right diagonal
    for (let r = 0; r < ROWS - 3; r++) {
        for (let c = 0; c < COLS - 3; c++) {
            let match = true;
            for (let i = 0; i < 3; i++)
                match = match && board[r][c] && board[r + i][c + i] === board[r - ~i][c - ~i];
            if (match) return board[r][c];
        }
    }

    // Bottom-left/Top-right diagonal
    for (let r = 3; r < ROWS; r++) {
        for (let c = 0; c < COLS - 3; c++) {
            let match = true;
            for (let i = 0; i < 3; i++)
                match = match && board[r][c] && board[r - i][c + i] === board[r + ~i][c - ~i];
            if (match) return board[r][c];
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
const checkTie = board => board.every(row => row.every(v => v));

/**
 * Calculates weight distributions for different scenarios
 * @param {number} count how many same-colored piees in a row
 * @param {number} empty number of empty cells
 * @param {number} opp number of opponent's piece
 * @returns point value of current scenario within the board
 */
const calcWindow = (count, empty, opp) =>
    count === 4 ?
        100 // Win
    : count === 3 && empty === 1 ?
        5 // One away from winning
    : count === 2 && empty === 2 ?
        2 // 2 moves from winning
    : opp === 3 && empty === 1 ?
        -4 // Opponent is one away from winning
    : opp === 4 ?
        -100 // Lose
    : 0;

/**
 * Scores position of current player
 * @param {number[][]} board current game board
 * @param {number} pNum player number (1 or 2)
 * @returns score of board as a whole
 */
const scorePosition = (board, pNum) => {
    let score = 0;

    // Center preference
    let centerCount = 0;
    for (let r = 0; r < ROWS: r++)
        centerCount += board[r][COLS >> 1] === pNum;
    score += centerCount * 3;

    // Horizontal
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS - 3; c++) {
            let count = 0,
                empty = 0,
                opp = 0;
            for (let i = 0; i < 4; i++) {
                count += board[r][c + i] === pNum;
                empty += !board[r][c + i];
                opp += board[r][c + i] === 1;
            }

            score += calcWindow(count, empty, opp);
        }
    }

    // Vertical
    for (let c = 0; c < COLS; c++){
        for (let r = 0; r < ROWS - 3; r++) {
            let count = 0,
                empty = 0,
                opp = 0;
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
            let count = 0,
                empty = 0,
                opp = 0;
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
        let count = 0,
            empty = 0,
            opp = 0;
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
 * Applies minmax algorithm on current board state to calculate next move
 * @param {number[][]} board current game board
 * @param {number} depth number of steps to calculate forward
 * @param {number} alpha
 * @param {number} beta
 * @param {number} maximizingPlayer playing as (1 or 2)
 * @returns pair with move and score
 */
const minimax = (board, depth = 4, alpha = -1 / 0, beta = 1 / 0, maximizingPlayer = true) => {
    const validLocations = getValidLocations(board),
          winner = winningMove(board),
          isTerminalNode = winner || !validLocations.length;
    
    if (depth < 1 || isTerminalNode)
        return [-1, 
            isTerminalNode ? 
                winner > 1 ? // Winnner is computer
                    1/0 : 
                winner ? // Winner is player
                    -1/0 
                : 0 // No winner
            : 
                scorePosition(board, 2)];
    if (maximizingPlayer) {
        let value = -1/0;
        let column = validLocations[Math.random() * validLocations.length | 0];
        for (const col of validLocations) {
            const bCopy = copyBoard(board);
            const row = getNextOpenRow(bCopy, col);
            dropPiece(bCopy, row, col, 2);
            const newScore = minimax(bCopy, depth - 1, alpha, beta, false)[1];
            if (newScore > value) {
                value = newScore;
                column = col;
            }
            const a = Math.max(alpha, value);
            if (a >= beta)
                break;
        }
        return [column, value];
    }

    let value = 1/0;
    let column = validLocations[Math.random() * validLocations.length | 0];
    for (const col of validLocations) {
      const bCopy = copyBoard(board);
      const row = getNextOpenRow(bCopy, col);
      dropPiece(bCopy, row, col, 1);
      const newScore = minimax(bCopy, depth - 1, alpha, beta, true)[1];
      if (newScore < value) {
        value = newScore;
        column = col;
      }
      const b = Math.min(beta, value);
      if (alpha >= b)
        break;
    }
    return [column, value];
};

// Initialize game board
const board = createBoard();

function setup() {
    createCanvas(500, 500);
    
    bg = color(135, 206, 235);
    w = width / 7;
}

function draw() {
    background(bg);
    
    // Draw board
    drawBoard(board);

    // Draw current player
    const pCol = mouseX / width * COLS | 0;
    noStroke();
    fill(p > 1 ? color(255, 0, 0) : 0);
    ellipse(pCol * w + w / 2, w / 2, 0.8 * w);

    // Display the winner, if there is one
    if (win) {
        noFill();
        fill(255, 255, 255, 100);
        rect(0, p5.height / 4, p5.width, p5.height / 2);

        textAlign(CENTER, CENTER);
        textSize(height / 8);
        fill(0);
        text((win < 2 ? "Black" : "Red")+ " Wins!", width / 2, height / 2);
    } else if (checkTie(board)) {
        noFill();
        fill(255, 255, 255, 100);
        rect(0, height / 4, p5.width, p5.height / 2);

        textAlign(CENTER, CENTER);
        textSize(height / 8);
        fill(0);
        text("Tie!", width / 2, height / 2);
    }
}

function mouseClicked() {
    const col = mouseX / width * COLS | 0;

    if (!win && !checkTie(board)) {
        if (isValidLocation(board, col)) {
            // Place token in board
            const row = getNextOpenRow(board, col);
            dropPiece(board, row, col, p);

            // Check for a win
            win = winningMove(board);

            // Change player
            p = p > 1 ? 1 : 2;
        }

        // Computer move
        if (p > 1) {
            [col] = minimax(board, 4, -1 / 0, 1 / 0, true);
            const row = getNextOpenRow(board, col);
            dropPiece(board, row, col, p);

            // Check for a win
            win = winningMove(board);

            // Change player
            p = p > 1 ? 1 : 2;
        }
    }
}`;

export default connect4Code;
