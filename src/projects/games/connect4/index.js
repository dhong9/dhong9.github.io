// Sections components
import BaseLayout from "layouts/sections/components/BaseLayout";
import View from "layouts/sections/components/View";
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKInput from "components/MKInput";
import DHComments from "components/DHComments";

// Form
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

// Connect 4 code
import connect4Code from "projects/games/connect4/code";

// p5
import Sketch from "react-p5";

// React
import { useContext, useEffect, useState } from "react";

// Service
import { getComments, addComment } from "services/commentsService";

// Authentication
import AuthContext from "context/AuthContext";

function Connect4() {
  const [comments, setComments] = useState([]);
  const [rootComment, setRootComment] = useState("");
  const [isPlainText, setIsPlainText] = useState(false);

  let { user } = useContext(AuthContext);

  const handleChange = (event) => {
    setIsPlainText(event.target.checked);
  };

  const onAdd = () => {
    addComment(
      ({ status }) => {
        if (status === 201) {
          // Successfully added comment
          getComments(({ data: { results } }) => {
            setComments(results.filter(({ pageName }) => pageName === "connect4"));
          });
        }
      },
      "connect4",
      user.username,
      user.email,
      rootComment,
      isPlainText
    );
  };

  useEffect(() => {
    getComments(({ data: { results } }) => {
      setComments(results.filter(({ pageName }) => pageName === "connect4"));
    });
  }, []);

  // Game variables
  let p = 1;
  let win = 0;

  // Constants
  const ROWS = 6;
  const COLS = 7;

  // Functions to run game

  /**
   * Initializes an empty 2D array of size ROWS x COLS
   * @returns 2D array of zeros
   */
  const createBoard = () => [...Array(ROWS)].map(() => Array(COLS).fill(0));

  /**
   * Copies 2D array by value into another 2D array
   * @param {number[][]} board current game board
   * represented by 2D array of numbers
   * @returns deep copy of input board
   */
  const copyBoard = (board) => board.map((row) => [...row]);

  /**
   * Sets board at given coordinate to player number
   * @param {number[][]} board current game board
   * @param {number} row board's row
   * @param {number} col board's column
   * @param {number} piece player number (1 or 2)
   * @returns Copy of game board with updated coordinate
   */
  const dropPiece = (board, row, col, piece) => {
    const bCopy = copyBoard(board);
    bCopy[row][col] = piece;
    return bCopy;
  };

  /**
   * Checks if column is fully occupied
   * @param {number[][]} board current game board
   * @param {number} col column to check (0-6)
   * @returns true if column has an empty slot
   */
  const isValidLocation = (board, col) => col >= 0 && col <= 6 && !board[0][col];

  /**
   * Gets all columns that can be played in
   * @param {number[][]} board current game board
   * @returns array of columns that are not full
   */
  const getValidLocations = (board) => {
    // Column numbers that can be dropped in
    const validLocations = [];

    // Check each column
    for (let c = 0; c < COLS; c += 1) {
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
    for (let r = ROWS - 1; r >= 0; r -= 1) {
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
   * @param {number} boardWidth width of game board
   * @param {number} xOffset offset to draw the board at in the x direction
   * @param {number} yOffset offset to draw the board at in the y direction
   */
  const drawBoard = (p5, board, boardWidth, xOffset, yOffset) => {
    // Board background
    const bg = p5.color(135, 206, 235);
    const w = Math.min(p5.width, p5.height) / 7;
    p5.noStroke();
    p5.fill(bg);
    p5.rect(xOffset, yOffset, boardWidth);

    for (let r = 0; r < ROWS; r += 1) {
      for (let c = 0; c < COLS; c += 1) {
        // Draw cell with yellow background
        p5.fill(255, 255, 0);
        p5.rect(c * w + xOffset, r * w + w + yOffset, w);

        // Color cell based on cell value
        const v = board[r][c];
        if (v > 1) {
          p5.fill(255, 0, 0); // Player 2 drawn as red token
        } else if (v) {
          p5.fill(0); // Player 1 drawn as black token
        } else {
          p5.fill(bg); // No player drawn to match game background
        }
        p5.ellipse(c * w + w / 2 + xOffset, r * w + w / 2 + w + yOffset, 0.8 * w);
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
  const calcWindow = (count, empty, opp) => {
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
  };

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

        score += calcWindow(count, empty, opp);
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

        score += calcWindow(count, empty, opp);
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

        score += calcWindow(count, empty, opp);
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
    const validLocations = getValidLocations(board);
    const winner = winningMove(board);
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
        score = scorePosition(board, 2);
      }
      return [-1, score];
    }

    if (maximizingPlayer) {
      let value = -1 / 0;
      let column = validLocations[Math.floor(Math.random() * validLocations.length)];
      for (let i = 0; i < validLocations.length; i += 1) {
        const col = validLocations[i];
        let bCopy = copyBoard(board);
        const row = getNextOpenRow(bCopy, col);
        bCopy = dropPiece(bCopy, row, col, 2);
        const newScore = minimax(bCopy, depth - 1, alpha, beta, false)[1];
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
      let bCopy = copyBoard(board);
      const row = getNextOpenRow(bCopy, col);
      bCopy = dropPiece(bCopy, row, col, 1);
      const newScore = minimax(bCopy, depth - 1, alpha, beta, true)[1];
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
  };

  // Initialize game board
  let board = createBoard();

  const setup = (p5, canvasParentRef) => {
    // use parent to render the canvas in this ref
    // (without that p5 will render the canvas outside of your component)

    // Canvas dimension is based on div's size
    const connect4 = document.querySelector(".codeOutput");
    p5.createCanvas(connect4.clientWidth, connect4.clientHeight).parent(canvasParentRef);
  };

  const draw = (p5) => {
    // Global game variables
    const boardWidth = Math.min(p5.width, p5.height);
    const xOffset = p5.width > p5.height ? (p5.width - p5.height) / 2 : 0;
    const yOffset = p5.height > p5.width ? (p5.height - p5.width) / 2 : 0;
    const w = Math.min(p5.width, p5.height) / 7;

    p5.background(0);

    // Draw board
    drawBoard(p5, board, boardWidth, xOffset, yOffset);

    // Draw current player
    const pCol = Math.floor(((p5.mouseX - xOffset) / boardWidth) * COLS);
    p5.noStroke();
    if (p > 1) {
      p5.fill(255, 0, 0);
    } else {
      p5.fill(0);
    }
    p5.ellipse(pCol * w + w / 2 + xOffset, w / 2 + yOffset, 0.8 * w);

    // Display the winner, if there is one
    if (win) {
      p5.noFill();
      p5.fill(255, 255, 255, 100);
      p5.rect(0, p5.height / 4 + yOffset, p5.width, p5.height / 2);

      p5.textAlign(p5.CENTER, p5.CENTER);
      p5.textSize(p5.height / 8);
      p5.fill(0);
      p5.text(`${win < 2 ? "Black" : "Red"} Wins!`, p5.width / 2, p5.height / 2 + yOffset);
    } else if (checkTie(board)) {
      p5.noFill();
      p5.fill(255, 255, 255, 100);

      p5.textAlign(p5.CENTER, p5.CENTER);
      p5.textSize(p5.height / 8);
      p5.fill(0);
      p5.text("Tie!", p5.width / 2 + xOffset, p5.height / 2 + yOffset);
    }

    // NOTE: Do not use setState in the draw function or in functions that are executed
    // in the draw function...
    // please use normal variables or class properties for these purposes
  };

  // Define events
  const mouseClicked = (p5) => {
    if (p5.mouseX >= 0 && p5.mouseX <= p5.width && p5.mouseY >= 0 && p5.mouseY <= p5.height) {
      // Global game variables
      const boardWidth = Math.min(p5.width, p5.height);
      const xOffset = p5.width > p5.height ? (p5.width - p5.height) / 2 : 0;

      let col = Math.floor(((p5.mouseX - xOffset) / boardWidth) * COLS);

      if (!win && !checkTie(board)) {
        if (isValidLocation(board, col)) {
          // Place token in board
          const row = getNextOpenRow(board, col);
          board = dropPiece(board, row, col, p);

          // Check for a win
          win = winningMove(board);

          // Change player
          p = p > 1 ? 1 : 2;
        }

        // Computer move
        if (p > 1) {
          [col] = minimax(board, 4, -1 / 0, 1 / 0, true);
          const row = getNextOpenRow(board, col);
          board = dropPiece(board, row, col, p);

          // Check for a win
          win = winningMove(board);

          // Change player
          p = p > 1 ? 1 : 2;
        }
      }
    }
  };

  return (
    <BaseLayout
      title="Games"
      breadcrumb={[{ label: "Games", route: "/sections/games/connect4" }, { label: "Connect 4" }]}
    >
      <View title="Connect 4" code={connect4Code} height="40rem">
        <Sketch setup={setup} draw={draw} mouseClicked={mouseClicked} />
      </View>

      <div className="comments-container">
        {comments.length ? <DHComments comments={comments} pageName="connect4" /> : <div></div>}
        <MKInput
          variant="standard"
          label="What do you think?"
          placeholder="Add a comment"
          InputLabelProps={{ shrink: true }}
          multiline
          fullWidth
          rows={6}
          onChange={(e) => setRootComment(e.target.value)}
          value={rootComment}
        />{" "}
        {user ? (
          <FormGroup>
            <FormControlLabel
              control={<Checkbox checked={isPlainText} onChange={handleChange} />}
              label="Visualize"
            />
            <MKButton onClick={onAdd} type="submit" variant="gradient" color="info">
              Add
            </MKButton>
          </FormGroup>
        ) : (
          <MKBox>
            <i>You must be logged into comment</i>
          </MKBox>
        )}
      </div>
    </BaseLayout>
  );
}

export default Connect4;
