import React, { useState } from "react";
import SingupImg from "/assets/signup.svg";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/fontawesome-free-solid";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {
      console.log(formData)
      const response = await fetch('http://localhost:8080/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);
      } else {
        console.error('Try another username/email taken');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="w-full lg:h-[calc(100vh)] h-full flex flex-col lg:flex-row justify-center font-poppins text-white pt-[60px]">
          {/* Image */}
          <div className="relative w-full lg:w-1/2 h-full flex-col hidden lg:flex justify-center items-center p-14 bg-slate-950 text-white">
            <img src={SingupImg} alt="signup" className="scale-75" />
            <h1 className="font-semibold text-5xl">Daily Dose Of Algo</h1>
            <h3 className="text-white opacity-65 text-2xl text-center mt-3">Master your algorithm with DailyDoseofAlgo’s quizes and algorithm lessons.</h3>
          </div>

          {/* Text container */}
          <div className="w-full lg:w-1/2 bg-[#1F1D1D] h-full flex flex-col justify-center items-center">
            <div className="w-full flex flex-col max-w-[420px] lg:max-w-[500px] p-4 items-center">
              <h1 className="text-3xl font-semibold mb-5">Sign Up</h1>
              <div className="w-full mb-[10px]">
                <label htmlFor="username" className="text-white text-[14px] mb-[2px]">Username</label>
                <input
                  value={formData.username}
                  onChange={handleChange}
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  className="w-full p-2 bg-transparent border-2 border-opacity-60 rounded-md border-white outline-none focus:outline-none text-[15px]"
                  required />
              </div>
              <div className="w-full mb-[10px]">
                <label htmlFor="email" className="text-white text-[14px] mb-[2px]">Email</label>
                <input
                  value={formData.email}
                  type="email"
                  onChange={handleChange}
                  name="email"
                  placeholder="Enter your email"
                  className="w-full p-2 bg-transparent border-2 border-opacity-60 rounded-md border-white outline-none focus:outline-none text-[15px]"
                  required />
              </div>
              <div className="w-full mb-[10px]">
                <label htmlFor="password" className="text-white text-[14px] mb-[2px]">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    name="password"
                    placeholder="Enter your password"
                    className="w-full p-2 bg-transparent border-2 border-opacity-60 rounded-md border-white outline-none focus:outline-none text-[15px]"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-2 text-white"
                    onClick={handleTogglePassword}
                  >
                    {showPassword ? <FontAwesomeIcon
                      icon={faEye}
                      className="text-white h-[16px] w-[16px]"
                    /> : <FontAwesomeIcon
                      icon={faEyeSlash}
                      className="text-white h-[16px] w-[16px]"
                    />}
                  </button>
                </div>
              </div>
              <div className="w-full mb-[10px]">
                <label htmlFor="confirmpassword" className="text-white text-[14px] mb-[2px]">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.confirmpassword}
                    onChange={handleChange}
                    name="confirmpassword"
                    placeholder="Confirm password"
                    className="w-full p-2 bg-transparent border-2 border-opacity-60 rounded-md border-white outline-none focus:outline-none text-[15px]"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-2 text-white"
                    onClick={handleTogglePassword}
                  >
                    {showPassword ? <FontAwesomeIcon
                      icon={faEye}
                      className="text-white h-[16px] w-[16px]"
                    /> : <FontAwesomeIcon
                      icon={faEyeSlash}
                      className="text-white h-[16px] w-[16px]"
                    />}
                  </button>
                </div>
              </div>


              <div className="w-full flex items-center justify-between">
                <div className="w-full flex items-center">
                  <input type="checkbox" className="h-4 mr-2" required />
                  <p className="text-sm">I agree to the Terms & Conditions</p>
                </div>
              </div>

              <div className="w-full my-4">
                <button type="submit" className="w-full text-white my-2 font-semibold bg-[#6C63FF] rounded-md p-3 text-center flex items-center justify-center hover:bg-opacity-60 transition-colors duration-300">
                  Sign Up
                </button>
              </div>

              <div className="w-full flex items-center justify-center relative py-1 mb-3">
                <div className="w-full h-[1px] bg-white"></div>
                <p className="text-lg absolute bg-[#1F1D1D] px-2 top-1/2 transform -translate-y-1/2">
                  OR
                </p>
              </div>
              <div className="w-full text-white my-2 bg-[#1F1D1D] border border-opacity-60  border-white rounded-md p-4 text-center flex items-center justify-center hover:bg-gray-900 transition-colors duration-300 cursor-pointer">
                <img src="../assets/google_logo.png" className="h-6 mr-2" />
                Sign Up With Google
              </div>
              <div>
                <p className="text-white text-center mt-3">
                  Already have an account?{" "}
                  <NavLink to="/login" className="font-medium text-[#6C63FF]">
                    Login
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

export default SignUp;
