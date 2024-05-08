import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { fetchApi } from "../Auths/apiWithoutAuth";
import { fetchWithAuth } from "../Auths/userAuth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CommentVotes = ({ blogId }) => {
  const [upvoteCount, setUpvoteCount] = useState(0);
  const [downvoteCount, setDownvoteCount] = useState(0);
  const [isUpvoted, setIsUpvoted] = useState(null);
  const userId = Cookies.get("userId");

  const handleUpvote = async () => {
    try {
      await fetchWithAuth("post", `CommentVotes/${userId}/${blogId}/upvote`, {
        headers: {
          "User-Id": userId,
        },
      });
      setIsUpvoted(true);
      toast.success("Post upvoted successfully.");
    } catch (error) {
      toast.error("Failed to upvote post.");
    }
  };

  const handleDownvote = async () => {
    try {
      await fetchWithAuth("post", `BlogVotes/${userId}/${blogId}/downvote`, {
        headers: {
          "User-Id": userId,
        },
      });
      setIsUpvoted(false); 
      toast.success("Post downvoted successfully.");
    } catch (error) {
      toast.error("Failed to downvote post.");
    }
  };

  useEffect(() => {
    const fetchVoteCounts = async () => {
      try {
        const upvoteCountsResponse = await fetchApi(
          "get",
          `home/${blogId}/upvotes`
        );
        const downvoteCountsResponse = await fetchApi(
          "get",
          `home/${blogId}/downvotes`
        );
        setUpvoteCount(upvoteCountsResponse.data);
        setDownvoteCount(downvoteCountsResponse.data);
      } catch (error) {
        console.error("Failed to fetch vote counts:", error);
      }
    };

    fetchVoteCounts();
  }, [blogId]);

  useEffect(() => {
    const fetchUpvoteStatus = async () => {
      try {
        const response = await fetchApi(
          "get",
          `Home/${userId}/${blogId}/IsUpvoted`
        );
        setIsUpvoted(response.data);
      } catch (error) {
        console.error("Failed to fetch upvote status:", error);
      }
    };

    fetchUpvoteStatus();
  }, [userId, blogId]);

  return (
    <div className="flex px-3 py-2 space-x-1 bg-gray-100 rounded-3xl">
      <div className="flex space-x-1">
        
      <button
        className="hover:text-blue-500"
        onClick={handleUpvote}
      >
        {isUpvoted !== null && isUpvoted ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.2em"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M4 14h4v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7h4a1.001 1.001 0 0 0 .781-1.625l-8-10c-.381-.475-1.181-.475-1.562 0l-8 10A1.001 1.001 0 0 0 4 14"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.2em"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M12.781 2.375c-.381-.475-1.181-.475-1.562 0l-8 10A1.001 1.001 0 0 0 4 14h4v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7h4a1.001 1.001 0 0 0 .781-1.625zM15 12h-1v8h-4v-8H6.081L12 4.601L17.919 12z"
            />
          </svg>
        )}
       
        
      </button>
      
      <div>

      <p> {upvoteCount}</p>
      </div>
      </div>

      
      <button
        className="  hover:text-red-500"
        onClick={handleDownvote}
      >
        {isUpvoted !== null && !isUpvoted ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.2em"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M20.901 10.566A1.001 1.001 0 0 0 20 10h-4V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v7H4a1.001 1.001 0 0 0-.781 1.625l8 10a1 1 0 0 0 1.562 0l8-10c.24-.301.286-.712.12-1.059"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.2em"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M20.901 10.566A1.001 1.001 0 0 0 20 10h-4V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v7H4a1.001 1.001 0 0 0-.781 1.625l8 10a1 1 0 0 0 1.562 0l8-10c.24-.301.286-.712.12-1.059M12 19.399L6.081 12H10V4h4v8h3.919z"
            />
          </svg>
        )}
       
      </button>
     
      <div>
      <p> {downvoteCount}</p>
      </div>
      </div>
      
    
  );
};

export default CommentVotes;
