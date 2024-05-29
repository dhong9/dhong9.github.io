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

// Picture shuffle code
import pictureShuffleCode from "projects/games/pictureShuffle/code";

// p5
import Sketch from "react-p5";

// React
import { useContext, useEffect, useState, useRef } from "react";

// Service
import { getComments, addComment, sortComments } from "services/commentsService";

// Authentication
import AuthContext from "context/AuthContext";

// Picture shuffle board utilities
import meadow from "assets/images/meadow.png";
import Board from "./utils/Board";

function PictureShuffle() {
  const editorRef = useRef();
  const id = 3;

  const [comments, setComments] = useState([]);
  const [isPlainText, setIsPlainText] = useState(false);

  const { profile } = useContext(AuthContext);

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

  let board;
  let img;

  const preload = (p5) => {
    img = p5.loadImage(meadow);
  };

  const setup = (p5, canvasParentRef) => {
    // use parent to render the canvas in this ref
    // (without that p5 will render the canvas outside of your component)
    const pictureShuffle = document.querySelector(".codeOutput");
    p5.createCanvas(pictureShuffle.clientWidth, pictureShuffle.clientHeight).parent(
      canvasParentRef
    );
    const boardWidth = Math.min(p5.width, p5.height);
    const xOffset = p5.width > p5.height ? (p5.width - p5.height) / 2 : 0;
    const yOffset = p5.height > p5.width ? (p5.height - p5.width) / 2 : 0;
    board = new Board(p5, xOffset, yOffset, boardWidth, 4, img);
  };

  const draw = (p5) => {
    p5.background(0);
    if (board?.solved) {
      p5.image(img, 0, 0, p5.width, p5.height);
    } else {
      board?.draw(p5);
    }
  };

  const mouseClicked = (p5) => {
    board?.mouseClicked(p5);
  };

  return (
    <BaseLayout
      title="Games"
      breadcrumb={[
        { label: "Games", route: "/sections/games/pictureShuffle" },
        { label: "Picture Shuffle" },
      ]}
    >
      <View title="Picture Shuffle" code={pictureShuffleCode} height="40rem">
        <Sketch setup={setup} draw={draw} preload={preload} mouseClicked={mouseClicked} />
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

export default PictureShuffle;
