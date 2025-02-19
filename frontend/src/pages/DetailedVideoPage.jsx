import React, { useContext } from 'react';
import Navbar from '../components/Navbar';
import LeftNavbar from '../components/LeftNavbar';
import Context from '../context/Context';
import DetailedVideoItem from '../components/DetailedVideoItem';

const DetailedVideoPage = (props) => {
  const { theme } = useContext(Context); 

  return (
    <div className={`mt-[63px] min-h-screen ${theme ? 'bg-white' : 'bg-gray-900'}`}>
      <Navbar />
      <div className="flex">
        <LeftNavbar />
        <DetailedVideoItem {...props} />
      </div>
    </div>
  );
};

export default DetailedVideoPage;