import React, { useState } from "react";

// @mui material components
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

// Sections components
import MKButton from "components/MKButton";
import MKInput from "components/MKInput";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

import DHMarkdown from "components/DHMarkdown";

export default function DHComments({ comments }) {
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [rootComment, setRootComment] = useState("");

  const handleReply = () => {
    setShowReplyBox(true);
  };

  const onAdd = () => {
    console.log(rootComment);
  };

  return (
    <Paper style={{ padding: "40px 20px" }}>
      {comments.map(({ id, body, name, create, isPlainText }) => (
        <Grid key={id} item xs={12} md={6}>
          <Card sx={{ display: "flex" }}>
            <CardContent sx={{ flex: 1 }}>
              <Typography component="h2" variant="h5">
                {name}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {new Date(create).toLocaleString()}
              </Typography>
              <Typography variant="subtitle1" paragraph>
                {isPlainText ? body : <DHMarkdown>{body}</DHMarkdown>}
              </Typography>
              <Typography variant="a" href="#" color="primary" onClick={handleReply}>
                Reply...
              </Typography>
              {showReplyBox && (
                <>
                  <MKInput
                    variant="standard"
                    label="What do you think?"
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
  pageName: PropTypes.string,
};

DHComments.defaultProps = {
  comments: null,
  addComment: null,
  pageName: "",
};
