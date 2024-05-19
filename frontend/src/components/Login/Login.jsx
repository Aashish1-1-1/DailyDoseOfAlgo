import React from "react";
import { NavLink } from "react-router-dom";
const Login = () => {
  return (
    <>
      <div className=" w-full h-full flex items-start justify-center">
        {/* Image */}
        <div className="relative 1/2 h-full flex flex-col">
          <img src="./assets/signup.png" className="w-full h-full object-cover" alt="Signup" />
        </div>

        {/* Text container */}
        <div className="w-1/2  bg-white flex flex-col p-7 justify-center">
          <div className="w-full flex flex-col max-w-[550px] items-center">

            <h1 className="text-4xl font-Poetsen One mb-7 py-7">Login</h1>
            {/* <div className="flex items-center justify-center mb-4">
            <img src="./assets/logo.png" className="w-10 h-8" alt="Logo" /> 
          </div> */}
            <div className="w-full flex flex-col">
              <input
                type="email"
                placeholder="Email"
                className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none" />
              <input
                type="password"
                placeholder="Password"
                className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-black focus:outline-none" />
            </div>
            <div className="w-full flex items-center justify-between">
              <div className="w-full flex items-center">
                <input type="checkbox" className="2-5 h-4 mr-2" />
                <p className="text-sm">Remember me</p>
              </div>
              <p className="text-sm cursor-pointer underline underline-offset-2">Forgot Password?</p>
            </div>

            <div className="w-full flex flex-col my-4">
              <button className="w-full text-white my-2 font-semibold bg-[#060606] rounded-md p-4 text-center flex items-center justify-center hover:bg-gray-500 transition-colors duration-300">
                Log In
              </button>
              <NavLink to="/signup">
                <button className="w-full text-[#060606] my-2 bg-white border-2 border-black rounded-md p-4 text-center flex items-center justify-center hover:bg-gray-500 transition-colors duration-300">
                  Sign Up
                </button>
              </NavLink>

            </div>
            <div className="w-full flex items-center justify-center relative py-1">
              <div className="w-full h-[1px] bg-white"></div>
              <p className="text-lg absolute bg-white -top-1/2 transform -translate-y-1/2">or</p>
            </div>
            <div className="w-full text-[#060606] my-2 bg-white border-2 border-black rounded-md p-4 text-center flex items-center justify-center hover:bg-cyan-400 transition-colors duration-300 cursor-pointer">
            <div className="w-full text-[#060606] my-2 bg-white border-2 border-black rounded-md p-4 text-center flex items-center justify-center hover:bg-cyan-400 transition-colors duration-300 cursor-pointer">
              <img src="./assets/google_logo.png" className="h-6 mr-2" />
              Sign In With Google
              Sign In With Google
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
