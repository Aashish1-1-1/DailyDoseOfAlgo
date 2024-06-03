import React, { useState, useEffect } from "react";
import profileData from "./data.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire } from "@fortawesome/free-solid-svg-icons";

const User = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    setUserData(profileData);
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  const {
    name,
    submissions,
    leaderboard,
    learningProgress,
    streak,
    contributionDates,
  } = userData;

  return (
    <div className=" mx-auto px-4 font-poppins sm:px-6 lg:px-8 py-12 pt-[80px] bg-slate-800 text-white">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="sm:col-span-3 md:col-span-2">

          <div className="bg-gray-950 p-[20px] rounded-lg shadow-md overflow-hidden">
            <div className="flex flex-col justify-center items-center">
              <div className="">
                <img
                  src={profileData.profileImage}
                  alt={name}
                  className="w-[180px] h-[180px] object-cover rounded-[50%]"
                />
                <div className="mt-1">
                  <h2 className="text-2xl font-semibold text-white">{name}</h2>
                  {/* <p className="text-white">{submissions} submissions in 2023</p> */}
                </div>
              </div>

              <div className="flex mt-5 w-full  justify-center">
                <div className="w-full ">
                  <h3 className="text-[22px] font-bold">
                    Streak{" "}
                    <FontAwesomeIcon
                      icon={faFire}
                      className="text-orange-500"
                    />
                  </h3>
                  <div className="box bg-gray-800 rounded-lg w-full h-[160px] flex">
                    <div className="currentStreak w-1/2 h-full flex flex-col justify-center items-center">
                      <div className="text-orange-500 font-bold text-5xl">
                        {streak.current}
                      </div>
                      <div className="text-white">Current Streak</div>
                      <span className="text-gray-400 text-[14px]">
                        {streak.currentRange}
                      </span>
                    </div>

                    <div className="h-[calc(100%-20px)] mt-[10px] w-[2px] bg-gray-400"></div>

                    <div className="longestStreak w-1/2 h-full flex flex-col justify-center items-center">
                      <div className="text-white font-bold text-5xl">
                        {streak.longest}
                      </div>
                      <div className="text-white">Longest Streak</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <h3 className="text-[20px] font-bold mb-2">Learning Progress</h3>
              <div className="grid grid-cols-9 gap-4 mb-4">
                {learningProgress.map((topic) => (
                  <div
                    key={topic}
                    className="col-span-3 bg-green-100 text-green-800 px-2 py-3 rounded-md text-[16px] font-medium flex justify-center items-center capitalize"
                  >
                    {topic}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="sm:col-span-2">
          <div className="bg-gray-950 rounded-lg shadow-md p-4">
            <h3 className="text-[20px] font-bold mb-4">Leaderboard</h3>
            <ul>
              {leaderboard.map((user, index) => (
                <li key={user.name} className="flex items-center mb-2 border-t border-gray-500 pt-2 text-[18px]">
                  <span className="w-6 h-6 rounded-full text-white font-bold flex items-center justify-center mr-2">
                    {index + 1}.
                  </span>
                  <span className="font-medium">{user.name}</span>
                  <span className="ml-auto text-gray-500">
                    {user.points} points
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h3 className="text-[22px] font-bold mb-4">Learning Graph of this month</h3>
        <div className="grid grid-cols-7 gap-1 bg-gray-900 p-5 rounded-md w-[200px]">
          {new Array(53).fill(0).map((_, index) => (
            <div
              key={index}
              className={`h-4 w-4 rounded ${
                contributionDates.includes(index + 1)
                  ? "bg-green-400"
                  : "bg-gray-200"
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default User;
