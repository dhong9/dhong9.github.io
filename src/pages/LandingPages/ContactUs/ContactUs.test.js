import renderer from "react-test-renderer";
import ContactUs from "pages/LandingPages/ContactUs";
import { addContact } from "services/emailService";

// Mocks
jest.mock("components/MKBox", () => {
    const { forwardRef } = jest.requireActual("react");
    return {
        __esModule: true,
        default: forwardRef(() => <div>Mock Box</div>)
    };
});

it("renders", () => {
    const component = renderer.create(<ContactUs />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

it ("sends email", () => {
    const component = renderer.create(<ContactUs />);
    component.root.findByType("button").props.onClick();
});