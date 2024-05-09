import React, { useState, useEffect } from "react";
import { fetchWithAuth } from "../../Auths/userAuth";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

function AllUsersBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage] = useState(5); 
  const userId = Cookies.get("userId");
  const URL = "https://localhost:7189/";

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await fetchWithAuth("get", `Profile/blog/${userId}`);
        setBlogs(response.data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        setError(error.message);
      }
    };

    fetchBlogData();
  }, [userId]);

  useEffect(() => {
    const filteredResults = blogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredBlogs(filteredResults);
  }, [searchQuery, blogs]);

  const handleDeleteBlog = async (blogId) => {
    try {
      await fetchWithAuth("delete", `Blog/${blogId}`);
      setBlogs(blogs.filter((blog) => blog.id !== blogId));
      setFilteredBlogs(filteredBlogs.filter((blog) => blog.id !== blogId));
      toggleModal();
    } catch (error) {
      setError(error.message);
    }
  };

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="px-4 ml-[23%]  py-4">
    <div className="my-4 w-[40%] border flex justify-center items-center border-gray-300">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1.7rem"
        height="1.7rem"
        className=" ml-4 mr-2"
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
      <input
        type="text"
        placeholder="Search by name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border-none rounded-sm px-3 py-3 w-full focus:outline-none focus:border-green-500"
      />
    </div>
    <div className="">
      <hr className="my-4" />
      {error ? (
        <p className="text-orange-500">Error: {error}</p>
      ) : currentBlogs.length > 0 ? (
        <div className="overflow-x-auto">
          <div className="w-full  divide-y divide-gray-200">
      
            <div className="divide-y divide-gray-200">
              {currentBlogs.map((blog, index) => (
                <tr
                  key={blog.id}
                  className={index % 2 === 0 ? "bg-white" : "bg-white"}
                >
                  <div className="w-full">
                    <div className="grid py-2 px-2  grid-cols-2 ">
                  <div className=" grid place-items-center">
                    <img
                      src={`${URL}${blog.image}`}
                      alt="Blog Image"
                      title={blog.title}
                      className="h-64 w-96 rounded-lg"
                    />
                  </div>
                  <div className="">
                  <div className="flex place-items-start justify-between text-md font-black">
                  <div className="px-4 py-4 whitespace-nowrap ">
                    {blog.title}
                  </div>
                  <div className="text-sm">
                  <div className="flex ">
                  <div className="mt-4  ">
                <svg xmlns="http://www.w3.org/2000/svg "  width="1.4em"  viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" d="M5.282 5.282A9.5 9.5 0 1 0 12 2.5m0 9.5L7 7m5-4.5V5m9 7h-2m-7 7v2m-7-9H3"/></svg>
                </div>
                  <div className="px-1 py-4 whitespace-nowrap text-md">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </div>
                  </div>
                  </div>
                  </div>
                
                  <div className="px-4 h-[65%] whitespace-nowrap text-sm text-start">
                    {blog.content}
                  </div>
                  
                  <div className="whitespace-nowrap   justify-center align-items-end flex gap-4">
                    <Link to={`/history/EditBlogProfile/${blog.id}`}>
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
                    <button
                      onClick={toggleModal}
                      className="bg-orange-600 hover:bg-orange-700 w-fit text-white px-3 py-2 rounded-sm transition duration-300 ease-in-out flex items-center justify-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        viewBox="0 0 2048 2048"
                      >
                        <path
                          fill="currentColor"
                          d="M1792 384h-128v1472q0 40-15 75t-41 61t-61 41t-75 15H448q-40 0-75-15t-61-41t-41-61t-15-75V384H128V256h512V128q0-27 10-50t27-40t41-28t50-10h384q27 0 50 10t40 27t28 41t10 50v128h512zM768 256h384V128H768zm768 128H384v1472q0 26 19 45t45 19h1024q26 0 45-19t19-45zM768 1664H640V640h128zm256 0H896V640h128zm256 0h-128V640h128z"
                        />
                      </svg>
                    </button>
                  </div>
                  </div>
                  </div>
                  </div>

                  <hr className="my-4 border-gray-300"/>
                  <td>
                    {isOpen && (
                      <div className="fixed z-50 inset-0 overflow-y-auto ">
                        <div className="flex items-center justify-center min-h-screen bg-gray-500 opacity-50">
                          <div className="relative bg-white  p-12 rounded-sm max-w-lg mx-auto">
                            <div className="flex justify-between items-center">
                              <h2 className="text-lg font-semibold">
                                Delete Confirmation
                              </h2>
                              <button
                                onClick={toggleModal}
                                className="text-gray-500 hover:text-gray-700 focus:outline-none relative top-[-15px]"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="1.2rem"
                                  height="1.2rem"
                                  viewBox="0 0 15 15"
                                >
                                  <path
                                    fill="currentColor"
                                    fillRule="evenodd"
                                    d="M11.782 4.032a.575.575 0 1 0-.813-.814L7.5 6.687L4.032 3.218a.575.575 0 0 0-.814.814L6.687 7.5l-3.469 3.468a.575.575 0 0 0 .814.814L7.5 8.313l3.469 3.469a.575.575 0 0 0 .813-.814L8.313 7.5z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </button>
                            </div>
                            <div className="mt-4">
                              <p>
                                Are you sure you want to delete this item?
                              </p>
                            </div>

                            <div className="mt-6 flex justify-end">
                              <button
                                onClick={() => handleDeleteBlog(blog.id)}
                                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded mr-4 focus:outline-none"
                              >
                                Delete
                              </button>
                              <button
                                onClick={toggleModal}
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </div>
          </div>
          <div className="flex justify-center py-4">
            <ul className="pagination flex gap-2">
              <li className="page-item">
                <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="page-link bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-sm">
                  Previous
                </button>
              </li>
              {Array.from({ length: Math.ceil(filteredBlogs.length / blogsPerPage) }, (_, i) => (
                <li key={i} className="page-item">
                  <button onClick={() => paginate(i + 1)} className={`page-link ${currentPage === i + 1 ? 'bg-orange-500 hover:bg-orange-600 text-white' : 'bg-orange-200 text-white'} px-4 py-2 rounded-sm`}>
                    {i + 1}
                  </button>
                </li>
              ))}
              <li className="page-item">
                <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(filteredBlogs.length / blogsPerPage)} className="page-link bg-orange-500  hover:bg-orange-600 text-white px-4 py-2 rounded-sm">
                  Next
                </button>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <p className="text-center">
          No blog found with the provided search criteria.
        </p>
      )}
    </div>
  </div>
  );
};


export default AllUsersBlogs;
