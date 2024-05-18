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
import { render, fireEvent } from "@testing-library/react";

// Material Kit 2 React themes
import { ThemeProvider } from "@mui/material/styles";
import theme from "assets/theme";

// Component to test
import DeleteAccount from "pages/LandingPages/DeleteAccount";

// Authentication
import AuthContext, { AuthProvider } from "context/AuthContext";
import jwtDecode from "jwt-decode";
import { GoogleOAuthProvider } from "@react-oauth/google";

// Axios
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

// Service
import { deleteAccount } from "services/accountsService";

// Google Client ID
const clientId = "416010689831-4lgodfsd3n7h84buas2s2mivevp2kdln.apps.googleusercontent.com";

// Mocks
jest.mock("jwt-decode");
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
jest.mock("services/accountsService", () => ({
  deleteAccount: jest.fn(),
  refreshAccount: jest.fn(),
}));

// Setup axios mock
const mock = new MockAdapter(axios);
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
    const refreshToken = "mocked_refresh_value";

    localStorage.setItem(
      "authTokens",
      JSON.stringify({ access: mockToken, refresh: refreshToken })
    );

    // Set a mock payload for the decoded token
    const mockPayload = {
      username: "giri",
      user_id: 100,
      exp: 1893456000,
    };
    jwtDecode.mockReturnValue(mockPayload);

    const contextData = {
      loginUser: jest.fn(),
    };

    const { getByText, getByLabelText } = render(
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

    // Confirm username to delete
    const usernameInput = getByLabelText("Username");
    fireEvent.change(usernameInput, { target: { value: "giri" } });

    // Matching username should enable delete button
    expect(deleteButton).toHaveProperty("disabled", false);

    // Delete user
    fireEvent.click(deleteButton);
    expect(deleteAccount).toHaveBeenCalledWith(
      100,
      expect.any(Function),
      expect.any(Function),
      mockToken
    );
  });
});
