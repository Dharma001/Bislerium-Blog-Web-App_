import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSpring, animated } from 'react-spring';
import bkgrnd from "../images/bkground.gif";
import { toast } from 'react-toastify'; // Import toast

const ForgetPassword = () => {
    const [email, setEmail] = useState("");
    const fadeIn = useSpring({
        opacity: 1,
        transform: 'translate3d(0,0,0)',
        from: { opacity: 0, transform: 'translate3d(0,-40px,0)' },
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:8088/api/users/forgot-password", { email });
            if (res.status === 200) {
                toast.success("Email Sent"); // Display a success toast
            }
        } catch (error) {
            toast.error("Failed to send email"); // Display an error toast
        }
    };

    return (
        <section className=" border-zinc-400 m-4 ">
            <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
                <div className='flex flex-col md:flex-row justify-between w-full max-w-screen-md p-4'>
                    <animated.div style={fadeIn} className='flex flex-col items-center md:items-start'>
                        <Link to="/login" className="mb-4 text-blue-500 hover:text-blue-700">Go Back</Link>
                        <span className='text-2xl font-bold mb-4'>Forgot Password</span>
                        <h2 className='text-xl mb-4'>Enter Your Valid Email</h2>
                        <p className='mb-8'>We will send a password reset link to your email.</p>
                        <form onSubmit={handleSubmit} className='w-full md:w-auto'>
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
                    </animated.div>
                    <div className='hidden md:block'>
                        <img src={bkgrnd} alt="fp" className='m-4 responsive-gif w-full h-auto border round' />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ForgetPassword;
