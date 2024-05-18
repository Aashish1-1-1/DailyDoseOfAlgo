import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const Blog = () => {
  const [data, setData] = useState('');
  const { name } = useParams();

  useEffect(() => {
    // Fetch data from your Go backend API
    fetch("http://localhost:8080/api/view/"+name)
      .then((response) => response.text())
      .then((data) => {
          var doc = new DOMParser().parseFromString(data, "text/html");
        //   console.log(doc.documentElement.querySelector("body").innerHTML);
          setData(data);
        //   console.log(data)
      });
  }, [name]);

  return (
    <>
        <div className="bg-slate-950" dangerouslySetInnerHTML={{ __html: data }}>
            
        </div>
    </>
  );
};

export default Blog;
