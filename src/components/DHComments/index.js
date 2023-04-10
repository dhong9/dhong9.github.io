// @mui material components
import Grid from "@mui/material/Grid";

// Sections components
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKInput from "components/MKInput";
import MKTypography from "components/MKTypography";

import { useState } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// https://dev.to/vigneshiyergithub/building-a-nested-comment-example-like-reddit-1o92

export default function DHComments({ comment, addComment }) {
  const { commentText, childComments, id } = comment;
  const [childComment, setChildComment] = useState("");
  const [show, setShow] = useState(true);
  const [showAddComponent, setShowAddComponent] = useState(false);
  const onAdd = () => {
    addComment(id, childComment);
    setChildComment("");
    setShowAddComponent(false);
  };

  return (
    <div>
      <MKBox px={3} py={{ xs: 2, sm: 6 }}>
        <MKTypography variant="h2" mb={1}>
          Leave a Comment!
        </MKTypography>
        <MKTypography variant="body1" color="text" mb={2}>
          We&apos;d like to hear from you.
        </MKTypography>
      </MKBox>
      <MKBox pt={0.5} pb={3} px={3}>
        <Grid container>
          <Grid item xs={12} pr={1} mb={6}>
            {showAddComponent ? (
              <MKInput
                variant="standard"
                label="Your message"
                placeholder="I want to say that..."
                value={commentText}
                InputLabelProps={{ shrink: true }}
                fullWidth
                multiline
                rows={6}
              />
            ) : (
              <MKButton type="submit" variant="gradient" color="dark" fullWidth>
                Reply
              </MKButton>
            )}
          </Grid>
        </Grid>
        <Grid container item justifyContent="center" xs={12} my={2}>
          <MKButton type="submit" variant="gradient" color="dark" fullWidth>
            Send Message
          </MKButton>
        </Grid>
      </MKBox>
      {show &&
        childComments.map((childCommentEl, key) => (
          <DHComments key={key} comment={childCommentEl} addComment={addComment} />
        ))}
    </div>
  );
}

// Typechecking props of the MKAlert
DHComments.propTypes = {
  comment: PropTypes.string,
  addComment: PropTypes.func,
};
