// React testing libraries
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

// Component to test
import VerifyEmailPage from "layouts/pages/authentication/verify-email";

// Mocks
jest.mock("pages/LandingPages/VerifyEmail", () => {
  const { forwardRef } = jest.requireActual("react");
  return {
    __esModule: true,
    default: forwardRef(() => <div>VerifyEmail</div>),
  };
});

describe("VerifyEmailPage", () => {
  it("renders", () => {
    const { queryByText } = render(<VerifyEmailPage />);
    expect(queryByText("VerifyEmail")).toBeInTheDocument();
  });
});
