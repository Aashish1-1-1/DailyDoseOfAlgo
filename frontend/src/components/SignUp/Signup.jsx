import React, { useState } from "react";
import SingupImg from "/assets/signup.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/fontawesome-free-solid";
import CircularLoader from "../Loader/CircularLoader";
import { useGoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { ToastContainer } from "react-toastify";
import successToast from "../Toast/successToast";
import errorToast from "../Toast/errorToast";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [file, setFile] = useState(null);

  const [error, setError] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });

  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "file") {
      setFile(e.target.files[0]);
    } else {
      setFormData({ ...formData, [name]: value });
      validateInput(e);
    }
  };

  const handleImageChange = (e) => {
    console.log(e.target.files[0]);
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleTogglePassword1 = () => {
    setShowPassword1(!showPassword1);
  };

  const handleTogglePassword2 = () => {
    setShowPassword2(!showPassword2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("name", formData.name);
    data.append("username", formData.username);
    data.append("email", formData.email);
    data.append("password", formData.password);
    if (file) {
      data.append("image", file);
    }

    try {
      const response = await fetch("http://localhost:8080/api/signup", {
        method: "POST",
        // headers: {
        //   "Content-Type": "application/json",
        // },
        body: data,
      });

      if (response.ok) {
        const result = await response.json();
        successToast(
          "Verification email sent successfully. Please verify your email to login."
        );
        console.log(result);
      } else {
        console.error("Try another username/email taken");
        errorToast("This username or email already exists. Try another.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      errorToast("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  const validateInput = (e) => {
    const { name, value } = e.target;
    const usernameRegex = /^[a-zA-Z0-9._]+$/;

    setError((prev) => {
      const stateObj = { ...prev, [name]: "" };

      switch (name) {
        case "name":
          if (!value) {
            stateObj[name] = "Please enter your name.";
          }
          break;
        case "username":
          if (!value) {
            stateObj[name] = "Please enter Username.";
          } else if (!usernameRegex.test(value)) {
            stateObj[name] =
              "Username must not contain spaces or special characters other than _ or .";
          }
          break;
        case "email":
          if (!value) {
            stateObj[name] = "Please enter Email.";
          }
          break;
        case "password":
          if (value.length < 8) {
            stateObj[name] = "Password must contain at least 8 letters.";
          } else if (
            formData.confirmPassword &&
            value !== formData.confirmPassword
          ) {
            stateObj["confirmPassword"] =
              "Password and Confirm Password does not match.";
          } else {
            stateObj["confirmPassword"] = formData.confirmPassword
              ? ""
              : error.confirmPassword;
          }
          break;
        case "confirmPassword":
          if (!value) {
            stateObj[name] = "Please enter Confirm Password.";
          } else if (formData.password && value !== formData.password) {
            stateObj[name] = "Password and Confirm Password does not match.";
          }
          break;
        default:
          break;
      }

      return stateObj;
    });
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
        const response = await fetch(
          `http://localhost:8080/auth/google/callback?code=${codeResponse.code}`,
          {
            method: "GET",
          }
        );

        const result = await response.json();
        console.log("tokenResponse1: ", result);
        console.log("Welcome");
        localStorage.setItem("token", result.token);

        const decodedToken = jwtDecode(localStorage.getItem("token"));
        const { id, email, name, picture } = decodedToken;
        console.log("User information:", id, email, name, picture);

        setAuth({ isAuthenticated: true });
        navigate = useNavigate();
        navigate("/dashboard");
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
    flow: "auth-code",
  });

  return (
    <>
      <ToastContainer />
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="w-full lg:min-h-[calc(100vh)] h-full flex flex-col lg:flex-row justify-center font-poppins bg-slate-950 text-white pt-[62px] relative">
          {/* Image */}
          <div className=" w-full lg:w-1/2 h-[792px] flex-col hidden lg:flex justify-center items-center p-14 bg-slate-950 text-white">
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
              <h1 className="text-3xl font-semibold mb-5">Sign Up</h1>
              <div className="w-full mb-[10px]">
                <label
                  htmlFor="name"
                  className="text-white text-[14px] mb-[2px]"
                >
                  Full Name
                </label>
                <input
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={validateInput}
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  className={`w-full p-2 bg-transparent border-2 border-opacity-60 rounded-md border-white outline-none focus:outline-none text-[15px] ${
                    error.name && "border-red-500"
                  }`}
                  required
                />
                {error.name && (
                  <span className="err text-red-500 text-[14px]">
                    {error.name}
                  </span>
                )}
              </div>
              <div className="w-full mb-[10px]">
                <label
                  htmlFor="username"
                  className="text-white text-[14px] mb-[2px]"
                >
                  Username
                </label>
                <input
                  value={formData.username}
                  onChange={handleChange}
                  onBlur={validateInput}
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  className={`w-full p-2 bg-transparent border-2 border-opacity-60 rounded-md border-white outline-none focus:outline-none text-[15px] ${
                    error.username && "border-red-500"
                  }`}
                  required
                />
                {error.username && (
                  <span className="err text-red-500 text-[14px]">
                    {error.username}
                  </span>
                )}
              </div>
              <div className="w-full mb-[10px]">
                <label
                  htmlFor="email"
                  className="text-white text-[14px] mb-[2px]"
                >
                  Email
                </label>
                <input
                  value={formData.email}
                  type="email"
                  onChange={handleChange}
                  onBlur={validateInput}
                  autoComplete="off"
                  name="email"
                  placeholder="Enter your email"
                  className={`w-full p-2 bg-transparent border-2 border-opacity-60 rounded-md border-white outline-none focus:outline-none text-[15px] ${
                    error.email && "border-red-500"
                  }`}
                  required
                />
                {error.email && (
                  <span className="err text-red-500 text-[14px]">
                    {error.email}
                  </span>
                )}
              </div>
              <div className="w-full mb-[10px]">
                <label
                  htmlFor="password"
                  className="text-white text-[14px] mb-[2px]"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword1 ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={validateInput}
                    autoComplete="off"
                    name="password"
                    placeholder="Enter your password"
                    className={`w-full p-2 bg-transparent border-2 border-opacity-60 rounded-md border-white outline-none focus:outline-none text-[15px] ${
                      error.password && "border-red-500"
                    }`}
                    required
                  />
                  {error.password && (
                    <span className="err text-red-500 text-[14px]">
                      {error.password}
                    </span>
                  )}
                  <button
                    type="button"
                    className="absolute right-2 top-2 text-white"
                    onClick={handleTogglePassword1}
                  >
                    {showPassword1 ? (
                      <FontAwesomeIcon
                        icon={faEye}
                        className="text-white h-[16px] w-[16px]"
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faEyeSlash}
                        className="text-white h-[16px] w-[16px]"
                      />
                    )}
                  </button>
                </div>
              </div>
              <div className="w-full mb-[10px]">
                <label
                  htmlFor="confirmPassword"
                  className="text-white text-[14px] mb-[2px]"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword2 ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onBlur={validateInput}
                    name="confirmPassword"
                    placeholder="Confirm password"
                    className={`w-full p-2 bg-transparent border-2 border-opacity-60 rounded-md border-white outline-none focus:outline-none text-[15px] ${
                      error.confirmPassword && "border-red-500"
                    }`}
                    required
                  />
                  {error.confirmPassword && (
                    <span className="err text-red-500 text-[14px]">
                      {error.confirmPassword}
                    </span>
                  )}
                  <button
                    type="button"
                    className="absolute right-2 top-2 text-white"
                    onClick={handleTogglePassword2}
                  >
                    {showPassword2 ? (
                      <FontAwesomeIcon
                        icon={faEye}
                        className="text-white h-[16px] w-[16px]"
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faEyeSlash}
                        className="text-white h-[16px] w-[16px]"
                      />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="text-[14px]">Upload your profile image</label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  required
                  className={`w-full p-2 bg-transparent border-2 border-opacity-60 rounded-md border-white outline-none focus:outline-none text-[15px]`}
                />
              </div>

              <div className="w-full flex items-center justify-between mt-2">
                <div className="w-full flex items-center">
                  <input type="checkbox" className="h-4 mr-1" required />
                  <p className="text-sm">I agree to the <NavLink className="underline" to={"/termsandconditions"}>Terms & Conditions</NavLink></p>
                </div>
              </div>
              {/* <div className="w-full my-4">
                <button
                  type="submit"
                  className="w-full text-white my-2 font-semibold bg-[#6C63FF] rounded-md p-3 text-center flex items-center justify-center hover:bg-opacity-60 transition-colors duration-300"
                >
                  {loading ? (
                    <CircularLoader />
                  ) : (
                    "Sign Up"
                  )}
                </button>
              </div> */}
              <div className="w-full my-4">
                <button
                  type="submit"
                  className="w-full text-white my-2 font-semibold bg-[#6C63FF] rounded-md p-3 text-center flex items-center justify-center hover:bg-opacity-60 transition-colors duration-300"
                  // disabled={Object.values(error).some((err) => err !== "")}
                  onClick={(e) => {
                    const hasErrors = Object.values(error).some(
                      (err) => err !== ""
                    );
                    if (hasErrors) {
                      e.preventDefault();
                      errorToast(
                        "Fill all the fields correctly before submitting the form."
                      );
                    }
                  }}
                >
                  {loading ? <CircularLoader /> : "Sign Up"}
                </button>
              </div>
              <div className="w-full flex items-center justify-center relative py-1 mb-3">
                <div className="w-full h-[1px] bg-white"></div>
                <p className="text-lg absolute bg-[#1F1D1D] px-2 top-1/2 transform -translate-y-1/2">
                  OR
                </p>
              </div>
              <div
                className="w-full text-white my-2 bg-[#1F1D1D] border border-opacity-60 border-white rounded-md p-4 text-center flex items-center justify-center hover:bg-gray-900 transition-colors duration-300 cursor-pointer"
                onClick={() => handleGoogleSignIn()}
              >
                <img
                  src="../assets/google_logo.png"
                  className="h-6 mr-2"
                  alt="google logo"
                />
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
