import { useContext } from "react";

// @mui material icons
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

// Material Kit 2 React examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";

// Routes
import routes from "routes";

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
      <DefaultNavbar routes={[...routes, accountObj]} sticky />
      <h3>My Profile</h3>
    </>
  );
}

export default Profile;
