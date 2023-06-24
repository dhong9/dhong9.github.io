import renderer from "react-test-renderer";
import PictureShuffle from "projects/games/pictureShuffle";
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
jest.mock("components/MKButton", () => {
    const { forwardRef } = jest.requireActual("react");
    return {
        __esModule: true,
        default: forwardRef(() => <button>Mock Button</button>)
    };
});
jest.mock("components/MKBox", () => {
    const { forwardRef } = jest.requireActual("react");
    return {
        __esModule: true,
        default: forwardRef(() => <div>Mock Box</div>)
    };
});
jest.mock("layouts/sections/components/BaseLayout", () => {
    const { forwardRef } = jest.requireActual("react");
    return {
        __esModule: true,
        default: forwardRef(() => <div>Mock Layout</div>)
    };
});
jest.mock("layouts/sections/components/View", () => {
    const { forwardRef } = jest.requireActual("react");
    return {
        __esModule: true,
        default: forwardRef(() => <div>Mock View</div>)
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

describe("PictureShuffle", () => {
    it("renders", () => {
        useContextMock.mockReturnValue("Test Value");
        const component = renderer.create(<PictureShuffle />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});