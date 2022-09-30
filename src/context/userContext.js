import React, { useEffect, useMemo, useState } from "react";
import { getMe, loginUser } from "../lib/mockServer";

const UserContext = React.createContext();

function UserContextProvider(props) {
  const hasTokenInLocalStorage = localStorage.getItem("auth-token");
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isTokenValidationInProgress, setIsTokenValidationInProgress] =
    useState(hasTokenInLocalStorage);

  const state = useMemo(() => {
    return {
      isLoggedIn,
      isTokenValidationInProgress,
      user,
      handleLoginUser: ({ email, password }) => {
        const response = loginUser({ email, password });
        if (response.success) {
          localStorage.setItem("auth-token", response.token);
          setIsLoggedIn(true);
          setUser(response.user);
        }
        return response;
      },
      handleLogout: () => {
        localStorage.removeItem("auth-token");
        setUser(null);
        setIsLoggedIn(false);
      },
    };
  }, [user, isLoggedIn, isTokenValidationInProgress]);

  useEffect(() => {
    if (hasTokenInLocalStorage) {
      if (!user) {
        setIsTokenValidationInProgress(true);
        const response = getMe({ token: localStorage.getItem("auth-token") });
        if (response.success) {
          setIsLoggedIn(true);
          setUser(response.user);
        }
      }
    }
  }, [hasTokenInLocalStorage, user]);

  return (
    <UserContext.Provider value={state}>{props.children}</UserContext.Provider>
  );
}

export { UserContext, UserContextProvider };
