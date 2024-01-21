// React testing libraries
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

// Material Kit 2 React themes
import { ThemeProvider } from "@mui/material/styles";
import theme from "assets/theme";

// Component to test
import DefaultNavbar from "examples/Navbars/DefaultNavbar";

// Icons
import DonutSmallIcon from "@mui/icons-material/DonutSmall";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";

// Mocks
jest.mock("react-router-dom", () => ({
  Link: jest.fn(({ to, children }) => <a href={to}>{children}</a>),
}));

describe("DefaultNavbar", () => {
  it("renders with route", () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <DefaultNavbar
          routes={[
            {
              label: "Navbar",
              route: "/default",
              icon: <GitHubIcon />,
              name: "Github",
              description: "Power version control software",
            },
            {
              label: "Doughnut",
              icon: <DonutSmallIcon />,
              name: "doughnut",
              description: "deep fried",
              collapse: [
                { name: "boston", description: "a major city" },
                {
                  name: "brooklyn",
                  description: "a major city",
                  collapse: [{ name: "new york", description: "East Coast" }],
                },
              ],
            },
            {
              label: "Facebook",
              route: "/facebook",
              icon: <FacebookIcon />,
              name: "Facebook",
              description: "A book for faces",
            },
            {
              label: "Twitter",
              route: "/twitter",
              icon: <TwitterIcon />,
              name: "Twitter",
              description: "Send your tweets",
            },
          ]}
          rowsPerColumn={2}
        />
      </ThemeProvider>
    );

    expect(container).toMatchSnapshot();
  });

  it("renders without route", () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <DefaultNavbar
          routes={[
            {
              label: "Navbar",
              route: "/default",
              icon: <GitHubIcon />,
              name: "Github",
              description: "Powerful version control software",
            },
            {
              label: "Doughnut",
              icon: <DonutSmallIcon />,
              name: "doughnut",
              description: "also spelled donut",
              collapse: [
                { name: "boston", description: "get their cream pie" },
                {
                  name: "brooklyn",
                  description: "a major city",
                  collapse: [{ name: "new york", description: "east coast" }],
                },
              ],
            },
          ]}
        />
      </ThemeProvider>
    );

    expect(container).toMatchSnapshot();
  });

  it("expands with columns", () => {
    const { container, getByText } = render(
      <ThemeProvider theme={theme}>
        <DefaultNavbar
          routes={[
            {
              label: "Traveling",
              icon: <DonutSmallIcon />,
              name: "traveling",
              descripton: "adds a new perspective",
              collapse: [
                { name: "chicago", description: "major city in Illinois" },
                {
                  name: "san francisco",
                  description: "major city in California",
                  collapse: [{ name: "california", description: "the golden state" }],
                },
              ],
              columns: 2,
            },
          ]}
        />
      </ThemeProvider>
    );

    const doughnutIcon = getByText("traveling");
    fireEvent.mouseEnter(doughnutIcon);
    expect(container).toMatchSnapshot();

    fireEvent.mouseLeave(doughnutIcon);
    expect(container).toMatchSnapshot();
  });

  it("expands without columns", () => {
    const { container, getByText } = render(
      <ThemeProvider theme={theme}>
        <DefaultNavbar
          routes={[
            {
              label: "Flight",
              icon: <DonutSmallIcon />,
              name: "flight",
              description: "go high!",
              collapse: [
                { name: "chicago", description: "major city in Illinois" },
                {
                  name: "san francisco",
                  description: "next to the Pacific coast",
                  collapse: [{ name: "california", description: "a west coast state" }],
                },
              ],
            },
          ]}
        />
      </ThemeProvider>
    );

    const doughnutIcon = getByText("flight");
    fireEvent.mouseEnter(doughnutIcon);
    expect(container).toMatchSnapshot();

    fireEvent.mouseLeave(doughnutIcon);
    expect(container).toMatchSnapshot();
  });

  it("should resize", () => {
    window.innerWidth = 500;
    fireEvent(window, new Event("resize"));

    const { container } = render(
      <ThemeProvider theme={theme}>
        <DefaultNavbar
          routes={[
            {
              label: "Navbar",
              route: "/default",
              icon: <GitHubIcon />,
              name: "Github",
              description: "not to be mistaken with Gitlab",
            },
            {
              label: "Doughnut",
              icon: <DonutSmallIcon />,
              name: "doughnut",
              description: "no, it's not a nut",
              collapse: [
                { name: "boston", description: "in the east coast" },
                {
                  name: "brooklyn",
                  description: "has a bridge",
                  collapse: [{ name: "new york", description: "east coast" }],
                },
              ],
            },
          ]}
        />
      </ThemeProvider>
    );
    expect(container).toMatchSnapshot();
  });
});
