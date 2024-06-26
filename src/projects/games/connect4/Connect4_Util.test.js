// Unit to test
import Connect4_Util from "projects/games/connect4/Connect4_Util";

describe("Connect4_Util", () => {
  // Initialize Connect 4 board
  const game = new Connect4_Util();

  it("drops piece", () => {
    const testBoard = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 2, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0, 0],
    ];
    const correctBoard = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0, 0],
      [0, 0, 2, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0, 0],
    ];
    const dropPieceBoard = game.dropPiece(testBoard, 3, 2, 1);
    expect(dropPieceBoard).toEqual(correctBoard);
  });

  it("gets valid locations", () => {
    const testBoard = [
      [0, 2, 1, 0, 0, 1, 0],
      [0, 1, 2, 0, 0, 1, 0],
      [0, 2, 1, 0, 2, 1, 0],
      [1, 1, 1, 0, 2, 1, 0],
      [1, 2, 2, 1, 1, 1, 0],
      [1, 2, 1, 2, 1, 2, 0],
    ];
    const validLocations = [0, 3, 4, 6];
    const foundLocations = game.getValidLocations(testBoard);
    expect(foundLocations).toEqual(validLocations);
  });

  it("gets next open row", () => {
    const testBoard = [
      [0, 2, 1, 0, 0, 1, 0],
      [0, 1, 2, 0, 0, 1, 0],
      [0, 2, 1, 0, 2, 1, 0],
      [1, 1, 1, 0, 2, 1, 0],
      [1, 2, 2, 1, 1, 1, 0],
      [1, 2, 1, 2, 1, 2, 0],
    ];
    const col0 = game.getNextOpenRow(testBoard, 0);
    const col1 = game.getNextOpenRow(testBoard, 1);
    const col2 = game.getNextOpenRow(testBoard, 2);
    const col3 = game.getNextOpenRow(testBoard, 3);
    const col4 = game.getNextOpenRow(testBoard, 4);
    const col5 = game.getNextOpenRow(testBoard, 5);
    const col6 = game.getNextOpenRow(testBoard, 6);
    expect(col0).toEqual(2);
    expect(col1).toEqual(-1);
    expect(col2).toEqual(-1);
    expect(col3).toEqual(3);
    expect(col4).toEqual(1);
    expect(col5).toEqual(-1);
    expect(col6).toEqual(5);
  });

  it("identifies winning board", () => {
    const tieBoard = [
      [1, 2, 1, 2, 1, 2, 1],
      [1, 2, 1, 1, 1, 2, 1],
      [2, 1, 2, 2, 2, 1, 2],
      [1, 2, 1, 1, 1, 2, 1],
      [2, 1, 2, 2, 2, 1, 2],
      [2, 2, 2, 1, 1, 1, 2],
    ];
    const winner1 = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0, 0],
      [0, 0, 2, 2, 0, 0, 0],
      [1, 1, 1, 1, 2, 0, 0],
    ];
    const winner2 = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 2, 0, 0],
      [0, 0, 1, 2, 1, 0, 0],
      [0, 0, 2, 2, 1, 0, 0],
      [1, 2, 1, 1, 2, 0, 0],
    ];
    const winner3 = [
      [2, 0, 0, 0, 0, 0, 0],
      [1, 2, 0, 0, 0, 0, 0],
      [1, 1, 2, 0, 1, 0, 0],
      [2, 1, 1, 2, 1, 0, 0],
      [1, 1, 2, 2, 1, 0, 0],
      [1, 2, 1, 1, 2, 0, 0],
    ];
    const winner4 = [
      [2, 0, 0, 0, 0, 0, 0],
      [1, 2, 0, 0, 1, 0, 0],
      [1, 1, 2, 0, 1, 0, 0],
      [2, 1, 1, 2, 1, 0, 0],
      [1, 1, 2, 2, 1, 0, 0],
      [1, 2, 1, 1, 2, 0, 0],
    ];
    const win0 = game.winningMove(tieBoard);
    const win1 = game.winningMove(winner1);
    const win2 = game.winningMove(winner2);
    const win3 = game.winningMove(winner3);
    const win4 = game.winningMove(winner4);
    expect(win0).toEqual(0);
    expect(win1).toEqual(1);
    expect(win2).toEqual(2);
    expect(win3).toEqual(2);
    expect(win4).toEqual(1);
  });

  it("identifies ties", () => {
    const tieBoard = [
      [1, 2, 1, 2, 1, 2, 1],
      [1, 2, 1, 1, 1, 2, 1],
      [2, 1, 2, 2, 2, 1, 2],
      [1, 2, 1, 1, 1, 2, 1],
      [2, 1, 2, 2, 2, 1, 2],
      [2, 2, 2, 1, 1, 1, 2],
    ];
    const winner1 = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0, 0],
      [0, 0, 2, 2, 0, 0, 0],
      [1, 1, 1, 1, 2, 0, 0],
    ];
    const win0 = game.checkTie(tieBoard);
    const win1 = game.checkTie(winner1);
    expect(win0).toBeTruthy();
    expect(win1).toBeFalsy();
  });

  it("calculates minimax", () => {
    const tieBoard = [
      [1, 2, 1, 2, 1, 2, 0],
      [1, 2, 1, 1, 1, 2, 1],
      [2, 1, 2, 2, 2, 1, 2],
      [1, 2, 1, 1, 1, 2, 1],
      [2, 1, 2, 2, 2, 1, 2],
      [2, 2, 2, 1, 1, 1, 2],
    ];
    const game1 = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0, 0],
      [0, 0, 2, 2, 0, 0, 0],
      [0, 0, 1, 1, 0, 0, 0],
    ];
    const game2 = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0, 0],
      [0, 0, 2, 2, 2, 0, 0],
      [0, 1, 1, 1, 2, 0, 0],
    ];
    const game3 = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0, 0],
      [0, 0, 2, 2, 2, 1, 0],
      [2, 1, 1, 1, 2, 1, 0],
    ];
    const tiePlay = game.minimax(tieBoard);
    const game1Play = game.minimax(game1);
    const game2Play = game.minimax(game2);
    const game3Play = game.minimax(game3);
    expect(tiePlay).toEqual([6, 0]);
    expect(game1Play).toEqual([1, 7]);
    expect(game2Play).toEqual([1, 1 / 0]);
    expect(game3Play).toEqual([1, 1 / 0]);
  });

  it("calculates window", () => {
    const window1 = game.calcWindow(4, 1, 2);
    const window2 = game.calcWindow(3, 1, 2);
    const window3 = game.calcWindow(2, 2, 2);
    const window4 = game.calcWindow(1, 1, 3);
    const window5 = game.calcWindow(2, 1, 4);
    expect(window1).toEqual(100);
    expect(window2).toEqual(5);
    expect(window3).toEqual(2);
    expect(window4).toEqual(-4);
    expect(window5).toEqual(-100);
  });
});
