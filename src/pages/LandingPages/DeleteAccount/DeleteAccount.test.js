// Unit test libraries
import React from "react";
import renderer from "react-test-renderer";

// Material Kit 2 React themes
import { ThemeProvider } from "@mui/material/styles";
import theme from "assets/theme";

// Component to test
import DeleteAccount from "pages/LandingPages/DeleteAccount";

// Authentication
import AuthContext, { AuthProvider } from "context/AuthContext";

// Mocks
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn,
}));

describe("DeleteAccount", () => {
  it("renders", () => {
    const contextData = {
      loginUser: jest.fn(),
      user: {
        username: "giri",
      },
    };
    const component = renderer.create(
      <AuthContext.Provider value={contextData}>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <DeleteAccount />
          </ThemeProvider>
        </AuthProvider>
      </AuthContext.Provider>
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
