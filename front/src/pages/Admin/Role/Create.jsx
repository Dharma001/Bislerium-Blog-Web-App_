import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchWithAuth } from "../../../Auths/apiAuth";

function Create() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetchWithAuth("POST", "Roles", formData);

      if (response.status === 201) {
        navigate("/admin/roleList");
        toast.success("Role Created Successfully");
      } else {
        const errorData = await response.json();
        toast.error(errorData.message);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="container bg-white rounded-3xl h-[90dvh] overflow-hidden mx-auto px-4 ">
      <div className="">
        <div className="relative">
          <h2 className="text-xl text-gray-600 font-semibold my-6 ml-8 mb-8 text-start">
            Create Role
          </h2>
          <div className="absolute top-0   z-10 pointer-events-none text-gray-600">
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

        <form onSubmit={handleSubmit}>
          <div className="relative space-y-2 mt-6">
            <label>Role Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter user name"
              value={formData.name}
              onChange={handleChange}
              required
              className="border  h-12 focus:ring-2 outline-none focus:ring-orange-600 rounded-md px-4 py-2 w-full pl-12"
              autoFocus="on"
            />
            <div className="absolute top-8 left-2 z-10 pointer-events-none text-gray-600">
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
          <div className="space-y-2">
            <label htmlFor="description" className="block mt-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              required
              onChange={handleChange}
              className="w-full border outline-none h-64 focus:ring-2 focus:ring-orange-600 border-gray-300 rounded-md  p-2"
            />
          </div>
          <div className="grid place-items-end">
            <button
              type="submit"
              className="bg-orange-600 text-white rounded-md py-2 w-24 px-4  hover:bg-orange-800 mt-4 mb-6"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Create;
