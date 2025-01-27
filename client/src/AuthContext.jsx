import React, { createContext, useState, useEffect } from "react";

// Create AuthContext
export const AuthContext = createContext();

// AuthProvider component to wrap the application
export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);

  // Load token from localStorage on app load
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        setAuthToken(token);
      }
    };

    fetchData();
  }, []);

  // Function to save token after login
  const login = (token) => {
    localStorage.setItem("authToken", token);
    setAuthToken(token);
  };

  // Function to log out
  const logout = () => {
    localStorage.removeItem("authToken");
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider value={{ authToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
