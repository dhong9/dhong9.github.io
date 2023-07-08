import renderer from 'react-test-renderer';
import MKButtonRoot from 'components/MKButton/MKButtonRoot';

// Material Kit 2 React themes
import { ThemeProvider } from '@mui/material/styles';
import theme from "assets/theme";

describe('MKButtonRoot', () => {
    it('renders', () => {
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
