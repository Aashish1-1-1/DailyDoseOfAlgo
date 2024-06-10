import React, { useEffect, useState } from "react";
import SingupImg from "/assets/signup.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/Auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/fontawesome-free-solid";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const { setAuth } = useAuth();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Welcome");
        localStorage.setItem("token", result.Auth);
        setAuth({ isAuthenticated: true });
        navigate("/dashboard");
      } else {
        console.error("Email or password incorrect");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleGoogleSignIn = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      console.log("codeResponse: ", codeResponse);

      // send codeResponse to the server
      // const tokenResponse = await axios.get(
      //   `http://localhost:8080/auth/google/callback?code=${codeResponse.code}`
      // );
      // console.log(tokenResponse.data);

      try {
        const response = await fetch(`http://localhost:8080/auth/google/callback?code=${codeResponse.code}`, {
          method: "GET"
        });
  
        const result = await response.json();
        console.log("tokenResponse1: ", result);
        console.log("Welcome");
        localStorage.setItem("token", result.token);
        setAuth({ isAuthenticated: true });
        navigate("/dashboard");
      
      } catch (error) {
        console.error("Error submitting form:", error);
      }
      
    },
    flow: "auth-code",
  });

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="w-full lg:h-[calc(100vh)] h-full flex flex-col lg:flex-row justify-center font-poppins text-white pt-[60px]">
          {/* Image */}
          <div className="relative w-full lg:w-1/2 h-full flex-col hidden lg:flex justify-center items-center p-14 bg-slate-950 text-white">
            <img src={SingupImg} alt="signup" className="scale-75" />
            <h1 className="font-semibold text-4xl">Daily Dose Of Algo</h1>
            <h3 className="text-white opacity-65 text-xl text-center mt-3">
              Master your algorithm with DailyDoseofAlgo’s quizes and algorithm
              lessons.
            </h3>
          </div>

          {/* Text container */}
          <div className="w-full lg:w-1/2 bg-[#1F1D1D] h-full flex flex-col justify-center items-center">
            <div className="w-full flex flex-col max-w-[420px] lg:max-w-[500px] p-4 items-center">
              <h1 className="text-3xl font-semibold mb-5">Log In</h1>
              <div className="w-full mb-[10px]">
                <label
                  htmlFor="email"
                  className="text-white text-[14px] mb-[2px]"
                >
                  Email
                </label>
                <input
                  value={formData.email}
                  onChange={handleChange}
                  type="text"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full p-2 bg-transparent border-2 border-opacity-60 rounded-md border-white outline-none focus:outline-none text-[15px]"
                />
              </div>
              <div className="w-full mb-[10px]">
                <label
                  htmlFor="[password]"
                  className="text-white text-[14px] mb-[2px]"
                >
                  Password
                </label>
                <div className="relative w-full">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    name="password"
                    placeholder="Enter your password"
                    className="w-full p-2 pr-7 bg-transparent border-2 border-opacity-60 rounded-md border-white outline-none focus:outline-none text-[15px]"
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-3 text-white"
                    onClick={handleTogglePassword}
                  >
                    {showPassword ? (
                      <FontAwesomeIcon
                        icon={faEye}
                        className="text-white h-[20px] w-[20px]"
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faEyeSlash}
                        className="text-white h-[20px] w-[20px]"
                      />
                    )}
                  </button>
                </div>
              </div>

              <div className="w-full flex items-end justify-end">
                <p className="text-white mt-1">
                  <NavLink
                    to="/forgot-password"
                    className="hover:underline text-[#6C63FF]"
                  >
                    Forgot password?
                  </NavLink>
                </p>
              </div>

              <div className="w-full my-4">
                <button
                  className="w-full text-white my-2 font-semibold bg-[#6C63FF] rounded-md p-3 text-center flex items-center justify-center hover:bg-opacity-60 transition-colors duration-300"
                  onClick={handleSubmit}
                >
                  Log In
                </button>
              </div>

              <div className="w-full flex items-center justify-center relative py-1 mb-3">
                <div className="w-full h-[1px] bg-white"></div>
                <p className="text-lg absolute bg-[#1F1D1D] px-2 top-1/2 transform -translate-y-1/2">
                  OR
                </p>
              </div>

              <div className="w-full text-white my-2 bg-[#1F1D1D] border border-opacity-60  border-white rounded-md p-4 text-center flex items-center justify-center hover:bg-gray-900 transition-colors duration-300 cursor-pointer"
              onClick={()=>handleGoogleSignIn()}>
                <img src="../assets/google_logo.png" className="h-6 mr-2" />
                Log In With Google
              </div>

              <div>
                <p className="text-white text-center mt-3">
                  Don't have an account?{" "}
                  <NavLink to="/signup" className="font-medium text-[#6C63FF]">
                    Sign Up
                  </NavLink>
                </p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Login;
