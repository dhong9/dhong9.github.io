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

import { useContext, useEffect, useState } from "react";

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
import Profile from "layouts/pages/authentication/profile";
import AuthContext from "context/AuthContext";

// Services
import { getProjects } from "services/projectsService";

function Presentation() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [contactSeverity, setContactSeverity] = useState("info");
  const [contactMessage, setContactMessage] = useState("");
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getProjects(({ data: { results } }) => {
      const projectMap = {};

      // Map each project category to ID and name
      for (const { id, name, category } of results) {
        const projectObj = {
          name,
          route: `/sections/${category}/${id}`,
          component: name.replace(/ /g, ""),
        };

        // If category is in the project map,
        // add data to the existing mapping
        if (category in projectMap) {
          projectMap[category].push(projectObj);
        }
        // If it's a new project category,
        // create a new mapping
        else {
          projectMap[category] = [projectObj];
        }
      }

      const projects = [];

      // Build project URL map from project map
      for (const name in projectMap) {
        const projectObj = {
          name,
          description: `See all ${name.toLowerCase()}`,
          dropdown: true,
          collapse: projectMap[name],
        };
        projects.push(projectObj);
      }

      setProjects(projects);
    });
    console.log(projects);
  }, []);

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

  const signoutSuccess = () => {
    console.log("Sign out success");
  };

  let { user, profile, googleUser } = useContext(AuthContext);

  console.log("Google User: ", googleUser);
  console.log("Profile: ", profile);

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
    name: user ? user.username : profile ? profile.name : "Guest",
    icon: <AccountCircleIcon />,
    collapse: user || profile ? signedInOptions : signedOutOptions,
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
