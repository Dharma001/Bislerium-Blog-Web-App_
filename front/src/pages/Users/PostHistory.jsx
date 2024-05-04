import { fetchApi } from "../../Auths/apiWithoutAuth";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function PostHistory() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const userId = Cookies.get("userId");
  const apiUrl = "https://localhost:7189/";

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
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Post History</h1>
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white shadow-md rounded-lg p-4"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">{post.blogTitle}</h2>
                <p className="text-gray-500">
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </div>
              <p className="text-gray-700 mb-4">{post.blogContent}</p>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <img
                    src={`${apiUrl}${post.image}`}
                    alt="Blog Image"
                    title={post.blogTitle}
                    className="w-32 h-32 rounded-full mr-4"
                  />
                  <div>
                    <p className="text-gray-700 font-bold">
                      {post.userFirstName} {post.userLastName}
                    </p>
                    <p className="text-gray-500">Owner</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No blog posts available.</p>
      )}
    </div>
  );
}

export default PostHistory;