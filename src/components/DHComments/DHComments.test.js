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
        const comments = [{
            "id": 1,
            "pageName": "connect4",
            "name": "John Adams",
            "email": "john_adams@aol.com",
            "body": "Play connect 4 with me",
            "create": "2023-05-26T17:42:43.263337Z",
            "updated": "2023-05-26T17:42:43.263383Z",
            "active": true,
            "parent": null
        }];
        
        const component = renderer.create(<DHComments comments={comments} />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });


})