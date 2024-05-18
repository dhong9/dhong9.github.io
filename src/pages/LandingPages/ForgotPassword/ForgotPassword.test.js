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
import ForgotPassword from "pages/LandingPages/ForgotPassword";

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

describe("ForgotPasword", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("requires email address", () => {
    const { getByText, getByLabelText, queryByText } = render(
      <ThemeProvider theme={theme}>
        <ForgotPassword />
      </ThemeProvider>
    );

    // Get form fields
    const emailInput = getByLabelText("Email");
    const sendButton = getByText("reset password");

    // Press button without any input
    fireEvent.click(sendButton);
    expect(queryByText("Email address is required.")).toBeInTheDocument();

    // Adding some spaces also counts as no input
    fireEvent.change(emailInput, { target: { value: "     " } });
    fireEvent.click(sendButton);
    expect(queryByText("Email address is required.")).toBeInTheDocument();
  });

  it("validates email address", () => {
    const { getByText, getByLabelText, queryByText } = render(
      <ThemeProvider theme={theme}>
        <ForgotPassword />
      </ThemeProvider>
    );

    // Get form fields
    const emailInput = getByLabelText("Email");
    const sendButton = getByText("reset password");

    // Add a bogus email address
    fireEvent.change(emailInput, { target: { value: "hello" } });
    fireEvent.click(sendButton);
    expect(queryByText("Please enter a valid email address.")).toBeInTheDocument();
  });
});
