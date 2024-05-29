/**
=========================================================
* Danyo-1.2
=========================================================

* Copyright 2024 Danyo (https://www.danyo.tech)

Coded by www.danyo.tech

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { createContext, useState, useEffect } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Services
import {
  addAccount,
  getUser,
  loginAccount,
  updateAccount,
  deleteAccount,
} from "services/accountsService";
import { getGoogleUser } from "services/googleService";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  // Getting auth token priority
  // 1. Session storage
  // 2. Local storage
  const sessionToken = sessionStorage.getItem("authTokens");
  const localToken = localStorage.getItem("authTokens");
  const [authTokens, setAuthTokens] = useState(() => sessionToken || localToken || null);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  const history = useNavigate();

  /**
   * Logs in a user
   * @param {string} username username or email address
   * @param {string} password password
   * @param {boolean} rememberMe flag to remember user or not
   * @param {Function} success success callback
   * @param {Function} error error callback
   */
  const loginUser = (username, password, rememberMe, success, error) => {
    loginAccount(
      /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(username)
        ? { email: username, password }
        : { username, password },
      (response) => {
        // Unpack token data
        const { auth_token } = response.data;
        axios.defaults.headers.common["Authorization"] = "Token " + auth_token;

        // If user wants to be remembered,
        // save their token in a local cache
        if (rememberMe) {
          localStorage.setItem("authTokens", auth_token);
        }
        // If not,
        // just maintain their token until they close their session
        else {
          sessionStorage.setItem("authTokens", auth_token);
        }

        // Navigate to home page and show success status
        history("/");
        success();

        // Get user data
        getUser(({ data }) => {
          // data {
          //     email: ...,
          //     username: ...
          // }
          if (rememberMe) {
            localStorage.setItem("user", data);
          } else {
            sessionStorage.setItem("user", data);
          }
        }, console.error);
      },
      error
    );
  };

  /**
   * Adds user to database
   * @param {string} email email address
   * @param {string} username username
   * @param {string} password password
   * @param {Function} success success callback
   * @param {Function} error error callback
   */
  const registerUser = (email, username, password, success, error) => {
    addAccount(
      {
        email,
        username,
        password,
      },
      () => {
        // If the user successfully registered,
        // take them so sign in page and display success message
        history("/pages/authentication/sign-in");
        success();
      },
      error
    );
  };

  const updateUser = (id, email, username, password, password2, success, error) => {
    updateAccount(
      id,
      {
        email,
        username,
        password,
        password2,
      },
      success,
      error
    );
  };

  const logoutUser = () => {
    googleLogout();

    // Cleared saved data
    localStorage.removeItem("authTokens");
    sessionStorage.removeItem("authTokens");
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
    setAuthTokens(null);
    setUser(null);
    setProfile(null);

    // Go back to home page
    history("/");
  };

  const deleteUser = (id, success, error) => {
    deleteAccount(id, success, error);
  };

  // Google login functions
  const googleLogin = useGoogleLogin({
    onSuccess: (codeResponse) => {
      // data has access and refresh tokens
      setAuthTokens(codeResponse);
      setUser(codeResponse);
      sessionStorage.setItem("authTokens", JSON.stringify(codeResponse));
      history("/");
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const contextData = {
    user,
    setUser,
    authTokens,
    setAuthTokens,
    registerUser,
    loginUser,
    logoutUser,
    updateUser,
    deleteUser,
    profile,
    googleLogin,
  };

  useEffect(() => {
    // Get Google user
    if (authTokens && authTokens.access_token) {
      getGoogleUser(
        authTokens.access_token,
        (res) => {
          setProfile(res.data);
        },
        console.error
      );
    }
  }, [authTokens]);

  return <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>;
};

// Typechecking props of AuthContext
AuthProvider.propTypes = {
  children: PropTypes.node,
};

AuthProvider.defaultProps = {
  children: null,
};
