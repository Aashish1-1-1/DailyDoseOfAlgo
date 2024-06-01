import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import AccordionItem from "../Accordion/AccordionItem.jsx";
// import Accordion from "../Accordion/Accordion.jsx";

const Dashboard = () => {
  // const [fetched, setFetched] = useState(false);
  // const [result, setResult] = useState([]);
  // const [openItems, setOpenItems] = useState([0]); // Set the first item open by default

  // const toggleAccordion = (index) => {
  //   if (openItems.includes(index)) {
  //     setOpenItems(openItems.filter((item) => item !== index));
  //   } else {
  //     setOpenItems([...openItems, index]);
  //   }
  // };
  // const handelfetch = async () => {
  //   if (result.length == 0) {
  //     try {
  //       const response = await fetch(
  //         "http://localhost:8080/api/preview/false",
  //         {
  //           method: "GET",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       );
  //       if (response.ok) {
  //         const result = await response.json();
  //         setResult(result);
  //         setFetched(!fetched);
  //       } else {
  //         console.log("failed to fetch data");
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   } else {
  //     setFetched(!fetched);
  //   }
  // };

  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from your Go backend API
    fetch("http://localhost:8080/api/preview/false")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  const groupedData = data.reduce((acc, item) => {
    const { category } = item;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {});
  return (
    <>
      <div className="min-h-[100vh]">
        {/* <div className=" w-screen">
        <button
          className="bg-red-900 flex flex-col w-screen h-20 text-white"
          onClick={handelfetch}
        >
          Data Structures
        </button>

        {fetched &&
          result.map((element, index) => (
            <p>
              <NavLink key={index} to={`/blog/${element.name}`}>
                {index + 1}.{element.name}({element.category})
              </NavLink>
            </p>
          ))}
      </div> */}

        {/* <Accordion /> */}

        <div id="accordion-open" data-accordion="open" className="dark">
          {Object.entries(groupedData).map(([category, items]) => (
            <AccordionItem key={category} category={category} items={items} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
