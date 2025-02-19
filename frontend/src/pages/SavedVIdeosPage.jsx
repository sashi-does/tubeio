import React, { useContext } from 'react';
import Navbar from '../components/Navbar';
import LeftNavbar from '../components/LeftNavbar';
import SavedVideos from '../components/SavedVideos';
import Context from '../context/Context';

const SavedVideosRoute = () => {
  const { theme } = useContext(Context); 

  return (
    <div className={`h-screen flex flex-col ${theme ? 'bg-gray-100' : 'bg-gray-900 text-white'}`}>
      <Navbar />
      <div className="flex flex-grow">
        <LeftNavbar />
        <SavedVideos />
      </div>
    </div>
  );
};

export default SavedVideosRoute;