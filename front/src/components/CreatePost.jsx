import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchWithAuth } from '../Auths/userAuth';
import Cookies from 'js-cookie';

const CreatePost = () => {
    const navigate = useNavigate();
    const userId = Cookies.get('userId');
    const [formData, setFormData] = useState({
        userId: userId,
        title: "",
        content: "",
        imageFile: null,
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        if (e.target.name === "imageFile") {
            setFormData({
                ...formData,
                imageFile: e.target.files[0],
            });
        } else {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value,
            });
        }
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            for (const key in formData) {
                formDataToSend.append(key, formData[key]);
            }

            const response = await fetchWithAuth("post", "Blog", formDataToSend);
            if (response.status === 201) {
                navigate("/");
                toast.success("Blog Created successfully");
            } else {
                const errorData = await response.json();
                toast.error(errorData.message);
            }
        } catch (error) {
            console.error("Error:", error.message);
            toast.error("An error occurred while creating the blog.");
        }
    };

    return (
        <main className="mx-auto border px-4 py-6 lg:w-4/5">
            <section className="create">
                <div className="top-heading flex justify-between">

                    <h1 className="font-bold text-3xl mb-4">Create post</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="all space-y-8">
                        <div className="relative">
                            <input
                                id="title"
                                name="title"
                                type="text"
                                value={formData.title}
                                onChange={handleChange}
                                autoFocus="on"
                                className="block pl-12 pb-2.5 pt-4 w-full text-sm text-gray-900 border  rounded border-1 border-gray-300 appearance-none  dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer"
                                placeholder=""
                            />
                            <label htmlFor="email" className="absolute bg-transparent text-sm  duration-300 transform -translate-y-4 scale-75 top-2  origin-[0] bg-white px-2 mx-1 peer-focus:px-2 peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4">Title*</label>
                        </div>

                        <div className="relative">
                            <textarea
                                id="content"
                                name="content"
                                value={formData.content}
                                onChange={handleChange}
                                type="text"
                                className="block pl-12 pb-2 pt-4 w-full text-sm text-gray-900 border rounded  border-gray-300 appearance-none  dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer"
                                placeholder=""
                            ></textarea>
                            <label htmlFor="email" className="absolute bg-transparent text-sm  duration-300 transform -translate-y-4 scale-75 top-2  origin-[0] bg-white px-2 mx-1 peer-focus:px-2 peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4">Description*</label>
                        </div>
                        <div>
                            <form className="max-w-lg mx-auto">
                                
                                <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded cursor-pointer dark:text-gray-400 focus:outline-none  dark:placeholder-gray-400" type="file" />
                            </form>
                        </div>
                        <div className="grid place-content-end">
                            <button type="submit" className="bg-orange-500 text-white font-thin tracking-wider hover:bg-orange-600 px-2 py-2 w-20 rounded-lg">
                                Post
                            </button>
                        </div>
                    </div>


                </form>
            </section>
        </main>
    );
};

export default CreatePost;
