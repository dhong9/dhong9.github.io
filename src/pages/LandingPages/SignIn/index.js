/**
=========================================================
* Material Kit 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useContext } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";

// Material Kit 2 React example components
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import SimpleFooter from "examples/Footers/SimpleFooter";

// DH React components
import DHSnackbar from "components/DHSnackbar";

// Material Kit 2 React page layout routes
import routes from "routes";

// Authentication
import AuthContext from "context/AuthContext";
import LoginGithub from "react-login-github";

// Images
import bgImage from "assets/images/neons_medium.png";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// CSS
import "./SignIn.css";

function SignInBasic({ onsuccess }) {
  const { loginUser, googleLogin } = useContext(AuthContext);
  const [rememberMe, setRememberMe] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [loginSeverity, setLoginSeverity] = useState("info");
  const [loginMessage, setLoginMessage] = useState("");
  const [formErrors, setFormErrors] = useState([]);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check form data
    const errors = [];
    if (!username.trim()) {
      errors.push("Username is required.");
    }
    if (!password.trim()) {
      errors.push("Password is required.");
    }
    setFormErrors(errors);

    // If form input requirements are met,
    // sign the user in
    if (!errors[0]) {
      loginUser(username, password, rememberMe, onsuccess, (error) => {
        setLoginSeverity("error");
        console.log("Login error:");
        console.error(error);

        if (error.response?.data) {
          for (const field in error.response.data) {
            setLoginMessage(error.response.data[field]);
          }
        } else {
          setLoginMessage("An unexpected error has occurred.");
          console.error(error);
        }
        setSnackbarOpen(true);
      });
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason !== "clickaway") {
      setSnackbarOpen(false);
    }
  };

  return (
    <>
      <DefaultNavbar routes={routes} transparent light />
      <DHSnackbar
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        severity={loginSeverity}
        message={loginMessage}
      />
      <MKBox
        position="absolute"
        top={0}
        left={0}
        zIndex={1}
        width="100%"
        minHeight="100vh"
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.dark.main, 0.6),
              rgba(gradients.dark.state, 0.6)
            )}, url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <MKBox px={1} width="100%" height="100vh" mx="auto" position="relative" zIndex={2}>
        <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
          <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
            <Card>
              <MKBox
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                mx={2}
                mt={-3}
                p={2}
                mb={1}
                textAlign="center"
              >
                <MKTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                  Sign in
                </MKTypography>
              </MKBox>
              <MKBox pt={4} pb={3} px={3}>
                <LoginGithub
                  clientId="fad22315b080996a7aaa"
                  onSuccess={console.log}
                  onFailure={console.error}
                  buttonText={
                    <MKTypography component={MuiLink} href="#" variant="body1">
                      <GitHubIcon color="inherit" />
                      <span>Sign in with GitHub</span>
                    </MKTypography>
                  }
                  className="socialAuthButton"
                />
                <MKButton className="socialAuthButton" onClick={googleLogin}>
                  <MKTypography component={MuiLink} href="#" variant="body1">
                    <GoogleIcon color="inherit" />
                    <span>Sign in with Google</span>
                  </MKTypography>
                </MKButton>
                <Divider variant="middle">
                  <MKTypography variant="h6" fontWeight="medium">
                    OR
                  </MKTypography>
                </Divider>
                <MKBox component="form" role="form">
                  <MKBox mb={2}>
                    <MKInput
                      type="text"
                      label="Username"
                      onChange={(e) => setUsername(e.target.value)}
                      fullWidth
                    />
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput
                      type="password"
                      label="Password"
                      onChange={(e) => setPassword(e.target.value)}
                      fullWidth
                    />
                  </MKBox>
                  <MKBox display="flex" alignItems="center" ml={-1}>
                    <Switch checked={rememberMe} onChange={handleSetRememberMe} />
                    <MKTypography
                      variant="button"
                      fontWeight="regular"
                      color="text"
                      onClick={handleSetRememberMe}
                      sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                    >
                      &nbsp;&nbsp;Remember me
                    </MKTypography>
                  </MKBox>
                  {/* Show any form errors */}
                  {formErrors[0] ? (
                    <MKBox display="flex" alignItems="center" ml={-1}>
                      <ul style={{ color: "red", fontSize: "10pt" }}>
                        {formErrors.map((error, i) => (
                          <li key={i}>{error}</li>
                        ))}
                      </ul>
                    </MKBox>
                  ) : (
                    <div></div>
                  )}
                  <MKBox mt={4} mb={1}>
                    <MKButton variant="gradient" color="info" onClick={handleSubmit} fullWidth>
                      Sign In
                    </MKButton>
                  </MKBox>
                  <MKBox mt={3} mb={1} textAlign="center">
                    <MKTypography variant="button" color="text">
                      Don&apos;t have an account?{" "}
                      <MKTypography
                        component={Link}
                        to="/pages/authentication/sign-up"
                        variant="button"
                        color="info"
                        fontWeight="medium"
                        textGradient
                      >
                        Sign up
                      </MKTypography>
                    </MKTypography>
                  </MKBox>
                  <Divider variant="middle" />
                  <MKBox mt={3} mb={1} textAlign="center">
                    <MKTypography
                      component={Link}
                      to="/pages/authentication/forgot"
                      variant="button"
                      color="primary"
                      fontWeight="medium"
                      textGradient
                    >
                      Forgot password?
                    </MKTypography>
                  </MKBox>
                </MKBox>
              </MKBox>
            </Card>
          </Grid>
        </Grid>
      </MKBox>
      <MKBox width="100%" position="absolute" zIndex={2} bottom="1.625rem">
        <SimpleFooter light />
      </MKBox>
    </>
  );
}

export default SignInBasic;

// Typechecking props of SignOutPage
SignInBasic.propTypes = {
  onsuccess: PropTypes.func,
};

SignInBasic.defaultProps = {
  onsuccess: null,
};
