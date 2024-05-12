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
    <div className=" bg-white rounded-3xl px-4 overflow-hidden h-fit mx-auto ">
      <div className=" ">
        <div className='relative'>
          <h2 className="text-xl text-gray-600 font-semibold my-6 ml-8 mb-8 text-start">Edit Blog</h2>
          <div className="absolute top-0   z-10 pointer-events-none text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="1.7rem" height="1.7rem" viewBox="0 0 24 24">
              <g fill="none" stroke="currentColor" strokeLinecap="round">
                <path d="M19.727 20.447c-.455-1.276-1.46-2.403-2.857-3.207C15.473 16.436 13.761 16 12 16c-1.761 0-3.473.436-4.87 1.24c-1.397.804-2.402 1.931-2.857 3.207" />
                <circle cx="12" cy="8" r="4" />
              </g>
            </svg>
          </div>
        </div>

        <hr className='border-black pt-10' />

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
                className="block pl-8 pb-2.5 pt-3 w-full text-sm text-gray-900 border  rounded border-1 border-gray-300 appearance-none  dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer"
                placeholder=""
              />
              <label htmlFor="email" className="absolute bg-transparent text-sm  duration-300 transform -translate-y-4 scale-75 top-2  origin-[0] bg-white px-6 mx-2 peer-focus:px-2 peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4">Blog Title</label>
              <div className="absolute top-2 left-2 z-10 pointer-events-none text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="30px" viewBox="0 0 32 32"><path fill="currentColor" d="M4 24h10v2H4zm0-6h10v2H4zm22-4H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h20a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2M6 6v6h20V6zm20 22h-6a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2m-6-8v6h6v-6z"/></svg>
              </div>
            </div>
            <div className="relative">
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                type="text"
                className="block pl-8 pb-2 h-28 pt-5 w-full text-sm text-gray-900 border rounded border-gray-300 appearance-none dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer"
                placeholder=""
              ></textarea>
              <div className="absolute  top-5 left-2 z-10 pointer-events-none text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="30px" viewBox="0 0 24 24"><path fill="currentColor" d="m18 20.289l-.708-.714l2.075-2.075H12.5v-1h6.867l-2.075-2.08l.708-.708L21.288 17zM20 10h-1V5h-3v2.23H8V5H5v14h5.5v1H4V4h6.252q.14-.586.623-.985q.483-.4 1.125-.4q.654 0 1.134.4q.48.398.62.985H20zm-7.997-4.77q.345 0 .575-.232q.23-.233.23-.578t-.233-.575t-.578-.23t-.575.234t-.23.578t.234.574t.577.23" /></svg>
              </div>
              <label htmlFor="email" className="absolute bg-transparent text-sm  duration-300 transform -translate-y-4 scale-75 top-2  origin-[0] bg-white px-6 mx-2 peer-focus:px-2 peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4">Content</label>
            </div>
          </div>

          <div className='relative mt-4 space-y-2'>
            <label htmlFor="imageFile">
              Image:
            </label>
            {formData.imageFile && (
              <img
                src={`${URL}${formData.imageFile}`}
                alt="Blog Image"
                className="h-[160px] w-[200px] rounded-lg"
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
