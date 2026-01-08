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
mock.onPost("accounts/users/activation/").reply(200, {});

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
      user: {
        username: "authUser",
        email: "user@oath.com",
        id: 19,
      },
    };

    const { queryByText } = render(
      <AuthContext.Provider value={contextData}>
        <AuthProvider>Hello world!</AuthProvider>
      </AuthContext.Provider>
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
        id: 100,
      },
    };

    const { queryByText } = render(
      <AuthContext.Provider value={contextData}>
        <AuthProvider>Hello world!</AuthProvider>
      </AuthContext.Provider>
    );

    jest.useFakeTimers();
    setTimeout(() => {
      expect(queryByText("Hello world!")).toBeInTheDocument();
    }, 4 * 1000 * 60);
    jest.runAllTimers();
  });
});
