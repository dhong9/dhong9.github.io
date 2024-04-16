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
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import DHComments from "components/DHComments";
import DHEditor from "components/DHEditor";

// Form
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

// Minesweeper code
import minesweeperCode from "projects/games/minesweeper/code";

// p5
import Sketch from "react-p5";

// React
import { useContext, useEffect, useState, useRef } from "react";

// Service
import { getComments, addComment, sortComments } from "services/commentsService";

// Authentication
import AuthContext from "context/AuthContext";

// Minesweeper board utilities
import Board from "./utils/Board";
import flag from "assets/images/flag.png";
import mine from "assets/images/mine.png";
import smile from "assets/images/smile.png";

function Minesweeper() {
  const editorRef = useRef();
  const id = 4;

  const [comments, setComments] = useState([]);
  const [isPlainText, setIsPlainText] = useState(false);

  const { user, profile } = useContext(AuthContext);

  const handleChange = (event) => {
    const checked = event.target.checked;
    setIsPlainText(checked);
    editorRef.current.handleSetPlainText(checked);
  };

  const onAdd = () => {
    addComment(
      ({ status }) => {
        if (status === 201) {
          // Successfully added comment
          getComments(({ data: { results } }) => {
            setComments(results.filter(({ project }) => project === id));
          });
        }
      },
      id,
      user?.username || profile?.name || "Guest",
      user.email,
      editorRef.current.getRootComment(),
      isPlainText
    );
  };

  useEffect(() => {
    getComments(({ data: { results } }) => {
      setComments(results.filter(({ project }) => project === id));
    });
  }, []);

  let flagImg, mineImg, smileImg;
  let board;
  let xOffset, yOffset, boardWidth;

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

    // Define board dimensions based on current window width and height
    xOffset = p5.width > p5.height ? p5.width / 2 - p5.height / 2 : 0;
    yOffset = p5.height > p5.width ? p5.height / 2 - p5.width / 2 : 0;
    boardWidth = p5.width > p5.height ? p5.height : p5.width;

    board = new Board(
      xOffset,
      yOffset,
      boardWidth,
      boardWidth,
      8,
      8,
      10,
      mineImg,
      flagImg,
      smileImg
    );
  };

  const draw = (p5) => {
    p5.background(0);
    board?.draw(p5);
  };

  const mouseClicked = (p5) => {
    board?.mouseClicked(p5);
  };

  const keyTyped = (p5) => {
    board?.keyTyped(p5);
  };

  const windowResized = (p5) => {
    p5.resizeCanvas(window.innerWidth, window.innerHeight);

    // Resize board
    xOffset = p5.width > p5.height ? p5.width / 2 - p5.height / 2 : 0;
    yOffset = p5.height > p5.width ? p5.height / 2 - p5.width / 2 : 0;
    boardWidth = p5.width > p5.height ? p5.height : p5.width;
    board.resizeBoard(xOffset, yOffset, boardWidth);
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
        <Sketch
          setup={setup}
          draw={draw}
          preload={preload}
          mouseClicked={mouseClicked}
          keyTyped={keyTyped}
          windowResized={windowResized}
        />
      </View>

      <div className="comments-container">
        {comments.length ? (
          <DHComments
            comments={sortComments(comments)}
            pageName={id}
            isPlainText={isPlainText}
            user={user}
          />
        ) : (
          <div></div>
        )}
        <DHEditor ref={editorRef} />
        {user ? (
          <FormGroup>
            <FormControlLabel
              control={<Checkbox checked={isPlainText} onChange={handleChange} />}
              label="Plain Text"
            />
            <MKButton onClick={onAdd} type="submit" variant="gradient" color="info">
              Add
            </MKButton>
          </FormGroup>
        ) : (
          <MKBox>
            <i>You must be logged into comment</i>
          </MKBox>
        )}
      </div>
    </BaseLayout>
  );
}

export default Minesweeper;
