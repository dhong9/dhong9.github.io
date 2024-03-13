/**
=========================================================
* Danyo-1.1
=========================================================

* Copyright 2024 Danyo (https://www.danyo.tech)

Coded by www.danyo.tech

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import axios from "axios";
import { getGoogleUser } from "services/googleService";

jest.mock("axios");

describe("GoogleService", () => {
  const baseURL = "https://www.googleapis.com/oauth2/v1/userinfo?access_token=";
  const success = jest.fn();
  const error = jest.fn();
  const data = {};

  beforeEach(() => {
    axios.get.mockResolvedValue(data);
  });

  it("Gets Google user", () => {
    const userAccessToken = "abcdefg";
    const params = {
      headers: {
        Authorization: `Bearer ${userAccessToken}`,
        Accept: "application/json",
      },
    };
    getGoogleUser(userAccessToken, success, error);

    // Verify that getGoogleUser was called correctly
    expect(axios.get).toHaveBeenCalledWith(baseURL + userAccessToken, params);
  });
});
