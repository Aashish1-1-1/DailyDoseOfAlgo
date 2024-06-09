import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../Context/Auth";
import { jwtDecode } from "jwt-decode";

const AuthSuccess = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    console.log("Token:", token);

    if (token) {
      // Decode the JWT token and extract user information
      const decodedToken = jwtDecode(token);
      const { id, email, name, picture } = decodedToken;
      console.log("User information:", id, email, name, picture);

      // Store the user information in localStorage or state
      localStorage.setItem("userId", id);
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userName", name);
      localStorage.setItem("userPicture", picture);

      // Store the JWT token in localStorage
      localStorage.setItem("token", token);
      setAuth({ isAuthenticated: true });

      // Redirect to the desired route after successful authentication
      navigate("/dashboard");
    } else {
      // Handle authentication failure
      console.error("Authentication failed");
      navigate("/login");
    }
  }, [navigate, setAuth, searchParams]);

  return <div>Authenticating...</div>;
};

export default AuthSuccess;