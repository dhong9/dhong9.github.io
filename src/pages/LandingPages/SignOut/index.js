/**
=========================================================
* Danyo-1.2
=========================================================

* Copyright 2024 Danyo (https://www.danyo.tech)

Coded by www.danyo.tech

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useEffect, useContext } from "react";

// Authorization
import AuthContext from "context/AuthContext";

function SignOutBasic() {
  const { logoutUser } = useContext(AuthContext);

  useEffect(logoutUser, []);

  return <div>Logging out...</div>;
}

export default SignOutBasic;
