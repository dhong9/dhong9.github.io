/**
=========================================================
* Danyo-1.2
=========================================================

* Copyright 2024 Danyo (https://www.danyo.tech)

Coded by www.danyo.tech

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { getRequest } from "services/baseService";
import { getRunTimes } from "services/pistionService";

const mock = new MockAdapter(axios);

const runtimeData = [
  {
    language: "python",
    version: "3.10.0",
    aliases: ["py", "python3"],
  },
  {
    language: "scheme",
    version: "1.2.0",
    aliases: ["scheme", "scm"],
  },
];

// Pistion code exeucution base URL
const baseURL = "https://emkc.org/api/v2/piston/";

jest.mock("services/baseService", () => ({
  getRequest: jest.fn(),
}));

mock.onGet("/runtimes").reply(200, runtimeData);

describe("PistonService", () => {
  it("gets runtimes", () => {
    // Create success and error spy functions
    const success = jest.fn();

    // Get categories
    getRunTimes(success);

    // Verify that getRequest was called correctly
    expect(getRequest).toHaveBeenCalledWith("runtimes", success, console.error, baseURL);
  });
});
