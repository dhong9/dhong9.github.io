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
import MKAvatar from "components/MKAvatar";

describe("MKAvatar", () => {
  it("renders extra small transparent avatars", () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <MKAvatar bgColor="transparent" size="xs"></MKAvatar>
      </ThemeProvider>
    );

    expect(container).toMatchSnapshot();
  });

  it("renders small primary avatars", () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <MKAvatar bgColor="primary" size="sm"></MKAvatar>
      </ThemeProvider>
    );

    expect(container).toMatchSnapshot();
  });

  it("renders large secondary avatars", () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <MKAvatar bgColor="secondary" size="lg"></MKAvatar>
      </ThemeProvider>
    );

    expect(container).toMatchSnapshot();
  });

  it("renders extra large info avatars", () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <MKAvatar bgColor="info" size="xl"></MKAvatar>
      </ThemeProvider>
    );

    expect(container).toMatchSnapshot();
  });

  it("renders medium success avatars", () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <MKAvatar bgColor="success" size="md"></MKAvatar>
      </ThemeProvider>
    );

    expect(container).toMatchSnapshot();
  });
});
