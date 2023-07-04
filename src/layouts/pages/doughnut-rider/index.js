// @mui material components
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Page components
import ForumHeader from "components/ForumHeader";
import FeaturedPost from "components/FeaturedPost";
import MainFeaturedPost from "components/MainFeaturedPost";

const mainFeaturedPost = {
  title: "Title of a longer featured blog post",
  description:
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  image: "https://source.unsplash.com/random",
  imageText: "main image description",
  linkText: "Continue reading…",
};

const theme = createTheme();

export default function DoughnutRiderPage() {
  const sections = [{ title: "Sports" }, { title: "Politics" }];

  const post = {
    title: "Announcements",
    date: "July 10, 2020",
    description: "Making a big announcement",
    image:
      "https://images.pexels.com/photos/17353007/pexels-photo-17353007/free-photo-of-bikes.jpeg",
    imageLabel: "Bikes",
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <ForumHeader title="Forums Page" sections={sections} />
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={4}>
            <FeaturedPost post={post} />
          </Grid>
        </main>
      </Container>
    </ThemeProvider>
  );
}
