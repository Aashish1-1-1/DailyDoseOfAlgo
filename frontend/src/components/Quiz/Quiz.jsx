import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Quiz = () => {
  const [quizData, setQuizData] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const { name } = useParams();

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/quiz/linkedlist"
        );
        const data = await response.json();
        setQuizData(data.question);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    };
    fetchQuizData();
  }, []);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    if (currentQuestion === quizData.length - 1) {
      // Quiz completed
      setQuizCompleted(true);
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      if (selectedOption) {
        setUserAnswers((prevAnswers) => [...prevAnswers, selectedOption.id]);
      }
    }
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
    // Logic to check the selected options with the backend array
    const backendCorrectAnswers = []; // Replace with the actual backend array
    const numCorrectAnswers = userAnswers.filter(
      (answer, index) => answer === backendCorrectAnswers[index]
    ).length;

    return (
      <div className="bg-gray-900 flex justify-center items-center h-screen w-full">
        <div className="max-w-md mx-auto">
          <div className="bg-gray-800 text-white p-4 rounded-md">
            <h2 className="text-2xl font-bold mb-4">Quiz Completed</h2>
            <p className="text-lg mb-4">
              You got {numCorrectAnswers}/{quizData.length} correct answers
            </p>
            <button
              className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              onClick={restartQuiz}
            >
              Restart Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestionData = quizData[currentQuestion];

  return (
    <div className="bg-gray-900 flex justify-center items-center h-screen">
      <div className="max-w-xl mx-3 sm:mx-auto">
        <div className="bg-gray-800 text-white p-7 rounded-md">
          <h2 className="text-2xl font-bold mb-5 font-poppins text-center">
            Quiz: {name.charAt(0).toUpperCase() + name.slice(1)}
          </h2>
          <p className="text-xl mb-4 font-poppins font-semibold">
            {currentQuestion+1}. {currentQuestionData.question}
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
  );
};

export default Quiz;