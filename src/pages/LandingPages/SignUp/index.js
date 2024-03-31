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

// react-router-dom components
import { useState, useContext } from "react";
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
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

// CSS
import "./SignUp.css";

function SignUpBasic() {
  const { registerUser, googleLogin } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [signupSeverity, setSignupSeverity] = useState("info");
  const [signupMessage, setSignupMessage] = useState("");
  const [formErrors, setFormErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check form data
    const errors = [];
    if (!username.trim()) {
      errors.push("Username is required.");
    }
    if (!password.trim()) {
      errors.push("Password is required.");
    }
    if (!password2.trim()) {
      errors.push("Password confirmation is required.");
    }
    setFormErrors(errors);

    // If form input requirements are met,
    // sign the user up
    if (!formErrors[0]) {
      registerUser(
        email,
        username,
        password,
        password2,
        () => {
          // Show success message
          setSignupSeverity("success");
          setSignupMessage("Successfully signed up!");
          setSnackbarOpen(true);
        },
        ({ response, message }) => {
          setSignupSeverity("error");

          // Error reporting priorites:
          // 1. User exists
          // 2. Email exists
          // 3. Password does not meet requirements
          if ("username" in response.data) {
            setSignupMessage(response.data["username"][0]);
          } else if ("email" in response.data) {
            setSignupMessage(response.data["email"][0]);
          } else {
            setSignupMessage(message);
          }
          setSnackbarOpen(true);
        }
      );
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
        severity={signupSeverity}
        message={signupMessage}
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
                  Sign up
                </MKTypography>
                <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
                  <Grid item xs={2}>
                    <MKTypography component={MuiLink} href="#" variant="body1" color="white">
                      <FacebookIcon color="inherit" />
                    </MKTypography>
                  </Grid>
                  <Grid item xs={2}>
                    <MKTypography component={MuiLink} href="#" variant="body1" color="white">
                      <GitHubIcon color="inherit" />
                    </MKTypography>
                  </Grid>
                  <Grid item xs={2}>
                    <MKTypography
                      onClick={googleLogin}
                      component={MuiLink}
                      href="#"
                      variant="body1"
                      color="white"
                    >
                      <GoogleIcon color="inherit" />
                    </MKTypography>
                  </Grid>
                </Grid>
              </MKBox>
              <MKBox pt={4} pb={3} px={3}>
                <MKBox component="form" role="form">
                  <LoginGithub
                    clientId="fad22315b080996a7aaa"
                    onSuccess={console.log}
                    onFailure={console.error}
                    buttonText={
                      <MKTypography component={MuiLink} href="#" variant="body1" color="white">
                        <GitHubIcon color="inherit" />
                        <span>Sign in with GitHub</span>
                      </MKTypography>
                    }
                    className="GithubLogin"
                  />
                  <MKButton className="GOOGLE" onClick={googleLogin}>
                    <MKTypography component={MuiLink} href="#" variant="body1" color="white">
                      <GoogleIcon color="inherit" />
                      <span>Sign in with GitHub</span>
                    </MKTypography>
                  </MKButton>
                  <Divider>
                    <MKTypography variant="h6" fontWeight="medium">
                      OR
                    </MKTypography>
                  </Divider>
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
                      type="email"
                      label="Email"
                      onChange={(e) => setEmail(e.target.value)}
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
                  <MKBox mb={2}>
                    <MKInput
                      type="password"
                      label="Confirm Password"
                      onChange={(e) => setPassword2(e.target.value)}
                      fullWidth
                    />
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
                    <MKButton
                      variant="gradient"
                      color="info"
                      onClick={handleSubmit}
                      component={MuiLink}
                      to="/verify-email/1"
                      fullWidth
                    >
                      sign up
                    </MKButton>
                  </MKBox>
                  <MKBox mt={3} mb={1} textAlign="center">
                    <MKTypography variant="button" color="text">
                      Already have an account?{" "}
                      <MKTypography
                        component={Link}
                        to="/pages/authentication/sign-in"
                        variant="button"
                        color="info"
                        fontWeight="medium"
                        textGradient
                      >
                        Sign in
                      </MKTypography>
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

export default SignUpBasic;
