import { fetchWithAuth } from "../../Auths/userAuth";
import React, { useState, useEffect } from "react";
import { useNavigate,Link, useParams } from "react-router-dom";
import Cookies from "js-cookie";

function CommentPostHistory() {
  const navigate = useNavigate();
  const { id: blogId } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const userId = Cookies.get("userId");

  useEffect(() => {
    const fetchBlogData = async () => {
      setLoading(true);
      try {
        const response = await fetchWithAuth("get", `Comment/CommentHistory/${userId}/${blogId}`);
        setPosts(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, [userId, blogId]);

  const TableHeader = () => (
    <thead>
      <tr>
        <th>Title</th>
        <th>Content</th>
        <th>Author</th>
      </tr>
    </thead>
  );

  const TableRow = ({ post }) => (
    <tr>
      <td>{post.blogTitle}</td>
      <td>{post.commentContent}</td>
      <td>
        <div>
          <p>{post.userFirstName} {post.userLastName}</p>
          <p>Owner</p>
        </div>
      </td>
    </tr>
  );

  return (
    <div className="container w-fit ml-[22%] px-4 ">
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
