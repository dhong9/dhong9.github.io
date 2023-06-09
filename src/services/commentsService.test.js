import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { getRequest, postRequest } from "services/baseService";
import { getComments, addComment } from "services/commentsService";

const mock = new MockAdapter(axios);

const commentData = {
    comments: [
        {id: 1, text: "Comment 1"},
        {id: 2, text: "Comment 2"}
    ]
};

jest.mock("services/baseService", () => ({
    getRequest: jest.fn(),
    postRequest: jest.fn()
}));

mock.onGet("/comments").reply(200, commentData);
mock.onPost("/comments").reply(200, commentData)

describe("CommentsService", () => {
    it("gets comments", () => {
        // Create success and error spy functions
        const success = jest.fn();

        // Get comments
        getComments(success);

        // Verify that getRequest was called correctly
        expect(getRequest).toHaveBeenCalledWith('comments', success, console.error);
    });

    it("posts a comment", () => {
        // Create success and error spy functions
        const success = jest.fn();

        // Add comment
        addComment(success, "pageName", "name", "email", "body");

        // Verify that postRequest was called correctly
        const commentPost = {
            pageName: "pageName",
            name: "name",
            email: "email",
            body: "body",
            active: true,
            parent: null
        };
        expect(postRequest).toHaveBeenCalledWith('comments', commentPost, success, console.error);
    })
});