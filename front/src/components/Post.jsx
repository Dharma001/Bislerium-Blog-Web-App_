import PropTypes from 'prop-types';
import { useState } from 'react';

const Post = ({ title, author, subreddit, upvotes, comments }) => {
  const [commentList, setCommentList] = useState([]);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [editingComment, setEditingComment] = useState(null);
  const [deletingComment, setDeletingComment] = useState(null);

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    const newComment = event.target.elements.comment.value;
    setCommentList([...commentList, newComment]);
    event.target.elements.comment.value = '';
  };

  const handleEditComment = (index) => {
    setEditingComment(index);
  };

  const handleDeleteComment = (index) => {
    setDeletingComment(index);
  };

  const handleSaveComment = (index, newComment) => {
    const updatedComments = [...commentList];
    updatedComments[index] = newComment;
    setCommentList(updatedComments);
    setEditingComment(null);
  };

  const handleCancelEdit = () => {
    setEditingComment(null);
  };

  const handleConfirmDelete = () => {
    const updatedComments = commentList.filter((_, index) => index !== deletingComment);
    setCommentList(updatedComments);
    setDeletingComment(null);
  };

  const handleCancelDelete = () => {
    setDeletingComment(null);
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-md mt-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold">{title}</h2>
          <img src="https://via.placeholder.com/50" alt="Profile Image" className="w-10 h-10 rounded-full" />
          <p className="text-gray-600">Posted by {author} in {subreddit}</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-gray-600">{upvotes} upvotes</span>
          <span className="text-gray-600">{comments} comments</span>
        </div>
      </div>

      <div className="mt-4">
        <img src="https://via.placeholder.com/150" alt="Post Image" className="w-full h-64 object-cover rounded-md" />
      </div>

      <div className="flex justify-start items-center mt-4">
        <button className="flex items-center space-x-2 bg-gray-100 p-2 rounded-3xl">
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12.781 2.375c-.381-.475-1.181-.475-1.562 0l-8 10A1.001 1.001 0 0 0 4 14h4v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7h4a1.001 1.001 0 0 0 .781-1.625zM15 12h-1v8h-4v-8H6.081L12 4.601L17.919 12z" />
          </svg>
          <p>0</p>
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
            <path fill="currentColor" d="M20.901 10.566A1.001 1.001 0 0 0 20 10h-4V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v7H4a1.001 1.001 0 0 0-.781 1.625l8 10a1 1 0 0 0 1.562 0l8-10c.24-.301.286-.712.12-1.059M12 19.399L6.081 12H10V4h4v8h3.919z" />
          </svg>
        </button>

        <button className="flex items-center space-x-2 ml-4 bg-gray-100 p-2 rounded-3xl" onClick={() => setShowCommentForm(!showCommentForm)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M5 3h13a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-4.59l-3.7 3.71c-.18.18-.43.29-.71.29a1 1 0 0 1-1-1v-3H5a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3m13 1H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h4v4l4-4h5a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2" /></svg>
          <span>Comment</span>
        </button>
      </div>

      {showCommentForm && (
        <div className="mt-4">
          <form onSubmit={handleCommentSubmit}>
            <textarea name="comment" placeholder="Write a comment..." className="w-full p-2 rounded-md border border-gray-300" required></textarea>
            <button type="submit" className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md">Submit</button>
          </form>
        </div>
      )}

      <div className="mt-4">
        {commentList.map((comment, index) => (
          <div key={index}>
            {editingComment === index ? (
              <form onSubmit={(e) => {
                e.preventDefault();
                handleSaveComment(index, e.target.elements.comment.value);
              }}>
                <input type="text" name="comment" defaultValue={comment} required />
                <button type="submit">Save</button>
                <button type="button" onClick={handleCancelEdit}>Cancel</button>
              </form>
            ) : (
              <p className="text-gray-700">{comment}</p>
            )}
            {deletingComment === index ? (
              <div>
                <button onClick={handleConfirmDelete}>Confirm Delete</button>
                <button onClick={handleCancelDelete}>Cancel</button>
              </div>


            ) : (
              <div>
                <button onClick={() => handleEditComment(index)}>Edit</button>
                <button onClick={() => handleDeleteComment(index)}>Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>

  );
};

Post.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  subreddit: PropTypes.string.isRequired,
  upvotes: PropTypes.number.isRequired,
  comments: PropTypes.number.isRequired,
};

export default Post;


{/*Bloggers have the option to upvote or downvote both their
own and others' blog posts.
Bloggers can comment in their own and others’ blog posts.
Comments can also be reacted to either upvote or
downvote.
Blog Comment can be updated or deleted by the author (one
who commented)*/}
