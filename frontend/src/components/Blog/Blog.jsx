import React from "react";
import { NavLink, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Loader from "../Loader/Loader";
import 'highlight.js/styles/github-dark-dimmed.min.css';
import hljs from 'highlight.js/lib/core';
import cpp from 'highlight.js/lib/languages/cpp';
import CopyButtonPlugin from 'highlightjs-copy';
import "./Blog.css";

hljs.registerLanguage('cpp', cpp);


const Blog = () => {
  const [loading, setLoading] = useState(true);
  const { name } = useParams();

  const [htmlContent, setHtmlContent] = useState('');
  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:8080/api/view/'+name);
        const data = await response.text();
        setHtmlContent(data);
      } catch (error) {
        console.error('Error fetching content:', error);
      }
    };

    fetchContent();
  }, []);

  useEffect(() => {
    hljs.highlightAll();
    hljs.addPlugin(new CopyButtonPlugin());
    setLoading(false);
  }, [htmlContent]);
  
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="bg-slate-950 flex justify-center pt-[72px]">
        <div className= "mb-[25px] max-w-[800px]">
          <div dangerouslySetInnerHTML={{ __html: htmlContent }}></div>
          <NavLink to={`/quiz/${name}`} className={"bg-purple-700 hover:bg-purple-600 transition-colors px-5 py-3 font-poppins text-white font-medium rounded-md"}>Take Quiz</NavLink>
        </div>
        </div>
      )}
    </>
  );
};

export default Blog;
