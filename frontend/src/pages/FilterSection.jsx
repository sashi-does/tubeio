import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Context from "../context/Context";

const FilterSection = ({ onFilterChange }) => {
  const [niches, setNiches] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("All"); 
  const { theme } = useContext(Context); 
  const fetchNiches = async () => {
    try {
      const url = import.meta.env.VITE_FORM_STATUS_API + "/get-niches";
      const response = await axios.get(url, {
        headers: { authorization: `Bearer ${Cookies.get("jwtToken")}` },
      });
      setNiches(response.data.niches);
    } catch (error) {
      console.error("Error fetching niches:", error);
    }
  };

  useEffect(() => {
    fetchNiches();
  }, []);

  const handleFilterClick = (niche) => {
    setSelectedFilter(niche); 
    if (onFilterChange) {
      onFilterChange(niche === "All" ? [] : [niche]); 
    }
  };

  return (
    <div
      className={`py-5 rounded-lg max-w-full mx-auto ${
        !theme
          ? " text-gray-100" 
          : " text-gray-900" 
      }`}
    >
      <div className="flex flex-wrap gap-3">
        <div
          onClick={() => handleFilterClick("All")}
          className={`px-4 py-2 rounded-lg cursor-pointer transition-colors duration-200 ${
            selectedFilter === "All"
              ? !theme
                ? "bg-blue-600 text-white"
                : "bg-blue-600 text-white"
              : !theme
              ? "bg-gray-700 text-gray-100 hover:bg-gray-600" 
              : "bg-gray-200 text-gray-900 hover:bg-gray-300" 
          }`}
        >
          <span className="font-medium">All</span>
        </div>
        {niches.map((niche, index) => (
          <div
            key={index}
            onClick={() => handleFilterClick(niche)}
            className={`px-4 py-2 rounded-lg cursor-pointer transition-colors duration-200 ${
              selectedFilter === niche
                ? !theme
                  ? "bg-blue-600 text-white" 
                  : "bg-blue-600 text-white" 
                : !theme
                ? "bg-gray-700 text-gray-100 hover:bg-gray-600" 
                : "bg-gray-200 text-gray-900 hover:bg-gray-300" 
            }`}
          >
            <span className="font-medium">{niche}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterSection;