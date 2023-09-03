// Sections components
import BaseLayout from "layouts/sections/components/BaseLayout";
import View from "layouts/sections/components/View";

// WhiteSpace code
import whitespaceCode from "projects/interpreters/whitespace/code";

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

// React
import { useContext, useEffect, useState, useRef } from "react";

// Service
import { getComments, addComment, sortComments } from "services/commentsService";

// Authentication
import AuthContext from "context/AuthContext";

function WhiteSpace() {
  const editorRef = useRef();
  const id = 6;

  // Interpreter states
  const [visualize, setVisualize] = useState(false);
  const [codeOutput, setCodeOutput] = useState("");
  const [codeSrc, setCodeSrc] = useState("// some comment");

  // Comments states
  const [comments, setComments] = useState([]);
  const [isPlainText, setIsPlainText] = useState(false);

  let { user } = useContext(AuthContext);

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
    setCodeOutput(codeSrc);
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
      user.username,
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

  return (
    <BaseLayout
      title="Page Headers"
      breadcrumb={[
        { label: "Page Sections", route: "/sections/page-sections/page-headers" },
        { label: "Page Headers" },
      ]}
    >
      <View title="Header 1" code={whitespaceCode} height="40rem">
        <Interpreter codeUpdate={setCodeSrc} language="whitespace" />
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

export default WhiteSpace;
