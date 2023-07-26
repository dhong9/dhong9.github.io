// React testing libraries
import React from "react";
import renderer from "react-test-renderer";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import theme from "assets/theme";

// Component to test
import SignIn from "pages/LandingPages/SignIn";

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
jest.mock("examples/Navbars/DefaultNavbar", () => {
  const { forwardRef } = jest.requireActual("react");
  return {
    __esModule: true,
    default: forwardRef(() => <div>Mock Navbar</div>),
  };
});
jest.mock("components/MKBox", () => {
  const { forwardRef } = jest.requireActual("react");
  return {
    __esModule: true,
    default: forwardRef(() => <div>Mock Box</div>),
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

describe("SignIn", () => {
  it("renders", () => {
    useContextMock.mockReturnValue("Test Value");
    const component = renderer.create(
      <ThemeProvider theme={theme}>
        <SignIn />
      </ThemeProvider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
