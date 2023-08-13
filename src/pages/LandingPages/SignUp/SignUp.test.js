// React testing libraries
import { render, fireEvent } from "@testing-library/react";

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
    const { container } = render(
      <AuthContext.Provider value={contextData}>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <SignUp />
          </ThemeProvider>
        </AuthProvider>
      </AuthContext.Provider>
    );

    expect(container).toMatchSnapshot();
  });
});
