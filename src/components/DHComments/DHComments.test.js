// React testing libraries
import React from "react";
import { render, fireEvent } from "@testing-library/react";

// Material Kit 2 React themes
import { ThemeProvider } from "@mui/material/styles";
import theme from "assets/theme";

// Component to test
import DHComments from "components/DHComments";

// Define Mocks
jest.mock("draft-convert", () => {
  return {
    convertFromHTML: jest.fn(),
    convertToRaw: jest.fn(),
    convertToHTML: jest.fn().mockReturnValue("<p>Test content</p>"), // Mock the return value of convertToHTML
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

    const { container, getByText } = render(
      <ThemeProvider theme={theme}>
        <DHComments comments={comments} pageName={pageName} user={user} />
      </ThemeProvider>
    );

    // Get reply button
    const replyBtn = getByText("Reply...");
    fireEvent.click(replyBtn);

    expect(container).toMatchSnapshot();
  });
});
