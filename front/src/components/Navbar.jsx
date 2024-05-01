
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
        <div className="lg:flex">
          {isLoggedIn() ? (
            <div className="grid grid-cols-4 gap-2">
            <button className="">
              <Link href="/createPost" className="text-gray-800 flex justify-center items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="2rem" className="mr-1" height="2rem" viewBox="0 0 16 16"><path fill="currentColor" d="M8 2.5a.5.5 0 0 0-1 0V7H2.5a.5.5 0 0 0 0 1H7v4.5a.5.5 0 0 0 1 0V8h4.5a.5.5 0 0 0 0-1H8z"/></svg>
                 Create</Link>
            </button>
            <button
                onClick={handleLogout}
                  className="flex justify-center items-center text-[.8rem] font-semibold rounded-3xl bg-orange-600 text-white px-3 py-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="mr-1 " width="1.3rem" height="1.3rem" viewBox="0 0 32 32"><path fill="currentColor" d="M22 3v4c-1.848 0-3.613.332-5.266.91l-.527-1.148l.902-.403l-.812-1.828l-3.652 1.625l.812 1.828l.922-.41l.512 1.106a16.126 16.126 0 0 0-3.043 1.988l-.786-.836l.727-.668l-1.351-1.476l-2.946 2.707l1.352 1.476l.742-.684l.805.848a15.929 15.929 0 0 0-2.446 3.395l-1.082-.535l.45-.883l-1.782-.907l-1.812 3.567l1.781.906l.457-.902l1.145.57A15.912 15.912 0 0 0 6.05 22H4v6h24V3zm2 2h2v17H8.05C8.563 14.727 14.595 9 22 9h2zm-6 6.953a2.001 2.001 0 0 0-1 3.735V20h5v-2h-3v-2.316a1.998 1.998 0 0 0-1-3.73zM6 24h20v2H6z"/></svg>
                    Logout
              </button>
              <button className="">
                <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="M11.962 17.986h6.81a1.555 1.555 0 0 0 1.512-2.175c-.36-1.088-1.795-2.393-1.795-3.677c0-2.85 0-3.6-1.404-5.276a5.025 5.025 0 0 0-1.653-1.283l-.783-.38a1.089 1.089 0 0 1-.511-.73a2.023 2.023 0 0 0-2.176-1.707a2.023 2.023 0 0 0-2.12 1.707a1.089 1.089 0 0 1-.567.73l-.783.38A5.025 5.025 0 0 0 6.84 6.858c-1.403 1.676-1.403 2.426-1.403 5.276c0 1.284-1.37 2.458-1.73 3.611c-.217.697-.337 2.241 1.48 2.241z"/><path d="M15.225 17.986a3.198 3.198 0 0 1-3.263 3.263A3.195 3.195 0 0 1 8.7 17.986"/></g></svg>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <Link href="/login">
                <button
                  className="flex justify-center items-center text-[.8rem] font-semibold rounded-3xl bg-gray-200 px-3 py-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="mr-1 " width="1.3rem" height="1.3rem" viewBox="0 0 24 24"><path fill="currentColor" d="M17 9V7A5 5 0 0 0 7 7v2a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-7a3 3 0 0 0-3-3M9 7a3 3 0 0 1 6 0v2H9Zm9 12a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1Z"/></svg>
                      Log In
                </button>
              </Link>
              <Link href="/register">
                <button
                  className="flex justify-center items-center text-[.8rem] font-semibold rounded-3xl bg-orange-600 text-white px-3 py-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="mr-1 " width="1.3rem" height="1.3rem" viewBox="0 0 32 32"><path fill="currentColor" d="M22 3v4c-1.848 0-3.613.332-5.266.91l-.527-1.148l.902-.403l-.812-1.828l-3.652 1.625l.812 1.828l.922-.41l.512 1.106a16.126 16.126 0 0 0-3.043 1.988l-.786-.836l.727-.668l-1.351-1.476l-2.946 2.707l1.352 1.476l.742-.684l.805.848a15.929 15.929 0 0 0-2.446 3.395l-1.082-.535l.45-.883l-1.782-.907l-1.812 3.567l1.781.906l.457-.902l1.145.57A15.912 15.912 0 0 0 6.05 22H4v6h24V3zm2 2h2v17H8.05C8.563 14.727 14.595 9 22 9h2zm-6 6.953a2.001 2.001 0 0 0-1 3.735V20h5v-2h-3v-2.316a1.998 1.998 0 0 0-1-3.73zM6 24h20v2H6z"/></svg>
                    Sing Up
                </button>
              </Link>
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
