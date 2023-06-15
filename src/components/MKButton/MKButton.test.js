import renderer from "react-test-renderer";
import MKButtonRoot from "components/MKButton/MKButtonRoot";

// Mocks
jest.mock("components/MKButton", () => {
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
    it("renders", () => {
        const component = renderer.create(<MKButtonRoot />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("renders gradient", () => {
        const component = renderer.create(<MKButtonRoot variant="gradient" />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});