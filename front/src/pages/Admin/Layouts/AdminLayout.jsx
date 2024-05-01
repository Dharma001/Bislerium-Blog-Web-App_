import React, { useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from 'js-cookie';

function AdminLayout() {
  const location = useLocation();
  return ( 
    <>
      <div className='h-fit border w-full flex justify-between'>
      <div className='NavLink max-w-[60%] md:max-w-[30%] max-h-screen lg:w-[17%] px-4 mt-2 pb-4 flex flex-col h-screen border-r-2'>
        <div className="justify-normal lg:gap-2 flex items-end">
          <div className="">
            <img src="https://media.discordapp.net/attachments/1217051055301328896/1234965093712920735/newlogo.png?ex=66334f1e&is=6631fd9e&hm=a2bcc20bd5f6c57b99a0a5f537c2f32f7fe7abf849f18152174cf97759d3dd61&=&format=webp&quality=lossless&width=612&height=417"  className="w-16"  alt="image is not loading"/>
          </div>
          <div className="border-b-2 "><h2 className='NavLink font-bold tracking-wider text-lg'>Bislerium Blog</h2></div>
        </div>

<div className="border-t-2 mt-6">
        <NavLink to="/admin/dashboard" activeClassName="active" isActive={() => location.pathname === '/admin/dashboard'}>
  <li className={`text-[15px] my-3 flex font-semibold rounded-sm items-end hover:text-gray-500 cursor-pointer hover:bg-gray-200 px-3 py-2 ${location.pathname === '/admin/dashboard' ? 'bg-gray-200 text-black' : ''}`}>
    {location.pathname === '/admin/dashboard' ? (
      <svg xmlns="http://www.w3.org/2000/svg"
      width="1.5rem" height="1.5rem" className="mr-2"
       viewBox="0 0 36 36"><path fill="currentColor" d="M18 4.25A16.49 16.49 0 0 0 5.4 31.4l.3.35h24.6l.3-.35A16.49 16.49 0 0 0 18 4.25m8.6 9.48l-5.92 5.81a3 3 0 1 1-1.41-1.42l5.91-5.81Zm-23 6.17H7v2H3.56c0-.39-.05-.77-.05-1.17s.02-.55.04-.83Zm4.88-10l2.46 2.46l-1.47 1.38L7 11.29a14.57 14.57 0 0 1 1.43-1.42ZM19 9.79h-2v-3.5h1c.37 0 .7 0 1 .05Zm13.49 10.95c0 .39 0 .79-.05 1.17h-3.52v-2h3.53c.02.27.04.55.04.83" class="clr-i-solid clr-i-solid-path-1"/><path fill="none" d="M0 0h36v36H0z"/></svg>
    ) : (
      <svg xmlns="http://www.w3.org/2000/svg"
      width="1.5rem" height="1.5rem" className="mr-2"
       viewBox="0 0 36 36"><path fill="currentColor" d="m25.18 12.32l-5.91 5.81a3 3 0 1 0 1.41 1.42l5.92-5.81Z" class="clr-i-outline clr-i-outline-path-1"/><path fill="currentColor" d="M18 4.25A16.49 16.49 0 0 0 5.4 31.4l.3.35h24.6l.3-.35A16.49 16.49 0 0 0 18 4.25m11.34 25.5H6.66a14.43 14.43 0 0 1-3.11-7.84H7v-2H3.55A14.41 14.41 0 0 1 7 11.29l2.45 2.45l1.41-1.41l-2.43-2.46A14.41 14.41 0 0 1 17 6.29v3.5h2V6.3a14.47 14.47 0 0 1 13.4 13.61h-3.48v2h3.53a14.43 14.43 0 0 1-3.11 7.84" class="clr-i-outline clr-i-outline-path-2"/><path fill="none" d="M0 0h36v36H0z"/></svg> 
    )}
    Dashboard
  </li>
</NavLink>
        <h3 className='font-thin text-[13px] tracking-wide capitalize mb-2 mt-8'>Navigation</h3>
        <ul className="ml-4">
        <NavLink to="/admin/roleList" activeClassName="active" isActive={() => location.pathname === '/admin/roleList'}>
  <li className={`text-[15px] my-3 flex font-semibold rounded-sm items-end hover:text-gray-500 cursor-pointer hover:bg-gray-200 px-3 py-2 ${location.pathname === '/admin/roleList' ? 'bg-gray-200 text-black' : ''}`}>
    {location.pathname === '/admin/roleList' ? (
      <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" className="mr-2" viewBox="0 0 48 48">
        <path fill="currentColor" d="M26.394 5.855a3.78 3.78 0 0 0-4.788 0L8.431 16.597A3.91 3.91 0 0 0 7 19.628v19.485C7 41.26 8.713 43 10.825 43h4.35C17.288 43 19 41.26 19 39.113V30.5a2.5 2.5 0 0 1 2.5-2.5h5a2.5 2.5 0 0 1 2.5 2.5v8.613C29 41.26 30.712 43 32.825 43h4.35C39.288 43 41 41.26 41 39.113V19.628a3.91 3.91 0 0 0-1.431-3.031z"/>
      </svg>
    ) : (
      <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" className="mr-2" viewBox="0 0 24 24">
        <path fill="none" stroke="currentColor" d="M12.391 4.262a1 1 0 0 0-1.46.035l-6.177 6.919a1 1 0 0 0-.254.666V19.5a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1V16a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v3.5a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-7.591a1 1 0 0 0-.287-.7z"/>
      </svg>
    )}
    Roles
  </li>
</NavLink>
<NavLink to="/admin/userList" activeClassName="active" isActive={() => location.pathname === '/admin/userList'}>
  <li className={`text-[15px] my-3 flex font-semibold rounded-sm items-end hover:text-gray-500 cursor-pointer hover:bg-gray-200 px-3 py-2 ${location.pathname === '/admin/userList' ? 'bg-gray-200 text-black' : ''}`}>
    {location.pathname === '/admin/userList' ? (
      <svg xmlns="http://www.w3.org/2000/svg"  width="1.5rem" height="1.5rem" className="mr-2" viewBox="0 0 16 16"><path fill="currentColor" d="M8 8a2.5 2.5 0 1 0 0-5a2.5 2.5 0 0 0 0 5m-4.844 3.763c.16-.629.44-1.21.813-1.72a2.5 2.5 0 0 0-2.725 1.377c-.136.287.102.58.418.58h1.449q.015-.116.045-.237m9.691 0q.03.12.046.237h1.446c.316 0 .554-.293.417-.579a2.5 2.5 0 0 0-2.722-1.378c.374.51.653 1.09.813 1.72M14 7.5a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0M3.5 9a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3M5 13c-.552 0-1.013-.455-.876-.99a4.002 4.002 0 0 1 7.753 0c.136.535-.324.99-.877.99z"/></svg>
    ) : (
<svg xmlns="http://www.w3.org/2000/svg"  width="1.5rem" height="1.5rem" className="mr-2"  viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M18 18.72a9.1 9.1 0 0 0 3.741-.479q.01-.12.01-.241a3 3 0 0 0-4.692-2.478m.94 3.197l.001.031q0 .337-.037.666A11.94 11.94 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6 6 0 0 1 6 18.719m12 0a5.97 5.97 0 0 0-.941-3.197m0 0A6 6 0 0 0 12 12.75a6 6 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72a9 9 0 0 0 3.74.477m.94-3.197a5.97 5.97 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0a3 3 0 0 1 6 0m6 3a2.25 2.25 0 1 1-4.5 0a2.25 2.25 0 0 1 4.5 0m-13.5 0a2.25 2.25 0 1 1-4.5 0a2.25 2.25 0 0 1 4.5 0"/></svg>
    )}
    User List
  </li>
</NavLink>
        </ul>
        </div>
        <div className='user-account flex  items-end h-full w-full'>
          <button className=' font-semibold  rounded-sm w-52 mb-4'>
            <div className='flex justify-normal items-center'>
              <div className='rounded-full h-14 w-14 mr-4'>
                <img src='https://imgs.search.brave.com/PVUfYH0LXpx98boFnkR0syDr25RdoSWaF0paHQfs2ms/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9o/YXBweS1yZWQtaGFp/cmVkLW1hbi10YWtp/bmctc2VsZmllLXBo/b3RvXzEyNjItNTEx/OC5qcGc_c2l6ZT02/MjYmZXh0PWpwZw' className='rounded-[50%] h-14 w-14'></img>
              </div>
              <div className="">
                <p className="text-sm">Yogesh @gmail.com</p>
                <p className="text-sm">Other details</p>
              </div>
            </div>
          </button>
        </div>
      </div>
      <main className="p-3 overflow-y-auto h-[100vh] flex justify-center items-center w-[85%]">
        <div className=" h-full bg-white w-full rounded-sm">
        <Outlet/>
        </div>
        </main>
    </div>
    
    </>
  )
}

export default AdminLayout