import renderer from "react-test-renderer";
import MKTypography from "components/MKTypography";

// Mocks
jest.mock("components/MKTypography/MKTypographyRoot", () => {
    const { forwardRef } = jest.requireActual("react");
    return {
        __esModule: true,
        default: forwardRef(() => <p>Mock Typography</p>)
    };
});

jest.mock("@mui/material/styles", () => ({
    ...jest.requireActual("@mui/material/styles"),
    styled: jest.fn().mockReturnValue(jest.fn().mockReturnValue("mock-style")),
  }));

describe("MKTypography", () => {
    it("renders", () => {
        const component = renderer.create(<MKTypography />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});