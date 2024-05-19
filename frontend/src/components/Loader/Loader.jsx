import React from "react";
import "./Loader.css";

const Loader = () => {
  return (
    <>
      <div className="h-[calc(100vh-72px)] w-full bg-slate-950 flex justify-center items-center">
        <div class="container">
          <div class="slice"></div>
          <div class="slice"></div>
          <div class="slice"></div>
          <div class="slice"></div>
          <div class="slice"></div>
          <div class="slice"></div>
        </div>
      </div>
    </>
  );
};

export default Loader;
