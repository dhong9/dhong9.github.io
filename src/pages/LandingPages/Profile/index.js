/**
=========================================================
* Danyo-1.1
=========================================================

* Copyright 2023 Danyo (https://www.danyo.tech)

Coded by www.danyo.tech

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";

// Material Kit 2 React examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import MKAvatar from "components/MKAvatar";
import MKBadge from "components/MKBadge";
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKInput from "components/MKInput";
import MKTypography from "components/MKTypography";

// @mui icons
import EditIcon from "@mui/icons-material/Edit";

// DH React components
import DHSnackbar from "components/DHSnackbar";
import DeleteAccount from "pages/LandingPages/DeleteAccount";

// Routes
import routes from "routes";

// Authentication
import SignOut from "layouts/pages/authentication/sign-out";
import AuthContext from "context/AuthContext";

// Images
import bgImage from "assets/images/SF_Hologram.png";
import defaultProfileImage from "assets/images/default_profile.jpg";

// Services
import { getUserProfile } from "services/accountsService";

function Profile() {
  const { user, profile, updateUser } = useContext(AuthContext);

  const [username, setUsername] = useState(user?.username || profile?.name || "Guest");
  const [email, setEmail] = useState(user?.email || profile?.email || "");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [profileSeverity, setProfileSeverity] = useState("info");
  const [profileMessage, setProfileMessage] = useState("");
  const [formErrors, setFormErrors] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(defaultProfileImage);

  const history = useNavigate();

  useEffect(() => {
    // If there is a user, then get their profile info
    if (user) {
      getUserProfile(user.user_id, ({ data: { image } }) => {
        setProfileImage(image);
      });
    }
    // User and profile is not defined
    // So, kick them over to login page
    else if (!profile) {
      history("/pages/authentication/sign-in");
    }
  }, []);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check form data
    const errors = [];
    if (!username?.trim()) {
      errors.push("Username is required.");
    }
    if (!password.trim()) {
      errors.push("Password is required.");
    }
    if (!password2.trim()) {
      errors.push("Password confirmation is required.");
    }
    setFormErrors(errors);

    // If form input requirements are met,
    // sign the user up
    if (!formErrors[0]) {
      updateUser(
        user.user_id,
        email,
        username,
        password,
        password2,
        () => {
          setProfileSeverity("success");
          setProfileMessage("Successfully updated profile!");
          setSnackbarOpen(true);
        },
        (signupResponse) => {
          setProfileSeverity("error");
          setProfileMessage(signupResponse.message);
          setSnackbarOpen(true);
        }
      );
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    openModal();
  };

  const accountObj = {
    // If the user is logged in, use their account's username
    name: user?.username || profile?.name,

    // If the user has a profile picture from Google, use that image
    // Otherwise, use the picture tied to the site's account
    icon: (
      <MKAvatar
        src={user && profile?.picture ? profile.picture : profileImage}
        alt="Profile picture"
        size="xs"
      />
    ),
    collapse: [
      {
        name: "Sign Out",
        route: "/pages/authentication/sign-out",
        component: <SignOut />,
      },
    ],
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason !== "clickaway") {
      setSnackbarOpen(false);
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <DefaultNavbar routes={[...routes, accountObj]} transparent light />
      <DHSnackbar
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        severity={profileSeverity}
        message={profileMessage}
      />
      <Modal open={modalIsOpen} onClose={closeModal}>
        <MKBox sx={style}>
          <DeleteAccount />
        </MKBox>
      </Modal>
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
                  My Profile
                </MKTypography>
              </MKBox>
              <MKBox pt={4} pb={3} px={3}>
                <MKBox component="form" role="form">
                  <MKBox mb={2} justifyContent="center" display="flex">
                    {/* If the user has a profile picture from Google, use that image*/}
                    {/* Otherwise, use the picture tied to the site's account */}
                    <MKBadge
                      overlap="circular"
                      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                      badgeContent={
                        <MKAvatar
                          src={user && profile?.picture ? profile.picture : profileImage}
                          alt="Profile picture"
                          size="xxl"
                        />
                      }
                    >
                      <EditIcon />
                    </MKBadge>
                  </MKBox>
                  <MKBox mb={2}>
                    {/* If login is NOT through Django, then make the fields readonly */}
                    <MKInput
                      type="text"
                      label="Username"
                      onChange={(e) => setUsername(e.target.value)}
                      value={username}
                      disabled={!!(user && profile)}
                      fullWidth
                    />
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput
                      type="email"
                      label="Email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      disabled={!!(user && profile)}
                      fullWidth
                    />
                  </MKBox>
                  {/* If user has a profile, then they shouldn't be able to change password and delete account */}
                  {!profile && (
                    <>
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
                        <MKButton variant="gradient" color="info" onClick={handleSubmit} fullWidth>
                          save changes
                        </MKButton>
                      </MKBox>

                      {/* Danger zone */}
                      <Divider variant="middle">
                        <MKTypography variant="h6" fontWeight="medium">
                          DANGER ZONE
                        </MKTypography>
                      </Divider>
                      <MKBox mt={4} mb={1}>
                        <MKButton variant="gradient" color="error" onClick={handleDelete} fullWidth>
                          delete account
                        </MKButton>
                      </MKBox>
                    </>
                  )}
                </MKBox>
              </MKBox>
            </Card>
          </Grid>
        </Grid>
      </MKBox>
    </>
  );
}

export default Profile;
