/**
=========================================================
* Danyo-1.1
=========================================================

* Copyright 2024 Danyo (https://www.danyo.tech)

Coded by www.danyo.tech

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { getRequest, postRequest } from "services/baseService";

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
  postRequest("accounts/register/", user, success, (err) => {
    console.error(err);
    error(err);
  });
};

/**
 * Logs in a user
 * @param {object} user user login details
 * @param {*} success success callback
 * @param {*} error error callback
 */
export const loginAccount = (user, success, error) => {
  postRequest("accounts/token/", user, success, (err) => {
    console.error(err);
    error(err);
  });
};
