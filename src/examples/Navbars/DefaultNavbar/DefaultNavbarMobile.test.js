// React testing libraries
import renderer from "react-test-renderer";

// Material Kit 2 React themes
import { ThemeProvider } from "@mui/material/styles";
import theme from "assets/theme";

// Component to test
import DefaultNavbarMobile from "examples/Navbars/DefaultNavbar/DefaultNavbarMobile";

// Icons
import GitHubIcon from "@mui/icons-material/GitHub";
import DonutSmallIcon from "@mui/icons-material/DonutSmall";

// Mocks
jest.mock("react-router-dom", () => ({
  Link: jest.fn(({ to, children }) => <a href={to}>{children}</a>),
}));

describe("DefaultNavbarMobile", () => {
  it("renders with route", () => {
    const component = renderer.create(
      <ThemeProvider theme={theme}>
        <DefaultNavbarMobile
          routes={[
            {
              label: "Navbar",
              route: "/default",
              icon: <GitHubIcon />,
              name: "Github",
            },
            {
              label: "Doughnut",
              route: "/rider",
              icon: <DonutSmallIcon />,
              name: "doughnut",
              collapse: [
                { name: "boston" },
                { name: "brooklyn", collapse: [{ name: "new york" }] },
              ],
            },
          ]}
          open={true}
        />
      </ThemeProvider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders without route", () => {
    const component = renderer.create(
      <ThemeProvider theme={theme}>
        <DefaultNavbarMobile
          routes={[
            { label: "Regular", icon: <GitHubIcon />, name: "Github" },
            {
              label: "Doughnut",
              route: "/rider",
              icon: <DonutSmallIcon />,
              name: "doughnut",
              collapse: [
                { name: "boston" },
                { name: "brooklyn", collapse: [{ name: "new york" }] },
              ],
            },
          ]}
          open={true}
        />
      </ThemeProvider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
