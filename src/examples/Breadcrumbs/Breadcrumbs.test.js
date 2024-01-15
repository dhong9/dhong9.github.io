// React testing libraries
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

// Material Kit 2 React themes
import { ThemeProvider } from "@mui/material/styles";
import theme from "assets/theme";

// Component to test
import Breadcrumbs from "examples/Breadcrumbs";

// Mocks
jest.mock("react-router-dom", () => ({
  Link: jest.fn(({ to, children }) => <a href={to}>{children}</a>),
}));

// Write test cases
describe("Breadcrumbs", () => {
  it("renders router elements", () => {
    const routes = [
      { label: "Home", route: "/crumbs", name: "Bread crumbs", collapse: [{ name: "toast" }] },
      { label: "Products", route: "/products", name: "Stuffs", collapse: [{ name: "things" }] },
      { label: "Shoes", name: "Zapatos", collapse: false },
    ];

    const { queryByText} = render(
      <ThemeProvider theme={theme}>
        <Breadcrumbs routes={routes} />
      </ThemeProvider>
    );

    // Verify that labels are present
    expect(queryByText("Home")).toBeInTheDocument();
    expect(queryByText("Products")).toBeInTheDocument();
    expect(queryByText("Shoes")).toBeInTheDocument();
  });
});
