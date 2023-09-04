function Twenty48_Util() {}

/**
 * Copies 2D array by value into another 2D array
 * @param {number[][]} board current game board
 * represented by 2D array of numbers
 * @returns deep copy of input board
 */
Twenty48.prototype.copyBoard = (board) => board.map((row) => [...row]);

module.exports = Twenty48_Util;
