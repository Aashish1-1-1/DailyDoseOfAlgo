import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Github = () => {
  const { username } = useParams();

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data);
      });
  }, []);

  return (
    <div className="h-screen font-poppins bg-slate-900">
      <h2 className="text-2xl text-white">Github followers of {username}: {data.followers}</h2>
      <img src={data.avatar_url} className="bg-black" alt="" />
    </div>
  );
};

export default Github;
