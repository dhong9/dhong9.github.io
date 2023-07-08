// React testing libraries
import renderer from "react-test-renderer";

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

  it("renders primary contained button", () => {
    const ownerState = {
      color: "primary",
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

  it("renders white contained button", () => {
    const ownerState = {
      color: "white",
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
      iconOnly: true,
      size: "small",
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

  it("renders dummy outlined button", () => {
    const ownerState = {
      color: "dummy",
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

  it("renders primary gradient button", () => {
    const ownerState = {
      color: "primary",
      variant: "gradient",
      iconOnly: true,
      size: "large",
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

  it("renders white gradient button", () => {
    const ownerState = {
      color: "white",
      variant: "gradient",
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

  it("renders light gradient button", () => {
    const ownerState = {
      color: "light",
      variant: "gradient",
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

  it("renders dummy gradient button", () => {
    const ownerState = {
      color: "dummy",
      variant: "gradient",
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
});
