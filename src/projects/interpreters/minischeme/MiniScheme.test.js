// React testing libraries
import { render, fireEvent } from "@testing-library/react";

// Material Kit 2 React themes
import { ThemeProvider } from "@mui/material/styles";
import theme from "assets/theme";

// Authentication
import axios from "axios";
import AuthContext, { AuthProvider } from "context/AuthContext";

// Axios
import MockAdapter from "axios-mock-adapter";

// Component to test
import MiniScheme from "projects/interpreters/minischeme";

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

jest.mock("services/googleService", () => ({
  getGoogleUser: jest.fn(),
}));

// Mock API data
mock.onGet("accounts/users/me/").reply(200, {});
mock.onGet("/comments").reply(200, { data: { results: commentData } });
mock.onPost("/comments").reply(201, commentData);

// Define Mocks
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
    // Mock tokens
    const mockToken = "mocked_jwt_value";
    localStorage.setItem("authTokens", mockToken);

    const contextData = {
      loginUser: jest.fn(),
      user: {
        username: "mini",
        email: "scheme@mini.com",
        id: 8,
      },
    };
    const { container, getByText } = render(
      <AuthProvider>
        <AuthContext.Provider value={contextData}>
          <ThemeProvider theme={theme}>
            <MiniScheme />
          </ThemeProvider>
        </AuthContext.Provider>
      </AuthProvider>
    );

    // Enable plain text
    const plainTextbox = getByText("Plain Text");
    fireEvent.click(plainTextbox);

    expect(container).toMatchSnapshot();
  });

  it("visualizes output", () => {
    const contextData = {
      loginUser: jest.fn(),
      user: {
        username: "mini",
        email: "scheme@mini.com",
        id: 8,
      },
    };

    const { container, getByRole, getByTestId, getByText } = render(
      <AuthContext.Provider value={contextData}>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <MiniScheme />
          </ThemeProvider>
        </AuthProvider>
      </AuthContext.Provider>
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
