// React testing libraries
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

// Component to test
import DHEditor from "components/DHEditor";

// Mocks
jest.mock("draft-convert", () => {
  return {
    convertFromHTML: jest.fn(),
    convertToRaw: jest.fn(),
    convertToHTML: jest.fn().mockReturnValue("<p>Test content</p>"), // Mock the return value of convertToHTML
  };
});

describe("DHEditor", () => {
  it("updates the convertedContent", () => {
    const { getByText, getByLabelText  } = render(<DHEditor />);

    // Initially, the convertedContent should not be rendered in the document
    expect(getByText("Test content")).toBeInTheDocument();

    // Find the contenteditable text box using the aria-label attribute
    const textBox = getByLabelText("rdw-editor");;

    // Trigger a change in the editorState by typing into the text box
    fireEvent.input(textBox, { target: { textContent: "New content" } });
    // After the change, the convertedContent should be rendered with the mocked HTML content
    expect(getByText("New content")).toBeInTheDocument();
  });
});
