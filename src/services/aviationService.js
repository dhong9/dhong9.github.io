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

const access_key = "93474ad35a6f530aac1e465eaded9033";
const params = {
  access_key,
};

export const getFlights = () => {
  getRequest(
    "flights/",
    (response) => {
      const apiResponse = response.data;
      if (Array.isArray(apiResponse["results"])) {
        apiResponse["results"].forEach((flight) => {
          if (!flight["live"]["is_ground"]) {
            console.log(
              `${flight["airline"]["name"]} flight ${flight["flight"]["iata"]}`,
              `from ${flight["departure"]["airport"]} (${flight["departure"]["iata"]})`,
              `to ${flight["arrival"]["airport"]} (${flight["arrival"]["iata"]}) is in the air.`
            );
          }
        });
      }
    },
    console.error,
    params,
    "https://api.aviationstack.com/v1/"
  );
};
