import { fetchApi } from "../../Auths/apiWithoutAuth";
import React, { useState, useEffect } from "react";
import { useNavigate,Link } from "react-router-dom";
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
      <td className="py-4 px-6">{post.blogContent.length >40 ? post.blogContent.slice(0, 40) + "...":post.blogContent}</td>
   
      <td className="py-4 px-6">
        <div className="flex items-center">
          <div>
            <p className="text-gray-700 font-bold">
              {post.userFirstName} {post.userLastName}
            </p>
            <p className="text-gray-500">Owner</p>
          </div>
          <Link to={`/history/CommentHistory/${post.id}`}>
                      <button className="bg-blue-500 hover:bg-blue-700 rounded-full justify-center text-white px-3 py-2 transition duration-300 ease-in-out flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 56 56"><path fill="currentColor" d="M28.01 46.456c16.556 0 27.99-13.38 27.99-17.56c0-4.201-11.454-17.56-27.99-17.56C11.68 11.335 0 24.694 0 28.895c0 4.18 11.659 17.56 28.01 17.56m0-3.238c-13.482 0-24.424-11.434-24.424-14.323c0-2.438 10.942-14.322 24.424-14.322c13.442 0 24.404 11.884 24.404 14.322c0 2.89-10.962 14.323-24.404 14.323m0-2.848c6.373 0 11.495-5.225 11.495-11.475c0-6.413-5.122-11.474-11.495-11.474c-6.413 0-11.556 5.06-11.515 11.474c.02 6.25 5.102 11.475 11.515 11.475m0-7.663c-2.13 0-3.852-1.722-3.852-3.812c0-2.11 1.721-3.81 3.852-3.81c2.11 0 3.832 1.7 3.832 3.81c0 2.09-1.721 3.812-3.832 3.812"/></svg>
                      </button>
            </Link>
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