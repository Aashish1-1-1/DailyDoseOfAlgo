import React, { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

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

  return (
    <>
      <nav className="bg-[rgba(0,0,0)] w-full px-[80px] py-[20px] flex items-center justify-between z-20 font-poppins transition-all duration-300 ease-in-out">
        <Link to="/" className="brand-logo">
          <img src={"/assets/logo.png"} alt="brand-logo" className="h-8" />
        </Link>
        <ul
          id="nav-mobile"
          className="text-white sm:flex-row flex flex-col gap-5"
        >
          <li>
            <NavLink
              to="/"
              className={({isActive})=>`hover:font-medium hover:text-purple-500 transition-all ease-in duration-300 ${isActive ? 'text-purple-500 font-semibold' : 'text-white'}`}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({isActive})=>`hover:font-medium hover:text-purple-500 transition-all ease-in duration-300 ${isActive ? 'text-purple-500 font-semibold' : 'text-white'}`}
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/algorithms"
              className={({isActive})=>`hover:font-medium hover:text-purple-500 transition-all ease-in duration-300 ${isActive ? 'text-purple-500 font-semibold' : 'text-white'}`}
            >
              Algorithms
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/quizes"
              className={({isActive})=>`hover:font-medium hover:text-purple-500 transition-all ease-in duration-300 ${isActive ? 'text-purple-500 font-semibold' : 'text-white'}`}
            >
              Quizes
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({isActive})=>`hover:font-medium hover:text-purple-500 transition-all ease-in duration-300 ${isActive ? 'text-purple-500 font-semibold' : 'text-white'}`}
            >
              Contact
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Header;
