import { fetchApi } from "../../Auths/apiWithoutAuth";
import React, { useState, useEffect } from "react";
import { useNavigate,Link, useParams } from "react-router-dom";
import { useNavigate,Link } from "react-router-dom";
import Cookies from "js-cookie";

function PostIdHistory() {
  const navigate = useNavigate();
  const { id: blogId } = useParams();
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
          <Link to={`/history/CommentHistory/${post.id}`}>
                      <button className="bg-green-500 hover:bg-green-700 justify-center text-white px-3 py-2 rounded-sm transition duration-300 ease-in-out flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1em"
                            height="1em"
                            viewBox="0 0 1792 1408"
                          >
                            <path
                              fill="currentColor"
                              d="m888 1056l116-116l-152-152l-116 116v56h96v96zm440-720q-16-16-33 1L945 687q-17 17-1 33t33-1l350-350q17-17 1-33m80 594v190q0 119-84.5 203.5T1120 1408H288q-119 0-203.5-84.5T0 1120V288Q0 169 84.5 84.5T288 0h832q63 0 117 25q15 7 18 23q3 17-9 29l-49 49q-14 14-32 8q-23-6-45-6H288q-66 0-113 47t-47 113v832q0 66 47 113t113 47h832q66 0 113-47t47-113V994q0-13 9-22l64-64q15-15 35-7t20 29m-96-738l288 288l-672 672H640V864zm444 132l-92 92l-288-288l92-92q28-28 68-28t68 28l152 152q28 28 28 68t-28 68"/></svg>
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

export default PostIdHistory;