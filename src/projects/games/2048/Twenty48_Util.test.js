// Unit to test
import Twenty48_Util from "projects/games/2048/Twenty48_Util";

describe("Twenty48_Util", () => {
  // Initialize 2048 game board
  const game = new Twenty48_Util();

  it("moves tiles right", () => {
    const testBoard = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 2, 2],
    ];

    const updatedBoard = game.makeMove(testBoard, "R");
    const correctBoard = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 4],
    ];

    expect(updatedBoard).toEqual(correctBoard);
  });

  it("moves tiles left", () => {
    const testBoard = [
      [0, 0, 0, 0],
      [2, 0, 0, 0],
      [0, 4, 4, 0],
      [0, 0, 0, 4],
    ];

    const updatedBoard = game.makeMove(testBoard, "L");
    const correctBoard = [
      [0, 0, 0, 0],
      [2, 0, 0, 0],
      [8, 0, 0, 0],
      [4, 0, 0, 0],
    ];

    expect(updatedBoard).toEqual(correctBoard);
  });

  it("moves tiles up", () => {
    const testBoard = [
      [2, 0, 0, 0],
      [2, 0, 0, 0],
      [8, 4, 4, 0],
      [0, 0, 0, 4],
    ];

    const updatedBoard = game.makeMove(testBoard, "U");
    const correctBoard = [
      [4, 4, 4, 4],
      [8, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];

    expect(updatedBoard).toEqual(correctBoard);
  });

  it("moves tiles down", () => {
    const testBoard = [
      [2, 0, 0, 0],
      [2, 0, 0, 0],
      [8, 4, 4, 0],
      [0, 0, 0, 4],
    ];

    const updatedBoard = game.makeMove(testBoard, "D");
    const correctBoard = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [4, 0, 0, 0],
      [8, 4, 4, 4],
    ];

    expect(updatedBoard).toEqual(correctBoard);
  });
});
