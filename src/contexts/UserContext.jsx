import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (Date.now() >= decoded.exp * 1000) {
          handleLogout(); // expired
        } else {
          setIsLoggedIn(true);
          const user = JSON.parse(localStorage.getItem("user"));
          setCurrentUser(user);
        }
      } catch (err) {
        console.error("Invalid token:", err);
        handleLogout();
      }
    }
  }, []);

  const handleLogin = () => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(true);
    setCurrentUser(user ? JSON.parse(user) : null);
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  return (
    <UserContext.Provider
      value={{ isLoggedIn, currentUser, handleLogin, handleLogout }}
    >
      {children}
    </UserContext.Provider>
  );
};
