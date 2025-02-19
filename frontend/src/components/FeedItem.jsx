import { NavLink, useLocation } from 'react-router-dom';
import { IoMdHome } from 'react-icons/io';
import { FaFireAlt } from 'react-icons/fa';
import { SiYoutubegaming } from 'react-icons/si';
import { RiMenuAddLine } from 'react-icons/ri';
import { useContext } from 'react';
import Context from '../context/Context';

const typeToIconMap = {
  Home: IoMdHome,
  Trending: FaFireAlt,
  Gaming: SiYoutubegaming,
  'Saved Videos': RiMenuAddLine,
};

const typeToPathMap = {
  Home: '/',
  Trending: '/trending',
  Gaming: '/gaming',
  'Saved Videos': '/saved-videos',
};

const FeedItem = ({ details, onChangeItem }) => {
  const { type } = details;
  const location = useLocation();
  const { theme } = useContext(Context);

  const Icon = typeToIconMap[type];
  const path = typeToPathMap[type];
  const isActive = location.pathname === path;

  return (
    <li
      onClick={() => onChangeItem(type)}
      className={`flex items-center px-6 py-2 cursor-pointer rounded-lg transition-colors duration-200 
        ${isActive ? (theme ? 'bg-gray-200' : 'bg-gray-700') : ''}`}
    >
      <NavLink
        to={path}
        className="flex items-center w-full text-gray-600 dark:text-gray-300 hover:text-blue-400"
      >
        <Icon className={`w-6 h-6 mr-3 ${isActive ? 'text-blue-400' : ''}`} />
        <p className={`${isActive ? (theme ? 'text-black font-semibold' : 'text-gray-50') : 'text-black hover:text-blue-400 w-full'} ${theme ? 'text-black' : 'text-white'}`}>{type}</p>
      </NavLink>
    </li>
  );
};

export default FeedItem;