import { Link } from 'react-router-dom';
import { useContext } from 'react';
import Context from '../context/Context';

const VideoItem = ({ details, param }) => {
  const { channel, id, publishedAt, thumbnailUrl, title, viewCount } = details;
  const { name, profileImageUrl } = channel;
  const { theme } = useContext(Context);
  
  const dateObj = new Date(publishedAt);
  const year = dateObj.getFullYear();
  const now = new Date().getFullYear();

  return (
    <li className="video-card">
      <Link 
        to={`/videos/${id}`} 
        className={`block no-underline ${theme ? 'text-gray-900' : 'text-gray-100'}`}
      >
        <div className="relative group">
          <img
            alt={title}
            className="w-full aspect-video object-cover rounded-lg"
            src={thumbnailUrl}
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-medium">Watch Now</span>
          </div>
        </div>
        
        {param !== 'gaming' ? (
          <div className="flex gap-3 mt-3">
            <img
              alt={name}
              className="w-10 h-10 rounded-full object-cover"
              src={profileImageUrl}
            />
            <div>
              <h3 className={`text-sm font-medium line-clamp-2 ${theme ? 'text-gray-900' : 'text-gray-100'}`}>
                {title}
              </h3>
              <p className={`text-sm mt-1 ${theme ? 'text-gray-600' : 'text-gray-400'}`}>
                {name}
              </p>
              <div className={`flex items-center gap-2 text-xs mt-1 ${theme ? 'text-gray-500' : 'text-gray-400'}`}>
                <span>{viewCount} views</span>
                <span>•</span>
                <span>{now - year} years ago</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-3">
            <h3 className={`text-sm font-medium line-clamp-2 ${theme ? 'text-gray-900' : 'text-gray-100'}`}>
              {title}
            </h3>
            <p className={`text-sm mt-1 ${theme ? 'text-gray-600' : 'text-gray-400'}`}>
              {viewCount} Watching Worldwide
            </p>
          </div>
        )}
      </Link>
    </li>
  );
};

export default VideoItem;