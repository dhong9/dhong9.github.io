// React testing libraries
import React from "react";
import renderer from "react-test-renderer";

// Material Kit 2 React themes
import { ThemeProvider } from "@mui/material/styles";
import theme from "assets/theme";

// Authentication
import AuthContext, { AuthProvider } from "context/AuthContext";

// Component to test
import BaseLayout from "layouts/sections/components/BaseLayout";

// Define Mocks
jest.mock("@mui/material/Container", () => {
  const { forwardRef } = jest.requireActual("react");
  return {
    __esModule: true,
    default: forwardRef(() => <div>MUI Container</div>),
  };
});
jest.mock("@mui/material/Grid", () => {
  const { forwardRef } = jest.requireActual("react");
  return {
    __esModule: true,
    default: forwardRef(() => <div>MUI Grid</div>),
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
  useNavigate: jest.fn,
}));

describe("BaseLayout", () => {
  it("renders", () => {
    const contextData = {
      loginUser: jest.fn(),
    };

    const component = renderer.create(
      <AuthContext.Provider value={contextData}>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <BaseLayout title="Test Layout" breadcrumb={[]}>
              Base
            </BaseLayout>
          </ThemeProvider>
        </AuthProvider>
      </AuthContext.Provider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
