import React, { useState, useEffect, useContext, useCallback, useRef } from "react";
import { Search, X } from "lucide-react";
import context from "../context/Context";
import VideoItem from "../components/VideoItem";
import FilterSection from "./FilterSection";
import axios from "axios";

const apiKey = import.meta.env.VITE_YOUTUBE_DATA_API_KEY;
const apiUrl = import.meta.env.VITE_YOUTUBE_SEARCH_API;
const videoApiUrl = import.meta.env.VITE_YOUTUBE_VIDEO_API;

const FeedPage = ({ param, search, setSearch, submitHandler, clearSearch }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [videos, setVideos] = useState([]);
  const [showPremium, setShowPremium] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState([]);
  const [pageToken, setPageToken] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const { theme } = useContext(context);

  const observerRef = useRef(null);

  const fetchVideos = async (query, token = "", append = false) => {
    if (!hasMore && append) return;
    setIsLoading(true);
    try {
      const searchQuery =
        query || (selectedFilter.length > 0 ? selectedFilter[0] : "Entrepreneurship");
        const url = `${apiUrl}?key=${apiKey}&q=${searchQuery}&part=snippet&type=video&maxResults=20&order=relevance&videoDuration=medium&publishedAfter=${new Date(
          Date.now() - 30 * 24 * 60 * 60 * 1000
        ).toISOString()}&relevanceLanguage=en&regionCode=US${token ? `&pageToken=${token}` : ""}`;
        
      const response = await axios.get(url);
      const videoItems = response.data.items;

      if (!videoItems || videoItems.length === 0) {
        setHasMore(false);
        setVideos(append ? videos : []);
        return;
      }
      const videoIds = videoItems.map((item) => item.id.videoId).join(",");
      const statsUrl = `${videoApiUrl}${videoIds}&key=${apiKey}`;
      const statsResponse = await axios.get(statsUrl);
      const stats = statsResponse.data.items;
      const modifiedData = videoItems.map((videoItem, index) => {
        const statsItem = stats[index];
        return {
          id: videoItem.id.videoId,
          title: videoItem.snippet.title,
          thumbnailUrl: videoItem.snippet.thumbnails.high.url,
          publishedAt: videoItem.snippet.publishedAt,
          viewCount: parseInt(statsItem?.statistics?.viewCount || 0),
          channel: {
            name: videoItem.snippet.channelTitle,
            profileImageUrl: videoItem.snippet.thumbnails.default.url,
          },
        };
      });

      setVideos((prevVideos) =>
        append ? [...prevVideos, ...modifiedData] : modifiedData
      );

      setPageToken(response.data.nextPageToken || "");
      setHasMore(!!response.data.nextPageToken);
    } catch (e) {
      console.log("Error occurred:", e);
      setHasMore(false);
    } finally {
      setIsLoading(false); 
    }
  };

  useEffect(() => {
    if (selectedFilter.length > 0) {
      fetchVideos(selectedFilter[0]);
    } else if (search) {
      fetchVideos(search);
    }
  }, [selectedFilter, search]);

  const lastVideoElementRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchVideos(
            search || (selectedFilter.length > 0 ? selectedFilter[0] : "Entrepreneurship"),
            pageToken,
            true
          );
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [isLoading, hasMore, pageToken, search, selectedFilter]
  );

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    setPageToken("");
    setHasMore(true);
  };

  const hidePremium = () => {
    setShowPremium(false);
  };

  return (
    <div
      className={`flex-grow mt-16 ${theme ? "bg-gray-50" : "bg-gray-900 text-white"}`}
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
                  <span className={`text-lg ${theme ? "text-amber-600" : "text-amber-400"}`}>
                    ✨
                  </span>
                </div>
                <div>
                  <p className={`text-sm font-medium ${theme ? "text-amber-800" : "text-amber-200"}`}>
                    Premium Content Available
                  </p>
                  <p className={`text-xs ${theme ? "text-amber-600" : "text-amber-400"}`}>
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
        <FilterSection
          onFilterChange={handleFilterChange}
          selectedFilter={selectedFilter}
          isLoading={isLoading} // Pass loading state to disable filter items
        />

        <div>
          {isLoading && !videos.length ? ( // Show loader when initial fetch is happening
            <div className="flex items-center justify-center py-8">
              <div className="animate-pulse-slow">
                <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            </div>
          ) : videos.length > 0 ? (
            <ul className="list-none grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video, index) => {
                if (index === videos.length - 1) {
                  return (
                    <li ref={lastVideoElementRef} key={video.id}>
                      <VideoItem param={param} details={video} />
                    </li>
                  );
                }
                return <VideoItem key={video.id} param={param} details={video} />;
              })}
            </ul>
          ) : (
            <div className={`text-center py-16 ${theme ? "text-gray-500" : "text-gray-400"}`}>
              <Search className="w-16 h-16 mx-auto mb-4 opacity-40" />
              <h3 className="text-lg font-medium mb-2">No videos found</h3>
              <p className="text-sm">
                Try adjusting your search or filter to find what you're looking for.
              </p>
            </div>
          )}

          {isLoading && videos.length > 0 && ( // Show loader for subsequent fetches (infinite scroll)
            <div className="flex items-center justify-center py-8">
              <div className="animate-pulse-slow">
                <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedPage;