import React, { useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";
import { Search, X } from "lucide-react";
import Heading from "../components/Heading";
import context from "../context/Context";
import VideoItem from "../components/VideoItem";
import axios from "axios";
const apiKey = import.meta.env.VITE_YOUTUBE_DATA_API_KEY;
const apiUrl = import.meta.env.VITE_YOUTUBE_SEARCH_API;

const FeedPage = ({ param }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [videos, setVideos] = useState([]);
  const [search, setSearch] = useState("");
  const [showPremium, setShowPremium] = useState(true);
  const { theme } = useContext(context);

  useEffect(() => {
    fetchVideos(search || "latest trends");
  }, []);  
  
  const fetchVideos = async (searchQuery) => {
    setIsLoading(true);
    try {
      const query = searchQuery || "latest trends";
      const url = `${apiUrl}?key=${apiKey}&q=${query}&part=snippet&type=video&maxResults=40`;
      const response = await axios.get(url);
      const videos = response.data.items;
  
      const modifiedData = videos.map((videoItem) => ({
        id: videoItem.id.videoId,
        title: videoItem.snippet.title,
        thumbnailUrl: videoItem.snippet.thumbnails.high.url,
        publishedAt: videoItem.snippet.publishedAt,
        viewCount: 1000,
        channel: {
          name: videoItem.snippet.channelTitle,
          profileImageUrl: videoItem.snippet.thumbnails.default.url,
        },
      }));
      setVideos(modifiedData);
    } catch (e) {
      console.log("Error occurred");
    } finally {
      setIsLoading(false);
    }
  };
  
  const submitHandler = (e) => {
    e.preventDefault();
    if (!search.trim()) {
      alert("Please enter a search term!");
      return;
    }
    fetchVideos(search);
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

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center min-h-screen`}>
        <div className="animate-pulse-slow">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }
  console.log(search);
  return (
    <div
      className={`mt-[64px] min-h-screen flex-grow overflow-y-auto ${
        theme ? "bg-gray-50" : "bg-gray-900 text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {showPremium && (
          <div
            className={`mb-6 rounded-lg overflow-hidden ${
              theme
                ? "bg-amber-50 border border-amber-200"
                : "bg-amber-900/20 border border-amber-700"
            }`}
          >
            <div className="px-4 py-3 sm:px-6 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div
                  className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                    theme ? "bg-amber-100" : "bg-amber-900/40"
                  }`}
                >
                  <span
                    className={`text-lg ${
                      theme ? "text-amber-600" : "text-amber-400"
                    }`}
                  >
                    ✨
                  </span>
                </div>
                <div>
                  <p
                    className={`text-sm font-medium ${
                      theme ? "text-amber-800" : "text-amber-200"
                    }`}
                  >
                    Premium Content Available
                  </p>
                  <p
                    className={`text-xs ${
                      theme ? "text-amber-600" : "text-amber-400"
                    }`}
                  >
                    Unlock exclusive videos and features
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={hidePremium}
                className={`inline-flex items-center px-3 py-1.5 border rounded-md text-sm font-medium transition-colors
                  ${
                    theme
                      ? "border-amber-300 text-amber-700 hover:bg-amber-100"
                      : "border-amber-700 text-amber-200 hover:bg-amber-900/40"
                  }`}
              >
                <X className="w-4 h-4 mr-1" />
                Dismiss
              </button>
            </div>
          </div>
        )}

        <div className="mb-8">
          <Heading name={param} />
        </div>

        <form
          onSubmit={(e) => submitHandler(e)}
          className="relative max-w-2xl mb-8"
        >
          <div
            className={`flex items-center rounded-lg shadow-sm ${
              theme ? "bg-white" : "bg-gray-800"
            }`}
          >
            <div className="relative flex-grow">
              <input
                type="search"
                placeholder="Search videos..."
                value={search}
                onChange={onChangeSearch}
                onKeyDown={(e) => e.key === "Enter" && submitHandler(e)} // Detect Enter key
                className={`w-full pl-4 pr-10 py-3 rounded-l-lg border-0 outline-none transition-colors${theme
                  ? "bg-white text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-primary-500/20"
                  : "bg-gray-800 text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-primary-500/20"}`} 
              />
              {search && (
                <button
                  onClick={clearSearch}
                  className={`absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full transition-colors
                    ${
                      theme
                        ? "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                        : "text-gray-500 hover:text-gray-300 hover:bg-gray-700"
                    }`}
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <button
              className={`px-6 py-3 rounded-r-lg transition-colors flex items-center
                ${
                  theme
                    ? "bg-primary-500 text-white hover:bg-primary-600"
                    : "bg-primary-600 text-white hover:bg-primary-700"
                }`}
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
        </form>

        {videos.length > 0 ? (
          <ul className="list-none grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <VideoItem key={video.id} param={param} details={video} />
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
  );
};

export default FeedPage;
