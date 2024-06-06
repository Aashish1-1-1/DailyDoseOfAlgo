import React, { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { faUser } from "@fortawesome/fontawesome-free-solid";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Header.css";
import { useAuth } from '../../Context/Auth'


const Header = () => {
  const id = "aashish";
  const { auth } = useAuth();

  let isAuthenticated = auth.isAuthenticated;

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
const handellogout=()=>{
	    localStorage.removeItem('token');
}

  return (
    <>
 	  {auth.isAuthenticated ? console.log("Authenticated"):console.log("Not authenticated")}
     <nav className="bg-[rgba(0,0,0)] w-full px-[20px] sm:px-[80px] py-[10px] flex items-center justify-between z-20 font-poppins transition-all duration-300 ease fixed min-h-[62px]">
        <Link to="/" className="brand-logo">
          <img src={"/assets/logo.png"} alt="brand-logo" className="h-8" />
        </Link>
        <div className="flex justify-center items-center">
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
        
        { isAuthenticated &&
        <div id="user-menu" className="image-container cursor-pointer ml-4 h-[42px] w-[42px] object-fill rounded-[50%] overflow-hidden" onClick={(e)=>{
          document.querySelector(".sub-menu-wrap").classList.toggle("active");
        }}>
          <img src={"/assets/aashish.jpeg"} alt="user" className="" />
        </div>
        }
        { isAuthenticated && (
        <div id="sub-menu" className="sub-menu-wrap overflow-hidden absolute top-full right-[5%] w-[240px] transition-all duration-300 ease text-white rounded-md bg-gray-800 p-[20px] m-[10px]">
          <div className="sub-menu ">
            <div className="user-info flex items-center">
              <img src={"/assets/aashish.jpeg"} alt="user" className="w-[50px] rounded-[50%] mr-[15px]" />
              <h2 className="font-medium">Aashish Adhikari</h2>
            </div>
            <hr className="border-0 h-[1px] w-full bg-[#ccc] mt-[15px]"/>

            <ul className="sub-menu-links mt-[10px] flex flex-col">
              <li className="mb-[10px] inline-flex items-center">
                <FontAwesomeIcon icon={faUser} className="text-[#525252] bg-[#e5e5e5] rounded-[50%] p-[8px] mr-[15px] h-[16px] w-[16px]"/>
                <NavLink to={`/user/${id}`} className="text-[#a5a5a5] font-medium block hover:text-purple-500 text-[18px]">Profile</NavLink>
              </li>
              <li className="mb-[10px] inline-flex">
                <FontAwesomeIcon icon={faRightFromBracket} className="text-[#525252] bg-[#e5e5e5] rounded-[50%] p-[8px] mr-[15px] h-[16px] w-[16px]"/>
                <NavLink to="/login" className="text-[#a5a5a5] font-medium block hover:text-purple-500 text-[16px]" onClick={handellogout}>Logout</NavLink>
              </li>
            </ul>
          </div>
        </div>
        )}


        </div>
        <div
          class="toggle-menu h-[40px] w-[40px] rounded-lg relative flex justify-center items-center overflow-hidden cursor-pointer sm:hidden"
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
