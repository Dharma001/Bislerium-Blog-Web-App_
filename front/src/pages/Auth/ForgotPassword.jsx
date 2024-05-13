import React, { useState } from "react";
import { fetchApi } from "../../Auths/apiWithoutAuth";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const [formData, setFormData] = useState({
        email: "",
        newPassword: ""
    });
    const navigate = useNavigate();

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
            const response = await fetchApi("post", "Home/ChangeUserPassword", formData);
            if (response.status === 500) {
                console.error("Error updating password:", error.message);
                toast.error("An error occurred. Please try again.");
            } else {
                const errorData = await response.json();
                toast.error(errorData.message || "An error occurred. Please try again.");
            }
        } catch (error) {
            toast.success("Password Updated Successfully");
            navigate("/login");
        }
    };

    return (
        <section className="m-4">
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <div className="flex flex-col justify-between w-full max-w-screen-md p-4">
                    <Link to="/login" className="mb-4 text-blue-500 hover:text-blue-700">Go Back</Link>
                    <span className="text-2xl font-bold mb-4">Forgot Password</span>
                    <h2 className="text-xl mb-4">Enter Your Valid Email and New Password</h2>
                    <form onSubmit={handleSubmit} className="w-full">
                        <input
                            className="w-full px-3 py-2 mb-4 border rounded-lg text-gray-700 focus:outline-none focus:border-indigo-500"
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <input
                            className="w-full px-3 py-2 mb-4 border rounded-lg text-gray-700 focus:outline-none focus:border-indigo-500"
                            type="password"
                            name="newPassword"
                            placeholder="Enter your new password"
                            value={formData.newPassword}
                            onChange={handleChange}
                            required
                        />
                        <button
                            className="w-full px-3 py-2 text-white bg-indigo-500 rounded-lg focus:outline-none focus:bg-indigo-600"
                            type="submit"
                        >
                            Reset Password
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ForgotPassword;
