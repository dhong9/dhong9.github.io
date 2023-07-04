import React from "react";

// // @mui material components
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

// Material Kit 2 React components
import MKTypography from "components/MKTypography";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

export default function DHComments({ comments }) {
  return (
    <Paper style={{ padding: "40px 20px" }}>
      {comments.map(({ id, body, name, create }) => (
        <Grid key={id} container wrap="nowrap" spacing={2}>
          <MKTypography variant="h4" sx={{ margin: 0, textAlign: "left" }}>
            {name}
          </MKTypography>
          <Grid justifyContent="left" item xs zeroMinWidth>
            <MKTypography variant="subtitle1" color="text.secondary">
              created {new Date(create).toLocaleString()}
            </MKTypography>
            <MKTypography variant="subtitle1" paragraph>
              {body}
            </MKTypography>
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
