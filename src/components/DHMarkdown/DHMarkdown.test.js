// React testing libraries
import renderer from "react-test-renderer";

// Component to test
import DHMarkdown from "components/DHMarkdown";

describe("DHMarkdown", () => {
  it("renders h1 component", () => {
    const component = renderer.create(<DHMarkdown># Hello world!</DHMarkdown>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders h2 component", () => {
    const component = renderer.create(<DHMarkdown>## Hello world!</DHMarkdown>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders h3 component", () => {
    const component = renderer.create(<DHMarkdown>### Hello world!</DHMarkdown>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders h4 component", () => {
    const component = renderer.create(<DHMarkdown>#### Hello world!</DHMarkdown>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders p component", () => {
    const component = renderer.create(<DHMarkdown>Hello world!</DHMarkdown>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders a component", () => {
    const component = renderer.create(<DHMarkdown>[Hello world](https://example.com)</DHMarkdown>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
