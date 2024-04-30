
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
    <nav className=" border-gray-300 p-2 border-b-2">
      <div className="grid grid-cols-6 gap-4 justify-between items-center w-full">
        <div className="text-black text-lg font-bold col-span-2 "><a href="/" className="flex items-center "><img src="./logo.png" className="w-[3.5rem] mr-1" alt="" /> Bislerium Blog</a></div>
        <div className="col-span-4">
          <div className="flex justify-between items-center">
                <div className="relative bg-gray-200 rounded-3xl  w-[50%] ">
                <input
                  type="text"
                  name="search" 
                  placeholder="Search Blogs"
                  className="h-12 pl-12 text-[.9rem] bg-gray-200 rounded-3xl w-full"
                  autoComplete="off"
                  autoFocus
                />
                <div className="absolute top-[.5rem] text-[1rem] left-2 z-10 pointer-events-none text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 50 50"><path fill="currentColor" d="M23 36c-7.2 0-13-5.8-13-13s5.8-13 13-13s13 5.8 13 13s-5.8 13-13 13m0-24c-6.1 0-11 4.9-11 11s4.9 11 11 11s11-4.9 11-11s-4.9-11-11-11"/><path fill="currentColor" d="m32.682 31.267l8.98 8.98l-1.414 1.414l-8.98-8.98z"/></svg>                </div>
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
                  className="flex justify-center items-center text-[.9rem] rounded-3xl bg-gray-200 px-3 py-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="mr-1" width="1.3rem" height="1.3rem" viewBox="0 0 24 24"><g fill="none" stroke="currentColor"><rect width="14" height="10" x="5" y="10.968" rx="2"/><path d="M15.486 10.984V7.243a1.5 1.5 0 0 0-1.5-1.5h-3.972a1.5 1.5 0 0 0-1.5 1.5v3.74"/></g></svg>  Log In
                </button>
              </a>
              <a href="/register">
                <button
                  className="flex flex-col text-[.9rem]  rounded-3xl bg-orange-600 px-3 py-2 text-white font-semibold text-center">
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
