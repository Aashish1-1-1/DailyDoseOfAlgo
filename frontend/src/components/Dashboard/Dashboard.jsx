import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Loader from "../Loader/Loader";

const Dashboard = () => {
  const [fetchedalgo, setFetchedalgo] = useState(false);
  const [fetchedds, setFetchedds] = useState(false);
  const [DSresult, setDSresult] = useState([]);
  const [Algoresult, setAlgoresult] = useState([]);

  const [todaypick, setTodayPick] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    setLoading(true);
    const handleTodayPick = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/todaypick`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          const result = await response.json();
          setTodayPick(result);
          console.log("todaypick: ",result)
        } else {
          console.log("Failed to fetch data");
        }
      } catch (error) {
        console.error(error)
      }
    }

    handleTodayPick();
    setLoading(false);
  },[])

  const handelfetch = async (value) => {
    if (value) {
      if (Algoresult.length === 0) {
        try {
          const response = await fetch(
            `http://localhost:8080/api/preview/${value}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (response.ok) {
            const result = await response.json();
            setAlgoresult(result);
          } else {
            console.log("failed to fetch data");
          }
        } catch (error) {
          console.error(error);
        }
      }
    } else {
      if (DSresult.length === 0) {
        try {
          const response = await fetch(
            `http://localhost:8080/api/preview/${value}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (response.ok) {
            const result = await response.json();
            setDSresult(result);
          } else {
            console.log("failed to fetch data");
          }
        } catch (error) {
          console.error(error);
        }
      }
    }
    if (value) {
      setFetchedalgo(!fetchedalgo);
    } else {
      setFetchedds(!fetchedds);
    }
  };
const [searchInput, setSearchInput] = useState("");
  const [filteredDSResults, setFilteredDSResults] = useState(DSresult);
  const [filteredALgoResults, setFilteredALgoResults] = useState(Algoresult);

  useEffect(() => {
    if (searchInput.length > 0) {
      const filteredDS = DSresult.filter((DS) => 
        DS.name.toLowerCase().includes(searchInput.toLowerCase())
      );
      const filteredALgo = Algoresult.filter((ALgo) => 
        ALgo.name.toLowerCase().includes(searchInput.toLowerCase())
      );
      setFilteredDSResults(filteredDS);
      setFilteredALgoResults(filteredALgo);
    } else {
      setFilteredDSResults(DSresult);
      setFilteredALgoResults(Algoresult);
    }
  }, [searchInput, DSresult, Algoresult]);

  const handleInputChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };
return (
    <>
    { loading ? <Loader/> :
      <div className="flex flex-col items-center min-h-screen bg-slate-950 space-y-6 pt-[90px] pb-10 font-poppins">
         <input
	  onChange={handleInputChange}
          type="text"
          placeholder="Search"
	  value={searchInput}
          className="bg-white border rounded-full py-2 px-6 shadow focus:outline-none focus:ring-2 focus:ring-blue-600 text-black w-1/2"
        /> 
        <div className="space-y-10 w-full">
          <div className="flex flex-col items-center">
            <button
              className="bg-gray-700 text-white font-semibold py-3 px-8 rounded-lg flex items-center justify-between w-1/2"
              onClick={() => {
                handelfetch(false);
              }}
            >
              Data Structures
              <span
                className={`ml-2 transform transition-transform ${
                  fetchedds ? "rotate-180" : "rotate-0"
                }`}
              >
                ▼
              </span>
            </button>

            {fetchedds && (
              <div className="w-1/2 bg-gray-800 rounded-lg p-4 mt-4">
                {filteredDSResults.map((element, index) => (
                  <div key={index} className="p-2">
                    <NavLink
                      to={`/algorithms/${element.name}`}
                      className="text-white"
                    >
                      {index + 1}.{" "}
                      {element.name.charAt(0).toUpperCase() +
                        element.name.slice(1)}{" "}
                      <div className="inline-block bg-orange-300 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">
                        {element.category}
                      </div>
                    </NavLink>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col items-center">
            <button
              className="bg-gray-700 text-white font-semibold py-3 px-8 rounded-lg flex items-center justify-between w-1/2"
              onClick={() => {
                handelfetch(true);
              }}
            >
              Algorithms
              <span
                className={`ml-2 transform transition-transform ${
                  fetchedalgo ? "rotate-180" : "rotate-0"
                }`}
              >
                ▼
              </span>
            </button>

            {fetchedalgo && (
              <div className="w-1/2 bg-gray-800 rounded-lg p-4 mt-4">
                {filteredALgoResults.map((element, index) => (
                  <div key={index} className="p-2">
                    <NavLink
                      to={`/algorithms/${element.name}`}
                      className="text-white"
                    >
                      {index + 1}.{" "}
                      {element.name.charAt(0).toUpperCase() +
                        element.name.slice(1)}{" "}
                      <div className="inline-block bg-orange-300 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">
                        {element.category}
                      </div>
                    </NavLink>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
	<NavLink to={`/algorithms/${todaypick}`} className="bg-purple-800 hover:bg-purple-900 text-white font-semibold py-3 px-8 rounded-lg">
          Today's Pick
        </NavLink>
      </div>
      }
    </>
  );
};

export default Dashboard;
