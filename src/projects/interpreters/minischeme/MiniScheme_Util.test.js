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
  });

  it("handles booleans", () => {
    const src = "(if #t 1 0)";
    const src2 = "(if #f 1 0)";
    const ms1 = new MiniScheme_Util(src);
    const ms2 = new MiniScheme_Util(src2);
    const res1 = ms1.run();
    const res2 = ms2.run();
    expect(res1).toEqual(1);
    expect(res2).toEqual(0);
  });

  it("handles conditions", () => {
    const src = "(if (< 1 2) 5 6)";
    const ms = new MiniScheme_Util(src);
    const res = ms.run();
    expect(res).toEqual(5);
  });
});
