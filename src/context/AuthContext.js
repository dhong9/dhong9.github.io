import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { postRequest } from "services/baseService";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

const AuthContext = createContext();

export default AuthContext;

// https://github.com/seankwarren/Django-React-jwt-authentication/blob/main/frontend/src/context/AuthContext.js
export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens") ? JSON.parse(localStorage.getItem("authTokens")) : null
  );
  const [user, setUser] = useState(() =>
    localStorage.getItem("authTokens") ? jwt_decode(localStorage.getItem("authTokens")) : null
  );
  const [loading, setLoading] = useState(true);

  const history = useNavigate();

  const loginUser = (username, password, success, error) => {
    postRequest(
      "accounts/token/",
      { username, password },
      (response) => {
        if (response.status === 200) {
          // data has access and refresh tokens
          const data = response.data;
          setAuthTokens(data);
          setUser(jwt_decode(data.access));
          localStorage.setItem("authTokens", JSON.stringify(data));
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

  const registerUser = (email, username, password, password2) => {
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
      },
      console.error
    );
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    history("/");
  };

  const contextData = {
    user,
    setUser,
    authTokens,
    setAuthTokens,
    registerUser,
    loginUser,
    logoutUser,
  };

  const updateToken = () => {
    postRequest(
      "token/refresh/",
      {
        refresh: authTokens.refresh || "",
      },
      (response) => {
        if (response.status === 200) {
          // data has access and refresh tokens
          const data = response.data;
          setAuthTokens(data);
          setUser(jwt_decode(data.access));
          localStorage.setItem("authTokens", JSON.stringify(data));
          history("/");
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
    if (authTokens) {
      setUser(jwt_decode(authTokens.access));
    }
    setLoading(false);
  }, [authTokens, loading]);

  return (
    <AuthContext.Provider value={contextData}>{loading ? null : children}</AuthContext.Provider>
  );
};

// Typechecking props of DHComments
AuthProvider.propTypes = {
  children: PropTypes.elementType,
};

AuthProvider.defaultProps = {
  children: null,
};
