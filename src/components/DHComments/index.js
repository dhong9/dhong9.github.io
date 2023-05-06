// // @mui material components
// import Grid from "@mui/material/Grid";

// // Sections components
// import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKInput from "components/MKInput";
// import MKTypography from "components/MKTypography";

import { useState } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

import { postRequest } from "services/baseService";

// https://dev.to/vigneshiyergithub/building-a-nested-comment-example-like-reddit-1o92

export default function DHComments({ comment, addComment, pageName }) {
  const { commentText, childCommments } = comment;
  const [childComment, setChildComment] = useState("");
  const [show, setShow] = useState(true);
  const [showAddComponet, setShowAddComponet] = useState(false);
  const onAdd = (e) => {
    e.preventDefault();
    postRequest("comments", {
      pageName,
      name: "santaClaus",
      email: "danielhong24@yahoo.com",
      body: childComment,
    });

    // addComment(id, childComment);
    // setChildComment("");
    // setShowAddComponet(false);
  };

  return (
    <div className="Comment">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div style={{ textAlign: "left" }}>{commentText}</div>
        &nbsp;
        {childCommments.length > 0 && (
          <MKButton
            onClick={() => setShow((prevShow) => !prevShow)}
            type="submit"
            variant="gradient"
            color="info"
          >
            {show ? "Hide" : "Show"}
          </MKButton>
        )}
      </div>
      <div>
        <div>
          {showAddComponet ? (
            <>
              <MKInput
                variant="standard"
                placeholder="Add a comment"
                InputLabelProps={{ shrink: true }}
                multiline
                fullWidth
                rows={6}
                onChange={(e) => setChildComment(e.target.value)}
                value={childComment}
              />{" "}
              <MKButton onClick={onAdd} type="submit" variant="gradient" color="info">
                Submit
              </MKButton>
            </>
          ) : (
            <MKButton
              type="submit"
              variant="gradient"
              color="info"
              onClick={() => setShowAddComponet(true)}
            >
              Add a reply
            </MKButton>
          )}
        </div>
      </div>
      {show &&
        childCommments.map((childCommentEl) => (
          <DHComments key={0} comment={childCommentEl} addComment={addComment} />
        ))}
    </div>
  );
}

// Typechecking props of DHComments
DHComments.propTypes = {
  comment: PropTypes.string,
  addComment: PropTypes.func,
  pageName: PropTypes.string,
};

DHComments.defaultProps = {
  comment: "",
  addComment: null,
  pageName: "",
};
