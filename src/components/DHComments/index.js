import React from "react";

// @mui material components
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

import ReactMarkdown from "react-markdown";

export default function DHComments({ comments }) {
  return (
    <Paper style={{ padding: "40px 20px" }}>
      {comments.map(({ id, body, name, create, isPlainText }) => (
        <Grid key={id} item xs={12} md={6}>
          <CardActionArea component="a" href="#">
            <Card sx={{ display: "flex" }}>
              <CardContent sx={{ flex: 1 }}>
                <Typography component="h2" variant="h5">
                  {name}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {new Date(create).toLocaleString()}
                </Typography>
                <Typography variant="subtitle1" paragraph>
                  {isPlainText ? body : <ReactMarkdown>{body}</ReactMarkdown>}
                </Typography>
                <Typography variant="subtitle1" color="primary">
                  Reply...
                </Typography>
              </CardContent>
            </Card>
          </CardActionArea>
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