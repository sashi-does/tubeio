import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import ReactPlayer from 'react-player';
import { ThumbsUp, ThumbsDown, Bookmark, Share2 } from 'lucide-react';
import Context from '../context/Context';

const DetailedVideoItem = () => {
  const [videoDetails, setVideoDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { videoId } = useParams();
  const { addSavedVideos, savedVideos, theme } = useContext(Context);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    const url = `https://apis.ccbp.in/videos/${videoId}`;
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${Cookies.get('jwtToken')}`,
        Accept: 'application/json',
      },
    };

    try {
      const response = await fetch(url, options);
      const jsonData = await response.json();
      const { channel } = jsonData.video_details;

      setVideoDetails({
        channel: {
          name: channel.name,
          profileImageUrl: channel.profile_image_url,
          subscriberCount: channel.subscriber_count,
        },
        description: jsonData.video_details.description,
        id: jsonData.video_details.id,
        publishedAt: jsonData.video_details.published_at,
        thumbnailUrl: jsonData.video_details.thumbnail_url,
        title: jsonData.video_details.title,
        videoUrl: jsonData.video_details.video_url,
        viewCount: jsonData.video_details.view_count,
      });
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching video details:', error);
      setIsLoading(false);
    }
  };

  const isSaved = () => savedVideos.some(video => video.id === videoDetails.id);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse-slow">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  const { channel, videoUrl, title, description, viewCount, publishedAt } = videoDetails;
  const dateObj = new Date(publishedAt);
  const year = dateObj.getFullYear();
  const now = new Date().getFullYear();

  return (
    <div className={`flex-1 overflow-y-auto ${theme ? 'bg-gray-50' : 'bg-gray-900'}`}>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="aspect-video rounded-xl overflow-hidden bg-gray-900">
          <ReactPlayer
            url={videoUrl}
            width="100%"
            height="100%"
            controls
            playing
          />
        </div>
        
        <div className="mt-6">
          <h1 className={`text-xl font-semibold ${theme ? 'text-gray-900' : 'text-gray-100'}`}>
            {title}
          </h1>
          
          <div className="flex flex-wrap items-center justify-between mt-4 gap-4">
            <div className={`flex items-center gap-4 ${theme ? 'text-gray-600' : 'text-gray-400'}`}>
              <span>{viewCount} views</span>
              <span>•</span>
              <span>{now - year} years ago</span>
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
              <button 
                onClick={() => addSavedVideos(videoDetails)}
                className={`flex items-center gap-2 transition-colors ${
                  isSaved() ? 'text-primary-500' : 'hover:text-primary-500'
                }`}
              >
                <Bookmark className="w-5 h-5" />
                <span>{isSaved() ? 'Saved' : 'Save'}</span>
              </button>
              <button className="flex items-center gap-2 hover:text-primary-500 transition-colors">
                <Share2 className="w-5 h-5" />
                <span>Share</span>
              </button>
            </div>
          </div>
          
          <hr className={`my-6 ${theme ? 'border-gray-200' : 'border-gray-800'}`} />
          
          <div className="flex items-start gap-4">
            <img
              alt={channel.name}
              className="w-12 h-12 rounded-full object-cover"
              src={channel.profileImageUrl}
            />
            <div>
              <h2 className={`font-medium ${theme ? 'text-gray-900' : 'text-gray-100'}`}>
                {channel.name}
              </h2>
              <p className={`text-sm mt-1 ${theme ? 'text-gray-600' : 'text-gray-400'}`}>
                {channel.subscriberCount} subscribers
              </p>
              <p className={`mt-4 text-sm leading-relaxed ${theme ? 'text-gray-700' : 'text-gray-300'}`}>
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedVideoItem;