import renderer from "react-test-renderer";
import MKTypographyRoot from "components/MKTypography/MKTypographyRoot";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import linearGradient from "assets/theme/functions/linearGradient";
import pxToRem from "assets/theme/functions/pxToRem";

describe("MKTypographyRoot", () => {
    it("renders", () => {
        const theme = createTheme({
            palette: {
                white: {
                    main: "#00F"
                }
            },
            typography: {
                size: {
                    xl: "16pt"
                },
                fontWeightMedium: 500
            },
            functions: { pxToRem, linearGradient }
        });
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