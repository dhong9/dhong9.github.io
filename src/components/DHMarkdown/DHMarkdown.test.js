// React testing libraries
import renderer from "react-test-renderer";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import theme from "assets/theme";

// Mock the MKTypography component
import MKTypography from "components/MKTypography";
jest.mock("components/MKTypography", () => {
  return {
    __esModule: true,
    default: jest.fn().mockImplementation((props) => {
      const { children } = props;
      return <div {...props}>{children}</div>;
    }),
  };
});

// Component to test
import DHMarkdown from "components/DHMarkdown";

describe("DHMarkdown", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders h1 component", () => {
    const component = renderer.create(<DHMarkdown># Hello world!</DHMarkdown>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    expect(MKTypography).toHaveBeenCalledWith(
      expect.objectContaining({
        gutterBottom: true,
        variant: "h4",
        component: "h1",
        children: ["Hello world!"],
      }),
      {}
    );
  });

  it("renders h2 component", () => {
    const component = renderer.create(<DHMarkdown>## Hello world!</DHMarkdown>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    expect(MKTypography).toHaveBeenCalledWith(
      expect.objectContaining({
        gutterBottom: true,
        variant: "h6",
        component: "h2",
        children: ["Hello world!"],
      }),
      {}
    );
  });

  it("renders h3 component", () => {
    const component = renderer.create(<DHMarkdown>### Hello world!</DHMarkdown>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    expect(MKTypography).toHaveBeenCalledWith(
      expect.objectContaining({
        gutterBottom: true,
        variant: "subtitle1",
        children: ["Hello world!"],
      }),
      {}
    );
  });

  it("renders h4 component", () => {
    const component = renderer.create(<DHMarkdown>#### Hello world!</DHMarkdown>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    expect(MKTypography).toHaveBeenCalledWith(
      expect.objectContaining({
        gutterBottom: true,
        variant: "caption",
        paragraph: true,
        children: ["Hello world!"],
      }),
      {}
    );
  });

  it("renders p component", () => {
    const component = renderer.create(<DHMarkdown>Hello world!</DHMarkdown>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    expect(MKTypography).toHaveBeenCalledWith(
      expect.objectContaining({
        paragraph: true,
        children: ["Hello world!"],
      }),
      {}
    );
  });

  it("renders a component", () => {
    const component = renderer.create(<DHMarkdown>[Link](https://example.com)</DHMarkdown>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders li component", () => {
    const component = renderer.create(
      <ThemeProvider theme={theme}>
        <DHMarkdown>- Item 1 - Item 2</DHMarkdown>
      </ThemeProvider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
