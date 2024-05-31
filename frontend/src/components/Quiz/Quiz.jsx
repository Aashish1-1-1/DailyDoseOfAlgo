// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// const Quiz = () => {
//   // const { name } = useParams();
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:8080/api/quiz/linkedlist")
//       .then((response) => response.json())
//       .then((datas) => {
//         // console.log(datas);
//         setData(datas);
//       });
//   }, []);

//   // const [index, setIndex] = useState(0);
//   // const [question, setQuestion] = useState(data[index]);
//   // const [score, setScore] = useState(0);

//   // console.log(data);

//   // const [photos, setPhotos] = useState([]);
//   // useEffect(() => {
//   //   fetch("https://jsonplaceholder.typicode.com/photos")
//   //     .then((res) => {
//   //       return res.json();
//   //     })
//   //     .then((data) => {
//   //       console.log(data);
//   //       setPhotos(data);
//   //     });
//   // }, []);

//   return (
//     <>
//       <div>
//         <h1>Quiz App</h1>
//         <hr />
//         { data.map((q,i) => {
//           return (
//             <div key={i}>
//               <h2>{q.question}</h2>
//               <ol>
//                 {q.options.map((option) => {
//                   return <li key={option.id}>{option.text}</li>;
//                 })}
//               </ol>
//             </div>
//           );
//         })
//         }

//         {/* <h2>Which device is required for the Internet connection?</h2>
//         <ul>
//           <li>Modem</li>
//           <li>Router</li>
//           <li>LAN Cable</li>
//           <li>Pen Drive</li>
//         </ul>
//         <button>Next</button>
//         <div className="index">1 of 5 questions</div> */}
//       </div>
//     </>
//   );
// };

// export default Quiz;

import React, { useState, useEffect } from "react";

const Quiz = () => {
  const [quizData, setQuizData] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        fetch("http://localhost:8080/api/quiz/linkedlist")
          .then((response) => response.json())
          .then((datas) => {
            // console.log(datas);
            setQuizData(datas);
          });
        // const response = await axios.get('http://localhost:8080/api/quiz/linkedlist');
        // setQuizData(response.data);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    };

    fetchQuizData();
  }, []);

  const handleOptionSelect = (option) => {
    const currentQuestionData = quizData[currentQuestion];
    if (option.id === currentQuestionData.correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion === quizData.length - 1) {
      // Quiz completed, display final score
      alert(`Quiz completed! Your final score is ${score}/${quizData.length}`);
      setQuizCompleted(true);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setQuizCompleted(false);
  };

  if (quizData.length === 0) {
    return <div>Loading...</div>;
  }

  if (quizCompleted) {
    return (
      <div className="bg-slate-950 flex justify-center items-center h-screen w-full">
      <div className="max-w-md mx-auto">
        <div className="bg-purple-800 text-white p-4 rounded-md">
          <h2 className="text-2xl font-bold mb-4">Quiz Completed</h2>
          <p className="text-lg mb-4">Your final score is {score}/{quizData.length}</p>
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
    <div className="bg-slate-950 flex justify-center items-center h-screen">
      <div className="max-w-md mx-auto">
        <div className="bg-purple-800 text-white p-4 rounded-md">
          <h2 className="text-2xl font-bold mb-4">Quiz: LinkedList</h2>
          <p className="text-lg mb-2">
            Score: {score}/{quizData.length}
          </p>
          <p className="text-lg mb-4">
            Question {currentQuestion + 1}: {currentQuestionData.question}
          </p>
          <div>
            {currentQuestionData.options.map((option) => (
              <button
                key={option.id}
                className="bg-purple-600 text-white py-2 px-4 rounded-md mb-2 w-full hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                onClick={() => handleOptionSelect(option)}
              >
                {option.text}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
