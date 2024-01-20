/**
=========================================================
* Danyo-1.1
=========================================================

* Copyright 2023 Danyo (https://www.danyo.tech)

Coded by www.danyo.tech

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useContext } from "react";

// @mui material components
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";

// Authentication
import AuthContext from "context/AuthContext";

// Image
import bgImage from "assets/images/illustrations/leatherText.png";

function VerifyEmail() {
  const { user } = useContext(AuthContext);

  const sendConfirmation = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} lg={6}>
          <MKBox
            display={{ xs: "none", lg: "flex" }}
            width="calc(100% - 2rem)"
            height="calc(100vh - 2rem)"
            borderRadius="lg"
            ml={2}
            mt={2}
            sx={{ backgroundImage: `url(${bgImage})` }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={10}
          md={7}
          lg={6}
          xl={4}
          ml={{ xs: "auto", lg: 6 }}
          mr={{ xs: "auto", lg: 6 }}
        >
          <MKBox
            bgColor="white"
            borderRadius="xl"
            shadow="lg"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            mt={{ xs: 20, sm: 18, md: 20 }}
            mb={{ xs: 20, sm: 18, md: 20 }}
            mx={3}
          >
            <MKBox
              variant="gradient"
              bgColor="info"
              coloredShadow="info"
              borderRadius="lg"
              p={2}
              mx={2}
              mt={-3}
            >
              <MKTypography variant="h3" color="white">
                Verify Email
              </MKTypography>
            </MKBox>
            <MKBox p={3}>
              <MKTypography variant="body2" color="text" mb={3}>
                Please check your email at <strong>{user.email}</strong> to confirm your account.
              </MKTypography>
              <MKBox width="100%" component="form" method="post" autoComplete="off">
                <Grid container item justifyContent="center" xs={12} mt={5} mb={2}>
                  <MuiLink href="/">Return to Home Page</MuiLink>
                  <Divider variant="middle">
                    <MKTypography variant="h6" fontWeight="medium">
                      Didn&apos;t receive the confirmation?
                    </MKTypography>
                    <MKButton
                      type="submit"
                      variant="gradient"
                      color="info"
                      onClick={sendConfirmation}
                    >
                      Resend Confirmation
                    </MKButton>
                  </Divider>
                </Grid>
              </MKBox>
            </MKBox>
          </MKBox>
        </Grid>
      </Grid>
    </>
  );
}

export default VerifyEmail;
