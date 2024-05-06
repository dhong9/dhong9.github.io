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
import "@testing-library/jest-dom";

// Material Kit 2 React themes
import { ThemeProvider } from "@mui/material/styles";
import theme from "assets/theme";

// Authentication
import UploadImage from "pages/LandingPages/UploadImage";

describe("UploadImage", () => {
  it("renders", () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <UploadImage user={null} updateUser={jest.fn} />
      </ThemeProvider>
    );

    expect(container).toMatchSnapshot();
  });
});
