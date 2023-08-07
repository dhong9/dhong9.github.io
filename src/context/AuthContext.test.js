// React testing libraries
import renderer from "react-test-renderer";
import { useContext } from "react";

// Service functions
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { getRequest, postRequest } from "services/baseService";
const mock = new MockAdapter(axios);

// Component to test
import AuthContext, { AuthProvider } from "context/AuthContext";

// Mocks
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn,
}));

jest.mock("services/baseService", () => ({
  getRequest: jest.fn(),
  postRequest: jest.fn(),
}));

mock.onGet("/accounts/token/").reply(200, {});
mock.onPost("/accounts/token/").reply(200, {});

describe("AuthContext", () => {
  it("renders", () => {
    const contextData = {
      loginUser: jest.fn()
    };

    const component = renderer.create(
      <AuthContext.Provider value={contextData}>
        <AuthProvider>
          Hello world!
        </AuthProvider>
      </AuthContext.Provider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("updates token", () => {
    const contextData = {
      loginUser: jest.fn()
    };

    const component = renderer.create(
      <AuthContext.Provider value={contextData}>
        <AuthProvider>
          Hello world!
        </AuthProvider>
      </AuthContext.Provider>
    );

    jest.useFakeTimers();
    setTimeout(() => {
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    }, 4 * 1000 * 60);
    jest.runAllTimers();
  });
});
