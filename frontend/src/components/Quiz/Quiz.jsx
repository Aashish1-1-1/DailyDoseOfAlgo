import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Quiz = () => {
  // const { name } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/quiz/linkedlist")
      .then((response) => response.json())
      .then((datas) => {
        // console.log(datas);
        setData(datas);
      });
  }, []);

  // const [index, setIndex] = useState(0);
  // const [question, setQuestion] = useState(data[index]);
  // const [score, setScore] = useState(0);

  // console.log(data);

  // const [photos, setPhotos] = useState([]);
  // useEffect(() => {
  //   fetch("https://jsonplaceholder.typicode.com/photos")
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((data) => {
  //       console.log(data);
  //       setPhotos(data);
  //     });
  // }, []);

  return (
    <>
      <div>
        <h1>Quiz App</h1>
        <hr />
        { data.map((q,i) => {
          return (
            <div key={i}>
              <h2>{q.question}</h2>
              <ol>
                {q.options.map((option) => {
                  return <li key={option.id}>{option.text}</li>;
                })}
              </ol>
            </div>
          );
        }) 
        }

        {/* <h2>Which device is required for the Internet connection?</h2>
        <ul>
          <li>Modem</li>
          <li>Router</li>
          <li>LAN Cable</li>
          <li>Pen Drive</li>
        </ul>
        <button>Next</button>
        <div className="index">1 of 5 questions</div> */}
      </div>
    </>
  );
};

export default Quiz;
