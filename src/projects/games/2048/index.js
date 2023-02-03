import Sketch from "react-p5";

function Twenty48() {
  // Drawing variables
  let tileMap;
  let padding;
  let tileWidth;

  const spawnTile = (board, rand) => {
    let n = 2;
    if (rand) {
      n = Math.random() * 100 < 80 ? 2 : 4;
    }
    let r;
    let c;
    do {
      r = Math.floor(Math.random() * 4);
      c = Math.floor(Math.random() * 4);
    } while (board[r][c]);
    return [r, c, n];
  };

  const createBoard = () => {
    const board = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];

    const [r1, c1, n1] = spawnTile(board, false);
    board[r1][c1] = n1;

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

  const makeMove = (board, dir) => {
    let updatedBoard = copyBoard(board);
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
    p5.createCanvas(500, 500).parent(canvasParentRef);

    // Use p5 object to define variables dependent on them
    tileMap = {
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

    padding = p5.width / 40;
    tileWidth = (p5.width - 5 * padding) / 4;

    p5.textAlign(p5.CENTER, p5.CENTER);
  };

  const draw = (p5) => {
    p5.background(188, 173, 160);

    p5.noStroke();

    for (let r = 0; r < 4; r += 1) {
      for (let c = 0; c < 4; c += 1) {
        const v = board[r][c];

        // Tile color
        if (v in tileMap) {
          p5.fill(tileMap[v]);
        } else {
          p5.fill(0);
        }
        p5.rect((r + 1) * padding + r * tileWidth, (c + 1) * padding + c * tileWidth, tileWidth);

        // Text on tile
        if (v) {
          p5.fill(v > 4 ? 255 : 0);
          p5.textSize(tileWidth / Math.floor(Math.log10(v) + 2));
          p5.text(
            v,
            (r + 1) * padding + r * tileWidth + tileWidth / 2,
            (c + 1) * padding + c * tileWidth + tileWidth / 2
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

  return <Sketch setup={setup} draw={draw} keyPressed={keyPressed} />;
}

export default Twenty48;
