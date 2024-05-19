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
import {
  getRequest,
  postRequest,
  patchRequest,
  putRequest,
  deleteRequest,
} from "services/baseService";
import {
  getUserProfile,
  addAccount,
  loginAccount,
  updateAccount,
  updatePassword,
  updateProfileImage,
  deleteAccount,
  refreshAccount,
  sendPasswordResetEmail,
  confirmPasswordReset,
} from "services/accountsService";

const mock = new MockAdapter(axios);

const userData = {};

jest.mock("services/baseService", () => ({
  getRequest: jest.fn(),
  postRequest: jest.fn(),
  putRequest: jest.fn(),
  patchRequest: jest.fn(),
  deleteRequest: jest.fn(),
}));

mock.onGet("/accounts/profiles/1").reply(200, userData);
mock.onPost("accounts/register/").reply(200, userData);
mock.onPost("accounts/token/").reply(200, userData);
mock.onPost("password_reset/").reply(200, userData);
mock.onPost("password_reset/confirm/").reply(200, userData);
mock.onPut("accounts/update/10/").reply(200, userData);
mock.onPatch("accounts/update/20/").reply(200, userData);
mock.onPatch("accounts/profiles/20/").reply(200, userData);

describe("AccountsService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

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
    const success = jest.fn(),
      error = jest.fn();

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
    expect(postRequest).toHaveBeenCalledWith("accounts/register/", user, success, error);
  });

  it("logs in an account", () => {
    // Create success and error spy functions
    const success = jest.fn(),
      error = jest.fn();

    // Fake user
    const user = {
      username: "potatoHead",
      password: "potatoes@123",
    };

    // Log in user
    loginAccount(user, success, error);

    // Verify that postRequest was called correctly
    expect(postRequest).toHaveBeenCalledWith("accounts/token/", user, success, error);
  });

  it("updates an account", () => {
    // Create success and error spy functions
    const success = jest.fn(),
      error = jest.fn();

    // Fake user
    const user = {
      email: "eatMe@moreFood.net",
      username: "evenNeater",
      password: "def",
      password2: "def",
    };
    const id = 10;

    // Update user
    updateAccount(id, user, success, error);

    // Verify that putRequest was called correctly
    expect(putRequest).toHaveBeenCalledWith("accounts/update/" + id + "/", user, success, error);
  });

  it("updates user password", () => {
    // Create success and error spy functions
    const success = jest.fn(),
      error = jest.fn();

    // Fake user
    const id = 20;
    const data = {
      password: "!@qwiI",
      password2: "!@qwiI",
    };

    // Update password
    updatePassword(id, "!@qwiI", "!@qwiI", success, error);

    // Verify that updatePassword was called correctly
    expect(patchRequest).toHaveBeenCalledWith("accounts/update/20/", data, success, error);
  });

  it("updates user profile image", () => {
    // Create success and error spy functions
    const success = jest.fn(),
      error = jest.fn();

    // Fake user
    const id = 20;
    const image = "doughnut.png";

    // Update image
    updateProfileImage(id, image, success, error);

    // Verify that updateProfileImage was called correctly
    expect(patchRequest).toHaveBeenCalledWith("accounts/profiles/20", { image }, success, error);
  });

  it("deletes an account", () => {
    // Create success and error spy functions
    const success = jest.fn(),
      error = jest.fn();

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

it("sends password reset email", () => {
  // Create success and error spy functions
  const success = jest.fn(),
    error = jest.fn();

  // Fake user
  const email = "shortTermMemory@aol.com";

  // Send password reset email
  sendPasswordResetEmail(email, success, error);

  // Verify that password reset was called correctly
  expect(postRequest).toHaveBeenCalledWith("password_reset/", { email }, success, error);
});

it("confirms password reset", () => {
  const success = jest.fn(),
    error = jest.fn();

  // Fake user
  const token = "FAKE_TOKEN",
    password = "brand$pankinN3w";

  // Confirm password reset
  confirmPasswordReset(token, password, success, error);

  // Verify that confirm password reset was called correctly
  expect(postRequest).toHaveBeenCalledWith(
    "password_reset/confirm/",
    { token, password },
    success,
    error
  );
});
