// React testing libraries
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

// Material Kit 2 React themes
import { ThemeProvider } from "@mui/material/styles";
import theme from "assets/theme";

// Authentication
import axios from "axios";
import AuthContext, { AuthProvider } from "context/AuthContext";

// Axios
import MockAdapter from "axios-mock-adapter";

// Component to test
import SignIn from "pages/LandingPages/SignIn";

jest.mock("services/baseService", () => ({
  getRequest: jest.fn(),
  postRequest: jest.fn(),
}));

// Setup axios mock
const mock = new MockAdapter(axios);

mock.onPost("accounts/token/").reply(200, {});

// Define Mocks
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

describe("SignIn", () => {
  it("renders", () => {
    const contextData = {
      loginUser: jest.fn(),
    };
    const { container } = render(
      <AuthContext.Provider value={contextData}>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <SignIn />
          </ThemeProvider>
        </AuthProvider>
      </AuthContext.Provider>
    );
    
    expect(container).toMatchSnapshot();
  });
});
