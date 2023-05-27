// Sections components
import BaseLayout from "layouts/sections/components/BaseLayout";
import View from "layouts/sections/components/View";
import MKButton from "components/MKButton";
import MKInput from "components/MKInput";
import DHComments from "components/DHComments";

// Othello code
import othelloCode from "projects/games/othello/code";

// p5
import Sketch from "react-p5";

import React, { useState } from "react";

const getNewComment = (commentValue, isRootNode = false, parentNodeId) => ({
  id: uuid(),
  commentText: commentValue,
  childCommments: [],
  isRootNode,
  parentNodeId,
});

function Othello() {
  const [comments, setComments] = useState([]);
  const [rootComment, setRootComment] = useState("");
  const addComment = (parentId, newCommentText) => {
    let newComment = null;
    if (parentId) {
      newComment = getNewComment(newCommentText, false, parentId);
      setComments((newComments) => ({
        ...newComments,
        [parentId]: {
          ...newComments[parentId],
          childCommments: [...newComments[parentId].childCommments, newComment.id],
        },
      }));
    } else {
      newComment = getNewComment(newCommentText, true, null);
    }
    setComments((newComments) => ({ ...newComments, [newComment.id]: newComment }));
  };
  const commentMapper = (comment) => ({
    ...comment,
    childCommments: comment.childCommments
      .map((id) => comments[id])
      .map((newComment) => commentMapper(newComment)),
  });
  const enhancedComments = Object.values(comments)
    .filter((comment) => !comment.parentNodeId)
    .map(commentMapper);
  const onAdd = () => {
    addComment(null, rootComment);
    setRootComment("");
  };

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
   * Copies 2D array by value into another 2D array
   * @param {number[][]} board current game board
   * represented by 2D array of numbers
   * @returns deep copy of input board
   */
  const copyBoard = (board) => board.map((row) => [...row]);

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
    if (inBounds(r, c) && board[r][c] === opponentPiece) {
      const bCopy = copyBoard(board);
      bCopy[r][c] = myPiece;
      return flipPieces(
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
    let row = r;
    let col = c;

    if (inBounds(row, col) && board[row][col] === opponentPiece) {
      while (inBounds(row + deltaRow, col + deltaCol)) {
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
  };

  /**
   * Checks if piece can be placed at specified coordinate
   * @param {number[][]} board current game board
   * @param {number} r row
   * @param {number} c column
   * @param {number} piece the piece being played
   * @returns true if move is valid
   */
  const validMove = (board, r, c, piece) => {
    // Check that the coordinates are empty
    if (!inBounds(r, c) || board[r][c]) {
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
   * @param {number} the piece being played
   * @returns list of coordinates that can be played
   */
  const getMoveList = (board, piece) => {
    const moves = [];

    // Check each square of the board and if we can move there, remember the coords
    for (let r = 0; r < N; r += 1) {
      for (let c = 0; c < N; c += 1) {
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
    let bCopy = copyBoard(board);
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
      if (checkFlip(bCopy, r + deltaRow, c + deltaCol, deltaRow, deltaCol, piece, opponent)) {
        bCopy = flipPieces(bCopy, r + deltaRow, c + deltaCol, deltaRow, deltaCol, piece, opponent);
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
    for (let i = 0; i < moves.length; i += 1) {
      const [moveRow, moveCol] = moves[i];
      // Apply the move to a new board
      let tempBoard = copyBoard(board);
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

    const moves = getMoveList(board, whoseTurn);

    // If there are no moves, return -1
    if (!moves[0]) {
      return [-1, -1];
    }

    let bestMoveVal = -99999;
    let [bestX, bestY] = moves[0];

    // Try out every move
    for (let i = 0; i < moves.length; i += 1) {
      const [moveRow, moveCol] = moves[i];
      let tempBoard = copyBoard(board);
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
  let board = createBoard();
  let moves = getMoveList(board, curPlayer);

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
      if (validMove(board, r, c, curPlayer)) {
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
        moves = getMoveList(board, curPlayer);
      }
    }
  };

  return (
    <BaseLayout
      title="Page Headers"
      breadcrumb={[
        { label: "Page Sections", route: "/sections/page-sections/page-headers" },
        { label: "Page Headers" },
      ]}
    >
      <View title="Header 1" code={othelloCode} height="40rem">
        <Sketch setup={setup} draw={draw} mouseClicked={mouseClicked} />
      </View>

      <div className="comments-container">
        <MKInput
          variant="standard"
          label="What can we help you?"
          placeholder="Add a comment"
          InputLabelProps={{ shrink: true }}
          multiline
          fullWidth
          rows={6}
          onChange={(e) => setRootComment(e.target.value)}
          value={rootComment}
        />{" "}
        <MKButton onClick={onAdd} type="submit" variant="gradient" color="info">
          Add
        </MKButton>
      </div>
      <div
        style={{
          border: "1px solid blue",
          width: "60%",
          margin: "auto",
          overflowX: "auto",
          padding: "2rem",
        }}
      >
        {enhancedComments.map((comment) => (
          <DHComments key={0} comment={comment} addComment={addComment} />
        ))}
      </div>
    </BaseLayout>
  );
}

export default Othello;
