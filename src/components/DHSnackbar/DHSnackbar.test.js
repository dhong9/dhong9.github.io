import renderer from "react-test-renderer";
import DHSnackbar from "components/DHSnackbar";

// Mocks
jest.mock("@mui/material/Snackbar", () => {
  const { forwardRef } = jest.requireActual("react");
  const Snackbar = forwardRef((props, ref) => (
    <div ref={ref}>
      Mock Snackbar
      {props.children}
    </div>
  ));
  return {
    __esModule: true,
    default: Snackbar,
  };
});
jest.mock("@mui/material/Alert", () => {
  const { forwardRef } = jest.requireActual("react");
  const Alert = forwardRef((props, ref) => (
    <div ref={ref}>
      Mock Alert
      {props.children}
    </div>
  ));
  return {
    __esModule: true,
    default: Alert,
  };
});
jest.mock("@mui/material/Slide", () => {
  const { forwardRef } = jest.requireActual("react");
  return {
    __esModule: true,
    default: forwardRef(() => <div>Mock Slide</div>),
  };
});

describe("DHSnackbar", () => {
  it("renders", () => {
    const component = renderer.create(<DHSnackbar />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
