import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire } from "@fortawesome/free-solid-svg-icons";
import { NavLink, useParams } from "react-router-dom";
import Loader from "../Loader/Loader";

const User = () => {
  const [userData, setUserData] = useState();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setUserData(null);
    const handleUserData = async () => {
      const response = await fetch(`http://localhost:8080/api/profile/${id}`);
      const data = await response.json();
      setUserData(data);
      console.log(data);
    };

    handleUserData();
    setLoading(false);
  }, [id]);

  if (!userData) return <Loader />;

  const { name, profileImage, leaderboard, progress, streak, longeststreak } = userData;

  const progressSet = new Set();
  const newProgress =
    progress &&
    progress.filter((item) => {
      const duplicate = progressSet.has(item.algorithm);
      progressSet.add(item.algorithm);
      return !duplicate;
    });
  // Generate contribution dates for the current month
  const contributionDates = new Set();
  const currentMonth = new Date().getMonth();
  const currentMonthName = new Date().toLocaleString("default", {
    month: "long",
  });
  const currentYear = new Date().getFullYear();
  for (let date of streak) {
    const streakDate = new Date(currentYear, currentMonth, date);
    if (streakDate.getMonth() === currentMonth) {
      contributionDates.add(streakDate.getDate());
    }
  }

  const today = new Date().getDate();
  let currentStreak = 0;
  let currentStreakRange = "";
  for (let i = streak.length - 1; i >= 0; i--) {
    if (streak[i] === today - 1 - currentStreak) {
      currentStreak++;
    }
  }

  if(streak[streak.length - 1] == today) {
    currentStreak++;
  }

  // Calculate current streak range
  if (currentStreak > 0) {
    const startDate = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      streak[streak.length - currentStreak]
    );
    const endDate = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      streak[streak.length - 1]
    );
    currentStreakRange = `${startDate.toLocaleString("default", {
      month: "long",
    })} ${streak[streak.length - currentStreak]} - ${endDate.toLocaleString(
      "default",
      {
        month: "long",
      }
    )} ${streak[streak.length - 1]}`;
  } else {
    currentStreakRange = "";
  }
  // Calculate longest streak range
  let longestStreak = 0;
  let longestStreakRange = "";
  let maxStart = 0;
  let maxEnd = 0;

  for (let i = 0; i < streak.length; i++) {
    let currentStreak = 1;
    let j = i + 1;
    while (j < streak.length && streak[j] === streak[j - 1] + 1) {
      currentStreak++;
      j++;
    }

    if (currentStreak > longestStreak) {
      longestStreak = currentStreak;
      maxStart = i;
      maxEnd = j - 1;
    }

    i = j - 1;
  }

  if (longestStreak > 0) {
    const startDate = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      streak[maxStart]
    );
    const endDate = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      streak[maxEnd]
    );
    longestStreakRange = `${startDate.toLocaleString("default", {
      month: "long",
    })} ${streak[maxStart]} - ${endDate.toLocaleString("default", {
      month: "long",
    })} ${streak[maxEnd]}`;
  } else {
    longestStreakRange = "";
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className=" mx-auto px-4 font-poppins sm:px-6 lg:px-8 py-12 pt-[80px] bg-slate-800 text-white">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="sm:col-span-3 md:col-span-2">
              <div className="bg-gray-950 p-[20px] rounded-lg shadow-md overflow-hidden">
                <div className="flex flex-col justify-center items-center">
                  <div className="flex flex-col justify-center items-center">
                    <img
                      src={profileImage}
                      alt={name}
                      className="w-[180px] h-[180px] object-cover rounded-[50%]"
                    />
                    <div className="mt-1">
                      <h2 className="text-2xl font-semibold text-white">
                        {name}
                      </h2>
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
                            {currentStreak}
                          </div>
                          <div className="text-white">Current Streak</div>
                          <span className="text-gray-400 text-[14px]">
                            {currentStreakRange}
                          </span>
                        </div>

                        <div className="h-[calc(100%-20px)] mt-[10px] w-[2px] bg-gray-400"></div>

                        <div className="longestStreak w-1/2 h-full flex flex-col justify-center items-center">
                          <div className="text-white font-bold text-5xl">
                            {longeststreak}
                          </div>
                          <div className="text-white">Longest Streak</div>
                          <span className="text-gray-400 text-[14px]">
                            {longestStreakRange}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <h3 className="text-[20px] font-bold mb-2">
                    Learning Progress
                  </h3>
                  <div className="flex flex-wrap gap-3 mb-4">
                    {newProgress &&
                      newProgress.map((topics) => (
                        <div
                          key={topics.algorithm}
                          className="flex-1 sm:col-span-2 bg-green-100 text-green-800 px-3 py-3 rounded-md text-[16px] font-medium flex justify-center items-center capitalize sm:max-w-[50%]"
                        >
                          {topics.algorithm}
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="sm:col-span-2">
              <div className="bg-slate-950 rounded-lg shadow-md p-4">
                <h3 className="text-[30px] font-bold uppercase text-center font-poppins">
                  Leaderboard
                </h3>
                <hr />
                <div className="flex items-center mb-2 mt-2 pt-2 text-[18px]">
                  <span className="w-6 h-6 rounded-full text-[rgba(255,255,255,0.6)] font-semibold flex items-center justify-center mr-4">
                    #
                  </span>
                  <span className="font-medium text-[rgba(255,255,255,0.6)]">
                    User
                  </span>
                  <span className="ml-auto font-medium text-[rgba(255,255,255,0.6)]">
                    Total points
                  </span>
                </div>
                <ul>
                  {leaderboard.map((user, index) => (
                    <li
                      key={user.id}
                      className="flex items-center mb-2 border-t border-gray-500 pt-2 text-[18px] font-jetbrains font-medium"
                    >
                      <span className="w-8 h-8 text-[22px] rounded-full text-white flex items-center justify-center mr-2">
                        {index == 0
                          ? "🥇"
                          : index == 1
                          ? "🥈"
                          : index == 2
                          ? "🥉"
                          : index + 1}
                      </span>
                      {/* <img
                  src={profileImage}
                  alt={name}
                  className="w-[44px] h-[44px] object-cover rounded-[50%] mr-4"
                /> */}
                      <div className="flex flex-col">
                        <NavLink
                          to={`/user/${user.username}`}
                          className="font-normal hover:underline"
                        >
                          {user.name}
                        </NavLink>
                        <span className="text-[16px] -mt-1 text-[rgba(255,255,255,0.6)] font-extralight">
                          @{user.username}
                        </span>
                      </div>
                      <span className="ml-auto text-gray-500">
                        {user.score} points
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <h3 className="text-[22px] font-bold mb-4">
              Learning Graph of {currentMonthName} {currentYear}
            </h3>
            <div className="grid grid-cols-7 gap-1 bg-gray-900 p-5 rounded-md w-[200px]">
              {new Array(new Date(currentYear, currentMonth + 1, 0).getDate())
                .fill(0)
                .map((_, index) => (
                  <div
                    key={index}
                    className={`h-4 w-4 rounded ${
                      contributionDates.has(index + 1)
                        ? "bg-green-500"
                        : "bg-gray-500"
                    }`}
                  ></div>
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default User;
