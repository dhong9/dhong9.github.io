/**
=========================================================
* Danyo-1.2
=========================================================

* Copyright 2024 Danyo (https://www.danyo.tech)

Coded by www.danyo.tech

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Unit test libraries
import React from "react";
import { render } from "@testing-library/react";

// Material Kit 2 React themes
import { ThemeProvider } from "@mui/material/styles";
import theme from "assets/theme";

// Component to test
import DeleteAccount from "pages/LandingPages/DeleteAccount";

// Authentication
import AuthContext, { AuthProvider } from "context/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

// Axios
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

// Google Client ID
const clientId = "416010689831-4lgodfsd3n7h84buas2s2mivevp2kdln.apps.googleusercontent.com";

// Mocks
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn,
}));

jest.mock("services/baseService", () => ({
  getRequest: jest.fn(),
  postRequest: jest.fn(),
}));

jest.mock("services/googleService", () => ({
  getGoogleUser: jest.fn(),
}));
jest.mock("accounts/users/me/", () => ({
  deleteAccount: jest.fn(),
  refreshAccount: jest.fn(),
}));

// Setup axios mock
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
    localStorage.setItem("authTokens", mockToken);

    const contextData = {
      loginUser: jest.fn(),
      user: {
        username: "giri",
        email: "GMAnish@chess.com",
        id: 0,
      },
    };

    const { getByText } = render(
      <GoogleOAuthProvider clientId={clientId}>
        <AuthContext.Provider value={contextData}>
          <AuthProvider>
            <ThemeProvider theme={theme}>
              <DeleteAccount />
            </ThemeProvider>
          </AuthProvider>
        </AuthContext.Provider>
      </GoogleOAuthProvider>
    );

    // Delete button should be disabled
    const deleteButton = getByText("delete account");
    expect(deleteButton).toHaveProperty("disabled", true);
  });
});
