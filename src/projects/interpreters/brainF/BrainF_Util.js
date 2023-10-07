class BrainF_Util {
  constructor(src) {
    this.src = src;
    this.cells = {};
    this.res = "";
    this.currCell = 0;

    // Bind function context
    this.moveRight = this.moveRight.bind(this);
    this.moveLeft = this.moveLeft.bind(this);
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.print = this.print.bind(this);
    this.beginLoop = this.beginLoop.bind(this);
    this.endLoop = this.endLoop.bind(this);
    this.evaluate = this.evaluate.bind(this);
  }

  moveRight(c) {
    this.currCell++;
    return c;
  }

  moveLeft(c) {
    this.currCell = Math.max(this.currCell - 1, 0);
    return c;
  }

  increment(c) {
    this.cells[this.currCell] = (this.cells[this.currCell] || 0) + 1;
    return c;
  }

  decrement(c) {
    this.cells[this.currCell] = this.cells[this.currCell] ? this.cells[this.currCell] - 1 : 255;
    return c;
  }

  print(c) {
    this.res += String.fromCharCode(this.cells[this.currCell]);
    return c;
  }

  beginLoop(c) {
    c = this.cells[this.currCell] ? c : [...this.src].findIndex((v, j) => j > c && v === "]") + 1;
    return c;
  }

  endLoop(c) {
    if (this.cells[this.currCell]) {
      let j = 0;
      for (let k = 0; k < c; k++) {
        if (this.src[k] === "[") j = k;
      }
      c = j;
    }
    return c;
  }

  evaluate() {
    // Valid operations
    const ops = {
      ">": this.moveRight,
      "<": this.moveLeft,
      "+": this.increment,
      "-": this.decrement,
      ".": this.print,
      ",": null,
      "[": this.beginLoop,
      "]": this.endLoop,
      "!": null,
    };

    // Interpret each character
    for (let c = 0; c < this.src.length; c++) {
      if (this.src[c] in ops) {
        c = ops[this.src[c]](c);
      }
    }

    return this.res;
  }
}

export default BrainF_Util;
