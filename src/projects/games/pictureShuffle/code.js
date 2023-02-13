const pictureShuffleCode = `/**
 * Project: Picture Shuffle
 * Author: Daniel Hong
 * Description: Rearrange parts of a picture on a
 *              shuffle board
 */

/**
 * Picture tile with a fraction of a full image
 */
class Tile {
    /**
     * Initializes Tile object with ID, dimensions, and image
     * @param {number} id tile ID >= 0
     * @param {number} x x position
     * @param {number} y y position
     * @param {number} w width
     * @param {p5Image} img image
     */
    constructor(id, x, y, w, img) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.w = w;
        this.img = img;
    }
    
    /**
     * Draws tile
     */
    draw() {
        // Draw an image if ID is not 0
        // Otherwise, draw a blank space
        if (this.id) {
            image(this.img, this.x, this.y, this.w, this.w);
        } else {
            fill(0);
            rect(this.x, this.y, this.w);
        }

        // Tile border
        noFill();
        rect(this.x, this.y, this.w);
    }

    /**
     * Checks if mouse is inside the tile
     * @returns true if mouse is inside the tile
     */
    isMouseInside() {
        return (
            mouseX > this.x &&
            mouseX < this.x + this.w &&
            mouseY > this.y &&
            mouseY < this.y + this.w
        );
  }
}

/**
 * Picture shuffle board containing image tiles
 */
class Board {
    /**
     * Initializes Board object with ID, dimensions, and image
     * @param {number} bw board width
     * @param {number} n rows/columns in a board
     * @param {p5Image} img puzzle image
     */
    constructor(bw, n, img) {
        this.n = n;
        this.bw = bw;
        this.solved = false;
    
        // Temporarily draw image to get pixel data
        image(img, 0, 0, bw, bw);
    
        this.board = [];
        const w = bw / n;
        for (let r = 0; r < this.n; r++) {
          const temp = [];
          for (let c = 0; c < this.n; c++) {
            // Using ID n * c + r gives range [0...n], excluding n
            // So add 1 to the IDs
            temp.push(new Tile(n * r + c + 1, c * w, r * w, w, p5.get(c * w, r * w, w, w)));
          }
          this.board.push(temp);
        }
    
        // Bottom left of the board should be empty
        this.board[n - 1][n - 1].id = 0;
    
        this.shuffle();
    }
    
    /**
     * Draws all tiles on board
     */
    draw() {
        for (const row of this.board)
            for (const tile of row)
                tile.draw();
    }
    
    /**
     * Make 1000 random clicks on the board to shuffle
     * tiles around
     */
    shuffle() {
        for (let n = 1000; n; n--) 
            this.moveTile(Math.random() * this.n | 0, Math.random() * this.n | 0)
    }
    
    /**
     * Moves a tile to neighboring empty cell
     * if available
     * @param {number} r board row
     * @param {number} c board column
     */
    moveTile(r, c) {
        // Try to move tile
        const dir = [
            [-1, 0],
            [1, 0],
            [0, -1],
            [0, 1],
        ];

        for (const [dRow, dCol] of dir) {
            const nRow = r + dRow;
            const nCol = c + dCol;

            if (this.board[nRow]?.[nCol] && !this.board[nRow][nCol].id) {
                // If the destination tile is empty,
                // then move the tile there
                this.board[r][c].x += dCol * this.board[r][c].w;
                this.board[r][c].y += dRow * this.board[r][c].w;
        
                // Move blank tile to old tile's spot
                this.board[nRow][nCol].x -= dCol * this.board[nRow][nCol].w;
                this.board[nRow][nCol].y -= dRow * this.board[nRow][nCol].w;
        
                // Swap board positions in the array
                [this.board[r][c], this.board[nRow][nCol]] = [this.board[nRow][nCol], this.board[r][c]];
            }
        }
    }

    /**
     * Handle mouse clicked event at board level
     */
    mouseClicked() {
        if (!this.solved) {
            // Get tile location
            const r = (p5.mouseY / this.bw) * this.n | 0;
            const c = (p5.mouseX / this.bw) * this.n | 0;

            this.moveTile(r, c);

            // Check for a win
            let win = true;
            for (let r = 0; r < this.n; r++) {
                for (let c = 0; c < this.n; c++) {
                    win = win && (r === this.n - 1 && c === this.n - 1 ? !this.board[r][c].id : this.board[r][c].id == this.n * r + c + 1);
                }
            }
            this.solved = win;
        }
    }
}`;

export default pictureShuffleCode;
