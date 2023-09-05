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
            [0, 0, 1, 0, 0, 0, 0]
        ];
        const correctBoard = [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0, 0, 0],
            [0, 0, 2, 0, 0, 0, 0],
            [0, 0, 1, 0, 0, 0, 0]
        ];
        const dropPieceBoard = game.dropPiece(testBoard, 3, 2, 1);
        expect(dropPieceBoard).toEqual(correctBoard);
    });
});