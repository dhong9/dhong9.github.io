// React testing libraries
import { render, fireEvent } from "@testing-library/react";

// Material Kit 2 React themes
import { ThemeProvider } from "@mui/material/styles";
import theme from "assets/theme";

// Authentication
import axios from "axios";
import AuthContext, { AuthProvider } from "context/AuthContext";
import jwtDecode from "jwt-decode";

// Axios
import MockAdapter from "axios-mock-adapter";

// Component to test
import Connect4 from "projects/games/connect4";

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
jest.mock("react-p5", () => {
  const { forwardRef } = jest.requireActual("react");
  return {
    __esModule: true,
    default: forwardRef(() => <div>Sketch</div>),
  };
});
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
jest.mock("examples/Navbars/DefaultNavbar", () => {
  const { forwardRef } = jest.requireActual("react");
  return {
    __esModule: true,
    default: forwardRef(() => <div>Mock Navbar</div>),
  };
});

describe("Connect4", () => {
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
    };
    const { container, getByRole } = render(
      <AuthContext.Provider value={contextData}>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <Connect4 />
          </ThemeProvider>
        </AuthProvider>
      </AuthContext.Provider>
    );

    // Toggle plain text
    const checkbox = getByRole("checkbox");
    fireEvent.click(checkbox);

    // Write something in there
    const commentBox = getByRole("textbox");
    fireEvent.change(commentBox, { target: { value: "Hello, world!" } });

    // Add the comment
    const addButton = getByRole("button");
    fireEvent.click(addButton);

    expect(container).toMatchSnapshot();
  });
});
