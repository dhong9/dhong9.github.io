// React testing libraries
import renderer from "react-test-renderer";

// Component to test
import DHSnackbar from "components/DHSnackbar";

describe("DHSnackbar", () => {
  it("renders", () => {
    const component = renderer.create(<DHSnackbar />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
