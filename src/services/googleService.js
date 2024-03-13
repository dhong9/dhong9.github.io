/**
=========================================================
* Danyo-1.1
=========================================================

* Copyright 2024 Danyo (https://www.danyo.tech)

Coded by www.danyo.tech

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import axios from "axios";

export const getGoogleUser = (userAccessToken, onSuccess, onError) => {
  axios
    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${userAccessToken}`, {
      headers: {
        Authorization: `Bearer ${userAccessToken}`,
        Accept: "application/json",
      },
    })
    .then(onSuccess)
    .catch(onError);
};
