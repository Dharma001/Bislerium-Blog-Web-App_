import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { fetchWithAuth } from "../../../Auths/userAuth";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function UserProfile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const userId = Cookies.get("userId");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await fetchWithAuth("get", `Profile/${userId}`);
        setUserData(userResponse.data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: ""
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetchWithAuth("get", `Profile/${userId}`);
        const userData = response.data;
        setFormData({
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          phone: userData.phone,
          address: userData.address
        });
      } catch (error) {
        console.error("Error fetching user:", error.message);
      }
    };
    fetchUser();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetchWithAuth(
        "put",
        `Profile/${userId}`,
        formData
      );
      if (response.status === 500) {
        const errorData = await response.json();
        toast.error(errorData.message);
      } else {
        navigate("/profile/userProfile");
        toast.success("User Updated Successfully");
      }
    } catch (error) {
      console.error("Error updating user:", error.message);
    }
  };

  return (
    <div className="flex justify-start">
      <div className="bg-opacity-10 rounded-xl flex flex-col justify-start w-full bg-slate-0">
        <p className="mt-2 text-pretty font-semibold tracking-wider text-start text-gray-700">
          Customize profile
        </p>
        <p className="capitalize text-sm mt-6 text-gray-500 font-black">
          Profile information
        </p>
        <hr className="border-black" />
        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-2">
            <div className="flex flex-col w-full">
              <label className="text-black p-1">First Name</label>
              <div className="relative bg-white rounded-md outline-none ">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-9 py-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-transparent"
                  autoComplete="on"
                  autoFocus="on"
                />
              </div>
            </div>
            <div className="flex flex-col w-full">
              <label className="text-black p-1">Last Name</label>
              <div className="relative bg-white rounded-md outline-none  ">
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-9 py-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-transparent"
                  autoComplete="off"
                />
              </div>
            </div>
          </div>
          <hr className="mt-6 border-black" />
          <div className="grid grid-cols-1 gap-2">
            <div className="flex flex-col w-full">
              <p className="text-red-500 text-sm font-light mt-6">
                Note: You cannot change the email
              </p>
              <label className="text-black p-1">Email</label>
              <div className="relative bg-white rounded-md outline-none  ">
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-9 mb-6 py-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-transparent"
                  autoComplete="off"
                />
              </div>
            </div>
            <hr className="mb-6 border-black" />
            <div className="flex flex-col w-full">
              <label className="text-black p-1">Phone</label>
              <div className="relative bg-white rounded-md outline-none  ">
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-9 py-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-transparent"
                  autoComplete="off"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full">
            <label className="text-black p-1">Address</label>
            <div className="relative bg-white rounded-md outline-none  ">
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-9 py-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-transparent"
                autoComplete="off"
              />
            </div>
          </div>
          <div className="text-end">
            <button className="mt-4 w-24 px-5 py-3 text-white bg-orange-400 rounded hover:bg-orange-600">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserProfile;
