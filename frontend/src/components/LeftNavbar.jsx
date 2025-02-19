import { useState, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Home, Flame, Gamepad2, Bookmark, Facebook, Twitter, Linkedin } from 'lucide-react';
import FeedItem from './FeedItem';
import Context from '../context/Context';

const feedsList = [
  { id: uuidv4(), type: 'Home', Icon: Home },
  { id: uuidv4(), type: 'Trending', Icon: Flame },
  { id: uuidv4(), type: 'Gaming', Icon: Gamepad2 },
  { id: uuidv4(), type: 'Saved Videos', Icon: Bookmark },
];

const LeftNavbar = () => {
  const [activeItem, setActiveItem] = useState('Home');
  const { theme } = useContext(Context);

  return (
    <aside className={`w-72 flex-shrink-0 h-[calc(100vh-4rem)] sticky top-16 transition-colors duration-200
      ${theme 
        ? 'bg-white border-r border-gray-200' 
        : 'bg-gray-900 border-r border-gray-800'
      }`}
    >
      <div className="h-full flex flex-col">
        <nav className="flex-1 py-6">
          <ul className="px-3 space-y-1">
            {feedsList.map((item) => (
              <FeedItem
                key={item.id}
                onChangeItem={setActiveItem}
                details={item}
                activeItem={activeItem}
              />
            ))}
          </ul>
        </nav>

        <div className={`p-6 border-t ${theme ? 'border-gray-200' : 'border-gray-800'}`}>
          <h2 className={`text-sm font-semibold mb-4 tracking-wider
            ${theme ? 'text-gray-900' : 'text-gray-100'}`}
          >
            CONTACT US
          </h2>
          
          <div className="flex items-center space-x-4 mb-6">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
              className={`p-2 rounded-lg transition-colors
                ${theme 
                  ? 'hover:bg-gray-100 text-blue-600' 
                  : 'hover:bg-gray-800 text-blue-400'
                }`}
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
              className={`p-2 rounded-lg transition-colors
                ${theme 
                  ? 'hover:bg-gray-100 text-sky-500' 
                  : 'hover:bg-gray-800 text-sky-400'
                }`}
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
              className={`p-2 rounded-lg transition-colors
                ${theme 
                  ? 'hover:bg-gray-100 text-blue-700' 
                  : 'hover:bg-gray-800 text-blue-400'
                }`}
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>

          <div className={`rounded-lg p-4 ${
            theme 
              ? 'bg-gray-50 text-gray-600' 
              : 'bg-gray-800/50 text-gray-400'
          }`}>
            <p className="text-sm leading-relaxed">
              Enjoy! Now to see your channels and recommendations!
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default LeftNavbar;