import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import ConfettiExplosion from "react-confetti-explosion";

const Quiz = () => {
  const [quizData, setQuizData] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [numCorrectAnswers, setnumCorrectAnswers] = useState(0);
  const { name } = useParams();
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchQuizData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/quiz/${name}`);
        const data = await response.json();
        setQuizData(data.question);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    };
    fetchQuizData();
    setLoading(false);
  }, [name]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = async () => {
    if (selectedOption) {
      setUserAnswers((prevAnswers) => [...prevAnswers, selectedOption.id]);
    }

    if (currentQuestion === quizData.length - 1) {
      setLoading(true);
      // Quiz completed
      try {
        const response = await fetch(
          `http://localhost:8080/api/quiz/evaluate/${name}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              answers: [...userAnswers, selectedOption?.id],
            }),
          }
        );
        const responseData = await response.json();
        setnumCorrectAnswers(responseData.Score);
      } catch (error) {
        console.error("Error submitting form:", error);
      }
      setQuizCompleted(true);
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
    }
    setLoading(false);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setUserAnswers([]);
    setQuizCompleted(false);
  };

  if (quizData.length === 0) {
    return <div>Loading...</div>;
  }

  if (quizCompleted) {
    const score = (numCorrectAnswers / quizData.length) * 100;
    const passedQuiz = score >= 65;
    const [showConfetti, setShowConfetti] = useState(passedQuiz);

    useEffect(() => {
      if (passedQuiz) {
        const timer = setTimeout(() => {
          setShowConfetti(false);
        }, 2000); // Hide confetti after 2 seconds

        return () => clearTimeout(timer); // Clean up the timer on unmount
      }
    }, [passedQuiz]);

    return (
      <>
        {loading ? (
          <Loader />
        ) : (
          <div className="bg-gray-900 flex justify-center items-center h-screen w-full font-poppins">
            {showConfetti && (
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <ConfettiExplosion />
              </div>
            )}
            <div className="max-w-xl px-4 w-[576px] mx-auto">
              <div className="bg-gray-800 text-white p-4 h-[300px] rounded-md flex justify-center items-center flex-col">
                <h2 className="text-3xl font-bold mb-4">
                  {passedQuiz ? "Congratulations! 🥳" : "Quiz Failed 😢"}
                </h2>
                <p className="text-xl mb-4">
                  You got{" "}
                  <strong className="text-2xl">
                    {numCorrectAnswers}/{quizData.length}
                  </strong>{" "}
                  correct answers ({score.toFixed(2)}%)
                </p>
                {passedQuiz ? (
                  <p className="text-lg mb-4">You passed the quiz 🥳</p>
                ) : (
                  <p className="text-lg mb-4">
                    You failed the quiz.😢 You need to score at least 65% to
                    pass.
                  </p>
                )}
                <div className="btn-container flex gap-3">
                  <button
                    className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    onClick={restartQuiz}
                  >
                    Restart Quiz
                  </button>
                  <NavLink
                    to={"/dashboard"}
                    className="border border-gray-500 transition-all ease duration-200 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 hover:border-purple-700 focus:ring-purple-500"
                    onClick={restartQuiz}
                  >
                    Go to Dashboard
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  const currentQuestionData = quizData[currentQuestion];

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="bg-gray-900 flex justify-center items-center h-screen">
          <div className="max-w-xl mx-3 sm:mx-auto">
            <div className="bg-gray-800 text-white p-7 rounded-md">
              <h2 className="text-2xl font-bold mb-5 font-poppins text-center">
                Quiz: {name.charAt(0).toUpperCase() + name.slice(1)}
              </h2>
              <p className="text-xl mb-4 font-poppins font-semibold">
                {currentQuestion + 1}. {currentQuestionData.question}
              </p>
              <div>
                {currentQuestionData.options.map((option) => (
                  <button
                    key={option.id}
                    className={`bg-gray-700 text-white py-2 px-4 rounded-md mb-2 w-full hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-600 text-left font-poppins ${
                      selectedOption?.id === option.id ? "bg-purple-700" : ""
                    }`}
                    onClick={() => handleOptionSelect(option)}
                  >
                    {option.id.toUpperCase()}. {option.text}
                  </button>
                ))}
              </div>
              <div className="w-full h-[2px] rounded-full bg-purple-500 mb-3 mt-3"></div>
              <div className="flex justify-between items-center mt-4">
                <p className="text-base font-poppins font-medium">
                  {currentQuestion + 1} of {quizData.length} Questions
                </p>
                <button
                  className={`py-2 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 font-poppins ${
                    !selectedOption
                      ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                      : "bg-purple-600 text-white hover:bg-purple-700"
                  }`}
                  onClick={handleNextQuestion}
                  disabled={!selectedOption}
                >
                  {currentQuestion === quizData.length - 1 ? "Submit" : "Next"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Quiz;
