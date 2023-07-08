import renderer from "react-test-renderer";
import MKTypographyRoot from "components/MKTypography/MKTypographyRoot";

// Material Kit 2 React themes
import { ThemeProvider } from '@mui/material/styles';
import theme from "assets/theme";

describe("MKTypographyRoot", () => {
    it("renders", () => {
        const component = renderer.create(
            <ThemeProvider theme={theme}>
                <MKTypographyRoot
                ownerState={{
                    color: "text",
                    textTransform: "capitalize",
                    verticalAlign: "middle",
                    fontWeight: "bold",
                    opacity: 1,
                    textGradient: false,
                }}
                >
                    Test Typography
                </MKTypographyRoot>
            </ThemeProvider>
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});