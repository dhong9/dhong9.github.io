// Unit test libraries
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

// Material Kit 2 React themes
import { ThemeProvider } from "@mui/material/styles";
import theme from "assets/theme";

// Component to test
import View from "layouts/sections/components/View";

describe("View", () => {
  it("renders", () => {
    const { queryByText, getByText } = render(
      <ThemeProvider theme={theme}>
        <View title="Apples" code="Hello" height="100%">
          Bananas
        </View>
      </ThemeProvider>
    );
    expect(queryByText("Preview")).toBeInTheDocument();
    expect(queryByText("Apples")).toBeInTheDocument();
    expect(queryByText("Bananas")).toBeInTheDocument();
    expect(queryByText("Code")).toBeInTheDocument();
    
    const codeTab = getByText("Copy");
    fireEvent.click(codeTab);

    expect(queryByText("Hello")).toBeInTheDocument();
  });

  it("sets success", () => {
    const jsdomPrompt = window.prompt;
    window.prompt = () => {};
    const { container, getByText } = render(
      <ThemeProvider theme={theme}>
        <View title="Test View" code="" height="100%">
          Test View
        </View>
      </ThemeProvider>
    );
    const copyButton = getByText("Copy");
    fireEvent.click(copyButton);
    expect(container).toMatchSnapshot();
    window.prompt = jsdomPrompt;
  });
});
