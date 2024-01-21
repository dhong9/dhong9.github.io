import axios from "axios";
import { createRequest, getRequest, postRequest, putRequest, deleteRequest } from "services/baseService";

jest.mock("axios");

describe("BaseService", () => {
  const baseURL = "https://dhong9.pythonanywhere.com/";
  const success = jest.fn();
  const error = jest.fn();
  const data = {};

  beforeEach(() => {
    axios.get.mockResolvedValue(data);
    axios.post.mockResolvedValue({ data: [{ name: "Bob" }] });
    axios.create.mockResolvedValue({ data: [{ name: "Bob" }] });
    axios.put.mockResolvedValue({ data: [{ name: "Bob" }] });
    axios.delete.mockResolvedValue({ data: [{ name: "Bob" }] });
  });

  it("gets users", () => {
    // Get users
    getRequest("users", success, error);

    // Verify that getRequest was called correctly
    expect(axios.get).toHaveBeenCalledWith(baseURL + "users", { maxRedirects: 0 });
  });

  it("posts a user", () => {
    // Post user
    const user = {
      id: 2,
      name: "Jane Doe",
    };
    postRequest("users", user, success, error);

    // Verify that getRequest was called correctly
    expect(axios.post).toHaveBeenCalledWith(baseURL + "users", user, { maxRedirects: 0 });
  });

  it("creates a user", () => {
    // Post user
    const user = {
      id: 2,
      name: "Jane Doe",
    };
    const payload = {
      baseURL: baseURL + "users",
      headers: user,
    };
    createRequest("users", user, success, error);

    // Verify that getRequest was called correctly
    expect(axios.create).toHaveBeenCalledWith(payload);
  });

  it("updates a user", () => {
    // Post user
    const user = {
      id: 2,
      name: "Jane Doe",
    };
    putRequest("users", user, success, error);

    // Verify that getRequest was called correctly
    expect(axios.put).toHaveBeenCalledWith(baseURL + "users", user, { maxRedirects: 0 });
  });

  it("deletes a user", () => {
    // Delete user
    deleteRequest("users", success, error);

    // Verify that getRequest was called correctly
    expect(axios.delete).toHaveBeenCalledWith(baseURL + "users", { maxRedirects: 0 });
  });
});
