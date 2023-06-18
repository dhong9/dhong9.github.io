import renderer from 'react-test-renderer';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import MKButtonRoot from 'components/MKButton/MKButtonRoot';
import pxToRem from "assets/theme/functions/pxToRem";
import linearGradient from "assets/theme/functions/linearGradient";
import boxShadow from "assets/theme/functions/boxShadow";
import rgba  from "assets/theme/functions/rgba";

describe('MKButtonRoot', () => {
    it('renders', () => {
        // Create a dummy theme object with the mock pxToRem
        const theme = createTheme({
            palette: {
                white: {
                    main: "#00F"
                },
                gradients: {
                    "#FF00FF": "#FF00FF"
                }
            },
            typography: {
                size: {
                    xl: "16pt"
                },
                fontWeightMedium: 500
            },
            borders: {
                borderRadius: 10
            },
            boxShadows: {
                colored: {"#FF00FF": "#FF00FF"}
            },
            functions: { pxToRem, linearGradient, boxShadow, rgba }
        });
        const ownerState = {
            color: "#FF00FF"
        };

        const component = renderer.create(
            <ThemeProvider theme={theme}>
                <MKButtonRoot onClick={jest.fn()} ownerState={ownerState}>Hello!</MKButtonRoot>
            </ThemeProvider>
        );

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
