// src/contexts/UserContext.jsx
import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (token && storedUser) {
      try {
        const decoded = jwtDecode(token);
        if (Date.now() >= decoded.exp * 1000) {
          handleLogout(); // Token expired
        } else {
          setIsLoggedIn(true);
          setCurrentUser(JSON.parse(storedUser));
        }
      } catch (err) {
        console.error("Invalid token:", err);
        handleLogout();
      }
    }
  }, []);

  const handleLogin = (user) => {
    setIsLoggedIn(true);
    setCurrentUser(user);
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
