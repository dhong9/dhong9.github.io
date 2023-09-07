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

// Othello code
import othelloCode from "projects/games/othello/code";
import Othello_Util from "projects/games/othello/Othello_Util";

// p5
import Sketch from "react-p5";

import { useContext, useEffect, useState, useRef } from "react";

// Service
import { getComments, addComment, sortComments } from "services/commentsService";

// Authentication
import AuthContext from "context/AuthContext";

function Othello() {
  const othello_util = new Othello_Util();
  const editorRef = useRef();
  const id = 4;

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
   * Place a piece at specified coordinate
   * @param {number[][]} board current game board
   * @param {number} r row
   * @param {number} c column
   * @param {number} piece the piece being played
   */
  const makeMove = (board, r, c, piece) => {
    // Put the piece at x,y
    let bCopy = othello_util.copyBoard(board);
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
      if (
        othello_util.checkFlip(
          bCopy,
          r + deltaRow,
          c + deltaCol,
          deltaRow,
          deltaCol,
          piece,
          opponent
        )
      ) {
        bCopy = othello_util.flipPieces(
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
  };

  /**
   * Counts player's pieces on the board
   * @param {number[][]} board current game board
   * @param {number} piece the piece to count
   * @returns number of player's piece
   */
  const score = (board, piece) => {
    let total = 0;
    for (let r = 0; r < N; r += 1) {
      for (let c = 0; c < N; c += 1) {
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
   * Checks if game is over
   * @param {number[][]} board current game board
   * @returns true if both players are out of moves
   */
  const gameOver = (board) =>
    !othelloCode.getMoveList(board, 1)[0] && !othelloCode.getMoveList(board, 2)[0];

  const minimaxValue = (board, originalTurn, currentTurn, searchPly) => {
    if (searchPly === 5 || gameOver(board)) {
      // Change to desired ply lookahead
      return heuristic(board, originalTurn);
    }

    let opponent = 2;
    if (currentTurn === 2) {
      opponent = 1;
    }

    const moves = othelloCode.getMoveList(board, currentTurn);

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
    for (let i = 0; i < moves.length; i += 1) {
      const [moveRow, moveCol] = moves[i];
      // Apply the move to a new board
      let tempBoard = othello_util.copyBoard(board);
      tempBoard = makeMove(tempBoard, moveRow, moveCol, currentTurn);
      // Recursive call
      const val = minimaxValue(tempBoard, originalTurn, opponent, searchPly + 1);
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
  };

  const minimaxDecision = (board, whoseTurn) => {
    let opponent = 2;
    if (whoseTurn === 2) {
      opponent = 1;
    }

    const moves = othelloCode.getMoveList(board, whoseTurn);

    // If there are no moves, return -1
    if (!moves[0]) {
      return [-1, -1];
    }

    let bestMoveVal = -99999;
    let [bestX, bestY] = moves[0];

    // Try out every move
    for (let i = 0; i < moves.length; i += 1) {
      const [moveRow, moveCol] = moves[i];
      let tempBoard = othello_util.copyBoard(board);
      tempBoard = makeMove(tempBoard, moveRow, moveCol, whoseTurn);
      // Recursive call, initial search ply = 1
      const val = minimaxValue(tempBoard, whoseTurn, opponent, 1);
      // Remember best move
      if (val > bestMoveVal) {
        bestMoveVal = val;
        bestX = moveRow;
        bestY = moveCol;
      }
    }

    return [bestX, bestY];
  };

  // Initialize game board
  let board = othello_util.board;
  let moves = othelloCode.getMoveList(board, curPlayer);

  const setup = (p5, canvasParentRef) => {
    // use parent to render the canvas in this ref
    // (without that p5 will render the canvas outside of your component)
    const othello = document.querySelector(".codeOutput");
    p5.createCanvas(othello.clientWidth, othello.clientHeight).parent(canvasParentRef);
  };

  const draw = (p5) => {
    // Global game variables
    const boardWidth = Math.min(p5.width, p5.height);
    const xOffset = p5.width > p5.height ? (p5.width - p5.height) / 2 : 0;
    const yOffset = p5.height > p5.width ? (p5.height - p5.width) / 2 : 0;

    p5.background(0);

    // Draw board
    for (let r = 0; r < N; r += 1) {
      for (let c = 0; c < N; c += 1) {
        // Board tile
        const w = boardWidth / N;
        p5.stroke(0);
        p5.strokeWeight(2);
        p5.fill(52, 168, 85);
        p5.rect(c * w + xOffset, r * w + yOffset, w);

        // Draw player
        const v = board[r][c];
        if (v > 0) {
          // Player token exists
          p5.strokeWeight(1);
          p5.fill((v === 2) * 255);
          const tokenWidth = 0.85 * w;
          p5.ellipse(c * w + w / 2 + xOffset, r * w + w / 2 + yOffset, tokenWidth);
        }
      }
    }

    // Draw valid moves
    p5.noFill();
    p5.strokeWeight(2);
    p5.stroke(160);
    const tileWidth = boardWidth / N;
    for (let i = 0; i < moves.length; i += 1) {
      const [moveRow, moveCol] = moves[i];
      p5.ellipse(
        (moveCol * boardWidth) / N + tileWidth / 2 + xOffset,
        (moveRow * boardWidth) / N + tileWidth / 2 + yOffset,
        0.85 * tileWidth
      );
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
      const yOffset = p5.height > p5.width ? (p5.height - p5.width) / 2 : 0;

      const c = Math.floor(((p5.mouseX - xOffset) / boardWidth) * N);
      const r = Math.floor(((p5.mouseY - yOffset) / boardWidth) * N);
      if (othello_util.validMove(board, r, c, curPlayer)) {
        board = makeMove(board, r, c, curPlayer);
        if (curPlayer === 1) {
          curPlayer = 2;
          const computerMove = minimaxDecision(board, curPlayer);
          if (computerMove[0] !== -1) {
            board = makeMove(board, computerMove[0], computerMove[1], curPlayer);
            curPlayer = 1;
          }
        } else {
          curPlayer = 1;
        }
        moves = othello_util.getMoveList(board, curPlayer);
      }
    }
  };

  return (
    <BaseLayout
      title="Games"
      breadcrumb={[{ label: "Games", route: "/sections/games/othello" }, { label: "Othello" }]}
    >
      <View title="Othello" code={othelloCode} height="40rem">
        <Sketch setup={setup} draw={draw} mouseClicked={mouseClicked} />
      </View>

      <div className="comments-container">
        {comments.length ? (
          <DHComments comments={sortComments(comments)} pageName={id} user={user} />
        ) : (
          <div></div>
        )}
        <DHEditor ref={editorRef} />
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

export default Othello;
