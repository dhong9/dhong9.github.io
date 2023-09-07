// Unit to test
import Othello_Util from "projects/games/othello/Othello_Util";

describe("Othello_Util", () => {
  // Initialize Othello board
  const game = new Othello_Util();

  it("makes moves", () => {
    const board1 = [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 2, 0, 0, 0],
      [0, 0, 0, 2, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ];
    const flippedBoard1 = game.makeMove(board1, 5, 4, 2);
    const correctBoard1 = [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 2, 0, 0, 0],
      [0, 0, 0, 2, 2, 0, 0, 0],
      [0, 0, 0, 0, 2, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ];
    expect(flippedBoard1).toEqual(correctBoard1);

    const board2 = [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 2, 0, 0, 0],
      [0, 0, 0, 2, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ];
    const flippedBoard2 = game.makeMove(board2, 2, 4, 1);
    const correctBoard2 = [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 1, 1, 0, 0, 0],
      [0, 0, 0, 2, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ];
    expect(flippedBoard2).toEqual(correctBoard2);
  });

  it("gets move list", () => {
    const board = [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 2, 0, 0, 0],
      [0, 0, 0, 2, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ];
    const expectedMoveList = [
      [2, 3],
      [3, 2],
      [4, 5],
      [5, 4],
    ];
    const moveList = game.getMoveList(board, 2);
    expect(expectedMoveList).toEqual(moveList);
  });

  it("makes minimax decisions", () => {
    const board = [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 2, 0, 0, 0],
      [0, 0, 0, 2, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ];
    const expectedMove = [2, 3];
    const calcMove = game.minimaxDecision(board, 2);
    expect(calcMove).toEqual(expectedMove);

    const tieBoard = [
      [2, 2, 2, 2, 2, 1, 2, 1],
      [1, 2, 2, 1, 1, 1, 2, 1],
      [2, 2, 2, 2, 2, 2, 2, 1],
      [2, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 2, 1, 2, 2, 2, 1],
      [1, 1, 2, 1, 1, 2, 2, 1],
      [1, 1, 2, 2, 1, 1, 2, 1],
      [1, 1, 1, 1, 1, 1, 1, 0],
    ];
    const expectedTieMove = [-1, -1];
    const calcTieMove = game.minimaxDecision(tieBoard, 2);
    expect(calcTieMove).toEqual(expectedTieMove);
  });
});
