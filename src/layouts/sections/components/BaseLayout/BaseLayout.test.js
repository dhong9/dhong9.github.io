import renderer from "react-test-renderer";
import BaseLayout from "layouts/sections/components/BaseLayout";
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
jest.mock("examples/Breadcrumbs", () => {
    const { forwardRef } = jest.requireActual("react");
    return {
        __esModule: true,
        default: forwardRef(() => <div>Mock Breadcrumbs</div>)
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

describe("BaseLayout", () => {
    it("renders", () => {
        useContextMock.mockReturnValue("Test Value");
        const component = renderer.create(
            <BaseLayout
                title="Test Layout"
                breadcrumb={[]}
            >
                    Base
            </BaseLayout>
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});