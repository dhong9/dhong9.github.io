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
import SignUp from "pages/LandingPages/SignUp";

// Google Client ID
const clientId = "416010689831-4lgodfsd3n7h84buas2s2mivevp2kdln.apps.googleusercontent.com";

// Setup axios mock
const mock = new MockAdapter(axios);

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

describe("SignUp", () => {
  it("signs up with success", () => {
    // Mock success endpoint
    mock.onPost("https://dhong9.pythonanywhere.com/accounts/register/").reply(200, { data: {} });

    const contextData = {
      loginUser: jest.fn(),
    };
    const { getByLabelText, getByText, queryByText } = render(
      <GoogleOAuthProvider clientId={clientId}>
        <AuthContext.Provider value={contextData}>
          <AuthProvider>
            <ThemeProvider theme={theme}>
              <SignUp />
            </ThemeProvider>
          </AuthProvider>
        </AuthContext.Provider>
      </GoogleOAuthProvider>
    );

    // Get form elements
    const usernameInput = getByLabelText("Username");
    const emailInput = getByLabelText("Email");
    const passwordInput = getByLabelText("Password");
    const password2Input = getByLabelText("Confirm Password");
    const signUpButton = getByText("sign up");

    // Sign up with no form input
    fireEvent.click(signUpButton);

    // Check that errors are shown
    expect(queryByText("Username is required.")).toBeInTheDocument();
    expect(queryByText("Password is required.")).toBeInTheDocument();
    expect(queryByText("Password confirmation is required.")).toBeInTheDocument();

    // Put data into the form
    fireEvent.change(usernameInput, { target: { value: "expertTester" } });
    fireEvent.change(emailInput, { target: { value: "expertTester@aol.com" } });
    fireEvent.change(passwordInput, { target: { value: "validPassword" } });
    fireEvent.change(password2Input, { target: { value: "validPassword" } });

    // Resubmit data
    fireEvent.click(signUpButton);

    // Errors should clear
    expect(queryByText("Username is required.")).not.toBeInTheDocument();
    expect(queryByText("Password is required.")).not.toBeInTheDocument();
    expect(queryByText("Password confirmation is required.")).not.toBeInTheDocument();
  });

  it("reports duplicate username", () => {
    // Force register endpoint to fail
    mock.onPost("https://dhong9.pythonanywhere.com/accounts/register/").reply(400, {
      response: {
        data: {
          username: ["Username already in use"],
        },
      },
      message: "Oh no, something's wrong",
    });

    const contextData = {
      loginUser: jest.fn(),
    };
    const { getByLabelText, getByText, queryByText } = render(
      <GoogleOAuthProvider clientId={clientId}>
        <AuthContext.Provider value={contextData}>
          <AuthProvider>
            <ThemeProvider theme={theme}>
              <SignUp />
            </ThemeProvider>
          </AuthProvider>
        </AuthContext.Provider>
      </GoogleOAuthProvider>
    );

    // Get form elements
    const usernameInput = getByLabelText("Username");
    const emailInput = getByLabelText("Email");
    const passwordInput = getByLabelText("Password");
    const password2Input = getByLabelText("Confirm Password");
    const signUpButton = getByText("sign up");

    // Put data into the form
    fireEvent.change(usernameInput, { target: { value: "expertTester" } });
    fireEvent.change(emailInput, { target: { value: "expertTester@aol.com" } });
    fireEvent.change(passwordInput, { target: { value: "validPassword" } });
    fireEvent.change(password2Input, { target: { value: "validPassword" } });

    // Resubmit data
    fireEvent.click(signUpButton);

    // Errors should clear
    expect(queryByText("Username is required.")).not.toBeInTheDocument();
    expect(queryByText("Password is required.")).not.toBeInTheDocument();
    expect(queryByText("Password confirmation is required.")).not.toBeInTheDocument();
  });

  it("reports duplicate email", () => {
    // Force register endpoint to fail
    mock.onPost("https://dhong9.pythonanywhere.com/accounts/register/").reply(400, {
      response: {
        data: {
          email: ["Email already in use"],
        },
      },
      message: "Oh no, something's wrong",
    });

    const contextData = {
      loginUser: jest.fn(),
    };
    const { getByLabelText, getByText, queryByText } = render(
      <GoogleOAuthProvider clientId={clientId}>
        <AuthContext.Provider value={contextData}>
          <AuthProvider>
            <ThemeProvider theme={theme}>
              <SignUp />
            </ThemeProvider>
          </AuthProvider>
        </AuthContext.Provider>
      </GoogleOAuthProvider>
    );

    // Get form elements
    const usernameInput = getByLabelText("Username");
    const emailInput = getByLabelText("Email");
    const passwordInput = getByLabelText("Password");
    const password2Input = getByLabelText("Confirm Password");
    const signUpButton = getByText("sign up");

    // Put data into the form
    fireEvent.change(usernameInput, { target: { value: "expertTester" } });
    fireEvent.change(emailInput, { target: { value: "expertTester@aol.com" } });
    fireEvent.change(passwordInput, { target: { value: "validPassword" } });
    fireEvent.change(password2Input, { target: { value: "validPassword" } });

    // Resubmit data
    fireEvent.click(signUpButton);

    // Errors should clear
    expect(queryByText("Username is required.")).not.toBeInTheDocument();
    expect(queryByText("Password is required.")).not.toBeInTheDocument();
    expect(queryByText("Password confirmation is required.")).not.toBeInTheDocument();
  });
});
