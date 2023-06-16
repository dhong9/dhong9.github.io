import renderer from "react-test-renderer";
import SignOut from "pages/LandingPages/SignOut";
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

describe("SignOut", () => {
    it("renders", () => {
        useContextMock.mockReturnValue("Test Value");
        const component = renderer.create(<SignOut />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});