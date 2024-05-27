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
import ActivateAccountPage from "layouts/pages/authentication/activate-account";

// Mocks
jest.mock("pages/LandingPages/ActivateAccount", () => {
  const { forwardRef } = jest.requireActual("react");
  return {
    __esModule: true,
    default: forwardRef(() => <div>ActivateAccount</div>),
  };
});

describe("ActivateAccountPage", () => {
  it("renders", () => {
    const { queryByText } = render(<ActivateAccountPage />);
    expect(queryByText("ActivateAccount")).toBeInTheDocument();
  });
});
