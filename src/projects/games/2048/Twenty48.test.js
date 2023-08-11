// React testing libraries
import React from "react";
import renderer from "react-test-renderer";

// Material Kit 2 React themes
import { ThemeProvider } from "@mui/material/styles";
import theme from "assets/theme";

// Component to test
import Twenty48 from "projects/games/2048";

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
      default: forwardRef(() => <p>Mock Box</p>)
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

describe("2048", () => {
  it("renders", () => {
    useContextMock.mockReturnValue("Test Value");
    const component = renderer.create(
      <ThemeProvider theme={theme}>
        <Twenty48 />
      </ThemeProvider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
