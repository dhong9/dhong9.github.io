/**
=========================================================
* Danyo-1.2
=========================================================

* Copyright 2025 Danyo (https://www.danyo.tech)

Coded by www.danyo.tech

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { postRequest } from "services/baseService";

const imgToExcel = (image, success, error) => {
  postRequest("imgconverter/img_to_excel/", image, success, error);
};
