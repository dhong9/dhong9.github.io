// Unit test libraries
import renderer from "react-test-renderer";
import { render, fireEvent } from "@testing-library/react";

// MUI components
import { ThemeProvider, createTheme } from "@mui/material/styles";

// Functions
import linearGradient from "assets/theme/functions/linearGradient";
import pxToRem from "assets/theme/functions/pxToRem";

// Component to test
import ContactUs from "pages/LandingPages/ContactUs";

jest.mock("@mui/base/TextareaAutosize", () => {
  const { forwardRef } = jest.requireActual("react");
  return {
    __esModule: true,
    default: forwardRef(() => <textarea />),
  };
});

describe("ContactUs", () => {
  // Create a dummy theme object
  const theme = createTheme({
    palette: {
      white: {
        main: "#00F",
      },
      gradients: {
        primary: {
          main: "#EC407A",
          state: "#D81B60",
        },

        secondary: {
          main: "#747b8a",
          state: "#495361",
        },

        info: {
          main: "#49a3f1",
          state: "#1A73E8",
        },

        success: {
          main: "#66BB6A",
          state: "#43A047",
        },

        warning: {
          main: "#FFA726",
          state: "#FB8C00",
        },

        error: {
          main: "#EF5350",
          state: "#E53935",
        },

        light: {
          main: "#EBEFF4",
          state: "#CED4DA",
        },

        dark: {
          main: "#42424a",
          state: "#191919",
        },
      },
      transparent: {
        main: "transparent",
      },
    },
    typography: {
      size: {
        xl: "16pt",
      },
      fontWeightMedium: 500,
    },
    borders: {
      borderRadius: {
        xs: pxToRem(1.6),
        sm: pxToRem(2),
        md: pxToRem(6),
        lg: pxToRem(8),
        xl: pxToRem(12),
        xxl: pxToRem(16),
        section: pxToRem(160),
      },
    },
    boxShadows: {
      colored: {
        "#FF00FF": "#FF00FF",
      },
    },
    functions: { pxToRem, linearGradient },
  });

  it("renders", () => {
    const component = renderer.create(
      <ThemeProvider theme={theme}>
        <ContactUs />
      </ThemeProvider>
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should handle input change", () => {
    const { getByLabelText } = render(
      <ThemeProvider theme={theme}>
        <ContactUs />
      </ThemeProvider>
    );
    const fullNameInput = getByLabelText("Full Name");
    const emailInput = getByLabelText("Email");
    const subjectInput = getByLabelText("Subject");

    // Simulate the onChange event
    fireEvent.change(fullNameInput, { target: { value: "Johnny Appleseed" } });
    fireEvent.change(emailInput, { target: { value: "johnny_boy@aol.com" } });
    fireEvent.change(subjectInput, { target: { value: "Unit Test is Healthy" } });

    // Assert that the state or props have been updated accordingly
    expect(fullNameInput.value).toEqual("Johnny Appleseed");
    expect(emailInput.value).toEqual("johnny_boy@aol.com");
    expect(subjectInput.value).toEqual("Unit Test is Healthy");
  });
});
