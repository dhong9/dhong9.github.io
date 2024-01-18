// React testing libraries
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

// Component to test
import SignUpPage from "layouts/pages/authentication/sign-up";

// Mocks
jest.mock("pages/LandingPages/SignUp", () => {
  const { forwardRef } = jest.requireActual("react");
  return {
    __esModule: true,
    default: forwardRef(() => <div>SignUp</div>),
  };
});

describe("SignUpPage", () => {
  it("renders", () => {
    const { queryByText } = render(<SignUpPage />);
    expect(queryByText("SignUp")).toBeInTheDocument();
  });
});
