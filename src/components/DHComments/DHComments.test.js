import React from "react";
import renderer from "react-test-renderer";
import DHComments from "components/DHComments";

// Mocks
jest.mock("components/MKButton", () => {
    const { forwardRef } = jest.requireActual("react");
    return {
        __esModule: true,
        default: forwardRef(() => <button>Mock Button</button>)
    };
});

describe("DHComments", () => {
    let useEffect;

    const mockUseEffect = () => {
        useEffect.mockImplementationOnce(f => f());
    };

    beforeEach(() => {
        useEffect = jest.spyOn(React, "useEffect");
        mockUseEffect();
    });

    it("renders", () => {
        const component = renderer.create(<DHComments />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });


})