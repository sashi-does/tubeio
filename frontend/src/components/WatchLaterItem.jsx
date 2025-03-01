import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import Context from '../context/Context';
import { MoreVertical, Trash, Download, Share, Move } from 'lucide-react';

const WatchLaterItem = ({ details, onRemove }) => {
  const { theme } = useContext(Context);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null); // Ref for the popup menu
  const buttonRef = useRef(null); // Ref for the three-dots button

  const {
    video_id: id,
    channel_name: channelName,
    thumbnail_url: thumbnailUrl,
    title,
  } = details;

  // Toggle menu visibility
  const toggleMenu = (e) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle "Remove from Watch Later" action
  const handleRemove = (e) => {
    e.stopPropagation();
    onRemove(id);
    setIsMenuOpen(false);
  };

  // Close the menu when clicking outside
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

    // Add event listener when the menu is open
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Cleanup the event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <li className="my-[20px] w-full flex items-center gap-4 p-2 hover:bg-gray-800 rounded-lg cursor-pointer">
      {/* Drag handle */}
      <div className="cursor-grab text-gray-500" onClick={(e) => e.stopPropagation()}>
        ≡
      </div>

      {/* Thumbnail and video details wrapped in Link */}
      <Link to={`/videos/${id}`} className="flex flex-grow items-center gap-4">
        {/* Thumbnail */}
        <div className="relative flex-shrink-0 h-24 w-40">
          <img
            alt={title}
            className="w-full h-full object-cover rounded-lg"
            src={thumbnailUrl.replace('default.jpg', 'maxresdefault.jpg')}
          />
        </div>

        {/* Video details */}
        <div className="flex-grow">
          <h3 className="text-sm font-medium text-white line-clamp-2">
            {title}
          </h3>
          <p className="text-xs text-gray-400 mt-1">
            {channelName}
          </p>
        </div>
      </Link>

      {/* Options menu (not wrapped in Link) */}
      <div className="relative" ref={buttonRef}>
        <button
          className="p-2 text-gray-400 hover:text-white"
          onClick={toggleMenu}
        >
          <MoreVertical size={18} />
        </button>

        {/* Popup menu */}
        {isMenuOpen && (
          <div
            ref={menuRef}
            className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg ${
              theme ? 'bg-white' : 'bg-gray-800'
            } animate-fade-in`}
          >
            <div className="py-1">
              {/* Remove from Watch Later */}
              <button
                className={`w-full flex items-center px-4 py-2 text-sm ${
                  theme ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-200 hover:bg-gray-700'
                }`}
                onClick={handleRemove}
              >
                <Trash className="w-4 h-4 mr-2" />
                Remove from Watch Later
              </button>
              {/* Download */}
              <button
                className={`w-full flex items-center px-4 py-2 text-sm ${
                  theme ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-200 hover:bg-gray-700'
                }`}
                onClick={(e) => e.stopPropagation()}
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </button>
              {/* Share */}
              <button
                className={`w-full flex items-center px-4 py-2 text-sm ${
                  theme ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-200 hover:bg-gray-700'
                }`}
                onClick={(e) => e.stopPropagation()}
              >
                <Share className="w-4 h-4 mr-2" />
                Share
              </button>
              {/* Move to top */}
              <button
                className={`w-full flex items-center px-4 py-2 text-sm ${
                  theme ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-200 hover:bg-gray-700'
                }`}
                onClick={(e) => e.stopPropagation()}
              >
                <Move className="w-4 h-4 mr-2" />
                Move to top
              </button>
              {/* Move to bottom */}
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