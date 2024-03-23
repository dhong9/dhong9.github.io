/**
=========================================================
* Danyo-1.1
=========================================================

* Copyright 2024 Danyo (https://www.danyo.tech)

Coded by www.danyo.tech

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { getRequest } from "services/baseService";
import { getUserProfile } from "services/accountsService";

const mock = new MockAdapter(axios);

const userData = {};

jest.mock("services/baseService", () => ({
  getRequest: jest.fn(),
}));

mock.onGet("/accounts/profiles/1").reply(200, userData);

describe("AccountsService", () => {
  it("gets a user", () => {
    // Create success and error spy functions
    const success = jest.fn();

    // Get user
    getUserProfile(1, success);

    // Verify that getRequest was called correctly
    expect(getRequest).toHaveBeenCalledWith("accounts/profiles/1", success, console.error);
  });
});
