// React testing libraries
import renderer from "react-test-renderer";

// Component to test
import MainFeaturedPost from "components/MainFeaturedPost";

describe("MainFeaturedPost", () => {
  it("renders", () => {
    const posts = [{
        postName: "Bicycles",
        body: "It's healthy to bike to work everyday."
    }];
    const component = renderer.create(<MainFeaturedPost posts={posts} />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
