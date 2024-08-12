/**
=========================================================
* Danyo-1.2
=========================================================

* Copyright 2024 Danyo (https://www.danyo.tech)

Coded by www.danyo.tech

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// React
import { useEffect, useState, useContext } from "react";

// Material Kit 2 React components
import MKAvatar from "components/MKAvatar";

// Material Kit 2 React examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";

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

function CodeGolf() {
  const { user, profile } = useContext(AuthContext);
  const [profileImage, setProfileImage] = useState(defaultProfileImage);

  useEffect(() => {
    // If there is a user, then get their profile info
    if (user) {
      getUserProfile(user.id, ({ data: { image } }) => {
        setProfileImage(image);
      });
    }
  }, []);

  const signoutSuccess = () => {
    console.log("Sign out success");
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
    name: user?.username || profile?.name || "Guest",

    // If the user has a profile picture from Google, use that image
    // Otherwise, use the picture tied to the site's account
    icon: (
      <MKAvatar
        src={user && profile?.picture ? profile.picture : profileImage}
        alt="Profile picture"
        size="xs"
      />
    ),
    collapse: user ? signedInOptions : signedOutOptions,
  };

  return (
    <>
      <DefaultNavbar routes={[...routes, accountObj]} sticky />
    </>
  );
}

export default CodeGolf;
