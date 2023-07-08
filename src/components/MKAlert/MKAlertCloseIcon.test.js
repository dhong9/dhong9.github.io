import React from 'react';
import renderer from 'react-test-renderer';
import MKAlertCloseIcon from 'components/MKAlert/MKAlertCloseIcon';

// Material Kit 2 React themes
import { ThemeProvider } from '@mui/material/styles';
import theme from "assets/theme";

describe('MKAlertCloseIcon', () => {
    it('renders', () => {
        const component = renderer.create(
            <ThemeProvider theme={theme}>
                <MKAlertCloseIcon onClick={jest.fn()}>Hello!</MKAlertCloseIcon>
            </ThemeProvider>
        );

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
