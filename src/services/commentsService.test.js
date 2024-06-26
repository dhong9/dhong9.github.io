import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { getRequest, postRequest } from "services/baseService";
import { getComments, getCommentById, addComment, sortComments } from "services/commentsService";

const mock = new MockAdapter(axios);

const commentData = {
  comments: [
    { id: 1, text: "Comment 1" },
    { id: 2, text: "Comment 2" },
  ],
};

jest.mock("services/baseService", () => ({
  getRequest: jest.fn(),
  postRequest: jest.fn(),
}));

mock.onGet("/comments").reply(200, commentData);
mock.onPost("/comments").reply(200, commentData);

describe("CommentsService", () => {
  it("gets comments", () => {
    // Create success and error spy functions
    const success = jest.fn();

    // Get comments
    getComments(success);

    // Verify that getRequest was called correctly
    expect(getRequest).toHaveBeenCalledWith("comments", success, console.error);
  });

  it("gets comment by ID", () =>{
    // Create success and error spy functions
    const success = jest.fn();

    // Get comments
    getCommentById(1, success);

    // Verify that getRequest was called correctly
    expect(getRequest).toHaveBeenCalledWith("comments/1", success, console.error);
  });

  it("posts a comment", () => {
    // Create success and error spy functions
    const success = jest.fn();

    // Add comment
    addComment(success, "pageName", "name", "email", "body");

    // Verify that postRequest was called correctly
    const commentPost = {
      project: "pageName",
      name: "name",
      email: "email",
      body: "body",
      active: true,
      parent: null,
    };
    expect(postRequest).toHaveBeenCalledWith("comments", commentPost, success, console.error);
  });

  it("sorts comments", () => {
    const comments = [
      {id: 1, body: "Hello, world!"},
      {id: 2, body: "Goodbye!"},
      {id: 3, body: "It's nice to see you", parent: 1},
      {id: 4, body: "Get out", parent: 2}
    ];
    const sortedComments = sortComments(comments);
    const expectedComments = [
      {id: 1, body: "Hello, world!", depth: 0},
      {id: 3, body: "It's nice to see you", parent: 1, depth: 1},
      {id: 2, body: "Goodbye!", depth: 0},
      {id: 4, body: "Get out", parent: 2, depth: 1}
    ]
    expect(sortedComments).toEqual(expectedComments);
  });
});
