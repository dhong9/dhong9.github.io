/**
=========================================================
* Danyo-1.1
=========================================================

* Copyright 2024 Danyo (https://www.danyo.tech)

Coded by www.danyo.tech

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { getRequest } from "services/baseService";

export const getUserProfile = (id, success) => {
  getRequest("accounts/profiles/" + id, success, console.error);
};
