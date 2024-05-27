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

import { useEffect, useState } from "react";

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
import ActivateAccountPage from "layouts/pages/authentication/activate-account";
import ForgotPasswordPage from "layouts/pages/authentication/forgot-password";
import ResetPasswordPage from "layouts/pages/authentication/reset-password";
import SignInPage from "layouts/pages/authentication/sign-in";
import SignUpPage from "layouts/pages/authentication/sign-up";
import SignOutPage from "layouts/pages/authentication/sign-out";
import ProfilePage from "layouts/pages/authentication/profile";

// Forums
import ForumsPost from "pages/LandingPages/ForumsPost";
import ForumsCategories from "pages/LandingPages/ForumsCategories";

export default function App() {
  // Sign out properties
  const [signoutSnackbarOpen, setSignoutSnackbarOpen] = useState(false);
  const [signoutSeverity, setSignoutSeverity] = useState("info");
  const [signoutMessage, setSignoutMessage] = useState("");
  const [resetpasswordSnackbarOpen, setResetpasswordSnackbarOpen] = useState(false);
  const [resetpasswordSeverity, setResetpasswordSeverity] = useState("info");
  const [resetpasswordMessage, setResetpasswordMessage] = useState("");
  const [signinSnackbarOpen, setSigninSnackbarOpen] = useState(false);
  const [signinSeverity, setSigninSeverity] = useState("info");
  const [signinMessage, setSigninMessage] = useState("");

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
    setSignoutSnackbarOpen(true);
  };

  const signinSuccess = () => {
    setSigninSeverity("success");
    setSigninMessage("Successfully signed in!");
    setSigninSnackbarOpen(true);
  };

  const resetpasswordSuccess = () => {
    setResetpasswordSeverity("success");
    setResetpasswordMessage("Successfully reset password!");
    setResetpasswordSnackbarOpen(true);
  };

  const handleSignoutSnackbarClose = (event, reason) => {
    if (reason !== "clickaway") {
      setSignoutSnackbarOpen(false);
    }
  };

  const handleSigninSnackbarClose = (event, reason) => {
    if (reason !== "clickaway") {
      setSigninSnackbarOpen(false);
    }
  };

  const handleResetpasswordSnackbarClose = (event, reason) => {
    if (reason !== "clickaway") {
      setResetpasswordSnackbarOpen(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DHSnackbar
        open={signoutSnackbarOpen}
        onClose={handleSignoutSnackbarClose}
        severity={signoutSeverity}
        message={signoutMessage}
      />
      <DHSnackbar
        open={signinSnackbarOpen}
        onClose={handleSigninSnackbarClose}
        severity={signinSeverity}
        message={signinMessage}
      />
      <DHSnackbar
        open={resetpasswordSnackbarOpen}
        onClose={handleResetpasswordSnackbarClose}
        severity={resetpasswordSeverity}
        message={resetpasswordMessage}
      />
      <AuthProvider>
        <Routes>
          {getRoutes(routes)}
          <Route index element={<Presentation />} />
          <Route
            path="/pages/authentication/sign-in"
            element={<SignInPage onsuccess={signinSuccess} />}
          />
          <Route path="/pages/authentication/sign-up" element={<SignUpPage />} />
          <Route
            path="/pages/authentication/sign-out"
            element={<SignOutPage onload={signoutSuccess} />}
          />
          <Route path="/pages/authentication/profile" element={<ProfilePage />} />
          <Route path="/doughnutRider/posts/:id" element={<ForumsPost />} />
          <Route path="/doughnutRider/categories/:id" element={<ForumsCategories />} />
          <Route path="/pages/authentication/forgot" element={<ForgotPasswordPage />} />
          <Route
            path="/pages/authentication/reset-password/:token"
            element={<ResetPasswordPage onsuccess={resetpasswordSuccess} />}
          />
          <Route
            path="/pages/authentication/activate-account/:uid/:token"
            element={<ActivateAccountPage onsuccess={resetpasswordSuccess} />}
          />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
}
