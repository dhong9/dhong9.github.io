/**
=========================================================
* Danyo-1.2
=========================================================

* Copyright 2024 Danyo (https://www.danyo.tech)

Coded by www.danyo.tech

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// React testing libraries
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

// Authentication
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

// Component to test
import AuthContext, { AuthProvider } from "context/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

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

// Mock JWT components
const mockToken = "mocked_jwt_value";
const refreshToken = "mocked_refresh_value";

describe("AuthContext", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.removeItem("authTokens");
    jest.clearAllMocks();
  });

  it("renders", () => {
    const contextData = {
      loginUser: jest.fn(),
    };

    const { queryByText } = render(
      <GoogleOAuthProvider clientId={clientId}>
        <AuthContext.Provider value={contextData}>
          <AuthProvider>Hello world!</AuthProvider>
        </AuthContext.Provider>
      </GoogleOAuthProvider>
    );
    expect(queryByText("Hello world!")).toBeInTheDocument();
  });

  it("updates token", () => {
    localStorage.setItem(
      "authTokens",
      JSON.stringify({ access: mockToken, refresh: refreshToken })
    );

    const contextData = {
      loginUser: jest.fn(),
      user: {
        username: "hairyPotter",
        email: "harry@magic.edu",
      },
    };

    const { queryByText } = render(
      <GoogleOAuthProvider clientId={clientId}>
        <AuthContext.Provider value={contextData}>
          <AuthProvider>Hello world!</AuthProvider>
        </AuthContext.Provider>
      </GoogleOAuthProvider>
    );

    jest.useFakeTimers();
    setTimeout(() => {
      expect(queryByText("Hello world!")).toBeInTheDocument();
    }, 4 * 1000 * 60);
    jest.runAllTimers();
  });
});
