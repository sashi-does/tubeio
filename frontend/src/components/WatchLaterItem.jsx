import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import Context from '../context/Context';
import { MoreVertical, Trash, Download, Share, Move } from 'lucide-react';

const WatchLaterItem = ({ details, onRemove }) => {
  const { theme } = useContext(Context);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null); 
  const buttonRef = useRef(null); 

  const {
    video_id: id,
    channel_name: channelName,
    thumbnail_url: thumbnailUrl,
    title,
  } = details;

  const toggleMenu = (e) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    onRemove(id);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }


    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <li className="my-[20px] w-full flex items-center gap-4 p-2 hover:bg-gray-800 rounded-lg cursor-pointer">
      <div className="cursor-grab text-gray-500" onClick={(e) => e.stopPropagation()}>
        ≡
      </div>

      <Link to={`/videos/${id}`} className="flex flex-grow items-center gap-4">
        <div className="relative flex-shrink-0 h-24 w-40">
          <img
            alt={title}
            className="w-full h-full object-cover rounded-lg"
            src={thumbnailUrl.replace('default.jpg', 'maxresdefault.jpg')}
          />
        </div>

        <div className="flex-grow">
          <h3 className="text-sm font-medium text-white line-clamp-2">
            {title}
          </h3>
          <p className="text-xs text-gray-400 mt-1">
            {channelName}
          </p>
        </div>
      </Link>

      <div className="relative" ref={buttonRef}>
        <button
          className="p-2 text-gray-400 hover:text-white"
          onClick={toggleMenu}
        >
          <MoreVertical size={18} />
        </button>

        {isMenuOpen && (
          <div
            ref={menuRef}
            className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg ${
              theme ? 'bg-white' : 'bg-gray-800'
            } animate-fade-in`}
          >
            <div className="py-1">
              <button
                className={`w-full flex items-center px-4 py-2 text-sm ${
                  theme ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-200 hover:bg-gray-700'
                }`}
                onClick={handleRemove}
              >
                <Trash className="w-4 h-4 mr-2" />
                Remove from Watch Later
              </button>
              <button
                className={`w-full flex items-center px-4 py-2 text-sm ${
                  theme ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-200 hover:bg-gray-700'
                }`}
                onClick={(e) => e.stopPropagation()}
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </button>
              <button
                className={`w-full flex items-center px-4 py-2 text-sm ${
                  theme ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-200 hover:bg-gray-700'
                }`}
                onClick={(e) => e.stopPropagation()}
              >
                <Share className="w-4 h-4 mr-2" />
                Share
              </button>
              <button
                className={`w-full flex items-center px-4 py-2 text-sm ${
                  theme ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-200 hover:bg-gray-700'
                }`}
                onClick={(e) => e.stopPropagation()}
              >
                <Move className="w-4 h-4 mr-2" />
                Move to top
              </button>
              <button
                className={`w-full flex items-center px-4 py-2 text-sm ${
                  theme ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-200 hover:bg-gray-700'
                }`}
                onClick={(e) => e.stopPropagation()}
              >
                <Move className="w-4 h-4 mr-2 rotate-180" />
                Move to bottom
              </button>
            </div>
          </div>
        )}
      </div>
    </li>
  );
};

export default WatchLaterItem;