// React testing libraries
import renderer from "react-test-renderer";

// JWT
import jwtDecode from "jwt-decode";

// Service functions
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
const mock = new MockAdapter(axios);

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

// Helper function to set mock tokens in localStorage
const setMockTokensInLocalStorage = () => {
  localStorage.setItem("authTokens", JSON.stringify({ access: mockToken, refresh: refreshToken }));
};

describe("AuthContext", () => {
  let mockPostRequest;
  beforeEach(() => {
    localStorage.clear();
    mockPostRequest = jest.fn();
    jest.spyOn(axios, "create").mockReturnValue({ post: mockPostRequest });
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

  it("updates token - valid refresh token", () => {
    // Set the mock token in the localStorage before rendering the component
    setMockTokensInLocalStorage();
    
    const mockPayload = { user: "John Doe", exp: 1893456000 };
    jwtDecode.mockReturnValueOnce(mockPayload);

    mockPostRequest.mockResolvedValueOnce({ status: 200, data: { access: "new_access", refresh: "new_refresh" } });

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
