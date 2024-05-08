import React, { useEffect, useState } from "react";
import { fetchApi } from "../Auths/apiWithoutAuth";

function CommentCounts({ blogId }) {
  const [commentCounts, setCommentCounts] = useState(0);

  const fetchCommentCountsForPost = async (blogId) => {
    try {
      const response = await fetchApi(`Home/${blogId}/comment/count`);
      if (!response.ok) {
        throw new Error('Failed to fetch comment count');
      }
      const data = await response.json();
      setCommentCounts(data);
    } catch (error) {
      console.error('Error fetching comment count:', error);
    }
  };

  useEffect(() => {
    fetchCommentCountsForPost(blogId);
  }, [blogId]);
  return (
    <div>
      Total Comment Count: {commentCounts}
    </div>
  );
}

export default CommentCounts;
