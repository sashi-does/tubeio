import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import {
  Bookmark,
  PlusCircle,
  X,
  Plus,
  Heart,
  Clock,
  ListPlus,
} from "lucide-react";
import Context from "../context/Context";
import axios from "axios";
import Cookies from "js-cookie";

const DetailedVideoItem = () => {
  const [videoDetails, setVideoDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPlaylistPopup, setShowPlaylistPopup] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [showCreatePlaylist, setShowCreatePlaylist] = useState(false);
  const { videoId } = useParams() || { videoId: "dQw4w9WgXcQ" };
  const {
    addSavedVideos,
    savedVideos,
    theme,
    playlists,
    addToPlaylist,
    createPlaylist,
  } = useContext(Context);

  useEffect(() => {
    fetchVideoDetails();
  }, [videoId]);

  const fetchVideoDetails = async () => {
    try {
      const url = `${import.meta.env.VITE_YOUTUBE_VIDEO_API}${videoId}&key=${
        import.meta.env.VITE_YOUTUBE_DATA_API_KEY
      }`;
      const response = await axios.get(url);

      const data = response.data.items[0];
      setVideoDetails({
        id: data.id,
        title: data.snippet.title,
        description: data.snippet.description,
        channel: {
          name: data.snippet.channelTitle,
          logo: data.snippet.thumbnails.default.url,
        },
        viewCount: data.statistics.viewCount,
        publishedAt: data.snippet.publishedAt,
        subscribers: "500K",
      });
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const formatNumber = (num) => {
    return num >= 1_000_000
      ? (num / 1_000_000).toFixed(1) + "M"
      : num >= 1_000
      ? (num / 1_000).toFixed(1) + "K"
      : num;
  };

  const handleAddToPlaylist = (playlistId) => {
    addToPlaylist(playlistId, videoDetails);
    setShowPlaylistPopup(false);
  };

  const handleCreatePlaylist = () => {
    if (newPlaylistName.trim()) {
      const playlistId = createPlaylist(newPlaylistName);
      addToPlaylist(playlistId, videoDetails);
      setNewPlaylistName("");
      setShowCreatePlaylist(false);
      setShowPlaylistPopup(false);
    }
  };

  const isVideoSaved = savedVideos.some(
    (video) => video.id === videoDetails?.id
  );

  const addToWatchLater = async () => {
    const { title, channel, viewCount, publishedAt } = videoDetails;
  
    try {
      const url = import.meta.env.VITE_WATCHLATER_API + '/add';
      const jwtToken = Cookies.get("jwtToken");
  
      if (!jwtToken) {
        console.error("No authentication token found");
        return;
      }
      if (!videoId) {
        console.error("No videoId found in videoDetails");
        return;
      }
  
      // Construct the payload with the correct structure
      const payload = {
        video_id: videoId, // Ensure this matches the backend's expected field name
        channel_name: channel.name, // Map channel.name to channel_name
        thumbnail_url: channel.logo, // Map channel.logo to thumbnail_url
        title,
        view_count: parseInt(viewCount, 10), // Ensure this is a number
        published_at: publishedAt, // Ensure this is a valid date string
      };
  
      // Log the payload for debugging
      console.log("Payload:", payload);
  
      const response = await axios.put(url, payload, {
        headers: { authorization: `Bearer ${jwtToken}` },
      });
  
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error adding to watch later:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error setting up the request:", error.message);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">Error: {error.message}</div>
      </div>
    );
  }

  return (
    <div
      className={`flex-1 overflow-y-auto ${
        theme ? "bg-gray-50" : "bg-gray-900"
      }`}
    >
      {showPlaylistPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm"
            onClick={() => setShowPlaylistPopup(false)}
          ></div>

          <div
            className={`relative z-10 w-full max-w-md p-6 rounded-xl shadow-2xl ${
              theme ? "bg-white" : "bg-gray-800"
            }`}
          >
            <div className="flex justify-between items-center mb-4">
              <h3
                className={`text-xl font-bold ${
                  theme ? "text-gray-900" : "text-white"
                }`}
              >
                Add to playlist
              </h3>
              <button
                onClick={() => setShowPlaylistPopup(false)}
                className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <X
                  className={`w-5 h-5 ${
                    theme ? "text-gray-700" : "text-gray-300"
                  }`}
                />
              </button>
            </div>

            {showCreatePlaylist ? (
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Playlist name"
                  value={newPlaylistName}
                  onChange={(e) => setNewPlaylistName(e.target.value)}
                  className={`w-full p-3 rounded-lg border ${
                    theme
                      ? "bg-white border-gray-300"
                      : "bg-gray-700 border-gray-600"
                  } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition`}
                />
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={handleCreatePlaylist}
                    className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                  >
                    Create
                  </button>
                  <button
                    onClick={() => setShowCreatePlaylist(false)}
                    className={`flex-1 py-2 px-4 ${
                      theme
                        ? "bg-gray-200 text-gray-800"
                        : "bg-gray-700 text-gray-200"
                    } rounded-lg hover:bg-opacity-80 transition font-medium`}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <button
                  onClick={() => setShowCreatePlaylist(true)}
                  className={`w-full flex items-center gap-2 p-3 mb-3 rounded-lg ${
                    theme
                      ? "bg-gray-100 hover:bg-gray-200"
                      : "bg-gray-700 hover:bg-gray-600"
                  } transition`}
                >
                  <Plus className="w-5 h-5 text-blue-500" />
                  <span className={theme ? "text-gray-800" : "text-gray-200"}>
                    Create new playlist
                  </span>
                </button>

                <div
                  className={`max-h-60 overflow-y-auto ${
                    playlists.length === 0 ? "hidden" : ""
                  }`}
                >
                  {playlists.map((playlist) => (
                    <button
                      key={playlist.id}
                      onClick={() => handleAddToPlaylist(playlist.id)}
                      className={`w-full flex items-center justify-between p-3 mb-2 rounded-lg ${
                        theme ? "hover:bg-gray-100" : "hover:bg-gray-700"
                      } transition`}
                    >
                      <span
                        className={theme ? "text-gray-800" : "text-gray-200"}
                      >
                        {playlist.name}
                      </span>
                      <span className="text-sm text-gray-500">
                        {playlist.videos.length} videos
                      </span>
                    </button>
                  ))}
                </div>

                {playlists.length === 0 && (
                  <p
                    className={`text-center py-4 ${
                      theme ? "text-gray-500" : "text-gray-400"
                    }`}
                  >
                    No playlists yet. Create your first one!
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&enablejsapi=1`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        <div className="mt-4 flex justify-center">
          <a
            href={`https://www.youtube.com/watch?v=${videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-red-600 text-white font-semibold px-6 py-2.5 rounded-full shadow-md hover:bg-red-700 transition flex items-center gap-2"
          >
            <span className="text-lg">▶</span> Watch on YouTube
          </a>
        </div>

        <div className="mt-6">
          <h1
            className={`text-2xl font-bold ${
              theme ? "text-gray-900" : "text-gray-100"
            }`}
          >
            {videoDetails.title}
          </h1>
          <div className="flex items-center gap-4 mt-4">
            <img
              src={videoDetails.channel.logo}
              alt="Channel Logo"
              className="w-12 h-12 rounded-full border-2 border-gray-200"
            />
            <div>
              <h2
                className={`font-medium text-lg ${
                  theme ? "text-gray-900" : "text-gray-100"
                }`}
              >
                {videoDetails.channel.name}
              </h2>
              <p className="text-sm text-gray-500">
                {formatNumber(videoDetails.viewCount)} views
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 mt-6">
          <button
            onClick={() => addSavedVideos(videoDetails)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full shadow-md transition ${
              isVideoSaved
                ? "bg-pink-100 text-pink-700 hover:bg-pink-200"
                : `${
                    theme
                      ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      : "bg-gray-800 text-gray-200 hover:bg-gray-700"
                  }`
            }`}
          >
            {isVideoSaved ? (
              <Heart className="w-5 h-5 fill-pink-600 text-pink-600" />
            ) : (
              <Clock className="w-5 h-5" />
            )}
            <span onClick={addToWatchLater}>
              {isVideoSaved ? "Added To Watch Later" : "Watch Later"}
            </span>
          </button>

          <button
            onClick={() => setShowPlaylistPopup(true)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full shadow-md transition ${
              theme
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-blue-700 text-white hover:bg-blue-800"
            }`}
          >
            <ListPlus className="w-5 h-5" />
            <span>Add to Playlist</span>
          </button>
        </div>

        <hr
          className={`my-6 ${theme ? "border-gray-200" : "border-gray-700"}`}
        />

        <div
          className={`p-5 rounded-lg ${
            theme ? "bg-white shadow-md" : "bg-gray-800 shadow-md"
          }`}
        >
          <h3
            className={`text-lg font-medium mb-3 ${
              theme ? "text-gray-900" : "text-gray-100"
            }`}
          >
            Description
          </h3>
          <p
            className={`text-base leading-relaxed whitespace-pre-line ${
              theme ? "text-gray-700" : "text-gray-300"
            }`}
          >
            {videoDetails.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetailedVideoItem;
