// Import the necessary dependencies and methods for testing
import renderer from "react-test-renderer";
import Breadcrumbs from "examples/Breadcrumbs";

// Material Kit 2 React themes
import { ThemeProvider } from "@mui/material/styles";
import theme from "assets/theme";

// Mock the necessary dependencies if required
jest.mock("react-router-dom", () => ({
  Link: jest.fn(({ to, children }) => <a href={to}>{children}</a>),
}));

// Write test cases
describe("Breadcrumbs", () => {
  it("renders breadcrumbs with route", () => {
    const routes = [
      { label: "Home", route: "/", name: "Breadcrumbs", collapse: [{ name: "toast" }] },
      { label: "Products", route: "/products", name: "Stuffs", collapse: [{ name: "things" }] },
      { label: "Shoes", route: "/products/shoes", name: "Zapatos", collapse: [{ name: "toes" }] },
    ];

    const component = renderer.create(
      <ThemeProvider theme={theme}>
        <Breadcrumbs routes={routes} />
      </ThemeProvider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
