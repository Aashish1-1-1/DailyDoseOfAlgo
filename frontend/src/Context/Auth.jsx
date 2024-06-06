import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ isAuthenticated: false });

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        console.log(token);
        try {
          const response = await fetch("http://localhost:8080/api/isvalid", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          const responseData = await response.json();
          if (response.ok) {
            setAuth({ isAuthenticated: true });
          } else {
            console.log(responseData);
          }
        } catch (error) {
          console.log("Fetching failed", error);
        }
      }
    };

    validateToken();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
