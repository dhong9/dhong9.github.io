// React testing libraries
import renderer from "react-test-renderer";

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
  it("renders", () => {
    const routes = [
      { label: "Home", route: "/", name: "Breadcrumbs", collapse: [{ name: "toast" }] },
      { label: "Products", route: "/products", name: "Stuffs", collapse: [{ name: "things" }] },
      { label: "Shoes", name: "Zapatos", collapse: false },
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
