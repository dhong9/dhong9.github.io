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
    it("renders 'mount' status", () => {
        const component = renderer.create(<MKAlert />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("renders 'fadeOut' status", () => {
        const component = renderer.create(<MKAlert mount="fadeOut" />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("renders default status", () => {
        const component = renderer.create(<MKAlert mount="default" />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});