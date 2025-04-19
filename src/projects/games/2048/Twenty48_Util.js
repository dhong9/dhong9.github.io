class Twenty48_Util {
  constructor() {
    // Initialize 4x4 empty board
    this.board = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];

    // Guarantee one '2' tile
    this.spawnTile(this.board, false);

    // Other tile can be either '2' or '4'
    this.spawnTile(this.board, true);
  }

  /**
   * Spawns a tile (2 or 4) on a random empty
   * tile of the board
   * @param {number[][]} board current game board
   * @param {boolean} rand flag for randomly using a 2 or a 4
   */
  spawnTile(board, rand) {
    // Decide what value tile should be
    const n = rand ? (Math.random() * 100 < 80 ? 2 : 4) : 2;

    // Find a random empty cell
    let r, c;
    do {
      r = (Math.random() * 4) | 0;
      c = (Math.random() * 4) | 0;
    } while (board[r][c]);

    board[r][c] = n;
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
   * Rotates board 90 degrees counter clockwise
   * @param {number[][]} board current game board
   * @returns rotated board
   */
  rot90(board) {
    const result = [];
    for (let i = 0; i < 4; i += 1) {
      result.push([]);
      for (let j = 3; j >= 0; j -= 1) {
        result[i][3 - j] = board[j][i];
      }
    }
    return result;
  }

  /**
   * Moves tile in board all to one side
   * @param {number[][]} board current game board
   * @param {string} dir direction to move tiles in (L, U, R, D)
   * @returns board with tiles moved
   */
  makeMove(board, dir) {
    let updatedBoard = this.copyBoard(board);

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
      return this.rot90(updatedBoard);
    };

    for (let j = 0; j < 4; j += 1) {
      updatedBoard = move(j);
    }

    return updatedBoard;
  }

  hasEmptySquare(board) {
    return board.some((row) => row.some((e) => !e));
  }

  hasMergableTiles(board) {
    const dir = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ];
    return board.some((row, i) =>
      row.some((v, j) =>
        dir.some(([dRow, dCol]) => {
          const nextRow = i + dRow,
            nextCol = j + dCol;
          return i >= 0 && i < 4 && j >= 0 && j < 4 && board[nextRow][nextCol] === v;
        })
      )
    );
  }
}

export default Twenty48_Util;
