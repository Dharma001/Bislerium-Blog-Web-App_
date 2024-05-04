import { fetchApi } from "../../Auths/apiWithoutAuth";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function PostHistory() {
  
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const userId = Cookies.get("userId");
    const URL = "https://localhost:7189/";
  
    useEffect(() => {
      const fetchBlogData = async () => {
        try {
          const response = await fetchApi("get", `history/${userId}`);
          setPosts(response.data);
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        }
      };
  
      fetchBlogData();
    }, [userId]);
  
    return (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.length > 0 ? (
            posts.map((post, index) => (
              <div key={index} className="bg-slate-50 p-3 rounded">
                <p>{post.userFirstName} {post.userLastName}</p>
                <h2 className="text-2xl tracking-wider mt-2 mb-1">{post.blogTitle}</h2>
                <p className="text-gray-500 text-md tracking-wide">{post.blogContent}</p>
                <p className="text-gray-500 w-full font-medium">
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
                <img
                  src={`${URL}${post.image}`}
                  alt="Blog Image"
                  title={post.blogTitle}
                  className="h-[160px] w-[180px] rounded-lg"
                />
              </div>
            ))
          ) : (
            <p>No blog posts available.</p>
          )}
        </div>
      </>
    );
  }
  
export default PostHistory