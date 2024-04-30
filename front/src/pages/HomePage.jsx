import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Post from '../components/Post';
import SideBar from '../components/SideBar';
import { useState } from 'react';
const Home = () => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <div className="flex-col md:flex-row justify-center space-y-2 md:space-y-0 md:space-x-4 animate-fade-in-right bg-gray-50 min-h-screen">
        <Navbar />
        <div className="flex flex-col md:flex-row md:space-x-4">
          <SideBar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
          <div className="container mx-auto mt-4">
            <Post title="Example Title" author="Example Author" subreddit="Example Subreddit" upvotes={10} comments={5} />
          </div>
        </div>
      </div>
      <Footer />
    </>

  );
};



export default Home;