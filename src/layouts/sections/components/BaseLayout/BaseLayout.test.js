// React testing libraries
import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

// Material Kit 2 React themes
import { ThemeProvider } from "@mui/material/styles";
import theme from "assets/theme";

// Authentication
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import AuthContext, { AuthProvider } from "context/AuthContext";

// Component to test
import BaseLayout from "layouts/sections/components/BaseLayout";

// Define Mocks
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
jest.mock("services/googleService", () => ({
  getGoogleUser: jest.fn(),
}));

const mock = new MockAdapter(axios);
mock.onGet("accounts/users/me/").reply(200, {});
mock.onPost("accounts/token/").reply(200, {
  data: {
    access: "abcdefghijklmnop",
  },
});
mock.onPost("accounts/token/refresh/").reply(200, {
  data: {
    refresh: "rstuvwxyz",
  },
});

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
    localStorage.setItem("authTokens", mockToken);

    // Dummy context data
    const contextData = {
      loginUser: jest.fn(),
      user: {
        username: "john_doe",
        email: "doe_a_dear@hotmail.com",
        id: 9,
      },
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
