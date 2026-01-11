/**
=========================================================
* Danyo-1.2
=========================================================

* Copyright 2026 Danyo (https://www.danyo.tech)

Coded by www.danyo.tech

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { getRequest } from "services/baseService";

const access_key = "22f1074cd230a2f9337db7b9eefeb0e9";
const params = {
  access_key: access_key,
};

export const getFlights = () => {
  getRequest(
    "flights",
    console.log,
    console.error,
    { params },
    "https://api.aviationstack.com/v1/"
  );
};
