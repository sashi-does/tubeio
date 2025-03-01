import React, { useState, useEffect, useContext } from "react";
import { Search, X } from "lucide-react";
import Heading from "../components/Heading";
import context from "../context/Context";
import axios from "axios";
import Cookies from "js-cookie";
import LeftNavbar from "../components/LeftNavbar";
import Navbar from "../components/Navbar";
import WatchLaterItem from "../components/WatchLaterItem";

const WatchLaterPage = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showPremium, setShowPremium] = useState(true);
  const { theme } = useContext(context);

  useEffect(() => {
    fetchWatchLaterVideos();
  }, []);

  const fetchWatchLaterVideos = async () => {
    setLoading(true);
    try {
      const url = import.meta.env.VITE_WATCHLATER_API + "/all";
      const jwtToken = Cookies.get("jwtToken");

      if (!jwtToken) {
        console.error("No authentication token found");
        setLoading(false);
        return;
      }

      const response = await axios.get(url, {
        headers: { authorization: `Bearer ${jwtToken}` },
      });
      setVideos(response.data.videos);
    } catch (error) {
      console.error("Error fetching watch later videos:", error);
    } finally {
      setLoading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!search.trim()) {
      alert("Please enter a search term!");
      return;
    }
  };

  const hidePremium = () => {
    setShowPremium(false);
  };

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const clearSearch = () => {
    setSearch("");
  };

  if (loading) {
    return (
      <div className={`flex items-center justify-center min-h-screen`}>
        <div className="animate-pulse-slow">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-grow">
        <LeftNavbar />
        <div
          className={`pt-[70px] flex-grow overflow-y-auto ${
            theme ? "bg-gray-50" : "bg-gray-900 text-white"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

            <div className="mb-8">
              <Heading name="Watch Later" />
            </div>


            {videos.length > 0 ? (
              <ul className="list-none flex-col">
                {videos.map((video) => (
                  <WatchLaterItem key={video._id} param="saved" details={video} />
                ))}
              </ul>
            ) : (
              <div
                className={`text-center py-16 ${
                  theme ? "text-gray-500" : "text-gray-400"
                }`}
              >
                <Search className="w-16 h-16 mx-auto mb-4 opacity-40" />
                <h3 className="text-lg font-medium mb-2">No videos found</h3>
                <p className="text-sm">
                  Try adjusting your search to find what you're looking for.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchLaterPage;