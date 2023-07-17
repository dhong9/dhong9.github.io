// Unit test libraries
import renderer from "react-test-renderer";

// Material Kit 2 React themes
import { ThemeProvider } from "@mui/material/styles";
import theme from "assets/theme";

// Component to test
import MainForumPosts from "components/MainForumPosts";

describe("MainForumPosts", () => {
  it("renders", () => {
    const posts = [
      {
        id: 1,
        isPlainText: false,
        body: "**Hi** _there_!",
      },
      {
        id: 2,
        isPlainText: true,
        body: "Hello again!",
      },
    ];
    const title = "Test Post";

    const component = renderer.create(
      <ThemeProvider theme={theme}>
        <MainForumPosts posts={posts} title={title} />
      </ThemeProvider>
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
