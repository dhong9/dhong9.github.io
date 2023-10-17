// Unit to test
import MiniScheme_Util from "projects/interpreters/minischeme/MiniScheme_Util";

describe("MiniScheme_Util", () => {
  it("adds numbers", () => {
    const src = "(+ 4 2 9)";
    const ms = new MiniScheme_Util(src);
    const res = ms.run();
    expect(res).toEqual(15);
  });

  it("defines variables", () => {
    const src = "(define x 12.2) (- x 1.1)";
    const ms = new MiniScheme_Util(src);
    const res = ms.run();
    expect(res).toEqual(11.1);
  })
});
