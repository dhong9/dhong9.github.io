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
import Minesweeper from "projects/games/minesweeper";

// Define Mocks
// Setup axios mock
const mock = new MockAdapter(axios);

const commentData = {
  comments: [
    {
      id: 1,
      project: 4,
      name: "Joe Biden",
      email: "oldbiden@ineedhelp.com",
      body: "I lost so bad!!!",
      create: "2024-05-26T17:42:43.263337Z",
      updated: "2024-05-26T17:42:43.263383Z",
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
jest.mock("routes", () => []);

describe("Minesweeper", () => {
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
        username: "N737UA",
        email: "united@united.com",
        id: 29,
      },
    };
    const { getByRole, queryAllByText } = render(
      <AuthProvider>
        <AuthContext.Provider value={contextData}>
          <ThemeProvider theme={theme}>
            <Minesweeper />
          </ThemeProvider>
        </AuthContext.Provider>
      </AuthProvider>
    );

    // Toggle plain text
    const checkbox = getByRole("checkbox");
    fireEvent.click(checkbox);

    // Write something in there
    const commentBox = getByRole("textbox");
    fireEvent.change(commentBox, { target: { value: "Oh no!" } });

    // Add the comment
    const addButton = getByRole("button");
    fireEvent.click(addButton);

    expect(queryAllByText("Minesweeper").length).toBe(2);
  });

  it("renders without user", () => {
    const contextData = {
      loginUser: jest.fn(),
      user: {
        username: "N737UA",
        email: "united@united.com",
        id: 29,
      },
    };

    const { queryAllByText } = render(
      <AuthProvider>
        <AuthContext.Provider value={contextData}>
          <ThemeProvider theme={theme}>
            <Minesweeper />
          </ThemeProvider>
        </AuthContext.Provider>
      </AuthProvider>
    );
    expect(queryAllByText("Minesweeper").length).toBe(2);
  });
});
