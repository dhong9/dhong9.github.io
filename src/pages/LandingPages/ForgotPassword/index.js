/**
=========================================================
* Danyo-1.2
=========================================================

* Copyright 2024 Danyo (https://www.danyo.tech)

Coded by www.danyo.tech

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// react-router-dom components
import { useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Material Kit 2 React example components
import DefaultNavbar from "examples/Navbars/DefaultNavbar";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";

// DH React components
import DHSnackbar from "components/DHSnackbar";

// Material Kit 2 React page layout routes
import routes from "routes";

// Services
import { sendPasswordResetEmail } from "services/accountsService";

// Images
import bgImage from "assets/images/dominos.png";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [forgotSeverity, setForgotSeverity] = useState("info");
  const [forgotMessage, setForgotMessage] = useState("");
  const [formError, setFormError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const val = email.trim();
    setFormError(
      !val
        ? "Email address is required." // Field is empty
        : !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(val) // Field does not match email address pattern
        ? "Please enter a valid email address."
        : ""
    );

    if (!formError) {
      // A valid email has been entered
      sendPasswordResetEmail(
        email,
        () => {
          // Inform user of success
          setForgotSeverity("success");
          setForgotMessage("Reset email sent!");
          setSnackbarOpen(true);
        },
        ({ response: { data } }) => {
          console.error(data);
          setForgotSeverity("error");
          if (data.detail) {
            setForgotMessage(data.detail);
          } else {
            setForgotMessage("An unexpected error occurred.");
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
        severity={forgotSeverity}
        message={forgotMessage}
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
                  Forgot password
                </MKTypography>
              </MKBox>
              <MKBox pt={4} pb={3} px={3}>
                <MKBox component="form" role="form">
                  <MKBox mb={2}>
                    <MKInput
                      type="email"
                      label="Email"
                      onChange={(e) => setEmail(e.target.value)}
                      fullWidth
                    />
                  </MKBox>
                  {/* Show any form errors */}
                  {formError && (
                    <MKBox display="flex" alignItems="center" ml={-1}>
                      <span style={{ color: "red", fontSize: "10pt" }}>{formError}</span>
                    </MKBox>
                  )}
                  <MKBox mt={4} mb={1}>
                    <MKButton variant="gradient" color="info" onClick={handleSubmit} fullWidth>
                      reset password
                    </MKButton>
                  </MKBox>
                </MKBox>
              </MKBox>
            </Card>
          </Grid>
        </Grid>
      </MKBox>
    </>
  );
}

export default ForgotPassword;
