import renderer from "react-test-renderer";
import SignIn from "pages/LandingPages/SignIn";
import React from "react";

let realUseContext;
let useContextMock;
// Setup mock
beforeEach(() => {
    realUseContext = React.useContext;
    useContextMock = React.useContext = jest.fn();
});
// Cleanup mock
afterEach(() => {
    React.useContext = realUseContext;
});

// Define Mocks
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

jest.mock("context/AuthContext", () => {
    const { createContext } = jest.requireActual('react'); 
    return {
        __esModule: true,
        default: createContext()
    }
});

describe("SignIn", () => {
    it("renders", () => {
        useContextMock.mockReturnValue("Test Value");
        const component = renderer.create(<SignIn />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});