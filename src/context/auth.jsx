import axios from "axios";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("access_token")
  );
  const logout = async () => {
    localStorage.removeItem("access_token");
    setIsLoggedIn(false);
  };

  const values = {
    isLoggedIn,
    setIsLoggedIn,
    logout,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
