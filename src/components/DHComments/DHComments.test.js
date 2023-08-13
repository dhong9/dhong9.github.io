// React testing libraries
import React from "react";
import { render, fireEvent } from "@testing-library/react";

// Material Kit 2 React themes
import { ThemeProvider } from "@mui/material/styles";
import theme from "assets/theme";

// Axios
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

// Component to test
import DHComments from "components/DHComments";

// Setup axios mock
const mock = new MockAdapter(axios);

const commentData = {
  comments: [
    {
      id: 1,
      project: 2,
      name: "John Adams",
      email: "john_adams@aol.com",
      body: "Play connect 4 with me",
      create: "2023-05-26T17:42:43.263337Z",
      updated: "2023-05-26T17:42:43.263383Z",
      active: true,
      parent: null,
    },
  ],
};

jest.mock("services/baseService", () => ({
  getRequest: jest.fn(),
  postRequest: jest.fn(),
}));

mock.onGet("/comments").reply(200, { data: { results: commentData } });
mock.onPost("/comments").reply(201, commentData);

// Define Mocks
jest.mock("draft-convert", () => {
  return {
    convertFromHTML: jest.fn(),
    convertToHTML: jest.fn(),
    convertToRaw: jest.fn(),
  };
});

describe("DHComments", () => {
  let useEffect;

  const mockUseEffect = () => {
    useEffect.mockImplementationOnce((f) => f());
  };

  beforeEach(() => {
    useEffect = jest.spyOn(React, "useEffect");
    mockUseEffect();
  });

  it("Adds a comment", () => {
    const comments = [
      {
        id: 1,
        project: 2,
        name: "John Adams",
        email: "john_adams@aol.com",
        body: "Play connect 4 with me",
        create: "2023-05-26T17:42:43.263337Z",
        updated: "2023-05-26T17:42:43.263383Z",
        active: true,
        parent: null,
      },
    ];

    const user = {
      username: "tester",
      email: "tester@ctc.org",
    };

    const pageName = 11;

    const { container, getByText, getByRole } = render(
      <ThemeProvider theme={theme}>
        <DHComments comments={comments} pageName={pageName} user={user} />
      </ThemeProvider>
    );

    // Get reply button
    const replyBtn = getByText("Reply...");
    fireEvent.click(replyBtn);

    // Set reply to plain text
    const plainTextBox = getByText("Plain Text");
    fireEvent.click(plainTextBox);

    // Write something in the reply box
    const replyBox = getByRole("textbox");
    fireEvent.change(replyBox, { target: { value: "Goodbye world!" } });

    // Submit reply
    const addBtn = getByText("Add");
    fireEvent.click(addBtn);

    expect(container).toMatchSnapshot();
  });
});
