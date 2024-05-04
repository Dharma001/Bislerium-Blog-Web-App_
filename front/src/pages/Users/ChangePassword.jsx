import React, { useState } from "react";
import { toast } from "react-toastify";
import { fetchWithAuth } from "../../Auths/userAuth";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function ChangePassword() {
    const userId = Cookies.get("userId");
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
    });

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
            const response = await fetchWithAuth(
                "put",
                `Profile/${userId}/updatePassword`,
                formData
            );
            if (response.status === 500) {
                const errorData = await response.json();
                toast.error(errorData.message);
            } else {
                navigate("/profile/changePassword");
                toast.success("Password Updated Successfully");
            }
        } catch (error) {
            console.error("Error updating password:", error.message);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="relative">

                    <input
                        className="block pl-12 pb-2.5 pt-4 w-full h-16 text-sm text-gray-900 border  rounded border-1 border-gray-300 appearance-none  dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer"
                        type="password"
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleChange}
                        required
                        autoComplete="off"
                        autoFocus="on"
                        placeholder=""
                    />

                    <label htmlFor="password" className="absolute bg-transparent text-sm  duration-300 transform -translate-y-4 scale-75 top-2  origin-[0] bg-white px-2 mx-10 peer-focus:px-2 peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4">Current Password</label>
                    <div className="absolute pl-2 ml-2 inset-y-6 transform -translate-y-1/2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="2rem" viewBox="0 0 48 48"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M24 25.28a3.26 3.26 0 0 0-1.64 6.07V36h3.32v-4.65a3.28 3.28 0 0 0 1.61-2.8v0A3.27 3.27 0 0 0 24 25.28" /><rect width="33.23" height="25.73" x="7.38" y="17.77" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" rx="4.32" /><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M13.35 17.77v-2.61a10.66 10.66 0 0 1 21.32 0v2.61" /></svg>

                    </div>
                </div>

                <div className="relative mt-4">
                    <input
                        className="block pl-12 pb-2.5 pt-4 w-full h-16 text-sm text-gray-900 border  rounded border-1 border-gray-300 appearance-none  dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer"
                        type="password"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        required
                        autoComplete="off"
                        autoFocus="on"
                        placeholder=""
                    />
                    <label htmlFor="password" className="absolute bg-transparent text-sm  duration-300 transform -translate-y-4 scale-75 top-2  origin-[0] bg-white px-2 mx-10 peer-focus:px-2 peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4">New Password</label>
                    <div className="absolute pl-2 ml-2 inset-y-6 transform -translate-y-1/2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="2rem" viewBox="0 0 48 48"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M24 25.28a3.26 3.26 0 0 0-1.64 6.07V36h3.32v-4.65a3.28 3.28 0 0 0 1.61-2.8v0A3.27 3.27 0 0 0 24 25.28" /><rect width="33.23" height="25.73" x="7.38" y="17.77" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" rx="4.32" /><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M13.35 17.77v-2.61a10.66 10.66 0 0 1 21.32 0v2.61" /></svg>

                    </div>
                </div>
                <div className="relative mt-4">
                    <div className="absolute pl-2 inset-y-6 transform -translate-y-1/2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="26px" height="30px" viewBox="0 0 24 24"><path fill="currentColor" d="M12.63 2c5.53 0 10.01 4.5 10.01 10s-4.48 10-10.01 10c-3.51 0-6.58-1.82-8.37-4.57l1.58-1.25C7.25 18.47 9.76 20 12.64 20a8 8 0 0 0 8-8a8 8 0 0 0-8-8C8.56 4 5.2 7.06 4.71 11h2.76l-3.74 3.73L0 11h2.69c.5-5.05 4.76-9 9.94-9m2.96 8.24c.5.01.91.41.91.92v4.61c0 .5-.41.92-.92.92h-5.53c-.51 0-.92-.42-.92-.92v-4.61c0-.51.41-.91.91-.92V9.23c0-1.53 1.25-2.77 2.77-2.77c1.53 0 2.78 1.24 2.78 2.77zm-2.78-2.38c-.75 0-1.37.61-1.37 1.37v1.01h2.75V9.23c0-.76-.62-1.37-1.38-1.37" className="text-white" /></svg>
                    </div>

                    <button className="text-gray-50 text-sm border bg-orange-600 rounded-md mt-4 p-2 hover:bg-orange-500" type="submit">
                        <span className="p-4"></span>Change Password</button>
                </div>
            </form>
        </div>
    );
}

export default ChangePassword;
