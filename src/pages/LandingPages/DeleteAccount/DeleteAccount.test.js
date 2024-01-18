// Unit test libraries
import React from "react";
import { render, fireEvent } from "@testing-library/react";

// Material Kit 2 React themes
import { ThemeProvider } from "@mui/material/styles";
import theme from "assets/theme";

// Component to test
import DeleteAccount from "pages/LandingPages/DeleteAccount";

// Authentication
import AuthContext, { AuthProvider } from "context/AuthContext";
import jwtDecode from "jwt-decode";

// Axios
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

// Setup axios mock
const mock = new MockAdapter(axios);

// Mocks
jest.mock("jwt-decode");
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn,
}));

jest.mock("services/baseService", () => ({
  getRequest: jest.fn(),
  postRequest: jest.fn(),
}));

mock.onDelete("/delete\\/\\d+/").reply(200, {});

describe("DeleteAccount", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.removeItem("authTokens");
    jest.clearAllMocks();
  });

  it("deletes account", () => {
    // Mock tokens
    const mockToken = "mocked_jwt_value";
    const refreshToken = "mocked_refresh_value";

    localStorage.setItem(
      "authTokens",
      JSON.stringify({ access: mockToken, refresh: refreshToken })
    );

    // Set a mock payload for the decoded token
    const mockPayload = {
      user: {
        username: "giri",
        user_id: 100,
      },
      exp: 1893456000,
    };
    jwtDecode.mockReturnValue(mockPayload);

    const contextData = {
      loginUser: jest.fn(),
    };

    const { container, getByText } = render(
      <AuthContext.Provider value={contextData}>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <DeleteAccount />
          </ThemeProvider>
        </AuthProvider>
      </AuthContext.Provider>
    );

    // Delete button should be disabled
    const deleteButton = getByText("delete account");
    expect(deleteButton).toHaveProperty("disabled", true);
    
    expect(container).toMatchSnapshot();
  });
});
