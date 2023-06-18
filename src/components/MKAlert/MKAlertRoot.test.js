import renderer from 'react-test-renderer';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import MKAlertRoot from 'components/MKAlert/MKAlertRoot';
import pxToRem from "assets/theme/functions/pxToRem";
import linearGradient from "assets/theme/functions/linearGradient";

describe('MKAlertRoot', () => {
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
            functions: { pxToRem, linearGradient }
        });
        const ownerState = {
            color: "#FF00FF"
        };

        const component = renderer.create(
            <ThemeProvider theme={theme}>
                <MKAlertRoot onClick={jest.fn()} ownerState={ownerState}>Hello!</MKAlertRoot>
            </ThemeProvider>
        );

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
