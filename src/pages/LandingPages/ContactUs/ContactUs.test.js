import renderer from "react-test-renderer";
import ContactUs from "pages/LandingPages/ContactUs";

// Mocks
jest.mock("components/MKBox", () => {
    const { forwardRef } = jest.requireActual("react");
    return {
        __esModule: true,
        default: forwardRef(() => <div>Mock Box</div>)
    };
});

describe("ContactUs", () => {
    it("renders", () => {
        const component = renderer.create(<ContactUs />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});