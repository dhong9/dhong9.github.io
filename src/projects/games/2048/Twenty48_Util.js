function Twenty48_Util() {}

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
  let updatedBoard = twenty48_util.copyBoard(board);

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
    return twenty48_util.rot90(updatedBoard);
  };

  for (let j = 0; j < 4; j += 1) {
    updatedBoard = move(j);
  }

  return updatedBoard;
};

export default Twenty48_Util;
