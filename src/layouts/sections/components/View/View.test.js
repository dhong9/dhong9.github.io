import renderer from "react-test-renderer";
import View from "layouts/sections/components/View";

// Define Mocks
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

describe("View", () => {
    it("renders", () => {
        const component = renderer.create(<View title="Test View" code="" height="100%" >Test View</View>);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});