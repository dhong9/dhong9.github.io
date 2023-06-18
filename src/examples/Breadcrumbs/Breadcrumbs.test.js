import renderer from "react-test-renderer";
import Breadcrumbs from "examples/Breadcrumbs";

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
jest.mock("@mui/material/Breadcrumbs", () => {
    const { forwardRef } = jest.requireActual("react");
    return {
        __esModule: true,
        default: forwardRef(() => <div>MUI Breadcrumbs</div>)
    };
});

describe("BaseLayout", () => {
    it("renders", () => {
        const component = renderer.create(
            <Breadcrumbs routes={[{ label: "Bread", route: "/crumbs" }]}>
                Test Breadcrumbs
            </Breadcrumbs>
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});