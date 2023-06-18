import renderer from "react-test-renderer";
import SimpleFooter from "examples/Footers/SimpleFooter";

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
jest.mock("@mui/material/Container", () => {
    const { forwardRef } = jest.requireActual("react");
    return {
        __esModule: true,
        default: forwardRef(() => <div>MUI Container</div>)
    };
});
jest.mock("@mui/material/Icon", () => {
    const { forwardRef } = jest.requireActual("react");
    return {
        __esModule: true,
        default: forwardRef(() => <div>MUI Icon</div>)
    };
});

describe("SimpleFooter", () => {
    it("renders", () => {
        const component = renderer.create(
            <SimpleFooter>Test Simple Footer</SimpleFooter>
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});