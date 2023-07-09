// Unit test libraries
import React from "react";
import renderer from "react-test-renderer";

// Component to test
import SignUpPage from "layouts/pages/authentication/sign-up";

// Mocks
jest.mock("pages/LandingPages/SignUp", () => {
  const { forwardRef } = jest.requireActual("react");
  return {
    __esModule: true,
    default: forwardRef(() => <div>SignUp</div>),
  };
});

describe("SignUpPage", () => {
  it("renders", () => {
    const component = renderer.create(<SignUpPage />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
