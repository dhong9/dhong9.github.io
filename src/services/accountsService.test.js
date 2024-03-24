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
import { getRequest, postRequest, putRequest, deleteRequest } from "services/baseService";
import {
  getUserProfile,
  addAccount,
  loginAccount,
  updateAccount,
  deleteAccount,
  refreshAccount,
} from "services/accountsService";

const mock = new MockAdapter(axios);

const userData = {};

jest.mock("services/baseService", () => ({
  getRequest: jest.fn(),
  postRequest: jest.fn(),
  putRequest: jest.fn(),
  deleteRequest: jest.fn(),
}));

mock.onGet("/accounts/profiles/1").reply(200, userData);
mock.onPost("accounts/register/").reply(200, userData);
mock.onPost("accounts/token/").reply(200, userData);

describe("AccountsService", () => {
  it("gets a user", () => {
    // Create success and error spy functions
    const success = jest.fn();

    // Get user
    getUserProfile(1, success);

    // Verify that getRequest was called correctly
    expect(getRequest).toHaveBeenCalledWith("accounts/profiles/1", success, console.error);
  });

  it("adds an account", () => {
    // Create success and error spy functions
    const success = jest.fn();
    const error = jest.fn();

    // Fake user
    const user = {
      email: "eatMe@food.net",
      username: "neater",
      password: "abc123",
      password2: "abc123",
    };

    // Add user
    addAccount(user, success, error);

    // Verify that postRequest was called correctly
    expect(postRequest).toHaveBeenCalledWith(
      "accounts/register/",
      user,
      success,
      expect.any(Function)
    );
  });

  it("logs in an account", () => {
    // Create success and error spy functions
    const success = jest.fn();
    const error = jest.fn();

    // Fake user
    const user = {
      username: "potatoHead",
      password: "potatoes@123",
    };

    // Log in user
    loginAccount(user, success, error);

    // Verify that postRequest was called correctly
    expect(postRequest).toHaveBeenCalledWith(
      "accounts/token/",
      user,
      success,
      expect.any(Function)
    );
  });

  it("updates an account", () => {
    // Create success and error spy functions
    const success = jest.fn();
    const error = jest.fn();

    // Fake user
    const user = {
      email: "eatMe@moreFood.net",
      username: "evenNeater",
      password: "def",
      password2: "def",
    };
    const token = "TOLKIEN";
    const id = 10;

    // Update user
    updateAccount(id, user, token, success, error);

    // Verify that putRequest was called correctly
    expect(putRequest).toHaveBeenCalledWith(
      "accounts/update/" + id + "/",
      user,
      success,
      expect.any(Function),
      {
        Authorization: `Bearer ${token}`,
      }
    );
  });

  it("deletes an account", () => {
    // Create success and error spy functions
    const success = jest.fn();
    const error = jest.fn();

    // Fake user
    const token = "NEIKLOT";
    const id = 18;

    // Delete user
    deleteAccount(id, token, success, error);

    // Verify that deleteRequest was called corectly
    expect(deleteRequest).toHaveBeenCalledWith(
      "accounts/delete/" + id + "/",
      success,
      expect.any(Function),
      { headers: { Authorization: `Bearer ${token}` } }
    );
  });
});

it("refreshes an account", () => {
  // Create success and error spy functions
  const success = jest.fn();

  // Fake user
  const token = "MOCK_REFRESH";

  // Refresh user
  refreshAccount(token, success);

  expect(postRequest).toHaveBeenCalledWith(
    "accounts/token/refresh/",
    { refresh: token },
    success,
    console.error
  );
});
