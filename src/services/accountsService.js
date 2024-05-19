/**
=========================================================
* Danyo-1.1
=========================================================

* Copyright 2024 Danyo (https://www.danyo.tech)

Coded by www.danyo.tech

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import {
  getRequest,
  postRequest,
  putRequest,
  patchRequest,
  deleteRequest,
} from "services/baseService";

/**
 * Gets user profile by ID
 * @param {number} id user ID
 * @param {Function} success success callback
 */
export const getUserProfile = (id, success) => {
  getRequest("accounts/profiles/" + id, success, console.error);
};

/**
 * Registers a user
 * @param {object} user user registration details
 * @param {Function} success success callback
 * @param {Function} error error callback
 */
export const addAccount = (user, success, error) => {
  postRequest("accounts/register/", user, success, error);
};

/**
 * Logs in a user
 * @param {object} user user login details
 * @param {Function} success success callback
 * @param {Function} error error callback
 */
export const loginAccount = (user, success, error) => {
  postRequest("accounts/token/", user, success, error);
};

/**
 * Updates user account
 * @param {number} id user ID
 * @param {object} user user updated details
 * @param {Function} success success callback
 * @param {Function} error error callback
 */
export const updateAccount = (id, user, success, error) => {
  putRequest("accounts/update/" + id + "/", user, success, error);
};

/**
 * Updates user password
 * @param {*} id user ID
 * @param {*} password input password
 * @param {*} password2 confirm password
 * @param {*} success success callback
 * @param {*} error error callback
 */
export const updatePassword = (id, password, password2, success, error) => {
  patchRequest("accounts/update/" + id + "/", { password, password2 }, success, error);
};

/**
 * Updates user profile picture
 * @param {number} id user ID
 * @param {string} image image path
 * @param {Function} success success callback
 * @param {Function} error error callback
 */
export const updateProfileImage = (id, image, success, error) => {
  patchRequest("accounts/profiles/" + id, { image }, success, error);
};

/**
 * Deletes user account
 * @param {number} id user ID
 * @param {string} token access token
 * @param {Function} success success callback
 * @param {Function} error error callback
 */
export const deleteAccount = (id, token, success, error) => {
  deleteRequest(
    "accounts/delete/" + id + "/",
    success,
    (err) => {
      console.log(err);
      error(err);
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

/**
 * Refreshes user account
 * @param {string} refresh refresh token
 * @param {Function} success success callback
 */
export const refreshAccount = (refresh, success) => {
  postRequest("accounts/token/refresh/", { refresh }, success, console.error);
};

/**
 * Sends password reset email
 * @param {string} email user email
 * @param {Function} success success callback
 * @param {Function} error error callback
 */
export const sendPasswordResetEmail = (email, success, error) => {
  postRequest("password_reset/", { email }, success, error);
};

/**
 * Confirms password reset
 * @param {string} token password reset token
 * @param {string} password new password
 * @param {Function} success success callback
 * @param {Function} error error callback
 */
export const confirmPasswordReset = (token, password, success, error) => {
  postRequest("password_reset/confirm/", { token, password }, success, error);
};
