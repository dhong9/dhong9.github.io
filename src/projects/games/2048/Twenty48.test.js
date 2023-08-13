// React testing libraries
import React from "react";
import renderer from "react-test-renderer";

// Material Kit 2 React themes
import { ThemeProvider } from "@mui/material/styles";
import theme from "assets/theme";

// Authentication
import axios from "axios";
import AuthContext, { AuthProvider } from "context/AuthContext";

// Axios
import MockAdapter from "axios-mock-adapter";

// Component to test
import Twenty48 from "projects/games/2048";

// Setup axios mock
const mock = new MockAdapter(axios);

const commentData = {
  comments: [
    { id: 1, text: "Comment 1" },
    { id: 2, text: "Comment 2" },
  ],
};

jest.mock("services/baseService", () => ({
  getRequest: jest.fn(),
  postRequest: jest.fn(),
}));

mock.onGet("/comments").reply(200, commentData);
mock.onPost("/comments").reply(200, commentData);


// Define Mocks
jest.mock("@mui/material/Container", () => {
  const { forwardRef } = jest.requireActual("react");
  return {
      __esModule: true,
      default: forwardRef(() => <div>MUI Container</div>)
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
    convertToRaw: jest.fn(),
  };
});
jest.mock("react-router-dom", () => ({
  Link: jest.fn(({ to, children }) => <a href={to}>{children}</a>),
  useNavigate: jest.fn,
}));

describe("2048", () => {
  it("renders with user", () => {
    const user = {
      username: "tester",
      email: "tester@ctc.org",
    };
    const contextData = {
      loginUser: jest.fn(),
      user,
    };
    const component = renderer.create(
      <AuthContext.Provider value={contextData}>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <Twenty48 />
          </ThemeProvider>
        </AuthProvider>
      </AuthContext.Provider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders without user", () => {
    const contextData = {
      loginUser: jest.fn(),
    };

    const component = renderer.create(
      <AuthContext.Provider value={contextData}>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <Twenty48 />
          </ThemeProvider>
        </AuthProvider>
      </AuthContext.Provider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
