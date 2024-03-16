// React testing libraries
import { render, fireEvent } from "@testing-library/react";

// Material Kit 2 React themes
import { ThemeProvider } from "@mui/material/styles";
import theme from "assets/theme";

// Authentication
import axios from "axios";
import AuthContext, { AuthProvider } from "context/AuthContext";
import jwtDecode from "jwt-decode";
import { GoogleOAuthProvider } from "@react-oauth/google";

// Axios
import MockAdapter from "axios-mock-adapter";

// Component to test
import MiniScheme from "projects/interpreters/minischeme";

// Google Client ID
const clientId = "416010689831-4lgodfsd3n7h84buas2s2mivevp2kdln.apps.googleusercontent.com";

// Define Mocks
// Setup axios mock
const mock = new MockAdapter(axios);

const commentData = {
  comments: [
    {
      id: 1,
      project: 2,
      name: "John Adams",
      email: "john_adams@aol.com",
      body: "Play connect 4 with me",
      create: "2023-05-26T17:42:43.263337Z",
      updated: "2023-05-26T17:42:43.263383Z",
      active: true,
      parent: null,
    },
  ],
};

jest.mock("services/baseService", () => ({
  getRequest: jest.fn(),
  postRequest: jest.fn(),
}));

mock.onGet("/comments").reply(200, { data: { results: commentData } });
mock.onPost("/comments").reply(201, commentData);

// Define Mocks
jest.mock("jwt-decode");
jest.mock("react-monaco-editor", () => {
  const { forwardRef } = jest.requireActual("react");
  return {
    __esModule: true,
    default: forwardRef(() => <textarea data-testid="editor"></textarea>),
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
jest.mock("examples/Navbars/DefaultNavbar", () => {
  const { forwardRef } = jest.requireActual("react");
  return {
    __esModule: true,
    default: forwardRef(() => <div>Mock Navbar</div>),
  };
});
jest.mock("routes", () => []);

describe("MiniScheme", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.removeItem("authTokens");
    jest.clearAllMocks();
  });

  it("adds a comment", () => {
    localStorage.setItem(
      "authTokens",
      JSON.stringify({ access: mockToken, refresh: refreshToken })
    );

    // Set a mock payload for the decoded token
    const mockPayload = { user: "John Doe", exp: 1893456000 };
    jwtDecode.mockReturnValue(mockPayload);

    // Mock tokens
    const mockToken = "mocked_jwt_value";
    const refreshToken = "mocked_refresh_value";

    const contextData = {
      loginUser: jest.fn(),
    };
    const { container, getByText } = render(
      <GoogleOAuthProvider clientId={clientId}>
        <AuthContext.Provider value={contextData}>
          <AuthProvider>
            <ThemeProvider theme={theme}>
              <MiniScheme />
            </ThemeProvider>
          </AuthProvider>
        </AuthContext.Provider>
      </GoogleOAuthProvider>
    );

    // Enable plain text
    const plainTextbox = getByText("Plain Text");
    fireEvent.click(plainTextbox);

    expect(container).toMatchSnapshot();
  });

  it("visualizes output", () => {
    const contextData = {
      loginUser: jest.fn(),
    };

    const { container, getByRole, getByTestId, getByText } = render(
      <GoogleOAuthProvider clientId={clientId}>
        <AuthContext.Provider value={contextData}>
          <AuthProvider>
            <ThemeProvider theme={theme}>
              <MiniScheme />
            </ThemeProvider>
          </AuthProvider>
        </AuthContext.Provider>
      </GoogleOAuthProvider>
    );

    // Enable visualizing
    const checkbox = getByRole("checkbox");
    fireEvent.click(checkbox);

    // Write some code in the code editor
    const editor = getByTestId("editor");
    const minischemeCode = "(+ 1 1)";
    fireEvent.change(editor, { target: { value: minischemeCode } });

    // Run code
    const submitBtn = getByText("Show value");
    fireEvent.click(submitBtn);

    expect(container).toMatchSnapshot();
  });
});
