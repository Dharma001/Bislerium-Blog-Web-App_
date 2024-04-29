import React, { useState } from "react";
import { Link, useNavigate, useNavigation,Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from 'js-cookie';

function AdminLayout() {
  return ( 
    <>
      <div className='main bg-gradient-darker h-screen border w-full flex justify-between'>
      <div className='nav text-white max-w-[60%] md:max-w-[30%] max-h-screen lg:max-w-[25%] px-4 pt-8 pb-4 flex flex-col h-screen'>
        <h2 className='text-white font-bold tracking-wider text-2xl'>AeuxGlobal</h2>
        <hr className='mt-5 w-52'/>

        <h3 className='font-thin tracking-wide capitalize mt-10'>Navigation</h3>
        <ul>
        <Link to="dashboard">
          <li className="text-[15px] my-3 font-semibold  w-52 rounded-3xl hover:text-green-700 cursor-pointer hover:bg-white px-5 py-3">
            <i className="fa-solid fa-dice-d20 mr-1 text-sm w-fit"></i> Dashboard
          </li>
          </Link>
          <li className="text-[15px] my-3 font-semibold  w-52 rounded-3xl hover:text-green-700 cursor-pointer hover:bg-white px-5 py-3">
            <i className="fa-solid fa-dice-d20 mr-1 text-sm w-fit"></i> Roles
          </li>
          <li className="text-[15px] my-3 font-semibold  w-52 rounded-3xl hover:text-green-700 cursor-pointer hover:bg-white px-5 py-3">
            <i className="fa-solid fa-dice-d20 mr-1 text-sm w-fit"></i> Roles
          </li>
          <li className="text-[15px] my-3 font-semibold  w-52 rounded-3xl hover:text-green-700 cursor-pointer hover:bg-white px-5 py-3">
            <i className="fa-solid fa-dice-d20 mr-1 text-sm w-fit"></i> Roles
          </li>
        </ul>

        <div className='user-account flex  items-end h-full w-full'>
          <button className=' font-semibold  rounded-3xl w-52 mb-4'>
            <div className='flex justify-between items-center'>
              <div className='rounded-full h-14 w-14 mr-4'>
                <img src='https://imgs.search.brave.com/PVUfYH0LXpx98boFnkR0syDr25RdoSWaF0paHQfs2ms/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9o/YXBweS1yZWQtaGFp/cmVkLW1hbi10YWtp/bmctc2VsZmllLXBo/b3RvXzEyNjItNTEx/OC5qcGc_c2l6ZT02/MjYmZXh0PWpwZw' className='rounded-[50%] h-14 w-14'></img>
              </div>
              <div>
                <h4>Sajit Sapkota</h4>
                <p>Other details</p>
              </div>
            </div>
          </button>
        </div>
      </div>
      <main className="p-3 overflow-y-auto h-full flex justify-center items-center w-[85%]">
        <div className=" h-full bg-white w-full rounded-3xl">
        <Outlet/>
        </div>
        </main>
    </div>
    
    </>
  )
}

export default AdminLayout