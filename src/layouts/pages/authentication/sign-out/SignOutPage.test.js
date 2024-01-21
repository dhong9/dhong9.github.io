// React testing libraries
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

// Component to test
import SignOutPage from "layouts/pages/authentication/sign-out";

// Mocks
jest.mock("pages/LandingPages/SignOut", () => {
  const { forwardRef } = jest.requireActual("react");
  return {
    __esModule: true,
    default: forwardRef(() => <div>SignOut</div>),
  };
});

describe("SignOutPage", () => {
  it("renders", () => {
    const { queryByText } = render(<SignOutPage onload={jest.fn} />);
    expect(queryByText("SignOut")).toBeInTheDocument();
  });
});
