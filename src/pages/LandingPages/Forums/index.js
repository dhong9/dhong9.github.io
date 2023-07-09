import { useContext, useEffect, useState } from "react";

// @mui material icons
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

// Material Kit 2 React example components
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import CenteredFooter from "examples/Footers/CenteredFooter";

// Material Kit 2 React components
import MKBox from "components/MKBox";

// Material Kit 2 React page layout routes
import routes from "routes";

// Authentication
import SignIn from "layouts/pages/authentication/sign-in";
import SignUp from "layouts/pages/authentication/sign-up";
import SignOut from "layouts/pages/authentication/sign-out";
import AuthContext from "context/AuthContext";

// Forum components
import ForumHeader from "components/ForumHeader";

// Categories service
import { getCategories } from "services/categoriesService";

function Forums() {
  let { user } = useContext(AuthContext);

  const [categories, setCategories] = useState([]);

  // Get categories on page load
  useEffect(() => {
    getCategories(({ data: { results } }) => {
      setCategories(results);
    });
  }, []);

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
      <ForumHeader categories={categories} />
      <MKBox mt="auto">
        <CenteredFooter />
      </MKBox>
    </>
  );
}

export default Forums;
