import renderer from "react-test-renderer";
import MKInput from "components/MKInput";

// Mocks
jest.mock("components/MKInput/MKInputRoot", () => {
    const { forwardRef } = jest.requireActual("react");
    return {
        __esModule: true,
        default: forwardRef(() => <input>Mock Input</input>)
    };
});

jest.mock("@mui/material/styles", () => ({
    ...jest.requireActual("@mui/material/styles"),
    styled: jest.fn().mockReturnValue(jest.fn().mockReturnValue("mock-style")),
  }));

it("renders", () => {
    const component = renderer.create(<MKInput />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});