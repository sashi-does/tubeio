import { Link } from 'react-router-dom';
import { useContext } from 'react';
import Context from '../context/Context';

const SavedVideoItem = ({ details }) => {
  const { channel, id, publishedAt, thumbnailUrl, title, viewCount } = details;
  const { name } = channel;
  const { theme } = useContext(Context);

  const calculateTimeAgo = (publishedDate) => {
    const publishedYear = new Date(publishedDate).getFullYear();
    const currentYear = new Date().getFullYear();
    return currentYear - publishedYear;
  };

  return (
    <li className={`video-card overflow-hidden ${theme ? 'bg-white' : 'bg-gray-800'} w-[calc(100%-1rem)]`}>
      <Link 
        to={`/videos/${id}`} 
        className={`flex gap-4 p-4 no-underline ${theme ? 'text-gray-900' : 'text-gray-100'}`}
      >
        <div className="flex-shrink-0 w-48">
          <img
            className="w-full aspect-video object-cover rounded-lg"
            src={thumbnailUrl}
            alt={title}
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className={`text-base font-medium line-clamp-2 ${theme ? 'text-gray-900' : 'text-gray-100'}`}>
            {title}
          </h3>
          <p className={`mt-1 text-sm ${theme ? 'text-gray-600' : 'text-gray-400'}`}>
            {name}
          </p>
          <div className={`flex items-center gap-2 mt-2 text-sm ${theme ? 'text-gray-500' : 'text-gray-400'}`}>
            <span>{viewCount} views</span>
            <span>•</span>
            <span>{calculateTimeAgo(publishedAt)} years ago</span>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default SavedVideoItem;