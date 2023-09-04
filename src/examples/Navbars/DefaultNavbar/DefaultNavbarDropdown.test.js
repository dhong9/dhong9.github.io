import renderer from "react-test-renderer";
import DefaultNavbarDropdown from "examples/Navbars/DefaultNavbar/DefaultNavbarDropdown";

// Icons
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";

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
  return {
    __esModule: true,
    default: jest.fn().mockImplementation((props) => {
      const { children } = props;
      return <div {...props}>{children}</div>;
    }),
  };
});
jest.mock("components/MKTypography", () => {
  return {
    __esModule: true,
    default: jest.fn().mockImplementation((props) => {
      const { children } = props;
      return <div {...props}>{children}</div>;
    }),
  };
});
jest.mock("components/MKButton", () => {
  const { forwardRef } = jest.requireActual("react");
  return {
    __esModule: true,
    default: forwardRef(() => <button>Mock Button</button>),
  };
});

describe("DefaultNavbarDropdown", () => {
  it("renders with route", () => {
    const component = renderer.create(
      <DefaultNavbarDropdown
        routes={[{ label: "Navbar", route: "/default", icon: <GitHubIcon />, name: "Github" }]}
        collapse={false}
        icon={<FacebookIcon />}
        name="Routed Navbar"
      >
        <div>I have routes</div>
      </DefaultNavbarDropdown>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders without route", () => {
    const component = renderer.create(
      <DefaultNavbarDropdown
        routes={[{ label: "Regular", icon: <GitHubIcon />, name: "Github" }]}
        collapse={false}
        icon={<FacebookIcon />}
        name="Not Routed Navbar"
      >
        <div>I have no routes</div>
      </DefaultNavbarDropdown>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
