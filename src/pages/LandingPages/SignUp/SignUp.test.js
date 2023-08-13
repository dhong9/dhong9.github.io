// React testing libraries
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

// Material Kit 2 React themes
import { ThemeProvider } from "@mui/material/styles";
import theme from "assets/theme";

// Authentication
import AuthContext, { AuthProvider } from "context/AuthContext";

// Component to test
import SignUp from "pages/LandingPages/SignUp";

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

describe("SignUp", () => {
  it("renders", () => {
    const contextData = {
      loginUser: jest.fn(),
    };
    const { getByLabelText, getByText, queryByText } = render(
      <AuthContext.Provider value={contextData}>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <SignUp />
          </ThemeProvider>
        </AuthProvider>
      </AuthContext.Provider>
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
});
