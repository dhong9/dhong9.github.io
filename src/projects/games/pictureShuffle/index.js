import Sketch from "react-p5";

import meadow from "assets/images/meadow.png";
import Board from "./utils/Board";

function PictureShuffle() {
  let board;
  let img;

  const preload = (p5) => {
    img = p5.loadImage(meadow);
  };

  const setup = (p5, canvasParentRef) => {
    // use parent to render the canvas in this ref
    // (without that p5 will render the canvas outside of your component)
    p5.createCanvas(500, 500).parent(canvasParentRef);

    board = new Board(p5, p5.width, 4, img);
  };

  const draw = (p5) => {
    board.draw(p5);
  };

  return <Sketch setup={setup} draw={draw} preload={preload} />;
}

export default PictureShuffle;
