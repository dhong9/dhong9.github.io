import Sketch from "react-p5";

import Board from "./utils/Board";

function PictureShuffle() {
  let board;

  const setup = (p5, canvasParentRef) => {
    // use parent to render the canvas in this ref
    // (without that p5 will render the canvas outside of your component)
    p5.createCanvas(500, 500).parent(canvasParentRef);

    board = new Board(p5.width, 4);
  };

  const draw = (p5) => {
    board.draw(p5);
  };

  return <Sketch setup={setup} draw={draw} />;
}

export default PictureShuffle;
