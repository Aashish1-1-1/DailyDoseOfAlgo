import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const Quiz = () => {
  const { name } = useParams();

  useEffect(() => {
    fetch("http://localhost:8080/api/quiz/" + name)
      .then((response) => response.json())
      .then((data) => console.log(data));
      
  }, [name]);

  return (
    <>
      <div>Quiz: {name}</div>
    </>
  );
};

export default Quiz;
