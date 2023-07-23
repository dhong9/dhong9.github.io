// React testing libraries
import renderer from "react-test-renderer";

// Component to test
import DHEditor from "components/DHEditor";

// Mocks
jest.mock("draft-convert", () => {
  return {
    convertFromHTML: jest.fn(),
    convertToRaw: jest.fn(),
  };
});

describe("DHEditor", () => {
  it("renders", () => {
    const component = renderer.create(<DHEditor />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
