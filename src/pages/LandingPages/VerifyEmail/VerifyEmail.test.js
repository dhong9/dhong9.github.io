// React testing libraries
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

// Material Kit 2 React themes
import { ThemeProvider } from "@mui/material/styles";
import theme from "assets/theme";

// Authentication
import AuthContext, { AuthProvider } from "context/AuthContext";
import jwtDecode from "jwt-decode";
import { GoogleOAuthProvider } from "@react-oauth/google";

// Component to test
import VerifyEmail from "pages/LandingPages/VerifyEmail";

// Google Client ID
const clientId = "416010689831-4lgodfsd3n7h84buas2s2mivevp2kdln.apps.googleusercontent.com";

// Mocks
jest.mock("jwt-decode");
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn,
}));
jest.mock("services/googleService", () => ({
  getGoogleUser: jest.fn(),
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
      <GoogleOAuthProvider clientId={clientId}>
        <AuthContext.Provider value={contextData}>
          <AuthProvider>
            <ThemeProvider theme={theme}>
              <VerifyEmail />
            </ThemeProvider>
          </AuthProvider>
        </AuthContext.Provider>
      </GoogleOAuthProvider>
    );

    expect(queryByText("Verify Email")).toBeInTheDocument();
    expect(queryByText("Return to Home Page")).toBeInTheDocument();
    expect(queryByText("Resend Confirmation")).toBeInTheDocument();
  });
});
