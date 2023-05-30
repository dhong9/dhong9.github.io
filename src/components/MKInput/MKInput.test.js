import renderer from "react-test-renderer";
import MKInputRoot from "components/MKInput/MKInputRoot";

// Mocks
jest.mock("components/MKInput", () => {
    const { forwardRef } = jest.requireActual("react");
    return {
        __esModule: true,
        default: forwardRef(() => <input>Mock Button</input>)
    };
});

jest.mock("@mui/material/styles", () => ({
    ...jest.requireActual("@mui/material/styles"),
    styled: jest.fn().mockReturnValue(jest.fn().mockReturnValue("mock-style")),
  }));

it("renders", () => {
    const component = renderer.create(<MKInputRoot />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});