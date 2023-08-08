// React testing libraries
import React from "react";
import { render, fireEvent } from "@testing-library/react";

// Material Kit 2 React themes
import { ThemeProvider } from "@mui/material/styles";
import theme from "assets/theme";

// Component to test
import DHComments from "components/DHComments";

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

    const { container, getByText, getByPlaceholderText } = render(
      <ThemeProvider theme={theme}>
        <DHComments comments={comments} pageName={pageName} user={user} />
      </ThemeProvider>
    );

    // Click on the reply button
    const replyButton = getByText("Reply...");
    fireEvent.click(replyButton);

    // Write something in the reply box
    const commentBox = getByPlaceholderText("Add a comment");
    fireEvent.change(commentBox, { target: { value: "Connect 4 is fun!" } });

    // Submit the comment
    const addButton = getByText("Add");
    fireEvent.click(addButton);

    expect(container).toMatchSnapshot();
  });
});
