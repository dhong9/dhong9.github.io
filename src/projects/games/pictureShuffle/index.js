// Sections components
import BaseLayout from "layouts/sections/components/BaseLayout";
import View from "layouts/sections/components/View";
import MKButton from "components/MKButton";
import MKInput from "components/MKInput";
import DHComments from "components/DHComments";

// Picture shuffle code
import pictureShuffleCode from "projects/games/pictureShuffle/code";

// p5
import Sketch from "react-p5";

// React
import React, { useContext, useEffect, useState } from "react";

// Service
import { getComments, addComment } from "services/commentsService";

// Authentication
import AuthContext from "context/AuthContext";

// Picture shuffle board utilities
import meadow from "assets/images/meadow.png";
import Board from "./utils/Board";

function PictureShuffle() {
  const [comments, setComments] = useState([]);
  const [rootComment, setRootComment] = useState("");

  let { user } = useContext(AuthContext);

  const onAdd = () => {
    addComment(
      ({ status }) => {
        if (status === 201) {
          // Successfully added comment
          getComments(({ data: { results } }) => {
            setComments(results.filter(({ pageName }) => pageName === "pictureShuffle"));
          });
        }
      },
      "pictureShuffle",
      user.username,
      user.email,
      rootComment
    );
  };

  useEffect(() => {
    getComments(({ data: { results } }) => {
      setComments(results.filter(({ pageName }) => pageName === "pictureShuffle"));
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
        {comments.length ? <DHComments comments={comments} pageName="2048" /> : <div></div>}
        <MKInput
          variant="standard"
          label="What can we help you?"
          placeholder="Add a comment"
          InputLabelProps={{ shrink: true }}
          multiline
          fullWidth
          rows={6}
          onChange={(e) => setRootComment(e.target.value)}
          value={rootComment}
        />{" "}
        <MKButton onClick={onAdd} type="submit" variant="gradient" color="info">
          Add
        </MKButton>
      </div>
    </BaseLayout>
  );
}

export default PictureShuffle;
