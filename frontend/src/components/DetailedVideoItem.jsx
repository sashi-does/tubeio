import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { ThumbsUp, ThumbsDown, Bookmark, Share2 } from "lucide-react";
import Context from "../context/Context";

const DetailedVideoItem = () => {
  const [videoDetails, setVideoDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { videoId } = useParams();
  const { addSavedVideos, savedVideos, theme } = useContext(Context);
  console.log(videoId)

  useEffect(() => {
    fetchVideoDetails();
  }, [videoId]);

  const fetchVideoDetails = async () => {
    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${import.meta.env.VITE_YOUTUBE_DATA_API_KEY}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();

      if (data.items.length === 0) {
        throw new Error("Video not found");
      }

      const video = data.items[0];
      setVideoDetails({
        id: video.id,
        title: video.snippet.title,
        description: video.snippet.description,
        channel: {
          name: video.snippet.channelTitle,
        },
        viewCount: video.statistics.viewCount,
        publishedAt: video.snippet.publishedAt,
      });

      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching video details:", error);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse-slow">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (!videoDetails) {
    return <div className="text-center mt-10 text-gray-500">Video not found</div>;
  }

  return (
    <div className={`flex-1 overflow-y-auto ${theme ? "bg-gray-50" : "bg-gray-900"}`}>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="aspect-video rounded-xl overflow-hidden bg-gray-900">
          <ReactPlayer url={`https://www.youtube.com/watch?v=${videoId}`} width="100%" height="100%" controls playing />
        </div>

        <div className="mt-6">
          <h1 className={`text-xl font-semibold ${theme ? "text-gray-900" : "text-gray-100"}`}>{videoDetails.title}</h1>

          <div className="flex flex-wrap items-center justify-between mt-4 gap-4">
            <div className={`flex items-center gap-4 ${theme ? "text-gray-600" : "text-gray-400"}`}>
              <span>{videoDetails.viewCount} views</span>
            </div>

            <div className="flex items-center gap-6">
              <button className="flex items-center gap-2 hover:text-primary-500 transition-colors">
                <ThumbsUp className="w-5 h-5" />
                <span>Like</span>
              </button>
              <button className="flex items-center gap-2 hover:text-primary-500 transition-colors">
                <ThumbsDown className="w-5 h-5" />
                <span>Dislike</span>
              </button>
              <button onClick={() => addSavedVideos(videoDetails)} className={`flex items-center gap-2 transition-colors`}>
                <Bookmark className="w-5 h-5" />
                <span>Save</span>
              </button>
              <button className="flex items-center gap-2 hover:text-primary-500 transition-colors">
                <Share2 className="w-5 h-5" />
                <span>Share</span>
              </button>
            </div>
          </div>

          <hr className={`my-6 ${theme ? "border-gray-200" : "border-gray-800"}`} />

          <div className="flex items-start gap-4">
            <div>
              <h2 className={`font-medium ${theme ? "text-gray-900" : "text-gray-100"}`}>{videoDetails.channel.name}</h2>
              <p className={`mt-4 text-sm leading-relaxed ${theme ? "text-gray-700" : "text-gray-300"}`}>{videoDetails.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedVideoItem;
