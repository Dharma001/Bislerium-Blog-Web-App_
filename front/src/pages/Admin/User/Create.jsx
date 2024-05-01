// import React from 'react'
// import { useState } from 'react';

// function Create() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfPassword, setShowConfPassword] = useState(false);
//   return (
//     <>
//     <div className="px-4">
//     <div className="container  px-5 mx-auto overflow-hidden h-[90dvh] my-6">
//       <div className='relative'>
//       <h2 className="text-xl text-gray-700 font-semibold my-6 ml-8 mb-8 text-start">Create User</h2>
//       <div className="absolute top-0   z-10 pointer-events-none text-gray-700">
//     <svg xmlns="http://www.w3.org/2000/svg" width="1.7rem" height="1.7rem" viewBox="0 0 24 24">
//       <g fill="none" stroke="currentColor" stroke-linecap="round">
//         <path d="M19.727 20.447c-.455-1.276-1.46-2.403-2.857-3.207C15.473 16.436 13.761 16 12 16c-1.761 0-3.473.436-4.87 1.24c-1.397.804-2.402 1.931-2.857 3.207"/>
//         <circle cx="12" cy="8" r="4"/>
//       </g>
//     </svg>
//   </div>
//   </div>
//   <hr className='border-black'/>
//       <form  className="space-y-4 mt-8 h-[80dvh]">
        
//       <div className='relative space-y-2'>
//       <label>
//               Full Name:
//             </label>
//   <input
//     type="text"
//     id="name"
//     name="name"
//     placeholder="Enter user name"
//     // value={formData.name}
//     // onChange={handleChange}
//     required
//     className="border  h-12 focus:ring-2 outline-none focus:ring-slate-700 rounded-md px-4 py-2 w-full pl-12"
//     autoFocus="on"
//   />
//   <div className="absolute top-8 left-2 z-10 pointer-events-none text-gray-700">
//     <svg xmlns="http://www.w3.org/2000/svg" width="1.7rem" height="1.7rem" viewBox="0 0 24 24">
//       <g fill="none" stroke="currentColor" stroke-linecap="round">
//         <path d="M19.727 20.447c-.455-1.276-1.46-2.403-2.857-3.207C15.473 16.436 13.761 16 12 16c-1.761 0-3.473.436-4.87 1.24c-1.397.804-2.402 1.931-2.857 3.207"/>
//         <circle cx="12" cy="8" r="4"/>
//       </g>
//     </svg>
//   </div>
// </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <div className='relative space-y-2'>
//             <label htmlFor="email" className="block">
//               Email:
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               placeholder="Enter user email"
//               // value={formData.email}
//               // onChange={handleChange}
//               required
//               className="border pl-12 h-12 focus:ring-2 outline-none focus:ring-slate-700 rounded-md px-4 py-2 w-full"
//             />
//                <div className="absolute top-8 text-[1rem] left-2 z-10 pointer-events-none text-gray-700">
//                 <svg xmlns="http://www.w3.org/2000/svg" width="1.7rem" height="1.7rem" viewBox="0 0 24 24">
//                 <path fill="currentColor" d="m15.489 21.27l-3.558-3.558l.708-.708l2.85 2.85l5.688-5.688l.708.707zM12 11l7.692-5H4.308zm0 1.116L4 6.885v10.5q0 .269.173.442t.443.173H9.4l1 1H3V5h18v6.542l-1 1V6.885zm0 0"/></svg>                </div>
//           </div>
//           <div className="flex flex-col relative space-y-2 ">
//                 <label className="text-black">Phone:</label>
//                 <input
//                   type="phone"
//                   name="phone"
//                   // value={formData.phone}
//                   // onChange={handleChange}
//                   className="border pl-12  h-12 focus:ring-2 rounded-md outline-none focus:ring-slate-700 px-4 py-2 "
//                   autoComplete="off"
//                   placeholder="Enter phone number"
//                   required
                  
//                 />
//                  <div className="absolute top-8 text-[1rem] left-2 z-10 pointer-events-none text-gray-700">
//                 <svg xmlns="http://www.w3.org/2000/svg" width="1.7rem" height="1.7rem" viewBox="0 0 256 256"><path fill="currentColor" d="M154.7 142.75a36 36 0 1 0-37.4 0a63.61 63.61 0 0 0-32.5 22.85a4 4 0 0 0 6.4 4.8a56 56 0 0 1 89.6 0a4 4 0 0 0 6.4-4.8a63.65 63.65 0 0 0-32.5-22.85M108 112a28 28 0 1 1 28 28a28 28 0 0 1-28-28m100-84H64a12 12 0 0 0-12 12v28H32a4 4 0 0 0 0 8h20v48H32a4 4 0 0 0 0 8h20v48H32a4 4 0 0 0 0 8h20v28a12 12 0 0 0 12 12h144a12 12 0 0 0 12-12V40a12 12 0 0 0-12-12m4 188a4 4 0 0 1-4 4H64a4 4 0 0 1-4-4V40a4 4 0 0 1 4-4h144a4 4 0 0 1 4 4Z"/></svg>
//                  </div>
//                 {/* {errors.email && (
//                   <p className="text-red-700 text-sm">{errors.email}</p>
//                 )} */}
//               </div>
//         </div>
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <div className="relative space-y-2">
//             <label htmlFor="password" className="block">
//               Password:
//             </label>
//             <input
//               type={showPassword ? "text" : "password"}
//               id="password"
//               name="password"
//               placeholder="Enter password"
//               // value={formData.password}
//               // onChange={handleChange}
//               required
//               className="border pl-12 h-12 focus:ring-2 outline-none focus:ring-slate-700 rounded-md px-4 py-2 w-full"
//             />
//             <div className="absolute top-8 text-[1rem] left-2 z-10 pointer-events-none text-gray-700">
//                 <svg xmlns="http://www.w3.org/2000/svg" width="1.7rem" height="1.7rem" viewBox="0 0 48 48"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M24 25.28a3.26 3.26 0 0 0-1.64 6.07V36h3.32v-4.65a3.28 3.28 0 0 0 1.61-2.8v0A3.27 3.27 0 0 0 24 25.28"/><rect width="33.23" height="25.73" x="7.38" y="17.77" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" rx="4.32"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M13.35 17.77v-2.61a10.66 10.66 0 0 1 21.32 0v2.61"/></svg>
//                   </div>
//             <button
//               type="button"
//               className="absolute top-12 transform -translate-y-1/2 right-2"
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               {showPassword ? (
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="18"
//                   height="18"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     fill="black"
//                     d="M12 16q1.875 0 3.188-1.313T16.5 11.5q0-1.875-1.313-3.188T12 7q-1.875 0-3.188 1.313T7.5 11.5q0 1.875 1.313 3.188T12 16Zm0-1.8q-1.125 0-1.913-.788T9.3 11.5q0-1.125.788-1.913T12 8.8q1.125 0 1.913.788T14.7 11.5q0 1.125-.787 1.913T12 14.2Zm0 4.8q-3.65 0-6.65-2.038T1 11.5q1.35-3.425 4.35-5.463T12 4q3.65 0 6.65 2.038T23 11.5q-1.35 3.425-4.35 5.463T12 19Zm0-7.5Zm0 5.5q2.825 0 5.188-1.488T20.8 11.5q-1.25-2.525-3.613-4.013T12 6Q9.175 6 6.812 7.488T3.2 11.5q1.25 2.525 3.613 4.013T12 17Z"
//                   />
//                 </svg>
//               ) : (
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="18"
//                   height="18"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     fill="black"
//                     d="M16.1 13.3l-1.45-1.45q.225-1.175-.675-2.2t-2.325-.8L10.2 7.4q.425-.2.863-.3T12 7q1.875 0 3.188 1.313T16.5 11.5q0 .5-.1.938t-.3.862Zm3.2 3.15l-1.45-1.4q.95-.725 1.688-1.587T20.8 11.5q-1.25-2.525-3.588-4.013T12 6q-.725 0-1.425.1T9.2 6.4L7.65 4.85q1.025-.425 2.1-.638T12 4q3.575 0 6.425 1.887T22.7 10.8q.075.125.1.313t.025.387q0 .2-.037.388t-.088.312q-.575 1.275-1.437 2.35t-1.963 1.9Zm-.2 5.45l-3.5-3.45q-.875.275-1.762.413T12 19q-3.575 0-6.425-1.888T1.3 12.2q-.075-.125-.1-.312t-.025-.388q0-.2.025-.375t.1-.3Q1.825 9.7 2.55 8.75T4.15 7L2.075 4.9Q1.8 4.625 1.8 4.212t.3-.712q.275-.275.7-.275t.7.275l17 17q.275.275.288.688t-.288.712q-.275.275-.7.275t-.7-.275ZM5.55 8.4q-.725.65-1.325 1.425T3.2 11.5q1.25 2.525 3.588 4.013T12 17q.5 0 .975-.063t.975-.137l-.9-.95q-.275.075-.525.113T12 16q-1.875 0-3.188-1.312T7.5 11.5q0-.275.038-.525t.112-.525L5.55 8.4Zm7.975 2.325ZM9.75 12.6Z"
//                   />
//                 </svg>
//               )}
//             </button>
//           </div>
//           <div className="relative space-y-2">
//             <label htmlFor="confPassword" className="block">
//               Confirm Password:
//             </label>
//             <input
//               type={showConfPassword ? "text" : "password"}
//               id="confPassword"
//               name="confPassword"
//               placeholder="Confirm password"
//               // value={formData.confPassword}
//               // onChange={handleChange}
//               required
//               className="border pl-12 h-12 focus:ring-2 outline-none focus:ring-slate-700 rounded-md px-4 py-2 w-full"
//             />
//             <div className="absolute top-8 text-[1rem] left-2 z-10 pointer-events-none text-gray-700">
//                 <svg xmlns="http://www.w3.org/2000/svg" width="1.7rem" height="1.7rem" viewBox="0 0 48 48"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M24 25.28a3.26 3.26 0 0 0-1.64 6.07V36h3.32v-4.65a3.28 3.28 0 0 0 1.61-2.8v0A3.27 3.27 0 0 0 24 25.28"/><rect width="33.23" height="25.73" x="7.38" y="17.77" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" rx="4.32"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M13.35 17.77v-2.61a10.66 10.66 0 0 1 21.32 0v2.61"/></svg>
//                   </div>
//             <button
//               type="button"
//               className="absolute top-12 transform -translate-y-1/2 right-2"
//               onClick={() => setShowConfPassword(!showConfPassword)}
//             >
//               {showConfPassword ? (
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="18"
//                   height="18"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     fill="black"
//                     d="M16.1 13.3l-1.45-1.45q.225-1.175-.675-2.2t-2.325-.8L10.2 7.4q.425-.2.863-.3T12 7q1.875 0 3.188 1.313T16.5 11.5q0 .5-.1.938t-.3.862Zm3.2 3.15l-1.45-1.4q.95-.725 1.688-1.587T20.8 11.5q-1.25-2.525-3.588-4.013T12 6q-.725 0-1.425.1T9.2 6.4L7.65 4.85q1.025-.425 2.1-.638T12 4q3.575 0 6.425 1.887T22.7 10.8q.075.125.1.313t.025.387q0 .2-.037.388t-.088.312q-.575 1.275-1.437 2.35t-1.963 1.9Zm-.2 5.45l-3.5-3.45q-.875.275-1.762.413T12 19q-3.575 0-6.425-1.888T1.3 12.2q-.075-.125-.1-.312t-.025-.388q0-.2.025-.375t.1-.3Q1.825 9.7 2.55 8.75T4.15 7L2.075 4.9Q1.8 4.625 1.8 4.212t.3-.712q.275-.275.7-.275t.7.275l17 17q.275.275.288.688t-.288.712q-.275.275-.7.275t-.7-.275ZM5.55 8.4q-.725.65-1.325 1.425T3.2 11.5q1.25 2.525 3.588 4.013T12 17q.5 0 .975-.063t.975-.137l-.9-.95q-.275.075-.525.113T12 16q-1.875 0-3.188-1.312T7.5 11.5q0-.275.038-.525t.112-.525L5.55 8.4Zm7.975 2.325ZM9.75 12.6Z"
//                   />
//                 </svg>
//               ) : (
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="18"
//                   height="18"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     fill="black"
//                     d="M12 16q1.875 0 3.188-1.313T16.5 11.5q0-1.875-1.313-3.188T12 7q-1.875 0-3.188 1.313T7.5 11.5q0 1.875 1.313 3.188T12 16Zm0-1.8q-1.125 0-1.913-.788T9.3 11.5q0-1.125.788-1.913T12 8.8q1.125 0 1.913.788T14.7 11.5q0 1.125-.787 1.913T12 14.2Zm0 4.8q-3.65 0-6.65-2.038T1 11.5q1.35-3.425 4.35-5.463T12 4q3.65 0 6.65 2.038T23 11.5q-1.35 3.425-4.35 5.463T12 19Zm0-7.5Zm0 5.5q2.825 0 5.188-1.488T20.8 11.5q-1.25-2.525-3.613-4.013T12 6Q9.175 6 6.812 7.488T3.2 11.5q1.25 2.525 3.613 4.013T12 17Z"
//                   />
//                 </svg>
//               )}
//             </button>
//           </div>
//         </div>
//         {/* {errors.password && (
//           <p className="text-red-700 text-sm">{errors.password}</p>
//         )} */}
//         <div className='space-y-2'>
//           <label htmlFor="role_id" className="block">
//             Role:
//           </label>
//           <select
//             id="role_id"
//             name="role_id"
//             // value={formData.role_id}
//             // onChange={handleChange}
//             required
//             className="border h-12 focus:ring-2 outline-none focus:ring-slate-700 rounded-md px-4 py-2 w-full"
//           >
//             <option value="">Select Role</option>
//             {/* {roles.map((role) => (
//               <option key={role.id} value={role.id}>
//                 {role.name}
//               </option>
//             ))} */}
//           </select>
//         </div>

//         <div className="grid place-items-end">
//         <button
//           type="submit"
//           className="bg-slate-700 w-24 focus:ring-2 outline-none focus:ring-slate-700 text-white px-4 my-6 py-2 rounded-md hover:bg-slate-800 items-center justify-center place-items-center"
//         >
//           Create
//         </button>
//         </div>
     
//       </form>
//     </div>
//     </div>
    
    
    
//     </>
//   )
// }

// export default Create

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchWithAuth } from "../../../Auths/apiAuth";

const Create = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    roleId: "",
    password: "",
  });
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetchWithAuth("get", "Roles");
        setRoles(response.data);
      } catch (error) {
        console.error("Error fetching roles:", error.message);
      }
    };
    fetchRoles();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetchWithAuth("post", "Users", formData);
      if (response.status === 201) {
        navigate("/admin/userList");
        toast.success("User Created Successfully");
      } else {
        const errorData = await response.json();
        toast.error(errorData.message);
      }
    } catch (error) {
      console.error("Error creating user:", error.message);
    }
  };  

  return (
    <>
      <div className="px-4">
        <div className="px-5">
          <div className="relative">
            <h2 className="text-xl text-gray-700 font-semibold my-6 ml-8 mb-8 text-start">
              Create User
            </h2>
            <div className="absolute top-0 z-10 pointer-events-none text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.7rem"
                height="1.7rem"
                viewBox="0 0 24 24"
              >
                <g fill="none" stroke="currentColor" stroke-linecap="round">
                  <path d="M19.727 20.447c-.455-1.276-1.46-2.403-2.857-3.207C15.473 16.436 13.761 16 12 16c-1.761 0-3.473.436-4.87 1.24c-1.397.804-2.402 1.931-2.857 3.207" />
                  <circle cx="12" cy="8" r="4" />
                </g>
              </svg>
            </div>
          </div>
          <hr className="border-black" />
          <form
            onSubmit={handleSubmit}
            className="space-y-4 mt-8 h-[80dvh]"
          >
            <div className="space-y-2">
              <label htmlFor="firstName" className="block">
                First Name:
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="border h-12 focus:ring-2 outline-none focus:ring-slate-700 rounded-md px-4 py-2 w-full"
                placeholder="Enter user first name"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="lastName" className="block">
                Last Name:
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="border h-12 focus:ring-2 outline-none focus:ring-slate-700 rounded-md px-4 py-2 w-full"
                placeholder="Enter user last name"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="block">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="border h-12 focus:ring-2 outline-none focus:ring-slate-700 rounded-md px-4 py-2 w-full"
                placeholder="Enter user email"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="phone" className="block">
                Phone:
              </label>
              <input
                type="phone"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="border h-12 focus:ring-2 outline-none focus:ring-slate-700 rounded-md px-4 py-2 w-full"
                placeholder="Enter user phone number"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="address" className="block">
                Address:
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="border h-12 focus:ring-2 outline-none focus:ring-slate-700 rounded-md px-4 py-2 w-full"
                placeholder="Enter user address"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="roleId" className="block">
                Role:
              </label>
              <select
                id="roleId"
                name="roleId"
                value={formData.roleId}
                onChange={handleChange}
                className="border h-12 focus:ring-2 outline-none focus:ring-slate-700 rounded-md px-4 py-2 w-full"
              >
                <option value="">Select Role</option>
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="block">
                Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="border h-12 focus:ring-2 outline-none focus:ring-slate-700 rounded-md px-4 py-2 w-full"
                placeholder="Enter user password"
              />
            </div>

            <div className="grid place-items-end">
              <button
                type="submit"
                className="bg-slate-700 w-24 focus:ring-2 outline-none focus:ring-slate-700 text-white px-4 my-6 py-2 rounded-md hover:bg-slate-800 items-center justify-center place-items-center"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Create;
