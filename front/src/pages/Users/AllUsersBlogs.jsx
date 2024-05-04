import React, { useState, useEffect } from "react";
import { fetchWithAuth } from "../../Auths/userAuth";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function AllUsersBlogs() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const userId = Cookies.get("userId");
  const URL = "https://localhost:7189/";

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await fetchWithAuth("get", `Profile/blog/${userId}`);
        setPosts(response.data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchBlogData();
  }, [userId]);

  return (
    <>
      <div className="flex flex-col">
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <div key={index} className="w-full flex justify-between bg-slate-50 m-3 p-3 rounded">
              <div className="">
                <p>{post.userFirstName}</p>
                <p>{post.userLastName}</p>
                <h2 className="text-2xl tracking-wider mt-2 mb-1">{post.title}</h2>
                <p className="text-gray-500 text-md tracking-wide">{post.content}</p>
                <p className="text-gray-500 w-full font-medium">
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div>
                <img
                  src={`${URL}${post.image}`}
                  alt="Blog Image"
                  title={post.title}
                  className="h-[160px] w-[180px] rounded-lg"
                />
              </div>
              <div>
                <button className="bg-green-500 hover:bg-green-700 justify-center text-white px-3 py-2 rounded-sm transition duration-300 ease-in-out flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 1792 1408"
                  >
                    <path
                      fill="currentColor"
                      d="m888 1056l116-116l-152-152l-116 116v56h96v96zm440-720q-16-16-33 1L945 687q-17 17-1 33t33-1l350-350q17-17 1-33m80 594v190q0 119-84.5 203.5T1120 1408H288q-119 0-203.5-84.5T0 1120V288Q0 169 84.5 84.5T288 0h832q63 0 117 25q15 7 18 23q3 17-9 29l-49 49q-14 14-32 8q-23-6-45-6H288q-66 0-113 47t-47 113v832q0 66 47 113t113 47h832q66 0 113-47t47-113V994q0-13 9-22l64-64q15-15 35-7t20 29m-96-738l288 288l-672 672H640V864zm444 132l-92 92l-288-288l92-92q28-28 68-28t68 28l152 152q28 28 28 68t-28 68" /></svg>
                </button>

              </div>

              <div>

                <button
                  
                  className="bg-orange-600 hover:bg-orange-700 text-white px-3 py-2 rounded-sm transition duration-300 ease-in-out flex items-center justify-center"
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
          ))
        ) : (
          <p>No blog posts available.</p>
        )}
      </div>
    </>
  );
}

export default AllUsersBlogs;
