import React, { useState } from "react";
import Navbar from "../components/Navbar";
import LeftNavbar from "../components/LeftNavbar";
import FeedPage from "./FeedPage";

const HomePage = () => {
  const [search, setSearch] = useState("");

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const clearSearch = () => {
    setSearch("");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!search.trim()) {
      alert("Please enter a search term!");
      return;
    }
    // The actual fetch logic will be handled in FeedPage
  };

  return (
    <div className="h-screen flex flex-col">
      <Navbar
        search={search}
        onChangeSearch={onChangeSearch}
        submitHandler={submitHandler}
        clearSearch={clearSearch}
      />
      <div className="flex flex-grow">
        <LeftNavbar />
        <div className="flex-grow">
          <FeedPage
            param="all"
            search={search}
            setSearch={setSearch} // Pass setSearch for clearSearch in FeedPage
            submitHandler={submitHandler}
            clearSearch={clearSearch}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;