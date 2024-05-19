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
import { useParams, useNavigate } from "react-router-dom";

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
import { confirmPasswordReset } from "services/accountsService";

// Images
import bgImage from "assets/images/gems.png";

function ResetPassword() {
  // Get password reset token
  const { token } = useParams();

  // Allow page navigation
  const history = useNavigate();

  // Form fields
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formErrors, setFormErrors] = useState([]);

  // Snackbar properties
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [resetSeverity, setResetSeverity] = useState("info");
  const [resetMessage, setResetMessage] = useState("");

  const handleSnackbarClose = (event, reason) => {
    if (reason !== "clickaway") {
      setSnackbarOpen(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check form data
    const errors = [];
    if (!password.trim()) {
      errors.push("Password is required.");
    }
    if (!confirmPassword.trim()) {
      errors.push("Password confirmation is required.");
    }
    if (password && confirmPassword && password !== confirmPassword) {
      errors.push("Passwords don't match.");
    }
    setFormErrors(errors);

    if (!formErrors[0]) {
      // Reset user password
      confirmPasswordReset(
        token,
        password,
        () => {
          // Navigate to login
          history("/pages/authentication/sign-in");
        },
        ({
          response: {
            data: { detail },
          },
        }) => {
          setResetSeverity("error");
          setResetMessage(detail);
          setSnackbarOpen(true);
        }
      );
    }
  };

  return (
    <>
      <DefaultNavbar routes={routes} transparent light />
      <DHSnackbar
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        severity={resetSeverity}
        message={resetMessage}
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
                  Reset password
                </MKTypography>
              </MKBox>
              <MKBox pt={4} pb={3} px={3}>
                <MKBox component="form" role="form">
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
                      onChange={(e) => setConfirmPassword(e.target.value)}
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

export default ResetPassword;
