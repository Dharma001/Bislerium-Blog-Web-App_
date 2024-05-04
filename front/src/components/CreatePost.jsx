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
        <main className="mx-auto mt-7 px-4 py-6 lg:w-4/5 h-fit bg-gray-50">
            <section className="create">
                <div className="top-heading flex justify-start">
                    <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="1.7rem" viewBox="0 0 20 20"><path fill="currentColor" d="M2.854 2.146a.5.5 0 1 0-.708.708L7.543 8.25l-3.998 3.998a2.44 2.44 0 0 0-.655 1.194l-.878 3.95a.5.5 0 0 0 .597.597l3.926-.873a2.5 2.5 0 0 0 1.234-.678l3.981-3.98l5.396 5.396a.5.5 0 0 0 .708-.708zm8.189 9.604l-3.981 3.981a1.5 1.5 0 0 1-.744.409l-3.16.702l.708-3.183c.059-.267.193-.511.387-.704L8.25 8.957zm3.999-3.999l-2.585 2.585l.707.707l3.963-3.963a2.975 2.975 0 0 0-4.207-4.207L8.957 6.836l.707.707L12.25 4.96zm-1.415-4.17a1.975 1.975 0 0 1 2.793 2.792l-.671.671l-2.793-2.792z" /></svg>
                    <h1 className="font-bold text-xl mb-4 ml-1">Create post</h1>
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
                                className="block pl-4 pb-2.5 pt-4 w-full text-sm text-gray-900 border  rounded border-1 border-gray-300 appearance-none  dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer"
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
                                className="block pl-4 pb-2 h-6rem pt-4 w-full text-sm text-gray-900 border rounded border-gray-300 appearance-none dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer"
                                placeholder=""
                            ></textarea>

                            <label htmlFor="email" className="absolute bg-transparent text-sm  duration-300 transform -translate-y-4 scale-75 top-2  origin-[0] bg-white px-2 mx-1 peer-focus:px-2 peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4">Description*</label>
                        </div>
                        <div>
                            <div className="flex items-center justify-center w-full">
                                <label htmlFor="imageFile" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800  hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 ">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                        </svg>
                                        <p className="mb-2 text-sm text-gray-500 darsk:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 3MB)</p>
                                    </div>
                                    <input
                                        type="file"
                                        name="imageFile"
                                        onChange={handleChange} />
                                </label>
                            </div>
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
