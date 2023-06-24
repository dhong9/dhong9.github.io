import renderer from "react-test-renderer";
import Connect4 from "projects/games/connect4";
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
        default: forwardRef(() => <button>Mock Box</button>)
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

describe("Connect4", () => {
    it("renders", () => {
        useContextMock.mockReturnValue("Test Value");
        const component = renderer.create(<Connect4 />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});