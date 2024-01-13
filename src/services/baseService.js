import axios from "axios";

// API root
const baseURL = "https://dhong9.pythonanywhere.com/";

// Generic HTTP requests
export const createRequest = (endpoint, payload, success, error) =>
  axios
    .create({
      baseURL: baseURL + endpoint,
      headers: payload,
    })
    .then(success)
    .catch(error);

export const getRequest = (endpoint, success, error) =>
  axios
    .get(baseURL + endpoint, {
      maxRedirects: 0,
    })
    .then(success)
    .catch(error);

export const postRequest = (endpoint, payload, success, error, config = {}) =>
  axios
    .post(baseURL + endpoint, payload, { maxRedirects: 0, ...config })
    .then(success)
    .catch(error);

export const putRequest = (endpoint, payload, success, error, config = {}) =>
  axios
    .put(baseURL + endpoint, payload, { maxRedirects: 0, ...config })
    .then(success)
    .catch(error);

export const deleteRequest = (endpoint, success, error, token) =>
  axios
    .delete(baseURL + endpoint, { params: { Authorization: "Bearer " + token } })
    .then(success)
    .catch(error);
