import React from 'react'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'
import { Link, Outlet, useLocation } from 'react-router-dom'

function UserUpdateLayouts() {
    return (
        <>
            <div className="wr-sceen ">
                <div className="w-full ml-80">
                    <div className="w-10 h-10 p-2">
                        <img src="https://picsum.photos/200/300" alt="" className=" w-10 rounded-l-full rounded-r-full rounded-t-full rounded-b-full" />
                    </div>
                    <h2 className="text-lg font-bold">Afraid-Mail2154</h2>
                    <p className="text-sm text-gray-600">u/Afraid-Mail2154</p>
                    <ul className="flex flex-wrap mb-4"> 
                        <li className="py-2 border-b border-gray-200 mr-2"> 
                            <Link href="postHistory" className="text-black rounded-2xl hover:border-4 hover:bg-gray-200">
                                Post
                            </Link>
                        </li>
                        <li className="py-2 border-b  mr-2"> 
                            <a href="commentHistory" className="text-black rounded-2xl hover:border-4 hover:bg-gray-200">
                                Comments
                            </a>
                        </li>
                    </ul>
                    <button className=" hover:bg-gray-100 py-2 px-2 border rounded-3xl">
                        + Create a post
                    </button>
                </div>

            </div >
            <div className="grid grid-cols-12 gap-2 mb-80">
                <div className="col-span-10">
                    <Outlet />
                </div>
            </div>
        </>
    )
}
export default UserUpdateLayouts
