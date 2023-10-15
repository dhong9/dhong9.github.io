class MiniScheme_Util {
  constructor(src) {
    this.src = src;
    this.definitions = {};
    this.keywords = ["define", "if"];
    this.operators = ["+", "-", "*", "/", "=", ">", "<", ">=", "<="];

    // Bind functions
    this.chunkCommands = this.chunkCommands.bind(this);
    this.tokenize = this.tokenize.bind(this);
    this.parse = this.parse.bind(this);
    this.evaluate = this.evaluate.bind(this);
  }

  /**
   * Divide up source code by parentheses groupings
   * @returns list of commands
   */
  chunkCommands() {
    let parens = 0;
    const commands = [];
    let cmd = "";
    for (const c of this.src) {
      // Track all characters in source code
      cmd += c;

      // Track parentheses groupings
      parens += c === "(";
      parens -= c === ")";
      if (parens === 0 && cmd.trim()) {
        commands.push(cmd.trim());
        cmd = "";
      }
    }
    return commands;
  }

  /**
   * Converts command into a list of tokens
   * @param {string} command command to tokenize
   * @returns list of tokens in the form [value, type]
   */
  tokenize(command) {
    // Helper function to parse generic token
    const getType = (s) => {
      // Use first character to expect the data type
      let expect = "";
      let dots = 0;
      const h = s[0];
      if ((h >= "0" && h <= "9") || h === ".") {
        expect = "num";
        dots += h === ".";
      } else if ((h >= "a" && h <= "z") || (h >= "A" && h <= "Z")) {
        expect = "sym";
      } else if (h === "#") {
        expect = "bool";
      }

      // Parse the rest of the string to see if it matches
      // expected type
      for (let i = 1; i < s.length; i++) {
        const c = s[i];
        dots += c === ".";
        if (expect === "num") {
          if (!((c >= "0" && c <= "9") || c === ".")) {
            console.error(`Expected number but read '${c}' in ${s} instead`);
            return;
          }
          if (c === "." && dots > 1) {
            console.error(`Read an extra decimal when reading ${s}`);
            return;
          }
        } else if (expect === "sym") {
          if (
            !(
              (c >= "a" && c <= "z") ||
              (c >= "A" && c <= "Z") ||
              (c >= "0" && c <= "9") ||
              c === "_"
            )
          ) {
            console.error(`Illegal character '${c}' when reading ${s}`);
            return;
          }
        } else if (expect === "bool") {
          if (s !== "#t" && s !== "#f") {
            console.error(`Illegal boolean '${s}', legal booleans are #t and #f`);
          }
        }
      }

      return expect;
    };

    // Tokens are stored as [value, type]
    const tokens = [];

    let s = ""; // Current candidate token

    for (let i = 0; i < command.length; i++) {
      const c = command[i];

      // Check for operator
      if (this.operators.includes(c)) {
        tokens.push([c, "op"]);
        s = "";
      }

      // Check for parentheses
      else if (c === "(") {
        if (s) {
          tokens.push([s, getType(s)]);
        }
        tokens.push([c, "lparen"]);
        s = "";
      } else if (c === ")") {
        if (s) {
          tokens.push([s, getType(s)]);
        }
        tokens.push([c, "rparen"]);
        s = "";
      }

      // Whitespace
      else if (" \t\n".includes(c)) {
        if (s) {
          tokens.push([s, getType(s)]);
        }
        s = "";
      }

      // Collect remaining characters
      else {
        s += c;
      }
    }

    // In case we haven't evaluated the last set of chars yet
    if (s) {
      tokens.push([s, getType(s)]);
    }

    return tokens;
  }

  /**
   * Converts a list of tokens into a parse tree
   * @param {Array<Array<string>>} tokens list of tokens to parse
   * @returns parse tree in a form of nested lists
   */
  parse(tokens) {
    const tree = [];
    const stack = [];
    let curr = tree;
    let i = 0; // Ensures that token added is unique

    for (const [val, type] of tokens) {
      if (type === "lparen") {
        // Create a new node
        stack.push(curr);
        curr.push([]);
        curr = curr.at(-1);
      } else if (type === "rparen") {
        // Go back up one level
        curr = stack.pop();
      } else if (type === "op") {
        // Create a new node
        curr.push(val + " " + type);
      } else if (type === "num" || type === "sym" || type === "bool") {
        // These are terminal nodes
        curr.push(val + " " + type);
      }
      i++;
    }

    return tree;
  }

  /**
   * Executes a command as a parse tree
   * @param {Array<Array<string>>} tree parse tree
   * @param {Object} localVars any local variables like function params
   * @returns return value of parse tree
   */
  evaluate(tree, localVars = {}) {
    if (Array.isArray(tree)) {
      const [head, ...tail] = tree;
      if (Array.isArray(head)) {
        return this.evaluate(head);
      }

      // Assume that head is a function/operator
      const [headVal, headType] = head.split(" ");
      if (headType === "op" || headType === "sym") {
        let res = 0;
        let first = true;
        for (const node of tail) {
          if (first && !(headVal in this.keywords || headVal in this.definitions)) {
            res = this.evaluate(node, localVars);
            first = false;
          } else {
            // Operations
            if (headVal === "+") {
              res += this.evaluate(node, localVars);
            } else if (headVal === "-") {
              res -= this.evaluate(node, localVars);
            } else if (headVal === "*") {
              res *= this.evaluate(node, localVars);
            } else if (headVal === "/") {
              res /= this.evaluate(node, localVars);
            }

            // Comparisions
            else if (headVal === "=") {
              if (tail.length !== 2) {
                console.error(`Expected 2 arguments but got ${tail.length} instead`);
                return;
              }
              const [leftVal, rightVal] = tail;
              return this.evaluate(leftVal, localVars) === this.evaluate(rightVal, localVars);
            } else if (headVal === ">") {
              if (tail.length !== 2) {
                console.error(`Expected 2 arguments but got ${tail.length} instead`);
                return;
              }
              const [leftVal, rightVal] = tail;
              return this.evaluate(leftVal, localVars) > this.evaluate(rightVal, localVars);
            } else if (headVal === "<") {
              if (tail.length !== 2) {
                console.error(`Expected 2 arguments but got ${tail.length} instead`);
                return;
              }
              const [leftVal, rightVal] = tail;
              return this.evaluate(leftVal, localVars) < this.evaluate(rightVal, localVars);
            } else if (headVal === ">=") {
              if (tail.length !== 2) {
                console.error(`Expected 2 arguments but got ${tail.length} instead`);
                return;
              }
              const [leftVal, rightVal] = tail;
              return this.evaluate(leftVal, localVars) >= this.evaluate(rightVal, localVars);
            } else if (headVal === "<=") {
              if (tail.length !== 2) {
                console.error(`Expected 2 arguments but got ${tail.length} instead`);
                return;
              }
              const [leftVal, rightVal] = tail;
              return this.evaluate(leftVal, localVars) <= this.evaluate(rightVal, localVars);
            }

            // Variable definition
            if (headVal === "define") {
              if (tail.length !== 2) {
                console.error(`Expected 2 arguments but got ${tail.length} instead`);
                return;
              }

              const [symbol, definition] = tail;

              // Check for function definition
              if (Array.isArray(symbol)) {
                // Use "func" to identify function definition
                const [funcName, ...funcArgs] = symbol;
                const funcVal = funcName.split(" ")[0];
                if (this.keywords.includes(funcVal)) {
                  console.error(`Cannot define function '${funcVal}' as it is a keyword`);
                  return;
                }
                this.definitions[funcVal] = [funcArgs, definition];
              } else {
                const [symVal, symType] = symbol.split(" ");
                if (symType !== "sym") {
                  console.error(`Expected symbol but got ${symType} (${symVal}) instead`);
                  return;
                }

                if (this.keywords.includes(symVal)) {
                  console.error(`Cannot define variable '${symVal}' as it is a keyword`);
                  return;
                }

                this.definitions[symVal] = this.evaluate(definition, localVars);
              }
            }

            // If statement/function
            else if (headVal === "if") {
              // if test-expr then-expr else-expr)
              if (tail.length !== 3) {
                console.error(`Expected 3 arguments but got ${tail.length} instead`);
                return;
              }

              const [testExpr, thenExpr, elseExpr] = tail;
              const testVal = this.evaluate(testExpr, localVars);
              const thenVal = this.evaluate(thenExpr, localVars);
              const elseVal = this.evaluate(elseExpr, localVars);

              return testVal ? thenVal : elseVal;
            }

            // Custom function
            else if (headVal in this.definitions) {
              const [args, body] = this.definitions[headVal];

              // Check that the number of specified arguments
              // match with the number of defined arguments
              if (args.length !== tail.length) {
                console.error(`Expected ${args.length} argument(s) but got ${tail.length} instead`);
                return;
              }

              // Pass argument(s), if any, to custom function
              const argDefinitions = {};
              console.log("tail", tail);
              for (let i = 0; i < tail.length; i++) {
                const argVal = tail[i].split(" ")[0];
                const argName = args[i].split(" ")[0];
                argDefinitions[argName] = argVal;
              }
              return this.evaluate(body, argDefinitions);
            }
          }
        }
        return res;
      }
    }

    const [val, type] = tree.split(" ");
    if (type === "num") {
      return +val;
    }
    if (type === "bool") {
      return val === "#t";
    }
    if (type === "sym") {
      return localVars[val] ?? this.definitions[val];
    }
  }

  /**
   * Executes an entire script
   * @returns Return value of last executed command
   */
  run() {
    const commands = this.chunkCommands();
    let res = null;
    for (const command of commands) {
      const tokens = this.tokenize(command);
      const tree = this.parse(tokens);
      res = this.evaluate(tree);
    }
    return res;
  }
}

export default MiniScheme_Util;
