// React testing libraries
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

// Material Kit 2 React themes
import { ThemeProvider } from "@mui/material/styles";
import theme from "assets/theme";

// Component to test
import DHEditor from "components/DHEditor";

// Mocks
jest.mock("draft-convert", () => {
  return {
    convertFromHTML: jest.fn(),
    convertToRaw: jest.fn(),
    convertToHTML: jest.fn().mockReturnValue("<p>Test content</p>"), // Mock the return value of convertToHTML
  };
});

describe("DHEditor", () => {
  it("renders", () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <DHEditor />
      </ThemeProvider>
    );

    expect(container).toMatchSnapshot();
  });
});
