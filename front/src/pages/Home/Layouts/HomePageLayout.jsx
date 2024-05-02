import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

function HomePageLayout() {
  const location = useLocation();

  return (
    <>
      <div className="">
        <Navbar />
        <div className="grid grid-cols-12 gap-2">
          <div className="border-r flex justify-center border-gray-200 col-span-2">
            <div className="w-[98%] m-4">
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
