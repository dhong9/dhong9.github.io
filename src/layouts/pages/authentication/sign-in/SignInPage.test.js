// React testing libraries
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

// Component to test
import SignInPage from "layouts/pages/authentication/sign-in";

// Mocks
jest.mock("pages/LandingPages/SignIn", () => {
  const { forwardRef } = jest.requireActual("react");
  return {
    __esModule: true,
    default: forwardRef(() => <div>SignIn</div>),
  };
});

describe("SignInPage", () => {
  it("renders", () => {
    const { queryByText } = render(<SignInPage onsuccess={jest.fn} />);
    expect(queryByText("SignIn")).toBeInTheDocument();
  });
});
