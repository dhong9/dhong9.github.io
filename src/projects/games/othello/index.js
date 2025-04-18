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

// Othello code
import othelloCode from "projects/games/othello/code";
import Othello_Danyo from "othello-danyo";

// p5
import Sketch from "react-p5";

import { useContext, useEffect, useState, useRef } from "react";

// Service
import { getComments, addComment, sortComments } from "services/commentsService";

// Authentication
import AuthContext from "context/AuthContext";

function Othello() {
  const othello_util = new Othello_Danyo();
  const editorRef = useRef();
  const id = 4;

  const [comments, setComments] = useState([]);
  const [isPlainText, setIsPlainText] = useState(false);

  // Game properties
  const [moves, setMoves] = useState([]);
  const [board, setBoard] = useState([]);
  const [curPlayer, setCurPlayer] = useState(1);
  const [blackScore, setBlackScore] = useState(2);
  const [whiteScore, setWhiteScore] = useState(2);
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

  const newGame = (event) => {
    event.preventDefault();

    // Reset game to use new board
    const newBoard = othello_util.createBoard();
    othello_util.board = newBoard;
    setBoard(newBoard);
    setMoves(othello_util.getValidMoves(newBoard, 1));
    setCurPlayer(1);
    setWhiteScore(2);
    setBlackScore(2);
    setGameOver(false);
  };

  useEffect(() => {
    setMoves(othello_util.getValidMoves(othello_util.board, 1));
    setBoard(othello_util.board);
    getComments(({ data: { results } }) => {
      setComments(results.filter(({ project }) => project === id));
    });
  }, []);

  // Constants
  const N = 8;

  // Functions to run game

  const setup = (p5, canvasParentRef) => {
    // use parent to render the canvas in this ref
    // (without that p5 will render the canvas outside of your component)
    const othello = document.querySelector(".codeOutput");
    p5.createCanvas(othello.clientWidth, othello.clientHeight).parent(canvasParentRef);
  };

  const draw = (p5) => {
    // Global game variables
    const boardWidth = Math.min(p5.width, p5.height);
    const xOffset = p5.width > p5.height ? (p5.width - p5.height) / 2 : 0;
    const yOffset = p5.height > p5.width ? (p5.height - p5.width) / 2 : 0;

    p5.background(0);

    // Draw board
    for (let r = 0; r < N; r += 1) {
      for (let c = 0; c < N; c += 1) {
        // Board tile
        const w = boardWidth / N;
        p5.stroke(0);
        p5.strokeWeight(2);
        p5.fill(52, 168, 85);
        p5.rect(c * w + xOffset, r * w + yOffset, w);

        // Draw player
        const v = board[r][c];
        if (v > 0) {
          // Player token exists
          p5.strokeWeight(1);
          p5.fill((v === 2) * 255);
          const tokenWidth = 0.85 * w;
          p5.ellipse(c * w + w / 2 + xOffset, r * w + w / 2 + yOffset, tokenWidth);
        }
      }
    }

    // Draw valid moves
    p5.noFill();
    p5.strokeWeight(2);
    p5.stroke(160);
    const tileWidth = boardWidth / N;
    for (let i = 0; i < moves.length; i += 1) {
      const [moveRow, moveCol] = moves[i];
      p5.ellipse(
        (moveCol * boardWidth) / N + tileWidth / 2 + xOffset,
        (moveRow * boardWidth) / N + tileWidth / 2 + yOffset,
        0.85 * tileWidth
      );
    }

    // NOTE: Do not use setState in the draw function or in functions that are executed
    // in the draw function...
    // please use normal variables or class properties for these purposes
  };

  // Define events
  const mouseClicked = (p5) => {
    if (p5.mouseX >= 0 && p5.mouseX <= p5.width && p5.mouseY >= 0 && p5.mouseY <= p5.height) {
      // Global game variables
      const boardWidth = Math.min(p5.width, p5.height);
      const xOffset = p5.width > p5.height ? (p5.width - p5.height) / 2 : 0;
      const yOffset = p5.height > p5.width ? (p5.height - p5.width) / 2 : 0;

      const c = Math.floor(((p5.mouseX - xOffset) / boardWidth) * N);
      const r = Math.floor(((p5.mouseY - yOffset) / boardWidth) * N);
      if (othello_util.validMove(board, r, c, curPlayer)) {
        let newPlayer = curPlayer;
        const newBoard = othello_util.copyBoard(board);
        othello_util.makeMove(newBoard, r, c, curPlayer);
        if (curPlayer === 1) {
          const oppPlayer = 2;
          const computerMove = othello_util.minimaxDecision(newBoard, oppPlayer);
          if (computerMove[0] !== -1) {
            othello_util.makeMove(newBoard, computerMove[0], computerMove[1], oppPlayer);
            newPlayer = 1;
          } else {
            newPlayer = oppPlayer;
          }
        } else {
          newPlayer = 1;
        }
        setMoves(othello_util.getValidMoves(newBoard, newPlayer));
        setCurPlayer(newPlayer);
        setBoard(newBoard);
        setWhiteScore(othello_util.score(newBoard, 2));
        setBlackScore(othello_util.score(newBoard, 1));
        setGameOver(othello_util.gameOver(newBoard));
      }
    }
  };

  return (
    <BaseLayout
      title="Games"
      breadcrumb={[{ label: "Games", route: "/sections/games/othello" }, { label: "Othello" }]}
    >
      <View title="Othello" code={othelloCode} height="40rem">
        <Sketch setup={setup} draw={draw} mouseClicked={mouseClicked} />
      </View>

      {/* Scoreboard */}
      <Card sx={{ display: "flex" }}>
        <CardContent sx={{ flex: 1 }}>
          <Typography component="h2" variant="h5">
            Scoreboard
          </Typography>
          {gameOver && (
            <Typography variant="subtitle1" color="text.secondary">
              {whiteScore > blackScore
                ? "White wins!"
                : blackScore > whiteScore
                ? "Black wins!"
                : "Tie!"}
            </Typography>
          )}
          <Typography variant="subtitle1" color="text.secondary">
            Black:
          </Typography>
          <Typography component="p">{blackScore}</Typography>
          <Typography variant="subtitle1" color="text.secondary">
            White:
          </Typography>
          <Typography component="p">{whiteScore}</Typography>
        </CardContent>
      </Card>

      <FormGroup>
        <MKButton onClick={newGame} type="submit" variant="gradient" color="info">
          New Game
        </MKButton>
      </FormGroup>

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

export default Othello;
