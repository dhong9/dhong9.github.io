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

import { useContext, useState } from "react";

// @mui material icons
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

// Material Kit 2 React examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import CenteredFooter from "examples/Footers/CenteredFooter";

// DH React components
import DHSnackbar from "components/DHSnackbar";

// Presentation page sections
import Counters from "pages/Presentation/sections/Counters";
import DesignBlocks from "pages/Presentation/sections/DesignBlocks";
import Pages from "pages/Presentation/sections/Pages";
import ContactUs from "pages/LandingPages/ContactUs";

// Routes
import routes from "routes";

// Images
import bgImage from "assets/images/Pacific_selfie_bubbles.jpg";

// Authentication
import SignIn from "layouts/pages/authentication/sign-in";
import SignUp from "layouts/pages/authentication/sign-up";
import SignOut from "layouts/pages/authentication/sign-out";
import AuthContext from "context/AuthContext";

function Presentation() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [contactSeverity, setContactSeverity] = useState("info");
  const [contactMessage, setContactMessage] = useState("");

  const handleSnackbarClose = (event, reason) => {
    if (reason !== "clickaway") {
      setSnackbarOpen(false);
    }
  };

  const handleContactResponse = (contactResponse) => {
    if (contactResponse.name === "AxiosError") {
      setContactSeverity("error");
      setContactMessage(contactResponse.message);
    } else {
      setContactSeverity("success");
      setContactMessage("Message successfully sent!");
    }
    setSnackbarOpen(true);
  };

  let { user } = useContext(AuthContext);

  const signedOutOptions = [
    {
      name: "sign in",
      route: "/pages/authentication/sign-in",
      component: <SignIn />,
    },
    {
      name: "sign up",
      route: "/pages/authentication/sign-up",
      component: <SignUp />,
    },
  ];
  const signedInOptions = [
    {
      name: "sign out",
      route: "/pages/authentication/sign-out",
      component: <SignOut />,
    },
  ];

  const accountObj = {
    name: user ? user.username : "Guest",
    icon: <AccountCircleIcon />,
    collapse: user ? signedInOptions : signedOutOptions,
  };

  return (
    <>
      <DefaultNavbar routes={[...routes, accountObj]} sticky />
      <DHSnackbar
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        severity={contactSeverity}
        message={contactMessage}
      />
      <MKBox
        minHeight="75vh"
        width="100%"
        sx={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "top",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Container>
          <Grid container item xs={12} lg={7} justifyContent="center" mx="auto">
            <MKTypography
              variant="h1"
              color="white"
              mt={-6}
              mb={1}
              sx={({ breakpoints, typography: { size } }) => ({
                [breakpoints.down("md")]: {
                  fontSize: size["3xl"],
                },
              })}
            >
              Daniel Hong{" "}
            </MKTypography>
            <MKTypography
              variant="body1"
              color="white"
              textAlign="center"
              px={{ xs: 6, lg: 12 }}
              mt={1}
            >
              Engineering professional. Visual effects hobbyist.
            </MKTypography>
          </Grid>
        </Container>
      </MKBox>
      <Card
        sx={{
          p: 2,
          mx: { xs: 2, lg: 3 },
          mt: -8,
          mb: 4,
          backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
          backdropFilter: "saturate(200%) blur(30px)",
          boxShadow: ({ boxShadows: { xxl } }) => xxl,
        }}
      >
        <Counters />
        <DesignBlocks />
        <Pages />
      </Card>
      <ContactUs handleContactResponse={handleContactResponse} />
      <MKBox mt="auto">
        <CenteredFooter />
      </MKBox>
    </>
  );
}

export default Presentation;