import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from 'js-cookie';
import { fetchWithAuth } from "../Auths/userAuth";
import { fetchApi } from "../Auths/apiWithoutAuth";

function EditComment() {
  const { commentId, blogId } = useParams();
  const navigate = useNavigate();
  const userId = Cookies.get('userId');
  const URL = "https://localhost:7189/";

  const [formData, setFormData] = useState({
    content: "",
  });

  useEffect(() => {
    const fetchComment = async () => {
      try {
        const response = await fetchApi('get', `comment/${commentId}`);
        const comment = response.data;
        setFormData({
          content: comment.content,
        });
      } catch (error) {
        console.error("Error fetching comment:", error.message);
      }
    };
    fetchComment();
  }, [commentId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetchWithAuth("patch", `comment/${commentId}/${userId}/${blogId}`, formData);
      if (response.status === 500) {
        const errorData = await response.json();
        toast.error(errorData.message);
      } else {
        toast.success("Comment Updated Successfully");
        navigate(`/ViewBlog/${blogId}`);
      }
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("Failed to update comment");
    }
  };

  return (
    <div className="bg-white rounded-3xl px-4 overflow-hidden h-[100dvh] mx-auto">
      <div>
        <h2 className="text-xl text-gray-600 font-semibold my-6 ml-8 mb-8 text-start">Edit Comment</h2>
        <hr className='border-black pt-10' />
        <form onSubmit={handleSubmit}>
          <div className="all space-y-8">
            <div className="relative">
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                type="text"
                className="block pl-8 pb-2 h-6rem pt-5 w-full text-sm text-gray-900 border rounded border-gray-300 appearance-none dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer"
                placeholder="Enter your comment here"
              ></textarea>
              <label htmlFor="content" className="absolute bg-transparent text-sm duration-300 transform -translate-y-4 scale-75 top-2 origin-[0] bg-white px-6 mx-2 peer-focus:px-2 peer-focus:text-orange-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4">Content</label>
            </div>
          </div>
          <div className="grid place-items-end">
            <button
              type="submit"
              className="bg-orange-600 text-white rounded-md py-2 w-24 px-4 hover:bg-orange-800 mt-4 mb-6"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditComment;
