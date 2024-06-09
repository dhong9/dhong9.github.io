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
import { render } from "@testing-library/react";

// Material Kit 2 React themes
import { ThemeProvider } from "@mui/material/styles";
import theme from "assets/theme";

// Component to test
import MKBadge from "components/MKBadge";

describe("MKBadge", () => {
  it("renders small light badges", () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <MKBadge indicator={true} color="light" size="xs"></MKBadge>
      </ThemeProvider>
    );

    expect(container).toMatchSnapshot();
  });

  it("renders medium white badges", () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <MKBadge indicator={true} color="white" size="md"></MKBadge>
      </ThemeProvider>
    );

    expect(container).toMatchSnapshot();
  });

  it("renders large info badges", () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <MKBadge indicator={true} color="info" size="lg"></MKBadge>
      </ThemeProvider>
    );

    expect(container).toMatchSnapshot();
  });

  it("renders medium white contained badges", () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <MKBadge variant="contained" indicator={true} color="white" size="md"></MKBadge>
      </ThemeProvider>
    );

    expect(container).toMatchSnapshot();
  });

  it("renders large info contained badges", () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <MKBadge variant="contained" indicator={true} color="info" size="lg"></MKBadge>
      </ThemeProvider>
    );

    expect(container).toMatchSnapshot();
  });
});
