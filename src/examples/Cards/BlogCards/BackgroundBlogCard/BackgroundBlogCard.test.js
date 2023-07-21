// React testing libraries
import React from "react";
import renderer from "react-test-renderer";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import theme from "assets/theme";

// Component to test
import BackgroundBlogCard from "examples/Cards/BlogCards/BackgroundBlogCard";

let realUseContext;
let useContextMock;
// Setup mock
beforeEach(() => {
    realUseContext = React.useContext;
    useContextMock = jest.fn(() => "Test Value");
});
// Cleanup mock
afterEach(() => {
    React.useContext = realUseContext;
});

// Mocks
jest.mock("react-router-dom", () => ({
  Link: jest.fn(({ to, children }) => <a href={to}>{children}</a>),
}));

describe("BackgroundBlogCard", () => {
  it("renders", () => {
    const component = renderer.create(
      <ThemeProvider theme={theme}>
        <BackgroundBlogCard
          title="Boeing 747"
          description="Queen of the skies"
          image="https://jooinn.com/images1280_/boeing-747.jpg"
          action={{ type: "internal", route: "/", label: "Read more..." }}
        />
      </ThemeProvider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
