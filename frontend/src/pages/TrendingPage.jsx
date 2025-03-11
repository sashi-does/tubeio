import Navbar from '../components/Navbar';
import LeftNavbar from '../components/LeftNavbar';
import FeedPage from './FeedPage';

const TrendingPage = () => (
  <div className="h-screen flex flex-col">
    <Navbar />
    <div className="flex flex-grow mt-10">
      <LeftNavbar />
      <FeedPage param="trending" />
    </div>
  </div>
);

export default TrendingPage;