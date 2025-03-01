import React from 'react'; // Import React explicitly
import Navbar from '../components/Navbar';
import LeftNavbar from '../components/LeftNavbar';
import FeedPage from './FeedPage';

const HomePage = () => (
  <div className="h-screen flex flex-col">
    <Navbar />
    <div className="flex flex-grow">
      <LeftNavbar />
      <div className='flex-grow'>
        <FeedPage param="all"/>
      </div>
    </div>
  </div>
);

export default HomePage;