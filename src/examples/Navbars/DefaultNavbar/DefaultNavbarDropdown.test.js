// React testing libraries
import renderer from "react-test-renderer";

// Material Kit 2 React themes
import { ThemeProvider } from "@mui/material/styles";
import theme from "assets/theme";

// Component to test
import DefaultNavbarDropdown from "examples/Navbars/DefaultNavbar/DefaultNavbarDropdown";

// Icons
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";

// Mocks
jest.mock("react-router-dom", () => ({
  Link: jest.fn(({ to, children }) => <a href={to}>{children}</a>),
}));

describe("DefaultNavbarDropdown", () => {
  it("renders with route", () => {
    const component = renderer.create(
      <ThemeProvider theme={theme}>
        <DefaultNavbarDropdown
          routes={[{ label: "Navbar", route: "/default", icon: <GitHubIcon />, name: "Github" }]}
          collapse={false}
          icon={<FacebookIcon />}
          name="Routed Navbar"
        >
          <div>I have routes</div>
        </DefaultNavbarDropdown>
      </ThemeProvider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders without route", () => {
    const component = renderer.create(
      <ThemeProvider theme={theme}>
        <DefaultNavbarDropdown
          routes={[{ label: "Regular", icon: <GitHubIcon />, name: "Github" }]}
          collapse={false}
          icon={<FacebookIcon />}
          name="Not Routed Navbar"
        >
          <div>I have no routes</div>
        </DefaultNavbarDropdown>
      </ThemeProvider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
