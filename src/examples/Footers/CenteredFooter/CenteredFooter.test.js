import renderer from "react-test-renderer";
import CenteredFooter from "examples/Footers/CenteredFooter";

// Mocks
jest.mock("components/MKBox", () => {
    const { forwardRef } = jest.requireActual("react");
    return {
        __esModule: true,
        default: forwardRef(() => <div>Mock Box</div>)
    };
});
jest.mock("components/MKTypography", () => {
    const { forwardRef } = jest.requireActual("react");
    return {
        __esModule: true,
        default: forwardRef(() => <p>Mock Typography</p>)
    };
});
jest.mock("@mui/material/Link", () => {
    const { forwardRef } = jest.requireActual("react");
    return {
        __esModule: true,
        default: forwardRef(() => <div>MUI Link</div>)
    };
});
jest.mock("@mui/material/Grid", () => {
    const { forwardRef } = jest.requireActual("react");
    return {
        __esModule: true,
        default: forwardRef(() => <div>MUI Grid</div>)
    };
});
jest.mock("@mui/material/Stack", () => {
    const { forwardRef } = jest.requireActual("react");
    return {
        __esModule: true,
        default: forwardRef(() => <div>MUI Stack</div>)
    };
});

describe("CenteredFooter", () => {
    it("renders", () => {
        const component = renderer.create(
            <CenteredFooter>Test Centered Footer</CenteredFooter>
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});