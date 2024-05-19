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
import ForgotPassword from "layouts/pages/authentication/forgot-password";

// Mocks
jest.mock("pages/LandingPages/ForgotPassword", () => {
  const { forwardRef } = jest.requireActual("react");
  return {
    __esModule: true,
    default: forwardRef(() => <div>ForgotPassword</div>),
  };
});

describe("ForgotPasswordPage", () => {
  it("renders", () => {
    const { queryByText } = render(<ForgotPassword />);
    expect(queryByText("ForgotPassword")).toBeInTheDocument();
  });
});
