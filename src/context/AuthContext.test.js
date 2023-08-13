// React testing libraries
import renderer from "react-test-renderer";

// JWT
import jwtDecode from "jwt-decode";

// Component to test
import AuthContext, { AuthProvider } from "context/AuthContext";

// Mocks
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn,
}));

jest.mock("services/baseService", () => ({
  getRequest: jest.fn(),
  postRequest: jest.fn(),
}));

jest.mock("jwt-decode");

// Mock JWT components
const mockToken = "mocked_jwt_value";
const refreshToken = "mocked_refresh_value";

describe("AuthContext", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.removeItem("authTokens");
    jest.clearAllMocks();
  });

  it("renders", () => {
    const contextData = {
      loginUser: jest.fn(),
    };

    const component = renderer.create(
      <AuthContext.Provider value={contextData}>
        <AuthProvider>Hello world!</AuthProvider>
      </AuthContext.Provider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("updates token", () => {
    localStorage.setItem(
      "authTokens",
      JSON.stringify({ access: mockToken, refresh: refreshToken })
    );

    // Set a mock payload for the decoded token
    const mockPayload = { user: "John Doe", exp: 1893456000 };
    jwtDecode.mockReturnValue(mockPayload);

    const contextData = {
      loginUser: jest.fn(),
    };

    const component = renderer.create(
      <AuthContext.Provider value={contextData}>
        <AuthProvider>Hello world!</AuthProvider>
      </AuthContext.Provider>
    );

    jest.useFakeTimers();
    setTimeout(() => {
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    }, 4 * 1000 * 60);
    jest.runAllTimers();
  });
});
