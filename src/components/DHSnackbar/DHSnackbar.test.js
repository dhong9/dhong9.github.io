import renderer from "react-test-renderer";
import DHSnackbar from "components/DHSnackbar";

// Mocks
jest.mock("@mui/material/Snackbar", () => {
    const { forwardRef } = jest.requireActual("react");
    return {
        __esModule: true,
        default: forwardRef(() => <div>Mock Snackbar</div>)
    };
});
jest.mock("@mui/material/Alert", () => {
    const { forwardRef } = jest.requireActual("react");
    return {
        __esModule: true,
        default: forwardRef(() => <div>Mock Alert</div>)
    };
});
jest.mock("@mui/material/Slide", () => {
    const { forwardRef } = jest.requireActual("react");
    return {
        __esModule: true,
        default: forwardRef(() => <div>Mock Slide</div>)
    };
});

describe("DHSnackbar", () => {

    it("renders", () => {
        const component = renderer.create(<DHSnackbar />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });


});