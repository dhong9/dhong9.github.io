import renderer from "react-test-renderer";
import ForumHeader from "components/ForumHeader";

describe("ForumHeader", () => {
  it("renders", () => {
    const categories = [
      { id: 1, name: "Computers", description: "All about computers" },
      { id: 2, name: "Wildlife", description: "All about wildlife" },
    ];
    const component = renderer.create(<ForumHeader categories={categories} />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
