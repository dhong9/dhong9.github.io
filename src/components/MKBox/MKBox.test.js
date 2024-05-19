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
import MKBox from "components/MKBox";

describe("MKBox", () => {
  it("renders gradient white Box", () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <MKBox variant="gradient" color="white" />
      </ThemeProvider>
    );

    expect(container).toMatchSnapshot();
  });
});
