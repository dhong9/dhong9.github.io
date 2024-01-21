/*
=========================================================
* Material Kit 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// React
import { useEffect } from "react";

// Material Kit 2 React pages
import SignIn from "pages/LandingPages/SignIn";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

export default function SignInPage({ onsuccess }) {
  // onsuccess will be called by parent component
  useEffect(onsuccess, []);

  return <SignIn />;
}

// Typechecking props of SignOutPage
SignInPage.propTypes = {
  onsuccess: PropTypes.func,
};

SignInPage.defaultProps = {
  onsuccess: null,
};
