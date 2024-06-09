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
import { getRequest, postRequest, patchRequest, deleteRequest } from "services/baseService";
import {
  getUser,
  getUserProfile,
  addAccount,
  activateAccount,
  loginAccount,
  logoutAccount,
  updateAccount,
  updateProfileImage,
  deleteAccount,
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
mock.onPost("accounts/token/login/").reply(200, userData);
mock.onGet("accounts/users/me/").reply(200, userData);
mock.onPatch("accounts/users/me/").reply(200, userData);
mock.onDelete("accounts/users/me/").reply(200, userData);
mock.onPost("accounts/users/").reply(200, userData);
mock.onPost("accounts/token/logout/").reply(200, userData);
mock.onPost("accounts/users/activation/").reply(200, userData);
mock.onPost("users/reset_password/").reply(200, userData);
mock.onPost("users/reset_password_confirm/").reply(200, userData);
mock.onPatch("accounts/update/20/").reply(200, userData);

describe("AccountsService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("gets logged in user data", () => {
    // Create success and error spy functions
    const success = jest.fn(),
      error = jest.fn();

    // Get user
    getUser(success, error);

    // Verify that getRequest was called correctly
    expect(getRequest).toHaveBeenCalledWith("accounts/users/me/", success, error);
  });

  it("gets a user", () => {
    // Create success spy function
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
    };

    // Add user
    addAccount(user, success, error);

    // Verify that postRequest was called correctly
    expect(postRequest).toHaveBeenCalledWith("accounts/users/", user, success, error);
  });

  it("activates an account", () => {
    // Create success and error spy functions
    const success = jest.fn(),
      error = jest.fn();

    // Fake user
    const uid = "Ng",
      token = "B737";

    // Activate account
    activateAccount(uid, token, success, error);

    // Verify that postRequest was called correctly
    expect(postRequest).toHaveBeenCalledWith(
      "accounts/users/activation/",
      { uid, token },
      success,
      error
    );
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
    expect(postRequest).toHaveBeenCalledWith("accounts/token/login/", user, success, error);
  });

  it("logs out an account", () => {
    // Create success and error spy functions
    const success = jest.fn(),
      error = jest.fn();

    // Log out user
    logoutAccount(success, error);

    // Verify that postRequest was called correctly
    expect(postRequest).toHaveBeenCalledWith("accounts/token/logout/", {}, success, error);
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

    // Update user
    updateAccount(user, success, error);

    // Verify that putRequest was called correctly
    expect(patchRequest).toHaveBeenCalledWith("accounts/users/me/", user, success, error);
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
    const password = "fake_user";

    // Delete user
    deleteAccount(password, success, error);

    // Verify that deleteRequest was called corectly
    expect(deleteRequest).toHaveBeenCalledWith("accounts/users/me/", success, error, {
      data: { current_password: password },
    });
  });
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
  expect(postRequest).toHaveBeenCalledWith("users/reset_password/", { email }, success, error);
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
