import renderer from "react-test-renderer";
import MKAlert from "components/MKAlert";

// Mocks
jest.mock("components/MKBox", () => {
    const { forwardRef } = jest.requireActual("react");
    return {
        __esModule: true,
        default: forwardRef(() => <div>Mock Box</div>)
    };
});
jest.mock("components/MKAlert/MKAlertRoot", () => {
    const { forwardRef } = jest.requireActual("react");
    return {
        __esModule: true,
        default: forwardRef(() => <div>MKAlertRoot</div>)
    };
});
jest.mock("components/MKAlert/MKAlertCloseIcon", () => {
    const { forwardRef } = jest.requireActual("react");
    return {
        __esModule: true,
        default: forwardRef(() => <div>MKAlertCloseIcon</div>)
    };
});
jest.mock("@mui/material/Fade", () => {
    const { forwardRef } = jest.requireActual("react");
    return {
        __esModule: true,
        default: forwardRef(() => <div>Fade</div>)
    };
});

describe("MKAlert", () => {
    it("renders", () => {
        const component = renderer.create(<MKAlert />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("renders dismissible", () => {
        const component = renderer.create(<MKAlert dismissible={true} />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});