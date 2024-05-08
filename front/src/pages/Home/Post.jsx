import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { fetchApi } from "../../Auths/apiWithoutAuth";
import { fetchWithAuth } from "../../Auths/userAuth";
import { toast } from "react-toastify";
import Votes from "../../components/Votes";
import CommentVotes from "../../components/CommentVotes";
import "react-toastify/dist/ReactToastify.css";
import PopularBlog from "../../components/PopularBlog";

const Post = () => {
  const [comments, setComments] = useState({});
  const [posts, setPosts] = useState([]);
  const [isUpvoted, setIsUpvoted] = useState(null);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [editingCommentIndex, setEditingCommentIndex] = useState(null);
  const [deletingCommentId, setDeletingCommentId] = useState(null);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const URL = "https://localhost:7189/";
  const userId = Cookies.get("userId");

  useEffect(() => {
    const fetchPostsAndUpvoteStatus = async () => {
      try {
        const postsResponse = await fetchApi("get", "Blog");
        const fetchedPosts = postsResponse.data;
        setPosts(fetchedPosts);
        
        for (const post of fetchedPosts) {
          const response = await fetchApi(
            "get",
            `home/${userId}/${post.id}/IsUpvoted`
          );
          setIsUpvoted((prevState) => ({
            ...prevState,
            [post.id]: response.data.isUpvoted,
          }));
        }
      } catch (error) {
      }
    };

    fetchPostsAndUpvoteStatus();
  }, [userId]);

  const fetchCommentsForPost = async (postId) => {
    try {
      const response = await fetchApi("get", `Home/comment/${postId}`);
      setComments((prevComments) => ({
        ...prevComments,
        [postId]: response.data,
      }));
    } catch (error) {
    }
  };

  const handleFetchComments = async (postId) => {
    await fetchCommentsForPost(postId);
  };

  const handleCommentSubmit = async (postId, content) => {
    try {
      await fetchWithAuth(
        "post",
        `Comment/${userId}/${postId}?content=${content}`,
        {
          headers: {
            "User-Id": userId,
          },
        }
      );
      fetchCommentsForPost(postId);
    } catch (error) {
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await fetchWithAuth("delete", `Comment/${commentId}/${userId}`, {
        headers: {
          "User-Id": userId,
        },
      });
      const updatedComments = { ...comments };
      for (let key in updatedComments) {
        updatedComments[key] = updatedComments[key].filter(
          (comment) => comment.id !== commentId
        );
      }
      setComments(updatedComments);
    } catch (error) {
    }
  };
  function getTimeElapsed(createdAt) {
    const createdDate = new Date(createdAt);
    const currentDate = new Date();

    const timeDifference = Math.abs(currentDate - createdDate) / 1000; // Convert to seconds

    const yearsElapsed = Math.floor(timeDifference / (60 * 60 * 24 * 365));
    const monthsElapsed = Math.floor(timeDifference / (60 * 60 * 24 * 30));
    const daysElapsed = Math.floor(timeDifference / (60 * 60 * 24));
    const hoursElapsed = Math.floor(timeDifference / (60 * 60));
    const minutesElapsed = Math.floor(timeDifference / 60);
    const secondsElapsed = Math.floor(timeDifference);

    if (yearsElapsed > 0) {
      return `${yearsElapsed} year${yearsElapsed > 1 ? "s" : ""} ago`;
    } else if (monthsElapsed > 0) {
      return `${monthsElapsed} month${monthsElapsed > 1 ? "s" : ""} ago`;
    } else if (daysElapsed > 0) {
      return `${daysElapsed} day${daysElapsed > 1 ? "s" : ""} ago`;
    } else if (hoursElapsed > 0) {
      return `${hoursElapsed} hour${hoursElapsed > 1 ? "s" : ""} ago`;
    } else if (minutesElapsed > 0) {
      return `${minutesElapsed} minute${minutesElapsed > 1 ? "s" : ""} ago`;
    } else {
      return `${secondsElapsed} second${secondsElapsed > 1 ? "s" : ""} ago`;
    }
  }

  const createdAt = "2022-05-04T10:00:00Z";

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredPosts = posts.filter((post) => {
    return post.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const indexOfLastPost = currentPage * blogsPerPage;
  const indexOfFirstPost = indexOfLastPost - blogsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="grid grid-cols-5  gap-4">
    <div className="flex flex-col justify-end ml-20  overflow-hidden w-[100%]  col-span-3">
      <div className="relative rounded-xl mt-2">
        <input
          type="text"
          onChange={handleSearch}
          name="search"
          placeholder="Search Blogs"
          className="h-[3rem] pl-12 text-[.8rem] 2xl:text-[.9rem] bg-gray-100 rounded-3xl w-full"
          autoComplete="off"
          autoFocus
        />
        <div className="absolute top-[.4rem] text-[1rem] left-2 z-10 pointer-events-none text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.4rem"
            height="1.4rem"
            className="2xl:w-[1.7rem] 2xl:h-[1.7rem]"
            viewBox="0 0 50 50"
          >
            <path
              fill="currentColor"
              d="M23 36c-7.2 0-13-5.8-13-13s5.8-13 13-13s13 5.8 13 13s-5.8 13-13 13m0-24c-6.1 0-11 4.9-11 11s4.9 11 11 11s11-4.9 11-11s-4.9-11-11-11"
            />
            <path
              fill="currentColor"
              d="m32.682 31.267l8.98 8.98l-1.414 1.414l-8.98-8.98z"
            />
          </svg>
        </div>
      </div>

      <hr className="mt-2" />
      {currentPosts.map((post, index) => (
        <div key={index} className="bg-white p-4 rounded-md shadow-md mt-4 mb-8">
          <div className="w-full flex  justify-normal items-center">
             <div className=" w-full flex space-x-4 ">
              <div className="flex text-sm text-gray-950">
                <p>{post.userFirstName}</p>
                <p> {post.userLastName}</p>
                </div>
        
                <div className="text-sm  flex space-x-1">
                
                <div className="">
                <svg xmlns="http://www.w3.org/2000/svg" width="1.4em"  viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" d="M5.282 5.282A9.5 9.5 0 1 0 12 2.5m0 9.5L7 7m5-4.5V5m9 7h-2m-7 7v2m-7-9H3"/></svg>
                </div>
                <div>
                  
                <p className="text-gray-500 w-full font-medium">
                  {getTimeElapsed(post.createdAt)}
                </p>
                </div>
              </div>
     
            </div>

            <div className="mr-10pos">
              <button className="bg-blue-700  hover:bg-blue-800 text-sm   font-semibold rounded-3xl px-3 py-1 text-white">
                Join
              </button>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-semibold  tracking-wider mt-2 mb-1 ">{post.title}</h2>
            <p className="text-gray-500 text-md tracking-wide">{post.content}</p>
          </div>
          <div className="mt-4">
            <img
              src={`${URL}${post.image}`}
              alt="Blog Image"
              title={post.title}
              className="w-full h-full object-cover rounded-md"
            />
          </div>
          <div className="flex justify-start items-center mt-4 space-x-6">
          <div className="">
            <Votes blogId={post.id} />
            </div>
            <div className="flex bg-gray-100 px-4 py-2 space-x-1  rounded-3xl items-center justify-center "> 
            <button
              className="  mx-auto rounded-3xl"
              onClick={() => setShowCommentForm(!showCommentForm)}
            >
            <svg xmlns="http://www.w3.org/2000/svg" width="1.3em"  className="hover:text-orange-500" viewBox="0 0 24 24"><path fill="currentColor" d="M9 22a1 1 0 0 1-1-1v-3H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6.1l-3.7 3.71c-.2.19-.45.29-.7.29zm1-6v3.08L13.08 16H20V4H4v12z"/></svg>
            </button>
            <div>
              <p>542</p>
            </div>
          </div>
          </div>
          {showCommentForm && (
            <div className="mt-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleCommentSubmit(post.id, e.target.elements.comment.value);
                }}
              >
                <textarea
                  name="comment"
                  placeholder="Write a comment..."
                  className="w-full p-2 rounded-md border border-gray-300"
                  required

                  
                >
             
                </textarea>
                <div className="flex space-x-4 justify-end">
                <button
                  type=""
                  className="mt-2 bg-gray-100 capitalize text-black font-semibold hover:bg-gray-200 px-4 py-2 rounded-md"
                >
                  cancel
                </button>
                <button
                  type="submit"
                  className="mt-2 bg-orange-500 capitalize text-white px-4 py-2 rounded-md"
                >
                  Submit
                </button>

                </div>
             
              </form>
            </div>
          )}
          <div className="mt-4">
            <button
              className="bg-gray-100 p-2 rounded-3xl"
              onClick={() => {
                handleFetchComments(post.id);
                setShowCommentForm(!showCommentForm);
              }}
            >
              {showCommentForm ? "Hide Comments" : "Show Comments"}
            </button>
          </div>
          {showCommentForm && comments[post.id] && (
            <div className="mt-2">
              {comments[post.id].map((comment, index) => (
                <div
                  key={index}
                  className=" px-2  ml-4 m-2"
                 
                >
                  <div className="border border-gray-300 bg-gray-50 my-4 py-4 px-4 rounded-lg">
                 <div className="flex space-x-4">
                 <div className="flex space-x-1 justify-center items-center text-sm text-gray-950">
                  <div className="">
                 <img  className="w-6 rounded-full" src="https://th.bing.com/th?id=OIP.HHVUf3TYqncgpJXyCMmxyAHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"/>
                 </div>
                 <div className="flex text-gray-700">
                <p>{post.userFirstName}</p>
                <p> {post.userLastName}</p>
                </div>
                </div>
        
                <div className="text-sm  flex justify-center items-center space-x-1">
                
                <div className="">
                <svg xmlns="http://www.w3.org/2000/svg" width="1.4em"  viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" d="M5.282 5.282A9.5 9.5 0 1 0 12 2.5m0 9.5L7 7m5-4.5V5m9 7h-2m-7 7v2m-7-9H3"/></svg>
                </div>
                <div>
                <p className="text-gray-500 w-full font-medium">
                  {getTimeElapsed(post.createdAt)}
                </p>
                </div>
              </div>
               
                 </div>
                 <div className=" my-4 ">
                  
                <p className="text-gray-600 text-sm">{comment.content}</p>
                </div>
                </div>  
                  <div className="w-fit">
                  <CommentVotes blogId={comment.blogId} commentId={comment.id}/>
                  </div>
                  {comment.userId === userId && (
                    <div>
                      <button onClick={() => handleDeleteComment(comment.id)}>
                        Delete
                      </button>
                    </div>
                  )}
                </div>
                
              ))}
                  
            </div>
            
          )}
        </div>
        
        
        
      ))}
  
        
      {error && <p>Error: {error}</p>}
   
      <div className="flex justify-center py-4">
        <ul className="pagination flex gap-2">
          <li className="page-item">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="page-link bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-sm"
            >
              Previous
            </button>
          </li>
          {Array.from(
            { length: Math.ceil(filteredPosts.length / blogsPerPage) },
            (_, i) => (
              <li key={i} className="page-item">
                <button
                  onClick={() => paginate(i + 1)}
                  className={`page-link ${
                    currentPage === i + 1
                      ? "bg-orange-500 hover:bg-orange-600 text-white"
                      : "bg-orange-200 text-white"
                  } px-4 py-2 rounded-sm`}
                >
                  {i + 1}
                </button>
              </li>
            )
          )}
          <li className="page-item">
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={
                currentPage === Math.ceil(filteredPosts.length / blogsPerPage)
              }
              className="page-link bg-orange-500  hover:bg-orange-600 text-white px-4 py-2 rounded-sm"
            >
              Next
            </button>
          </li>
        </ul>
      </div>
    </div>
    <div className="col-span-2 flex justify-center my-6">
      <div className=" w-[62%] px-3 py-4 flex justify-center h-full bg-gray-100 rounded-lg">
        <div className="">
        <h1>most popular blogs</h1>
        <PopularBlog/>
        </div>
      </div>

    </div>
    </div>   
  );
};

export default Post;