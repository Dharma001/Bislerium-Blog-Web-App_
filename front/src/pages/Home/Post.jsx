import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { fetchApi } from '../../Auths/apiWithoutAuth';
import { fetchWithAuth } from '../../Auths/userAuth';
import { toast } from 'react-toastify';
import Votes from '../../components/Votes'
import 'react-toastify/dist/ReactToastify.css';

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
  const [searchQuery, setSearchQuery] = useState('');
  const URL = 'https://localhost:7189/';
  const userId = Cookies.get('userId');
  

  useEffect(() => {
    const fetchPostsAndUpvoteStatus = async () => {
      try {
        // Fetch posts
        const postsResponse = await fetchApi('get', 'Blog');
        const fetchedPosts = postsResponse.data;
        setPosts(fetchedPosts);
  
        // Fetch upvote status for each post
        for (const post of fetchedPosts) {
          const response = await fetchApi('get', `home/${userId}/${post.id}/IsUpvoted`);
          setIsUpvoted(prevState => ({
            ...prevState,
            [post.id]: response.data.isUpvoted
          }));
          console.log(response.data);
        }
      } catch (error) {
        setError(error.message);
      }
    };
  
    fetchPostsAndUpvoteStatus();
  }, [userId]); // Only re-run the effect when userId changes
  
  

  const fetchCommentsForPost = async (postId) => {
    try {
      const response = await fetchApi('get', `Home/comment/${postId}`);
      setComments(prevComments => ({ ...prevComments, [postId]: response.data }));
      toast.success('Comments loaded successfully.');
    } catch (error) {
      setError(error.message);
      toast.error('Failed to load comments.');
    }
  };

  const handleFetchComments = async (postId) => {
    await fetchCommentsForPost(postId);
  };


  const handleCommentSubmit = async (postId, content) => {
    try {
      await fetchWithAuth('post', `Comment/${userId}/${postId}?content=${content}`, {
        headers: {
          'User-Id': userId,
        }
      });
      fetchCommentsForPost(postId);
      toast.success('Comment submitted successfully.');
    } catch (error) {
      toast.error('Failed to submit comment.');
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await fetchWithAuth('delete', `Comment/${commentId}/${userId}`, {
        headers: {
          'User-Id': userId,
        }
      });
      toast.success('Comment deleted successfully.');
      const updatedComments = { ...comments };
      for (let key in updatedComments) {
        updatedComments[key] = updatedComments[key].filter(comment => comment.id !== commentId);
      }
      setComments(updatedComments);
    } catch (error) {
      toast.error('Failed to delete comment.');
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredPosts = posts.filter(post => {
    return post.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const indexOfLastPost = currentPage * blogsPerPage;
  const indexOfFirstPost = indexOfLastPost - blogsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex-col items-center justify-center min-h-screen overflow-hidden w-[50%] mx-auto">
      <input type="text" placeholder="Search..." onChange={handleSearch} className="w-full p-2 rounded-md border border-gray-300 mb-4" />
      {currentPosts.map((post, index) => (
        <div key={index} className="bg-white p-4 rounded-md shadow-md mt-4">
          <div className="flex flex-col">
            <h2 className="text-lg font-bold">{post.title}</h2>
            <p className="text-gray-500 font-medium">{post.content}</p>
          </div>
          <div className="mt-4">
            <img src={`${URL}${post.image}`} alt="Blog Image" title={post.title} className="w-full h-full object-cover rounded-md" />
          </div>
          <div className="flex justify-start items-center mt-4">
            <Votes blogId={post.id}/>
            <button className="flex items-center space-x-2 ml-4 bg-gray-100 p-2 rounded-3xl" onClick={() => setShowCommentForm(!showCommentForm)}>
              Comment
            </button>
          </div>
          {showCommentForm && (
            <div className="mt-4">
              <form onSubmit={(e) => {
                e.preventDefault();
                handleCommentSubmit(post.id, e.target.elements.comment.value);
              }}>
                <textarea name="comment" placeholder="Write a comment..." className="w-full p-2 rounded-md border border-gray-300" required></textarea>
                <button type="submit" className="mt-2 bg-orange-500 text-white px-4 py-2 rounded-md">Submit</button>
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
              {showCommentForm ? 'Hide Comments' : 'Show Comments'}
            </button>
          </div>
          {showCommentForm && comments[post.id] && (
            <div className="mt-4">
              {comments[post.id].map((comment, index) => (
                <div key={index} className="border border-gray-200 p-2 rounded-md mt-2">
                  <p className="text-gray-700">{comment.content}</p>
                  {comment.userId === userId && (
                    <div>
                      <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
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
            <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="page-link bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-sm">
              Previous
            </button>
          </li>
          {Array.from({ length: Math.ceil(filteredPosts.length / blogsPerPage) }, (_, i) => (
            <li key={i} className="page-item">
              <button onClick={() => paginate(i + 1)} className={`page-link ${currentPage === i + 1 ? 'bg-orange-500 hover:bg-orange-600 text-white' : 'bg-orange-200 text-white'} px-4 py-2 rounded-sm`}>
                {i + 1}
              </button>
            </li>
          ))}
          <li className="page-item">
            <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(filteredPosts.length / blogsPerPage)} className="page-link bg-orange-500  hover:bg-orange-600 text-white px-4 py-2 rounded-sm">
              Next
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Post;
