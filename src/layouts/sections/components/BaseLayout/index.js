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

import { useContext } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material icons
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

// Material Kit 2 React examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import CenteredFooter from "examples/Footers/CenteredFooter";
import Breadcrumbs from "examples/Breadcrumbs";

// Authentication
import SignIn from "layouts/pages/authentication/sign-in";
import SignUp from "layouts/pages/authentication/sign-up";
import SignOut from "layouts/pages/authentication/sign-out";
import AuthContext from "context/AuthContext";

// Routes
import routes from "routes";

function BaseLayout({ breadcrumb, title, children }) {
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
  );
}

// Typechecking props for the BaseLayout
BaseLayout.propTypes = {
  breadcrumb: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object])).isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default BaseLayout;