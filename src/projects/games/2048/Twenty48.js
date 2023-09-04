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

module.exports = Twenty48_Util;
