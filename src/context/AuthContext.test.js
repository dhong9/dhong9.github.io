// React testing libraries
import renderer from "react-test-renderer";
import React from "react";

// Service functions
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
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
  let useEffect;

  const mockUseEffect = () => {
    useEffect.mockImplementationOnce((f) => f());
  };

  beforeEach(() => {
    useEffect = jest.spyOn(React, "useEffect");
    mockUseEffect();
  });

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
});
