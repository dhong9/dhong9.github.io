import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { getRequest } from "services/baseService";
import { getComments } from "services/commentsService";

const mock = new MockAdapter(axios);

const commmentData = {
    comments: [
        {id: 1, text: "Comment 1"},
        {id: 2, text: "Comment 2"}
    ]
};

jest.mock("services/baseService", () => ({
    getRequest: jest.fn()
}));

mock.onGet("/comments").reply(200, commmentData);

describe("CommentsService", () => {
    it("gets comments", () => {
        // Create success and error spy functions
        const success = jest.fn();

        // Get comments
        getComments(success);

        // Verify that getRequest was called correctly
        expect(getRequest).toHaveBeenCalledWith('comments', success, console.error);
    });
});