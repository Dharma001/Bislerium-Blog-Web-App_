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
        <main className="mx-auto shadow-lg px-4 py-6 lg:w-4/5">
            <section className="create">
                <div className="top-heading flex justify-between">
                    <h1 className="font-bold text-3xl mb-4">Create post</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="all space-y-10">
                        <input
                            id="title"
                            name="title"
                            type="text"
                            value={formData.title}
                            onChange={handleChange}
                            autoFocus="on"
                            className="border-2 py-4 px-2 outline-none focus:ring-2 focus:ring-orange-500 p-2 w-full cursor-pointer rounded w-full"
                            placeholder="Title*"
                        />
                        <textarea
                            id="content"
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            type="description"
                            className="border-2 py-4 px-2 outline-none focus:ring-2 focus:ring-orange-500 p-2 w-full cursor-pointer rounded w-full"
                            placeholder="Description*"
                        ></textarea>
                        <div>
                            <label className="font-semibold">Add your image</label>
                            <input
                                type="file"
                                name="imageFile"
                                onChange={handleChange}
                                className=" mt-1 rounded-md outline-none focus:ring-2 focus:ring-orange-500 p-2 w-full cursor-pointer"
                            />
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
