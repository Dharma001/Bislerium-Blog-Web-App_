import React from 'react'
import {  Outlet, Link} from "react-router-dom";
import { useState } from 'react';

function ProfileLayouts() {

    return (
        <div className="w-full flex flex-col justify-start items-start">
            <div className="w-[70%] mt-4">
            <h2 className='font-semibold  mt-6 ml-4 '>User Settings</h2>
            <div className="sticky top-0 z-10  bg-white">
                <div className="main border-b-2 w-full">
                    <nav className="w-full transition-opacity duration-500 ">
                        <div className="px-4 ">
                            
                            <ul className='flex space-x-4 items-center '
                                
                            >
                                <li className="pr-[15px] py-[17px]">
                                    <Link
                                        to="/"
                                        className="nav text-[10px] md:text-[10px] lg:text-[14px] font-semibold hover:text-black text-gray-500 transition-colors duration-300 "
                                    >
                                        Account
                                    </Link>
                                </li>
                                <li className=" pr-[15px] py-[17px]">
                                    <Link
                                        to="userProfile"
                                        className="nav text-[10px] md:text-[12px] lg:text-[14px] font-semibold hover:text-black text-gray-500 transition-colors duration-300 "
                                    >
                                        Profile
                                    </Link>
                                </li>
                                <li className=" pr-[15px] py-[17px]">
                                    <Link
                                        to="/guide"
                                        className="nav text-[10px] md:text-[12px] lg:text-[14px] font-semibold hover:text-black text-gray-500 transition-colors duration-300 "
                                    >
                                        Blogs
                                    </Link>
                                </li>
                                <li className="pr-[15px] py-[17px]">
                                    <Link
                                        to="/portfolio"
                                        className="nav text-[10px] md:text-[12px] lg:text-[14px] font-semibold hover:text-black text-gray-500 transition-colors duration-300 "
                                    >
                                        Notification
                                    </Link>
                                </li>
                                <li className=" pr-[15px] py-[17px]">
                                    <Link
                                        to="/contact"
                                        className="nav text-[10px] md:text-[12px] lg:text-[14px] font-semibold hover:text-black text-gray-500 transition-colors duration-300 "
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
