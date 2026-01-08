// React testing libraries
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

// Component to test
import SignOut from "pages/LandingPages/SignOut";

// Authentication
import AuthContext, { AuthProvider } from "context/AuthContext";

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
      user: {
        username: "cali",
        email: "cali@google.com",
        id: 30,
      },
    };

    const { queryByText } = render(
      <AuthContext.Provider value={contextData}>
        <AuthProvider>
          <SignOut />
        </AuthProvider>
      </AuthContext.Provider>
    );
    expect(queryByText("Logging out...")).toBeInTheDocument();
  });
});
