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

// Component to test
import ResetPassword from "layouts/pages/authentication/reset-password";

// Mocks
jest.mock("pages/LandingPages/ResetPassword", () => {
  const { forwardRef } = jest.requireActual("react");
  return {
    __esModule: true,
    default: forwardRef(() => <div>ResetPassword</div>),
  };
});

describe("ResetPasswordPage", () => {
  it("renders", () => {
    const { queryByText } = render(<ResetPassword onsuccess={jest.fn} />);
    expect(queryByText("ResetPassword")).toBeInTheDocument();
  });
});
