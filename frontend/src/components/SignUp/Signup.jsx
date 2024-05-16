import React from "react";
const SignUp = () => {
  return (
    <>
      <div className="w-full h-full flex items-start justify-center">
        {/* Image */}
        <div className="relative 1/2 h-full flex flex-col">
          <img src="../assets/signup.png" className="w-full h-full object-cover" alt="Signup" />
        </div>

        {/* Text container */}
        <div className="w-1/2 bg-white flex flex-col p-7 justify-center">
          <div className="w-full flex flex-col max-w-[550px] items-center">
            <h1 className="text-xl font-semibold mb-7 py-7">
              DailyDoseOfAlgo
            </h1>
            <div className="w-full flex flex-col">
              <input
                type="text"
                placeholder="Username"
                className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
              />
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
              />
            </div>
            <div className="w-full flex items-center justify-between">
              <div className="w-full flex items-center">
                <input type="checkbox" className="h-4 mr-2" />
                <p className="text-sm">I agree to the Terms & Conditions</p>
              </div>
            </div>

            <div className="w-full flex flex-col my-4">
              <button className="w-full text-white my-2 font-semibold bg-[#060606] rounded-md p-4 text-center flex items-center justify-center hover:bg-gray-800 transition-colors duration-300">
                Sign Up
              </button>
            </div>
            <div className="w-full flex items-center justify-center relative py-1">
              <div className="w-full h-[1px] bg-white"></div>
              <p className="text-lg absolute bg-white -top-1/2 transform -translate-y-1/2">
                or
              </p>
            </div>
            <div className="w-full text-[#060606] my-2 bg-white border-2 border-black rounded-md p-4 text-center flex items-center justify-center hover:bg-gray-800 transition-colors duration-300 cursor-pointer">
              <img src="../assets/google_logo.png" className="h-6 mr-2" />
              Sign Up With Google
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
