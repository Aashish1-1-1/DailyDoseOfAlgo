import React from "react";

const About = () => {
  return (
    <div className="flex flex-col px-4 py-8 bg-black">
      <h1 className="text-3xl text-white font-bold mb-4 font-serif ">About</h1>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 md:pr-4 mb-4 md:mb-0">
          <div className="text-lg text-white py-2 font-Times New Roman italic">
            <h1>-DailyDoseOfAlgo</h1>
          </div>
          <img
            src="./assets/Background.png"
            alt="About Us"
            className="rounded-lg w-full h-auto"
          />
        </div>
        <div className="md:w-1/2 md:pl-4 py-8">
          <p className="text-lg text-white mb-4">
            DailyDoseofAlgo proposes a comprehensive online platform dedicated to
            facilitating algorithm learning for users and enthusiasts. The platform offers a
            daily dose of algorithm publications covering various topics, coupled with
            interactive quizzes to reinforce understanding. Leveraging streaks and points
            systems, the platform fosters user engagement and motivation. With features
            including user profiles and community engagement tools, the platform aims to
            provide a personalized and interactive learning experience. Developed using
            modern web technologies and following a systematic implementation timeline,
            DailyDoseofAlgo seeks to revolutionize algorithm learning, empowering users to
            embark on a rewarding journey of continuous improvement and mastery.
          </p>
          <p className="text-lg text-white">
            Moreover, with the incorporation of streaks and points systems, DailyDoseofAlgo
            adds an element of gamification to the learning process, motivating users to
            remain consistent and committed to their learning goals. By tracking user progress
            and rewarding milestones, the platform instills a sense of achievement and
            progress, encouraging users to actively engage with the content on a daily basis.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
