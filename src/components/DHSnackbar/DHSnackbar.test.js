// React testing libraries
import { render } from "@testing-library/react";

// Component to test
import DHSnackbar from "components/DHSnackbar";

describe("DHSnackbar", () => {
  it("renders", () => {
    const { container } = render(
      <DHSnackbar
        open={true}
        onClose={jest.fn()}
        severity="success"
        message="Snackbar message"
      />
    );

    expect(container).toMatchSnapshot();
  });
});