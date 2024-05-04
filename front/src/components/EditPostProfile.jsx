import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from 'js-cookie';
import { fetchWithAuth } from "../Auths/userAuth";
import { fetchApi } from "../Auths/apiWithoutAuth";

function EditPostProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const userId = Cookies.get('userId');
  const URL = "https://localhost:7189/";

  const [formData, setFormData] = useState({
    userId: userId,
    title: "",
    content: "",
    imageFile: null,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetchApi('get', `Blog/${id}`);
        console.log("Fetch blog response:", response);
        const blog = response.data;
        setFormData({
          title: blog.title,
          content: blog.content,
          imageFile: blog.image,
        });
      } catch (error) {
        console.error("Error fetching role:", error.message);
      }
    };
    fetchBlog();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`handleChange called: ${name} - ${value}`);
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log("Selected image:", file);
    setFormData(prevData => ({
      ...prevData,
      imageFile: file
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('userId', userId);
      formDataToSend.append('title', formData.title);
      formDataToSend.append('content', formData.content);
      if (formData.imageFile) {
        formDataToSend.append('imageFile', formData.imageFile);
      }

      const response = await fetchWithAuth("put", `Blog/${id}`, formDataToSend);

      if (response.status === 500) {
        const errorData = await response.json();
        toast.error(errorData.message);
      } else {
        toast.success("Blog Updated Successfully");
        navigate("/history/allUserBlogs");
      }
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("Failed to update blog");
    }
  };

  return (
    <div className="container bg-white rounded-3xl px-4 overflow-hidden h-[90dvh] mx-auto ">
      <div className=" ">
        <div className='relative'>
          <h2 className="text-xl text-gray-600 font-semibold my-6 ml-8 mb-8 text-start">Edit Blog</h2>
          <div className="absolute top-0   z-10 pointer-events-none text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="1.7rem" height="1.7rem" viewBox="0 0 24 24">
              <g fill="none" stroke="currentColor" strokeLinecap="round">
                <path d="M19.727 20.447c-.455-1.276-1.46-2.403-2.857-3.207C15.473 16.436 13.761 16 12 16c-1.761 0-3.473.436-4.87 1.24c-1.397.804-2.402 1.931-2.857 3.207"/>
                <circle cx="12" cy="8" r="4"/>
              </g>
            </svg>
          </div>
        </div>

        <hr className='border-black'/>

        <form onSubmit={handleSubmit} >
          <div className='relative mt-6 space-y-2'>
            <label htmlFor="title">
              Blog Name:
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter blog name"
              value={formData.title}
              onChange={handleChange}
              required
              className="border  h-12 focus:ring-2 outline-none focus:ring-orange-600 rounded-md px-4 py-2 w-full pl-12"
              autoFocus={true}
            />
            <div className="absolute top-8 left-2 z-10 pointer-events-none text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="1.7rem" height="1.7rem" viewBox="0 0 24 24">
                <g fill="none" stroke="currentColor" strokeLinecap="round">
                  <path d="M19.727 20.447c-.455-1.276-1.46-2.403-2.857-3.207C15.473 16.436 13.761 16 12 16c-1.761 0-3.473.436-4.87 1.24c-1.397.804-2.402 1.931-2.857 3.207"/>
                  <circle cx="12" cy="8" r="4"/>
                </g>
              </svg>
            </div>
          </div>

          <div className='relative mt-6 space-y-2'>
            <label htmlFor="content">
              Content:
            </label>
            <textarea
              id="content"
              name="content"
              placeholder="Enter content"
              value={formData.content}
              onChange={handleChange}
              required
              className="border  focus:ring-2 outline-none focus:ring-orange-600 rounded-md px-4 py-2 w-full"
            />
          </div>

          <div className='relative mt-6 space-y-2'>
            <label htmlFor="imageFile">
              Image:
            </label>
            {formData.imageFile && (
              <img
                src={`${URL}${formData.imageFile}`}
                alt="Blog Image"
                className="h-[160px] w-[180px] rounded-lg"
              />
            )}
            <input
              type="file"
              id="imageFile"
              name="imageFile"
              accept="image/*"
              onChange={handleImageChange}
              className="border  h-12 focus:ring-2 outline-none focus:ring-orange-600 rounded-md px-4 py-2 w-full"
            />
          </div>

          <div className="grid place-items-end">
            <button
              type="submit"
              className="bg-orange-600 text-white rounded-md py-2 w-24 px-4  hover:bg-orange-800 mt-4 mb-6"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditPostProfile;
