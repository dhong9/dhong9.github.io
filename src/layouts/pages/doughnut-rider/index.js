import { createTheme, ThemeProvider } from "@mui/material/styles";
import ForumHeader from "components/ForumHeader";
import FeaturedPost from "components/FeaturedPost";

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
      <ForumHeader title="Forums Page" sections={sections} />
      <FeaturedPost post={post} />
    </ThemeProvider>
  );
}
