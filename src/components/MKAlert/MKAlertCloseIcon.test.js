import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import MKAlertCloseIcon from 'components/MKAlert/MKAlertCloseIcon';

// Mock implementation of pxToRem
const pxToRem = (value) => `${value}px`;

describe('MKAlertCloseIcon', () => {
    it('renders', () => {
        // Create a dummy theme object with the mock pxToRem
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
        functions: { pxToRem }
    });

        const component = renderer.create(
            <ThemeProvider theme={theme}>
                <MKAlertCloseIcon onClick={jest.fn()}>Hello!</MKAlertCloseIcon>
            </ThemeProvider>
        );

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
