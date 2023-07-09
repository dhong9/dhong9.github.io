// Unit test libraries
import React from "react";
import renderer from "react-test-renderer";

// Component to test
import SignOutPage from "layouts/pages/authentication/sign-out";

// Mocks
jest.mock("pages/LandingPages/SignOut", () => {
  const { forwardRef } = jest.requireActual("react");
  return {
    __esModule: true,
    default: forwardRef(() => <div>SignOut</div>),
  };
});

describe("SignOutPage", () => {
  it("renders", () => {
    const component = renderer.create(<SignOutPage />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
