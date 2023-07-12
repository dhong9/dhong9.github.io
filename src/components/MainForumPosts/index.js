import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import MKBox from "components/MKBox";

import ReactMarkdown from "react-markdown";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

export default function MainForumPosts(props) {
  const { posts, title } = props;

  return (
    <Grid
      item
      xs={12}
      md={8}
      sx={{
        "& .markdown": {
          py: 3,
        },
      }}
    >
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Divider />
      {posts.map(({ id, isPlainText, body }) =>
        isPlainText ? (
          <MKBox p={3} key={id}>
            {body}
          </MKBox>
        ) : (
          <ReactMarkdown className="markdown" key={id}>
            {body}
          </ReactMarkdown>
        )
      )}
    </Grid>
  );
}

// Typechecking props for the BackgroundBlogCard
MainForumPosts.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object])),
  title: PropTypes.string.isRequired,
};
