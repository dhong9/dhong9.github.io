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
import { getRequest, postRequest } from "services/baseService";
import { imgToExcel, downloadFile } from "services/imageConverterService";

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

  it("sends image conversion request", () => {
    // Create success and error spy functions
    const success = jest.fn(),
      error = jest.fn();

    // Send image
    imgToExcel("path/to/image.png", success, error);

    // Verify that postRequest was called correctly
    const image = "path/to/image.png";
    expect(postRequest).toHaveBeenCalledWith("imgconverter/img_to_excel", image, success, error);
  });

  it("gets files", () => {
    // Create success and error spy functions
    const success = jest.fn(),
      error = jest.fn();

    // Get image
    const fileName = "sample.png";
    downloadFile(fileName, success, error);

    // Verify that getRequest was called correctly
    expect(getRequest).toHaveBeenCalledWith("output/" + fileName, success, error);
  });
});
