import renderer from "react-test-renderer";
import MKButton from "components/MKButton";

// Mocks
jest.mock("components/MKButton/MKButtonRoot", () => {
    const { forwardRef } = jest.requireActual("react");
    return {
        __esModule: true,
        default: forwardRef(() => <button>Mock Button</button>)
    };
});

jest.mock("@mui/material/styles", () => ({
    ...jest.requireActual("@mui/material/styles"),
    styled: jest.fn().mockReturnValue(jest.fn().mockReturnValue("mock-style")),
  }));

describe("MKButton", () => {
    it("renders primary button", () => {
        const component = renderer.create(<MKButton variant="primary" />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("renders gradient button", () => {
        const component = renderer.create(<MKButton variant="gradient" />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});