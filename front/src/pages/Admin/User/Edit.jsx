import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchWithAuth } from "../../../Auths/apiAuth";

const Edit = () => {
  const { id } = useParams();
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
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetchWithAuth("get", `Users/${id}`);
        const userData = response.data; 
        setFormData({
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          phone: userData.phone,
          address: userData.address,
          roleId: userData.roleId
        });
      } catch (error) {
        console.error("Error fetching user:", error.message);
      }
    };
    fetchUser();
  }, [id]);

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
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetchWithAuth("put", `Users/${id}`, formData);
      if (response.status === 500) {
        const errorData = await response.json();
        toast.error(errorData.message);
      } else {
        navigate("/admin/userList");
        toast.success("User Updated Successfully");
      }
    } catch (error) {
      console.error("Error updating user:", error.message);
    }
  };  

  return (
    <>
      <div className="px-4">
        <div className="px-5 ">
          <div className="relative">
            <h2 className="text-xl text-gray-700 font-semibold my-6 ml-8 mb-8 text-start">
              Edit User
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
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Edit;
