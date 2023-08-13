// React testing libraries
import React from "react";
import renderer from "react-test-renderer";

// Material Kit 2 React themes
import { ThemeProvider } from "@mui/material/styles";
import theme from "assets/theme";

// Component to test
import BrainF from "projects/interpreters/brainF";

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
jest.mock("components/MKBox/MKBoxRoot", () => {
  const { forwardRef } = jest.requireActual("react");
  return {
    __esModule: true,
    default: forwardRef(({ children, ownerState, ...rest }, ref) => (
      <div ref={ref} {...rest}>
        {children}
      </div>
    )),
  };
});
jest.mock("@mui/material/Container", () => {
  const { forwardRef } = jest.requireActual("react");
  return {
      __esModule: true,
      default: forwardRef(() => <div>MUI Container</div>)
  };
});
jest.mock("@mui/material/Grid", () => {
  const { forwardRef } = jest.requireActual("react");
  return {
      __esModule: true,
      default: forwardRef(() => <div>MUI Grid</div>)
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
  };
});
jest.mock("react-router-dom", () => ({
  Link: jest.fn(({ to, children }) => <a href={to}>{children}</a>),
}));

describe("BrainF", () => {
  it("renders with user", () => {
    const user = {
      username: "tester",
      email: "tester@ctc.org",
    };
    useContextMock.mockReturnValue({user});
    const component = renderer.create(
      <ThemeProvider theme={theme}>
        <BrainF />
      </ThemeProvider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders without user", () => {
    useContextMock.mockReturnValue("Test value");
    const component = renderer.create(
      <ThemeProvider theme={theme}>
        <BrainF />
      </ThemeProvider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
