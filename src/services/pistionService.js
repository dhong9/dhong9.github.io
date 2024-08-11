/**
=========================================================
* Danyo-1.2
=========================================================

* Copyright 2024 Danyo (https://www.danyo.tech)

Coded by www.danyo.tech

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Base services
import { getRequest } from "services/baseService";

// Pistion code exeucution base URL
const baseURL = "https://emkc.org/api/v2/piston/";

export const getRunTimes = (success) => {
  getRequest("runtimes", success, console.error, baseURL);
};
