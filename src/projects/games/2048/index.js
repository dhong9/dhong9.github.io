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

// Scoreboard
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

// 2048 code
import twenty48Code from "projects/games/2048/code";
import Twenty48_Danyo from "2048-danyo";

// p5
import Sketch from "react-p5";

// React
import { useContext, useEffect, useState, useRef } from "react";

// Service
import { getComments, addComment, sortComments } from "services/commentsService";

// Authentication
import AuthContext from "context/AuthContext";

function Twenty48() {
  const twenty48_util = new Twenty48_Danyo();
  const editorRef = useRef();
  const id = 2;

  const [comments, setComments] = useState([]);
  const [isPlainText, setIsPlainText] = useState(false);

  // Game properties
  const [board, setBoard] = useState(twenty48_util.board);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

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

  const setup = (p5, canvasParentRef) => {
    // use parent to render the canvas in this ref
    // (without that p5 will render the canvas outside of your component)
    // Canvas dimension is based on div's size
    const twenty48 = document.querySelector(".codeOutput");
    p5.createCanvas(twenty48.clientWidth, twenty48.clientHeight).parent(canvasParentRef);
  };

  const draw = (p5) => {
    // Global game variables
    const boardWidth = Math.min(p5.width, p5.height);
    const xOffset = p5.width > p5.height ? (p5.width - p5.height) / 2 : 0;
    const yOffset = p5.height > p5.width ? (p5.height - p5.width) / 2 : 0;
    const tileMap = {
      0: p5.color(204, 195, 180),
      2: p5.color(238, 228, 218),
      4: p5.color(235, 221, 193),
      8: p5.color(242, 177, 121),
      16: p5.color(243, 131, 87),
      32: p5.color(245, 124, 95),
      64: p5.color(246, 93, 59),
      128: p5.color(237, 206, 113),
      256: p5.color(237, 202, 100),
      512: p5.color(237, 198, 81),
      1024: p5.color(238, 199, 68),
      2048: p5.color(234, 194, 52),
    };
    const padding = p5.width / 40;
    const tileWidth = (Math.min(p5.width, p5.height) - 5 * padding) / 4;

    p5.textAlign(p5.CENTER, p5.CENTER);
    p5.textStyle(p5.BOLD);

    p5.background(0);

    // Game background
    p5.noStroke();
    p5.fill(188, 173, 160);
    p5.rect(xOffset, yOffset, boardWidth);

    for (let r = 0; r < 4; r += 1) {
      for (let c = 0; c < 4; c += 1) {
        const v = board[r][c];

        // Tile color
        if (v in tileMap) {
          p5.fill(tileMap[v]);
        } else {
          p5.fill(0);
        }
        p5.rect(
          (r + 1) * padding + r * tileWidth + xOffset,
          (c + 1) * padding + c * tileWidth + yOffset,
          tileWidth
        );

        // Text on tile
        if (v) {
          p5.fill(v > 4 ? 255 : 0);
          p5.textSize(tileWidth / Math.floor(Math.log10(v) + 2));
          p5.text(
            v,
            (r + 1) * padding + r * tileWidth + tileWidth / 2 + xOffset,
            (c + 1) * padding + c * tileWidth + tileWidth / 2 + yOffset
          );
        }
      }
    }
  };

  const keyPressed = (p5, e) => {
    // Save previous board state
    const prevBoard = twenty48_util.copyBoard(board);

    // Move tiles on board
    const arrow = e.key;
    let dir = "";
    if (arrow === "ArrowUp") {
      dir = "L";
    } else if (arrow === "ArrowDown") {
      dir = "R";
    } else if (arrow === "ArrowLeft") {
      dir = "U";
    } else if (arrow === "ArrowRight") {
      dir = "D";
    }
    const newBoard = twenty48_util.makeMove(board, dir);

    // If tiles moved,
    // then spawn a new tile
    const tilesMoved = newBoard.some((a, i) => a.some((c, j) => c - prevBoard[i][j]));
    if (tilesMoved) {
      twenty48_util.spawnTile(newBoard, true);
      setScore(twenty48_util.score);
      setGameOver(twenty48_util.gameOver(newBoard));
    }
    setBoard(newBoard);
  };

  return (
    <BaseLayout
      title="Games"
      breadcrumb={[{ label: "Games", route: "/sections/games/2048" }, { label: "2048" }]}
    >
      <View title="2048" code={twenty48Code} height="40rem">
        <Sketch setup={setup} draw={draw} keyPressed={keyPressed} />
      </View>

      {/* Scoreboard */}
      <Card sx={{ display: "flex" }}>
        <CardContent sx={{ flex: 1 }}>
          <Typography component="h2" variant="h5">
            Scoreboard
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Points
          </Typography>
          <Typography component="p">{score}</Typography>
          {gameOver && <Typography component="p">Game over!</Typography>}
        </CardContent>
      </Card>

      <div className="comments-container">
        {comments.length ? (
          <DHComments comments={sortComments(comments)} pageName={id} user={user} />
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

export default Twenty48;
