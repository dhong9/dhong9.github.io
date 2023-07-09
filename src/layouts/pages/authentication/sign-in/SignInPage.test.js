// Unit test libraries
import React from "react";
import renderer from "react-test-renderer";

// Component to test
import SignInPage from "layouts/pages/authentication/sign-in";

// Mocks
jest.mock("pages/LandingPages/SignIn", () => {
  const { forwardRef } = jest.requireActual("react");
  return {
    __esModule: true,
    default: forwardRef(() => <div>SignIn</div>),
  };
});

describe("SignInPage", () => {
  it("renders", () => {
    const component = renderer.create(<SignInPage />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
