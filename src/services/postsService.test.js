import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { getRequest, postRequest } from "services/baseService";
import { getPosts, getPostById, addPost } from "services/postsService";

const mock = new MockAdapter(axios);

const postData = {
  posts: [
    { id: 1, text: "Post 1" },
    { id: 2, text: "Post 2" },
  ],
};

const post1 = { text: "Post 1" };

jest.mock("services/baseService", () => ({
  getRequest: jest.fn(),
  postRequest: jest.fn(),
}));

mock.onGet("/posts").reply(200, postData);
mock.onGet("/posts/1").reply(200, post1);
mock.onPost("/posts").reply(200, postData);

describe("PostsService", () => {
  it("gets posts", () => {
    // Create success and error spy functions
    const success = jest.fn();

    // Get comments
    getPosts(success);

    // Verify that getRequest was called correctly
    expect(getRequest).toHaveBeenCalledWith("posts", success, console.error);
  });

  it("gets post ID 1", () => {
    // Create success and error spy functions
    const success = jest.fn();

    // Get comments
    getPostById(1, success);

    // Verify that getRequest was called correctly
    expect(getRequest).toHaveBeenCalledWith("posts/1", success, console.error);
  });

  it("posts a post", () => {
    // Create success and error spy functions
    const success = jest.fn();

    // Add comment
    addPost(success, "postName", "Tornadoes", "name", "email", "body", true, false, true);

    // Verify that postRequest was called correctly
    const forumPost = {
      postName: "postName",
      category: "Tornadoes",
      name: "name",
      email: "email",
      body: "body",
      isPlainText: true,
      mainFeatured: false,
      featured: true,
      active: true,
      parent: null,
    };
    expect(postRequest).toHaveBeenCalledWith("posts", forumPost, success, console.error);
  });
});
