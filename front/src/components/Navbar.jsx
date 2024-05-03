import { Link, useNavigate, useNavigation, Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setProfileIsOpen] = useState(false);

  const toggleMenu = () => {
    setTimeout(() => {
      setIsOpen(!isOpen);
    }, 300);
  };
  const navigate = useNavigate();
  const isLoggedIn = () => {
    return Cookies.get("token") && Cookies.get("roleId");
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    Cookies.remove("token");
    Cookies.remove("roleId");
    Cookies.remove("userId");
    navigate("/");
    toast.success("Logout successfull");
  };

  const toggleDropdown = () => {
    setProfileIsOpen(!isProfileOpen);
  };

  const closeDropdown = () => {
    setProfileIsOpen(false);
  };

  return (
    <nav className=" border-gray-300 p-2 border-b">
      <div className="grid grid-cols-6 gap-4 justify-between w-full">
        <div className=" font-bold col-span-2 ">
          <a href="/" className="flex justify-start items-end">
            <img src="./logo.png" className="w-12  mr-1" alt="" />
            <span className="text-orange-500 text-lg font-semibold">
              Bislerium Blog
            </span>
          </a>
        </div>
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.4rem"
                  height="1.4rem"
                  className="2xl:w-[1.7rem] 2xl:h-[1.7rem]"
                  viewBox="0 0 50 50"
                >
                  <path
                    fill="currentColor"
                    d="M23 36c-7.2 0-13-5.8-13-13s5.8-13 13-13s13 5.8 13 13s-5.8 13-13 13m0-24c-6.1 0-11 4.9-11 11s4.9 11 11 11s11-4.9 11-11s-4.9-11-11-11"
                  />
                  <path
                    fill="currentColor"
                    d="m32.682 31.267l8.98 8.98l-1.414 1.414l-8.98-8.98z"
                  />
                </svg>
              </div>
            </div>
            <div className="lg:flex">
              {isLoggedIn() ? (
                <div className="relative flex justify-between space-x-4">
                  <div className="flex">
                    <button className="">
                      <a
                        href="createPost"
                        className="text-gray-800 flex justify-center items-center"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1.5rem"
                          className="mr-1"
                         
                          viewBox="0 0 16 16"
                        >
                          <path
                            fill="currentColor"
                            d="M8 2.5a.5.5 0 0 0-1 0V7H2.5a.5.5 0 0 0 0 1H7v4.5a.5.5 0 0 0 1 0V8h4.5a.5.5 0 0 0 0-1H8z"
                          />
                        </svg>
                        <p className="text-sm">Create</p>
                      </a>
                    </button>
                    <button className="ml-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1.5rem"
                       
                        viewBox="0 0 24 24"
                      >
                        <g
                          fill="none"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="1.5"
                        >
                          <path d="M11.962 17.986h6.81a1.555 1.555 0 0 0 1.512-2.175c-.36-1.088-1.795-2.393-1.795-3.677c0-2.85 0-3.6-1.404-5.276a5.025 5.025 0 0 0-1.653-1.283l-.783-.38a1.089 1.089 0 0 1-.511-.73a2.023 2.023 0 0 0-2.176-1.707a2.023 2.023 0 0 0-2.12 1.707a1.089 1.089 0 0 1-.567.73l-.783.38A5.025 5.025 0 0 0 6.84 6.858c-1.403 1.676-1.403 2.426-1.403 5.276c0 1.284-1.37 2.458-1.73 3.611c-.217.697-.337 2.241 1.48 2.241z" />
                          <path d="M15.225 17.986a3.198 3.198 0 0 1-3.263 3.263A3.195 3.195 0 0 1 8.7 17.986" />
                        </g>
                      </svg>
                    </button>
                  </div>

                  <button
                    onClick={toggleDropdown}
                    className="focus:outline-none"
                  >
                    <img
                      src="https://cdn.discordapp.com/attachments/1217051055301328896/1235834773969174538/ads.png?ex=6635d052&is=66347ed2&hm=99c09d7825cfee1d000b3e77157d6dfdcfd5b84b86bb1cba9edc0606fa5fecf2&"
                      alt="Profile"
                      className="w-8   rounded-full"
                    />
                  </button>
                  {isProfileOpen && (
                    <div
                      className="absolute bg-white shadow-md z-999 space-y-1   overflow-y-auto rounded-sm "
                      style={{
                        top: "130%",
                        right: "0%",
                        width: "120%",
                        padding: "6% 6%"
                      }}
                      onClick={closeDropdown}
                    >
                      <button className="w-full text-start  py-2 px-4 hover:bg-gray-100 ">
                        <a
                          href="/history/posthistory"
                          className="text-gray-800 pl-8 text-xs  flex  "
                        >
                          <div>
                          <p>View Profile</p>
                         <p className="text-[10px] text-gray-500">Sumit Hacker</p> 
                          </div>
                        
                        </a>
                        
                        <div className="absolute top-4 pl-2 text-[1rem] left-2 z-10 pointer-events-none text-gray-600">
                          {/* <svg xmlns="http://www.w3.org/2000/svg" width="1.7em" height="1.7em" viewBox="0 0 20 20"><path fill="currentColor" d="M10 2a4 4 0 1 0 0 8a4 4 0 0 0 0-8M7 6a3 3 0 1 1 6 0a3 3 0 0 1-6 0m-1.991 5A2 2 0 0 0 3 13c0 1.691.833 2.966 2.135 3.797c1.05.669 2.398 1.049 3.87 1.165q.014-.153.052-.309l.17-.678c-1.413-.093-2.646-.442-3.554-1.022C4.623 15.283 4 14.31 4 13c0-.553.448-1 1.009-1h7.934l1-1zm5.97 4.377l4.83-4.83a1.87 1.87 0 1 1 2.645 2.646l-4.83 4.829a2.2 2.2 0 0 1-1.02.578l-1.498.374a.89.89 0 0 1-1.079-1.078l.375-1.498a2.2 2.2 0 0 1 .578-1.02"/></svg> */}
                          <img
                            src="https://cdn.discordapp.com/attachments/1217051055301328896/1235834773969174538/ads.png?ex=6635d052&is=66347ed2&hm=99c09d7825cfee1d000b3e77157d6dfdcfd5b84b86bb1cba9edc0606fa5fecf2&"
                            className="w-8  rounded-full"
                          />
                        </div>
                      </button>
                      <hr className="m-2"/>

                      <button className="w-full text-start py-2 px-4 hover:bg-gray-100 ">
                        <a
                          href="profile/userProfile"
                          className="text-gray-800 pl-8 text-xs  flex  "
                        >
                          Update Profile
                        </a>
                        <div className="absolute pl-2 top-[37%] text-[1rem] left-2 z-10 pointer-events-none text-gray-600">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1.7em"
                            height="1.7em"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fill="currentColor"
                              d="M10 2a4 4 0 1 0 0 8a4 4 0 0 0 0-8M7 6a3 3 0 1 1 6 0a3 3 0 0 1-6 0m-1.991 5A2 2 0 0 0 3 13c0 1.691.833 2.966 2.135 3.797c1.05.669 2.398 1.049 3.87 1.165q.014-.153.052-.309l.17-.678c-1.413-.093-2.646-.442-3.554-1.022C4.623 15.283 4 14.31 4 13c0-.553.448-1 1.009-1h7.934l1-1zm5.97 4.377l4.83-4.83a1.87 1.87 0 1 1 2.645 2.646l-4.83 4.829a2.2 2.2 0 0 1-1.02.578l-1.498.374a.89.89 0 0 1-1.079-1.078l.375-1.498a2.2 2.2 0 0 1 .578-1.02"
                            />
                          </svg>
                        </div>
                      </button>
                      <button className="w-full text-start px-4 py-2  hover:bg-gray-100">
                        <a
                          href="#"
                          className=" pl-8  text-xs flex text-black  hover:text-slate-900"
                        >
                          Change Password
                        </a>
                        <div className="absolute pl-2 top-[56%] text-[1rem] left-2 z-10 pointer-events-none text-gray-600">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1.7rem"
                            height="1.7rem"
                            viewBox="0 0 48 48"
                          >
                            <path
                              fill="none"
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M24 25.28a3.26 3.26 0 0 0-1.64 6.07V36h3.32v-4.65a3.28 3.28 0 0 0 1.61-2.8v0A3.27 3.27 0 0 0 24 25.28"
                            />
                            <rect
                              width="33.23"
                              height="25.73"
                              x="7.38"
                              y="17.77"
                              fill="none"
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              rx="4.32"
                            />
                            <path
                              fill="none"
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M13.35 17.77v-2.61a10.66 10.66 0 0 1 21.32 0v2.61"
                            />
                          </svg>
                        </div>
                      </button>

                      <hr className="m-2"/>
                      <button className="w-full text-start  py-2 px-4  hover:bg-gray-100 flex">
                        <a
                          href="#"
                          className=" text-xs pl-8 text-black  hover:text-slate-900"
                          onClick={handleLogout}
                        >
                          Log Out
                        </a>
                        <div className="absolute pl-2 top-[81%]  text-[1rem] left-2 z-10 pointer-events-none text-gray-600">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1.3em"
                            height="1.3em"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="M5.616 20q-.691 0-1.153-.462T4 18.384V5.616q0-.691.463-1.153T5.616 4h5.903q.214 0 .357.143t.143.357t-.143.357t-.357.143H5.616q-.231 0-.424.192T5 5.616v12.769q0 .23.192.423t.423.192h5.904q.214 0 .357.143t.143.357t-.143.357t-.357.143zm12.444-7.5H9.692q-.213 0-.356-.143T9.192 12t.143-.357t.357-.143h8.368l-1.971-1.971q-.141-.14-.15-.338q-.01-.199.15-.364q.159-.165.353-.168q.195-.003.36.162l2.614 2.613q.242.243.242.566t-.243.566l-2.613 2.613q-.146.146-.347.153t-.366-.159q-.16-.165-.157-.357t.162-.35z"
                            />
                          </svg>
                        </div>
                      </button>

                      {/* {isStaff() && (
                      <Link
                        to={"/staffs"}
                        className="block w-full px-4 py-2 text-black hover:bg-gray-200 hover:text-slate-900"
                      >
                        Dashboard
                      </Link>
                    )} */}
                    </div>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <a href="/login">
                    <button className="flex justify-center items-center text-[.8rem] font-semibold rounded-3xl bg-gray-200 px-3 py-2 hover:bg-slate-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-1 "
                        width="1.3rem"
                        height="1.3rem"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M17 9V7A5 5 0 0 0 7 7v2a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-7a3 3 0 0 0-3-3M9 7a3 3 0 0 1 6 0v2H9Zm9 12a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1Z"
                        />
                      </svg>
                      Log In
                    </button>
                  </a>
                  <a href="/register">
                    <button className="flex justify-center items-center text-[.8rem] font-semibold rounded-3xl bg-orange-600 text-white px-3 py-2 hover:bg-orange-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-1 "
                        width="1.3rem"
                        height="1.3rem"
                        viewBox="0 0 32 32"
                      >
                        <path
                          fill="currentColor"
                          d="M22 3v4c-1.848 0-3.613.332-5.266.91l-.527-1.148l.902-.403l-.812-1.828l-3.652 1.625l.812 1.828l.922-.41l.512 1.106a16.126 16.126 0 0 0-3.043 1.988l-.786-.836l.727-.668l-1.351-1.476l-2.946 2.707l1.352 1.476l.742-.684l.805.848a15.929 15.929 0 0 0-2.446 3.395l-1.082-.535l.45-.883l-1.782-.907l-1.812 3.567l1.781.906l.457-.902l1.145.57A15.912 15.912 0 0 0 6.05 22H4v6h24V3zm2 2h2v17H8.05C8.563 14.727 14.595 9 22 9h2zm-6 6.953a2.001 2.001 0 0 0-1 3.735V20h5v-2h-3v-2.316a1.998 1.998 0 0 0-1-3.73zM6 24h20v2H6z"
                        />
                      </svg>
                      Sign Up
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
