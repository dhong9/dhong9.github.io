import renderer from "react-test-renderer";
import DefaultNavbarMobile from "examples/Navbars/DefaultNavbar/DefaultNavbarMobile";

// Icons
import GitHubIcon from "@mui/icons-material/GitHub";

// Mocks
jest.mock("@mui/material/Container", () => {
  const { forwardRef } = jest.requireActual("react");
  return {
    __esModule: true,
    default: forwardRef(() => <div>MUI Container</div>),
  };
});
jest.mock("@mui/material/Icon", () => {
  const { forwardRef } = jest.requireActual("react");
  return {
    __esModule: true,
    default: forwardRef(() => <div>MUI Icon</div>),
  };
});
jest.mock("@mui/material/Popper", () => {
  const { forwardRef } = jest.requireActual("react");
  return {
    __esModule: true,
    default: forwardRef(() => <div>MUI Popper</div>),
  };
});
jest.mock("@mui/material/Grow", () => {
  const { forwardRef } = jest.requireActual("react");
  return {
    __esModule: true,
    default: forwardRef(() => <div>MUI Grow</div>),
  };
});
jest.mock("@mui/material/Grid", () => {
  const { forwardRef } = jest.requireActual("react");
  return {
    __esModule: true,
    default: forwardRef(() => <div>MUI Grid</div>),
  };
});
jest.mock("@mui/material/Divider", () => {
  const { forwardRef } = jest.requireActual("react");
  return {
    __esModule: true,
    default: forwardRef(() => <div>MUI Divider</div>),
  };
});
jest.mock("@mui/material/Link", () => {
  const { forwardRef } = jest.requireActual("react");
  return {
    __esModule: true,
    default: forwardRef(() => <div>MUI Link</div>),
  };
});
jest.mock("components/MKBox", () => {
  const { forwardRef } = jest.requireActual("react");
  const MKBox = forwardRef((props, ref) => (
    <div ref={ref}>
      Mock MKBox
      {props.children}
    </div>
  ));
  MKBox.propTypes = {}; // Add any necessary prop types here
  return {
    __esModule: true,
    default: MKBox,
  };
});
jest.mock("components/MKTypography", () => {
  const { forwardRef } = jest.requireActual("react");
  return {
    __esModule: true,
    default: forwardRef(() => <div>Mock Typography</div>),
  };
});
jest.mock("components/MKButton", () => {
  const { forwardRef } = jest.requireActual("react");
  return {
    __esModule: true,
    default: forwardRef(() => <button>Mock Button</button>),
  };
});

describe("DefaultNavbarMobile", () => {
  it("renders with route", () => {
    const component = renderer.create(
      <DefaultNavbarMobile
        routes={[{ label: "Navbar", route: "/default", icon: <GitHubIcon /> }]}
      />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders without route", () => {
    const component = renderer.create(
      <DefaultNavbarMobile routes={[{ label: "Regular", icon: <GitHubIcon /> }]} />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
