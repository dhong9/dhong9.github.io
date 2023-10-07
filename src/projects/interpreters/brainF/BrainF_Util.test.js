// Unit to test
import BrainF_Util from "projects/interpreters/brainF/BrainF_Util";

describe("BrainF_Util", () => {
  
  it("prints Hello World", () => {
    const src = `>++++++++[<+++++++++>-]<.
    >++++[<+++++++>-]<+.
    +++++++..
    +++.
    >>++++++[<+++++++>-]<++.
    ------------.
    >++++++[<+++++++++>-]<+.
    <.
    +++.
    ------.
    --------.
    >>>++++[<++++++++>-]<+.`;
    const brainF = new BrainF_Util(src);
    brainF.evaluate();
    expect(brainF.res).toEqual("Hello, World!");
  });

});
