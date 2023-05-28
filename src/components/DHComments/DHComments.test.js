import renderer from "react-test-renderer";
import DHComments from "components/DHComments";

// Mocks
jest.mock("components/MKButton", () => {
    const { forwardRef } = jest.requireActual("react");
    return {
        __esModule: true,
        default: forwardRef(() => <button>Mock Button</button>)
    };
});

it("renders", () => {
    const component = renderer.create(<DHComments />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});