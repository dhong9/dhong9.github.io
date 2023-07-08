import renderer from "react-test-renderer";
import MKAlertRoot from "components/MKAlert/MKAlertRoot";

// Material Kit 2 React themes
import { ThemeProvider } from '@mui/material/styles';
import theme from "assets/theme";

describe("MKAlertRoot", () => {
  it("renders", () => {
    const ownerState = {
      color: "#FF00FF",
    };

    const component = renderer.create(
      <ThemeProvider theme={theme}>
        <MKAlertRoot onClick={jest.fn()} ownerState={ownerState}>
          Hello!
        </MKAlertRoot>
      </ThemeProvider>
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
