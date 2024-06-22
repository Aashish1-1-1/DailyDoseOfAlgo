import React from "react";
import "./Loader.css";

const Loader = () => {
  return (
    <>
      <div className="h-[calc(100vh)] w-full bg-slate-950 flex justify-center items-center">
        <div className="loader-container">
          <div className="slice"></div>
          <div className="slice"></div>
          <div className="slice"></div>
          <div className="slice"></div>
          <div className="slice"></div>
          <div className="slice"></div>
        </div>
      </div>
    </>
  );
};

export default Loader;
