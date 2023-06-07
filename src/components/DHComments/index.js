import React from "react";

// // @mui material components
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

// // Sections components
// import MKBox from "components/MKBox";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// https://dev.to/vigneshiyergithub/building-a-nested-comment-example-like-reddit-1o92

export default function DHComments({ comments }) {
  return (
    <Paper style={{ padding: "40px 20px" }}>
      {comments.map(({ id, body }) => (
        <Grid key={id} container wrap="nowrap" spacing={2}>
          <Grid justifyContent="left" item xs zeroMinWidth>
            <h4 style={{ margin: 0, textAlign: "left" }}>Michel Michel</h4>
            <p style={{ textAlign: "left" }}>{body}</p>
            <p style={{ textAlign: "left", color: "gray" }}>posted 1 minute ago</p>
          </Grid>
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
