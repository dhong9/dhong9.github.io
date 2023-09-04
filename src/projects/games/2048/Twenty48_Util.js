function Twenty48_Util() {

  // Helper function to spawn a random tile
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

  // Initialize 4x4 empty board
  this.board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  // Guarantee one '2' tile
  const [r1, c1, n1] = spawnTile(this.board, false);
  this.board[r1][c1] = n1;

  // Other tile can be either '2' or '4'
  const [r2, c2, n2] = spawnTile(this.board, true);
  this.board[r2][c2] = n2;
}

/**
 * Copies 2D array by value into another 2D array
 * @param {number[][]} board current game board
 * represented by 2D array of numbers
 * @returns deep copy of input board
 */
Twenty48_Util.prototype.copyBoard = (board) => board.map((row) => [...row]);

/**
 * Rotates board 90 degrees counter clockwise
 * @param {number[][]} board current game board
 * @returns rotated board
 */
Twenty48_Util.prototype.rot90 = (board) => {
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
Twenty48_Util.prototype.makeMove = (board, dir) => {
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
};

export default Twenty48_Util;
