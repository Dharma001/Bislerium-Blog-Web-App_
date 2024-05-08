import { fetchApi } from "../../Auths/apiWithoutAuth";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function PostHistory() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const userId = Cookies.get("userId");
  const apiUrl = "https://localhost:7189/";

  useEffect(() => {
    const fetchBlogData = async () => {
      setLoading(true);
      try {
        const response = await fetchApi("get", `history/${userId}`);
        setPosts(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, [userId]);

  const TableHeader = () => (
    <thead className="">
      <tr className="w-full">
        <th className="py-4 px-6 bg-gray-100 font-bold">Blog Image</th>
        <th className="py-4 px-6 bg-gray-100 font-bold">Title</th>
        <th className="py-4 px-6 bg-gray-100 font-bold">Content</th>
        <th className="py-4 px-6 bg-gray-100 font-bold">Author</th>
      </tr>
    </thead>
  );

  const TableRow = ({ post }) => (
    <tr key={post.id}>
      <td className="py-4 px-6">
        <img
          src={`${apiUrl}${post.image}`}
          alt="Blog Image"
          title={post.blogTitle}
          className="w-44 h-44 rounded-lg" 
        />
      </td>
      <td className="py-4 px-6">{post.blogTitle}</td>
      <td className="py-4 px-6">{post.blogContent}</td>
      <td className="py-4 px-6">
        <div className="flex items-center">
          <div>
            <p className="text-gray-700 font-bold">
              {post.userFirstName} {post.userLastName}
            </p>
            <p className="text-gray-500">Owner</p>
          </div>
        </div>
      </td>
    </tr>
  );

  return (
    <div className="container w-fit ml-[22%] px-4 ">
      <h1 className="text-2xl font-bold  my-6">Post History</h1>
      {loading? (
        <p>Loading...</p>
      ) : error? (
        <p>Error: {error}</p>
      ) : posts.length > 0? (
        <table className="w-full text-left">
          <TableHeader />
          <tbody>
            {posts.map((post) => (
              <TableRow key={post.id} post={post} />
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