import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Context from "../context/Context";

const FilterSection = ({ onFilterChange, selectedFilter, isLoading }) => {
  const [niches, setNiches] = useState([]);
  const { theme } = useContext(Context);

  const fetchNiches = async () => {
    try {
      const url = import.meta.env.VITE_HANDLE_FORM_API + "/get-niches";
      const response = await axios.get(url, {
        headers: { authorization: `Bearer ${Cookies.get("jwtToken")}` },
      });
      const fetchedNiches = response.data.niches;
      setNiches(fetchedNiches);
      if (fetchedNiches.length > 0 && selectedFilter.length === 0) {
        onFilterChange([fetchedNiches[0]]);
      }
    } catch (error) {
      console.error("Error fetching niches:", error);
    }
  };

  useEffect(() => {
    fetchNiches();
  }, []);

  const handleFilterClick = (niche) => {
    if (isLoading) return; // Prevent clicking while loading
    if (onFilterChange) {
      onFilterChange([niche]);
    }
  };

  return (
    <div
      className={`py-5 rounded-lg max-w-full mx-auto ${
        !theme ? "text-gray-100" : "text-gray-900"
      }`}
    >
      <div className="flex flex-wrap gap-3">
        {niches.map((niche, index) => (
          <div
            key={index}
            onClick={() => handleFilterClick(niche)}
            className={`px-4 py-2 rounded-lg cursor-pointer transition-colors duration-200 ${
              selectedFilter.includes(niche)
                ? !theme
                  ? "bg-[#2865c1] text-white"
                  : "bg-amber-600 text-white"
                : !theme
                ? `bg-gray-700 text-gray-100 ${!isLoading && "hover:bg-gray-600"}`
                : `bg-gray-200 text-gray-900 ${!isLoading && "hover:bg-gray-300"}`
            } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`} // Disable styling
          >
            <span className="font-medium">{niche}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterSection;