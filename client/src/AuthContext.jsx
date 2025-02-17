import React, { createContext, useState, useEffect } from "react";

// Create AuthContext
export const AuthContext = createContext();

// AuthProvider component to wrap the application
export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [id, setId] = useState(null);
  // Load token from localStorage on app load
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("authToken");
      const id = localStorage.getItem("id");
      if (token) {
        setAuthToken(token);
        setId(id);
      }
    };

    fetchData();
  }, []);

  // Function to save token after login
  const login = (token, id) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("id", id);
    setAuthToken(token);
    setId(id);
  };

  // Function to log out
  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("id");
    setAuthToken(null);
    setId(null);
  };

  return (
    <AuthContext.Provider value={{ authToken, id, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
