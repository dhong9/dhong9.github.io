/**
=========================================================
* Danyo-1.2
=========================================================

* Copyright 2025 Danyo (https://www.danyo.tech)

Coded by www.danyo.tech

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { getRequest, postRequest } from "services/baseService";

/**
 * Sends image to be converted to Excel spreadsheet
 * @param {Object} image image upload data
 * @param {Function} success success callback
 * @param {Function} error error callback
 */
export const imgToExcel = (image, success, error) => {
  postRequest("imgconverter/img_to_excel", image, success, error);
};

/**
 * Downloads file from output folder
 * @param {string} fileName file to download
 * @param {Function} success success callback
 * @param {Function} error error callback
 */
export const downloadFile = (fileName, success, error) => {
  getRequest("output/" + fileName, success, error);
};
