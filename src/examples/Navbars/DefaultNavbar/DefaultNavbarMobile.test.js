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
              description: "All things version control",
            },
            {
              label: "Doughnut",
              route: "/rider",
              icon: <DonutSmallIcon />,
              name: "doughnut",
              description: "Deep fry me",
              collapse: [
                { name: "boston", description: "It's in Mass." },
                {
                  name: "brooklyn",
                  description: "It's in NY",
                  collapse: [{ name: "new york", description: "It's in NY" }],
                },
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
            {
              label: "Navbar",
              route: "/default",
              icon: <GitHubIcon />,
              name: "Github",
              description: "All things version control",
            },
            {
              label: "Doughnut",
              route: "/rider",
              icon: <DonutSmallIcon />,
              name: "doughnut",
              description: "Eat me",
              collapse: [
                { name: "boston", description: "Home to the Red Sox" },
                {
                  name: "brooklyn",
                  description: "Near the Hudson",
                  collapse: [{ name: "new york", description: "Has a picturesque skyline" }],
                },
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
