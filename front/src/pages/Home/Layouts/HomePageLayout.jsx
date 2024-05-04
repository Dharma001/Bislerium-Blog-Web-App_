import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

function HomePageLayout() {
  const location = useLocation();
  const handleLogout = async (e) => {
    e.preventDefault();
    Cookies.remove('token');
    Cookies.remove('roleId');
    Cookies.remove('userId');
    navigate("/");
    toast.success('Logout successfull');
  };

  return (
    <>
      <div className="">
        <Navbar />
        <div className="grid grid-cols-12  gap-2">
          <div className="border-r flex justify-center border-gray-200 col-span-2">
            <div className="w-[98%] h-[80dvh] sticky top-20 overflow-y-auto  scrollbar-w-2 scrollbar-track-gray-100 scrollbar-thumb-gray-300 m-4">
              <nav>
                <ul>
                  <NavLink to="/" activeClassName="active" isActive={() => location.pathname === '/'}>
                    <li className={`text-[14px] my-3 flex font-semibold rounded-sm items-end hover:text-gray-500 cursor-pointer hover:bg-gray-100 px-3 py-2 ${location.pathname === '/' ? 'bg-gray-200 text-black' : ''}`}>
                      {location.pathname === '/' ? (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" className="mr-2" viewBox="0 0 48 48">
                            <path fill="currentColor" d="M26.394 5.855a3.78 3.78 0 0 0-4.788 0L8.431 16.597A3.91 3.91 0 0 0 7 19.628v19.485C7 41.26 8.713 43 10.825 43h4.35C17.288 43 19 41.26 19 39.113V30.5a2.5 2.5 0 0 1 2.5-2.5h5a2.5 2.5 0 0 1 2.5 2.5v8.613C29 41.26 30.712 43 32.825 43h4.35C39.288 43 41 41.26 41 39.113V19.628a3.91 3.91 0 0 0-1.431-3.031z"/>
                          </svg>
                        </>
                      ) : (
                        <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" className="mr-2" viewBox="0 0 24 24">
                            <path fill="none" stroke="currentColor" d="M12.391 4.262a1 1 0 0 0-1.46.035l-6.177 6.919a1 1 0 0 0-.254.666V19.5a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1V16a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v3.5a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-7.591a1 1 0 0 0-.287-.7z"/>
                          </svg>
                        </>
                      )}
                        Home
                    </li>
                  </NavLink>
                </ul>
              </nav>
              <div className='user-account flex  items-end h-full w-full'>
        <button
                    onClick={handleLogout}
                    className="flex justify-center items-center text-[.8rem] w-full hover:bg-orange-700 font-semibold rounded-sm  bg-orange-600 text-white px-3 py-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="mr-1 " width="1.3rem" height="1.3rem" viewBox="0 0 32 32"><path fill="currentColor" d="M22 3v4c-1.848 0-3.613.332-5.266.91l-.527-1.148l.902-.403l-.812-1.828l-3.652 1.625l.812 1.828l.922-.41l.512 1.106a16.126 16.126 0 0 0-3.043 1.988l-.786-.836l.727-.668l-1.351-1.476l-2.946 2.707l1.352 1.476l.742-.684l.805.848a15.929 15.929 0 0 0-2.446 3.395l-1.082-.535l.45-.883l-1.782-.907l-1.812 3.567l1.781.906l.457-.902l1.145.57A15.912 15.912 0 0 0 6.05 22H4v6h24V3zm2 2h2v17H8.05C8.563 14.727 14.595 9 22 9h2zm-6 6.953a2.001 2.001 0 0 0-1 3.735V20h5v-2h-3v-2.316a1.998 1.998 0 0 0-1-3.73zM6 24h20v2H6z" /></svg>
                    Logout
                  </button>
        </div>
            </div>
          </div>
          <div className="col-span-10">
            <Outlet />
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default HomePageLayout;
