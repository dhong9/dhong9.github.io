/**
=========================================================
* Danyo-1.1
=========================================================

* Copyright 2024 Danyo (https://www.danyo.tech)

Coded by www.danyo.tech

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { getRequest, postRequest } from "services/baseService";

export const getCategories = (success) => {
  getRequest("categories/", success, console.error);
};

export const addCategory = (success, name, description) => {
  postRequest(
    "categories",
    {
      name,
      description,
    },
    success,
    console.error
  );
};
