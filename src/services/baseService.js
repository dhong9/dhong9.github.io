import axios from "axios";

// API root
const baseURL = "https://dhong9.pythonanywhere.com/";

// Generic HTTP requests
export const createRequest = (endpoint, payload) =>
  axios.create({
    baseURL: baseURL + endpoint,
    headers: payload,
  });

export const postRequest = async (endpoint, payload) => {
  try {
    const response = await axios.post(baseURL + endpoint, payload);
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};
