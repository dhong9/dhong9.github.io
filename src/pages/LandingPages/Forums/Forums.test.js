// Unit test libraries
import React from "react";
import renderer from "react-test-renderer";

// Component to test
import Forums from "pages/LandingPages/Forums";

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
  jest.clearAllMocks();
});

// Mocks
jest.mock("react-monaco-editor", () => {
  const { forwardRef } = jest.requireActual("react");
  return {
    __esModule: true,
    default: forwardRef(() => <div>Mock Editor</div>),
  };
});
jest.mock("components/MKBox", () => {
  const { forwardRef } = jest.requireActual("react");
  return {
    __esModule: true,
    default: forwardRef(() => <div>Mock Box</div>),
  };
});
jest.mock("draft-convert", () => {
  return {
    convertFromHTML: jest.fn(),
    convertToRaw: jest.fn(),
  };
});

describe("Forums", () => {
  it("renders", () => {
    useContextMock.mockReturnValue("Test Value");

    const component = renderer.create(<Forums />);

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
