/**
=========================================================
* Danyo-1.1
=========================================================

* Copyright 2024 Danyo (https://www.danyo.tech)

Coded by www.danyo.tech

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { getRequest, postRequest, patchRequest, deleteRequest } from "services/baseService";

/**
 * Registers a user
 * @param {object} user user registration details
 * @param {Function} success success callback
 * @param {Function} error error callback
 */
export const addAccount = (user, success, error) => {
  postRequest("accounts/users/", user, success, error);
};

/**
 * Activates a user account
 * @param {string} uid
 * @param {string} token
 * @param {Function} success
 * @param {Function} error
 */
export const activateAccount = (uid, token, success, error) => {
  postRequest("accounts/users/activation/", { uid, token }, success, error);
};

/**
 * Logs in a user
 * @param {object} user user login details
 * @param {Function} success success callback
 * @param {Function} error error callback
 */
export const loginAccount = (user, success, error) => {
  postRequest("accounts/token/login/", user, success, error);
};

/**
 * Logs out a user
 * @param {Function} success success callback
 * @param {Function} error error callback
 */
export const logoutAccount = (success, error) => {
  postRequest("accounts/token/logout/", {}, success, error);
};

/**
 * Gets logged in user data
 * @param {Function} success success callback
 * @param {Function} error error callback
 */
export const getUser = (success, error) => {
  getRequest("accounts/users/me/", success, error);
};

/**
 * Gets user profile by ID
 * @param {number} id user ID
 * @param {Function} success success callback
 */
export const getUserProfile = (id, success) => {
  getRequest("accounts/profiles/" + id, success, console.error);
};

/**
 * Updates user account
 * @param {object} user user updated details
 * @param {Function} success success callback
 * @param {Function} error error callback
 */
export const updateAccount = (user, success, error) => {
  patchRequest("accounts/users/me/", user, success, error);
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
 * @param {Function} success success callback
 * @param {Function} error error callback
 */
export const deleteAccount = (current_password, success, error) => {
  deleteRequest("accounts/users/me/", success, error, { data: { current_password } });
};

/**
 * Sends password reset email
 * @param {string} email user email
 * @param {Function} success success callback
 * @param {Function} error error callback
 */
export const sendPasswordResetEmail = (email, success, error) => {
  postRequest("users/reset_password/", { email }, success, error);
};

/**
 * Confirms password reset
 * @param {string} token password reset token
 * @param {string} password new password
 * @param {Function} success success callback
 * @param {Function} error error callback
 */
export const confirmPasswordReset = (token, password, success, error) => {
  postRequest("users/reset_password_confirm/", { token, password }, success, error);
};
