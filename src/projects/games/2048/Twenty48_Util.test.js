// Unit to test
import Twenty48_Util from "projects/games/2048/Twenty48_Util";

describe("Twenty48_Util", () => {
    // Initialize 2048 game board
    const game = new Twenty48_Util();

    it("moves tiles", () => {
        const testBoard = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 2, 2]
        ];

        const updatedBoard = game.makeMove(testBoard, 'R');
        const correctBoard = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 4]
        ];

        expect(updatedBoard).toEqual(correctBoard);
    });
});