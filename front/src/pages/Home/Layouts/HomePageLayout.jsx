import React, { useState } from "react";
import { Link, useNavigate, useNavigation,Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from 'js-cookie';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import SideBar from '../../../components/SideBar';

function HomePageLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <>
      <div className="flex-col md:flex-row justify-center space-y-2 md:space-y-0 md:space-x-4 animate-fade-in-right bg-gray-50 min-h-screen">
        <Navbar />
        <div className="flex flex-col md:flex-row md:space-x-4">
          <SideBar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
          <div className="container mx-auto mt-4">
        <Outlet/>
          </div>
        </div>
      </div>
      <Footer />
    </>

  )
}

export default HomePageLayout