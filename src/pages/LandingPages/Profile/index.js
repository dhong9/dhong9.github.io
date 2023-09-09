import { useContext } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// @mui material icons
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

// Material Kit 2 React examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";

// Routes
import routes from "routes";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

// Authentication
import SignOut from "layouts/pages/authentication/sign-out";
import AuthContext from "context/AuthContext";

function Profile() {
  let { user } = useContext(AuthContext);

  const accountObj = {
    name: user.username,
    icon: <AccountCircleIcon />,
    collapse: [
      {
        name: "sign out",
        route: "/pages/authentication/sign-out",
        component: <SignOut />,
      },
    ],
  };

  return (
    <>
      <DefaultNavbar routes={[...routes, accountObj]} transparent light />
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
                  My Profile
                </MKTypography>
              </MKBox>
            </Card>
          </Grid>
        </Grid>
      </MKBox>
    </>
  );
}

export default Profile;
