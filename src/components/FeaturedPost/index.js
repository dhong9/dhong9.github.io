import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

export default function FeaturedPost(props) {
  const { post } = props;

  return (
    <Grid item xs={12} md={6}>
      <CardActionArea component="a" href="#">
        <Card sx={{ display: "flex" }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
              {post.postName}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {post.date}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {post.body}
            </Typography>
            <Typography variant="subtitle1" color="primary">
              Continue reading...
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: 160, display: { xs: "none", sm: "block" } }}
            image={post.image}
            alt={post.imageText}
          />
        </Card>
      </CardActionArea>
    </Grid>
  );
}

// Typechecking props of FeaturedPost
FeaturedPost.propTypes = {
  post: PropTypes.shape({
    date: PropTypes.string,
    body: PropTypes.string,
    image: PropTypes.string,
    imageText: PropTypes.string,
    postName: PropTypes.string,
  }),
};

FeaturedPost.defaultProps = {
  post: {
    date: "",
    body: "",
    image: "https://source.unsplash.com/random",
    imageText: "main image description",
    postName: "",
  },
};
