// React testing libraries
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

// Material Kit 2 React themes
import { ThemeProvider } from "@mui/material/styles";
import theme from "assets/theme";

// Authentication
import AuthContext, { AuthProvider } from "context/AuthContext";
import jwtDecode from "jwt-decode";

// Component to test
import VerifyEmail from "pages/LandingPages/VerifyEmail";

// Mocks
jest.mock("jwt-decode");
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn,
}));

describe("VerifyEmail", () => {
  it("renders", () => {
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
        username: "giri",
        email: "horses@giri.com",
      },
    };
    const { queryByText } = render(
      <AuthContext.Provider value={contextData}>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <VerifyEmail />
          </ThemeProvider>
        </AuthProvider>
      </AuthContext.Provider>
    );

    expect(queryByText("Verify Email")).toBeInTheDocument();
    expect(queryByText("Return to Home Page")).toBeInTheDocument();
    expect(queryByText("Resend Confirmation")).toBeInTheDocument();
  });
});
