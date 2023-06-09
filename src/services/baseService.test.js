import axios from "axios";
import { createRequest, getRequest, postRequest } from "services/baseService";

jest.mock('axios');

describe("BaseService", () => {

    const baseURL = "https://dhong9.pythonanywhere.com/";
    const success = jest.fn();
    const error = jest.fn();
    const data = {};

    beforeEach(() => {
        axios.get.mockResolvedValue(data);
        axios.post.mockResolvedValue({data: [{name: 'Bob'}]});
    });
    
    it("gets users", () => {

        // Get users
        getRequest("users", success, error);

        // Verify that getRequest was called correctly
        expect(axios.get).toHaveBeenCalledWith(baseURL + "users");
    });

    it("posts a user", () => {
        // Post user
        const user = {
            id: 2,
            name: "Jane Doe"
        };
        postRequest("users", user, success, error);

        // Verify that getRequest was called correctly
        expect(axios.post).toHaveBeenCalledWith(baseURL + "users", user, { maxRedirects: 0 });
    });

    // it("creates a user", () => {
    //     // Create success and error spy functions
    //     const success = jest.fn();
    //     const error = jest.fn();

    //     // Post user
    //     const user = {
    //         id: 2,
    //         name: "Jane Doe"
    //     };
    //     createRequest("users", user, success, error);

    //     // Verify that getRequest was called correctly
    //     expect(createRequest).toHaveBeenCalledWith('users', user, success, error);
    // });
});