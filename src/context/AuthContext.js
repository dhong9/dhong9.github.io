import { createContext, useState, useEffect } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

// Services
import {
  addAccount,
  loginAccount,
  updateAccount,
  deleteAccount,
  refreshAccount,
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
  const [user, setUser] = useState(() => sessionToken || localToken || null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [rememberMe, setRememberMe] = useState(false);

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
    setRememberMe(rememberMe);
    loginAccount(
      /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(username)
        ? { email: username, password }
        : { username, password },
      (response) => {
        // Unpack token data
        const { auth_token } = response.data;

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
      },
      error
    );
  };

  const registerUser = (email, username, password, success, error) => {
    addAccount(
      {
        email,
        username,
        password,
      },
      () => {
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
    localStorage.removeItem("authTokens");
    sessionStorage.removeItem("authTokens");
    setAuthTokens(null);
    setUser(null);
    setProfile(null);
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

  const updateToken = () => {
    if (authTokens?.refresh) {
      refreshAccount(authTokens.refresh, (response) => {
        if (response.status === 200) {
          // data has access and refresh tokens
          const data = response.data;
          setAuthTokens(data);
          setUser(jwt_decode(data.access));
          if (rememberMe) {
            localStorage.setItem("authTokens", JSON.stringify(data));
          } else {
            sessionStorage.setItem("authTokens", JSON.stringify(data));
          }
        } else {
          logoutUser();
        }

        if (loading) {
          setLoading(false);
        }
      });
    }
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

    if (!profile && loading) {
      updateToken();
    }

    const REFRESH_INTERVAL = 1000 * 60 * 4; // 4 minutes
    const interval = setInterval(() => {
      if (!profile && authTokens) {
        updateToken();
      }
    }, REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, [authTokens, loading]);

  return <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>;
};

// Typechecking props of AuthContext
AuthProvider.propTypes = {
  children: PropTypes.node,
};

AuthProvider.defaultProps = {
  children: null,
};
