import { createContext, useState, useEffect } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { postRequest, putRequest, deleteRequest } from "services/baseService";
import { getGoogleUser } from "services/googleService";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  // Getting auth token priority
  // 1. Session storage
  // 2. Local storage

  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens") ? JSON.parse(localStorage.getItem("authTokens")) : null
  );
  const [user, setUser] = useState(() =>
    localStorage.getItem("authTokens") ? jwt_decode(localStorage.getItem("authTokens")) : null
  );
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState([]);

  const history = useNavigate();

  const loginUser = (username, password, rememberMe, success, error) => {
    postRequest(
      "accounts/token/",
      { username, password },
      (response) => {
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
          history("/");
          success();
        }
      },
      (err) => {
        console.error(err);
        error(err);
      }
    );
  };

  const registerUser = (email, username, password, password2, success, error) => {
    postRequest(
      "accounts/register/",
      {
        email,
        username,
        password,
        password2,
      },
      () => {
        history("/pages/authentication/sign-in");
        success();
      },
      (err) => {
        console.error(err);
        error(err);
      }
    );
  };

  const updateUser = (id, email, username, password, password2, success, error) => {
    putRequest(
      "accounts/update/" + id + "/",
      {
        email,
        username,
        password,
        password2,
      },
      success,
      (err) => {
        console.error(err);
        error(err);
      },
      { Authorization: `Bearer ${authTokens.access}` }
    );
  };

  const logoutUser = () => {
    googleLogout();
    localStorage.removeItem("authTokens");
    sessionStorage.removeItem("authTokens");
    setAuthTokens(null);
    setUser(null);
    history("/");
  };

  const deleteUser = (id, success, error) => {
    deleteRequest(
      "accounts/delete/" + id + "/",
      success,
      (err) => {
        console.error(err);
        error(err);
      },
      { headers: { Authorization: `Bearer ${authTokens.access}` } }
    );
  };

  // Google login functions
  const googleLogin = useGoogleLogin({
    onSuccess: (codeResponse) => {
      // data has access and refresh tokens
      setAuthTokens(codeResponse);
      setUser(jwt_decode(codeResponse.access_token));
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
    postRequest(
      "accounts/token/refresh/",
      {
        refresh: authTokens?.refresh,
      },
      (response) => {
        if (response.status === 200) {
          // data has access and refresh tokens
          const data = response.data;
          setAuthTokens(data);
          setUser(jwt_decode(data.access));
          localStorage.setItem("authTokens", JSON.stringify(data));
        } else {
          logoutUser();
        }

        if (loading) {
          setLoading(false);
        }
      },
      console.error
    );
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

    if (loading) {
      updateToken();
    }

    const REFRESH_INTERVAL = 1000 * 60 * 4; // 4 minutes
    const interval = setInterval(() => {
      if (authTokens) {
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
