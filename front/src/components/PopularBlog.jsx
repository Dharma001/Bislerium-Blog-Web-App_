import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { fetchApi } from "../Auths/apiWithoutAuth";

const PopularBlog = () => {
  const URL = "https://localhost:7189/";

  const location = useLocation();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts= async () => {
      try {
        const postsResponse = await fetchApi("get", "Home/recent");
        const fetchedPosts = postsResponse.data;
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []); 

  return (
    <>
      <div className="flex flex-col">
        {posts.map((post, index) => (
          <div key={index} className="w-full flex justify-between">
            <div className="">
                <p>{post.userFirstName}</p>
                <p> {post.userLastName}</p>
                <h2 className="text-2xl  tracking-wider mt-2 mb-1 ">{post.title}</h2>
            <p className="text-gray-500 text-md tracking-wide">{post.content}</p>
            <p className="text-gray-500 w-full font-medium">
  {new Date(post.createdAt).toLocaleDateString()}
</p>
</div>

            <div>
              <img
                className="h-[82px] w-[82px] rounded-lg"
                src={`${URL}${post.image}`}
                alt="Blog Image"
                title={post.title}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default PopularBlog;