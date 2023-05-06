import axios from "axios";

// API root
const baseURL = "https://dhong9.pythonanywhere.com/";

// Generic HTTP requests
export const createRequest = (endpoint, payload) =>
  axios.create({
    baseURL: baseURL + endpoint,
    headers: payload,
  });

export const postRequest = (endpoint, payload, success, error) => {
  axios
    .post(baseURL + endpoint, payload)
    .then(success)
    .error(error);
};
