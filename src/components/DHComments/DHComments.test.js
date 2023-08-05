// React testing libraries
import React from "react";
import renderer from "react-test-renderer";

// Material Kit 2 React themes
import { ThemeProvider } from "@mui/material/styles";
import theme from "assets/theme";

// Component to test
import DHComments from "components/DHComments";

// Mocks

describe("DHComments", () => {
  let useEffect;

  const mockUseEffect = () => {
    useEffect.mockImplementationOnce((f) => f());
  };

  beforeEach(() => {
    useEffect = jest.spyOn(React, "useEffect");
    mockUseEffect();
  });

  it("renders", () => {
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

    const component = renderer.create(
      <ThemeProvider theme={theme}>
        <DHComments comments={comments} />
      </ThemeProvider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
