const brainFCode = `/**
* Project: BrainF interpreter
* Author: Daniel Hong
* Description: Online interpreter for the esoteric BrainF programming language
*/

/**
 * Processes BrainF code and returns its output
 * @param src {String} source code
 * @returns aggregate of all char prints
 */
function brainF(src) {
    let i = 0; // Current cell
    let res = ''; // Stores all prints
    const cells = {}; // Tracks all cell values

    // Operator functions
    const moveRight = c => {
        i++;
        return c;
    }
    const moveLeft = c => {
        i = Math.max(i - 1, 0);
        return c;
    }
    const increment = c => {
        cells[i] = -~cells[i];
        return c;
    }
    const decrement = c => {
        cells[i] = cells[i]-- < 0 ? 255 : cells[i];
        return c;
    }
    const print = c => {
        res += String.fromCharCode(cells[i]);
        return c;
    }
    const beginLoop = c => {
        c = cells[i] ? c : [...src].findIndex((v, j) => j > c && v === ']') + 1
        return c;
    }
    const endLoop = c => {
        if (cells[i]) {
            let j = 0;
            for (let k = 0; k < c; k++) {
            if (src[k] === '[')
                j = k;
            }
            c = j;
        }
        return c;
    }

    // Valid operations
    const ops = {
        '>': moveRight,
        '<': moveLeft,
        '+': increment,
        '-': decrement,
        '.': print,
        ',': null,
        '[': beginLoop,
        ']': endLoop,
        '!': null
    };

    for (let c = 0; c < src.length; c++) {
        if (src[c] in ops) {
            c = ops[src[c]](c);
        }
    }

    return res;
}`;

export default brainFCode;
