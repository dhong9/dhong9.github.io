// React testing libraries
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

// Material Kit 2 React themes
import { ThemeProvider } from "@mui/material/styles";
import theme from "assets/theme";

// Component to test
import DefaultNavbar from "examples/Navbars/DefaultNavbar";

// Icons
import GitHubIcon from "@mui/icons-material/GitHub";
import DonutSmallIcon from "@mui/icons-material/DonutSmall";

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
            },
            {
              label: "Doughnut",
              icon: <DonutSmallIcon />,
              name: "doughnut",
              collapse: [
                { name: "boston" },
                { name: "brooklyn", collapse: [{ name: "new york" }] },
              ],
            },
          ]}
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
            },
            {
              label: "Doughnut",
              icon: <DonutSmallIcon />,
              name: "doughnut",
              collapse: [
                { name: "boston" },
                { name: "brooklyn", collapse: [{ name: "new york" }] },
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
              collapse: [
                { name: "chicago" },
                { name: "san francisco", collapse: [{ name: "california" }] },
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
              collapse: [
                { name: "chicago" },
                { name: "san francisco", collapse: [{ name: "california" }] },
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
            },
            {
              label: "Doughnut",
              icon: <DonutSmallIcon />,
              name: "doughnut",
              collapse: [
                { name: "boston" },
                { name: "brooklyn", collapse: [{ name: "new york" }] },
              ],
            },
          ]}
        />
      </ThemeProvider>
    );
    expect(container).toMatchSnapshot();
  });
});
