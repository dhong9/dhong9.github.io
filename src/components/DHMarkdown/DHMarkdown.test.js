// React testing libraries
import renderer from "react-test-renderer";

// Component to test
import DHMarkdown from "components/DHMarkdown";

describe("DHMarkdown", () => {
  it("renders", () => {
    const component = renderer.create(<DHMarkdown># Hello *world*!</DHMarkdown>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
