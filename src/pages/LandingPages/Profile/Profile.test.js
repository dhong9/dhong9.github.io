// React testing libraries
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

// Material Kit 2 React themes
import { ThemeProvider } from "@mui/material/styles";
import theme from "assets/theme";

// Authentication
import axios from "axios";
import AuthContext, { AuthProvider } from "context/AuthContext";
import jwtDecode from "jwt-decode";

// Axios
import MockAdapter from "axios-mock-adapter";

// Component to test
import Profile from "pages/LandingPages/Profile";

jest.mock("services/baseService", () => ({
  getRequest: jest.fn(),
  putRequest: jest.fn(),
  postRequest: jest.fn(),
}));

// Setup axios mock
const mock = new MockAdapter(axios);

mock.onPost("accounts/update/").reply(200, {});

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
jest.mock("examples/Navbars/DefaultNavbar", () => {
  const { forwardRef } = jest.requireActual("react");
  return {
    __esModule: true,
    default: forwardRef(() => <div>Mock Navbar</div>),
  };
});

describe("Profile", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.removeItem("authTokens");
    jest.clearAllMocks();
  });

  it("updates user profile", () => {
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
      user: {
        username: "giri"
      }
    };
    const { getByLabelText, getByText, queryByText } = render(
      <AuthContext.Provider value={contextData}>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <Profile />
          </ThemeProvider>
        </AuthProvider>
      </AuthContext.Provider>
    );

    // Get form elements
    const usernameInput = getByLabelText("Username");
    const emailInput = getByLabelText("Email");
    const passwordInput = getByLabelText("Password");
    const password2Input = getByLabelText("Confirm Password");
    const saveButton = getByText("save changes");

    fireEvent.change(usernameInput, { target: { value: "" } });
    fireEvent.change(emailInput, { target: { value: "" } });

    // Sign up with no form input
    fireEvent.click(saveButton);

    // Put data into the form
    fireEvent.change(usernameInput, { target: { value: "expertTester" } });
    fireEvent.change(emailInput, { target: { value: "expertTester@aol.com" } });
    fireEvent.change(passwordInput, { target: { value: "validPassword" } });
    fireEvent.change(password2Input, { target: { value: "validPassword" } });

    // Resubmit data
    fireEvent.click(saveButton);

    // Errors should clear
    expect(queryByText("Username is required.")).not.toBeInTheDocument();
    expect(queryByText("Password is required.")).not.toBeInTheDocument();
    expect(queryByText("Password confirmation is required.")).not.toBeInTheDocument();
  });
});
