/**
=========================================================
* Danyo-1.2
=========================================================

* Copyright 2025 Danyo (https://www.danyo.tech)

Coded by www.danyo.tech

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { getRequest } from "services/baseService";
import { getImages } from "services/imageConverterService";

const mock = new MockAdapter(axios);

const imageData = {};

jest.mock("services/baseService", () => ({
  getRequest: jest.fn(),
  postRequest: jest.fn(),
}));

mock.onPost().reply(200, imageData);

describe("Image Converter Service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("gets images", () => {
    // Create success and error spy functions
    const success = jest.fn(),
      error = jest.fn();

    // Get files
    getImages(success, error);

    // Verify that getRequest was called correctly
    expect(getRequest).toHaveBeenCalledWith("imgconverter/", success, error);
  });
});
