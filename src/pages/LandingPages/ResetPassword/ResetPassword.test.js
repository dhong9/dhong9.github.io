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
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

// Material Kit 2 React themes
import { ThemeProvider } from "@mui/material/styles";
import theme from "assets/theme";

// Component to test
import ResetPassword from "pages/LandingPages/ResetPassword";

// Mocks
jest.mock("draft-convert", () => {
  return {
    convertFromHTML: jest.fn(),
    convertToRaw: jest.fn(),
    convertToHTML: jest.fn().mockReturnValue("<p>Test content</p>"), // Mock the return value of convertToHTML
  };
});
jest.mock("react-monaco-editor", () => {
  const { forwardRef } = jest.requireActual("react");
  return {
    __esModule: true,
    default: forwardRef(() => <div>Mock Editor</div>),
  };
});
jest.mock("react-router-dom", () => ({
  Link: jest.fn(({ to, children }) => <a href={to}>{children}</a>),
  useNavigate: jest.fn,
}));

describe("ResetPassword", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("requires input", () => {
    const { getByText, getByLabelText, queryByText } = render(
      <ThemeProvider theme={theme}>
        <ResetPassword />
      </ThemeProvider>
    );

    // Get form elements
    const passwordInput = getByLabelText("Password");
    const confirmPasswordInput = getByLabelText("Confirm Password");
    const resetButton = getByText("reset password");

    // Submit empty inputs
    fireEvent.click(resetButton);
    expect(queryByText("Password is required.")).toBeInTheDocument();
    expect(queryByText("Password confirmation is required.")).toBeInTheDocument();

    // Provide input for just the first password
    fireEvent.change(passwordInput, { target: { value: "catsdogsmice" } });
    fireEvent.click(resetButton);
    expect(queryByText("Password is required.")).not.toBeInTheDocument();
    expect(queryByText("Password confirmation is required.")).toBeInTheDocument();

    // Provide input for just the second password
    fireEvent.change(passwordInput, { target: { value: "   " } });
    fireEvent.change(confirmPasswordInput, { target: { value: "pigssheeplamb" } });
    fireEvent.click(resetButton);
    expect(queryByText("Password is required.")).toBeInTheDocument();
    expect(queryByText("Password confirmation is required.")).not.toBeInTheDocument();
  });
});
