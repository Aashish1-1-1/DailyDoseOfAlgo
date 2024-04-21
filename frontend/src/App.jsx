import React from 'react'
// import logo from './assets/logo.png'

const App = () => {
  return (
    <>
      <div className="bg-slate-900 font-poppins">
        <header className="bg-[url('../assets/Background.png')] h-screen bg-cover relative flex justify-center">
          <div className="overlay absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
          <div className="overlay absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-cyan-500 from-20% via-blue-500 via-40% to-transparent to-60% opacity-20"></div>
          <nav className="bg-[rgba(0,0,0,0.85)] fixed top-4 left-4 right-4 px-[80px] py-4 flex items-center justify-between rounded-full z-20">
            <a href="/" className="brand-logo">
              <img src={"./assets/logo.png"} alt="brand-logo" className="h-8" />
            </a>
            <ul id="nav-mobile" className="text-white sm:flex-row flex flex-col gap-5">
              <li><a href="/#" className="text-white hover:tracking-wider hover:font-medium hover:text-purple-500 transition-all ease-in duration-300">Home</a></li>
              <li><a href="/#" className="text-white hover:tracking-wider hover:font-medium hover:text-purple-500 transition-all ease-in duration-300">About</a></li>
              <li><a href="/#" className="text-white hover:tracking-wider hover:font-medium hover:text-purple-500 transition-all ease-in duration-300">Algorithms</a></li>
              <li><a href="/#" className="text-white hover:tracking-wider hover:font-medium hover:text-purple-500 transition-all ease-in duration-300">Quizes</a></li>
              <li><a href="/#" className="text-white hover:tracking-wider hover:font-medium hover:text-purple-500 transition-all ease-in duration-300">Contact</a></li>
            </ul>
          </nav>
          <main className="flex flex-col items-center justify-center z-10">
            <h1 className="text-white text-6xl mb-6 font-black text-center font-playfair ">Welcome to <br/> Daily Dose of Algo.</h1>
            <p className="text-gray-200 text-2xl text-center">Your ultimate destination for mastering algorithms <br/> through practice, community engagement, and interactive learning.</p>
            <div className="btn-container mt-6 flex gap-2">
              <a href="/#" className="text-white hover:text-white bg-purple-500 px-6 py-3 font-semibold rounded-md hover:tracking-wider hover:bg-transparent border-transparent border-2 hover:border-gray-500 ease-in transition-all">Get Started</a>
              <a href="/#" className="text-white hover:text-white hover:bg-purple-500 hover:border-purple-500 border-2 border-gray-500 px-6 py-3 font-semibold rounded-md hover:tracking-wider ease-in transition-all">Discover more</a>
            </div>
          </main>
        </header>

        <section className="bg-slate-950 min-h-[100vh] w-full flex flex-col justify-center items-center px-60 md:px-6 max-md:px-6 max-sm:px-6">
          <h2 className="font-bold font-playfair text-purple-500 text-4xl mb-4">Our Vision</h2>
          <h1 className="font-black font-playfair text-white text-6xl text-center leading-snug max-md:text-5xl max-sm:text-4xl">Empowering developers to enhance their algorithmic skills through a daily regimen of challenges and content.</h1>
        </section>

        <section className="bg-black py-16 w-full flex flex-col px-20 max-md:px-6 max-sm:px-6 justify-center">
          <h2 className="font-bold font-playfair text-white text-5xl leading-normal">Algorithm Mastery Awaits</h2>
          <p className="font-poppins text-white font-light">Embark on your journey to expertise.</p>

          <div className="cards flex gap-8 flex-wrap mt-8">
            <div className="card border-2 w-[350px] rounded-xl">
              <img src="./assets/image1.png" alt="" className="w-[350px] bg-cover overflow-hidden rounded-t-xl" />
              <div className="content p-4">
                <p className="text-white font-extralight text-xs mb-1">Sharpen your skills</p>
                <h4 className="text-white font-medium text-2xl">Daily Custom Challenges</h4>
                <h6 className="text-white font-extralight text-sm mb-2">Tailored problems to fit your skill level.</h6>
                <a href="" className="text-white font-light text-xs">Accept Challenge</a>
              </div>
            </div>

            <div className="card border-2 w-[350px] rounded-xl">
              <img src="./assets/image2.png" alt="" className="w-[350px] bg-cover overflow-hidden rounded-t-xl" />
              <div className="content p-4">
                <p className="text-white font-extralight text-xs mb-1">Interactive Learning</p>
                <h4 className="text-white font-medium text-2xl">Real-time Feedback System</h4>
                <h6 className="text-white font-extralight text-sm mb-2">Instant evaluation to guide your progress.</h6>
                <a href="" className="text-white font-light text-xs">Try Now</a>
              </div>
            </div>

            <div className="card border-2 w-[350px] rounded-xl">
              <img src="./assets/image3.png" alt="" className="w-[350px] bg-cover overflow-hidden rounded-t-xl" />
              <div className="content p-4">
                <p className="text-white font-extralight text-xs mb-1">Community Wisdom</p>
                <h4 className="text-white font-medium text-2xl">Engage with Fellow Coders</h4>
                <h6 className="text-white font-extralight text-sm mb-2">Share insights and gain new perspectives.</h6>
                <a href="" className="text-white font-light text-xs">Join Discussion</a>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-950 min-h-[100vh] w-full flex flex-col max-md:px-6 max-sm:px-6 px-20 py-20">
        <h2 className="font-bold font-playfair text-white text-5xl leading-normal">Getting Started</h2>

        <div className="content flex border-b-2 border-gray-500 mb-10 pb-6">
          <h3 className="font-bold font-playfair text-white text-9xl">1</h3>
          <div className='flex flex-col justify-center items-center w-full'>
            <div>
              <h3 className='text-3xl font-normal mb-2'>Sign Up</h3>
              <p className="text-white font-light">Create an account to access the full range of features.</p>
            </div>
          </div>
        </div>

        <div className="content flex border-b-2 border-gray-500 mb-10 pb-6">
          <h3 className="font-bold font-playfair text-white text-9xl">2</h3>
          <div className='flex flex-col justify-center items-center w-full'>
            <div>
              <h3 className='text-3xl font-normal mb-2'>Choose a Lesson</h3>
              <p className="text-white font-light">Select topic from our extensive library of algorithms.</p>
            </div>
          </div>
        </div>

        <div className="content flex border-b-2 border-gray-500 mb-10 pb-6">
          <h3 className="font-bold font-playfair text-white text-9xl">3</h3>
          <div className='flex flex-col justify-center items-center w-full'>
            <div>
              <h3 className='text-3xl font-normal mb-2'>Solve the Quiz</h3>
              <p className="text-white font-light">Implement your learning and solve the quizzes.</p>
            </div>
          </div>
        </div>


        </section>
      </div>
    </>
  )
}

export default App