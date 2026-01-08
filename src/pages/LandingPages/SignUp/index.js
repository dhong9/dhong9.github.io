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
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

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

// Images
import bgImage from "assets/images/neons_medium.png";

// CSS
import "./SignUp.css";

function SignUpBasic() {
  const { registerUser } = useContext(AuthContext);
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
    if (password.trim() && password2.trim() && password !== password2) {
      errors.push("Password and confirmation values must match.");
    }
    setFormErrors(errors);

    // If form input requirements are met,
    // sign the user up
    if (!errors[0]) {
      registerUser(
        email,
        username,
        password,
        () => {
          // Show success message
          setSignupSeverity("success");
          setSignupMessage("Successfully signed up!");
          setSnackbarOpen(true);
        },
        (error) => {
          setSignupSeverity("error");

          // Error reporting priorites:
          // 1. Username
          // 2. Email
          // 3. Password
          if (error.response) {
            if (Object.prototype.hasOwnProperty.call(error.response.data, "username")) {
              setSignupMessage(error.response.data["username"]);
            } else if (Object.prototype.hasOwnProperty.call(error.response.data, "email")) {
              setSignupMessage(error.response.data["email"]);
            } else if (Object.prototype.hasOwnProperty.call(error.response.data, "password")) {
              setSignupMessage(error.response.data["password"]);
            } else if (Object.prototype.hasOwnProperty.call(error.response.data, "detail")) {
              setSignupMessage(error.response.data["detail"]);
            }
          } else {
            setSignupMessage("An unexpected error has occurred.");
            console.error(error);
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
              </MKBox>
              <MKBox pt={4} pb={3} px={3}>
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
