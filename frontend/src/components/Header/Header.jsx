import React, { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Header.css";

const Header = () => {
  // useEffect(() => {
  //   const onScroll = (event) => {
  //     const scrollPosition = window.scrollY;
  //     if (scrollPosition > 10) {
  //       document.querySelector('nav').classList.add('bg-[rgba(0,0,0)]');
  //       document.querySelector('nav').classList.remove('py-[30px]');
  //       document.querySelector('nav').classList.add('py-[20px]');
  //     } else {
  //       document.querySelector('nav').classList.remove('bg-[rgba(0,0,0)]');
  //       document.querySelector('nav').classList.remove('py-[20px]');
  //       document.querySelector('nav').classList.add('py-[30px]');
  //     }

  //   };

  //   window.addEventListener('scroll', onScroll);

  //   return () => {
  //     window.removeEventListener('scroll', onScroll);
  //   }
  // }, []);
  useEffect(() => {
    document.onclick = (e) => {
      if (e.target.id !== "toggle-menu" && e.target.id !== "nav-links") {
        document.querySelector(".toggle-menu").classList.remove("active");
        document.querySelector(".nav-links").classList.remove("active");
      }
    };
  }, []);

  return (
    <>
      <nav className="bg-[rgba(0,0,0)] w-full px-[20px] sm:px-[80px] py-[10px] sm:py-[20px] flex items-center justify-between z-20 font-poppins transition-all duration-300 ease fixed">
        <Link to="/" className="brand-logo">
          <img src={"/assets/logo.png"} alt="brand-logo" className="h-8" />
        </Link>
        <ul
          id="nav-links"
          className="nav-links text-white flex flex-col items-center fixed bg-slate-950 h-screen w-3/5 left-0 top-[70px] sm:flex-row sm:gap-5 -translate-x-full transition-all ease-in duration-300 z-10 sm:relative sm:h-auto sm:w-auto sm:bg-transparent sm:top-0 sm:translate-x-0"
        >
          <li className="w-full m-0">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `w-full h-full py-[10px] px-[30px] m-0 text-xl block font-medium hover:bg-white hover:text-purple-500 sm:text-lg sm:hover:bg-transparent sm:p-0 transition-all ease-in duration-300 ${
                  isActive ? "text-purple-500 bg-white sm:bg-transparent" : "text-white"
                }`
              }
            >
              Home
            </NavLink>
          </li>
          <li className="w-full m-0">
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `w-full h-full py-[10px] px-[30px] m-0 text-xl block font-medium hover:bg-white hover:text-purple-500 sm:text-lg sm:hover:bg-transparent sm:p-0 transition-all ease-in duration-300 ${
                  isActive ? "text-purple-500 bg-white sm:bg-transparent" : "text-white"
                }`
              }
            >
              About
            </NavLink>
          </li>
          <li className="w-full m-0">
            <NavLink
              to="/algorithms"
              className={({ isActive }) =>
                `w-full h-full py-[10px] px-[30px] m-0 text-xl block font-medium hover:bg-white hover:text-purple-500 sm:text-lg sm:hover:bg-transparent sm:p-0 transition-all ease-in duration-300 ${
                  isActive ? "text-purple-500 bg-white sm:bg-transparent" : "text-white"
                }`
              }
            >
              Algorithms
            </NavLink>
          </li>
          <li className="w-full m-0">
            <NavLink
              to="/quizes"
              className={({ isActive }) =>
                `w-full h-full py-[10px] px-[30px] m-0 text-xl block font-medium hover:bg-white hover:text-purple-500 sm:text-lg sm:hover:bg-transparent sm:p-0 transition-all ease-in duration-300 ${
                  isActive ? "text-purple-500 bg-white sm:bg-transparent" : "text-white"
                }`
              }
            >
              Quizes
            </NavLink>
          </li>
          <li className="w-full m-0">
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `w-full h-full py-[10px] px-[30px] m-0 text-xl block font-medium hover:bg-white hover:text-purple-500 sm:text-lg sm:hover:bg-transparent sm:p-0 transition-all ease-in duration-300 ${
                  isActive ? "text-purple-500 bg-white sm:bg-transparent" : "text-white"
                }`
              }
            >
              Contact
            </NavLink>
          </li>
        </ul>
        <div
          class="toggle-menu h-[50px] w-[50px] rounded-lg relative flex justify-center items-center overflow-hidden cursor-pointer sm:hidden"
          id="toggle-menu"
          onClick={(e) => {
            e.target.classList.toggle("active");
            document.querySelector(".nav-links").classList.toggle("active");
          }}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>
    </>
  );
};

export default Header;
