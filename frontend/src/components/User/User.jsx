import React, { useState, useEffect } from 'react';
import profileData from './data.json';

const User = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    setUserData(profileData);
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  const { name, submissions, leaderboard, learningProgress, streak, contributionDates } = userData;

  return (
    <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-[80px] bg-gray-400">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative">
              <img
                src={profileData.profileImage}
                alt={name}
                className="w-64 h-64 object-cover"
              />
              <div className="absolute bottom-0 left-0 p-4">
                <h2 className="text-2xl font-bold text-white">{name}</h2>
                <p className="text-white">{submissions} submissions in 2023</p>
              </div>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-12 gap-4 mb-4">
                {learningProgress.map((topic) => (
                  <div
                    key={topic}
                    className="col-span-3 bg-green-100 text-green-800 px-2 py-1 rounded-md text-sm font-medium"
                  >
                    {topic}
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold">Streak</h3>
                  <p className="text-gray-500">
                    Current Streak: <span className="font-bold">{streak.current}</span>
                  </p>
                  <p className="text-gray-500">
                    Longest Streak: <span className="font-bold">{streak.longest}</span>
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-orange-400 text-white font-bold flex items-center justify-center mr-2">
                    {streak.current}
                  </div>
                  <span className="text-gray-500">{streak.currentRange}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-bold mb-4">Leaderboard</h3>
            <ul>
              {leaderboard.map((user, index) => (
                <li key={user.name} className="flex items-center mb-2">
                  <span className="w-6 h-6 rounded-full bg-gray-200 text-gray-600 font-bold flex items-center justify-center mr-2">
                    {index + 1}
                  </span>
                  <span className="font-medium">{user.name}</span>
                  <span className="ml-auto text-gray-500">{user.points} points</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h3 className="text-lg font-bold mb-4">Contribution Graph</h3>
        <div className="grid grid-cols-7 gap-1 bg-gray-900 p-5 rounded-md">
          {new Array(53).fill(0).map((_, index) => (
            <div
              key={index}
              className={`h-4 w-4 rounded ${
                contributionDates.includes(index + 1)
                  ? 'bg-green-400'
                  : 'bg-gray-200'
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default User;