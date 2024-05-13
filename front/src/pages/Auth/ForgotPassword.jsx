import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("https://localhost:7189/api/PasswordReset/forgot-password", { email });
            if (res.status === 200) {
                toast.success("Email Sent"); // Display a success toast
            }
        } catch (error) {
            toast.error("Failed to send email"); // Display an error toast
        }
    };

    return (
        <section className="m-4">
            <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
                <div className='flex flex-col justify-between w-full max-w-screen-md p-4'>
                    <Link to="/login" className="mb-4 text-blue-500 hover:text-blue-700">Go Back</Link>
                    <span className='text-2xl font-bold mb-4'>Forgot Password</span>
                    <h2 className='text-xl mb-4'>Enter Your Valid Email</h2>
                    <p className='mb-8'>We will send a password reset link to your email.</p>
                    <form onSubmit={handleSubmit} className='w-full'>
                        <input
                            className='w-full px-3 py-2 mb-4 border rounded-lg text-gray-700 focus:outline-none focus:border-indigo-500'
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <button className='w-full px-3 py-2 text-white bg-indigo-500 rounded-lg focus:outline-none focus:bg-indigo-600' type="submit">Reset Password</button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ForgotPassword;
