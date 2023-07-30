import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { getRequest } from "services/baseService";
import { getProjects } from "services/projectsService";

const mock = new MockAdapter(axios);

const projectData = {
  categories: [
    { id: 1, text: "Project 1" },
    { id: 2, text: "Project 2" },
  ],
};

jest.mock("services/baseService", () => ({
  getRequest: jest.fn(),
}));

mock.onGet("/projects/").reply(200, projectData);

describe("ProjectsService", () => {
  it("gets projects", () => {
    // Create success and error spy functions
    const success = jest.fn();

    // Get categories
    getProjects(success);

    // Verify that getRequest was called correctly
    expect(getRequest).toHaveBeenCalledWith("projects/", success, console.error);
  });
});
