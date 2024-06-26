// React testing libraries
import React from "react";
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
    convertToRaw: jest.fn().mockReturnValue("Test Raw content"),
    convertToHTML: jest.fn().mockReturnValue("<p>Test HTML content</p>"), // Mock the return value of convertToHTML
  };
});

describe("DHEditor", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders non plain text", () => {
    const ref = React.createRef();

    // By default, isPlainText is false
    render(
      <ThemeProvider theme={theme}>
        <DHEditor ref={ref} />
      </ThemeProvider>
    );

    // Get current text
    let val = ref.current.getRootComment();
    expect(val).toEqual("<p>Test HTML content</p>");
  });
});
