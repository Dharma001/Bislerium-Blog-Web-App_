
// import React, { useState, useEffect } from "react";
// import { useParams, Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { fetchWithAuth } from "../../../auth/api";

// function Edit() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//   });

//   useEffect(() => {
//     const fetchRole = async () => {
//       try {
//         const response = await fetchWithAuth("get", `roles/${id}`);
//         const role = response.data.role;
//         setFormData({
//           name: role.name,
//           description: role.description,
//         });
//       } catch (error) {
//         console.error("Error fetching role:", error.message);
//       }
//     };
//     fetchRole();
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetchWithAuth("put", `editRole/${id}`, formData);

//       if (response.status === 200) {
//         navigate("/admin/roles");
//         toast.success("Role Updated Successfully");
//       } else {
//         const errorData = await response.json();
//         toast.error(errorData.message);
//       }
//     } catch (error) {
//       console.error("Error:", error.message);
//     }
//   };

//   return (
//     <div className="container   mx-auto px-4 my-6">
//       <div className="bg-white rounded-lg p-6 shadow-lg">
//         <h2 className="text-3xl py-6 text-gray-700   text-center font-semibold ">
//           Edit Role
//         </h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label htmlFor="roleName" className="block mb-1">
//               Role Name
//             </label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               autoFocus="on"
//               value={formData.name || ""}
//               onChange={handleChange}
//               className="w-full border focus:ring-2 focus:ring-blue-500 border-gray-300 rounded-md  outline-none p-2"
//             />
//           </div>
//           <div>
//             <label htmlFor="description" className="block mb-1">
//               Description
//             </label>
//             <textarea
//               id="description"
//               name="description"
//               value={formData.description || ""}
//               onChange={handleChange}
//               className="w-full border focus:ring-2 outline-none focus:ring-blue-500 border-gray-300 rounded-md   p-2"
//             />
//           </div>
//           <div className="pt-2 pb-6 mx-4 grid place-items-center">
//             <button
//               type="submit"
//               className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
//             >
//               Update
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Edit;





















import React from 'react'

function Edit() {
  return (
    <div className="container bg-white rounded-3xl  mx-auto px-4 py-6">
      <div className=" p-6">
      <div className='relative'>
      <h2 className="text-xl text-gray-700 font-semibold my-6 ml-8 mb-8 text-start">Edit Role</h2>
      <div className="absolute top-0   z-10 pointer-events-none text-gray-700">
    <svg xmlns="http://www.w3.org/2000/svg" width="1.7rem" height="1.7rem" viewBox="0 0 24 24">
      <g fill="none" stroke="currentColor" stroke-linecap="round">
        <path d="M19.727 20.447c-.455-1.276-1.46-2.403-2.857-3.207C15.473 16.436 13.761 16 12 16c-1.761 0-3.473.436-4.87 1.24c-1.397.804-2.402 1.931-2.857 3.207"/>
        <circle cx="12" cy="8" r="4"/>
      </g>
    </svg>
  </div>
  </div>

  <hr className='border-black'/>

        <form  className="space-y-4 mt-8 ">
        <div className='relative space-y-2'>
      <label>
              Full Name:
            </label>
  <input
    type="text"
    id="name"
    name="name"
    placeholder="Enter user name"
    // value={formData.name}
    // onChange={handleChange}
    required
    className="border  h-12 focus:ring-2 outline-none focus:ring-green-700 rounded-md px-4 py-2 w-full pl-12"
    autoFocus="on"
  />
  <div className="absolute top-8 left-2 z-10 pointer-events-none text-gray-700">
    <svg xmlns="http://www.w3.org/2000/svg" width="1.7rem" height="1.7rem" viewBox="0 0 24 24">
      <g fill="none" stroke="currentColor" stroke-linecap="round">
        <path d="M19.727 20.447c-.455-1.276-1.46-2.403-2.857-3.207C15.473 16.436 13.761 16 12 16c-1.761 0-3.473.436-4.87 1.24c-1.397.804-2.402 1.931-2.857 3.207"/>
        <circle cx="12" cy="8" r="4"/>
      </g>
    </svg>
  </div>
</div>
          <div>
            <label htmlFor="description" className="block mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              // value={formData.description}
              required
              // onChange={handleChange}
              className="w-full border outline-none h-64 focus:ring-2 focus:ring-green-700 border-gray-300 rounded-md  p-2"
            />
          </div>
          <div className="grid place-items-end">
            <button
              type="submit"
              className="bg-green-700 text-white rounded-md py-2 w-24 px-4  hover:bg-green-800 mt-4 mb-6"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>

   
  );
}

export default Edit