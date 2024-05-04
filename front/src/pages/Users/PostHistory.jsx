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
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="py-4 px-6 bg-gray-100 font-bold">Title</th>
              <th className="py-4 px-6 bg-gray-100 font-bold">Content</th>
              <th className="py-4 px-6 bg-gray-100 font-bold">Author</th>
              <th className="py-4 px-6 bg-gray-100 font-bold">Date</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <td className="py-4 px-6">{post.blogTitle}</td>
                <td className="py-4 px-6">{post.blogContent}</td>
                <td className="py-4 px-6">
                  <div className="flex items-center">
                    <img
                      src={`${apiUrl}${post.image}`}
                      alt="Blog Image"
                      title={post.blogTitle}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <p className="text-gray-700 font-bold">
                        {post.userFirstName} {post.userLastName}
                      </p>
                      <p className="text-gray-500">Owner</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  {new Date(post.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No blog posts available.</p>
      )}
    </div>
  );
}

export default PostHistory;