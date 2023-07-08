// React testing libraries
import renderer from "react-test-renderer";
import { render, fireEvent } from "@testing-library/react";

// Component to test
import MKButtonRoot from "components/MKButton/MKButtonRoot";

// Material Kit 2 React themes
import { ThemeProvider } from "@mui/material/styles";
import theme from "assets/theme";

describe("MKButtonRoot", () => {
  it("renders default contained button", () => {
    const ownerState = {
      color: "default",
      variant: "contained",
    };

    const component = renderer.create(
      <ThemeProvider theme={theme}>
        <MKButtonRoot onClick={jest.fn()} ownerState={ownerState}>
          Hello!
        </MKButtonRoot>
      </ThemeProvider>
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders white outlined button", () => {
    const ownerState = {
      color: "white",
      variant: "outlined",
    };

    const component = renderer.create(
      <ThemeProvider theme={theme}>
        <MKButtonRoot onClick={jest.fn()} ownerState={ownerState}>
          Hello!
        </MKButtonRoot>
      </ThemeProvider>
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("simulates hover over the button", () => {
    const ownerState = {
      color: "#FF00FF",
    };

    const { container, getByText } = render(
      <ThemeProvider theme={theme}>
        <MKButtonRoot onClick={jest.fn()} ownerState={ownerState}>
          Hello!
        </MKButtonRoot>
      </ThemeProvider>
    );

    const button = getByText("Hello!");
    fireEvent.mouseEnter(button); // Simulate mouse hover over the button

    expect(container.firstChild).toMatchSnapshot();
  });

  it("simulates hover over the default button", () => {
    const ownerState = {
      color: "default",
    };

    const { container, getByText } = render(
      <ThemeProvider theme={theme}>
        <MKButtonRoot onClick={jest.fn()} ownerState={ownerState}>
          Hello!
        </MKButtonRoot>
      </ThemeProvider>
    );

    const button = getByText("Hello!");
    fireEvent.mouseEnter(button); // Simulate mouse hover over the button

    expect(container.firstChild).toMatchSnapshot();
  });
});
