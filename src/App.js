/**
=========================================================
* Material Kit 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useEffect } from "react";

// react-router components
import { Routes, Route, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Material Kit 2 React themes
import theme from "assets/theme";
import Presentation from "layouts/pages/presentation";

// DH React components
import DHSnackbar from "components/DHSnackbar";

// Material Kit 2 React routes
import routes from "routes";

// Authentication
import { AuthProvider } from "context/AuthContext";
import SignInPage from "layouts/pages/authentication/sign-in";
import SignUpPage from "layouts/pages/authentication/sign-up";
import SignOutPage from "layouts/pages/authentication/sign-out";
import ProfilePage from "layouts/pages/authentication/profile";
import VerifyEmailPage from "layouts/pages/authentication/verify-email";

// Forums
import ForumsPost from "pages/LandingPages/ForumsPost";
import ForumsCategories from "pages/LandingPages/ForumsCategories";

export default function App() {
  // Sign out properties
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [signoutSeverity, setSignoutSeverity] = useState("info");
  const [signoutMessage, setSignoutMessage] = useState("");

  const { pathname } = useLocation();

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DHSnackbar
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        severity={signoutSeverity}
        message={signoutMessage}
      />
      <AuthProvider>
        <Routes>
          {getRoutes(routes)}
          <Route index element={<Presentation />} />
          <Route path="/pages/authentication/sign-in" element={<SignInPage />} />
          <Route path="/pages/authentication/sign-up" element={<SignUpPage />} />
          <Route
            path="/pages/authentication/sign-out"
            element={<SignOutPage onload={signoutSuccess} />}
          />
          <Route path="/pages/authentication/profile" element={<ProfilePage />} />
          <Route path="/doughnutRider/posts/:id" element={<ForumsPost />} />
          <Route path="/doughnutRider/categories/:id" element={<ForumsCategories />} />
          <Route path="/verify-email/:key" element={<VerifyEmailPage />} />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
}
