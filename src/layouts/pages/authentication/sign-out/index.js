/**
=========================================================
* Danyo-1.1
=========================================================

* Copyright 2024 Danyo (https://www.danyo.tech)

Coded by www.danyo.tech

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// React
import { useEffect } from "react";

// Sign Out component
import SignOut from "pages/LandingPages/SignOut";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

export default function SignOutPage({ onload }) {
  // onload will be called by parent component
  useEffect(onload, []);

  return <SignOut />;
}

// Typechecking props of SignOutPage
SignOutPage.propTypes = {
  onload: PropTypes.func,
};

SignOutPage.defaultProps = {
  onload: null,
};
