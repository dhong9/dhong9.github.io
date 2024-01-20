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
