import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { postRequest, putRequest } from "services/baseService";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

const AuthContext = createContext();

export default AuthContext;

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
    console.log(user);
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
      }
    );
  };

  const logoutUser = () => {
    localStorage.removeItem("authTokens");
    setAuthTokens(null);
    setUser(null);
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
    updateUser,
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
  children: PropTypes.elementType,
};

AuthProvider.defaultProps = {
  children: null,
};
