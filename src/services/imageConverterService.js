/**
=========================================================
* Danyo-1.2
=========================================================

* Copyright 2025 Danyo (https://www.danyo.tech)

Coded by www.danyo.tech

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { getRequest } from "services/baseService";

/**
 * Gets images uploaded
 * @param {*} success success callback
 * @param {*} error error callback
 */
export const getImages = (success, error) => {
  getRequest("imgconverter/", success, error);
};
