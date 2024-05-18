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
import { useState, useRef, useEffect } from "react";

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
  // We need ref in this, because we are dealing
  // with JS setInterval to kep track of it and
  // stop it when needed
  const Ref = useRef(null);

  const [email, setEmail] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [forgotSeverity, setForgotSeverity] = useState("info");
  const [forgotMessage, setForgotMessage] = useState("");
  const [formError, setFormError] = useState("");
  const [resetMessage, setResetMessage] = useState("reset password");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(30);

  const startTimer = () => {
    // If you try to remove this line the
    // updating of timer variable will be
    // after 1000ms or 1sec
    if (Ref.current) {
      clearInterval(Ref.current);
    }

    if (secondsRemaining) {
      const id = setInterval(() => {
        setSecondsRemaining(secondsRemaining - 1);
      }, 1000);
      Ref.current = id;
    } else {
      setButtonDisabled(true);
    }
  };

  useEffect(() => {
    if (buttonDisabled) {
      startTimer();
    } else {
      setSecondsRemaining(30);
    }
  }, [secondsRemaining]);

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
          // Swap button message to resend
          // It remains disabled for a period of time to allow user to receive email
          setResetMessage("resend reset email");
          setButtonDisabled(true);

          // Start button disabled timer
          startTimer();

          // Inform user of success
          setForgotSeverity("success");
          setForgotMessage("Reset email sent!");
          setSnackbarOpen(true);
        },
        ({ response: { request } }) => {
          setForgotSeverity("error");
          const data = JSON.parse(request.response);
          if (data["email"]) {
            setForgotMessage(data["email"][0]);
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
                  {/* Inform user how long they have before they can request new reset token */}
                  {buttonDisabled && (
                    <MKBox display="flex" alignItems="center" ml={-1}>
                      <span style={{ fontSize: "10pt" }}>
                        Resend available in{" "}
                        {secondsRemaining > 1 ? `${secondsRemaining} seconds` : "1 second"}
                      </span>
                    </MKBox>
                  )}
                  <MKBox mt={4} mb={1}>
                    <MKButton
                      variant="gradient"
                      color="info"
                      onClick={handleSubmit}
                      disabled={buttonDisabled}
                      fullWidth
                    >
                      {resetMessage}
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
