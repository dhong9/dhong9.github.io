/**
=========================================================
* Danyo-1.2
=========================================================

* Copyright 2024 Danyo (https://www.danyo.tech)

Coded by www.danyo.tech

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Unit test libraries
import { render } from "@testing-library/react";

// Component to test
import ActivateAccountBasic from "pages/LandingPages/ActivateAccount";

// Axios
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

// Setup axios mock
const mock = new MockAdapter(axios);

describe("ActivateAccount", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders correct text", () => {
    mock.onPost().reply(200, {});
    const { queryByText } = render(<ActivateAccountBasic uid="R4x" token="bc312" />);
    expect(queryByText("Activating account...")).toBeInTheDocument;
  });
});
