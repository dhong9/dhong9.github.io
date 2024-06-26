// Sections components
import BaseLayout from "layouts/sections/components/BaseLayout";
import View from "layouts/sections/components/View";

// BrainF code
import BrainF_Util from "projects/interpreters/brainF/BrainF_Util";
import brainFCode from "projects/interpreters/brainF/code";

// Generic interpreter
import Interpreter from "../interpreter";

// Form
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import MKButton from "components/MKButton";
import MKBox from "components/MKBox";
import DHComments from "components/DHComments";
import DHEditor from "components/DHEditor";

// Table
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

// React
import { useContext, useEffect, useState, useRef } from "react";

// Service
import { getComments, addComment, sortComments } from "services/commentsService";

// Authentication
import AuthContext from "context/AuthContext";

function BrainF() {
  const editorRef = useRef();
  const id = 5;

  // Interpreter states
  const [visualize, setVisualize] = useState(false);
  const [codeOutput, setCodeOutput] = useState("");
  const [codeSrc, setCodeSrc] = useState("// some comment");
  const [cells, setCells] = useState({});

  // Comments states
  const [comments, setComments] = useState([]);
  const [isPlainText, setIsPlainText] = useState(false);

  const { user, profile } = useContext(AuthContext);

  /**
   * Event handler when visualize option is toggled
   * @param {Event} event
   */
  const handleVisualizeChange = (event) => {
    setVisualize(event.target.checked);
  };

  /**
   * Event handler when plain text option is toggled
   * @param {Event} event
   */
  const handlePlainTextChange = (event) => {
    const checked = event.target.checked;
    setIsPlainText(checked);
    editorRef.current.handleSetPlainText(checked);
  };

  const showOutput = () => {
    setCodeOutput(brainF(codeSrc));
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

  /**
   * Processes BrainF code and returns its output
   * @param {String} src source code
   * @returns aggregate of all char prints
   */
  const brainF = (src) => {
    const brainF_util = new BrainF_Util(src);
    brainF_util.evaluate();

    setCells(brainF_util.cells);

    return brainF_util.res;
  };

  return (
    <BaseLayout
      title="Interpreters"
      breadcrumb={[
        { label: "Interpreters", route: "/sections/interpreters/brainF" },
        { label: "BrainF" },
      ]}
    >
      <View title="BrainF" code={brainFCode} height="40rem">
        {visualize && (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead sx={{ display: "table-header-group" }}>
                <TableRow>
                  <TableCell>Cell Number</TableCell>
                  <TableCell align="left">Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.keys(cells).map((v) => (
                  <TableRow key={v} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {v}
                    </TableCell>
                    <TableCell align="left">{cells[v]}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        <Interpreter codeUpdate={setCodeSrc} language="brainF" />
      </View>

      <FormGroup>
        <FormControlLabel
          control={<Checkbox checked={visualize} onChange={handleVisualizeChange} />}
          label="Visualize"
        />
        <MKButton onClick={showOutput} type="submit" variant="gradient" color="info">
          Show value
        </MKButton>
      </FormGroup>

      {codeOutput && (
        <MKBox
          borderRadius="lg"
          shadow="lg"
          p={2}
          mt={2}
          component="div"
          sx={{ display: "inline" }}
        >
          {codeOutput}
        </MKBox>
      )}

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
              control={<Checkbox checked={isPlainText} onChange={handlePlainTextChange} />}
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

export default BrainF;
