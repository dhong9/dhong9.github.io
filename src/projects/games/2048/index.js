// Sections components
import BaseLayout from "layouts/sections/components/BaseLayout";
import View from "layouts/sections/components/View";
import MKButton from "components/MKButton";
import DHComments from "components/DHComments";
import DHEditor from "components/DHEditor";

// Form
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

// 2048 code
import twenty48Code from "projects/games/2048/code";

// p5
import Sketch from "react-p5";

// React
import { useContext, useEffect, useState, useRef } from "react";

// Service
import { getComments, addComment } from "services/commentsService";

// Authentication
import AuthContext from "context/AuthContext";

function Twenty48() {
  const editorRef = useRef();
  const id = 2;

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
      setComments(results.filter(({ pageName }) => pageName === "2048"));
    });
  }, []);

  /**
   * Spawns a tile (2 or 4) on a random empty
   * tile of the board
   * @param {number[][]} board current game board
   * @param {boolean} rand flag for randomly using a 2 or a 4
   * @returns array with coordinate and tile value
   */
  const spawnTile = (board, rand) => {
    // Decide what value tile should be
    let n = 2;
    if (rand) {
      n = Math.random() * 100 < 80 ? 2 : 4;
    }

    // Find a random empty cell
    let r;
    let c;
    do {
      r = Math.floor(Math.random() * 4);
      c = Math.floor(Math.random() * 4);
    } while (board[r][c]);

    // Return coordinate and tile value
    return [r, c, n];
  };

  /**
   * Initializes a game board with 2 randomly
   * spawned tiles
   * @returns initial 2048 game board
   */
  const createBoard = () => {
    // Initialize 4x4 empty board
    const board = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];

    // Guarantee one '2' tile
    const [r1, c1, n1] = spawnTile(board, false);
    board[r1][c1] = n1;

    // Other tile can be either '2' or '4'
    const [r2, c2, n2] = spawnTile(board, true);
    board[r2][c2] = n2;

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
   * Rotates board 90 degrees counter clockwise
   * @param {number[][]} board current game board
   * @returns rotated board
   */
  const rot90 = (board) => {
    const result = [];
    for (let i = 0; i < 4; i += 1) {
      result.push([]);
      for (let j = 3; j >= 0; j -= 1) {
        result[i][3 - j] = board[j][i];
      }
    }
    return result;
  };

  /**
   * Moves tile in board all to one side
   * @param {number[][]} board current game board
   * @param {string} dir direction to move tiles in (L, U, R, D)
   * @returns board with tiles moved
   */
  const makeMove = (board, dir) => {
    let updatedBoard = copyBoard(board);

    // Helper function to move tiles
    const move = (j) => {
      if ("LDRU"[j] === dir) {
        updatedBoard = updatedBoard.map((row) =>
          row.map(
            (_, x) =>
              +row
                .filter((a) => a)
                .join(" ")
                .replace(/\b(\d+) \1\b/g, (a, b) => b * 2)
                .split(/ /)[x] || 0
          )
        );
      }

      // Rotate
      return rot90(updatedBoard);
    };

    for (let j = 0; j < 4; j += 1) {
      updatedBoard = move(j);
    }

    return updatedBoard;
  };

  // Initialize game board
  let board = createBoard();

  const setup = (p5, canvasParentRef) => {
    // use parent to render the canvas in this ref
    // (without that p5 will render the canvas outside of your component)
    // Canvas dimension is based on div's size
    const twenty48 = document.querySelector(".codeOutput");
    p5.createCanvas(twenty48.clientWidth, twenty48.clientHeight).parent(canvasParentRef);
  };

  const draw = (p5) => {
    // Global game variables
    const boardWidth = Math.min(p5.width, p5.height);
    const xOffset = p5.width > p5.height ? (p5.width - p5.height) / 2 : 0;
    const yOffset = p5.height > p5.width ? (p5.height - p5.width) / 2 : 0;
    const tileMap = {
      0: p5.color(204, 195, 180),
      2: p5.color(238, 228, 218),
      4: p5.color(235, 221, 193),
      8: p5.color(242, 177, 121),
      16: p5.color(243, 131, 87),
      32: p5.color(245, 124, 95),
      64: p5.color(246, 93, 59),
      128: p5.color(237, 206, 113),
      256: p5.color(237, 202, 100),
      512: p5.color(237, 198, 81),
      1024: p5.color(238, 199, 68),
      2048: p5.color(234, 194, 52),
    };
    const padding = p5.width / 40;
    const tileWidth = (Math.min(p5.width, p5.height) - 5 * padding) / 4;

    p5.textAlign(p5.CENTER, p5.CENTER);
    p5.textStyle(p5.BOLD);

    p5.background(0);

    // Game background
    p5.noStroke();
    p5.fill(188, 173, 160);
    p5.rect(xOffset, yOffset, boardWidth);

    for (let r = 0; r < 4; r += 1) {
      for (let c = 0; c < 4; c += 1) {
        const v = board[r][c];

        // Tile color
        if (v in tileMap) {
          p5.fill(tileMap[v]);
        } else {
          p5.fill(0);
        }
        p5.rect(
          (r + 1) * padding + r * tileWidth + xOffset,
          (c + 1) * padding + c * tileWidth + yOffset,
          tileWidth
        );

        // Text on tile
        if (v) {
          p5.fill(v > 4 ? 255 : 0);
          p5.textSize(tileWidth / Math.floor(Math.log10(v) + 2));
          p5.text(
            v,
            (r + 1) * padding + r * tileWidth + tileWidth / 2 + xOffset,
            (c + 1) * padding + c * tileWidth + tileWidth / 2 + yOffset
          );
        }
      }
    }
  };

  const keyPressed = (p5, e) => {
    // Save previous board state
    const prevBoard = copyBoard(board);

    // Move tiles on board
    const arrow = e.key;
    let dir = "";
    if (arrow === "ArrowUp") {
      dir = "L";
    } else if (arrow === "ArrowDown") {
      dir = "R";
    } else if (arrow === "ArrowLeft") {
      dir = "U";
    } else if (arrow === "ArrowRight") {
      dir = "D";
    }
    board = makeMove(board, dir);

    // If tiles moved,
    // then spawn a new tile
    const tilesMoved = board.some((a, i) => a.some((c, j) => c - prevBoard[i][j]));
    if (tilesMoved) {
      const [r, c, n] = spawnTile(board, true);
      board[r][c] = n;
    }
  };

  return (
    <BaseLayout
      title="Games"
      breadcrumb={[{ label: "Games", route: "/sections/games/2048" }, { label: "2048" }]}
    >
      <View title="2048" code={twenty48Code} height="40rem">
        <Sketch setup={setup} draw={draw} keyPressed={keyPressed} />
      </View>

      <div className="comments-container">
        {comments.length ? (
          <DHComments comments={comments} pageName="2048" user={user} />
        ) : (
          <div></div>
        )}
        <DHEditor ref={editorRef} />
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={isPlainText} onChange={handleChange} />}
            label="Plain Text"
          />
          <MKButton onClick={onAdd} type="submit" variant="gradient" color="info">
            Add
          </MKButton>
        </FormGroup>
      </div>
    </BaseLayout>
  );
}

export default Twenty48;
