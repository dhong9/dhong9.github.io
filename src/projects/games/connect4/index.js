// Sections components
import BaseLayout from "layouts/sections/components/BaseLayout";
import View from "layouts/sections/components/View";
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import DHComments from "components/DHComments";
import DHEditor from "components/DHEditor";

// Form
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

// Connect 4 code
import Connect4_Util from "projects/games/connect4/Connect4_Util";
import connect4Code from "projects/games/connect4/code";

// p5
import Sketch from "react-p5";

// React
import { useContext, useEffect, useState, useRef } from "react";

// Service
import { getComments, addComment, sortComments } from "services/commentsService";

// Authentication
import AuthContext from "context/AuthContext";

function Connect4() {
  const connect4_util = new Connect4_Util();
  const editorRef = useRef();
  const id = 1;

  const [comments, setComments] = useState([]);
  const [isPlainText, setIsPlainText] = useState(false);

  let { user } = useContext(AuthContext);

  const handleChange = (event) => {
    const checked = event.target.checked;
    setIsPlainText(checked);
    editorRef.current.handleSetPlainText(checked);
  };

  const onAdd = () => {
    addComment(
      ({ status }) => {
        if (status === 201) {
          // Successfully added comment
          getComments(({ data: { results } }) => {
            setComments(results.filter(({ project }) => project === id));
          });
        }
      },
      id,
      user.username,
      user.email,
      editorRef.current.getRootComment(),
      isPlainText
    );
  };

  useEffect(() => {
    getComments(({ data: { results } }) => {
      setComments(results.filter(({ project }) => project === id));
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

  // Initialize game board
  let board = connect4_util.board;

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
    } else if (connect4_util.checkTie(board)) {
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

      if (!win && !connect4_util.checkTie(board)) {
        if (connect4_util.isValidLocation(board, col)) {
          // Place token in board
          const row = connect4_util.getNextOpenRow(board, col);
          board = connect4_util.dropPiece(board, row, col, p);

          // Check for a win
          win = connect4_util.winningMove(board);

          // Change player
          p = p > 1 ? 1 : 2;
        }

        // Computer move
        if (p > 1) {
          [col] = connect4_util.minimax(board, 4, -1 / 0, 1 / 0, true);
          const row = connect4_util.getNextOpenRow(board, col);
          board = connect4_util.dropPiece(board, row, col, p);

          // Check for a win
          win = connect4_util.winningMove(board);

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
        {comments.length ? (
          <DHComments comments={sortComments(comments)} pageName={id} user={user} />
        ) : (
          <div></div>
        )}
        <DHEditor ref={editorRef} />{" "}
        {user ? (
          <FormGroup>
            <FormControlLabel
              control={<Checkbox checked={isPlainText} onChange={handleChange} />}
              label="Plain Text"
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
