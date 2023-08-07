// React testing libraries
import renderer from "react-test-renderer";

// JWT
import jwtDecode from 'jwt-decode';

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

jest.mock('jwt-decode');

mock.onGet("/accounts/token/").reply(200, {});
mock.onPost("/accounts/token/").reply(200, {});

describe("AuthContext", () => {
  beforeEach(() => {
    window.localStorage.clear();
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
    // Set your mock JWT value here
    const mockToken = 'mocked_jwt_value';

    // Set the mock token in the localStorage before rendering the component
    localStorage.setItem('authTokens', JSON.stringify({ authTokens: mockToken }));

    // Set a mock payload for the decoded token
    const mockPayload = { user: 'John Doe', exp: 1893456000 };
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
