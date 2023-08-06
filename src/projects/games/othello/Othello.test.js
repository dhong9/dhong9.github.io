// React testing libraries
import React from "react";
import renderer from "react-test-renderer";

// Component to test
import Othello from "projects/games/othello";

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
jest.mock("components/MKButton", () => {
  const { forwardRef } = jest.requireActual("react");
  return {
    __esModule: true,
    default: forwardRef(() => <button>Mock Button</button>),
  };
});
jest.mock("components/MKBox", () => {
  const { forwardRef } = jest.requireActual("react");
  return {
    __esModule: true,
    default: forwardRef(() => <div>Mock Box</div>),
  };
});
jest.mock("layouts/sections/components/BaseLayout", () => {
  const { forwardRef } = jest.requireActual("react");
  return {
    __esModule: true,
    default: forwardRef(() => <div>Mock Layout</div>),
  };
});
jest.mock("layouts/sections/components/View", () => {
  const { forwardRef } = jest.requireActual("react");
  return {
    __esModule: true,
    default: forwardRef(() => <div>Mock View</div>),
  };
});
jest.mock("react-monaco-editor", () => {
  const { forwardRef } = jest.requireActual("react");
  return {
    __esModule: true,
    default: forwardRef(() => <div>Mock Editor</div>),
  };
});
jest.mock("draft-convert", () => {
  return {
    convertFromHTML: jest.fn(),
    convertToRaw: jest.fn(),
    convertToHTML: jest.fn().mockReturnValue("<p>Test content</p>"), // Mock the return value of convertToHTML
  };
});

describe("Othello", () => {
  it("renders", () => {
    useContextMock.mockReturnValue("Test Value");
    const component = renderer.create(<Othello />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
