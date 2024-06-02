// React testing libraries
import { render, fireEvent } from "@testing-library/react";
import React from "react";

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
import Connect4 from "projects/games/connect4";

// Google Client ID
const clientId = "416010689831-4lgodfsd3n7h84buas2s2mivevp2kdln.apps.googleusercontent.com";

// Setup axios mock
const mock = new MockAdapter(axios);
const mockReact = React;

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
mock
  .onGet("accounts/users/me/")
  .reply(200, { username: "johnAdams02", email: "johnAdams@usa.net", id: 0 });
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

    localStorage.setItem("authTokens", mockToken);

    const contextData = {
      loginUser: jest.fn(),
      user: {
        username: "mathWizard",
        email: "bestWizard@mathematics.edu",
        id: 1,
      },
    };
    const { container, getByRole } = render(
      <GoogleOAuthProvider clientId={clientId}>
        <AuthProvider>
          <AuthContext.Provider value={contextData}>
            <ThemeProvider theme={theme}>
              <Connect4 />
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
    const addButton = getByRole("button");
    fireEvent.click(addButton);

    expect(container).toMatchSnapshot();
  });
});
