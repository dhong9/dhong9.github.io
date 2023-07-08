// React testing libraries
import renderer from "react-test-renderer";

// Material Kit 2 React themes
import { ThemeProvider } from "@mui/material/styles";
import theme from "assets/theme";

// Component to test
import DefaultNavbar from "examples/Navbars/DefaultNavbar";

// Icons
import GitHubIcon from "@mui/icons-material/GitHub";

// Mocks
jest.mock("react-router-dom", () => ({
  Link: jest.fn(({ to, children }) => <a href={to}>{children}</a>),
}));

describe("DefaultNavbar", () => {
  it("renders with route", () => {
    const component = renderer.create(
      <ThemeProvider theme={theme}>
        <DefaultNavbar
          routes={[{ label: "Navbar", route: "/default", icon: <GitHubIcon />, name: "Github" }]}
        />
      </ThemeProvider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders without route", () => {
    const component = renderer.create(
      <ThemeProvider theme={theme}>
        <DefaultNavbar routes={[{ label: "Regular", icon: <GitHubIcon />, name: "Github" }]} />
      </ThemeProvider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
