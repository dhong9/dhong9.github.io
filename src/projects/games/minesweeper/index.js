/**
=========================================================
* Danyo-1.2
=========================================================

* Copyright 2024 Danyo (https://www.danyo.tech)

Coded by www.danyo.tech

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Sections components
import BaseLayout from "layouts/sections/components/BaseLayout";
import View from "layouts/sections/components/View";

// Minesweeper code
import minesweeperCode from "projects/games/minesweeper/code";

// p5
import Sketch from "react-p5";

// Minesweeper board utilities
import Tile from "./utils/Tile";
import flag from "assets/images/flag.png";
import mine from "assets/images/mine.png";
import smile from "assets/images/smile.png";

function Minesweeper() {
  let flagImg, mineImg, smileImg;

  const preload = (p5) => {
    flagImg = p5.loadImage(flag);
    mineImg = p5.loadImage(mine);
    smileImg = p5.loadImage(smile);
  };

  const setup = (p5, canvasParentRef) => {
    // use parent to render the canvas in this ref
    // (without that p5 will render the canvas outside of your component)
    const minesweeper = document.querySelector(".codeOutput");
    p5.createCanvas(minesweeper.clientWidth, minesweeper.clientHeight).parent(canvasParentRef);
  };

  const tile = new Tile(100, 100, 100, 100, mineImg, flagImg, smileImg);

  const draw = (p5) => {
    p5.background(0);
    p5.image(flagImg, 0, 0, 100, 100);
    p5.image(mineImg, 100, 0, 100, 100);
    p5.image(smileImg, 0, 100, 100, 100);
    tile.draw();
  };

  return (
    <BaseLayout
      title="Games"
      breadcrumb={[
        { label: "Games", route: "/sections/games/minesweeper" },
        { label: "Minesweeper" },
      ]}
    >
      <View title="Minesweeper" code={minesweeperCode} height="40rem">
        <Sketch setup={setup} draw={draw} preload={preload} />
      </View>
    </BaseLayout>
  );
}

export default Minesweeper;
