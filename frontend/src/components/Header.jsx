import React from "react";

const Header = () => {
  return (
    <>
      <header className="bg-[url('../assets/Background.png')] h-screen bg-cover relative flex justify-center">
        <div className="overlay absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
        <div className="overlay absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-cyan-500 from-20% via-blue-500 via-40% to-transparent to-60% opacity-20"></div>
        <nav className="bg-[rgba(0,0,0,0.85)] fixed top-4 left-4 right-4 px-[80px] py-4 flex items-center justify-between rounded-full z-20">
          <a href="/" className="brand-logo">
            <img src={"./assets/logo.png"} alt="brand-logo" className="h-8" />
          </a>
          <ul
            id="nav-mobile"
            className="text-white sm:flex-row flex flex-col gap-5"
          >
            <li>
              <a
                href="/#"
                className="text-white hover:tracking-wider hover:font-medium hover:text-purple-500 transition-all ease-in duration-300"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/#"
                className="text-white hover:tracking-wider hover:font-medium hover:text-purple-500 transition-all ease-in duration-300"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="/#"
                className="text-white hover:tracking-wider hover:font-medium hover:text-purple-500 transition-all ease-in duration-300"
              >
                Algorithms
              </a>
            </li>
            <li>
              <a
                href="/#"
                className="text-white hover:tracking-wider hover:font-medium hover:text-purple-500 transition-all ease-in duration-300"
              >
                Quizes
              </a>
            </li>
            <li>
              <a
                href="/#"
                className="text-white hover:tracking-wider hover:font-medium hover:text-purple-500 transition-all ease-in duration-300"
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
        <main className="flex flex-col items-center justify-center z-10">
          <h1 className="text-white text-6xl mb-6 font-black text-center font-playfair ">
            Welcome to <br /> Daily Dose of Algo.
          </h1>
          <p className="text-gray-200 text-2xl text-center">
            Your ultimate destination for mastering algorithms <br /> through
            practice, community engagement, and interactive learning.
          </p>
          <div className="btn-container mt-6 flex gap-2">
            <a
              href="/#"
              className="text-white hover:text-white bg-purple-500 px-6 py-3 font-semibold rounded-md hover:tracking-wider hover:bg-transparent border-transparent border-2 hover:border-gray-500 ease-in transition-all"
            >
              Get Started
            </a>
            <a
              href="/#"
              className="text-white hover:text-white hover:bg-purple-500 hover:border-purple-500 border-2 border-gray-500 px-6 py-3 font-semibold rounded-md hover:tracking-wider ease-in transition-all"
            >
              Discover more
            </a>
          </div>
        </main>
      </header>
    </>
  );
};

export default Header;
