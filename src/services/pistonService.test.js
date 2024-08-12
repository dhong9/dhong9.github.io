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
import { getRequest, postRequest } from "services/baseService";
import { getRunTimes, executeCode } from "services/pistonService";

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
  postRequest: jest.fn(),
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

  it("executes code", () => {
    // Create success and error spy functions
    const success = jest.fn();

    // Execute code
    const data = {
      language: "python3", // Example: Set the language to Python
      version: "3.10.0", // Example: Set the Python version
      files: [
        {
          name: "my_code.py", // Example: Name of your code file
          content: "print('Hello, world!')", // Example: The code you want to execute
        },
      ],
      stdin: "", // Example: If needed, provide standard input
      args: [], // Example: If needed, provide command-line arguments
      compile_timeout: 10000, // Example: Set a compile timeout (in milliseconds)
      run_timeout: 3000, // Example: Set a runtime timeout (in milliseconds)
      compile_memory_limit: -1, // Example: Set a compile memory limit (in MB)
      run_memory_limit: -1, // Example: Set a runtime memory limit (in MB)
    };
    executeCode("python3", "3.10.0", "my_code.py", "print('Hello, world!')", success);

    // Verify that postRequest was called correctly
    expect(postRequest).toHaveBeenCalledWith("execute", data, success, console.error, {}, baseURL);
  });
});
