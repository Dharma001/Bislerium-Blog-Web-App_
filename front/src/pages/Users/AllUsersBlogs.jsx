import React, { useState, useEffect } from "react";
import { fetchWithAuth } from "../../Auths/userAuth";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function AllUsersBlogs() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const userId = Cookies.get("userId");
  const URL = "https://localhost:7189/";

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await fetchWithAuth("get", `Profile/blog/${userId}`);
        setPosts(response.data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchBlogData();
  }, [userId]);

  return (
    <>
      <div className="flex flex-col">
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <div key={index} className="w-full flex justify-between">
              <div className="">
                <p>{post.userFirstName}</p>
                <p>{post.userLastName}</p>
                <h2 className="text-2xl tracking-wider mt-2 mb-1">{post.title}</h2>
                <p className="text-gray-500 text-md tracking-wide">{post.content}</p>
                <p className="text-gray-500 w-full font-medium">
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div>
              <img
              src={`${URL}${post.image}`}
              alt="Blog Image"
              title={post.title}
              className="h-[82px] w-[82px] rounded-lg"
            />
              </div>
            </div>
          ))
        ) : (
          <p>No blog posts available.</p>
        )}
      </div>
    </>
  );
}

export default AllUsersBlogs;
