import renderer from "react-test-renderer";
import DefaultNavbarDropdown from "examples/Navbars/DefaultNavbar/DefaultNavbarDropdown";

// Mocks
jest.mock("@mui/material/Container", () => {
    const { forwardRef } = jest.requireActual("react");
    return {
        __esModule: true,
        default: forwardRef(() => <div>MUI Container</div>)
    };
});
jest.mock("@mui/material/Icon", () => {
    const { forwardRef } = jest.requireActual("react");
    return {
        __esModule: true,
        default: forwardRef(() => <div>MUI Icon</div>)
    };
});
jest.mock("@mui/material/Popper", () => {
    const { forwardRef } = jest.requireActual("react");
    return {
        __esModule: true,
        default: forwardRef(() => <div>MUI Popper</div>)
    };
});
jest.mock("@mui/material/Grow", () => {
    const { forwardRef } = jest.requireActual("react");
    return {
        __esModule: true,
        default: forwardRef(() => <div>MUI Grow</div>)
    };
});
jest.mock("@mui/material/Grid", () => {
    const { forwardRef } = jest.requireActual("react");
    return {
        __esModule: true,
        default: forwardRef(() => <div>MUI Grid</div>)
    };
});
jest.mock("@mui/material/Divider", () => {
    const { forwardRef } = jest.requireActual("react");
    return {
        __esModule: true,
        default: forwardRef(() => <div>MUI Divider</div>)
    };
});
jest.mock("@mui/material/Link", () => {
    const { forwardRef } = jest.requireActual("react");
    return {
        __esModule: true,
        default: forwardRef(() => <div>MUI Link</div>)
    };
});
jest.mock("components/MKBox", () => {
    const { forwardRef } = jest.requireActual("react");
    return {
        __esModule: true,
        default: forwardRef(() => <div>Mock Box</div>)
    };
});
jest.mock("components/MKTypography", () => {
    const { forwardRef } = jest.requireActual("react");
    return {
        __esModule: true,
        default: forwardRef(() => <div>Mock Typography</div>)
    };
});
jest.mock("components/MKButton", () => {
    const { forwardRef } = jest.requireActual("react");
    return {
        __esModule: true,
        default: forwardRef(() => <button>Mock Button</button>)
    };
});

describe("DefaultNavbarDropdown", () => {
    it("renders with route", () => {
        const component = renderer.create(<DefaultNavbarDropdown routes={[{ label: "Navbar", route: "/default" }]} />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("renders without route", () => {
        const component = renderer.create(<DefaultNavbarDropdown routes={[{ label: "Regular" }]} />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});