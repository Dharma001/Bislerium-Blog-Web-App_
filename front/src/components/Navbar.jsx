
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
    <nav className="bg-gray-100 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-black text-lg font-bold ">Bislerium Blog</div>
        <div className="container mx-auto mt-2">
      <input
        type="text"
        placeholder="Search Blogs"
        className=" p-3 w- container border border-gray-300 rounded-3xl justify-center "
      />
    </div>
        <div className="lg:flex space-x-4">

          {isLoggedIn() ? (
            <>
            <button className="w-20 rounded-3xl bg-gray-600 px-2 py-2">
              <a href="/create" className="text-gray-50">+ Create</a>
            </button>
              <button onClick={handleLogout}
                className="w-20 rounded-3xl bg-orange-600 px-2 py-2">
                Logout
              </button>

              <button className="w-20 rounded-3xl bg-orange-600 px-2 py-2">
                <a href="/Notif" className="text-gray-50">Notif</a>
              </button>
              {/* icon hala yeta */}
              <button className="w-20 rounded-3xl bg-orange-600 px-2 py-2">
                <a href="/Profile" className="text-gray-50">Profile</a>
              </button>
            </>
          ) : (
            <>
              <a href="/login">
                <button
                  className="flex flex-col w-20 rounded-3xl bg-orange-600 px-3 py-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M3.5 9.568v4.864c0 2.294 0 3.44.722 4.153c.655.647 1.674.706 3.596.712a7.656 7.656 0 0 1-.015-.105c-.115-.844-.115-1.916-.115-3.247v-.053c0-.403.331-.73.74-.73c.408 0 .739.327.739.73c0 1.396.001 2.37.101 3.105c.098.714.275 1.093.548 1.362c.273.27.656.445 1.379.54c.744.1 1.731.101 3.146.101h.985c1.415 0 2.401-.002 3.146-.1c.723-.096 1.106-.272 1.378-.541c.273-.27.451-.648.548-1.362c.1-.734.102-1.709.102-3.105V8.108c0-1.397-.002-2.37-.102-3.105c-.097-.714-.275-1.093-.547-1.362c-.273-.27-.656-.445-1.38-.54C17.728 3 16.742 3 15.327 3h-.985c-1.415 0-2.402.002-3.146.1c-.723.096-1.106.272-1.379.541c-.273.27-.45.648-.548 1.362c-.1.734-.101 1.708-.101 3.105c0 .403-.331.73-.74.73a.734.734 0 0 1-.739-.73v-.053c0-1.33 0-2.403.115-3.247l.015-.105c-1.922.006-2.94.065-3.596.712c-.722.713-.722 1.86-.722 4.153m9.885 5.38l2.464-2.432a.723.723 0 0 0 0-1.032l-2.464-2.432a.746.746 0 0 0-1.045 0a.723.723 0 0 0 0 1.032l1.202 1.186H6.457a.734.734 0 0 0-.74.73c0 .403.331.73.74.73h7.085l-1.202 1.186a.723.723 0 0 0 0 1.032a.746.746 0 0 0 1.045 0" clipRule="evenodd" /></svg>  Login
                </button>
              </a>
              <a href="/register">
                <button
                  className="flex flex-col w-20 rounded-3xl bg-orange-600 px-2 py-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M3.5 9.568v4.864c0 2.294 0 3.44.722 4.153c.655.647 1.674.706 3.596.712a7.656 7.656 0 0 1-.015-.105c-.115-.844-.115-1.916-.115-3.247v-.053c0-.403.331-.73.74-.73c.408 0 .739.327.739.73c0 1.396.001 2.37.101 3.105c.098.714.275 1.093.548 1.362c.273.27.656.445 1.379.54c.744.1 1.731.101 3.146.101h.985c1.415 0 2.401-.002 3.146-.1c.723-.096 1.106-.272 1.378-.541c.273-.27.451-.648.548-1.362c.1-.734.102-1.709.102-3.105V8.108c0-1.397-.002-2.37-.102-3.105c-.097-.714-.275-1.093-.547-1.362c-.273-.27-.656-.445-1.38-.54C17.728 3 16.742 3 15.327 3h-.985c-1.415 0-2.402.002-3.146.1c-.723.096-1.106.272-1.379.541c-.273.27-.45.648-.548 1.362c-.1.734-.101 1.708-.101 3.105c0 .403-.331.73-.74.73a.734.734 0 0 1-.739-.73v-.053c0-1.33 0-2.403.115-3.247l.015-.105c-1.922.006-2.94.065-3.596.712c-.722.713-.722 1.86-.722 4.153m9.885 5.38l2.464-2.432a.723.723 0 0 0 0-1.032l-2.464-2.432a.746.746 0 0 0-1.045 0a.723.723 0 0 0 0 1.032l1.202 1.186H6.457a.734.734 0 0 0-.74.73c0 .403.331.73.74.73h7.085l-1.202 1.186a.723.723 0 0 0 0 1.032a.746.746 0 0 0 1.045 0" clipRule="evenodd" /></svg>  Sing Up
                </button>
              </a>
            </>
          )}

          <div />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
