// Unit test libraries
import React from "react";
import renderer from "react-test-renderer";

// Component to test
import ProfilePage from "layouts/pages/authentication/profile";

// Mocks
jest.mock("pages/LandingPages/Profile", () => {
  const { forwardRef } = jest.requireActual("react");
  return {
    __esModule: true,
    default: forwardRef(() => <div>Profile</div>),
  };
});

describe("ProfilePage", () => {
  it("renders", () => {
    const component = renderer.create(<ProfilePage />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
