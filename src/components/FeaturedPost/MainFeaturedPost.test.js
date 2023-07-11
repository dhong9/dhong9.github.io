// React testing libraries
import renderer from "react-test-renderer";

// Component to test
import FeaturedPost from "components/FeaturedPost";

describe("FeaturedPost", () => {
  it("renders", () => {
    const posts = [{
        postName: "Bicycles",
        body: "It's healthy to bike to work everyday."
    }];
    const component = renderer.create(<FeaturedPost posts={posts} />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
