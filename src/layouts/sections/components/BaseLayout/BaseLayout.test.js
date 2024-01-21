// React testing libraries
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

// Material Kit 2 React themes
import { ThemeProvider } from "@mui/material/styles";
import theme from "assets/theme";

// Authentication
import AuthContext, { AuthProvider } from "context/AuthContext";
import jwtDecode from "jwt-decode";

// Component to test
import BaseLayout from "layouts/sections/components/BaseLayout";

// Define Mocks
jest.mock("jwt-decode");
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
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.removeItem("authTokens");
    jest.clearAllMocks();
  });

  it("renders", () => {
    // Mock tokens
    const mockToken = "mocked_jwt_value";
    const refreshToken = "mocked_refresh_value";

    localStorage.setItem(
      "authTokens",
      JSON.stringify({ access: mockToken, refresh: refreshToken })
    );

    // Set a mock payload for the decoded token
    const mockPayload = { user: "John Doe", exp: 1893456000 };
    jwtDecode.mockReturnValue(mockPayload);

    const contextData = {
      loginUser: jest.fn(),
    };

    const { queryByText } = render(
      <AuthContext.Provider value={contextData}>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <BaseLayout title="Test Layout" breadcrumb={[]}>
              Dummy Layout
            </BaseLayout>
          </ThemeProvider>
        </AuthProvider>
      </AuthContext.Provider>
    );
    expect(queryByText("Test Layout")).toBeInTheDocument();
    expect(queryByText("Dummy Layout")).toBeInTheDocument();
  });
});
