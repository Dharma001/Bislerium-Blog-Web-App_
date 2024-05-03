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
                <label>
                    Current Password:
                    <input
                        type="password"
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    New Password:
                    <input
                        type="password"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        required
                    />
                </label>
                <button type="submit">Change Password</button>
            </form>
        </div>
    );
}

export default ChangePassword;
