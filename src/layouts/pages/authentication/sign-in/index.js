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

// Material Kit 2 React pages
import SignIn from "pages/LandingPages/SignIn";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

export default function SignInPage({ onsuccess }) {
  // onsuccess will be called by parent component

  return <SignIn onsuccess={onsuccess} />;
}

// Typechecking props of SignInPage
SignInPage.propTypes = {
  onsuccess: PropTypes.func,
};

SignInPage.defaultProps = {
  onsuccess: null,
};
