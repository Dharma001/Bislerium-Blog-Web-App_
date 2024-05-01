import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    setErrors({});

    const newErrors = {};
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First Name is required";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last Name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await fetch("https://localhost:7189/Register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate("/login");
        toast.success("Register successful");
      } else {
        const errorData = await response.json();
        toast.error(errorData.message);
      }
    } catch (error) {
      console.error("Error during registration:", error.message);
      toast.error("Registration failed. Please try again.");
    }

  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-opacity-10 backdrop-blur-md rounded-xl border border-gray-200 p-6 bg-slate-0">
        <img src="./newlogo.png" className="mx-auto w-16 " alt="" />
        <p className="text-orange-400 text-center text-sm font-light">Bislerium Blog</p>
        <h2 className="font-serif text-4xl font-bold text-center text-black">
          Register
        </h2>
        <p className="mt-2 text-pretty text-center text-gray-500">Join Bislerium Blog</p>
        <form onSubmit={handleRegistration} className="mt-6">
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col w-full">
              <label className="text-black p-1">First Name</label>
              <div className="relative bg-white rounded-md outline-none ">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-9 py-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-transparent"
                  autoComplete="off"
                  autoFocus
                />
                <div className="absolute top-[.5rem] text-[1rem] left-2 z-10 pointer-events-none text-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="2rem" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round"><path d="M19.727 20.447c-.455-1.276-1.46-2.403-2.857-3.207C15.473 16.436 13.761 16 12 16c-1.761 0-3.473.436-4.87 1.24c-1.397.804-2.402 1.931-2.857 3.207" /><circle cx="12" cy="8" r="4" /></g></svg>
                </div>
              </div>
              {errors.firstName && (
                <p className="text-red-500 text-sm">{errors.firstName}</p>
              )}
            </div>
            <div className="flex flex-col w-full">
              <label className="text-black p-1">Last Name</label>
              <div className="relative bg-white rounded-md outline-none  ">
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-9 py-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-transparent"
                  autoComplete="off"
                  autoFocus
                />
                <div className="absolute top-[.5rem] text-[1rem] left-2 z-10 pointer-events-none text-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="2rem" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round"><path d="M19.727 20.447c-.455-1.276-1.46-2.403-2.857-3.207C15.473 16.436 13.761 16 12 16c-1.761 0-3.473.436-4.87 1.24c-1.397.804-2.402 1.931-2.857 3.207" /><circle cx="12" cy="8" r="4" /></g></svg>
                </div>
                {errors.lastName && (
                  <p className="text-red-500 text-sm">{errors.lastName}</p>
                )}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col w-full">
              <label className="text-black p-1">Email</label>
              <div className="relative bg-white rounded-md outline-none  ">
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-9 py-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-transparent"
                  autoComplete="off"
                  autoFocus
                />
                <div className="absolute top-[.5rem] text-[1rem] left-2 z-10 pointer-events-none text-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="2rem" viewBox="0 0 24 24">
                    <path fill="currentColor" d="m15.489 21.27l-3.558-3.558l.708-.708l2.85 2.85l5.688-5.688l.708.707zM12 11l7.692-5H4.308zm0 1.116L4 6.885v10.5q0 .269.173.442t.443.173H9.4l1 1H3V5h18v6.542l-1 1V6.885zm0 0" /></svg>                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>
            </div>
            <div className="flex flex-col w-full">
              <label className="text-black p-1">Phone</label>
              <div className="relative bg-white rounded-md outline-none  ">
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-9 py-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-transparent"
                  autoComplete="off"
                  autoFocus
                />
                <div className="absolute top-[.5rem] text-[1rem] left-2 z-10 pointer-events-none text-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="2rem" viewBox="0 0 48 48"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M19.308 12.467a24 24 0 0 1-.881-4.384C18.27 6.602 16.977 5.5 15.488 5.5H8.58c-1.777 0-3.145 1.535-2.989 3.304c1.575 17.829 15.777 32.03 33.606 33.606c1.77.156 3.304-1.207 3.304-2.984v-6.16c0-2.248-1.102-3.536-2.583-3.693a24 24 0 0 1-4.384-.88a4.9 4.9 0 0 0-4.87 1.243l-2.957 2.957a31.27 31.27 0 0 1-12.599-12.599l2.957-2.957a4.9 4.9 0 0 0 1.244-4.87m4.053 24.77l4.344-4.344m-16.943-8.255l4.344-4.344" /></svg>
                </div>
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone}</p>
                )}
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
                onChange={handleInputChange}
                className="w-full px-9 py-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-transparent"
                autoComplete="off"
                autoFocus
              />
              <div className="absolute top-[.5rem] text-[1rem] left-2 z-10 pointer-events-none text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="2rem" viewBox="0 0 256 256"><path fill="currentColor" d="M154.7 142.75a36 36 0 1 0-37.4 0a63.61 63.61 0 0 0-32.5 22.85a4 4 0 0 0 6.4 4.8a56 56 0 0 1 89.6 0a4 4 0 0 0 6.4-4.8a63.65 63.65 0 0 0-32.5-22.85M108 112a28 28 0 1 1 28 28a28 28 0 0 1-28-28m100-84H64a12 12 0 0 0-12 12v28H32a4 4 0 0 0 0 8h20v48H32a4 4 0 0 0 0 8h20v48H32a4 4 0 0 0 0 8h20v28a12 12 0 0 0 12 12h144a12 12 0 0 0 12-12V40a12 12 0 0 0-12-12m4 188a4 4 0 0 1-4 4H64a4 4 0 0 1-4-4V40a4 4 0 0 1 4-4h144a4 4 0 0 1 4 4Z" /></svg>
              </div>
              {errors.address && (
                <p className="text-red-500 text-sm">{errors.address}</p>
              )}
            </div>
          </div>
          <div className="flex flex-col w-full">
            <label className="text-black p-1">Password</label>
            <div className="relative bg-white rounded-md outline-none  ">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-9 py-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-transparent"
                autoComplete="off"
                autoFocus
              />
              <div className="absolute top-[.5rem] text-[1rem] left-2 z-10 pointer-events-none text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="2rem" viewBox="0 0 48 48"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M24 25.28a3.26 3.26 0 0 0-1.64 6.07V36h3.32v-4.65a3.28 3.28 0 0 0 1.61-2.8v0A3.27 3.27 0 0 0 24 25.28" /><rect width="33.23" height="25.73" x="7.38" y="17.77" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" rx="4.32" /><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M13.35 17.77v-2.61a10.66 10.66 0 0 1 21.32 0v2.61" /></svg>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>
          </div>
          <button className="mt-4 w-full px-5 py-3 text-white bg-orange-400 rounded hover:bg-orange-600 ">Register</button>
        </form>
        <hr></hr>
        <div className="flex justify-center items-center">
          <p className="text-sm text-gray-500">Already have an account? </p>
          <Link className="p-2 text-sm font-bold hover:text-blue-500" to="/login">
            Click here to login
          </Link>
        </div>
      </div>
    </div>


  );
}

export default Register;
