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

// API root
const baseURL = "https://dhong9.pythonanywhere.com/"; // dhong9

// Generic HTTP requests
export const createRequest = (endpoint, payload, success, error) =>
  axios
    .create({
      baseURL: baseURL + endpoint,
      headers: payload,
    })
    .then(success)
    .catch(error);

export const getRequest = (endpoint, success, error, base = baseURL) =>
  axios
    .get(base + endpoint, {
      maxRedirects: 0,
    })
    .then(success)
    .catch(error);

export const postRequest = (endpoint, payload, success, error, config = {}, base = baseURL) =>
  axios
    .post(base + endpoint, payload, { maxRedirects: 0, ...config })
    .then(success)
    .catch(error);

export const putRequest = (endpoint, payload, success, error, config = {}) =>
  axios
    .put(baseURL + endpoint, payload, { maxRedirects: 0, ...config })
    .then(success)
    .catch(error);

export const patchRequest = (endpoint, payload, success, error, config = {}) =>
  axios
    .patch(baseURL + endpoint, payload, { maxRedirects: 0, ...config })
    .then(success)
    .catch(error);

export const deleteRequest = (endpoint, success, error, config = {}) =>
  axios
    .delete(baseURL + endpoint, { maxRedirects: 0, ...config })
    .then(success)
    .catch(error);
