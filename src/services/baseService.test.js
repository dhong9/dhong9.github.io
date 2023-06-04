import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { createRequest, getRequest, postRequest } from "services/baseService";

// This sets the mock adapter on the default instance
var mock = new MockAdapter(axios);

mock.onGet("/users").reply(200, {
    users: [{ id: 1, name: "John Smith" }],
});

jest.mock("services/baseService", () => ({
    getRequest: jest.fn(),
    postRequest: jest.fn(),
    createRequest: jest.fn()
}));

describe("BaseService", () => {
    it("gets users", () => {
        // Create success and error spy functions
        const success = jest.fn();
        const error = jest.fn();

        // Get comments
        getRequest("users", success, error);

        // Verify that getRequest was called correctly
        expect(getRequest).toHaveBeenCalledWith('users', success, error);
    });
});