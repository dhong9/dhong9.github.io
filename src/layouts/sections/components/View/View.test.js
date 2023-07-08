// React testing libraries
import renderer from "react-test-renderer";

// Material Kit 2 React themes
import { ThemeProvider } from "@mui/material/styles";
import theme from "assets/theme";

// Component to test
import View from "layouts/sections/components/View";

describe("View", () => {
  it("renders", () => {
    const component = renderer.create(
      <ThemeProvider theme={theme}>
        <View title="Test View" code="" height="100%">
          Test View
        </View>
      </ThemeProvider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
