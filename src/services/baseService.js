import axios from "axios";

// API root
const baseURL = "https://dhong9.pythonanywhere.com/";

// Generic HTTP requests
export const createRequest = (endpoint, payload) =>
  axios.create({
    baseURL: baseURL + endpoint,
    headers: payload,
  });

export const getRequest = (endpoint, success, error) =>
  axios.get(endpoint).then(success).error(error);

export const postRequest = async (endpoint, payload) => {
  try {
    const response = await axios.post(baseURL + endpoint, payload);
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};
