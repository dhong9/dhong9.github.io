// Unit test libraries
import renderer from "react-test-renderer";
import { render, fireEvent } from "@testing-library/react";

// Material Kit 2 React themes
import { ThemeProvider } from '@mui/material/styles';
import theme from "assets/theme";

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
