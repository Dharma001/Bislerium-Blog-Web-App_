
import { Link, useNavigate, useNavigation, Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from 'js-cookie';
import { useState } from 'react';

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = () => {
    return Cookies.get('token') && Cookies.get('roleId');
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    Cookies.remove('token');
    Cookies.remove('roleId');
    Cookies.remove('userId');
    navigate("/");
    toast.success('Logout successfull');
  };
  return (
    <nav className=" border-gray-300 p-2 border-b">
      <div className="grid grid-cols-6 gap-4 justify-between w-full">
        <div className="text-lg font-bold col-span-2 "><a href="/" className="flex items-end"><img src="./logo.png" className="w-[3.5rem] mr-1" alt="" /> 
        <span className="text-orange-500 text-[1.4rem] font-semibold">Bislerium Blog</span>
        </a></div>
        <div className="col-span-4">
          <div className="flex justify-between items-center">
                <div className="relative bg-gray-200 rounded-3xl  w-[50%] ">
                <input
                  type="text"
                  name="search" 
                  placeholder="Search Blogs"
                  className="2xl:h-10 h-9 pl-12 text-[.8rem] 2xl:text-[.9rem] bg-gray-100 rounded-3xl w-full"
                  autoComplete="off"
                  autoFocus
                />
                <div className="absolute top-[.4rem] text-[1rem] left-2 z-10 pointer-events-none text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" width="1.4rem" height="1.4rem" className="2xl:w-[1.7rem] 2xl:h-[1.7rem]" viewBox="0 0 50 50"><path fill="currentColor" d="M23 36c-7.2 0-13-5.8-13-13s5.8-13 13-13s13 5.8 13 13s-5.8 13-13 13m0-24c-6.1 0-11 4.9-11 11s4.9 11 11 11s11-4.9 11-11s-4.9-11-11-11"/><path fill="currentColor" d="m32.682 31.267l8.98 8.98l-1.414 1.414l-8.98-8.98z"/></svg>     
                     </div>
              </div>
        <div className="lg:flex ">

          {isLoggedIn() ? (
            <><button className="w-20 rounded-3xl bg-gray-600 px-2 py-2">
              <a href="/createPost" className="text-gray-50">+ Create</a>
            </button>
              <button onClick={handleLogout}
                className="w-20 rounded-3xl bg-orange-600 px-2 py-2">
                Logout
              </button>

              <button className="w-20 rounded-3xl bg-orange-600 px-2 py-2">
                <a href="/Notif" className="text-gray-50">Notif</a>
              </button>
              <button className="w-20 rounded-3xl bg-orange-600 px-2 py-2">
                <a href="/Profile" className="text-gray-50">Profile</a>
              </button>
            </>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <a href="/login">
                <button
                  className="flex justify-center items-center text-[.8rem] font-semibold rounded-3xl bg-gray-200 px-3 py-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="mr-1 " width="1.3rem" height="1.3rem" viewBox="0 0 24 24"><path fill="currentColor" d="M17 9V7A5 5 0 0 0 7 7v2a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-7a3 3 0 0 0-3-3M9 7a3 3 0 0 1 6 0v2H9Zm9 12a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1Z"/></svg>
                      Log In
                </button>
              </a>
              <a href="/register">
                <button
                  className="flex justify-center items-center text-[.8rem] font-semibold rounded-3xl bg-orange-600 text-white px-3 py-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="mr-1 " width="1.3rem" height="1.3rem" viewBox="0 0 32 32"><path fill="currentColor" d="M22 3v4c-1.848 0-3.613.332-5.266.91l-.527-1.148l.902-.403l-.812-1.828l-3.652 1.625l.812 1.828l.922-.41l.512 1.106a16.126 16.126 0 0 0-3.043 1.988l-.786-.836l.727-.668l-1.351-1.476l-2.946 2.707l1.352 1.476l.742-.684l.805.848a15.929 15.929 0 0 0-2.446 3.395l-1.082-.535l.45-.883l-1.782-.907l-1.812 3.567l1.781.906l.457-.902l1.145.57A15.912 15.912 0 0 0 6.05 22H4v6h24V3zm2 2h2v17H8.05C8.563 14.727 14.595 9 22 9h2zm-6 6.953a2.001 2.001 0 0 0-1 3.735V20h5v-2h-3v-2.316a1.998 1.998 0 0 0-1-3.73zM6 24h20v2H6z"/></svg>
                    Sing Up
                </button>
              </a>
            </div>
          )}
</div>
</div>
          <div />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
