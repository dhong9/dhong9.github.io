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

// Material Kit 2 React routes
import routes from "routes";

// Authentication
import { AuthProvider } from "context/AuthContext";
import SignInPage from "layouts/pages/authentication/sign-in";
import SignUpPage from "layouts/pages/authentication/sign-up";
import SignOutPage from "layouts/pages/authentication/sign-out";

// Forums
import ForumsPost from "pages/LandingPages/ForumsPost";

export default function App() {
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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Routes>
          {getRoutes(routes)}
          <Route index element={<Presentation />} />
          <Route path="/pages/authentication/sign-in" element={<SignInPage />} />
          <Route path="/pages/authentication/sign-up" element={<SignUpPage />} />
          <Route path="/pages/authentication/sign-out" element={<SignOutPage />} />
          <Route path="/doughnutRider/posts/:id" element={<ForumsPost />} />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
}
