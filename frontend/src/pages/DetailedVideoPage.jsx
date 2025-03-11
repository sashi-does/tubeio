import React, { useContext, useState } from 'react';
import Navbar from '../components/Navbar';
import LeftNavbar from '../components/LeftNavbar';
import Context from '../context/Context';
import DetailedVideoItem from '../components/DetailedVideoItem';

const DetailedVideoPage = () => {
  const { theme } = useContext(Context);
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className={`mt-[63px] min-h-screen ${theme ? 'bg-white' : 'bg-gray-900'}`}>
      <Navbar isMobileMenuOpen={isMobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen} />
      <div className="flex">
        <LeftNavbar 
          isMobileMenuOpen={isMobileMenuOpen} />
        <DetailedVideoItem />
      </div>
    </div>
  );
};

export default DetailedVideoPage;