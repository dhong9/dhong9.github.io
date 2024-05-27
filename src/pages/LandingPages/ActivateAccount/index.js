/**
=========================================================
* Danyo-1.2
=========================================================

* Copyright 2024 Danyo (https://www.danyo.tech)

Coded by www.danyo.tech

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useEffect } from "react";

// Services
import { activateAccount } from "services/accountsService";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

function ActivateAccountBasic({ uid, token }) {
  useEffect(() => {
    activateAccount(uid, token, console.log, console.error);
  }, []);

  return <div>Activating account...</div>;
}

// Typechecking props for the ActivateAccountBasic
ActivateAccountBasic.propTypes = {
  uid: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
};

export default ActivateAccountBasic;
