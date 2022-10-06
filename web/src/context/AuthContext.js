import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { axiosInstance } from "../utils/axios";
import { queryClient } from "../utils/queryClient";
import { GET_USER_LABELS, GET_USER_NOTES } from "../utils/react-query-keys";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isUserLoggedIn, setUserLogggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      setUserLogggedIn(true);
      axiosInstance.defaults.headers.common[
        "authorization"
      ] = `Bearer ${token}`;
    }
  }, [isUserLoggedIn]);

  const logoutUser = () => {
    localStorage.removeItem("userToken");
    setUserLogggedIn(false);
    delete axiosInstance.defaults.headers.common["authorization"];
    queryClient.removeQueries(GET_USER_NOTES);
    queryClient.removeQueries(GET_USER_LABELS);
  };

  return (
    <AuthContext.Provider
      value={{ isUserLoggedIn, setUserLogggedIn, logoutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);
export { useAuth, AuthProvider };
