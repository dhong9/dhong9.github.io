// React testing libraries
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

// Component to test
import SignOut from "pages/LandingPages/SignOut";

// Authentication
import AuthContext, { AuthProvider } from "context/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

// Google Client ID
const clientId = "416010689831-4lgodfsd3n7h84buas2s2mivevp2kdln.apps.googleusercontent.com";

// Mocks
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn,
}));
jest.mock("services/googleService", () => ({
  getGoogleUser: jest.fn(),
}));

describe("SignOut", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.removeItem("authTokens");
    jest.clearAllMocks();
  });
  it("renders", () => {
    const contextData = {
      logoutUser: jest.fn(),
    };

    const { queryByText } = render(
      <GoogleOAuthProvider clientId={clientId}>
        <AuthContext.Provider value={contextData}>
          <AuthProvider>
            <SignOut />
          </AuthProvider>
        </AuthContext.Provider>
      </GoogleOAuthProvider>
    );
    expect(queryByText("Logging out...")).toBeInTheDocument();
  });
});
