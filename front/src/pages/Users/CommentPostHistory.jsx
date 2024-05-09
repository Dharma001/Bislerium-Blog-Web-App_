import { fetchWithAuth } from "../../Auths/userAuth";
import React, { useState, useEffect } from "react";
import { useNavigate,Link, useParams } from "react-router-dom";
import Cookies from "js-cookie";

function CommentPostHistory() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const userId = Cookies.get("userId");

  useEffect(() => {
    const fetchBlogData = async () => {
      setLoading(true);
      try {
        const response = await fetchWithAuth("get", `Comment/CommentHistory/${userId}`);
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
      <tr className="">
      <th className="py-4 px-6 bg-gray-100 font-bold">Author</th>
        <th className="py-4 px-6 bg-gray-100 font-bold">Title</th>
        <th className="py-4 px-6 bg-gray-100 font-bold">Comment</th>
       
      </tr>
    </thead>
  );

  const TableRow = ({ post }) => (
    <tr>
        <td>
        <div className="py-4 px-6">
          <p>{post.userFirstName} {post.userLastName}</p>
          
        </div>
      </td>
      <td className="py-4 px-6">{post.blogTitle.length >30 ? post.blogTitle.slice(0,40)+ "...":post.blogTitle}</td>
      <td className="py-4 px-6">{post.commentContent.length >30 ? post.commentContent.slice(0,40)+ "...":post.commentContent}</td>
    
    </tr>
  );

  return (
    <div className="container w-[90%] ml-[22%] px-4 ">
      <h1 className="text-2xl font-bold  my-6">Comment History</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : posts.length > 0 ? (
        <table className="w-full text-left">
          <TableHeader />
          <tbody>
            {posts.map((post) => (
              <TableRow key={post.id} post={post} />
            ))}
          </tbody>
        </table>
      ) : (
        <p>No Comment History posts available.</p>
      )}
    </div>
  );
}

export default CommentPostHistory;
