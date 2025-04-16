// React testing libraries
import { render, fireEvent } from "@testing-library/react";

// Material Kit 2 React themes
import { ThemeProvider } from "@mui/material/styles";
import theme from "assets/theme";

// Authentication
import axios from "axios";
import AuthContext, { AuthProvider } from "context/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

// Axios
import MockAdapter from "axios-mock-adapter";

// Component to test
import Tile from "projects/games/pictureShuffle/utils/Tile";
import PictureShuffle from "projects/games/pictureShuffle";

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

describe("Tile", () => {
  it("initializes tile", () => {
    const tile = new Tile(1, 50, 76, 39, null);
    expect(tile.id).toBe(1);
    expect(tile.x).toBe(50);
    expect(tile.y).toBe(76);
    expect(tile.w).toBe(39);
  });
});

describe("PictureShuffle", () => {
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
        username: "pictureMe",
        email: "pictureMe@yahoo.com",
        id: 8,
      },
    };
    const { getByRole, getByText, queryAllByText } = render(
      <GoogleOAuthProvider clientId={clientId}>
        <AuthProvider>
          <AuthContext.Provider value={contextData}>
            <ThemeProvider theme={theme}>
              <PictureShuffle />
            </ThemeProvider>
          </AuthContext.Provider>
        </AuthProvider>
      </GoogleOAuthProvider>
    );

    // Toggle plain text
    const checkbox = getByRole("checkbox");
    fireEvent.click(checkbox);

    // Write something in there
    const commentBox = getByRole("textbox");
    fireEvent.change(commentBox, { target: { value: "Hello, world!" } });

    // Add the comment
    const addButton = getByText("Add");
    fireEvent.click(addButton);

    expect(queryAllByText("Picture Shuffle").length).toBe(2);
  });

  it("renders without user", () => {
    const contextData = {
      loginUser: jest.fn(),
      user: {
        username: "pictureMe",
        email: "pictureMe@yahoo.com",
        id: 8,
      },
    };

    const { queryAllByText } = render(
      <GoogleOAuthProvider clientId={clientId}>
        <AuthProvider>
          <AuthContext.Provider value={contextData}>
            <ThemeProvider theme={theme}>
              <PictureShuffle />
            </ThemeProvider>
          </AuthContext.Provider>
        </AuthProvider>
      </GoogleOAuthProvider>
    );
    expect(queryAllByText("Picture Shuffle").length).toBe(2);
  });
});
