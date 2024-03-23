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

import { useContext, useState, useEffect } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKAvatar from "components/MKAvatar";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

// Material Kit 2 React examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import CenteredFooter from "examples/Footers/CenteredFooter";
import Breadcrumbs from "examples/Breadcrumbs";

// DH React components
import DHSnackbar from "components/DHSnackbar";

// Authentication
import SignIn from "layouts/pages/authentication/sign-in";
import SignUp from "layouts/pages/authentication/sign-up";
import SignOut from "layouts/pages/authentication/sign-out";
import Profile from "layouts/pages/authentication/profile";
import AuthContext from "context/AuthContext";

// Routes
import routes from "routes";

// Images
import defaultProfileImage from "assets/images/default_profile.jpg";

// Services
import { getUserProfile } from "services/accountsService";

function BaseLayout({ breadcrumb, title, children }) {
  const { user, profile } = useContext(AuthContext);

  // Sign out properties
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [signoutSeverity, setSignoutSeverity] = useState("info");
  const [signoutMessage, setSignoutMessage] = useState("");
  const [profileImage, setProfileImage] = useState(defaultProfileImage);

  useEffect(() => {
    // If there is a user, then get their profile info
    if (user) {
      getUserProfile(user.user_id, ({ data: { image } }) => {
        setProfileImage(image);
      });
    }
  });

  const signoutSuccess = () => {
    setSignoutSeverity("success");
    setSignoutMessage("Successfully signed out!");
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason !== "clickaway") {
      setSnackbarOpen(false);
    }
  };

  const signedOutOptions = [
    {
      name: "Sign In",
      route: "/pages/authentication/sign-in",
      component: <SignIn />,
    },
    {
      name: "Sign Up",
      route: "/pages/authentication/sign-up",
      component: <SignUp />,
    },
  ];
  const signedInOptions = [
    {
      name: "Profile",
      route: "/pages/authentication/profile",
      component: <Profile />,
    },
    {
      name: "Sign Out",
      route: "/pages/authentication/sign-out",
      component: <SignOut onload={signoutSuccess} />,
    },
  ];

  const accountObj = {
    // If the user is logged in, use their account's username
    name: user ? user.username || profile.name : "Guest",

    // If the user has a profile picture from Google, use that image
    // Otherwise, use the picture tied to the site's account
    icon: (
      <MKAvatar
        src={user && profile.picture ? profile.picture : profileImage}
        alt="Profile picture"
        size="xs"
      />
    ),
    collapse: user ? signedInOptions : signedOutOptions,
  };

  return (
    <>
      <DHSnackbar
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        severity={signoutSeverity}
        message={signoutMessage}
      />
      <MKBox display="flex" flexDirection="column" bgColor="white" minHeight="100vh">
        <MKBox bgColor="white" shadow="sm" py={0.25}>
          <DefaultNavbar routes={[...routes, accountObj]} transparent relative />
        </MKBox>
        <Container sx={{ mt: 6 }}>
          <Grid container item xs={12} flexDirection="column" justifyContent="center" mx="auto">
            <MKBox width={{ xs: "100%", md: "50%", lg: "25%" }} mb={3}>
              <Breadcrumbs routes={breadcrumb} />
            </MKBox>
            <MKTypography variant="h3" mb={1}>
              {title}
            </MKTypography>
            {children}
          </Grid>
        </Container>
        <MKBox mt="auto">
          <CenteredFooter />
        </MKBox>
      </MKBox>
    </>
  );
}

// Typechecking props for the BaseLayout
BaseLayout.propTypes = {
  breadcrumb: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object])).isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default BaseLayout;
