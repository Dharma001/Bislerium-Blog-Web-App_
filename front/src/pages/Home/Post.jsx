import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { fetchApi } from "../../Auths/apiWithoutAuth";
import { fetchWithAuth } from "../../Auths/userAuth";
import { toast } from "react-toastify";
import axios from "axios";
import Votes from "../../components/Votes";
import CommentVotes from "../../components/CommentVotes";
import "react-toastify/dist/ReactToastify.css";
import PopularBlog from "../../components/PopularBlog";
import { Link } from "react-router-dom";


const Post = () => {
  const [comments, setComments] = useState({});
  const [posts, setPosts] = useState([]);
  const [isUpvoted, setIsUpvoted] = useState(null);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const blogsPerPage = 10;
  const userId = Cookies.get("userId");
  const URL = "https://localhost:7189/";
  const isLoggedIn = () => {
    return Cookies.get("token") && Cookies.get("roleId");
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("https://localhost:7189/api/Home", {
          params: {
            sortBy,
            order,
            searchQuery,
            page: currentPage,
            pageSize: blogsPerPage,
          },
        });

        setPosts(response.data);
        if (response.headers["x-total-count"]) {
          const totalCount = parseInt(response.headers["x-total-count"]);
          setTotalPages(Math.ceil(totalCount / blogsPerPage));
        }
      } catch (error) {
        console.error("An error occurred while fetching data:", error);
      }
    };

    fetchPosts();
  }, [currentPage, sortBy, order, searchQuery]);
  const fetchCommentsForPost = async (postId) => {
    try {
      const response = await fetchApi("get", `Home/comment/${postId}`);
      setComments((prevComments) => ({
        ...prevComments,
        [postId]: response.data,
      }));
    } catch (error) {}
  };

  const handleExpand = (postId) => {
    setExpanded((prevExpanded) => ({ ...prevExpanded, [postId]: true }));
  };

  const handleCollapse = (postId) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [postId]: false,
    }));
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
    } catch (error) {}
  };

  const handleDeleteComment = async (commentId,postId) => {
    try {
      await fetchWithAuth("delete", `Comment/${commentId}/${userId}/${postId}`, {
        headers: {
          "User-Id": userId,
          "Blog-Id": postId,
        },
      });
      const updatedComments = { ...comments };
      for (let key in updatedComments) {
        updatedComments[key] = updatedComments[key].filter(
          (comment) => comment.id !== commentId
        );
      }
      setComments(updatedComments);
    } catch (error) {}
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
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleOrderChange = (event) => {
    setOrder(event.target.value);
  };

  return (
    <div className="grid grid-cols-5 my-4 gap-4 ">
      <div className="flex flex-col justify-end  relative ml-20 overflow-hidden w-[85%]  col-span-3">
        <div className=" rounded-xl   bg-white ">
          <div className="flex absolute top-0   px-4  w-full mt-2   space-x-4">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              name="search"
              placeholder="Search Blogs"
              className="h-[3rem] pl-12 text-[.8rem]  2xl:text-[.9rem] bg-gray-100 rounded-3xl w-2/3"
              autoComplete="off"
              autoFocus
            />

            <div className="absolute  top-[.7rem] text-[1rem] left-2 z-10 pointer-events-none text-gray-700">
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
            <div className="flex space-x-2 justify-center items-center">
              <div className="border-2 rounded-sm px-1 py-1">
                <select value={sortBy} onChange={handleSortByChange}>
                  <option value="">Sort By</option>
                  <option value="popularity">Popularity</option>
                  <option value="recency">Recency</option>
                </select>
              </div>
              <div className="border-2 rounded-sm px-1 py-1">
                <select value={order} onChange={handleOrderChange}>
                  <option value="">Order</option>
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select>
              </div>
            </div>
          </div>

          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white p-4 rounded-md shadow-md mt-14 mb-8"
            >
              <div className="w-full flex  justify-normal items-center">
                <div className=" w-full flex space-x-4 ">
                  <div className="flex text-sm text-gray-950">
                    <p>{post.userFirstName}</p>
                    <p> {post.userLastName}</p>
                  </div>

                  <div className="text-sm  flex space-x-1">
                    <div className="">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1.4em"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="none"
                          stroke="currentColor"
                          stroke-linecap="round"
                          d="M5.282 5.282A9.5 9.5 0 1 0 12 2.5m0 9.5L7 7m5-4.5V5m9 7h-2m-7 7v2m-7-9H3"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-500 w-full font-medium">
                        {getTimeElapsed(post.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mr-10">
                  {!isLoggedIn() && (
                    <Link to="/login">
                      <button className="bg-blue-700 hover:bg-blue-800 text-sm font-semibold rounded-3xl px-3 py-1 text-white">
                        Join
                      </button>
                    </Link>
                  )}
                </div>
              </div>
              <div className="text-justify text-[15px]">
                <h2 className="text-[20px] font-semibold  tracking-wider mt-2 mb-1 ">
                  {post.title}
                </h2>
                {expanded[post.id] ? (
                  <>
                    <p className="text-gray-500 text-md h-56 overflow-y-auto scrollbar-w-2 scrollbar-track-gray-100 scrollbar-thumb-gray-300  flex text-justify tracking-wide">
                      {post.content}
                    </p>
                    <button
                      className="text-blue-600 cursor-pointer hover:underline"
                      onClick={() => handleCollapse(post.id)}
                    >
                      See Less
                    </button>
                  </>
                ) : (
                  <>
                    <p className="text-gray-500 text-md tracking-wide">
                      {post.content.split(" ").slice(0, 80).join(" ")}
                      {post.content.split(" ").length > 80 && (
                        <span
                          className="text-blue-600 cursor-pointer hover:underline"
                          onClick={() => handleExpand(post.id)}
                        >
                          {" "}
                          See More
                        </span>
                      )}
                    </p>
                  </>
                )}


              </div>
              {post.image ? (
                <div className="mt-4">
                  <img
                    src={`${URL}${post.image}`}
                    alt="Blog Image"
                    title={post.title}
                    className="w-full h-80 object-cover rounded-md"
                  />
                </div>
              ) : null}
              <div className="flex justify-start items-center mt-4 space-x-6">
                <div className="">
                  <Votes blogId={post.id} />
                </div>
                <div className="flex bg-gray-100 px-4 py-2 space-x-1  rounded-3xl items-center justify-center ">
                  <button
                    className="  mx-auto rounded-3xl"
                    onClick={() =>
                      setShowCommentForm((prev) => ({
                        ...prev,
                        [post.id]: !prev[post.id],
                      }))
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1.3em"
                      className="hover:text-orange-500"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M9 22a1 1 0 0 1-1-1v-3H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6.1l-3.7 3.71c-.2.19-.45.29-.7.29zm1-6v3.08L13.08 16H20V4H4v12z"
                      />
                    </svg>
                  </button>
                  <div>
                    <p>542</p>
                  </div>
                </div>
              </div>
              {showCommentForm[post.id] && (
                <div className="mt-4">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleCommentSubmit(
                        post.id,
                        e.target.elements.comment.value
                      );
                    }}
                  >
                    <textarea
                      name="comment"
                      placeholder="Write a comment..."
                      className="w-full p-2 rounded-md border border-gray-300"
                      required
                    ></textarea>
                    <div className="flex space-x-4 justify-end">
                      <button
                        type=""
                        className="mt-2 bg-gray-100 capitalize text-black font-semibold hover:bg-gray-200 px-4 py-2 rounded-md"
                        onClick={() =>
                          setShowCommentForm((prev) => ({
                            ...prev,
                            [post.id]: false,
                          }))
                        }
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
                    setShowCommentForm((prev) => ({
                      ...prev,
                      [post.id]: !prev[post.id],
                    }));
                  }}
                >
                  {showCommentForm[post.id] ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m17 14l-5-5l-5 5"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                        d="m7 10l5 5l5-5"
                      />
                    </svg>
                  )}
                </button>
              </div>
              {showCommentForm[post.id] && comments[post.id] && (
                <div className="mt-2">
                  {comments[post.id].map((comment, index) => (
                    <div key={index} className=" px-2  ml-4 m-2">
                      <div className="border border-gray-300 bg-gray-50 my-4 py-4 px-4 rounded-lg">
                        <div className="flex space-x-4">
                          <div className="flex space-x-1 justify-center items-center text-sm text-gray-950">
                            <div className="">
                              <img
                                className="w-6 rounded-full"
                                src="https://th.bing.com/th?id=OIP.HHVUf3TYqncgpJXyCMmxyAHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"
                              />
                            </div>
                            <div className="flex text-gray-700">
                              <p>{post.userFirstName}</p>
                              <p> {post.userLastName}</p>
                            </div>
                          </div>

                          <div className="text-sm  flex justify-center items-center space-x-1">
                            <div className="">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="1.4em"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  fill="none"
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  d="M5.282 5.282A9.5 9.5 0 1 0 12 2.5m0 9.5L7 7m5-4.5V5m9 7h-2m-7 7v2m-7-9H3"
                                />
                              </svg>
                            </div>
                            <div>
                              <p className="text-gray-500 w-full font-medium">
                                {getTimeElapsed(post.createdAt)}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className=" my-4 ">
                          <p className="text-gray-600 text-sm">
                            {comment.content}
                          </p>
                        </div>
                      </div>
                      <div className="w-fit">
                        <CommentVotes
                          blogId={comment.blogId}
                          commentId={comment.id}
                        />
                      </div>
                        <div>
                          <button
                            onClick={() => handleDeleteComment(comment.id,comment.blogId)}
                          >
                            Delete
                          </button>
                        </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-center py-4">
          <ul className="pagination flex gap-2">
            <li className="page-item">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="page-link bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-sm"
              >
                Previous
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, i) => (
              <li key={i} className="page-item">
                <button
                  onClick={() => handlePageChange(i + 1)}
                  className={`page-link ${
                    currentPage === i + 1
                      ? "bg-orange-500 hover:bg-orange-600 text-white"
                      : "bg-orange-200 text-white"
                  } px-4 py-2 rounded-sm`}
                >
                  {i + 1}
                </button>
              </li>
            ))}
            <li className="page-item">
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="page-link bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-sm"
              >
                Next
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="col-span-2  flex justify-center my-6">
        <div className=" w-[80%] px-1 flex justify-center h-full rounded-lg">
          <div className="">
            <div className="  px-3 py-4 flex justify-center h-[85dvh] sticky top-24  overflow-y-auto bg-gray-50 rounded-lg scrollbar-w-2 scrollbar-track-gray-100 scrollbar-thumb-gray-300">
              <div className="text-sm  text-gray-500 capitalize">
                <h1>Recently created blogs</h1>
                <PopularBlog />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
