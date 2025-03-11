import React, { useState } from "react";
import Navbar from "../components/Navbar";
import LeftNavbar from "../components/LeftNavbar";
import FeedPage from "./FeedPage";

const HomePage = () => {
  const [search, setSearch] = useState("");
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState(true); 
  const [searchQuery, setSearchQuery] = useState(""); 
  

  const toggleTheme = () => {
    setTheme((prevTheme) => !prevTheme);
  };

  const onChangeSearch = (e) => {
    setSearch(e.target.value); 
  };

  const clearSearch = () => {
    setSearch(""); 
    setSearchQuery("");
  };

  const submitHandler = (e) => {
    e.preventDefault(); 
    if (!search.trim()) {
      alert("Please enter a search term!");
      return;
    }
    setSearchQuery(search); 
  };

  return (
    <div className="h-screen flex flex-col">
      <Navbar
        search={search}
        onChangeSearch={onChangeSearch}
        submitHandler={submitHandler}
        clearSearch={clearSearch}
        theme={theme}
        onToggleTheme={toggleTheme}
        isMobileMenuOpen={isMobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      <div className="flex flex-grow mt-10">
        <LeftNavbar isMobileMenuOpen={isMobileMenuOpen} />
        <div className="flex-grow h-full overflow-y-auto">
          <FeedPage
            param="all"
            search={searchQuery} 
            setSearch={setSearch}
            submitHandler={submitHandler}
            clearSearch={clearSearch}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;