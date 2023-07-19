// React testing libraries
import renderer from "react-test-renderer";

// Component to test
import FeaturedPost from "components/FeaturedPost";

describe("FeaturedPost", () => {
  it("renders", () => {
    const post = {
        postName: "Bicycles",
        body: "It's healthy to bike to work everyday."
    };
    const component = renderer.create(<FeaturedPost post={post} />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
