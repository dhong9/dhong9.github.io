/**
=========================================================
* Danyo-1.2
=========================================================

* Copyright 2024 Danyo (https://www.danyo.tech)

Coded by www.danyo.tech

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// React testing libraries
import renderer from "react-test-renderer";
import { render, fireEvent } from "@testing-library/react";

// Material Kit 2 React themes
import { ThemeProvider } from "@mui/material/styles";
import theme from "assets/theme";

// Component to test
import MKAlert from "components/MKAlert";

// Mocks
jest.mock("@mui/material/Fade", () => {
  const { forwardRef } = jest.requireActual("react");
  const Fade = forwardRef((props, ref) => (
    <div ref={ref}>
      Mock Fade
      {props.children}
    </div>
  ));
  return {
    __esModule: true,
    default: Fade,
  };
});

describe("MKAlert", () => {
  it("renders", () => {
    const component = renderer.create(
      <ThemeProvider theme={theme}>
        <MKAlert>Hello!</MKAlert>
      </ThemeProvider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("can be dismissed", () => {
    const { container, getByText } = render(
      <ThemeProvider theme={theme}>
        <MKAlert dismissible={true}>Dismissible</MKAlert>
      </ThemeProvider>
    );
    const dismissButton = getByText("\u00D7");
    fireEvent.click(dismissButton);
    expect(container).toMatchSnapshot();
  });
});
