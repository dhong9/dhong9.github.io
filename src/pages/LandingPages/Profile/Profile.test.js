// Unit test libraries
import React from "react";
import renderer from "react-test-renderer";

// Component to test
import Profile from "pages/LandingPages/Profile"

describe("Profile", () => {
  it("renders", () => {
    const component = renderer.create(<Profile />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
