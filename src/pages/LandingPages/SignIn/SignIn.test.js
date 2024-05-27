// React testing libraries
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

// Material Kit 2 React themes
import { ThemeProvider } from "@mui/material/styles";
import theme from "assets/theme";

// Authentication
import axios from "axios";
import AuthContext, { AuthProvider } from "context/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

// Axios
import MockAdapter from "axios-mock-adapter";

// Component to test
import SignIn from "pages/LandingPages/SignIn";

jest.mock("services/baseService", () => ({
  getRequest: jest.fn(),
  postRequest: jest.fn(),
}));

// Setup axios mock
const mock = new MockAdapter(axios);
mock.onPost("accounts/token/").reply(200, {
  status: 200,
  data: {
    access: "mock_access",
  },
});

// Google Client ID
const clientId = "416010689831-4lgodfsd3n7h84buas2s2mivevp2kdln.apps.googleusercontent.com";

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
    convertToHTML: jest.fn(),
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

describe("SignIn", () => {
  it("renders", () => {
    const contextData = {
      loginUser: jest.fn(),
    };
    const { getByLabelText, getByText, queryByText } = render(
      <GoogleOAuthProvider clientId={clientId}>
        <AuthContext.Provider value={contextData}>
          <AuthProvider>
            <ThemeProvider theme={theme}>
              <SignIn onsucess={jest.fn} />
            </ThemeProvider>
          </AuthProvider>
        </AuthContext.Provider>
      </GoogleOAuthProvider>
    );

    // Get form elements
    const usernameInput = getByLabelText("Username or Email");
    const passwordInput = getByLabelText("Password");
    const signInButton = getByText("Sign In");

    // Sign in with no form input
    fireEvent.click(signInButton);

    // Check that errors are shown
    expect(queryByText("Username or email is required.")).toBeInTheDocument();
    expect(queryByText("Password is required.")).toBeInTheDocument();

    // Put data into the form
    fireEvent.change(usernameInput, { target: { value: "expertTester" } });
    fireEvent.change(passwordInput, { target: { value: "validPassword" } });

    // Resubmit data
    fireEvent.click(signInButton);

    // Errors should clear
    expect(queryByText("Username or email is required.")).not.toBeInTheDocument();
    expect(queryByText("Password is required.")).not.toBeInTheDocument();
  });
});
