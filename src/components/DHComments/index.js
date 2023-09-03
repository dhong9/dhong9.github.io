import { useState, useRef } from "react";

// @mui material components
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

// Sections components
import MKButton from "components/MKButton";
import DHEditor from "components/DHEditor";

// Form
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

// HTML parser
import parse from "html-react-parser";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Service
import { addComment } from "services/commentsService";

export default function DHComments({ comments, pageName, user }) {
  const editorRef = useRef();

  const [showReplyBox, setShowReplyBox] = useState(false);
  const [parentComment, setParentComment] = useState(null);
  const [isChecked, setIsChecked] = useState(false);

  const handleReply = (parentId) => {
    setParentComment(parentId);
    setShowReplyBox(true);
  };

  const handleChange = (event) => {
    const checked = event.target.checked;
    setIsChecked(checked);
    editorRef.current.handleSetPlainText(checked);
  };

  const onAdd = () => {
    addComment(
      console.log,
      pageName,
      user.username,
      user.email,
      editorRef.current.getRootComment(),
      isChecked,
      parentComment
    );
  };

  return (
    <Paper style={{ padding: "40px 20px" }}>
      {comments.map(({ id, body, name, create, isPlainText, depth }) => (
        <Grid key={id} item xs={12} md={6} sx={{ ml: depth }}>
          <Card sx={{ display: "flex" }}>
            <CardContent sx={{ flex: 1 }}>
              <Typography component="h2" variant="h5">
                {name}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {new Date(create).toLocaleString()}
              </Typography>
              <Typography variant="subtitle1" paragraph>
                {isPlainText ? body : parse(body)}
              </Typography>
              <Typography
                variant="a"
                href="#"
                color="primary"
                onClick={() => {
                  handleReply(id);
                }}
              >
                Reply...
              </Typography>
              {showReplyBox && (
                <>
                  <DHEditor ref={editorRef} />
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox checked={isChecked} onChange={handleChange} />}
                      label="Plain Text"
                    />
                    <MKButton onClick={onAdd} type="submit" variant="gradient" color="info">
                      Add
                    </MKButton>
                  </FormGroup>
                </>
              )}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Paper>
  );
}

// Typechecking props of DHComments
DHComments.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object),
  addComment: PropTypes.func,
  pageName: PropTypes.number,
  user: PropTypes.object,
};

DHComments.defaultProps = {
  comments: null,
  addComment: null,
  pageName: -1,
  user: null,
};
