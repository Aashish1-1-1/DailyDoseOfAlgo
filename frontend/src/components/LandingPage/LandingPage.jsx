import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../Context/Auth";
import Tilt from "react-parallax-tilt";

const LandingPage = () => {
  const { auth } = useAuth();
  let isAuthenticated = auth.isAuthenticated;

  return (
    <>
      {/* Header */}
      <div className="bg-slate-900 font-poppins">
        <header className="bg-[url('../assets/Background.png')] h-screen bg-cover relative flex justify-center">
          <div className="overlay absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
          <div className="overlay absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-cyan-500 from-20% via-blue-500 via-40% to-transparent to-60% opacity-20"></div>

          <main className="flex flex-col items-center justify-center z-10">
            <h1 className="text-white text-6xl mb-6 font-black text-center font-playfair ">
              Welcome to <br /> Daily Dose of Algo.
            </h1>
            <p className="text-gray-200 text-2xl text-center">
              Your ultimate destination for mastering algorithms <br /> through
              practice, community engagement, and interactive learning.
            </p>
            <div className="btn-container mt-6 flex gap-2">
              <NavLink
                to={isAuthenticated ? "/dashboard" : "/login"}
                className="text-white hover:text-white bg-purple-500 px-6 py-3 font-semibold rounded-md hover:tracking-wider hover:bg-transparent border-transparent border-2 hover:border-gray-500 ease-in transition-all"
              >
                Get Started
              </NavLink>
              <NavLink
                to="/about"
                className="text-white hover:text-white hover:bg-purple-500 hover:border-purple-500 border-2 border-gray-500 px-6 py-3 font-semibold rounded-md hover:tracking-wider ease-in transition-all"
              >
                Discover more
              </NavLink>
            </div>
          </main>
        </header>
        {/* Our Vision section */}
        <section className="bg-slate-950 min-h-[100vh] w-full flex flex-col justify-center items-center px-60 md:px-6 max-md:px-6 max-sm:px-6">
          <h2 className="font-bold font-playfair text-purple-500 text-4xl mb-4">
            Our Vision
          </h2>
          <h1 className="font-black font-playfair text-white text-6xl text-center leading-snug max-md:text-5xl max-sm:text-4xl">
            Empowering developers to enhance their algorithmic skills through a
            daily regimen of challenges and content.
          </h1>
        </section>

        {/* Some information section */}
        <section className="bg-black py-16 w-full flex flex-col px-20 max-md:px-6 max-sm:px-6 justify-center">
          <h2 className="font-bold font-playfair text-white text-5xl leading-normal text-center">
            Algorithm Mastery Awaits
          </h2>
          <p className="font-poppins text-white font-light text-center">
            Embark on your journey to expertise.
          </p>

          <div className="cards flex gap-8 flex-wrap mt-8 justify-center">
            <div className="card border-2 w-[350px] rounded-xl">
              <img
                src="./assets/image1.png"
                alt=""
                className="w-[350px] bg-cover overflow-hidden rounded-t-xl"
              />
              <div className="content p-4">
                <p className="text-white font-extralight text-xs mb-1">
                  Sharpen your skills
                </p>
                <h4 className="text-white font-medium text-2xl">
                  Daily Algorithm and Quizes
                </h4>
                <h6 className="text-white font-extralight text-sm mb-2">
                  Tailored problems to fit your skill level.
                </h6>
                <a href="/algorithms" className="text-white font-light text-xs">
                  Accept Challenge
                </a>
              </div>
            </div>

            <div className="card border-2 w-[350px] rounded-xl">
              <img
                src="./assets/image2.png"
                alt=""
                className="w-[350px] bg-cover overflow-hidden rounded-t-xl"
              />
              <div className="content p-4">
                <p className="text-white font-extralight text-xs mb-1">
                  Interactive Learning
                </p>
                <h4 className="text-white font-medium text-2xl">
                  Real-time Quiz Evaluation
                </h4>
                <h6 className="text-white font-extralight text-sm mb-2">
                  Instant evaluation and your learned topics to track your progress.
                </h6>
                <a href="/algorithms" className="text-white font-light text-xs">
                  Try Now
                </a>
              </div>
            </div>

            <div className="card border-2 w-[350px] rounded-xl">
              <img
                src="./assets/image3.png"
                alt=""
                className="w-[350px] bg-cover overflow-hidden rounded-t-xl"
              />
              <div className="content p-4">
                <p className="text-white font-extralight text-xs mb-1">
                  Real time Leaderboard
                </p>
                <h4 className="text-white font-medium text-2xl">
                  Compete with Fellow Coders
                </h4>
                <h6 className="text-white font-extralight text-sm mb-2">
                  Learn algortihm, solve the quiz and score.
                </h6>
                <a href={`/user/${auth.Username}`} className="text-white font-light text-xs">
                  View your ranking
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Getting Started section */}
        <section className="bg-slate-950 min-h-[100vh] w-full flex flex-col max-md:px-6 max-sm:px-6 px-20 py-20 text-white">
          <h2 className="font-bold font-playfair text-white text-5xl leading-normal text-center mb-3">
            Getting Started
          </h2>

          <div className="content flex border-b-2 border-gray-500 mb-10 pb-6">
            <div className="w-[40%]">
              <h3 className="font-bold font-playfair text-white text-9xl">1</h3>
            </div>
            <div className="flex flex-col justify-center w-full">
              <div>
                <h3 className="text-3xl font-normal mb-2">Sign Up</h3>
                <p className="text-white font-light">
                  Create an account to access the full range of features.
                </p>
              </div>
            </div>
          </div>

          <div className="content flex border-b-2 border-gray-500 mb-10 pb-6">
            <div className="w-[40%]">
              <h3 className="font-bold font-playfair text-white text-9xl">2</h3>
            </div>
            <div className="flex flex-col justify-center w-full">
              <div>
                <h3 className="text-3xl font-normal mb-2">Choose a Lesson</h3>
                <p className="text-white font-light">
                  Select topic from our extensive library of algorithms.
                </p>
              </div>
            </div>
          </div>

          <div className="content flex border-b-2 border-gray-500 mb-10 pb-6">
            <div className="w-[40%]">
              <h3 className="font-bold font-playfair text-white text-9xl">3</h3>
            </div>
            <div className="flex flex-col justify-center w-full">
              <div>
                <h3 className="text-3xl font-normal mb-2">Solve the Quiz</h3>
                <p className="text-white font-light">
                  Implement your learning and solve the quizzes.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Meet our Team section */}
        <section className="bg-black w-full flex flex-col max-md:px-6 max-sm:px-6 px-20 py-20 text-white">
          <h2 className="font-bold font-playfair text-white text-5xl leading-normal text-center mb-2">
            Meet our team
          </h2>

          <div className="w-full flex flex-wrap gap-5 justify-center">
            {/* one box of one team member */}
            <Tilt
              className="overflow-hidden rounded-lg"
              perspective={500}
              glareEnable={true}
              glareMaxOpacity={0.55}
              scale={1.02}
            >
              <div className="h-[270px] w-[250px] bg-[#242424] rounded-lg flex justify-center items-center flex-col">
                <div className="imgContainer w-[110px] h-[110px] rounded-full border-2 border-[#1F68F7]">
                  <img
                    src="./assets/sanjib.jpg"
                    alt=""
                    className=" object-cover w-full h-full rounded-full"
                  />
                </div>
                <h3 className="font-bold text-[20px]">Sanjib Dahal</h3>
                <p className="font-light text-[15px] text-[#1F68F7] mt-[-6px] mb-[6px]">
                  Fullstack Developer
                </p>
                <div className="social-icons flex gap-2">
                  <a href="https://twitter.com/san_jib_dahal">
                    <FontAwesomeIcon
                      icon={faXTwitter}
                      className="text-white h-[24px] w-[24px]"
                    />
                  </a>
                  <a href="https://www.linkedin.com/in/sanjib-dahal">
                    <FontAwesomeIcon
                      icon={faLinkedin}
                      className="text-white h-[24px] w-[24px]"
                    />
                  </a>
                  <a href="https://www.facebook.com/sanjib.dahal04">
                    <FontAwesomeIcon
                      icon={faFacebook}
                      className="text-white h-[24px] w-[24px]"
                    />
                  </a>
                </div>
              </div>
            </Tilt>

            <Tilt
              className="overflow-hidden rounded-lg"
              perspective={500}
              glareEnable={true}
              glareMaxOpacity={0.45}
              scale={1.02}
            >
              <div className="h-[270px] w-[250px] bg-[#242424] rounded-lg flex justify-center items-center flex-col">
                <div className="imgContainer w-[110px] h-[110px] rounded-full border-2 border-[#1F68F7]">
                  <img
                    src="./assets/giri.jpg"
                    alt=""
                    className="object-cover w-full h-full rounded-full"
                  />
                </div>
                <h3 className="font-bold text-[20px]">Aryaman Giri</h3>
                <p className="font-light text-[15px] text-[#1F68F7] mt-[-6px] mb-[6px]">
                  Frontend Developer
                </p>
                <div className="social-icons flex gap-2">
                  <a href="https://x.com/Gannibro">
                    <FontAwesomeIcon
                      icon={faXTwitter}
                      className="text-white h-[24px] w-[24px]"
                    />
                  </a>
                  <a href="https://www.linkedin.com/in/aryaman-giri-945b5a1b6/">
                    <FontAwesomeIcon
                      icon={faLinkedin}
                      className="text-white h-[24px] w-[24px]"
                    />
                  </a>
                  <a href="https://www.facebook.com/aryaman.giri.9">
                    <FontAwesomeIcon
                      icon={faFacebook}
                      className="text-white h-[24px] w-[24px]"
                    />
                  </a>
                </div>
              </div>
            </Tilt>

            <Tilt
              className="overflow-hidden rounded-lg"
              perspective={500}
              glareEnable={true}
              glareMaxOpacity={0.45}
              scale={1.02}
            >
              <div className="h-[270px] w-[250px] bg-[#242424] rounded-lg flex justify-center items-center flex-col">
                <div className="imgContainer w-[110px] h-[110px] rounded-full border-2 border-[#1F68F7]">
                  <img
                    src="./assets/aashish.jpeg"
                    alt=""
                    className="object-cover w-full h-full rounded-full"
                  />
                </div>
                <h3 className="font-bold text-[20px]">Aashish Adhikari</h3>
                <p className="font-light text-[15px] text-[#1F68F7] mt-[-6px] mb-[6px]">
                  GoLang Developer
                </p>
                <div className="social-icons flex gap-2">
                  <a href="https://x.com/AashishAdh9?t=8ZBIBJ8Fi93dzx13i8PG1Q&s=09">
                    <FontAwesomeIcon
                      icon={faXTwitter}
                      className="text-white h-[24px] w-[24px]"
                    />
                  </a>
                  <a href="https://www.linkedin.com/in/aashish-adhikari-92a958212">
                    <FontAwesomeIcon
                      icon={faLinkedin}
                      className="text-white h-[24px] w-[24px]"
                    />
                  </a>
                  <a href="https://www.facebook.com/100014331156052">
                    <FontAwesomeIcon
                      icon={faFacebook}
                      className="text-white h-[24px] w-[24px]"
                    />
                  </a>
                </div>
              </div>
            </Tilt>

            <Tilt
              className="overflow-hidden rounded-lg"
              perspective={500}
              glareEnable={true}
              glareMaxOpacity={0.45}
              scale={1.02}
            >
              <div className="h-[270px] w-[250px] bg-[#242424] rounded-lg flex justify-center items-center flex-col">
                <div className="imgContainer w-[110px] h-[110px] rounded-full border-2 border-[#1F68F7]">
                  <img
                    src="./assets/hridayanshu.jpg"
                    alt=""
                    className="object-cover w-full h-full rounded-full"
                  />
                </div>
                <h3 className="font-bold text-[20px]">Hridayanshu Acharya</h3>
                <p className="font-light text-[15px] text-[#1F68F7] mt-[-6px] mb-[6px]">
                  Frontend Developer
                </p>
                <div className="social-icons flex gap-2">
                  <a href="https://x.com/hridayanshu23?s=21">
                    <FontAwesomeIcon
                      icon={faXTwitter}
                      className="text-white h-[24px] w-[24px]"
                    />
                  </a>
                  <a href="https://www.linkedin.com/in/hridayanshu-raj-acharya-4b4a96265/">
                    <FontAwesomeIcon
                      icon={faLinkedin}
                      className="text-white h-[24px] w-[24px]"
                    />
                  </a>
                  <a href="https://www.facebook.com/Hridayanshu23">
                    <FontAwesomeIcon
                      icon={faFacebook}
                      className="text-white h-[24px] w-[24px]"
                    />
                  </a>
                </div>
              </div>
            </Tilt>
          </div>
        </section>
      </div>
    </>
  );
};

export default LandingPage;
