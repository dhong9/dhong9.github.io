// React testing libraries
import renderer from "react-test-renderer";

// Component to test
import { AuthProvider } from "context/AuthContext";

// Mocks
jest.mock("react-router-dom", () => ({
    useNavigate: jest.fn,
  }));

describe("AuthContext", () => {
  it("renders", () => {
    const component = renderer.create(
      <AuthProvider>
        <div>Hello world!</div>
      </AuthProvider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
