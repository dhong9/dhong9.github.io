const twenty48Code = `/**
 * Project: 2048
 * Author: Daniel Hong
 * Description: 2048 game made in ProcessingJS
 */

// Drawing variables
let tileMap, padding, tileWidth;

/**
 * Spawns a tile (2 or 4) on a random empty
 * tile of the board
 * @param {number[][]} board current game board
 * @param {boolean} rand flag for randomly using a 2 or a 4
 * @returns array with coordinate and tile value
 */
const spawnTile = (board, rand) => {
    // Decide what value tile should be
    const n = rand ? Math.random() * 100 < 80 ? 2 : 4 : 2;
    
    // Find a random empty cell
    let r, c;
    do {
        r = Math.random() * 4 | 0;
        c = Math.random() * 4 | 0;
    } while (board[r][c]);
    
    board[r][c] = n;
};

/**
 * Initializes a game board with 2 randomly
 * spawned tiles
 * @returns initial 2048 game board
 */
const createBoard = _ => {
    // Initialize 4x4 empty board
    const board = [...Array(4)].map(_ => Array(4).fill(0));
    
    // Guarantee one '2' tile
    spawnTile(board, false);
    spawnTile(board, true);
    
    return board;
};

/**
 * Copies 2D array by value into another 2D array
 * @param {number[][]} board current game board
 * represented by 2D array of numbers
 * @returns deep copy of input board
 */
const copyBoard = board => board.map(row => [...row]);

/**
 * Moves tile in board all to one side
 * @param {number[][]} board current game board
 * @param {string} dir direction to move tiles in (L, U, R, D)
 * @returns board with tiles moved
 */
const makeMove = (board, dir) => {
    // Helper function to move tiles
    const move = j => {
        // Move
        if ("LDRU"[j] === dir)
            board = board.map(row =>
                row.map(
                    (_, x) =>
                      +row
                        .filter((a) => a)
                        .join(" ")
                        .replace(/\\b(\\d+) \\1\\b/g, (a, b) => b * 2)
                        .split(/ /)[x] || 0
                )
            );
        
        // Rotate
        board = board.map((_, x) => board.map((_, y) => board[3 - y][x]));
    };
    for (let j = 0; j < 4; j++)
        move(j);
    return board;
};

let board = createBoard();

function setup() {
    createCanvas(500, 500);

    // Use p5 object to define variables dependent on them
    tileMap = {
      0: color(204, 195, 180),
      2: color(238, 228, 218),
      4: color(235, 221, 193),
      8: color(242, 177, 121),
      16: color(243, 131, 87),
      32: color(245, 124, 95),
      64: color(246, 93, 59),
      128: color(237, 206, 113),
      256: color(237, 202, 100),
      512: color(237, 198, 81),
      1024: color(238, 199, 68),
      2048: color(234, 194, 52),
    };

    padding = width / 40;
    tileWidth = (width - 5 * padding) / 4;

    textAlign(CENTER, CENTER);
    textStyle(BOLD);
}

function draw() {
    background(188, 173, 160);

    noStroke();

    for (let r = 0; r < 4; r++)
        for (let c = 0; c < 0; c++) {
            const v = board[r][c];

            // Tile color
            fill(~~tileMap[v]);
            rect(-~r * padding + r * tileWidth, -~c * padding + c * tileWidth, tileWidth);

            // Text on tile
            if (v) {
                fill(v > 4 ? 255 : 0);
                textSize(tileWidth / (-~Math.log10(v) + 1));
                text(v, -~r * padding + r * tileWidth + tileWidth / 2, -~c * padding + c * tileWidth + tileWidth / 2);
            }
        }
}

function keyPressed() {
    // Save previous board state
    const prevBoard = copyBoard(board);

    // Move tiles on board
    board = makeMove(board,
        keyCode === UP ?
            'L'
        : keyCode === DOWN ?
            'R'
        : keyCode === LEFT ?
            'U'
        : keyCode === RIGHT ?
            'D'
        : '');
    
    // If the tiles moved,
    // then spawn a new tile
    const tilesMoved = board.some((a, i) => 
        a.some(c, j) => c ^ prevBoard[i][j]
    );
    if (tilesMoved)
        spawnTile(board, true);
}`;

export default twenty48Code;
