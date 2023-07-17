// Unit test libraries
import renderer from "react-test-renderer";

// Component to test
import MainForumPosts from "components/MainForumPosts";

describe("MainForumPosts", () => {
  it("renders", () => {

    const posts = []
    const title = "Test Post"

    const component = renderer.create(<MainForumPosts posts={posts} title={title} />);

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
