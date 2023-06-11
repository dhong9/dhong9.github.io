import renderer from "react-test-renderer";
import SignIn from "pages/LandingPages/SignIn";

// Mocks
jest.mock("examples/Navbars/DefaultNavbar", () => {
    const { forwardRef } = jest.requireActual("react");
    return {
        __esModule: true,
        default: forwardRef(() => <div>Mock Navbar</div>)
    };
});
jest.mock("components/DHSnackbar", () => {
    const { forwardRef } = jest.requireActual("react");
    return {
        __esModule: true,
        default: forwardRef(() => <div>Mock Snackbar</div>)
    };
});
jest.mock("components/MKBox", () => {
    const { forwardRef } = jest.requireActual("react");
    return {
        __esModule: true,
        default: forwardRef(() => <div>Mock Box</div>)
    };
});
jest.mock("react-monaco-editor", () => {
    const { forwardRef } = jest.requireActual("react");
    return {
        __esModule: true,
        default: forwardRef(() => <div>Mock Editor</div>)
    };
});

describe("SignIn", () => {
    it("renders", () => {
        const component = renderer.create(<SignIn />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});