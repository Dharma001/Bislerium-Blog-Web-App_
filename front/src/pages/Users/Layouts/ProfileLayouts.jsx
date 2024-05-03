import React from 'react'
import {  Outlet, Link} from "react-router-dom";
import { useState } from 'react';

function ProfileLayouts() {
    const toggleMenu = () => {
        setTimeout(() => {
            setIsOpen(!isOpen);
        }, 300);
    };
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="w-full flex flex-col justify-center items-center">
            <div className="w-[70%] mt-4">
            <h2 className='font-semibold text-xl mt-6 hidden md:block'>User Settings</h2>
            <div className="sticky top-0 z-10  bg-white">
                <div className="main border-b-2 w-full">
                    <nav className="w-full transition-opacity duration-500 ">
                        <div className="px-4">
                            <div className="flex justify-between items-center ">
                                <button
                                    onClick={toggleMenu}
                                    className="block text-gray-800 hover:text-black focus:text-black focus:outline-none md:hidden"
                                >
                                    {isOpen ? (
                                        <svg
                                            className="h-6 w-6 fill-current"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M6.293 7.707a1 1 0 011.414 0L12 12.586l4.293-4.293a1 1 0 111.414 1.414L13.414 14l4.293 4.293a1 1 0 11-1.414 1.414L12 15.414l-4.293 4.293a1 1 0 01-1.414-1.414L10.586 14 6.293 9.707a1 1 0 010-1.414z"
                                            />
                                        </svg>
                                    ) : (
                                        <svg
                                            className="h-6 w-6 fill-current"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M4 6a1 1 0 011-1h14a1 1 0 110 2H5a1 1 0 01-1-1zM3 11a1 1 0 011-1h16a1 1 0 110 2H4a1 1 0 01-1-1zM9 16a1 1 0 100 2h6a1 1 0 100-2H9z"
                                            />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            <ul
                                className={`md:flex md:flex-row ${isOpen ? "block" : "hidden"
                                    } md:space-x-4`}
                            >
                                <li className="pr-[15px] py-[17px]">
                                    <Link
                                        to="/"
                                        className="nav md:text-[14px] lg:text-[17px] font-semibold text-black transition-colors duration-300 "
                                    >
                                        Account
                                    </Link>
                                </li>
                                <li className=" pr-[15px] py-[17px]">
                                    <Link
                                        to="userProfile"
                                        className="nav md:text-[14px] lg:text-[17px] font-semibold text-black transition-colors duration-300 "
                                    >
                                        Profile
                                    </Link>
                                </li>
                                <li className=" pr-[15px] py-[17px]">
                                    <Link
                                        to="/guide"
                                        className="nav md:text-[14px] lg:text-[17px] font-semibold text-black transition-colors duration-300 "
                                    >
                                        Blogs
                                    </Link>
                                </li>
                                <li className="pr-[15px] py-[17px]">
                                    <Link
                                        to="/portfolio"
                                        className="nav md:text-[14px] lg:text-[17px] font-semibold text-black transition-colors duration-300 "
                                    >
                                        Notification
                                    </Link>
                                </li>
                                <li className=" pr-[15px] py-[17px]">
                                    <Link
                                        to="/contact"
                                        className="nav md:text-[14px] lg:text-[17px] font-semibold text-black transition-colors duration-300 "
                                    >
                                        Comments
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
            <div className="p-4 hidden md:block">
            <Outlet />
            </div>
        </div>
        </div>
    );

}
export default ProfileLayouts
